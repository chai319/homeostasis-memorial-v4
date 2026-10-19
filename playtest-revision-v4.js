/* Opt-in revision for new games. Canonical V4.4 and old-save replay stay untouched. */
(function(global){'use strict';
const {Game:BaseGame,T,validate}=global.HMCore||require('./core-v4.js');
const {PythonRandom,pyRound:round}=global.HMRng||require('./rng-v4.js');
const C=global.HMPlaytestContent||require('./playtest-content-v4.json');
const clone=x=>JSON.parse(JSON.stringify(x));
function buildData(source){
 const data=clone(source);
 for(const t of T){const s=data.scenes.find(s=>s.id==='ev_shed_'+t),tail=s.lines.slice(2);s.lines=s.lines.slice(0,2);s.choices=[clone(C.closed_choices[t])];s.after=tail;s.char=t;}
 for(const [who,lines]of Object.entries(C.pier_dialogue))data.pools[who].spot_pier=[clone(lines)];
 data.scenes.push(...clone(C.trio_scenes));
 data.rules.shuffle_choices_in=[...data.rules.shuffle_choices_in,'crisis'];
 return data;
}
function advancedSet(seed){
 const rng=new PythonRandom((seed^0x51a73c29)>>>0),groups=[...new Set(C.bank.questions.map(q=>q.area))],areas=rng.sample(groups,groups.length);
 return areas.flatMap((area,i)=>rng.sample(C.bank.questions.filter(q=>q.area===area),i===2?1:2));
}
class Game extends BaseGame{
 constructor(data,seed=0){super(buildData(data),seed);this.revision=C.revision;this.holidayPeriod=null;this.holidayDateUsed=false;this.incomingUsed=[];this.pendingGrowth={};this.deliveringGrowth=false;this.crisisLead=null;this.crisisState=null;}
 stage_line(line){
  super.stage_line(line);
  if(this.scene?.id.startsWith('outing_trio_')&&this.scene.lines[0]===line){this.presentation.cast=[...this.scene.cast];this.presentation.revision++;}
 }
 pool(c,k){const lines=super.pool(c,k);for(const line of lines)line.poolOrigin={character:c,kind:k};return lines;}
 *read(lines){
  const origin=lines[0]?.poolOrigin;
  if(origin&&/^stat[123]$/.test(origin.kind)&&!this.deliveringGrowth){this.pendingGrowth[origin.character]=clone(lines);return;}
  const who=lines[0]?.who,pending=this.pendingGrowth[who];
  if(pending&&!this.deliveringGrowth){delete this.pendingGrowth[who];this.deliveringGrowth=true;try{for(const l of pending)l.growthContext=true;yield* super.read(pending);}finally{this.deliveringGrowth=false;}}
  yield* super.read(lines);
 }
 spots_open(){return super.spots_open().filter(s=>this.holidayPeriod!=='午前'||s!=='firefly');}
 *holidayAction(act){
  const iterator=super.holiday();let step=iterator.next();
  if(step.value?.kind!=='holiday')throw Error('V4.4 holiday entry changed');
  step=iterator.next(act);const contact=this.holidayPeriod==='夜'&&['call','phone'].includes(act[0]),heard=[];
  while(!step.done){
   if(contact&&step.value.type==='line'){const l=step.value.line;if(!(act[0]==='phone'&&['phone','phone_end'].includes(l.poolOrigin?.kind)))heard.push(l);step=iterator.next();}
   else if(contact&&step.value.type==='status'){step=iterator.next();}
   else {const input=yield step.value;step=iterator.next(input);}
  }
  if(contact){
   const who=act[0]==='phone'?'redcell':this.CID[act[1]],line={who,text:heard.map(l=>l.text).join('\n')||'短く近況を交わし、電話を終えた。',compactLines:heard.length?heard:null};
   this.set_cast([who],'night-contact');this.stage_line(line);yield* this.interactive({type:'line',line,scene:null});
  }
 }
 *trioOuting(t,spot){
  if(!T.includes(t)||this.fr[t]<1)throw Error('三人のお出かけには会った相手を選んでください');
  if(!this.spots_open().includes(spot))throw Error('この季節には選べない場所です');
  this.set_cast([this.CID[t],'redcell'],'trio-outing:'+t);yield {type:'location',place:spot,time:this.holidayPeriod,bgm:'date'};
  const prior=this.cur_char;this.cur_char=t;const capped=this.trio_cap;this.trio_cap=true;
  try{
   if(!this.seen['scene:outing_trio_'+t])yield* this.run_scene('outing_trio_'+t);
   else {yield* this.read([{who:'narr',text:'赤路と三人で、近況を話しながら穏やかに過ごした。'}]);yield* this.add_f(t,2,'walk');}
   this.st.stress=Math.max(0,this.st.stress-10);this.log.trio_outing=(this.log.trio_outing||0)+1;
  }finally{this.trio_cap=capped;this.cur_char=prior;}
 }
 *holiday(){
  this.holidayDateUsed=false;this.set_cast([],'holiday');
  const H=C.holiday,candidates=T.filter(t=>this.fr[t]>=H.incoming_f&&this.tk[t]>=H.incoming_t&&!this.lit[t]&&!this.incomingUsed.includes(t)).sort((a,b)=>this.fr[b]+this.tk[b]-this.fr[a]-this.tk[a]);
  this.holidayPeriod='午前';
  if(candidates.length&&this.incomingUsed.length<H.incoming_limit){
   const t=candidates[0],c=this.CID[t],spot=this.spots_open().reduce((a,b)=>this.spot_value(t,b)>this.spot_value(t,a)?b:a);this.incomingUsed.push(t);
   yield {type:'location',place:'myroom',time:'休日の朝',bgm:'morning'};
   yield* this.read([{who:'narr',text:'休日の朝、電話が鳴った。相手からのお誘いだ。'},{who:c,text:C.incoming[t][0],expr:'blush'}]);
   const accept=yield* this.interactive({type:'decision',kind:'incoming_date',target:t,spot,options:[true,false]});
   if(accept){yield* this.read([{who:c,text:C.incoming[t][1],expr:'happy'}]);yield* this.holidayAction(['date',t,spot]);this.holidayDateUsed=true;}
   else yield* this.read([{who:c,text:'わかった。また時間が合う日に。',expr:'neutral'}]);
  }
  for(let slot=this.holidayDateUsed?1:0;slot<H.activity_slots;slot++){
   this.holidayPeriod=slot===0?'午前':'午後';this.set_cast([],'holiday-slot:'+slot);yield {type:'location',place:'myroom',time:'休日・'+this.holidayPeriod,bgm:'command'};
   const act=yield* this.interactive({type:'decision',kind:'holiday',slot,period:this.holidayPeriod,allowDate:!this.holidayDateUsed,revision:this.revision,options:[]});
   if(!Array.isArray(act))throw Error('休日の行動を選んでください');
   if(act[0]==='rest'){this.st.stress=Math.max(0,this.st.stress-12);yield* this.read([{who:'narr',text:'少し休み、残りの時間に備えた。'}]);}
   else if(act[0]==='trio')yield* this.trioOuting(act[1],act[2]);
   else if(['cmd','play','date'].includes(act[0])){
    if(act[0]==='date'&&this.holidayDateUsed)throw Error('デートは一日に一度です');
    const before=this.log.date||0;yield* this.holidayAction(act);if((this.log.date||0)>before)this.holidayDateUsed=true;else if(act[0]==='date')slot--;
   }else throw Error('電話は夜の連絡枠で選べます');
  }
  this.holidayPeriod='夜';this.set_cast([],'holiday-night');yield {type:'location',place:'myroom',time:'休日・夜',bgm:'date'};
  const act=yield* this.interactive({type:'decision',kind:'night_contact',options:[]});
  if(!Array.isArray(act)||!['call','phone','skip'].includes(act[0]))throw Error('夜の連絡を選んでください');
  if(act[0]==='skip')this.st.stress=Math.max(0,this.st.stress-5);else yield* this.holidayAction(act);
  this.holidayPeriod=null;
 }
 *exam(){
  const old=this.rng.sample(this.d.exam_bank,this.R.exam.questions),questions=[...old.slice(0,5),...advancedSet(this.seed)];let score=0;
  for(const [number,q]of questions.entries()){
   const lines=[{text:q.q},...q.options.map(text=>({text}))];this.chars+=lines.reduce((n,l)=>n+Array.from(l.text).length,0);this.clicks+=lines.length+1;
   const answer=yield* this.interactive({type:'decision',kind:'exam',question:q,number:number+1,total:10,section:number<5?'基本':'応用'}),roll=this.rng.random();
   const correct=answer?.simulation?roll<Math.min(.95,.35+.006*(this.st.gaku+this.st.rika)/2+(answer.studyBonus||0)):answer===q.answer;
   if(correct)score++;yield {type:'exam-feedback',correct,answer:q.options[q.answer],score,number:number+1,total:10,explanation:q.explain};this.chars+=Array.from(q.explain).length;this.clicks++;
  }
  this.vars.rank=Math.max(1,round(241-2.4*(score*6+this.st.gaku*.25+this.st.rika*.15)));this.log.exam_score=(this.log.exam_score||0)+score;this.log.rank=(this.log.rank||0)+this.vars.rank;yield {type:'exam-result',score,total:10,rank:this.vars.rank,students:this.R.exam.students};
 }
 prepareCrisis(){
  const t=[...T].sort((a,b)=>this.fr[b]-this.fr[a]||this.tk[b]-this.tk[a]||T.indexOf(a)-T.indexOf(b))[0],config=C.crisis[t],state=new PythonRandom((this.seed^0x34fb2917)>>>0).randint(0,1),s=this.S.fs2_crisis;
  this.crisisLead=t;this.crisisState=state;s.char=t;s.day='crisis';s.title='止まった懐中時計';
  s.lines=[...clone(C.crisis_common),...clone(config.opening),{who:'narr',text:config.states[state].evidence}];
  s.choices=[clone(config.states[state].q),clone(config.second)];s.after=[{who:this.CID[t],text:config.closing,expr:'blush',act:'shy-side'}];
 }
 snapshot(){return {...super.snapshot(),revision:this.revision,holidayPeriod:this.holidayPeriod,holidayDateUsed:this.holidayDateUsed,incomingUsed:[...this.incomingUsed],pendingGrowth:clone(this.pendingGrowth),crisisLead:this.crisisLead,crisisState:this.crisisState};}
}
// Keep crisis selection live until the actual crisis, even when entered by an internal goto chain.
const originalRead=Game.prototype.read;
Game.prototype.read=function*(lines){
 // The formal crisis scene event precedes read(s.lines); refresh its object just in time.
 if(this.scene?.id==='fs2_crisis'&&!this._crisisFrozen){this.prepareCrisis();this._crisisFrozen=true;lines=this.scene.lines;}
 yield* originalRead.call(this,lines);
};
const api={Game,revision:C.revision,advancedSet,buildData,content:C};global.HMPlaytest=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
