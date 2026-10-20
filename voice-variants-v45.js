/* Authored display-only voice omissions; scenario anchors, RNG and journals remain unchanged. */
(function(g){'use strict';
const base=g.HMLocalization||(typeof require==='function'?require('./localization-v4.js'):null);
const corrections=[{"who":"insulin","gender":"male","before":"足音、聞こえますか？　わたし、ここで待っていますね。","after":"足音、聞こえますか？　僕、ここで待っていますね。"},{"who":"cortisol","gender":"male","before":"三つの水槽で、カエルになる早さを比べるの。一つは何も入れない。残りに何を入れるか、決めてほしい。","after":"三つの水槽で、カエルになる早さを比べるんだ。一つは何も入れない。残りに何を入れるか、決めてほしい。"},{"who":"adrenaline","gender":"male","before":"えー……つまんないの。","after":"えー……つまんないな。"},{"who":"adrenaline","gender":"female","before":"今日、時間ある？　きみと、ちょっと出かけたい！","after":"今日、時間ある？　あなたと、ちょっと出かけたい！"}];
const tutorialAdvice=[{"scene":"ev_tutorial","who":"redcell","line_index":0,"male_before":"情報通の赤路さんが、この学校の過ごし方を教えてやる。三つだけ覚えろ。","female_before":"情報通の赤路さんが、この学校の過ごし方を教えてあげる。三つだけ覚えて。","male":"情報通の赤路さんが、この学校の過ごし方を教えてやる。休日の能力アップは平日の２倍だ。最初は、まず自分を磨くのもいいかもな。あとは三つだけ覚えろ。","female":"情報通の赤路さんが、この学校の過ごし方を教えてあげる。休日の能力アップは平日の２倍だよ。最初は、まず自分を磨くのもいいかもね。あとは三つだけ覚えて。"},{"scene":"ev_tutorial","who":"redcell","line_index":5,"male_before":"建物が何かは、最初から書いてある。わからないのは、そこに住んでる人のほうだ。","female_before":"建物が何かは、最初から書いてある。わからないのは、そこに住んでる人のほう。","male":"建物が何かは、最初から書いてある。わからないのは、そこに住んでる人のほうだ。自分の能力は手帳でわかるけど、相手の気持ちは数字じゃ見えないからな。","female":"建物が何かは、最初から書いてある。わからないのは、そこに住んでる人のほう。自分の能力は手帳でわかるけど、相手の気持ちは数字じゃ見えないからね。"},{"scene":"ev_tutorial","who":"redcell","line_index":10,"male_before":"気になるやつがいたら、観察しとけ。調べたことは、休みの日に電話で教えてやる。","female_before":"気になる人がいたら、観察しといて。調べたことは、休みの日に電話で教えてあげる。","male":"ただ親しいのと、恋してるのは違う。それに「自分のことをわかってくれてる」って、相手に感じてもらうのも大切だろうな。気になるやつがいたら、観察しとけ。調べたことは、休みの日に電話で教えてやる。","female":"ただ親しいのと、恋してるのは違うよ。それに「自分のことをわかってくれてる」って、相手に感じてもらうのも大切だと思う。気になる人がいたら、観察しといて。調べたことは、休みの日に電話で教えてあげる。"}];
function field(record,key,playerGender,castGender){
 const text=base.field(record,key,playerGender,castGender);if(key!=='text'||!record?.who)return text;
 const actorGender=record.who==='redcell'?playerGender:castGender;
 const advice=tutorialAdvice.find(r=>r.who===record.who&&r[actorGender+'_before']===text);if(advice)return advice[actorGender];
 const row=corrections.find(r=>r.who===record.who&&r.gender===actorGender&&r.before===text);return row?row.after:text;
}
const api={field,corrections,tutorialAdvice};g.HMVoiceVariants=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
