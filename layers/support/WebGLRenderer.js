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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/dom-style","dojox/gfx/matrix","../../kernel","../../lang","../../geometry/scaleUtils","../vectorTiles/core/promiseUtils","../vectorTiles/views/2d/engine/StageGL","../vectorTiles/views/2d/engine/webgl/WGLFeatureView","../vectorTiles/views/2d/engine/webgl/rendererInfoUtils","../vectorTiles/views/2d/layers/features/processors/SymbolProcessor","../vectorTiles/views/2d/support/HighlightOptions","../vectorTiles/geometry/SpatialReference","../vectorTiles/geometry/support/spatialReferenceUtils","../vectorTiles/renderers/SimpleRenderer","../vectorTiles/renderers/ClassBreaksRenderer","../vectorTiles/renderers/UniqueValueRenderer"],function(e,t,i,r,n,s,a,o,l,h,d,u,_,c,m,p,f,w,y,g){function v(e){Object.defineProperty(e,"width",{get:function(){return this.size[0]}}),Object.defineProperty(e,"height",{get:function(){return this.size[1]}}),Object.defineProperty(e,"center",{get:function(){var e=this.viewpoint.targetGeometry;return[e.x,e.y]}})}var R,b=c.SymbolProcessor,P=r("esri-will-change"),V=function(){var e,t=window.performance||{},i=t.now||t.webkitNow||t.msNow||t.oNow||t.mozNow;return void 0!==i?function(){return i.call(t)}:(e=window.performance&&window.performance.timing&&window.performance.timing.navigationStart?window.performance.timing.navigationStart:(new Date).getTime(),function(){return(new Date).getTime()-e})}(),T=r("ff"),C=r("ie"),x=r("webkit"),S=r("opera"),L=(new Date).getTime(),q=window.requestAnimationFrame;q||(R=x&&"webkit"||T&&"moz"||S&&"o"||C&&"ms",(q=window[R+"RequestAnimationFrame"])||(q=function(e){var t=V(),i=Math.max(0,16-(t-L)),r=window.setTimeout(function(){e(V())},i);return L=t+i,r}));var I=e(null,{surfaceType:"webgl",surface:null,map:null,layer:null,updateOnPan:!1,renderOnNav:!1,_canvas:null,_mapSR4:null,_dprWatchDelay:2e3,_dprTimer:null,_rendererEvalTimer:null,_redrawPromises:null,_wglContainer:null,_wglView:null,_parentLayerView:null,_layerListenerHandles:null,_mapListenerHandles:null,_symbolProcessor:null,_rendererInfo:null,_returnCentroid:null,_hasVV:!1,_started:!1,_renderRequested:!1,_updateRequested:!1,_frameRequested:!1,_frameHandle:null,_viewState:null,_renderParameters:null,_updateParameters:null,_zooming:!1,_panning:!1,_scaleMatrix:null,_defaultTransition:"transform 500ms ease",constructor:function(e){this._frame=this._frame.bind(this),this._evalRendererChange=this._evalRendererChange.bind(this),this._redrawPromises=new Map,o.mixin(this,e),this._setup()},destroy:function(){this._teardown()},getNode:function(){return this._canvas},getEventSource:function(){return this.getNode()},setClip:function(e){},start:function(){this._started=!0,this._renderParameters.pixelRatio=this._updateParameters.pixelRatio=window.devicePixelRatio,this._watchDPR(),this._updateMapView(this.map.extent)},stop:function(){this._started=!1,this._unwatchDPR(),this._stopFrame()},redraw:function(){this._handleRendererChange()},hitTest:function(e,t){return this.layer.suspended?h.resolve(null):this._wglView.hitTest(e,t).then(function(e){if(0===e.length)return null;var t=e[0];return this.layer._mode._featureMap[t]}.bind(this))},syncHitTest:function(e,t){var i=this._wglView._hitTest(this._wglContainer.prepareChildrenRenderParameters(this._renderParameters),e,t);this._scheduleRender();var r=i[0];return this.layer._mode._featureMap[r]},_setup:function(){this._mapSR4=new p(this.map.spatialReference.toJson()),this._initState(),this._createWGLContainer(),this._createWGLView(),this._applyLayerSettings(),this._createMapListeners(),this._setViewState(),this._initRendering()},_teardown:function(){this._destroyRendering(),this._destroyMapListeners(),this._destroyLayerListeners(),this._destroyWGLView(),this._destroyWGLContainer(),this.stop(),this.surface.getEventSource().removeChild(this.getNode())},_createWGLContainer:function(){this._wglContainer=new d,this._canvas=this._wglContainer.createElement(),P&&n.set(this._canvas,"will-change","transform"),this._wglContainer.setElement(this._canvas),this.surface.getEventSource().appendChild(this._canvas),this._wglContainer.parent={requestChildRender:this._scheduleRender.bind(this)},this._wglContainer.attach(this._renderParameters)},_destroyWGLContainer:function(){this._wglContainer.detach(this._renderParameters),this._wglContainer=null},_createWGLView:function(){this._parentLayerView={view:{spatialReference:this._mapSR4,highlightOptions:new m,renderContext:"webgl"},tileInfoView:null,layer:{objectIdField:this.layer.objectIdField,geometryType:this._getNormalizedGeometryType(this.layer),renderer:null,spatialReference:new p(this.layer.spatialReference.toJson()),fields:this.layer.fields,typeIdField:this.layer.typeIdField,types:i.map(this.layer.types,function(e){return e.toJson()})},requestUpdate:function(){this._scheduleUpdate()}.bind(this)},this._wglView=new u(this._parentLayerView),this._wglContainer.addChild(this._wglView),this._wglView._domContainer=this._wglContainer},_getNormalizedGeometryType:function(e){return e.hasXYFootprint()?"esriGeometryPolygon":e.geometryType},_destroyWGLView:function(){this._wglContainer.removeChild(this._wglView)},_applyLayerSettings:function(){this._wglContainer.opacity=this.layer.opacity,this._wglContainer.visible=!this.layer.suspended,this._createLayerListeners()},_createLayerListeners:function(){this._destroyLayerListeners();var e=this.layer;this._layerListenerHandles=[e.on("opacity-change",function(){this._wglContainer.opacity=this.layer.opacity}.bind(this)),e.on("suspend",function(){this._wglContainer.visible=!1}.bind(this)),e.on("resume",function(){this._wglContainer.visible=!0}.bind(this)),e.on("renderer-change",function(){this._handleRendererChange()}.bind(this))]},_destroyLayerListeners:function(){i.forEach(this._layerListenerHandles,function(e){e.remove()}),this._layerListenerHandles=null},_createMapListeners:function(){this._destroyMapListeners();var e=this.map;this._mapListenerHandles=[e.on("pan-start",function(e){this._panning=!0,this.updateOnPan||this.renderOnNav||this._stopFrame()}.bind(this)),e.on("pan",function(e){this._applyPanEvent(e)}.bind(this)),e.on("pan-end",function(e){this._panning=!1,this._applyPanEvent(e)}.bind(this)),e.on("extent-change",function(e){n.set(this.getNode(),a._css.names.transition,"none"),this._updateMapView(e.extent)}.bind(this)),e.on("zoom-start",function(e){this._zooming=!0,this._stopFrame()}.bind(this)),e.on("zoom-end",function(e){this._zooming=!1}.bind(this)),e.on("scale",function(e){if(!this.renderOnNav){n.set(this.getNode(),a._css.names.transition,e.immediate?"none":this._defaultTransition);var t=this.map.__visibleDelta,i=s.translate(-t.x,-t.y),r=s.multiply(s.invert(i),e.matrix,i);this._scaleMatrix=r,this._applyTransform(r)}}.bind(this))]},_destroyMapListeners:function(){i.forEach(this._mapListenerHandles,function(e){e.remove()}),this._mapListenerHandles=null},_getRenderer4:function(e){if(e=e||this.layer._getRenderer()){var t,i=this._fixImageUrl(e.toJson());return"simple"===i.type?t=w.fromJSON(i):"classBreaks"===i.type?t=y.fromJSON(i):"uniqueValue"===i.type?t=g.fromJSON(i):console.error("WebGLRenderer: unsupported layer.renderer!"),t}},_fixImageUrl:function(e){var t=[];switch(e.type){case"simple":t.push(e.symbol);break;case"uniqueValue":t.push(e.defaultSymbol),t=t.concat(i.map(e.uniqueValueInfos,function(e){return e.symbol}));break;case"classBreaks":t.push(e.defaultSymbol),t=t.concat(i.map(e.classBreakInfos,function(e){return e.symbol}))}t=i.filter(t,function(e){return!!e});var r=this.layer._url.path+"/images/",n=this.layer._getToken();return i.forEach(t,function(e){var t=e.url;t&&(-1===t.search(/https?\:/)&&-1===t.indexOf("data:")&&(e.url=r+t),n&&-1!==e.url.search(/https?\:/)&&(e.url+="?token="+n))}),e},_setRenderer:function(e){this._rendererInfo=this._createRendererInfo(e),this._parentLayerView.layer.renderer=e},_createRendererInfo:function(e){if(!e)return void(this._returnCentroid=this._hasVV=!1);var t=this._parentLayerView.layer,r=_.createRendererInfo(e,this._mapSR4,{fields:i.map(t.fields,function(e){return e.toJson()}),typeIdField:t.typeIdField,types:t.types});return this._returnCentroid=this._getReturnCentroid(r.renderer),this._hasVV=this._getHasVV(r),"heatmap"===r.renderer.type&&this._wglView.updateHeatmapParameters(r.renderer),r},_getReturnCentroid:function(e){if("esriGeometryPolygon"!==this._getNormalizedGeometryType(this.layer))return!1;switch(e.type){case"simple":return this._isMarkerSymbol(e.symbol);case"unique-value":return this._isMarkerSymbol(e.defaultSymbol)||e.uniqueValueInfos.some(function(e){return this._isMarkerSymbol(e.symbol)}.bind(this));case"class-breaks":return this._isMarkerSymbol(e.defaultSymbol)||e.classBreakInfos.some(function(e){return this._isMarkerSymbol(e.symbol)}.bind(this));default:return!1}},_getHasVV:function(e){var t=e.vvFields;return null!=t&&(null!=t.size||null!=t.rotation||null!=t.color||null!=t.opacity)},_isMarkerSymbol:function(e){if(!e)return!1;var t=e.type;return"simple-marker"===t||"picture-marker"===t||"text"===t},_handleRendererChange:function(){this._rendererEvalTimer||(this._rendererEvalTimer=setTimeout(this._evalRendererChange,0))},_cancelRendererEval:function(){clearTimeout(this._rendererEvalTimer),this._rendererEvalTimer=null},_evalRendererChange:function(){this._cancelRendererEval();var e=this._returnCentroid;if(this._setRenderer(this._getRenderer4()),this._rendererInfo)if(this._cancelRedraw(),this._wglView.renderSwitchFrom()){this._symbolProcessor._rendererInfo=this._rendererInfo;var t=e!==this._returnCentroid&&this._returnCentroid;t?this.layer._mode.refresh():this._redrawView()}else this._scheduleUpdate()},_redrawView:function(){this._wglView.children.slice(0).forEach(function(e,t){var i=e.key.id,r=this.layer._mode._tileRequests.get(i);if(r){var n=this._redrawTile(e,r.featureSet);n.isFulfilled()||this._redrawPromises.set(i,n)}}.bind(this))},_redrawTile:function(e,t){return this._symbolProcessor.getTileData(e.key,t).then(function(t){var i=e.key.id;this._redrawPromises.delete(i),this.layer._mode._tileRequests.get(i)&&this._repaintTile(e,t.data)}.bind(this)).otherwise(function(t){this._redrawPromises.delete(e.key.id)}.bind(this))},_repaintTile:function(e,t){this._wglView.removeChild(e),e.attached=!1,e.setData(t,this._hasVV,!1),this._wglView.addChild(e)},_cancelRedraw:function(e){if(e){var t=this._redrawPromises.get(e);t&&t.cancel()}else this._redrawPromises.forEach(function(e,t){e.cancel()})},_initState:function(){var e={};v(e),this._viewState=o.mixin(e,{scale:0,size:[0,0],rotation:0,resolution:1,worldScreenWidth:0,spatialReference:this._mapSR4,viewpoint:{rotation:0,scale:0,targetGeometry:{x:0,y:0},camera:null,clone:function(){var e=o.mixin({},this);return e.targetGeometry&&(e.targetGeometry=o.mixin({},e.targetGeometry)),e}},toScreen:function(e,t){var i=this.center[0]-this.resolution*this.width*.5,r=this.center[1]+this.resolution*this.height*.5;return e[0]=(t[0]-i)/this.resolution,e[1]=(r-t[1])/this.resolution,e},toMap:function(e,t){var i=this.center[0]-this.resolution*this.width*.5,r=this.center[1]+this.resolution*this.height*.5;return e[0]=i+t[0]*this.resolution,e[1]=r-t[1]*this.resolution,e},clone:function(){var e=o.mixin({},this);return v(e),e.size&&(e.size=e.size.slice(0)),e.viewpoint&&(e.viewpoint=e.viewpoint.clone()),e}}),this._renderParameters={state:this._viewState,pixelRatio:window.devicePixelRatio,stationary:!0},this._updateParameters={state:this._viewState,pixelRatio:window.devicePixelRatio,stationary:!0}},_initRendering:function(){this._setRenderer(this._getRenderer4()),this._symbolProcessor=new b({objectIdField:this.layer.objectIdField,geometryType:this._getNormalizedGeometryType(this.layer),rendererInfo:this._rendererInfo,devicePixelRatio:this._renderParameters.pixelRatio,textureManager:this._wglView.textureManager}),this._wglView.renderInit()},_destroyRendering:function(){this._symbolProcessor&&this._symbolProcessor.destroy(),this._cancelRendererEval(),this._cancelRedraw()},_updateMapView:function(e){this._setViewState(e),this._scheduleUpdate(),this._scheduleRender()},_setViewState:function(e){var t=this.map;if(t.loaded){var i=e?e.getCenter():t.extent.getCenter(),r=this._viewState;r.viewpoint.targetGeometry=i.toJson(),r.scale=r.viewpoint.scale=t.getScale(),r.size=[t.width,t.height]}},_updateViewState:function(){var e=this._viewState;e.resolution=e.scale/(39.37*l.getUnitValueForSR(this.map.spatialReference)*96);var t=0;if(e.spatialReference.isWrappable){var i=f.getInfo(e.spatialReference);t=i.valid[1]-i.valid[0]}e.worldScreenWidth=Math.round(t/e.resolution)},_stopFrame:function(){this._renderRequested=!1,this._updateRequested=!1,this._frameRequested=!1,cancelAnimationFrame(this._frameHandle),this._frameHandle=null},_canRender:function(){return this.renderOnNav||!this._zooming&&!this._panning},_canUpdate:function(){return this.updateOnPan||!this._zooming&&!this._panning},_watchDPR:function(){this._unwatchDPR(),this._dprTimer=setTimeout(function(){this._renderParameters.pixelRatio!==window.devicePixelRatio&&this._scheduleRender(),this._watchDPR()}.bind(this),this._dprWatchDelay)},_unwatchDPR:function(){clearTimeout(this._dprTimer),this._dprTimer=null},_scheduleRender:function(){this._started&&this._canRender()&&(this._renderRequested=!0,this._scheduleFrame())},_scheduleUpdate:function(){this._started&&this._canUpdate()&&(this._updateRequested=!0,this._scheduleFrame())},_scheduleFrame:function(){this._frameRequested||(this._frameRequested=!0,this._frameHandle=q(this._frame))},_frame:function(){if(this._frameRequested){this._frameRequested=!1,this._renderParameters.pixelRatio!==window.devicePixelRatio&&(this._renderParameters.pixelRatio=this._updateParameters.pixelRatio=this._symbolProcessor._devicePixelRatio=window.devicePixelRatio);this._updateParameters.stationary=this._renderParameters.stationary=!0,this._updateViewState(),this._renderRequested&&this._canRender()&&(this._renderRequested=!1,n.set(this._canvas,a._css.names.transition,"none"),this._applyTransform(),this._scaleMatrix=null,this._wglContainer.doRender(this._renderParameters)),this._updateRequested&&this._canUpdate()&&(this._updateRequested=!1,this.layer._mode.update(this._updateParameters))}},_applyPanEvent:function(e){if(!this.renderOnNav){var t=s.translate(e.delta.x,e.delta.y),i=this._scaleMatrix?s.multiply(t,this._scaleMatrix):t;this._applyTransform(i)}(this.updateOnPan||this.renderOnNav)&&this._updateMapView(e.extent)},_applyTransform:function(e){e=e?a._css.matrix(e):"",n.set(this._canvas,a._css.names.transform,e)}});return r("extend-esri")&&t.setObject("layers.support.WebGLRenderer",I,a),I});