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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Graphic","../../../core/Handles","../../../core/promiseUtils","../../../core/accessorSupport/decorators","./LayerView2D","../tiling/TileInfoViewPOT","../tiling/TileKey","../tiling/TileQueue","../tiling/TileStrategy","../../vectorTiles/TileHandler","../../vectorTiles/VectorTileContainer","../../vectorTiles/VectorTileDisplayObject"],function(e,t,i,n,r,l,a,s,o,u,h,c,d,p,f,y){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._fetchQueue=null,t._tileRequests=new Map,t._handles=new l,t._invalidateStyle=!1,t.container=new f,t}return i(t,e),t.prototype.initialize=function(){var e=this;this._tileInfoView=new u(this.layer.tileInfo,this.layer.fullExtent),this._tileHandler=new p(this.layer,window.devicePixelRatio||1,!0,this.container),this.handles.add(this.watch("layer.currentStyleInfo",function(t){e._start()}))},t.prototype.destroy=function(){this._stop(),this.container.dispose(),this._tileHandler.destroy(),this._tileHandler=null},t.prototype.hitTest=function(e,t){var i=this;return this.suspended?a.resolve(null):this.container.hitTest(e,t).then(function(e){var t=i._tileHandler.getStyleRepository().layers;if(null===e||e<0||e>=t.length)return null;var n=t[e],l=new r({attributes:{layerId:e,layerName:n.id}});return l.layer=i.layer,l.sourceLayer=i.layer,l})},t.prototype.update=function(e){this.notifyChange("updating");var t=this._tileHandlerPromise;if(t&&t.isFulfilled()){if(e.pixelRatio!==this._tileHandler.devicePixelRatio)return this._start(),void(this._tileHandler.devicePixelRatio=e.pixelRatio);this._invalidateStyle&&(this._issueStyleInvalidation(e),this._invalidateStyle=!1),this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume();for(var i=this.container.children,n=0,r=i;n<r.length;n++){var l=r[n];this._tileHandler.updateTile(l,e)}}},t.prototype.attach=function(){var e=this;this._start(),this._handles.add(this.layer.on("paint-change",function(t){return e.container.requestRender()})),this._handles.add(this.layer.on("layout-change",function(t){e._invalidateStyle=!0,e.requestUpdate()}))},t.prototype.detach=function(){this._stop(),this._handles.removeAll()},t.prototype.moveStart=function(){this.requestUpdate()},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.canResume=function(){var e=this.inherited(arguments),t=this.layer,i=t;if(e&&i.currentStyleInfo){var n=this.view.scale,r=i.currentStyleInfo;if(r&&r.layerDefinition){var l=r.layerDefinition;l.minScale&&l.minScale<n&&(e=!1),l.maxScale&&l.maxScale>n&&(e=!1)}}return e},t.prototype.isUpdating=function(){var e=!0;return this._tileRequests.forEach(function(t){e=e&&t.isFulfilled()}),!this._tileHandlerPromise||!this._tileHandlerPromise.isFulfilled()||!e},t.prototype.acquireTile=function(e){var t=this,i=h.pool.acquire();i.set(e.level,e.row,e.col,e.world);var n=this.updateParameters.state.rotation,r=this._tileHandler.getStyleRepository(),l=y.pool.acquire(i,this.layer.tileInfo,r,n),s=this.layer.sourceNameToSource;return Object.keys(s).length<1?(l.setData(null,null),l.once("attach",function(){return t.requestUpdate()}),void this.container.addChild(l)):(this._tileHandlerPromise.then(function(){var e=[],n=[];for(var r in s){var o=s[r],u=o.getRefKey(i);e.push(u),n.push(r)}var h=a.eachAlways(e).then(function(e){for(var i={},r=0;r<e.length;r++)e[r].value&&(i[n[r]]=e[r].value);return 0===Object.keys(i).length?(l.setData(null,null),l.once("attach",function(){return t.requestUpdate()}),void t.container.addChild(l)):t._fetchQueue.push(l.key).then(function(e){l.setData(e.tileData,e.client),l.once("attach",function(){return t.requestUpdate()}),t.container.addChild(l),t.notifyChange("updating")})});t._tileRequests.set(i.id,h),t.notifyChange("updating")}),l)},t.prototype.releaseTile=function(e){var t=e.key.id,i=this._tileRequests.get(t);i&&(i.isFulfilled()||i.cancel(),this._tileRequests.delete(t)),this.container.removeChild(e),this.requestUpdate(),e.once("detach",function(){return y.pool.release(e)}),this.notifyChange("updating")},t.prototype._start=function(){var e=this;if(this._stop(),this.layer.currentStyleInfo&&this.attached){var t=this._tileHandler.start().then(function(){e._tileHandlerPromise===t&&(e._tileStrategy=new d({cachePolicy:"keep",coveragePolicy:"smallest",acquireTile:function(t){return e.acquireTile(t)},releaseTile:function(t){return e.releaseTile(t)},tileInfoView:e._tileInfoView}),e._fetchQueue=new c({tileInfoView:e._tileInfoView,process:function(t){return e._getTileData(t)}}),e.container.initialize(e._tileHandler.spriteMosaic,e._tileHandler.glyphMosaic,e.layer.tileInfo,e._tileInfoView),e.requestUpdate())});this._tileHandlerPromise=t}},t.prototype._stop=function(){this._tileHandlerPromise&&(this._tileHandlerPromise.isFulfilled()?this._tileHandlerPromise.isResolved()&&(this._tileHandlerPromise=null,this._fetchQueue.destroy(),this._fetchQueue=null,this._tileStrategy.destroy(),this._tileStrategy=null,this.container.removeAllChildren(),this._tileHandler.stop(),y.pool.prune()):(this._tileHandlerPromise.cancel(),this._tileHandlerPromise=null))},t.prototype._getTileData=function(e){return this._tileHandler.getTileData(e,this.updateParameters.state.rotation)},t.prototype._issueStyleInvalidation=function(e){var t=this;this._tileHandler.updateStyle().then(function(){t._fetchQueue.pause(),t._fetchQueue.clear(),t._tileRequests.forEach(function(e,t){e.cancel()}),t._tileRequests.clear(),t._fetchQueue.resume(),t.requestUpdate()})},n([s.property({dependsOn:["view.scale","layer.currentStyleInfo"]})],t.prototype,"suspended",void 0),t=n([s.subclass("esri.views.2d.layers.VectorTileLayerView2D")],t)}(s.declared(o))});