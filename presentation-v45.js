/* Presentation-only cues. Scenario text, event count and numeric state stay untouched.
 * Anchors match scene + speaker + text, never a bare line number. A changed script
 * leaves a stale cue in diagnostics instead of attaching it to a different line.
 */
(function(global){
"use strict";
const performance=global.HM_PERFORMANCE_CUES || (typeof module!=="undefined"?require("./performance-cues-v45.json"):{cues:[]});
const entries=[
 // V4.4 class outings: enter together when the narration establishes the gathering.
 ["ev_gwt", "土曜の朝。校門の前に、私服のクラスメイトが二十人ほど集まっていた。", ["insulin", "glucagon", "adrenaline", "thyroxine", "cortisol", "adh", "redcell"]],
 ["ev_gwt_pier", "夜明けには間に合わなかったけれど、朝の湖には、まだ霧が残っていた。影のクラスメイトたちが、桟橋にずらりと並ぶ。", ["insulin", "glucagon", "adrenaline", "thyroxine", "cortisol", "adh", "redcell"]],
 ["ev_gwt_cake", "駅前のケーキ食べ放題。九十分。クラス全員で、二つのテーブルを占領した。", ["insulin", "glucagon", "adrenaline", "thyroxine", "cortisol", "adh", "redcell"]],
 ["ev_gwt_rink", "連休のスケートリンクは、家族連れでにぎわっていた。クラスメイトたちが、手すりにしがみついている。", ["insulin", "glucagon", "adrenaline", "thyroxine", "cortisol", "adh", "redcell"]],
 ["ev_gwt_end", "夕方。駅前で解散した。", ["redcell"]],
 ["ev_party", "中間考査が終わった次の日の放課後。教室の空気が、ふわっと軽い。", ["insulin", "glucagon", "adrenaline", "thyroxine", "cortisol", "adh", "redcell"]],
 ["ev_party_diner", "商店街の「すみ食堂」。のれんをくぐると、澄のお母さんが、クラス全員分の席を空けてくれていた。", ["insulin", "glucagon", "adrenaline", "thyroxine", "cortisol", "adh", "redcell"]],
 ["ev_party_lib", "町の図書館の、グループ学習室。打ち上げなのに、全員が問題用紙を広げている。", ["insulin", "glucagon", "adrenaline", "thyroxine", "cortisol", "adh", "redcell"]],
 ["ev_party_beach", "夕方の湖畔の浜。屋台に明かりがともりはじめた。考査明けのクラスが、浜の一角を占領する。", ["insulin", "glucagon", "adrenaline", "thyroxine", "cortisol", "adh", "redcell"]],
 ["ev_party_end", "帰り道。誰かのスマホから、クラスの集合写真が回ってきた。", ["redcell"]],
 ["ev_homeroom","教室。胸ポケット",["hypothalamus"]],
 ["ev_curry","同じ班に、あの六人",["insulin","glucagon","adrenaline","thyroxine","cortisol","adh"]],
 ["ev_sports_a","号砲より早く",["adrenaline"]],
 ["ev_roof","少しあとで、備",["cortisol"]],
 ["ev_roof","最後に、ゆっくりと燈",["thyroxine"]],
 ["ev_cooking","調理実習。同じ班",["insulin","adh","glucagon"]],
 ["ev_cram","日直の用事で職員室",["hypothalamus"]],
 ["ev_cram2","三日後。備が",["cortisol"]],
 ["ev_rain","昇降口に、三人",["adrenaline","thyroxine","adh"]],
 ["ev_cold_care","夕方。チャイム",["insulin","glucagon","adh","cortisol"]],
 ["ev_proxy","衣替え。職員室",["hypothalamus"]],
 ["p_ins_1","家庭科室をのぞくと",["insulin"]],
 ["p_glu_1","グラウンドで、蓄",["glucagon"]],
 ["p_glu_2","蓄に呼ばれて",["glucagon"]],
 ["p_adr_1","体育館では、演劇部",["adrenaline"]],
 ["p_adr_2","放送が終わる前に",["adrenaline"]],
 ["p_adr_3","夜。グラウンド",["adrenaline"]],
 ["p_thy_1","美術室の奥に",["thyroxine"]],
 ["p_cor_1","図書室の窓際",["cortisol"]],
 ["p_cor_2","科学部の理科室",["cortisol"]],
 ["p_adh_1","保健室で、水守",["adh"]],
 ["tr_ins_1","廊下の角で、澄",["insulin"]],
 ["cv_adr_03","至近距離で",["adrenaline"]],
 ["rv_ins_2","校門に、澄はいなかった",["glucagon"]],
 ["rv_ins_2","しばらくして、澄",["insulin","glucagon"]],
 ["rv_ins_2j","澄が先に歩きだしたあと",["glucagon"]],
 ["rv_glu_2","校門で待っていたのは",["insulin"]],
 ["rv_glu_2","グラウンドから、蓄が",["glucagon"]],
 ["rv_adr_2","校門で待っていたのは",["cortisol"]],
 ["rv_cor_2","校門で待っていたのは",["adrenaline"]],
 ["rv_thy_2","校門で待っていたのは",["adh"]],
 ["rv_thy_2","燈が来た",["thyroxine","adh"]],
 ["rv_adh_2","校門で待っていたのは",["thyroxine"]],
 ["rv_adh_2","水守が来た",["adh","thyroxine"]],
 ["end_ins","大イチョウの下に",["insulin"]],
 ["end_glu","大イチョウの下で",["glucagon"]],
 ["end_adr","走った。イチョウ",["adrenaline"]],
 ["end_thy","大イチョウの下で",["thyroxine"]],
 ["end_cor","二十時十二分",["cortisol"]],
 ["end_adh","大イチョウの下で",["adh"]],
 ["end_friend","赤路が、缶ジュース",["redcell"]],
 ["end_pair_ins","大イチョウの下に",["insulin","glucagon"]],
 ["end_pair_adr","大イチョウの下に",["adrenaline","cortisol"]],
 ["end_pair_thy","大イチョウの下で",["thyroxine","adh"]],
 ["ep_rv_ins","帰り道、街灯",["glucagon"]],
 ["ep_rv_glu","帰り道、街灯",["insulin"]],
 ["ep_rv_adr","帰り道、街灯",["cortisol"]],
 ["ep_rv_cor","帰り道、どこからか",["adrenaline"]],
 ["ep_rv_thy","帰り道、街灯",["adh"]],
 ["ep_rv_adh","帰り道、街灯",["thyroxine"]]
];
const exits=[
 ["rv_ins_2","蓄は、それ以上",["glucagon"]],
 ["rv_glu_2","澄は弁当箱を抱え直して",["insulin"]],
 ["rv_adr_2","備は手帳を閉じて",["cortisol"]],
 ["rv_cor_2","瞬は柱から飛び降りて",["adrenaline"]],
 ["rv_thy_2","水守は、水筒を一本だけ校門",["adh"]],
 ["rv_adh_2","燈はマフラーを巻き直して",["thyroxine"]],
 ["rv_ins_3","家庭科室の前で振り返ると",["glucagon"]],
 ["rv_adr_3","瞬を連れ出して振り返ると",["cortisol"]],
 ["rv_thy_3","美術室の前で振り返ると",["adh"]],
 ["rv_ins_3ng","蓄は振り向かずに",["glucagon"]],
 ["rv_glu_3ng","澄は弁当箱のふた",["insulin"]],
 ["rv_adr_3ng","備はそれだけ言って",["cortisol"]],
 ["rv_cor_3ng","瞬は、いつもより",["adrenaline"]],
 ["rv_thy_3ng","水守は、水筒を一本だけ柱",["adh"]],
 ["rv_adh_3ng","燈は、それ以上",["thyroxine"]],
 ["ev_overnight","夜の教室。最後まで",["hypothalamus"]]
];
// Original assignments plus curated independent gestures. A reaction needs no
// paired denial/retreat. Scene holds end when this actor speaks the next line.
const acting=[
 ["p_ins_1","insulin","……手伝ってくれるんですか","shy-side","line"],
 ["cv_ins_01","insulin","全部はだめです","protest","line"],
 ["dt_ins_3","insulin","わあ、わかる人だ","excited-approach","line"],
 ["p_ins_4","insulin","……気づかせてくれたのは","trust-closer","scene"],
 ["p_ins_4","insulin","半分こ。","look-up","scene"],
 ["end_ins","insulin","だから約束させてください","trust-closer","line"],
 ["rv_glu_2","insulin","……約束ですよ","look-up","line"],
 ["p_glu_2","glucagon","……あんたが空腹のとき","shy-side","line"],
 ["cv_glu_01","glucagon","仲間。","excited-approach","line"],
 ["rv_ins_2","glucagon","……関係ある。向かいの棟","protest","line"],
 ["p_glu_4","glucagon","こっちが空っぽになったとき","trust-closer","scene"],
 ["end_glu","glucagon","……気づいてたんだ","shy-side","line"],
 ["cv_adr_01","adrenaline","それ！","excited-approach","line"],
 ["cv_adr_01","adrenaline","言うなー","protest","line"],
 ["cv_adr_01","adrenaline","……な、なにそれ","shy-side","line"],
 ["rv_cor_2","adrenaline","ねえ！　備をとるな","protest","line"],
 ["p_adr_3","adrenaline","……ほんと？","look-up","line"],
 ["p_adr_4","adrenaline","ねえ。怖いときは、三秒で","trust-closer","scene"],
 ["end_adr","adrenaline","それだけは約束","excited-approach","line"],
 ["end_adr","adrenaline","……今、胸がどきどき","caught-close","line"],
 ["p_thy_1","thyroxine","……地味。","shy-side","line"],
 ["dt_thy_2","thyroxine","……正解。……あなたは","excited-approach","line"],
 ["p_thy_4","thyroxine","……一つは、あなたの","trust-closer","scene"],
 ["end_thy","thyroxine","寒い朝も、大きくなっていく間も","look-up","line"],
 ["cv_cor_01","cortisol","……休みの日から探す人","look-up","line"],
 // This calm correction stays neutral: the available protest art is too forceful here.
 ["p_cor_1","cortisol","だから、計画が要る","look-up","line"],
 ["p_cor_4","cortisol","見て。「休む」の欄","shy-side","line"],
 ["p_cor_4","cortisol","長い勝負は、わたしが支える","trust-closer","scene"],
 ["p_adh_2","adh","……あなた、わたしのこと","look-up","line"],
 ["dt_adh_3","adh","……同じこと、考えてた","excited-approach","line"],
 ["p_adh_4","adh","……あなたに、会いたかったから","shy-side","line"],
 ["p_adh_4","adh","……離れるのと、いなくなるのは","look-up","scene"],
 ["end_adh","adh","……うん。あなたが","trust-closer","line"],
 ["tw_adh_3","adh","……二人とも、ばか","protest","line"],
 ["end_friend","redcell","ま、そういう日もある","trust-closer","scene"],
 ["end_friend","redcell","……まあ、なんだ。伝説","shy-side","line"],
 ["ev_homeroom","hypothalamus","はい、おはよう！ 担任の中枢です","explain","scene"],
 ["ev_proxy","hypothalamus","助っ人、来てくれたね","overloaded","line"],
 ["fs2_resume","hypothalamus","……助けてくれて、ありがとう。さあ、後夜祭","encourage","line"]
];
function linesOf(scene){return [...scene.lines,...(scene.after||[]),...scene.choices.flatMap(c=>[...(c.pre||[]),...c.options.flatMap(o=>o.response)])];}
function compile(data){
 const cues=new WeakMap(),poolCues=new Map(),diagnostics=[],scenes=Object.fromEntries(data.scenes.map(s=>[s.id,s]));
 function add(sid,who,text,patch){
  const found=scenes[sid]?linesOf(scenes[sid]).filter(l=>l.who===who&&l.text.startsWith(text)):[];
  if(found.length!==1){diagnostics.push({scene:sid,who,anchor:text,matches:found.length});return;}
  cues.set(found[0],{...cues.get(found[0]),...patch});
 }
 for(const [sid,text,enter] of entries)add(sid,"narr",text,{enter});
 for(const [sid,text,exit] of exits)add(sid,"narr",text,{exit});
 for(const [sid,who,text,id,hold] of acting)add(sid,who,text,{acting:{who,id,hold}});
 for(const row of performance.cues){
  const patch={};if(row.expression)patch.expression=row.expression;
  if(row.act!==undefined)patch.acting={who:row.who,id:row.act,hold:"line",minFriendship:row.min_friendship};
  if(!row.pool){add(row.scene,row.who,row.anchor,patch);continue;}
  const {character,kind}=row.pool,key=character+":"+kind;
  const found=(data.pools[character]?.[kind]||[]).flat().filter(l=>l.who===row.who&&l.text.startsWith(row.anchor));
  if(found.length!==1){diagnostics.push({pool:key,who:row.who,anchor:row.anchor,matches:found.length});continue;}
  cues.set(found[0],{...cues.get(found[0]),...patch});
  const list=poolCues.get(key)||[];list.push({who:row.who,text:found[0].text,patch});poolCues.set(key,list);
 }
 for(const scene of data.scenes)for(const line of linesOf(scene)){
  if(line.who==="redcell"&&line.text.startsWith("（小声で）"))cues.set(line,{...cues.get(line),acting:{who:"redcell",id:"aside",hold:"line"}});
  if(scene.id.startsWith("ev_shed_")&&line.who==="hypothalamus"&&line.text.includes("出なさい"))cues.set(line,{...cues.get(line),acting:{who:"hypothalamus",id:"calm-stop",hold:"line"}});
  if(line.who==="narr"&&line.text.startsWith("――目が覚めた"))cues.set(line,{...cues.get(line),clear:true});
 }
 return {get(line){
  const direct=cues.get(line);if(direct)return direct;
  // pool() returns shallow copies; never match unrelated dialogue by keyword.
  const origin=line.poolOrigin;if(!origin)return {};
  return poolCues.get(origin.character+":"+origin.kind)?.find(row=>row.who===line.who&&row.text===line.text)?.patch||{};
 },diagnostics};
}
function expressionFor(game,line){
 const override=game.cues.get(line).expression;if(override)return override;
 if(line.expr)return line.expr;
 // Night contacts combine existing lines into one screen. Keep the caller's
 // last authored reaction instead of flattening every phone call to neutral.
 const last=line.compactLines?.filter(part=>part.who===line.who).at(-1);
 return last?expressionFor(game,last):"neutral";
}
function assignedAct(game,line,scene,playerGender,castGender){
 const cue=game.cues.get(line).acting;if(!cue)return null;
 const id=typeof cue.id==="object"?cue.id[castGender]:cue.id;if(!id)return null;
 const target=Object.keys(game.CID).find(t=>game.CID[t]===line.who);
 const ending=target&&scene?.id==="end_"+target;
 if(target&&!ending){
  const minimum=cue.minFriendship??(["excited-approach","caught-close"].includes(id)?30:id==="trust-closer"?50:0);
  if(game.fr[target]<minimum)return null;
 }
 // Male Glucagon's 'shy-side' reads as stopping someone, not a quiet blush.
 if(id==="shy-side"&&castGender==="male"&&line.who==="glucagon")return null;
 // The reviewed look-up images also read as leaning/reaching to ask for help.
 // Keep the actual art instead of silently selecting a nonexistent look-down.
 return {...cue,id};
}
const api={compile,acting,entries,exits,linesOf,assignedAct,expressionFor,performance};global.HMPresentation=api;if(typeof module!=="undefined")module.exports=api;
})(globalThis);

