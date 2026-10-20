/* The epilogue's cast: names only, keeping undiscovered identities private in the UI. */
(function(g){'use strict';
 const quotes={"insulin-female":{"quote":"……半分になると、こんなに軽いんですね。","quoteScene":"p_ins_3"},"insulin-male":{"quote":"半分こ。……これからも、ずっと、半分こしてくれますか。","quoteScene":"p_ins_4"},"glucagon-female":{"quote":"……満たされてるときも、会いに来て。出番がなくても、隣にいたい。……言った。忘れないで。","quoteScene":"p_glu_4"},"glucagon-male":{"quote":"……もらうのって、慣れてない。……でも、あったかい。","quoteScene":"p_glu_3"},"adrenaline-female":{"quote":"うん！　どきどきは、動ける準備だから！","quoteScene":"p_adr_1"},"adrenaline-male":{"quote":"ねえ。怖いときは、三秒で駆けつける。でも、怖くないときも、隣にいていい？","quoteScene":"p_adr_4"},"thyroxine-female":{"quote":"……目立たなくていい。……あなたが、見ててくれるなら。","quoteScene":"p_thy_4"},"thyroxine-male":{"quote":"……ゆっくりでいい。……この先の時間も、一緒に灯したい。","quoteScene":"end_thy"},"cortisol-female":{"quote":"見て。「休む」の欄が、毎週ある。……それと、その欄、二人分。","quoteScene":"p_cor_4"},"cortisol-male":{"quote":"長い勝負は、僕が支える。でも、休むときは、君の隣がいい。","quoteScene":"p_cor_4"},"adh-female":{"quote":"……今日は、呼ばれてない。……でも、来た。","quoteScene":"p_adh_4"},"adh-male":{"quote":"……きみに、会いたかったから。……係じゃなくて。","quoteScene":"p_adh_4"},"redcell-female":{"quote":"おーい！　置いてかないでってば！","quoteScene":"ev_open"},"redcell-male":{"quote":"……まあ、なんだ。伝説の木の下で、親友と乾杯ってのも、悪くないだろ。","quoteScene":"end_friend"},"hypothalamus":{"quote":"この三か月、隣の人と自分の体を、ちょっと気にしてみよう。","quoteScene":"ev_homeroom"}};
 // Semantic wrap opportunities only; joining these preserves each original line verbatim.
 const quotePhrases={"insulin-female":["……半分になると、","こんなに","軽いんですね。"],"insulin-male":["半分こ。","……これからも、","ずっと、","半分こしてくれますか。"],"glucagon-female":["……満たされてるときも、","会いに来て。","出番がなくても、","隣にいたい。","……言った。","忘れないで。"],"glucagon-male":["……もらうのって、","慣れてない。","……でも、","あったかい。"],"adrenaline-female":["うん！　","どきどきは、","動ける準備だから！"],"adrenaline-male":["ねえ。","怖いときは、","三秒で駆けつける。","でも、","怖くないときも、","隣にいていい？"],"thyroxine-female":["……目立たなくていい。","……あなたが、","見ててくれるなら。"],"thyroxine-male":["……ゆっくりでいい。","……この先の時間も、","一緒に灯したい。"],"cortisol-female":["見て。","「休む」の欄が、","毎週ある。","……それと、","その欄、","二人分。"],"cortisol-male":["長い勝負は、","僕が支える。","でも、","休むときは、","君の隣がいい。"],"adh-female":["……今日は、","呼ばれてない。","……でも、","来た。"],"adh-male":["……きみに、","会いたかったから。","……係じゃなくて。"],"redcell-female":["おーい！　","置いてかないでってば！"],"redcell-male":["……まあ、","なんだ。","伝説の木の下で、","親友と","乾杯ってのも、","悪くないだろ。"],"hypothalamus":["この三か月、","隣の人と","自分の体を、","ちょっと","気にしてみよう。"]};
 const colors={"insulin":"#83e3c3","glucagon":"#ffd17e","adrenaline":"#ffab73","thyroxine":"#b9a6ff","cortisol":"#f5a9c4","adh":"#87ddff","redcell":"#ff8da5","hypothalamus":"#e7d29c"};
 const cast=[];
 for(const who of ['insulin','glucagon','adrenaline','thyroxine','cortisol','adh','redcell']){
  const person=g.HM_CHARACTERS.find(c=>c.id===who);
  for(const gender of ['female','male']){
   const set=g.HM_ASSETS.characters[who+'-'+gender];
   const image=gender==='female'?(set.acting['daily-cute']||(who==='redcell'?set.acting['trust-closer']:null)||set.expression.playful||set.expression.happy):set.expression.happy;
   const id=who+'-'+gender;cast.push({id,gender,name:person[gender],image,accent:colors[who],...quotes[id],quotePhrases:quotePhrases[id]});
  }
 }
 cast.push({id:'hypothalamus',gender:'teacher',name:'中枢先生',image:g.HM_ASSETS.characters.hypothalamus.expression.happy,accent:colors.hypothalamus,...quotes.hypothalamus,quotePhrases:quotePhrases.hypothalamus});
 g.HM_ENDING_CREDITS={
  title:'恒常性メモリアル',theme:'Thirty Seven Degrees',audio:'assets/bgm/thirty-seven-degrees-ed.mp3',duration:181.0285,
  background:'assets/backgrounds/ginkgo.webp',cast,
  staff:[{role:'脚本',name:'Claude Opus'},{role:'作画・キャラクター設定',name:'Codex Sol'},{role:'音楽',name:'Gemini'},{role:'企画・監督',name:'Takehiro Kubokawa'}]
 };
})(globalThis);
