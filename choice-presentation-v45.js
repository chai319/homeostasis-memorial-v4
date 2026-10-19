/* Exact label anchors; all mechanics and authored response text remain untouched. */
(function(global){'use strict';
const entries=[{"scene": "ev_breakfast_a", "before": "蓄を起こして、倉庫の鍵で箱をしまってもらう", "after": "蓄に頼む"}, {"scene": "ev_breakfast_b", "before": "澄に頼んで、廊下の箱をもう一度配ってもらう", "after": "澄に頼む"}, {"scene": "ev_breakfast_b", "before": "「購買の裏の倉庫、開けられない？」と蓄に頼む", "after": "蓄に頼む"}, {"scene": "ev_breakfast_b", "before": "運動部の部室にしまってある糖を、廊下へ回してもらう", "after": "運動部に頼む"}, {"scene": "ev_proxy", "before": "体を動かせる状態に整えようと、燈に火を強めてもらう", "after": "燈に頼む"}, {"scene": "p_glu_2", "before": "鍵を返して、蓄に任せる", "after": "蓄に任せる"}, {"scene": "p_adr_2", "before": "備に伝言を頼む", "after": "備に頼む"}, {"scene": "p_thy_1", "before": "燈に任せて、横で見ている", "after": "燈に任せる"}, {"scene": "fs2_crisis_glu", "before": "澄に、片付けをもっと止めてもらう", "after": "澄に頼む"}, {"scene": "fs2_crisis_glu", "before": "備に、別の材料から糖をつくる長期の段取りを頼む", "after": "備に頼む"}, {"scene": "kz_glu_2", "before": "備に、別の材料から糖をつくる段取りを頼んでおく", "after": "備に頼む"}, {"scene": "kz_glu_2", "before": "澄に頼んで、片付けをいつもより強めてもらう", "after": "澄に頼む"}, {"scene": "kz_adr_1", "before": "瞬に、廊下を走って、学園じゅうに知らせて回ってもらう", "after": "瞬に頼む"}, {"scene": "fs2_crisis_cor", "before": "水場からの知らせを、塩を取り戻す係――備の妹の塩係へつなぐ", "after": "備の妹に連絡する"}, {"scene": "ev_gwt_pier", "before": "水守に、水筒の水を配ってもらう", "after": "水守に頼む"}, {"scene": "ev_gwt_cake", "before": "水守に、お茶のおかわりを頼む", "after": "水守に頼む"}, {"scene": "fs2_open", "before": "澄と厨房に入る", "after": "澄と入る"}, {"scene": "fs2_open", "before": "蓄とレジに入る", "after": "蓄と入る"}, {"scene": "fs2_open", "before": "瞬と呼びこみに出る", "after": "瞬と入る"}, {"scene": "fs2_open", "before": "燈と飾りつけを直す", "after": "燈と入る"}, {"scene": "fs2_open", "before": "備と在庫を管理する", "after": "備と入る"}, {"scene": "fs2_open", "before": "水守と給仕に回る", "after": "水守と入る"}];
const labels=new Map();
for(const row of entries){
 const scene=global.HM_GAME_V4.scenes.find(s=>s.id===row.scene);
 if(!scene||scene.choices.flatMap(q=>q.options).filter(o=>o.label===row.before).length!==1)throw Error('Stale choice label: '+row.scene+' '+row.before);
 labels.set(row.scene+'\n'+row.before,row.after);
}
global.HMChoicePresentation={entries,label:(scene,original)=>labels.get(scene+'\n'+original)||original};
})(globalThis);
