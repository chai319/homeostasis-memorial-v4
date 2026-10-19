/* V4.5 source + retained playtest2 holidays/exam/trio; exactly one authored crisis chain. */
(function(global){'use strict';
const core=global.HMCore||require('./core-v45.js');
const previous=global.HMPlaytest||require('./playtest-revision-v4.js'),{T}=core;
const policy=global.HMV45RuntimePolicy||require('./v45-runtime-policy.json');
const patches=global.HMV45Patches||require('./v45-display-patches.json').patches;
const clone=x=>JSON.parse(JSON.stringify(x));
const {pyRound:round}=global.HMRng||require('./rng-v4.js');
function buildData(source){
 const d=clone(source);for(const [section,values]of Object.entries(policy.rules))Object.assign(d.rules[section],values);
 for(const s of d.scenes){
  for(const [before,after]of patches[s.id]||[]){let hits=0;const walk=o=>{if(Array.isArray(o))return o.forEach(walk);if(!o||typeof o!=='object')return;for(const k of Object.keys(o)){if(typeof o[k]==='string'&&o[k].includes(before)){o[k]=o[k].replaceAll(before,after);hits++;}else walk(o[k]);}};walk(s);if(!hits)throw Error('Stale V4.5 display correction: '+s.id+' '+before);}
 }
 return d;
}
class Game extends previous.Game{
 constructor(data,seed=0){super(buildData(data),seed);this.revision=policy.revision;this._crisisFrozen=true;this.activityFloorEnabled=true;}
 // Preserve the same random draws and stat-event pipeline; only training lower bounds change.
 *do_place(place,mult=1){
  this.set_cast([],'activity:'+place);
  if(!this.activityFloorEnabled){yield* super.do_place(place,mult);this.set_cast([],'after-activity:'+place);return;}
  const P=this.R.places[place];if(!P)throw Error('Unknown place');this.clicks+=2;
  const fail=this.st.stress>=this.R.fail.stress_from&&this.rng.random()<this.R.fail.chance,F=policy.activity_floor;
  for(const [key,[a,b]]of Object.entries(P.gain)){
   let value=this.rng.randint(a,b)*mult;if(fail&&value>0)value=Math.floor(value/2);
   if(b>0){const floor=a>=4?(fail?F.primary_tired:F.primary):a>=2?(fail?F.mixed_tired:F.mixed):F.secondary;value=Math.max(value,floor*mult);}
   yield* this.add_stat(key,round(value));
  }
  this.st.stress=Math.max(0,Math.min(100,this.st.stress+P.stress));this.set_cast([],'activity-result:'+place);yield {type:'stats',place,stats:{...this.st},fail};
  yield* this.read([{text:'（放課後の過ごし方と、上がった能力の表示）'}]);
  this.set_cast([],'after-activity:'+place);
 }
 *read(lines){
  // The solo-walk narration is stored under redcell, but nobody accompanies the player.
  // Clear before read() captures its return stage, including exhausted-pool UI lines.
  const origin=lines[0]?.poolOrigin;
  if(origin?.character==='redcell'&&origin.kind==='alone'){this.set_cast([],'solo-walk');lines.stageCast=[];}
  if(this.scene?.id.startsWith('fs2_crisis_')&&lines===this.scene.lines)this.crisisLead=this.scene.char;yield* super.read(lines);}
 // New hints are presentation-only: use first authored line set without drawing/refilling a pool.
 identityLines(t,kind){return this.d.pools[this.CID[t]]?.[kind]?.[0]||[];}
 *identify(t,guess){
  const eligible=!this.ident[t]&&!this.cool[t]&&this.clues[t].size>=this.R.identify.clues_needed;
  if(!eligible)return;
  const it=super.identify(t,guess);let s=it.next();while(!s.done){
   if(s.value.type==='identified'){yield s.value;const response=this.identityLines(t,'ident_ok');if(response.length)yield* this.read([{who:this.CID[t],text:response.map(l=>l.text).join('\n'),compactLines:clone(response),compactKind:'identity',expr:'blush'}]);}
   else if(s.value.type==='feedback'){const response=this.identityLines(t,'ident_ng');yield {...s.value,identityResponse:clone(response)};}
   else{const input=yield s.value;s=it.next(input);continue;}
   s=it.next();
  }
 }
}
const api={...previous,Game,revision:policy.revision,buildData};global.HMPlaytest=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
