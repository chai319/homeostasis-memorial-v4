/* Public-stat feedback only; no game state or random-number consumption. */
(function(global){"use strict";
class GrowthFeedback {
 constructor(host,{canShow,playSound}){this.host=host;this.canShow=canShow;this.playSound=playSound;this.queue=[];this.active=null;this.timer=null;}
 enqueue(changes){
  if(!changes.length){this.flush();return;}
  // Rapid taps retain each actual gain, coalescing only the not-yet-shown batch.
  let batch=this.queue.at(-1);
  if(!batch||batch.sounded||changes.some(c=>batch.changes.some(old=>old.key===c.key&&Math.sign(old.delta)!==Math.sign(c.delta)))){batch={changes:[],sounded:false};this.queue.push(batch);}
  for(const change of changes){const old=batch.changes.find(c=>c.key===change.key);if(old){old.after=change.after;old.delta+=change.delta;}else batch.changes.push({...change});}
  this.flush();
 }
 flush(){
  if(!this.canShow()){this.pause();return;}
  if(this.active||!this.queue.length)return;
  const batch=this.active=this.queue.shift(),host=this.host;
  host.replaceChildren();
  const gain=batch.changes.some(c=>c.key!=="stress"&&c.delta>0),relief=batch.changes.some(c=>c.key==="stress"&&c.delta<0);
  const heading=document.createElement("strong");heading.className="growth-heading";heading.textContent=gain?"能力アップ！":relief?"ひと息つけた":"能力の変化";
  const rows=document.createElement("div");rows.className="growth-values";
  for(const c of batch.changes){
   const row=document.createElement("span"),good=c.key==="stress"?c.delta<0:c.delta>0;row.className=good?"growth-rise":"growth-fall";row.dataset.stat=c.key;
   const label=document.createElement("span"),delta=document.createElement("b"),total=document.createElement("small");
   label.textContent=c.label;delta.textContent=(c.delta>0?"+":"")+c.delta;total.textContent=c.before+" → "+c.after;
   row.append(label,delta,total);rows.append(row);
   const stat=document.querySelector('#status-strip [data-stat="'+c.key+'"] strong');
   if(stat){stat.classList.remove("stat-gain-flash","stat-loss-flash");void stat.offsetWidth;stat.classList.add(good?"stat-gain-flash":"stat-loss-flash");}
  }
  host.dataset.benefit=String(gain||relief);host.append(heading,rows);host.hidden=false;this.position();
  if(!batch.sounded){batch.sounded=true;if(gain||relief)this.playSound();}
  this.timer=setTimeout(()=>{host.hidden=true;host.replaceChildren();this.active=null;this.flush();},3400);
 }
 position(){
  if(this.host.hidden)return;
  const screen=document.getElementById("game-screen").getBoundingClientRect(),dialogue=document.getElementById("dialogue"),box=dialogue.getBoundingClientRect();
  // In dialogue, sit immediately above its upper edge; in menus use the reserved bottom area.
  const bottom=dialogue.hidden?screen.height*.03:screen.bottom-box.top+12;
  this.host.style.bottom=bottom+"px";
  const hud=document.querySelector(".hud").getBoundingClientRect();
  this.host.style.maxHeight=Math.max(70,screen.height-bottom-(hud.bottom-screen.top)-8)+"px";
 }
 // Once visible, a notification is consumed. Only unseen batches survive interruptions.
 pause(){clearTimeout(this.timer);this.timer=null;this.active=null;this.host.hidden=true;this.host.replaceChildren();}
 reset(){clearTimeout(this.timer);this.queue=[];this.active=null;this.host.hidden=true;this.host.replaceChildren();document.querySelectorAll('.stat-gain-flash,.stat-loss-flash').forEach(n=>n.classList.remove('stat-gain-flash','stat-loss-flash'));}
}
global.HMGrowthFeedback=GrowthFeedback;
})(globalThis);
