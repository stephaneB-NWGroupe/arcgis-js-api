// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/has","../kernel","../promiseList","./RenderMode","../geometry/Extent","../geometry/jsonUtils","../tasks/query","../tasks/FeatureSet","./vectorTiles/core/promiseUtils","./vectorTiles/core/SetPool","./vectorTiles/layers/support/TileInfo","./vectorTiles/views/2d/tiling/TileInfoView","./vectorTiles/views/2d/tiling/TileQueue","./vectorTiles/views/2d/tiling/TileStrategy","./vectorTiles/views/2d/tiling/TileKey","./vectorTiles/geometry/SpatialReference"],function(e,t,i,r,s,a,n,l,u,o,h,c,d,f,_,p,g,y,w){var v=r("esri-featurelayer-webgl"),m=r("esri-mobile"),T=v&&null!=v.maxDrillLevel?v.maxDrillLevel:m?1:2,F=v&&null!=v.maxRecordCountFactor?v.maxRecordCountFactor:m?1:3,R=e([n],{declaredClass:"esri.layers._OnDemandDrillMode",featureLayer:null,graphics:null,maxDrillLevel:T,maxRecordCountFactor:F,_graphicsVal:null,_reEvalGraphics:!1,_featureMap:null,_defaultTileSize:512,_quantizationFactor:1,_tileInfo:null,_tileInfoView:null,_tileFetchQueue:null,_tileStrategy:null,_tileRequests:null,_wglRenderer:null,_wglView:null,_wglContainer:null,constructor:function(e){this._isTileFulfilled=this._isTileFulfilled.bind(this),this._graphicsVal=[],this._featureMap={},this.featureLayer=e},initialize:function(e){this.inherited(arguments);var t=new w(e.spatialReference.toJson());this._tileInfo=f.create({spatialReference:t,size:this._defaultTileSize}),this._tileInfoView=new _(this._tileInfo),this._tileFetchQueue=new p({tileInfoView:this._tileInfoView,process:this._getFeatureSet.bind(this)}),this._tileStrategy=new g({cachePolicy:"purge",acquireTile:this._acquireTile.bind(this),releaseTile:this._releaseTile.bind(this),tileInfoView:this._tileInfoView}),this._tileRequests=new Map},startup:function(){if(!this._started||this._isSuspendedAtStartup){this.inherited(arguments);var e=this.featureLayer;this._wglRenderer=e._div,this._wglView=this._wglRenderer._wglView,this._wglContainer=this._wglRenderer._wglContainer,this._wglView.initialize(this._tileInfoView),this._isSuspendedAtStartup=e.suspended,this.start()}},propertyChangeHandler:function(e){this._init&&(e<2?this.start():console.log("FeatureLayer: layer in on-demand mode does not support time definitions. Layer id = "+this.featureLayer.id+", Layer URL = "+this.featureLayer.url))},destroy:function(){this._tileFetchQueue.clear(),this._tileStrategy.destroy(),this._tileRequests.clear(),this.inherited(arguments)},update:function(e){this._tileFetchQueue.pause(),this._tileFetchQueue.state=e.state,this._tileStrategy.update(e),this._tileFetchQueue.resume(),this._evalUpdateStatus()},suspend:function(){this._init&&this.stop()},resume:function(){this._init&&this.start()},refresh:function(){this.start()},hasAllFeatures:function(){var e=!1;return this._tileRequests.forEach(function(t){t.hasPartialFeatures&&(e=!0)}),!e},hasUpdateError:function(){var e=!1;return this._tileRequests.forEach(function(t){t.hasUpdateError&&(e=!0)}),e},start:function(){var e=this.featureLayer;!e.suspended&&e.isQueryable()&&(this._clearIIf(),this._tileFetchQueue.pause(),this._tileFetchQueue.clear(),this._tileStrategy.clear(),this._wglRenderer.start())},stop:function(){this._wglRenderer.stop()},_evalUpdateStatus:function(){this._getCurrentTiles().every(this._isTileFulfilled)?this.featureLayer._fireUpdateEnd():this.featureLayer._fireUpdateStart()},_getCurrentTiles:function(){var e=this._tileStrategy.tileIndex,t=[];return e.forEach(function(e,i,r){t.push(i)}),t},_isTileFulfilled:function(e){var t=this._tileRequests.get(e);return!(!t||!t.isFulfilled)},_acquireTile:function(e){this.featureLayer._fireUpdateStart();var t=this._wglView.acquireTile(e),i=this._tileFetchQueue.push(t.key).then(function(e){return this._wglRenderer._symbolProcessor.getTileData(t.key,e.featureSet).then(function(t){return{tileData:t.data,featureSet:e.featureSet,errors:e.errors}})}.bind(this)).then(function(e){t.setData(e.tileData,this._wglRenderer._hasVV,!1),this._addTile(t,e)}.bind(this)).otherwise(function(e){return this._tileError(t),c.reject(e)}.bind(this));return this._tileRequests.set(t.key.id,{request:i,isFulfilled:!1,hasUpdateError:null,hasPartialFeatures:null,featureSet:null,graphics:[]}),t},_releaseTile:function(e){this.featureLayer._fireUpdateStart(),this._tileRequests.get(e.key.id)&&(this._removeTile(e),this._wglRenderer._scheduleUpdate())},_addTile:function(e,t){this._reEvalGraphics=!0,this._wglView.addChild(e);var i=this._createGraphics(t.featureSet);this._registerGraphics(i);var r=this._tileRequests.get(e.key.id);r&&(r.isFulfilled=!0,r.hasUpdateError=!!t.errors.length,r.hasPartialFeatures=r.hasUpdateError,r.featureSet=t.featureSet,r.graphics=i)},_tileError:function(e){var t=this._tileRequests.get(e.key.id);t&&(t.isFulfilled=!0,t.hasUpdateError=!0,t.hasPartialFeatures=!0,t.graphics=[]),this._wglRenderer._scheduleUpdate()},_removeTile:function(e){var t=e.key.id,i=this._tileRequests.get(t);i.request.isFulfilled()||i.request.cancel(),this._tileRequests.delete(t),this._wglRenderer._cancelRedraw(t),this._reEvalGraphics=!0,this._wglView.releaseTile(e),this._unregisterGraphics(i.graphics)},_getFeatureSet:function(e){var t={hashes:new Set,drill:[],featureSet:{features:[],geometryType:this.featureLayer.geometryType,spatialReference:this.map.spatialReference.toJson(),transform:null},errors:[]},i=this.featureLayer._task,r=this._getResolutionParams(e),s=this._tileInfoView.getTileBounds([0,0,0,0],e);s=this._expandTileBounds(s,r);var a=d.acquire();return this._drillQuery(t,a,i,s,r,null,e).then(function(e){return d.release(a),this._calculateCentroid(e),e}.bind(this)).otherwise(function(e){throw d.release(a),e})},_getResolutionParams:function(e){this._tileInfo.updateTileInfo(e);var t=this._tileInfo.lodAt(e.level);return{mode:"view",originPosition:"upperLeft",tolerance:this._quantizationFactor*t.resolution,extent:new l(e.extent[0],e.extent[1],e.extent[2],e.extent[3],this.map.spatialReference)}},_expandTileBounds:function(e,t){var i=this.featureLayer.geometryType,r="esriGeometryPoint"===i||"esriGeometryMultipoint"===i||this._wglRenderer._returnCentroid,s=r?20:0,a=s*t.tolerance;return e[0]-=a,e[1]-=a,e[2]+=a,e[3]+=a,e},_calculateCentroid:function(e){var t;if("esriGeometryPolygon"===e.featureSet.geometryType&&this._wglRenderer._returnCentroid){t=0;var i=e.featureSet.spatialReference,r=e.featureSet.transform,s={geometry:{x:null,y:null}},a=[s];e.featureSet.features.forEach(function(e){if(!e.centroid){var n=e.geometry;if(n){n=h.createPolygon(n,i,r);var l=n.getCentroid();l&&(s.geometry.x=l.x,s.geometry.y=l.y,u.quantize(a,"esriGeometryPoint",r),e.centroid={x:s.geometry.x,y:s.geometry.y},t++)}}})}return t},_drillQuery:function(e,t,i,r,s,n,l,u){return u=null!=u?u:0,e.drill.push(r),this._query(i,r,s,n,l,u).then(function(o){if(this._appendFeatures(e.featureSet.features,t,o.features),o.transform&&(e.featureSet.transform=o.transform),o.exceededTransferLimit){if(u<this.maxDrillLevel){u++;var h=(r[2]-r[0])/2,c=(r[3]-r[1])/2,d=[r[0],r[1]+c,r[2]-h,r[3]],f=[r[0]+h,r[1]+c,r[2],r[3]],_=[r[0],r[1],r[2]-h,r[3]-c],p=[r[0]+h,r[1],r[2],r[3]-c];return a([this._drillQuery(e,t,i,d,s,n,l,u),this._drillQuery(e,t,i,f,s,n,l,u),this._drillQuery(e,t,i,_,s,n,l,u),this._drillQuery(e,t,i,p,s,n,l,u)]).then(function(){return e})}e.errors.push(new Error("Max drill level reached! tileId: "+l.id+", level: "+u))}return e}.bind(this)).otherwise(function(t){if(!(u>0))throw t;e.errors.push(t)}.bind(this))},_appendFeatures:function(e,t,i){var r=e.length,s=i?i.length:0;e.length=r+s;var a,n,l,u=0,o=this.featureLayer.objectIdField;for(a=0;a<s;a++)n=i[a],l=n.attributes[o],t.has(l)||(e[r+u]=n,t.add(l),u++);e.length-=s-u},_query:function(e,t,i,r,s,a){var n=this.featureLayer,u=new o;u.geometry=new l(t[0],t[1],t[2],t[3],this.map.spatialReference),u.outFields=n.getOutFields(),u.where=n.getDefinitionExpression(),u.returnGeometry=!0,u.returnCentroid=this._wglRenderer._returnCentroid,u.timeExtent=n._getOffsettedTE(n._mapTimeExtent),n._ts&&(u._ts=Date.now()),u.orderByFields=n.supportsAdvancedQueries?n.getOrderByFields():null,u.multipatchOption=n.multipatchOption,u.maxAllowableOffset="esriGeometryPolyline"===n.geometryType?i.tolerance:null,u.quantizationParameters=i;var h=n.advancedQueryCapabilities;return h&&h.supportsQueryWithResultType&&(u.resultType="tile"),u.returnExceededLimitFeatures=a===this.maxDrillLevel,u.maxRecordCountFactor=this.maxRecordCountFactor,this._wrapInNewDeferred(e.rawExecute(u))},_wrapInNewDeferred:function(e){var t=new i(function(){e.isFulfilled()||e.cancel()});return e.then(function(e){t.resolve(e)}).otherwise(function(e){t.reject(e)}),t.promise},_collectGraphics:function(){var e,t=this._featureMap,i=[];for(e in t)i.push(t[e]);return i},_createGraphics:function(e){return h.createGraphics(e)},_registerGraphics:function(e){var t=this.featureLayer.objectIdField;e.forEach(function(e){var i=e.attributes&&e.attributes[t];this._registerFeature(i,e),this._incRefCount(i)}.bind(this))},_unregisterGraphics:function(e){var t=this.featureLayer.objectIdField;e.forEach(function(e){var i=e.attributes&&e.attributes[t];this._decRefCount(i),this._unregisterFeature(i)}.bind(this))}});return Object.defineProperty(R.prototype,"graphics",{get:function(){return this._reEvalGraphics&&(this._reEvalGraphics=!1,this._graphicsVal=this._collectGraphics()),this._graphicsVal}}),r("extend-esri")&&t.setObject("layers._OnDemandDrillMode",R,s),R});