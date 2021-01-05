/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports"],(function(n){"use strict";const e=/^\s*"([\S\s]*)"\s*$/,t=/""/g,o=[","," ",";","|","\t"];function r(n,e){const t={},o=n.length;for(let r=0;r<o;r++)t[n[r]]=e[r];return t}function*i(n,e,t){let o=0;for(;o<=n.length;){const r=n.indexOf(e,o),i=n.substring(o,r>-1?r:void 0);o+=i.length+1,t&&!i.trim()||(yield i)}}function s(n,e){return i(n,e,!1)}function f(n){let e=0,t=0;for(t=n.indexOf('"',t);t>=0;)e++,t=n.indexOf('"',t+1);return e}n.inferDelimiter=function(n){const e=n.trim();let t=0,r="";for(const n of o){const o=e.split(n).length;o>t&&(t=o,r=n)}return""===r?null:r},n.parseRows=function*(n,o,i){let c="",u="",l=0,d=[];n:for(;;){const{value:a,done:p}=n.next();if(p)return;const x=s(a,i);e:for(;;){const{value:n,done:o}=x.next();if(o)break e;if(c+=u+n,u="",l+=f(n),l%2==0){if(l>0){const n=e.exec(c);if(!n){d=[],c="",l=0;continue n}d.push(n[1].replace(t,'"'))}else d.push(c);c="",l=0}else u=i}0===l?(yield r(o,d),d=[]):u="\n"}},n.readRowParts=s,n.readRows=function(n){const e=n.includes("\r\n")?"\r\n":"\n";return i(n,e,!0)},Object.defineProperty(n,"__esModule",{value:!0})}));