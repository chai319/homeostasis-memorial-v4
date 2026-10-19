/* Local, disposable input widgets. The game RNG is never used for UI layout/timers. */
(function(global){'use strict';
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
const button=(text,fn)=>{const b=el('button',text);b.type='button';b.addEventListener('click',fn);return b;};
function permutation(n,key){let h=2166136261;for(const c of key)h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;const a=Array.from({length:n},(_,i)=>i);for(let i=n-1;i>0;i--){h=(Math.imul(h,1664525)+1013904223)>>>0;const j=h%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
function minigame({event:e,game,name,portrait,submit,key}){
 const root=el('section',undefined,'mini-game'),title=el('h2',game.R.minigames[e.name].name),status=el('p','準備ができたら始めよう。','mini-status');root.append(title,status);
 let disposed=false,done=false,timers=[],frame,clockFrame;
 let clock=performance.now(),lastReal=performance.now();
 const clockTick=()=>{const real=performance.now();if(!document.hidden&&!document.querySelector('dialog[open]'))clock+=real-lastReal;lastReal=real;if(!disposed&&!done)clockFrame=requestAnimationFrame(clockTick);};clockFrame=requestAnimationFrame(clockTick);
 const now=()=>clock;
 const resetClock=()=>{lastReal=performance.now();};document.addEventListener('visibilitychange',resetClock);
 const later=(fn,ms)=>{const due=now()+ms;const tick=()=>{if(disposed||done)return;if(now()>=due)fn();else timers.push(setTimeout(tick,25));};timers.push(setTimeout(tick,25));};
 const finish=value=>{if(done||disposed)return;done=true;timers.forEach(clearTimeout);cancelAnimationFrame(frame);cancelAnimationFrame(clockFrame);document.removeEventListener('visibilitychange',resetClock);submit(value);};
 if(e.name==='dash'){
  const bar=el('div',undefined,'dash-track'),zone=el('span',undefined,'dash-zone'),marker=el('span',undefined,'dash-marker'),roundText=el('p','全3回。光る範囲でカーソルを止めよう。','dash-round');
  bar.setAttribute('role','img');bar.setAttribute('aria-label','左右に動くカーソルと停止する範囲');bar.append(zone,marker);
  const pad=el('button','スタート位置につく','dash-pad');pad.type='button';
  let phase='prepare',round=0,origin=0,hits=0,results=[],center=50,width=20;
  root.dataset.game='dash';root.append(roundText,bar,pad);
  function startRound(){
   if(disposed||done)return;phase='go';origin=now();center=35+(permutation(10,key+':'+round)[0]/9)*30;width=20-round*2;
   zone.style.left=(center-width/2)+'%';zone.style.width=width+'%';pad.disabled=false;pad.textContent='ここで止める';pad.classList.remove('waiting');pad.classList.add('go');roundText.textContent=(round+1)+' / 3 回 · 成功 '+hits+'回';status.textContent='カーソルが光る範囲に入ったらタップ！';paint();
  }
  function position(){const v=((now()-origin)/(1400-round*220))%2;return (v<1?v:2-v)*100;}
  function paint(){
   if(done||disposed||phase!=='go')return;const x=position();marker.style.left=x+'%';root.dataset.marker=x.toFixed(2);root.dataset.zoneCenter=center.toFixed(2);root.dataset.zoneWidth=width;
   if(now()-origin>6500){stop(true);return;}frame=requestAnimationFrame(paint);
  }
  function stop(timeout=false){
   if(phase!=='go')return;const x=position(),distance=Math.abs(x-center),hit=!timeout&&distance<=width/2;phase='result';pad.disabled=true;cancelAnimationFrame(frame);marker.style.left=x+'%';if(hit)hits++;
   const result=timeout?'TIME UP':hit?(distance<=width/5?'PERFECT!':'GOOD!'):'MISS';results.push({position:Math.round(x),center:Math.round(center),hit,result});status.textContent=result;pad.textContent=round===2?'ゴール！':'次の区間へ';round++;
   if(round===3){later(()=>finish({score:hits===3&&game.st.tai<40?2:hits,hits,rounds:results,game:'timing-bar'}),600);return;}
   later(startRound,650);
  }
  pad.onclick=()=>{
   if(phase==='prepare'){phase='waiting';pad.textContent='位置について……';pad.classList.add('waiting');status.textContent='合図を待とう。先に押すとフライング。';later(startRound,1500+permutation(10,key)[0]*100);return;}
   if(phase==='waiting')finish({score:0,reason:'false-start',game:'timing-bar'});
   else stop();
  };
 }else if(e.name==='borrow'){
  const description=el('p',`${e.number} / ${e.total} 枚目の封筒`),cards=el('div',undefined,'borrow-cards'),loading=[];root.append(description);
  for(const t of global.HMCore.T){const b=button('',()=>finish(t)),face=el('span',undefined,'mini-face'),img=el('img'),label=el('span',name(game.CID[t]));img.src=portrait(game.CID[t]);img.alt='';face.append(img);b.append(face,label);b.dataset.target=t;cards.append(b);loading.push(img.decode().catch(()=>{}));}
  const start=button('封筒を開く',()=>{
   start.remove();status.textContent=game.R.minigames.borrow.cards[e.target][0];root.append(cards);let left=10;
   const countdown=el('p','残り10秒','mini-countdown');root.append(countdown);
   const tick=()=>{countdown.textContent=`残り${--left}秒`;if(left<=0)finish(null);else later(tick,1000);};later(tick,1000);
  });start.disabled=true;Promise.all(loading).then(()=>{if(!disposed)start.disabled=false;});root.append(start);
 }else{
  const progress=el('progress');progress.max=30;progress.value=0;
  const feet=el('div',undefined,'pair-feet'),beat=el('p','輪が重なる瞬間に、左・右を交互にタップ。30歩。','pair-beat');root.append(beat,progress);root.dataset.game='pair';
  const start=button('息を合わせる',()=>{
   start.remove();root.append(feet);status.textContent='大きな輪が縮んで、内側の輪に重なったらタップ。途中でテンポが変わるよ。';let step=0,expected=now()+900,errors=[];
   const buttons=[0,1].map(side=>{const b=button(side===0?'左':'右',()=>tap(side)),target=el('span',undefined,'rhythm-target'),ring=el('span',undefined,'approach-ring'),label=el('span',side===0?'左':'右','rhythm-label');b.textContent='';b.dataset.side=side;b.setAttribute('aria-label',side===0?'左':'右');b.append(target,ring,label);feet.append(b);return b;});
   const bpm=()=>[96,112,104,120][Math.min(3,Math.floor(step/8))];
   function paint(){
    if(done||disposed)return;const delta=now()-expected;root.dataset.timingError=delta.toFixed(1);root.dataset.step=step;root.dataset.bpm=bpm();beat.textContent=(step+1)+' / 30 歩 · '+(step%2===0?'左':'右')+' · '+bpm()+' BPM';
    buttons.forEach((b,side)=>{const lead=expected+(side===step%2?0:60000/bpm())-now(),scale=Math.max(.5,Math.min(2.8,1+lead/650));b.querySelector('.approach-ring').style.transform='translate(-50%,-50%) scale('+scale+')';b.classList.toggle('beat-active',side===step%2&&Math.abs(delta)<=160);});
    if(delta>350)tap(-1);if(!done&&!disposed)frame=requestAnimationFrame(paint);
   }
   function tap(side){
    if(done||disposed)return;const delta=now()-expected;if(delta < -350){status.textContent='少し早い！ 輪が重なるまで待とう。';return;}
    const correct=side===step%2,error=Math.abs(delta)+(correct?0:600);errors.push(error);status.textContent=!correct||Math.abs(delta)>240?'MISS':Math.abs(delta)<=80?'PERFECT!':'GOOD!';step++;progress.value=step;
    if(step===30){const average=errors.reduce((a,b)=>a+b,0)/30;finish({score:average<150&&game.st.tai+game.st.kiku>=60&&game.fr[e.target]>=50?3:average<250?2:average<450?1:0,meanError:Math.round(average),game:'shrinking-rings',beats:30});return;}
    expected+=60000/bpm();
   }
   frame=requestAnimationFrame(paint);
  });root.append(start);
 }

 return {element:root,dispose(){disposed=true;timers.forEach(clearTimeout);cancelAnimationFrame(frame);cancelAnimationFrame(clockFrame);document.removeEventListener('visibilitychange',resetClock);}};
}
global.HMWidgets={permutation,minigame};
})(globalThis);
