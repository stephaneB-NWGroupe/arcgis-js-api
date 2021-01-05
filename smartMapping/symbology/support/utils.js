/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../core/screenUtils","../../support/utils"],(function(e,t,r){"use strict";const n=["streets","gray","topo","terrain","national-geographic","oceans","osm","gray-vector","streets-vector","topo-vector","streets-relief-vector","streets-navigation-vector"],o=["satellite","hybrid","dark-gray","dark-gray-vector","streets-night-vector"],i=[].concat(n).concat(o);function c(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b}function s(e){const r=e.width,n=e.height;let o=e.pixelSizeAt(e.toMap(t.createScreenPoint(.5*r,.5*n),{exclude:[]}));if(o<=0&&(o=e.pixelSizeAt(e.toMap(t.createScreenPoint(.5*r,.95*n),{exclude:[]})),o<=0)){const t=e.camera.position.clone();t.z=0,o=2*e.pixelSizeAt(t)}return o}e.getBasemapTheme=function(e){const t=r.getBasemapId(e,i,!1);return t?n.indexOf(t)>-1?"light":o.indexOf(t)>-1?"dark":void 0:null},e.getPixelSize=s,e.getStorageType=function(e){return"multipoint"===e?"point":"mesh"===e?"polygon":e},e.getTagsFromSchemes=function(e){if(!e)return[];const t=new Set,r=[e.primaryScheme];e.secondarySchemes&&r.push(...e.secondarySchemes);for(const e of r)e&&"tags"in e&&e.tags&&e.tags.forEach((e=>t.add(e)));return[...t]},e.hasIdenticalColors=function(e,t){let r=0;if(e.length===t.length){let n=e.every(((e,r)=>c(e,t[r])));if(n)r=1;else{n=e.slice(0).reverse().every(((e,r)=>c(e,t[r]))),n&&(r=-1)}}return r},e.toWorldScale=function(e,r){return Math.ceil(s(r)*t.pt2px(t.toPt(e)))},Object.defineProperty(e,"__esModule",{value:!0})}));