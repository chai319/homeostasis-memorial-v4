/* Persistent, display-only portrait collection. Never changes game state or journals. */
(function(g){'use strict';
 const faces={neutral:'ふだんの顔',happy:'笑顔',blush:'照れ顔',worried:'心配',surprised:'驚き',angry:'怒り',rage:'本気の怒り',listless:'元気のない顔',depressed:'落ち込み',playful:'いたずらな笑顔',trust:'信頼',joyful_tears:'うれし涙',tears:'涙',sorrow:'悲しみ',reaction:'とっさの反応',relief:'ほっとした顔'};
 const gestures={'caught-close':'不意に近づいて','excited-approach':'身を乗り出して','look-up':'見上げて','look-down':'見下ろして',protest:'抗議','shy-side':'恥ずかしそうに','trust-closer':'心を開いて','daily-cute':'とっておきの姿','love-accepted':'想いが通じて',explain:'先生の説明',overloaded:'先生のピンチ',encourage:'先生の励まし'};
 const normalize=path=>String(path||'').split(/[?#]/)[0].replace(/\.webp$/,'.png');
 function catalog(assets,lake,characters){
  const people=[];
  for(const who of ['insulin','glucagon','adrenaline','thyroxine','cortisol','adh','redcell','hypothalamus']){
   const person=characters.find(c=>c.id===who);if(!person)continue;
   for(const gender of who==='hypothalamus'?['teacher']:['female','male']){
    const key=gender==='teacher'?who:who+'-'+gender,set=assets.characters[key];if(!set)continue;
    const entries=[],ids=new Set();
    const add=(src,label,group)=>{const id=normalize(src);if(ids.has(id))return;ids.add(id);entries.push({id,src,label,group,key});};
    for(const [expr,src]of Object.entries(set.expression))add(src,faces[expr]||'表情','expression');
    for(const [act,src]of Object.entries(set.acting))add(src,gestures[act]||'仕草','acting');
    for(const [expr,src]of Object.entries(lake[key]||{}))add(src,faces[expr]||'表情','swim');
    people.push({key,who,gender,name:gender==='teacher'?person.female:person[gender],entries});
   }
  }
  return people;
 }
 class Collection{
  constructor({assets,lake={},characters,storageKey,storage}){
   this.people=catalog(assets,lake,characters);this.entries=new Map(this.people.flatMap(p=>p.entries.map(e=>[e.id,e])));this.storageKey=storageKey;this.seen=new Set();
   try{this.storage=storage===undefined?g.localStorage:storage;}catch{}this.mergeStorage();
  }
  mergeStorage(){try{const record=JSON.parse(this.storage?.getItem(this.storageKey)||'null');if(record?.version===1&&Array.isArray(record.seen))for(const id of record.seen)if(this.entries.has(id))this.seen.add(id);}catch{}}
  has(entry){return this.seen.has(typeof entry==='string'?normalize(entry):entry.id);}
  record(src){const id=normalize(src);if(!this.entries.has(id)||this.seen.has(id))return false;this.mergeStorage();if(this.seen.has(id))return false;this.seen.add(id);try{this.storage?.setItem(this.storageKey,JSON.stringify({version:1,seen:[...this.seen]}));}catch{}return true;}
  person(key){return this.people.find(p=>p.key===key);}
  known(person){return person.entries.some(e=>this.has(e));}
  title(person){return this.known(person)?person.name:'？？？';}
  count(person){return person.entries.filter(e=>this.has(e)).length;}
  summary(){return {collected:this.seen.size,total:this.entries.size,storageKey:this.storageKey};}
  image(entry,alt){const img=document.createElement('img');img.src=entry.src;img.alt=alt;img.loading='lazy';img.decoding='async';img.draggable=false;return img;}
  index(onPerson){
   const host=document.createElement('section');host.className='portrait-collection';const summary=this.summary();
   host.append(el('p','本編で見た立ち絵を記録します。収集はこのブラウザーに保存され、次の周にも引き継がれます。','portrait-guide'),el('p',summary.collected+' / '+summary.total+' 枚を収集','portrait-progress'));
   for(const [gender,label]of [['female','女性キャスト'],['male','男性キャスト'],['teacher','先生']]){
    host.append(el('h3',label));const grid=el('div','','portrait-people');
    for(const person of this.people.filter(p=>p.gender===gender)){
     const known=this.known(person),cover=person.entries.find(e=>this.has(e))||person.entries.find(e=>e.group==='expression'&&/\/neutral\./.test(e.src))||person.entries[0];
     const card=action('',()=>onPerson(person.key));card.className='portrait-person'+(known?'':' portrait-locked');card.dataset.person=person.key;
     const frame=el('span','','portrait-thumb');frame.append(this.image(cover,known?person.name:'未収集の人物のシルエット'));
     card.append(frame,el('strong',this.title(person)),el('span',this.count(person)+' / '+person.entries.length+' 枚'));grid.append(card);
    }host.append(grid);
   }return host;
  }
  sheet(key,{onBack,onOpen}){
   const person=this.person(key),host=el('section','','portrait-collection');if(!person)return host;
   host.append(action('立ち絵図鑑に戻る',onBack),el('p',this.count(person)+' / '+person.entries.length+' 枚を収集','portrait-progress'));
   for(const [group,label]of [['expression',person.gender==='teacher'?'先生の表情':'制服・表情'],['acting',person.gender==='teacher'?'先生の仕草':'制服・仕草'],['swim','水着']]){
    const entries=person.entries.filter(e=>e.group===group);if(!entries.length)continue;host.append(el('h3',label));const grid=el('div','','portrait-variants');
    entries.forEach((entry,index)=>{
     const seen=this.has(entry),label=seen?entry.label:'未収集',card=action('',()=>onOpen(key,entry.id));card.className='portrait-variant'+(seen?'':' portrait-locked');card.dataset.portrait=entry.id;card.setAttribute('aria-label',label+'・'+(index+1));
     const frame=el('span','','portrait-thumb');frame.append(this.image(entry,seen?person.name+'・'+entry.label:'未収集の立ち絵のシルエット'));
     card.append(frame,el('span',label));grid.append(card);
    });host.append(grid);
   }return host;
  }
  detail(key,id,onBack){
   const person=this.person(key),entry=person?.entries.find(e=>e.id===normalize(id)),host=el('section','','portrait-collection');if(!entry)return host;
   const seen=this.has(entry),figure=el('figure','','portrait-full'+(seen?'':' portrait-locked'));
   const image=this.image(entry,seen?person.name+'・'+entry.label:'未収集の立ち絵のシルエット');image.loading='eager';figure.append(image);
   host.append(action('この人の立ち絵に戻る',onBack),figure,el('p',seen?entry.label:'まだ出会っていない立ち絵です。','portrait-caption'));return host;
  }
 }
 function el(tag,text,cls){const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;return e;}
 function action(label,fn){const b=el('button',label);b.type='button';b.addEventListener('click',fn);return b;}
 g.HMPortraitCollection={Collection,catalog,normalize};if(typeof module!=='undefined')module.exports=g.HMPortraitCollection;
})(globalThis);
