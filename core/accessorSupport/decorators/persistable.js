/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["require","exports","../../maybe","../metadata","./property","../../multiOriginJSONSupportUtils","../../urlUtils","../../uuid","../PropertyOrigin","../../../portal/support/resourceExtension","../../../chunks/persistableUrlUtils"],(function(t,e,r,o,n,i,s,u,l,c,a){"use strict";function p(t){return Object.freeze({__proto__:null,default:t})}function f(e,o,n,i,l,a,f,m){const g=u.generateUUID(),h=y(n,i,f),U=s.join(r.get(m,"prefix"),g),S=`${U}.${c.getResourceContentExtension(h)}`,w=f.portalItem.resourceFromPath(S);s.isBlobProtocol(i)&&f.resources.pendingOperations.push(async function(e){const r=(await new Promise((function(e,r){t(["../../../request"],(function(t){e(p(t))}),r)}))).default,{data:o}=await r(e,{responseType:"blob"});return o}(i).then((t=>{w.path=`${U}.${c.getResourceContentExtension(t)}`,l[a]=w.itemRelativeUrl})).catch((()=>{}))),d(e,o,w,h,f.resources.toAdd),l[a]=w.itemRelativeUrl}function d(t,e,r,o,n){n.push({resource:r,content:o,finish:r=>{!function(t,e,r){"string"==typeof t[e]?t[e]=r.url:t[e].url=r.url}(t,e,r)}})}function y(t,e,r){return"string"==typeof t?{url:e}:new Blob([JSON.stringify(t.toJSON(r))],{type:"application/json"})}e.persistable=function(t){const e=r.isSome(t)&&t.origins?t.origins:[void 0];return(u,p)=>{const m=function(t,e,n){if(r.isSome(t)&&"resource"===t.type)return function(t,e,n){const u=o.getOwnPropertyMetadata(e,n);return{type:String,read:(t,e,r)=>{const o=a.read(t,e,r);return u.type===String?o:"function"==typeof u.type?new u.type({url:o}):void 0},write:{writer(e,o,p,m){if(!m||!m.resources)return"string"==typeof e?void(o[p]=a.toJSON(e,m)):void(o[p]=e.write({},m));const g=function(t){if(r.isNone(t))return null;if("string"==typeof t)return t;return t.url}(e),h=g?a.toJSON(g,{...m,verifyItemRelativeUrls:m&&m.verifyItemRelativeUrls?{writtenUrls:m.verifyItemRelativeUrls.writtenUrls,rootPath:null}:null}):null,U=u.type!==String&&(!i.isMultiOriginJSONMixin(this)||m&&m.origin&&this.originIdOf(n)>l.nameToId(m.origin));m&&m.portalItem&&r.isSome(h)&&!s.isAbsolute(h)?U?function(t,e,r,o,n,i,u,l){const a=u.portalItem.resourceFromPath(o),p=y(r,o,u),m=c.getResourceContentExtension(p),g=s.getPathExtension(a.path);if(m!==g)return void f(t,e,r,o,n,i,u,l);d(t,e,a,p,u.resources.toUpdate),n[i]=o}(this,n,e,h,o,p,m,t):function(t,e,r,o){o.resources.toKeep.push({resource:o.portalItem.resourceFromPath(t)}),e[r]=t}(h,o,p,m):m&&m.portalItem&&(r.isNone(h)||r.isSome(a.itemIdFromResourceUrl(h))||s.isBlobProtocol(h)||U)?f(this,n,e,h,o,p,m,t):o[p]=h}}}}(t,e,n);switch(r.isSome(t)&&t.type?t.type:"other"){case"other":return{read:!0,write:!0};case"url":{const{read:t,write:e}=a.persistableUrlUtils;return{read:t,write:e}}}}(t,u,p);for(const t of e){const e=n.propertyJSONMeta(u,t,p);for(const t in m)e[t]=m[t]}}},Object.defineProperty(e,"__esModule",{value:!0})}));