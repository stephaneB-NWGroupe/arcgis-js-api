// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/vec2","../../../views/support/QueueProcessor"],function(e,t,r,o,s,n,i,u){function c(e,t){return e.length=0,t.forEach(function(t){return e.push(t)}),e}var p=new Set,a=[],h=new Map,l=[0,0];return function(e){function t(t){var r=e.call(this,t)||this;return r._keysToRequests=new Map,r.concurrency=6,r.process=null,r.strategy="scale-first",r.tileInfoView=null,r.tileServers=null,r}return r(t,e),t.prototype.initialize=function(){var e=this,t="scale-first"===this.strategy?this._peekByScaleFirst.bind(this):this._peekByCenterFirst.bind(this),r=this,o=r.tileServers,s=r.concurrency,n=r.process;o&&o.length>0?this._queues=o.map(function(r){return new u({concurrency:s,process:function(t){var o=e._keysToRequests.get(t);return n(o,r)},peeker:t})}):this._queues=[new u({concurrency:s,process:function(t){var r=e._keysToRequests.get(t);return n(r)},peeker:t})]},t.prototype.destroy=function(){this.clear();for(var e=0,t=this._queues;e<t.length;e++){t[e].destroy()}this._queues=null},Object.defineProperty(t.prototype,"length",{get:function(){return this._queues.reduce(function(e,t){return e+t.length},0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onGoingCount",{get:function(){return this._keysToRequests.size},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this.length>0||this.onGoingCount>0},enumerable:!0,configurable:!0}),t.prototype.clear=function(){for(var e=0,t=this._queues;e<t.length;e++){t[e].clear()}this._keysToRequests.clear(),this.notifyChange("updating")},t.prototype.find=function(e,t){for(var r=this,o=0,s=this._queues;o<s.length;o++){var n=s[o],i=n.find(function(t){return e(r._keysToRequests.get(t).key)});if(i)return i}},t.prototype.getPromise=function(e){for(var t="string"==typeof e?e:e.id,r=0,o=this._queues;r<o.length;r++){var s=o[r],n=s.get(t);if(n)return n}},t.prototype.getRequest=function(e){var t="string"==typeof e?e:e.id;return this._keysToRequests.get(t)},t.prototype.has=function(e){return"string"==typeof e?this._keysToRequests.has(e):this._keysToRequests.has(e.id)},t.prototype.isOngoing=function(e){var t="string"==typeof e?e:e.id;return this.has(t)&&this._queues.some(function(e){return e.isOngoing(t)})},t.prototype.pause=function(){for(var e=0,t=this._queues;e<t.length;e++){t[e].pause()}},t.prototype.push=function(e){var t=this,r=e.key.id;if(this.has(r))return this.getPromise(r);var o=this._queues[e.key.row%this._queues.length].push(r),s=function(){t._keysToRequests.delete(r),t.notifyChange("updating")};return this._keysToRequests.set(r,e),o.then(s,s),this.notifyChange("updating"),o},t.prototype.reset=function(){for(var e=0,t=this._queues;e<t.length;e++){t[e].reset()}this.notifyChange("updating")},t.prototype.resume=function(){for(var e=0,t=this._queues;e<t.length;e++){t[e].resume()}},t.prototype._peekByScaleFirst=function(e){if(!this.state)return e[0];for(var t=this.tileInfoView,r=Number.NEGATIVE_INFINITY,o=Number.POSITIVE_INFINITY,s=0,n=e;s<n.length;s++){var i=n[s],u=this._keysToRequests.get(i),l=this.tileInfoView.getTileScale(u.key);h.has(l)||(h.set(l,[]),r=Math.max(l,r),o=Math.min(l,o)),h.get(l).push(u.key),p.add(l)}var y=this.state.scale;h.has(y)||(c(a,p),a.sort(),y=a.reduce(function(e,t,r,o){return Math.abs(t-y)<Math.abs(e-y)?t:e},a[0])),y=Math.min(y,r),y=Math.max(y,o);var f=h.get(y),g=t.getClosestInfoForScale(y),d=g.getColumnForX(this.state.center[0]),v=g.getRowForY(this.state.center[1]);return f.sort(function(e,t){var r=g.denormalizeCol(e.col,e.world),o=g.denormalizeCol(t.col,t.world);return Math.sqrt((d-r)*(d-r)+(v-e.row)*(v-e.row))-Math.sqrt((d-o)*(d-o)+(v-t.row)*(v-t.row))}),p.clear(),h.clear(),f[0].id},t.prototype._peekByCenterFirst=function(e){if(!this.state)return e[0];for(var t=this.tileInfoView,r=this.state.center,o=Number.POSITIVE_INFINITY,s=null,n=0,u=e;n<u.length;n++){var c=u[n],p=this._keysToRequests.get(c);t.getTileCoords(l,p.key);var a=i.vec2.distance(l,r);a<o&&(o=a,s=p.key)}return s.id},o([n.property({constructOnly:!0})],t.prototype,"concurrency",void 0),o([n.property({constructOnly:!0})],t.prototype,"process",void 0),o([n.property()],t.prototype,"state",void 0),o([n.property({constructOnly:!0})],t.prototype,"strategy",void 0),o([n.property({constructOnly:!0})],t.prototype,"tileInfoView",void 0),o([n.property({constructOnly:!0})],t.prototype,"tileServers",void 0),o([n.property({readOnly:!0})],t.prototype,"updating",null),t=o([n.subclass()],t)}(n.declared(s))});