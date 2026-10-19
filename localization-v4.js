/* Display variants are independent of the simulation and canonical line anchors. */
(function(global){
"use strict";
function field(record,key,playerGender,castGender){
 if(typeof record==="string")return record;
 const variant=record?.fm?.[key];
 if(variant&&typeof variant.v==="string"&&/^(p|t|pt|tp)$/.test(variant.on)){
  const conditions={p:playerGender==="female",t:castGender==="male"};
  if([...variant.on].every(axis=>conditions[axis]))return variant.v;
 }
 return record?.[key]??"";
}
const api={field};global.HMLocalization=api;if(typeof module!=="undefined")module.exports=api;
})(globalThis);

