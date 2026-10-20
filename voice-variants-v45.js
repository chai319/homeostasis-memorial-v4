/* Authored display-only voice omissions; scenario anchors, RNG and journals remain unchanged. */
(function(g){'use strict';
const base=g.HMLocalization||(typeof require==='function'?require('./localization-v4.js'):null);
const corrections=[{"who":"insulin","gender":"male","before":"足音、聞こえますか？　わたし、ここで待っていますね。","after":"足音、聞こえますか？　僕、ここで待っていますね。"},{"who":"cortisol","gender":"male","before":"三つの水槽で、カエルになる早さを比べるの。一つは何も入れない。残りに何を入れるか、決めてほしい。","after":"三つの水槽で、カエルになる早さを比べるんだ。一つは何も入れない。残りに何を入れるか、決めてほしい。"},{"who":"adrenaline","gender":"male","before":"えー……つまんないの。","after":"えー……つまんないな。"},{"who":"adrenaline","gender":"female","before":"今日、時間ある？　きみと、ちょっと出かけたい！","after":"今日、時間ある？　あなたと、ちょっと出かけたい！"}];
function field(record,key,playerGender,castGender){
 const text=base.field(record,key,playerGender,castGender);if(key!=='text'||!record?.who)return text;
 const actorGender=record.who==='redcell'?playerGender:castGender;
 const row=corrections.find(r=>r.who===record.who&&r.gender===actorGender&&r.before===text);return row?row.after:text;
}
const api={field,corrections};g.HMVoiceVariants=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
