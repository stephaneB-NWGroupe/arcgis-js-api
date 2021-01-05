/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../core/handleUtils","../../../../core/promiseUtils","../../../../core/Handles","../../glTF/DefaultLoadingContext","../../glTF/loader","./wosrLoader"],(function(e,t,r,o,n,s,i,a,l){"use strict";let c=function(){function e(){this.gltfCache=new Map,this.wosrCache=new Map,this.evictHandles=new s}var c=e.prototype;return c.loadGLTF=function(e,t){const r=`gltf:${e}`;return this.fromCache(this.gltfCache,r,(t=>a.load(new i.DefaultLoadingContext(t.streamDataRequester),e,t)),t)},c.loadWOSR=function(e,t){const r=`wosr:${e}:${t.disableTextures}`;return this.fromCache(this.wosrCache,r,(t=>l.load(e,t)),t)},c.destroy=function(){this.evictHandles.destroy(),this.gltfCache.clear(),this.wosrCache.clear()},c.fromCache=function(e,t,o,s){return n.create(((i,a)=>{if(n.isAborted(s))return void a(n.createAbortError());const l=n.onAbort(s,(()=>{this.remove(e,t),a(n.createAbortError())})),c=e.get(t);if(c)return this.evictHandles.remove(t),c.refCount++,void c.item.then(i,a);const h=n.createAbortController(),u={...s,signal:h.signal},d={refCount:1,abortController:h,item:o(u).then((r=>(d.abortController=null,r.remove=()=>this.remove(e,t),r)))};e.set(t,d),d.item.then((e=>{r.isSome(l)&&l.remove(),i(e)}),(e=>{r.isSome(l)&&l.remove(),a(e)}))}))},c.remove=function(e,t){const n=e.get(t);n&&(n.refCount--,0===n.refCount&&this.evictHandles.add(o.timeoutHandle((()=>{e.delete(t),r.isSome(n.abortController)&&n.abortController.abort()}),h),t))},t._createClass(e,[{key:"size",get:function(){return this.wosrCache.size+this.gltfCache.size}}]),e}();let h=1e4;const u={overrideEvictDelay:e=>(h=e,{remove(){h=1e4}})};e.ObjectResourceCache=c,e.test=u,Object.defineProperty(e,"__esModule",{value:!0})}));