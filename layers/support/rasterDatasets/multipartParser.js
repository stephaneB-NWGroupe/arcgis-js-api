/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports"],(function(t){"use strict";function n(t,n){const e=String.fromCharCode.apply(null,t.subarray(0,Math.min(300,t.length))).split("\n"),r=Math.min(e.length,7),o={};let a=0;for(let s=0;s<r;s++){var i;if(e[s].length<4)a=a+e[s].length+1;else if("content"===e[s].slice(0,7).toLowerCase()){if(a=a+e[s].length+1,-1===e[s].indexOf(":"))continue;const t=e[s].substring(0,e[s].indexOf(":")).trim(),n=e[s].substring(e[s].indexOf(":")+1).trim();switch(t.toLowerCase()){case"content-type":o.contentType=n;break;case"content-description":o.contentDescription=n;break;case"content-transfer-encoding":o.contentTransferEncoding=n;break;case"content-id":o.contentID=n;break;case"content-disposition":o.contentDisposition=n;break;case"content-location":o.contentLocation=n}}else{if(o.contentDisposition&&e[s].length>=4&&(null==(i=o.contentType)?void 0:i.toLowerCase().indexOf("image"))>-1){const n=new ArrayBuffer(t.length-a);new Uint8Array(n).set(t.subarray(a,t.length)),o.contentData=n;break}if((""===n.start||o.contentID===n.start)&&o.contentType){if(o.contentType.indexOf("text")>-1){o.contentData=String.fromCharCode.apply(null,t.subarray(a,t.length));break}o.contentData=t.subarray(a,t.length)}}}return o}t.parse=function(t){const e=function(t){var n;const e=null==(n=t.getHeader("Content-Type"))?void 0:n.split(";"),r=null==e?void 0:e[0];if("multipart/related"!==r&&"multipart/mixed"!==r)return null;const o={boundary:"",start:"",type:""};for(let t=1;t<e.length;t++){const n=e[t].split("=");o[n[0].trim()]=n[1].trim().slice(1,n[1].length-1)}return o}(t);return e?{isMultipart:!0,data:function(t,e){const r="--"+e.boundary,o=[];for(let t=0;t<r.length;t++)o.push(r.charCodeAt(t));const a=[],i="\n--"+e.boundary+"--";for(let t=0;t<i.length;t++)a.push(i.charCodeAt(t));const s=[10],l=[13,10],c=[],u=o.length,f=new Uint8Array(t),h=Math.min(1e4,f.length-u);let p=0,d=0;for(let t=0;t<h;t++){for(d=0;d<u&&f[t+d]===o[d];d++);d===u&&(p&&c.push(n(f.subarray(p,t),e)),t+=u-1,f[t+1]===s[0]?t+=1:f[t+1]===l[0]&&f[t+2]===l[1]&&(t+=2),p=t+1)}const g=a.length;for(let t=f.length-g-10;t<f.length-g;t++){for(d=0;d<g&&f[t+d]===a[d];d++);if(d===g){c.push(n(f.subarray(p,t),e));break}}return c}(t.data,e)}:{isMultipart:!1,data:null}},Object.defineProperty(t,"__esModule",{value:!0})}));