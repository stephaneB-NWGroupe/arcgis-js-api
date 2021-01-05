/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../core/maybe","../../core/Error","../../core/urlUtils","../../request"],(function(e,t,r,a,o){"use strict";function s(e){const t=e.lastIndexOf("/");return-1===t?[".",e]:[e.slice(0,t),e.slice(t+1)]}function n(e){const[r,o]=function(e){const r=a.getPathExtension(e);if(t.isNone(r))return[e,""];return[e.slice(0,e.length-r.length-1),`.${r}`]}(e),[n,i]=s(r);return[n,i,o]}async function i(e){if(e instanceof Blob)return e;return(await o(e.url,{responseType:"blob"})).data}e.addOrUpdateResource=async function(e,o,n,c){if(!e.hasPath())throw new r(`portal-item-resource-${o}:invalid-path`,"Resource does not have a valid path");await e.portalItem.load(c);const u=a.join(e.portalItem.userItemUrl,"add"===o?"addResources":"updateResources"),[l,p]=s(e.path),d=await i(n),m=new FormData;return l&&"."!==l&&m.append("resourcesPrefix",l),m.append("fileName",p),m.append("file",d,p),m.append("f","json"),t.isSome(c)&&c.access&&m.append("access",c.access),await e.portalItem.portal._request(u,{method:"post",body:m,signal:t.get(c,"signal")}),e},e.contentToBlob=i,e.fetchResources=async function(e,r={},o){await e.load(o);const s=a.join(e.itemUrl,"resources"),{start:n=1,num:i=10,sortOrder:c="asc",sortField:u="created"}=r,l={query:{start:n,num:i,sortOrder:c,sortField:u},signal:t.get(o,"signal")},p=await e.portal._request(s,l);return{total:p.total,nextStart:p.nextStart,resources:p.resources.map((({created:t,size:r,resource:a})=>({created:new Date(t),size:r,resource:e.resourceFromPath(a)})))}},e.getSiblingOfSameType=function(e,t){if(!e.hasPath())return null;const[r,,o]=n(e.path);return e.portalItem.resourceFromPath(a.join(r,t+o))},e.getSiblingOfSameTypeI=function(e,t){if(!e.hasPath())return null;const[r,,o]=n(e.path);return e.portalItem.resourceFromPath(a.join(r,t+o))},e.removeAllResources=async function(e,r){await e.load(r);const o=a.join(e.userItemUrl,"removeResources");return e.portal._request(o,{method:"post",query:{deleteAll:!0},signal:t.get(r,"signal")})},e.removeResource=async function(e,o,s){if(!o.hasPath())throw new r("portal-item-resources-remove:invalid-path","Resource does not have a valid path");await e.load(s);const n=a.join(e.userItemUrl,"removeResources");await e.portal._request(n,{method:"post",query:{resource:o.path},signal:t.get(s,"signal")}),o.portalItem=null},e.splitPrefixFileNameAndExtension=n,Object.defineProperty(e,"__esModule",{value:!0})}));