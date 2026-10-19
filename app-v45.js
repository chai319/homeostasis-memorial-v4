/* Full-season UI. Continuations are restored by deterministic input-journal replay. */
(function(){
"use strict";
const $=id=>document.getElementById(id),data=window.HM_GAME_V4,{Game,validate,T}=window.HMCore;
const SAVE=window.HM_SAVE_NAMESPACE||data.meta.save_key,assets=window.HM_ASSETS,characters=Object.fromEntries(window.HM_CHARACTERS.map(c=>[c.id,c]));
const audio=new window.HMAudio(assets.bgm),report=validate(data);
console.info("V4 startup validation",report);
let game,iterator,current,position=0,tape={},seed,gender="female",player={sei:"春野",mei:"悠"},scene=null,acts={},lastWho=null,history=[],busy=false;
let options={effects:true},saveAllowed=false,transitionTimer=null,activityFloorFrom=-1;
let stageKey=null,stageCast=[],expressions={},activeWho=null,lineActs={},pendingTransition=null;
let activity=null,widget=null,restoring=false,choiceUnlockTimer=null,dateInvitation=null,noticeTimer=null,locationKnowledge={},preferenceKnowledge={},hintedDays=new Set(),inferenceOffer=null,inferenceOfferedDays=new Set(),suppressInference=false;
const endRecords=()=>{try{return JSON.parse(localStorage.getItem(SAVE+":endings")||"[]");}catch{return [];}};
const readSet=new Set(JSON.parse(localStorage.getItem(SAVE+":read")||"[]"));
const lineKey=line=>[player.gender,gender,scene?.id||game?.day,line.who,line.text].join("|");
const displayField=(record,key)=>window.HMLocalization.field(record,key,player.gender,gender);
const name=who=>who==="me"?player.sei+" "+player.mei:who==="mob"?"その他の生徒":who==="hypothalamus"?"中枢先生":who==="salt"?"塩係（備の妹・電話）":characters[who]?.[who==="redcell"?player.gender:gender]||"";
function displayText(value,who){
 const hint=typeof value==="object"?value.buddyHint:null,growthContext=typeof value==="object"&&value.growthContext;
 if(typeof value==="object")value=value.compactLines?value.compactLines.map(l=>displayField(l,"text")).join("\n"):displayField(value,"text");
 if(who==="hypothalamus")value=window.HM_DIALOGUE_SUPPLEMENT?.teacher[value]||value;
 if(value==="（放課後の過ごし方と、上がった能力の表示）"&&activity)return (isHoliday()?"休日は":"放課後は")+(data.places[activity.place]?.name||data.rules.places[activity.place].label)+"で過ごした。";
 const t=T.find(t=>game.CID[t]===who)||game.cur_char,c=t?game.CID[t]:null,tiers=data.pools[c]?.call||{};
 let call="";for(const k of Object.keys(tiers).map(Number).sort((a,b)=>a-b))if(game.tier(t)>=k)call=tiers[k];
 call=call.replace(/\{sei\}/g,player.sei).replace(/\{mei\}/g,player.mei);
 const place=$("scene-background").dataset.place,spot=data.rules.spots[place]||data.places[place]?.name||"待ち合わせ場所";
 return (growthContext?"（最近の頑張りの話）\n":"")+value.replace(/\{(sei|mei|call|spot)\}/g,(_,key)=>({sei:player.sei,mei:player.mei,call,spot}[key])).replace(/影の生徒/g,"その他の生徒")+(hint?"\n"+hint:"");
}
function calendarRow(){return data.rules.calendar.find(row=>row[0]===game?.day);}
function isHoliday(){return calendarRow()?.[2]==="holiday";}
function displayTime(time){return time==="放課後"&&isHoliday()?"休日":time;}
function exhaustedSummary(e){
 const p=e.line?.exhaustedPool;if(!p)return null;const who=name(p.character)||"相手";
 if(p.kind==="date_refuse")return who+"を誘ったが、今回は二人で出かけることにはならなかった。今日は別々に過ごすことにした。";
 if(p.kind==="trio_join")return "赤路が合流し、三人で帰ることになった。";
 if(p.kind==="trio_walk")return "三人で帰った。";
 if(p.kind==="phone_call")return who+"に電話して、近況を話した。";
 if(p.kind==="phone"||p.kind==="phone_end")return "赤路と電話で話した。";
 if(p.kind==="no_news")return "新しい情報はまだなかった。";
 if(p.kind==="repeat")return "二人で、前にも訪れた場所を過ごした。";
 if(p.kind==="play")return "赤路と一緒に休日を過ごした。";
 if(p.kind==="nobody")return "今は誰もいないようだ。";
 if(p.kind==="talk_done")return "今日は短く近況を交わした。";
 if(p.kind.startsWith("refuse"))return who+"は、今日は二人で帰る誘いには応じなかった。";
 return null;
}
function toast(text){clearTimeout(noticeTimer);$("status-toast").textContent=text;}
const growth=new window.HMGrowthFeedback($("growth-feedback"),{
 canShow:()=>!restoring&&!busy&&!document.hidden&&!$("game-screen").hidden&&!$("modal").open&&$("transition").hidden,
 playSound:()=>audio.playStatUp()
});
function showStatDelta(before){
 const changes=Object.entries({...data.rules.stats,stress:"ストレス"}).filter(([key])=>game.st[key]!==before[key]).map(([key,label])=>({key,label,before:before[key],after:game.st[key],delta:game.st[key]-before[key]}));
 growth.enqueue(changes);
}

// Collect requests while settling/replaying; play only the final visible context.
let musicId='title';
function requestMusic(id){if(id&&id!=='keep')musicId=id;}
function flushMusic(){if(restoring)return;audio.play(musicId);$('game-screen').dataset.bgm=musicId;}
function characterKey(who){return who==="hypothalamus"?who:who+"-"+(who==="redcell"?player.gender:gender);}
function portraitSource(who,expr="neutral",act=null){
 const key=characterKey(who),set=assets.characters[key];
 const water=scene?.outfit==="swim"&&window.HM_LAKE_SPRITES?.[key];
 if(water){const aliases={happy:'relief',playful:'relief',blush:'relief',joyful_tears:'relief',depressed:'reaction',worried:'reaction',listless:'reaction',surprised:'reaction'};return water[expr]||water[aliases[expr]]||water.neutral;}

 if(!set)return null;
 let src=null;
 if(act&&act!=="-"&&(act!=="love-accepted"||T.some(t=>scene?.id==="end_"+t)))src=set.acting[act];
 src=src||set.expression[expr]||set.expression.neutral;
 return src;
}
const warmedPortraits=new Set();
function warmScenePortraits(s){
 if(restoring)return;
 let count=0;
 for(const line of window.HMPresentation.linesOf(s)){
  if(!characters[line.who])continue;
  const cue=window.HMPresentation.assignedAct(game,line,s,player.gender,gender),act=line.act||cue?.id;
  const src=portraitSource(line.who,window.HMPresentation.expressionFor(game,line),act);
  if(src&&!warmedPortraits.has(src)){warmedPortraits.add(src);const img=new Image();img.src=src;if(++count>=8)break;}
 }
}
function syncStage(){
 const activitySummary=current?.type==="line"&&current.line.text==="（放課後の過ごし方と、上がった能力の表示）";
 const stage=activitySummary&&!dateInvitation?{scope:"activity-summary",serial:game.presentation.serial,revision:0,cast:[]}:dateInvitation?{scope:"date-invitation",serial:0,revision:0,cast:[game.CID[dateInvitation.target]]}:game.presentation,key=stage.scope+":"+stage.serial+":"+stage.revision,cast=stage.cast.filter(who=>characters[who]);
 if(key===stageKey)return;
 const sameScope=stageKey?.startsWith(stage.scope+":"+stage.serial+":");
 if(!sameScope){expressions={};acts={};lineActs={};activeWho=null;lastWho=null;$("cast-stage").replaceChildren();}
 stageKey=key;stageCast=cast;$("cast-stage").dataset.count=cast.length;
 const existing=new Map([...$("cast-stage").children].map(slot=>[slot.dataset.character,slot]));
 for(const [who,slot] of existing)if(!cast.includes(who))slot.remove();
 const referenceHeight=Math.max(1,...cast.map(who=>window.HM_STAGE_METRICS[characterKey(who)].height_cm));
 cast.forEach((who,i)=>{
  const slot=existing.get(who)||document.createElement("div");slot.className="cast-slot";slot.dataset.character=who;
  slot.style.left=(100*(i+.5)/cast.length)+"%";slot.style.width=(100/cast.length)+"%";
  const metrics=window.HM_STAGE_METRICS[characterKey(who)],ratio=(metrics.height_cm/referenceHeight)/metrics.body_fraction;
  slot.dataset.heightCm=metrics.height_cm;slot.style.setProperty("--height-ratio",ratio);slot.style.setProperty("--bottom-anchor",metrics.bottom);
  const img=slot.firstElementChild||document.createElement("img");img.className="cast-portrait";img.id=i===0?"portrait":"portrait-"+i;img.alt="";if(!img.getAttribute("src"))img.src=portraitSource(who);slot.append(img);$("cast-stage").append(slot);
 });
}
function renderStage(){
 const who=dateInvitation?dateInvitation.lines[dateInvitation.index].who:current.type==="line"?current.line.who:current.type==="decision"&&current.target?game.CID[current.target]:null;
 activeWho=stageCast.includes(who)?who:stageCast.length===1?stageCast[0]:null;
 for(const slot of $("cast-stage").children){
  const id=slot.dataset.character,img=slot.firstElementChild,requested=lineActs[id]||acts[id],src=portraitSource(id,expressions[id]||"neutral",requested);
  slot.dataset.requestedAct=requested||"";
  slot.dataset.expression=expressions[id]||"neutral";
  slot.dataset.actualAct=requested&&assets.characters[characterKey(id)]?.acting[requested]&&src===assets.characters[characterKey(id)].acting[requested]?requested:"";
  if(src&&img.getAttribute("src")!==src)img.src=src;
  slot.classList.toggle("speaking",id===activeWho);slot.classList.toggle("inactive",id!==activeWho);
 }
}
function updateStageBounds(){
 const screen=$("game-screen");if(screen.hidden)return;
 const top=screen.getBoundingClientRect().top,hudBottom=document.querySelector(".hud").getBoundingClientRect().bottom-top;
 screen.style.setProperty("--hud-bottom",hudBottom+"px");
 const noticeBottom=$("status-toast").textContent?$("status-toast").getBoundingClientRect().bottom-top:hudBottom;
 screen.style.setProperty("--cast-safe-top",Math.max(hudBottom,noticeBottom)+12+"px");
}
function sceneMetadata(e){
 lineActs={};
 syncStage();
 if(!game.scene)scene=null;
 if(e.type==="scene"){
  scene=e.scene;
  $("game-screen").dataset.weather=["ev_rain","ev_sign","cv_adh_02","hp_adh_2"].includes(scene.id)?"rain":"";
  $("game-screen").classList.toggle("dreaming",scene.trans==="dream");
  $("game-screen").dataset.dream=scene.place==="dream_snow"?"xmas":scene.place==="dream_sweet"?"val":"";
  warmScenePortraits(scene);
  pendingTransition={kind:scene.trans||"scene",title:displayField(scene,"title"),scene:scene.id};
  const previousPlace=$("scene-background").dataset.place;
  toast("");
  if(activity?.shown){
   if(scene.place!=="keep"&&scene.place!==previousPlace)toast((data.places[previousPlace]?.name||previousPlace)+"での行動を終え、"+(data.places[scene.place]?.name||scene.place)+"へ。");
   activity=null;
  }
  if(scene.place!=="keep")setLocation(scene.place,scene.time==="keep"?undefined:scene.time);
  else setLocation($("scene-background").dataset.place||"class",undefined);
  if(scene.time!=="keep")$("time-text").textContent=displayTime(scene.time||"");
  if(scene.trans==="dream")$("date-text").textContent="？月？日";
  else if(game.day){const cal=data.rules.calendar.find(x=>x[0]===game.day);if(cal)$("date-text").textContent=scene?.day==="end"&&scene.date?scene.date:cal[1];}
  requestMusic(scene.bgm);
 }
 if(e.type==="location"){$("game-screen").dataset.weather="";$("game-screen").classList.remove("dreaming");scene=null;activity=null;acts={};toast("");setLocation(e.place,e.time);requestMusic(e.place==="myroom"&&String(e.time).includes("夜")?window.HMV45RuntimePolicy.bgm_context.holiday_night:e.bgm);}
 if(e.type==="day"){
  requestMusic(e.kind==="holiday"?window.HMV45RuntimePolicy.bgm_context.holiday_morning:window.HMV45RuntimePolicy.bgm_context.school_morning);
  $("game-screen").dataset.weather="";
  $("game-screen").classList.remove("dreaming");$("game-screen").dataset.holiday=String(e.kind==="holiday");
  scene=null;activity=null;pendingTransition={kind:"day",title:e.date};
  acts={};$("date-text").textContent=e.date;$("time-text").textContent=e.kind==="holiday"?"休日":"朝";toast("");
  if(e.kind==="holiday")setLocation("myroom","休日");
 }
 if(e.type==="line"){
  const l=e.line;
  if(l.locationCue){scene=null;activity=null;toast("");setLocation(l.locationCue.place,l.locationCue.time);pendingTransition={kind:"place",title:""};}

  if(activity&&l.text==="（放課後の過ごし方と、上がった能力の表示）")activity.shown=true;
  // A full-body image includes a fixed face: let the next spoken reaction show
  // its own expression, rather than keeping an old pose over it for the scene.
  if(l.who&&characters[l.who]&&l.act===undefined)delete acts[l.who];
  const assigned=window.HMPresentation.assignedAct(game,l,scene,player.gender,gender);
  // Script @act takes precedence over the external assignment sheet.
  if(assigned&&l.act===undefined){
   const id=assigned.id;
   if(assigned.hold==="line")lineActs[assigned.who]=id;else acts[assigned.who]=id;
  }
  if(l.act!==undefined){if(l.act==="-")delete acts[l.who];else acts[l.who]=l.act;}
  if(l.who&&characters[l.who]){lastWho=l.who;expressions[l.who]=window.HMPresentation.expressionFor(game,l);}
  if(!e.revisit){
   // Reuse the authored info3 lines in everyday one-to-one walks, at most one new hint per day.
   if(!scene&&l.who==="redcell"&&$("scene-background").dataset.place==="gate"&&game.presentation.cast.length===1&&!hintedDays.has(game.day)){
    const target=T.filter(t=>!preferenceKnowledge[t]).sort((a,b)=>game.fr[b]-game.fr[a])[0];
    if(target){const text=data.pools[game.CID[target]].info3[0].map(line=>displayField(line,"text")).join(" ");l.buddyHint="そういえば、好みの話なんだけど。"+text;preferenceKnowledge[target]=text;hintedDays.add(game.day);}
   }
   for(const t of T){const source=data.pools[game.CID[t]].info3[0].map(line=>displayField(line,"text")).join(" ");if((l.compactLines||[l]).some(line=>displayField(line,"text")===source))preferenceKnowledge[t]=source;}
  }
  if(!e.revisit){history.push({who:name(l.who)||"地の文",text:displayText(l,l.who)});learnLocation(l);}
 }
 if(e.type==="identified"){pendingTransition={kind:"cutin",title:"正体判明 · "+name(game.CID[e.target])};}
 if(e.type==="complete"){
  const records=endRecords(),key=e.ending+":"+player.gender+":"+gender;
  if(!records.some(r=>r.key===key)){records.push({key,ending:e.ending,title:displayField(game.S[e.ending],"title"),playerGender:player.gender,castGender:gender});localStorage.setItem(SAVE+":endings",JSON.stringify(records));}
 }
 if(e.type==="stats"){
  const place=data.rules.places[e.place];
  activity={place:e.place,shown:false};scene=null;setLocation(e.place,isHoliday()?"休日":"放課後");
  toast(place.label);
 }
}
function setLocation(place,time){
 time=displayTime(time);
 const dreaming=place.startsWith("dream_");$("game-screen").classList.toggle("dreaming",dreaming);
 if(!dreaming&&game){const cal=data.rules.calendar.find(row=>row[0]===game.day);if(cal)$("date-text").textContent=scene?.day==="end"&&scene.date?scene.date:cal[1];}
 $("scene-background").dataset.place=place;$("place-text").textContent=data.places[place]?.name||data.rules.spots[place]||"";
 const fallback={camp:"field",shopping:"stalls",shed:"store",cafe:"class",haunted:"class",dream_snow:"roof",dream_sweet:"cookroom"};
 const locationTime=time||$("time-text").textContent;
 const id=place==="myroom"&&locationTime.includes("夜")?"myroom-night":place==="boat"&&time==="夕方"?"boat-sunset":place==="gate"&&!['朝','午前'].includes(time)?"gate-sunset":place;
 const raining=$("game-screen").dataset.weather==="rain",rainVariant=raining&&window.HM_BACKGROUNDS[id+"-rain"];
 $("scene-background").dataset.rain=raining?rainVariant?"painted":["gate","roof","field","pier","park","beach","firefly","mountain","ginkgo"].includes(place)?"outdoor":"indoor":"";
 const bg=rainVariant||window.HM_BACKGROUNDS[id]||window.HM_BACKGROUNDS[fallback[place]];
 $("scene-background").style.backgroundImage=bg?'url("'+bg+'")':"";$("scene-background").style.backgroundSize="cover";$("scene-background").style.backgroundPosition="center";
 if(time)$("time-text").textContent=time;
}
function isVisible(e){if(e.type==="status")return !!exhaustedSummary(e);return ["line","decision","milestone","complete","feedback","exam-feedback","exam-result","game-feedback"].includes(e.type)&&!(e.type==="line"&&!e.line.text);}
function rawNext(value){game.activityFloorEnabled=position>=activityFloorFrom;const step=iterator.next(value);position++;current=step.done?{type:"milestone",text:"物語を読み終えました。"}:step.value;sceneMetadata(current);return step;}
function settle(){
 let guard=0;
 while(!isVisible(current)){
  if(++guard>10000)throw new Error("UI event loop exceeded bound");
  rawNext(current.type==="identify-opportunity"?null:undefined);
 }
}
function maybeOfferInference(){
 if(suppressInference||restoring||busy||!game||dateInvitation||inferenceOffer||$("modal").open||$("game-screen").classList.contains("dreaming")||!canInferNow())return;
 const row=calendarRow(),month=Number(row?.[1]?.match(/^(\d+)月/)?.[1]);
 if(!(month>=6)||inferenceOfferedDays.has(game.day))return;
 const boundary=current.type==="decision"&&["place","holiday"].includes(current.kind)||!scene&&current.type==="line"&&current.line.who==="narr";
 if(!boundary)return;
 const target=T.filter(readyToInfer).sort((a,b)=>game.fr[b]-game.fr[a])[0];if(!target)return;
 inferenceOfferedDays.add(game.day);inferenceOffer={target,day:game.day};
 openModal("点と点がつながる");const host=$("modal-content"),who=game.CID[target],intro=document.createElement("div");intro.className="inference-story";
 const hint=game.identityLines?.(target,"ident_hint")||[];
 intro.append(faceIcon(who),textElement("h3",name(who)+"のことが、少しわかってきた"),textElement("p",hint.length?hint.map(l=>displayText(l,l.who)).join("\n"):"何気ない会話や、一緒に過ごした時間。思い返すと、あの行動には共通する役割がありそうだ。"));
 const notes=document.createElement("ul");for(const text of [...game.clues[target]].filter(x=>!/^理解\d+$/.test(x)).slice(-3))notes.append(textElement("li",text));intro.append(notes,textElement("p","この人の役割を、授業で習った言葉にすると何だろう。"));
 const start=button("正体を考える",()=>infer(target));start.id="inference-start";start.className="infer-primary";
 const later=button("今は考えず、また今度にする",()=>{inferenceOffer=null;$("modal").close();growth.flush();});later.id="inference-later";host.append(intro,start,later);
}
function canInferNow(){return ["line","decision"].includes(current?.type)&&!["exam","minigame"].includes(current?.kind)&&!dateInvitation;}
function closeEnoughToInfer(t){const rule=window.HMV45RuntimePolicy.inference_relation;return game.fr[t]>=rule.friendship&&game.tk[t]>=rule.romance;}
function inferenceSeason(){return Number(calendarRow()?.[1]?.match(/^(\d+)月/)?.[1])>=6;}
function readyToInfer(t){return inferenceSeason()&&closeEnoughToInfer(t)&&!game.ident[t]&&!game.cool[t]&&game.clues[t].size>=data.rules.identify.clues_needed;}
function renderStatus(){
 const host=$("status-strip");if(!game||!host)return;
 const ready=Number(calendarRow()?.[1]?.match(/^(\d+)月/)?.[1])>=6&&T.some(readyToInfer);$("notebook-button").dataset.inference=ready?"ready":"";$("notebook-button").setAttribute("aria-label",ready?"手帳・正体を推理できます":"手帳");
 const labels={...data.rules.stats,stress:"ストレス"};
 for(const [key,label] of Object.entries(labels)){
  let item=host.querySelector('[data-stat="'+key+'"]');
  if(!item){item=document.createElement("span");item.dataset.stat=key;const caption=document.createElement("span");caption.textContent=label;item.append(caption,document.createElement("strong"));host.append(item);}
  const value=String(game.st[key]);if(item.lastElementChild.textContent!==value)item.lastElementChild.textContent=value;
 }
}
function render(){
 renderStatus();
 if(dateInvitation){
  $("activity-panel").hidden=true;$("choice-panel").hidden=true;$("milestone").hidden=true;$("dialogue").hidden=false;
  const line=dateInvitation.lines[dateInvitation.index];
  $("speaker").textContent=line.who==="narr"?" ":line.who==="me"?name("me"):name(line.who)+"（電話）";
  $("dialogue-text").textContent=line.text;expressions[game.CID[dateInvitation.target]]=line.expr||"neutral";
  syncStage();renderStage();updateStageBounds();return;
 }
 if(widget){widget.dispose();widget=null;}
 const special=current.type==="decision"&&["exam","minigame"].includes(current.kind);
 $("activity-panel").hidden=!special;
 const feedback=["feedback","exam-feedback","exam-result","game-feedback"].includes(current.type)||current.type==="status"&&!!exhaustedSummary(current);
 $("dialogue").hidden=current.type!=="line"&&!feedback;$("choice-panel").hidden=current.type!=="decision"||special;$("milestone").hidden=!["milestone","complete"].includes(current.type);
 if(current.type==="line"){
  const l=current.line;
  $("speaker").textContent=(name(l.who)||" ")+(l.compactLines&&l.compactKind!=="identity"?"（電話）":"");$("dialogue-text").textContent=displayText(l,l.who);
 }else if(feedback){
  $("speaker").textContent=current.type==="exam-feedback"?"中間考査":current.type==="game-feedback"?"借り物競走":" ";
  let text=current.type==="status"?exhaustedSummary(current):current.text;
  if(current.type==="exam-feedback")text=(current.correct?"正解！":"正解は「"+current.answer+"」。")+(current.explanation?"\n"+current.explanation:"　次に解説を確認しよう。");
  if(current.type==="exam-result")text=`中間考査：${current.score} / ${current.total} 問正解。学年${current.students}人中 ${current.rank}位。`;
  if(current.type==="game-feedback")text=(current.correct?"正解！":"このお題は、"+name(game.CID[current.target])+"。")+`　${current.number} / ${current.total} 枚目を終えた。`;
  if(current.identityResponse?.length)text=current.identityResponse.map(l=>displayText(l,l.who)).join("\n")+"\n"+text;
  $("dialogue-text").textContent=text;
 }else if(current.type==="decision")special?renderActivity(current):renderDecision(current);
 else if(["milestone","complete"].includes(current.type)){
  $("cast-stage").replaceChildren();toast("");saveAllowed=true;
  $("completion-eyebrow").textContent=current.type==="complete"?"HOMEOSTASIS MEMORIAL · FIN":"APRIL COMPLETE";
  $("completion-title").textContent=current.type==="complete"?displayField(game.S[current.ending],"title"):"新しい日々は、ここから。";
  $("completion-text").textContent=current.type==="complete"?"ここまで遊んでくれて、ありがとう。生徒手帳から思い出と教科書を振り返れます。":"4月の試遊はここまでです。";
 }
 renderStage();
 updateStageBounds();
 $("save-button").disabled=!saveAllowed;
}
function button(label,fn){const b=document.createElement("button");b.type="button";b.textContent=label;b.addEventListener("click",fn);return b;}
function faceIcon(who){
 const span=document.createElement("span");span.className="face-icon";span.setAttribute("aria-hidden","true");const image=document.createElement("img");image.src=portraitSource(who);image.alt="";span.append(image);return span;
}
// Icons identify people explicitly named in the displayed label; they never reveal an implied beneficiary.
function namedChoicePeople(label){
 const found=[];
 for(const who of Object.keys(characters)){
  const full=name(who),surname=full.split(" ")[0];
  let at=label.indexOf(surname);
  while(at!==-1){
   const before=label.slice(0,at),after=label.slice(at+surname.length);
   const ordinaryWord=(surname==="瞬"&&(before.endsWith("一")||after.startsWith("間")))||(surname==="備"&&(before.endsWith("準")||/^[蓄品え]/.test(after)))||(surname==="澄"&&/^[んみ]/.test(after));
   const named=label.slice(at).startsWith(full)||/^(?:と|の|に|が|は|を|へ|も|や|、|。|[!?！？」「』）)\s]|さん|くん|ちゃん|君|先生|$)/.test(after);
   if(named&&!ordinaryWord){found.push({who,at});break;}
   at=label.indexOf(surname,at+surname.length);
  }
 }
 return found.sort((a,b)=>a.at-b.at).map(x=>x.who);
}
function personButton(label,fn,who){
 const people=Array.isArray(who)?who:[who],b=button("",fn);b.classList.add("person-choice");
 if(people.length===1)b.append(faceIcon(people[0]));
 else {const faces=document.createElement("span");faces.className="choice-faces";for(const id of people)faces.append(faceIcon(id));b.append(faces);}
 const text=document.createElement("span");text.textContent=label;b.append(text);b.dataset.person=people.join(" ");return b;
}
function mountChoices(nodes){
 clearTimeout(choiceUnlockTimer);const host=$("choice-buttons");host.replaceChildren(...nodes);const buttons=[...host.querySelectorAll("button")];
 for(const b of buttons)b.disabled=true;
 host.setAttribute("aria-busy","true");choiceUnlockTimer=setTimeout(()=>{if(host.isConnected){for(const b of buttons)if(b.isConnected)b.disabled=false;host.setAttribute("aria-busy","false");}},300);
}
function present(prompt,items){
 $("question").textContent=prompt;mountChoices(items.map(([label,value,who])=>who?personButton(label,()=>advance(value),who):button(label,()=>advance(value))));
}
function renderActivity(e){
 const host=$("activity-panel");host.replaceChildren();
 if(e.kind==="minigame"){
  widget=window.HMWidgets.minigame({event:e,game,name,portrait:who=>portraitSource(who),key:seed+":"+position,submit:advance});host.append(widget.element);return;
 }
 const paper=document.createElement("section");paper.className="exam-paper";
 const heading=document.createElement("p");heading.textContent=`中間考査 · ${e.number} / ${e.total} 問 · ${e.section?e.section+" · ":""}${e.question.unit}`;
 const progress=document.createElement("progress");progress.max=e.total;progress.value=e.number-1;
 const q=document.createElement("h2");q.textContent=e.question.q;
 const choices=document.createElement("div");choices.className="exam-options";
 for(const i of window.HMWidgets.permutation(e.question.options.length,seed+":"+e.question.id))choices.append(button(e.question.options[i],()=>advance(i)));
 paper.append(heading,progress,q,choices);host.append(paper);
}
function renderDecision(e){
 if(e.kind==="choose"){
  const rows=e.options.map((o,i)=>{const original=displayField(o,"label"),label=window.HMChoicePresentation.label(e.scene?.id,original);return [label,i,namedChoicePeople(label)];});
  const peopleChoice=rows.every(row=>row[2].length===1)&&new Set(rows.map(row=>row[2][0])).size===rows.length;
  present(displayField(e.choice||{prompt:e.prompt},"prompt"),rows.map(([label,i,people])=>[label,i,peopleChoice?people:null]));
 }
 else if(e.kind==="place"){setLocation("class","放課後");requestMusic(window.HMV45RuntimePolicy.bgm_context.training);$("question").textContent="放課後、どこへ行こう？";mountChoices([campusMap(true)]);}
 else if(e.kind==="ask")present(name(game.CID[e.target])+"に声をかける？",[["一緒に帰ろうと誘う",true],["今日は一人で帰る",false]]);
 else if(e.kind==="accept_invite")present("一緒に帰ろうと誘われた。",[["一緒に帰る",true],["今日は遠慮する",false]]);
 else if(e.kind==="pick_lunch")present("誰と過ごそう？",e.options.map(t=>[name(game.CID[t]),t,game.CID[t]]));
 else if(e.kind==="holiday"||e.kind==="night_contact")renderHoliday();
 else if(e.kind==="incoming_date")present(name(game.CID[e.target])+"からのお誘い",[["一緒に出かける",true,game.CID[e.target]],["今日は別の予定を優先する",false]]);
 else throw new Error("Unsupported decision: "+e.kind);
}
function renderHoliday(){
 if(!game.revision)return renderLegacyHoliday();
 const sub=(prompt,items)=>{$("question").textContent=prompt;mountChoices([...items.map(([label,fn,who])=>who?personButton(label,fn,who):button(label,fn)),button("戻る",renderHoliday)]);};
 const spots=()=>game.spots_open().map(spot=>[spot==="pier"?"湖の桟橋で釣り":data.rules.spots[spot],spot]);
 const choosePerson=kind=>sub(kind==="trio"?"赤路と、誰を誘おう？":"誰に連絡しよう？",T.filter(t=>kind!=="trio"||game.fr[t]>=1).map(t=>[name(game.CID[t]),()=>{
  if(kind==="date"||kind==="trio")sub("どこへ行こう？",spots().map(([label,spot])=>[label,()=>kind==="date"?startDateInvitation(t,spot):advance(["trio",t,spot])]));
  else advance([kind,t]);
 },game.CID[t]]));
 if(current.kind==="night_contact"){
  $("question").textContent="休日の夜、連絡しておこうか？";
  mountChoices([button("友達に電話する",()=>choosePerson("call")),button("赤路に近況を聞く",()=>choosePerson("phone")),button("連絡せず、ゆっくり休む",()=>advance(["skip"]))]);return;
 }
 $("question").textContent="休日の"+current.period+"、何をしよう？（活動 "+(current.slot+1)+" / 2）"+(current.allowDate?"":"　二人でのデートは今日は済んでいる。別の予定を考えよう。");
 const items=[button("自分の時間を過ごす",()=>sub("何をしよう？",Object.keys(data.rules.places).map(k=>[data.rules.places[k].label,()=>advance(["cmd",k])]))),button("赤路と三人で出かける",()=>choosePerson("trio")),button("赤路と遊ぶ",()=>advance(["play"])),button("少し休む",()=>advance(["rest"]))];
 if(current.allowDate)items.splice(1,0,button("デートに誘う",()=>choosePerson("date")));
 mountChoices(items);
}
function renderLegacyHoliday(){
 $("question").textContent="休日、何をしよう？";
 const panel=$("choice-buttons");
 const sub=(prompt,items)=>{$("question").textContent=prompt;mountChoices([...items.map(([label,fn,who])=>who?personButton(label,fn,who):button(label,fn)),button("戻る",renderHoliday)]);};
 const choosePerson=(kind)=>sub("誰に連絡しよう？",T.map(t=>[name(game.CID[t]),()=>{
  if(kind==="date")sub("どこへ行こう？",game.spots_open().map(spot=>[data.rules.spots[spot],()=>startDateInvitation(t,spot)]));
  else advance([kind,t]);
 },game.CID[t]]));
 mountChoices([
  button("デートに誘う",()=>choosePerson("date")),button("赤路に近況を聞く",()=>choosePerson("phone")),
  button("友達に電話する",()=>choosePerson("call")),button("赤路と遊ぶ",()=>advance(["play"])),
  button("自分の時間を過ごす",()=>sub("何をしよう？",Object.keys(data.rules.places).map(k=>[data.rules.places[k].label,()=>advance(["cmd",k])])))
 ]);
}
function buildDateInvitation(target,spot,index=0){
 const script=window.HM_DATE_INVITATION,who=game.CID[target],voice=script.voices[who];
 let [short,time,meeting]=script.meeting[spot];
 if(game.revision){if(spot==="pier")short="湖の桟橋の釣り";time=game.holidayPeriod==="午後"?(spot==="firefly"?"18時":"14時"):"10時";meeting="駅前";}
 const like=data.rules.spot_like[target].includes(spot),bad=data.rules.spot_bad[target].includes(spot);
 let answer=voice[like?"like":bad?"bad":"neutral"].replaceAll("{spot}",short);
 if(gender==="male")answer=answer.replaceAll("あなた","きみ");
 return {target,spot,index,lines:[
  {who:"narr",text:name(who)+"に連絡し、"+short+"へ一緒に行こうと誘った。"},
  {who,expr:like?"happy":bad?"worried":"neutral",text:answer},
  {who:"me",text:"じゃあ、"+time+"に"+meeting+"で待ち合わせよう。"},
  {who,expr:like?"happy":"neutral",text:voice.confirm},
  {who:"narr",text:"約束の時刻。待ち合わせ場所で合流し、二人で"+short+"へ向かった。"}
 ]};
}
function startDateInvitation(target,spot){
 if(busy||dateInvitation||current.type!=="decision"||current.kind!=="holiday")return;
 if(!game.can_date(target))return advance(["date",target,spot]);
 dateInvitation=buildDateInvitation(target,spot);syncStage();render();
}
function advanceDateInvitation(){
 const intro=dateInvitation,line=intro.lines[intro.index];history.push({who:line.who==="narr"?"地の文":name(line.who),text:line.text});
 if(++intro.index<intro.lines.length){render();return;}
 dateInvitation=null;stageKey=null;syncStage();advance(["date",intro.target,intro.spot]);
}
function advance(value){
 if(busy||$("modal").open||!game)return;
 if(dateInvitation)return advanceDateInvitation();
 try{
  const beforeStats={...game.st};
  audio.unlock();
  if(value!==undefined)tape[position]=value;
  if(current.type==="line"){readSet.add(lineKey(current.line));localStorage.setItem(SAVE+":read",JSON.stringify([...readSet]));}
  const beforeDay=game.day,beforePlace=$("scene-background").dataset.place,beforeTime=$("time-text").textContent;
  pendingTransition=null;
  rawNext(value);settle();saveAllowed=true;render();flushMusic();growth.position();
  if(!["milestone","complete"].includes(current.type)&&(pendingTransition||beforePlace!==$("scene-background").dataset.place||beforeTime!==$("time-text").textContent)){
   const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
   const kind=beforeDay!==game.day?"day_change":["white","dream","cutin"].includes(pendingTransition?.kind)?pendingTransition.kind:beforeTime!==$("time-text").textContent?"time_change":pendingTransition?.kind==="scene"?"event_start":"place_change";
   const rule=data.rules.transitions[kind];$("transition").dataset.kind=kind;
   const ms=options.effects&&!reduced?rule.ms:200;
   busy=true;growth.pause();$("transition-title").textContent=pendingTransition?.title||"";
   $("transition").hidden=false;transitionTimer=setTimeout(finishTransition,ms);
  }else maybeOfferInference();
  showStatDelta(beforeStats);
 }catch(error){fail(error);}
}
function finishTransition(){clearTimeout(transitionTimer);busy=false;$("transition").hidden=true;maybeOfferInference();growth.flush();}
$("transition").addEventListener("click",finishTransition);
function begin(config){
 if(config.restore?.revision&&config.restore.revision!==window.HMPlaytest.revision)throw Error("この記録に対応する改訂版が必要です。");
 activityFloorFrom=config.restore?(Number.isInteger(config.restore.activityFloorFrom)?config.restore.activityFloorFrom:config.restore.position):-1;
 musicId="title";growth.reset();audio.setSfxVolume(options.sfxVolume??.45);audio.setVolume(options.bgmVolume??.3);
 suppressInference=true;inferenceOffer=null;inferenceOfferedDays=new Set(config.restore?.inferenceOfferedDays||[]);$("modal").close();finishTransition();dateInvitation=null;locationKnowledge={};preferenceKnowledge={};hintedDays=new Set();restoring=!!config.restore;seed=config.seed;gender=config.gender;player={...config.player,gender:config.player.gender||config.gender};game=config.restore&&!config.restore.revision?new Game(data,seed):new window.HMPlaytest.Game(data,seed);iterator=game.play({throughApril:config.throughApril||new URLSearchParams(location.search).has("april")});position=-1;tape={};history=[];acts={};scene=null;activity=null;lastWho=null;stageKey=null;stageCast=[];saveAllowed=true;
 $("title-screen").hidden=true;$("game-screen").hidden=false;
 rawNext();
 if(config.restore){
  const saved=config.restore;tape=saved.tape;
  if(saved.source!==window.HM_SOURCE_HASH&&!(window.HM_SOURCE_COMPATIBLE_HASHES||[]).includes(saved.source))throw new Error("台本が更新されています。この保存データは前の版です。");
  while(position<saved.position){const v=Object.hasOwn(tape,position)?tape[position]:current.type==="identify-opportunity"?null:undefined;rawNext(v);}
 }else settle();
 if(!isVisible(current))settle();
 restoring=false;
 const intro=config.restore?.dateInvitation;
 if(intro&&current.type==="decision"&&current.kind==="holiday"&&T.includes(intro.target)&&game.spots_open().includes(intro.spot)&&game.can_date(intro.target)&&Number.isInteger(intro.index)&&intro.index>=0&&intro.index<5){
  dateInvitation=buildDateInvitation(intro.target,intro.spot,intro.index);
  for(const line of dateInvitation.lines.slice(0,intro.index))history.push({who:line.who==="narr"?"地の文":name(line.who),text:line.text});
  syncStage();
 }
 render();audio.unlock();flushMusic();suppressInference=false;if(config.restore&&!game.revision)toast("この記録は以前のルールで続きます。新しい休日・考査・山場は「はじめから」で反映されます。");
 if(config.restore?.inferenceOffer&&T.includes(config.restore.inferenceOffer.target)&&canInferNow()&&readyToInfer(config.restore.inferenceOffer.target)){
  inferenceOfferedDays.delete(game.day);maybeOfferInference();
  if(config.restore.inferenceOffer.phase==="answer"&&inferenceOffer?.target===config.restore.inferenceOffer.target)infer(inferenceOffer.target);
 }else maybeOfferInference();
}
function save(){
 if(!game||!saveAllowed)return;
 const payload={schema:1,activityFloorFrom,source:window.HM_SOURCE_HASH,revision:game.revision||null,seed,gender,player,position,tape,options,dateInvitation:dateInvitation?{target:dateInvitation.target,spot:dateInvitation.spot,index:dateInvitation.index}:null,inferenceOfferedDays:[...inferenceOfferedDays],inferenceOffer:inferenceOffer?{...inferenceOffer}:null};
 localStorage.setItem(SAVE,JSON.stringify(payload));toast("ここまでの記録を保存しました。");
}
function load(){
 try{const value=localStorage.getItem(SAVE);if(!value)return;const s=JSON.parse(value);
 if(s.schema!==1||!Number.isSafeInteger(s.seed)||!Number.isInteger(s.position)||s.position<0||s.position>100000||!["male","female"].includes(s.gender))throw Error("保存データを読み込めません。");
 options=s.options||options;begin({...s,restore:s});}catch(error){fail(error);}
}
function openModal(title){growth.pause();$("modal-title").textContent=title;$("modal-content").replaceChildren();$("modal").showModal();}
function rememberLocation(who,place,{days=[],observed=false,text=""}={}){
 if(!Object.hasOwn(data.rules.places,place)||!characters[who])return;
 const key=who+":"+place,known=locationKnowledge[key]||(locationKnowledge[key]={days:[],observed:false,reported:false,evidence:[]});
 known.observed ||= observed;known.reported ||= !observed;known.days=[...new Set([...known.days,...days])];
 if(text&&!known.evidence.includes(text))known.evidence.push(text);
}
function learnLocation(line){
 const text=displayText(line,line.who),place=$("scene-background").dataset.place;
 if(!isHoliday()&&["朝","昼休み","放課後"].includes($("time-text").textContent)&&game.presentation.cast.includes(line.who)&&!/^（.*放送）/.test(text))rememberLocation(line.who,place,{observed:true,text});
 const aliases={roof:["屋上"],library:["図書室"],lab:["理科室"],workshop:["美術室"],infirmary:["保健室","保健委員"],cookroom:["家庭科室"],gym:["体育館"],field:["グラウンド"]};
 let referent=null,lastPlaces=[];
 for(const clause of text.split(/[。！？!?]/)){
  const named=namedChoicePeople(clause);
  if(named.length===1){if(referent!==named[0])lastPlaces=[];referent=named[0];}
  else if(named.length>1){referent=null;lastPlaces=[];}
  if(!referent||/いない|行かない|見かけない|来ない|じゃなく|ではなく/.test(clause))continue;
  const places=Object.entries(aliases).filter(([,words])=>words.some(w=>clause.includes(w))).map(([key])=>key);
  const days=[...clause.matchAll(/([月火水木金土日])曜/g)].map(m=>m[1]);
  for(const target of places.length?places:days.length?lastPlaces:[])rememberLocation(referent,target,{days,text});
  if(places.length)lastPlaces=places;
 }
}
function locationIntel(t,place){
 const known=locationKnowledge[game.CID[t]+":"+place];if(!known)return null;
 if(known.days.length)return known.days.join("・")+"によくいるらしい";
 return known.observed?"会ったことがある":"話に出た場所";
}
function campusMap(interactive=false){
 const wrapper=document.createElement("div");wrapper.className="campus-map";
 const keys=["roof","library","lab","workshop","infirmary","cookroom","gym","field"];
 for(const key of keys){
  const place=data.rules.places[key],b=button("",()=>{
   if(interactive)advance(key);
   else {detail.textContent=place.label+"："+Object.entries(place.gain).map(([stat,range])=>data.rules.stats[stat]+" "+range[0]+"〜"+range[1]).join(" / ");}
  });
  b.className="map-place map-"+key;b.dataset.place=key;
  const title=document.createElement("strong");title.textContent=data.places[key]?.name||place.label;
  const gains=document.createElement("span");gains.textContent=Object.keys(place.gain).map(k=>data.rules.stats[k]).join("・");
  const info=document.createElement("small");info.className="map-intel";let count=0;
  for(const t of T){const hint=locationIntel(t,key);if(!hint)continue;const chip=document.createElement("span");chip.className="intel-person";chip.dataset.person=game.CID[t];chip.title=name(game.CID[t])+" · "+hint;chip.setAttribute("role","img");chip.setAttribute("aria-label",chip.title);chip.append(faceIcon(game.CID[t]));info.append(chip);count++;}
  if(!count)info.textContent="居場所は会話や出会いで知っていこう";
  b.append(title,gains,info);wrapper.append(b);
 }
 const center=document.createElement("div");center.className="map-courtyard";center.textContent="校舎の廊下・中庭";wrapper.append(center);
 const detail=document.createElement("p");detail.className="map-detail";detail.textContent=interactive?"行きたい場所を選ぼう。顔アイコンは、会話や出会いで得た居場所の手がかりです。":"見取り図を確認できます。顔アイコンは、会話や出会いで得た居場所の手がかりです。";wrapper.append(detail);
 return wrapper;
}
function showMap(){if(!game)return;openModal("学園マップ");$("modal-content").append(campusMap());
 const heading=document.createElement("h3");heading.textContent="建物と、からだのつながり";$("modal-content").append(heading);
 const list=document.createElement("dl");list.className="map-legend";
 for(const [place,meaning] of Object.entries(data.rules.map))if(/廊下|倉庫|部室|水場棟|池の島|工房|二段ポスト|保健室|下駄箱/.test(place)){
  const term=document.createElement("dt"),value=document.createElement("dd");term.textContent=place;value.textContent=meaning;list.append(term,value);
 }$("modal-content").append(list);
}
function showHistory(){
 openModal("会話の履歴");
 for(const line of history){const p=document.createElement("p");p.className="history-line";const b=document.createElement("strong");b.textContent=line.who+"  ";p.append(b,document.createTextNode(line.text));$("modal-content").append(p);}
 $("modal-content").scrollTop=$("modal-content").scrollHeight;
}
function relation(t){return data.rules.tiers[game.tier(t)][1];}
function textElement(tag,text,cls){const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;return e;}
function callName(t){
 const calls=data.pools[game.CID[t]].call;let value="";for(const k of Object.keys(calls).map(Number).sort((a,b)=>a-b))if(game.tier(t)>=k)value=calls[k];
 return value.replace(/\{sei\}/g,player.sei).replace(/\{mei\}/g,player.mei);
}
function notebook(tab="能力"){
 if(!game)return;openModal("生徒手帳");const host=$("modal-content"),tabs=document.createElement("nav"),body=document.createElement("section");tabs.className="handbook-tabs";tabs.setAttribute("aria-label","手帳のページ");body.className="handbook-body";
 for(const label of ["能力","人とのつながり","図鑑","教科書","観察メモ","結末の記録"]){const b=button(label,()=>notebook(label));b.setAttribute("aria-selected",String(label===tab));tabs.append(b);}host.append(tabs,body);
 const knownScenes=game.d.scenes.filter(s=>game.seen["scene:"+s.id]);
 const ready=T.filter(readyToInfer);
 if(ready.length&&tab!=="図鑑"&&Number(calendarRow()?.[1]?.match(/^(\d+)月/)?.[1])>=6){const guide=document.createElement("div");guide.className="inference-guide";guide.append(textElement("p","6月以降、条件がそろった相手の正体を考えるイベントが、会話の切れ目に入ります。図鑑から考えることもできます。"),button("図鑑で正体を推理する",()=>notebook("図鑑")));body.append(guide);}

 if(tab==="能力"){
  body.append(button("学園マップを見る",()=>{$("modal").close();showMap();}));
  const keys=Object.keys(data.rules.stats),ns="http://www.w3.org/2000/svg",svg=document.createElementNS(ns,"svg");svg.setAttribute("viewBox","0 0 360 330");svg.classList.add("stat-radar");svg.setAttribute("role","img");svg.setAttribute("aria-label","6能力のレーダー。各数値は下に表示。");
  const pt=(i,r)=>[180+Math.sin(i*Math.PI/3)*r,160-Math.cos(i*Math.PI/3)*r];
  for(const ratio of [.25,.5,.75,1]){const polygon=document.createElementNS(ns,"polygon");polygon.setAttribute("points",keys.map((_,i)=>pt(i,110*ratio).join(",")).join(" "));polygon.setAttribute("fill","none");polygon.setAttribute("stroke","#53749c");svg.append(polygon);}
  const area=document.createElementNS(ns,"polygon");area.setAttribute("points",keys.map((k,i)=>pt(i,110*Math.min(1,game.st[k]/data.rules.stat_max)).join(",")).join(" "));area.setAttribute("fill","#1f6feb99");area.setAttribute("stroke","#ffd23f");area.setAttribute("stroke-width","3");svg.append(area);
  keys.forEach((k,i)=>{const label=document.createElementNS(ns,"text"),[x,y]=pt(i,140);label.setAttribute("x",x);label.setAttribute("y",y);label.setAttribute("fill","white");label.setAttribute("text-anchor","middle");label.textContent=data.rules.stats[k];svg.append(label);});body.append(svg);
  const stats=document.createElement("div");stats.className="stat-grid";for(const [key,label] of Object.entries(data.rules.stats)){const c=textElement("div",label,"stat-card");c.append(textElement("b",game.st[key]));stats.append(c);}body.append(stats,textElement("p","ストレス "+game.st.stress));
 }else if(tab==="人とのつながり"||tab==="図鑑"){
  const cards=document.createElement("div");cards.className="notebook-grid";
  for(const t of T){const card=document.createElement("article");card.className="person-card";card.append(textElement("h3",name(game.CID[t])),textElement("p",relation(t)+(game.lit[t]?" · 気にかけてほしい様子":"")),textElement("p","呼び方："+callName(t)),textElement("p","観察メモ "+game.clues[t].size+"枚"));
   if(preferenceKnowledge[t])card.append(textElement("p","赤路メモ："+preferenceKnowledge[t],"preference-note"));
   if(tab==="図鑑"){
    card.append(textElement("p",game.ident[t]?data.rules.identify.answer[t]:"正体：？？？"),button("立ち絵を見る",()=>characterSheet(t)));
    if(game.ident[t])card.append(button("教科書を読む",()=>notebook("教科書")));
    else if(game.cool[t]>0)card.append(textElement("p","メモを見直そう。あと"+game.cool[t]+"日で再び推理できます。"));
    else if(readyToInfer(t)){
     const action=button("正体を推理する",()=>infer(t));action.className="infer-primary";action.disabled=!canInferNow();card.append(action);
     if(!canInferNow())card.append(textElement("small",["complete","milestone"].includes(current.type)?"この周の推理は終了しています。エンド前の保存から再開すると、会話中に推理できます。":"推理は通常の会話中に行えます。"));
    }else if(game.clues[t].size<data.rules.identify.clues_needed)card.append(textElement("small","推理には観察メモが"+data.rules.identify.clues_needed+"枚必要です。"));
    else card.append(textElement("small",closeEnoughToInfer(t)?"もう少し一緒に過ごしてから、観察メモを振り返ってみよう。":"もう少し仲良くなると、観察メモの意味がつながりそう。"));
    const details=document.createElement("details"),summary=textElement("summary","観察メモを見る（"+game.clues[t].size+"枚）"),list=document.createElement("ul");
    for(const clue of game.clues[t])list.append(textElement("li",clue));details.append(summary,list);card.append(details);

   }else if(readyToInfer(t))card.append(button("図鑑で正体を推理する",()=>notebook("図鑑")));
   cards.append(card);
  }body.append(cards);
 }else if(tab==="教科書"){
  let count=0;
  for(const t of T)if(game.ident[t]){const row=textElement("article","","book-row");row.append(textElement("h3",name(game.CID[t])+" · "+data.rules.identify.answer[t]));for(const line of data.pools[game.CID[t]].textbook[0])row.append(textElement("p",displayText(line)));body.append(row);count++;}
  for(const s of knownScenes)if(s.note&&(!s.lock||game.ident[s.lock])){const row=textElement("article","","book-row");row.append(textElement("h3","📓 "+displayField(s,"title")),textElement("p",s.note));body.append(row);count++;}
  if(!count)body.append(textElement("p","観察メモを集めて正体がわかると、教科書のページが開きます。"));
 }else if(tab==="観察メモ"){
  const records=knownScenes.filter(s=>s.obs);if(!records.length)body.append(textElement("p","これから出会う人の行動を、よく見てみよう。"));
  for(const s of records){const row=textElement("article","","book-row");row.append(textElement("h3",displayField(s,"title")),textElement("p",displayField(s,"obs")));body.append(row);}
 }else{
  const records=endRecords();if(!records.length)body.append(textElement("p","結末の記録は、物語を読み終えると残ります。"));
  for(const r of records)body.append(textElement("p",r.title+" · "+(r.castGender==="male"?"男性キャスト":"女性キャスト")));
 }
}
function characterSheet(t){
 openModal(name(game.CID[t]));const figure=document.createElement("figure");figure.className="character-sheet";const image=document.createElement("img");image.src=portraitSource(game.CID[t]);image.alt=name(game.CID[t])+"の通常立ち絵";figure.append(image);
 const back=button("図鑑に戻る",()=>notebook("図鑑"));$("modal-content").append(figure,textElement("p",relation(t)+" · 身長"+window.HM_STAGE_METRICS[characterKey(game.CID[t])].height_cm+"cm"),back);
}
function infer(t){
 if(!canInferNow()||!readyToInfer(t))return;
 if(inferenceOffer?.target===t)inferenceOffer.phase="answer";
 openModal(name(game.CID[t])+"の正体を推理");const layout=document.createElement("div");layout.className="identity-layout";const notes=document.createElement("section"),answers=document.createElement("section"),list=document.createElement("ul");notes.append(textElement("h3","観察メモ"));for(const clue of game.clues[t])list.append(textElement("li",clue));notes.append(list);
 const choices=document.createElement("div");choices.className="identity-options";let selected=null;
 const confirm=button("札を選んで決定",()=>{if(!selected)return;inferenceOffer=null;$("modal").close();advance({identify:[[t,selected]]});});confirm.className="identity-confirm";confirm.disabled=true;
 for(const i of window.HMWidgets.permutation(data.rules.identify.choices.length,seed+":"+t+":"+game.day)){
  const value=data.rules.identify.choices[i],b=button(value,()=>{selected=value;for(const el of choices.children)el.setAttribute("aria-pressed",String(el===b));confirm.textContent="この人は「"+value+"」だ";confirm.disabled=false;});b.setAttribute("aria-pressed","false");choices.append(b);
 }answers.append(choices,confirm);layout.append(notes,answers);$("modal-content").append(layout);
}
function settings(){
 openModal("設定");
 const row=document.createElement("label");row.className="settings-row";row.textContent="音楽の音量";
 const range=document.createElement("input");range.id="bgm-volume";range.type="range";range.min="0";range.max="1";range.step=".05";range.value=audio.volume;range.addEventListener("input",()=>{audio.unlock();options.bgmVolume=Number(range.value);audio.setVolume(options.bgmVolume);});row.append(range);
 const effect=document.createElement("label");effect.className="settings-row";effect.textContent="場面転換の動き";
 const check=document.createElement("input");check.type="checkbox";check.checked=options.effects;check.addEventListener("change",()=>options.effects=check.checked);effect.append(check);
 const seRow=document.createElement("label");seRow.className="settings-row";seRow.textContent="効果音の音量";
 const seRange=document.createElement("input");seRange.id="sfx-volume";seRange.type="range";seRange.min="0";seRange.max="1";seRange.step=".05";seRange.value=audio.sfxVolume;
 seRange.addEventListener("input",()=>{audio.unlock();options.sfxVolume=Number(seRange.value);audio.setSfxVolume(options.sfxVolume);});
 seRange.addEventListener("change",()=>audio.playStatUp());seRow.append(seRange);
 $("modal-content").append(row,seRow,effect);
}
function fail(error){console.error(error);$("title-status").textContent=error.message;openModal("読み込みを確認してください");const p=document.createElement("p");p.className="error";p.textContent=error.message;$("modal-content").append(p);}
$("start-form").addEventListener("submit",event=>{event.preventDefault();if(!report.ok)return;
 try{const values=new Uint32Array(1);crypto.getRandomValues(values);begin({seed:values[0],gender:$("cast-gender").value,player:{sei:$("player-sei").value.trim()||"春野",mei:$("player-mei").value.trim()||"悠",gender:$("player-gender").value}});}catch(e){fail(e);}
});
$("dialogue").addEventListener("click",()=>advance());
$("load-title").disabled=!localStorage.getItem(SAVE);$("load-title").addEventListener("click",load);
$("save-button").addEventListener("click",save);$("history-button").addEventListener("click",showHistory);$("notebook-button").addEventListener("click",()=>notebook());
$("map-button").addEventListener("click",showMap);
$("milestone-notebook").addEventListener("click",()=>notebook());$("settings-button").addEventListener("click",settings);$("close-modal").addEventListener("click",()=>{inferenceOffer=null;$("modal").close();growth.flush();});
$("back-title").addEventListener("click",()=>{growth.reset();$("game-screen").hidden=true;$("title-screen").hidden=false;$("load-title").disabled=!localStorage.getItem(SAVE);requestMusic("title");flushMusic();});
$("cast-gender").addEventListener("change",()=>{$("title-art").src=assets.characters["insulin-"+$("cast-gender").value].expression.neutral;});
$("title-art").src=assets.characters["insulin-female"].expression.neutral;

document.addEventListener("pointerdown",()=>audio.unlock(),{once:true});
let dialogueGesture=null,holdTimer=null,holdInterval=null;
$("dialogue").addEventListener("pointerdown",e=>{dialogueGesture={id:e.pointerId,y:e.clientY};holdTimer=setTimeout(()=>{holdInterval=setInterval(()=>{if(current?.type==="line"&&readSet.has(lineKey(current.line)))advance();},90);},450);});
function stopHold(){clearTimeout(holdTimer);clearInterval(holdInterval);}
document.addEventListener("pointerup",e=>{const gesture=dialogueGesture;dialogueGesture=null;stopHold();if(gesture?.id===e.pointerId&&e.clientY-gesture.y>90&&game&&!$("modal").open)showHistory();});
document.addEventListener("pointercancel",()=>{dialogueGesture=null;stopHold();});
window.addEventListener("resize",()=>growth.position());
document.addEventListener("visibilitychange",()=>growth.flush());
const stageObserver=new ResizeObserver(updateStageBounds);stageObserver.observe(document.querySelector(".hud"));stageObserver.observe($("status-toast"));
if(!report.ok){$("title-status").textContent="台本の読み込みに問題があります。";$("start-form").querySelector("button").disabled=true;}
requestMusic("title");flushMusic();
window.HM_APP={get game(){return game;},get current(){return current;},get inferenceOffer(){return inferenceOffer?{...inferenceOffer}:null;},get dateInvitation(){return dateInvitation?{target:dateInvitation.target,spot:dateInvitation.spot,index:dateInvitation.index}:null;},get position(){return position;},begin,advance,save,load,displayField,namedChoicePeople,notebook,validation:report};
})();
