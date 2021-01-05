/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../../core/has","../../../../../core/maybe","../../../../../core/Error","../../../../../core/promiseUtils"],(function(e,t,n,r,o){"use strict";function a(e){if(e instanceof HTMLCanvasElement)return e;if(e instanceof HTMLVideoElement)return null;const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return e instanceof HTMLImageElement?n.drawImage(e,0,0,e.width,e.height):e instanceof ImageData&&n.putImageData(e,e.width,e.height),t}e.encodeBase64DataUri=function(e){const t=[],n=new Uint8Array(e);for(let e=0;e<n.length;e++)t.push(String.fromCharCode(n[e]));return"data:application/octet-stream;base64,"+btoa(t.join(""))},e.imageToArrayBuffer=async function(e){const t=a(e);if(n.isNone(t))throw new r("imageToArrayBuffer","Unsupported image type");const i=async e=>{if(!e)throw new r("imageToArrayBuffer","Unable to convert image to PNG");const t=new FileReader,n=o.create((e=>{t.addEventListener("loadend",(()=>{e(t.result)}))}));return t.readAsArrayBuffer(e),n};if(t.toBlob)return o.create(((e,n)=>{t.toBlob((t=>{i(t).then(e,n)}),"image/png")}));if("msToBlob"in t)return i(t.msToBlob());throw new r("imageToArrayBuffer","Could not convert canvas to blob")},e.imageToDataURI=function(e){const t=a(e);return n.isSome(t)?t.toDataURL():""},e.isArrayBufferPNG=function(e){if(e.byteLength<8)return!1;const t=new Uint8Array(e);return 137===t[0]&&80===t[1]&&78===t[2]&&71===t[3]&&13===t[4]&&10===t[5]&&26===t[6]&&10===t[7]},Object.defineProperty(e,"__esModule",{value:!0})}));