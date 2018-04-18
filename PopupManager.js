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

define(["./geometry/Extent","./geometry/ScreenPoint","./kernel","./layerUtils","./tasks/query","dijit/registry","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","dojo/has","dojo/on","dojo/promise/all","dojo/Stateful","require"],function(e,r,a,t,i,s,n,l,o,c,u,d,f,p,h){var y,m=l(p,{declaredClass:"esri.PopupManager",enabled:!1,map:null,_mapClickHandle:null,_featureLayersCache:{},constructor:function(e){this._mapClickHandler=c.hitch(this,this._mapClickHandler)},setMap:function(e){if(this.map){if(e===this.map)return;this.unsetMap()}this.map=e,this._setupClickHandler()},unsetMap:function(){this.map&&(this.map=null),this._mapClickHandle&&(this._mapClickHandle.remove(),this._mapClickHandle=null)},getMapLayer:function(e){var r;if(e&&(r=e.getLayer())){var a=r.id;if(this._featureLayersCache[a]){var t=a.lastIndexOf("_");t>-1&&(a=a.substring(0,t),r=this.map.getLayer(a))}}return r},_enabledSetter:function(e){this.enabled=e,this._setupClickHandler()},_setupClickHandler:function(){this._mapClickHandle&&(this._mapClickHandle.remove(),this._mapClickHandle=null),this.enabled&&this.map&&(this._mapClickHandle=this.map.on("click",this._mapClickHandler))},_mapClickHandler:function(e){var r=this.map.infoWindow,a=e.graphic;r&&this.map.loaded&&(r.clearFeatures&&r.setFeatures?this._showPopup(e):a&&a.getInfoTemplate()&&this._showInfoWindow(a,e.mapPoint))},_showPopup:function(a){var t=this.map,s=t.infoWindow,l=this,c=[],u=[t.graphics].concat(n.map(t.graphicsLayerIds,t.getLayer,t));n.forEach(u,function(e){e&&e.loaded&&e.infoTemplate&&!e.suspended&&c.push(e)});var d=[];n.forEach(t.layerIds,function(e){var r=t.getLayer(e);r&&r.loaded&&!r.suspended&&(l._isImageServiceLayer(r)&&r.infoTemplate?c.push(r):"esri.layers.WMSLayer"===r.declaredClass&&r.getFeatureInfoURL?c.push(r):"esri.layers.ArcGISDynamicMapServiceLayer"!==r.declaredClass&&"esri.layers.ArcGISTiledMapServiceLayer"!==r.declaredClass||!r.infoTemplates||d.push(r))}),this._getSubLayerFeatureLayers(d).then(function(u){c=c.concat(u);var d=null;if(a.graphic&&a.graphic.getInfoTemplate()&&!l._isImageServiceLayer(a.graphic._layer)&&(d=a.graphic),c.length||d){var f=l._calculateClickTolerance(c),p=a.screenPoint,h=t.toMap(new r(p.x-f,p.y+f)),y=t.toMap(new r(p.x+f,p.y-f)),m=new e(h.x,h.y,y.x,y.y,t.spatialReference);if(m=m.intersects(t.extent)){var g=new i,v=!!d,_=!0,L=n.map(c,function(e){g.timeExtent=e.useMapTime?t.timeExtent:null;var r=l._isReductionEnabled(e);e=r?e.getFeatureReductionLayer():e;var i;if(l._isImageServiceLayer(e)){g.geometry=a.mapPoint,_=!1;var s={};s.rasterAttributeTableFieldPrefix="Raster.",s.returnDomainValues=!0,i=e.queryVisibleRasters(g,s),i.addCallback(function(){var r=e.getVisibleRasters();return v=v||r.length>0,r})}else if("esri.layers.WMSLayer"===e.declaredClass){i=new o;var c=e._getPopupGraphic(t,a.screenPoint);c?(i.resolve([c]),v=!0):i.resolve([])}else if(l._featureLayersCache[e.id]||"function"==typeof e.queryFeatures&&(0===e.currentMode||1===e.currentMode))g.geometry=m,i=e.queryFeatures(g),i.addCallback(function(e){var r=e.features;return r=n.filter(r,function(e){return e.visible}),v=v||r.length>0,r});else{i=new o;var u=n.filter(e.graphics,function(e){return e&&e.visible&&m.intersects(e.geometry)});if(r&&l._isParentLayer(e,d)){var f=l._findGraphicById(u,d,"cluster_id");f&&(d=f)}v=v||u.length>0,i.resolve(u)}return i});if(d){var b=new o;b.resolve([d]),L.unshift(b)}if(!n.some(L,function(e){return!e.isFulfilled()})&&!v)return s.hide(),void s.clearFeatures();s.setFeatures(L),s.show(a.mapPoint,{closestFirst:_})}}})},_getSubLayerFeatureLayers:function(e,r){var a=r||new o,i=[],s=e.length,l=Math.floor(this.map.extent.getWidth()/this.map.width),c=this.map.getScale(),u=!1,p=this;e:for(var m=0;m<s;m++){var g=e[m],v=g.dynamicLayerInfos||g.layerInfos;if(v){var _=null;g._params&&(g._params.layers||g._params.dynamicLayers)&&(_=g.visibleLayers),_=t._getVisibleLayers(v,_);for(var L=t._getLayersForScale(c,v),b=v.length,C=0;C<b;C++){var w=v[C],I=w.id,M=g.infoTemplates[I];if(!w.subLayerIds&&M&&M.infoTemplate&&n.indexOf(_,I)>-1&&n.indexOf(L,I)>-1){if(!y){u=!0;break e}var S=g.id+"_"+I,x=this._featureLayersCache[S];if(x&&x.loadError)continue;if(!x){var k=M.layerUrl;k||(k=w.source?this._getLayerUrl(g.url,"/dynamicLayer"):this._getLayerUrl(g.url,I)),x=new y(k,{id:S,drawMode:!1,mode:y.MODE_SELECTION,outFields:this._getOutFields(M.infoTemplate),resourceInfo:M.resourceInfo,source:w.source}),this._featureLayersCache[S]=x}x.setDefinitionExpression(g.layerDefinitions&&g.layerDefinitions[I]),x.setGDBVersion(g.gdbVersion),x.setInfoTemplate(M.infoTemplate),x.setMaxAllowableOffset(l),x.setUseMapTime(!!g.useMapTime),g.layerDrawingOptions&&g.layerDrawingOptions[I]&&g.layerDrawingOptions[I].renderer&&x.setRenderer(g.layerDrawingOptions[I].renderer),i.push(x)}}}}if(u){var T=new o;h(["./layers/FeatureLayer"],function(e){y=e,T.resolve()}),T.then(function(){p._getSubLayerFeatureLayers(e,a)})}else{var F=[];n.forEach(i,function(e){if(!e.loaded){var r=new o;d.once(e,"load, error",function(){r.resolve()}),F.push(r.promise)}}),F.length?f(F).then(function(){i=n.filter(i,function(e){return!e.loadError&&e.isVisibleAtScale(c)}),a.resolve(i)}):(i=n.filter(i,function(e){return e.isVisibleAtScale(c)}),a.resolve(i))}return a.promise},_getLayerUrl:function(e,r){var a=e.indexOf("?");return-1===a?e+"/"+r:e.substring(0,a)+"/"+r+e.substring(a)},_getOutFields:function(e){var r;return e.info&&"esri.dijit.PopupTemplate"===e.declaredClass?(r=[],n.forEach(e.info.fieldInfos,function(e){var a=e.fieldName&&e.fieldName.toLowerCase();a&&"shape"!==a&&0!==a.indexOf("relationships/")&&r.push(e.fieldName)})):r=["*"],r},_calculateClickTolerance:function(e){var r,a,t=6;return n.forEach(e,function(e){(r=e.renderer)&&("esri.renderer.SimpleRenderer"===r.declaredClass?(a=r.symbol,a&&a.xoffset&&(t=Math.max(t,Math.abs(a.xoffset))),a&&a.yoffset&&(t=Math.max(t,Math.abs(a.yoffset)))):"esri.renderer.UniqueValueRenderer"!==r.declaredClass&&"esri.renderer.ClassBreaksRenderer"!==r.declaredClass||n.forEach(r.infos,function(e){a=e.symbol,a&&a.xoffset&&(t=Math.max(t,Math.abs(a.xoffset))),a&&a.yoffset&&(t=Math.max(t,Math.abs(a.yoffset)))}))}),t},_showInfoWindow:function(e,r){var a=this.map.infoWindow,t=e.geometry,i=t&&"point"===t.type?t:r,n=e.getContent();if(a.setTitle(e.getTitle()),n&&c.isString(n.id)){var l=s.byId(n.id);l&&l.set&&/_PopupRenderer/.test(l.declaredClass)&&l.set("showTitle",!1)}a.setContent(n),a.show(i)},_findGraphicById:function(e,r,a){var t,i=r.attributes,s=i&&i[a];return n.some(e,function(e){var r=e.attributes;return r&&r[a]===s&&(t=e),!!t}),t},_isParentLayer:function(e,r){var a=r&&r.getLayer();return e&&a===e},_isReductionEnabled:function(e){return e&&e.isFeatureReductionActive&&e.isFeatureReductionActive()},_isImageServiceLayer:function(e){return"esri.layers.ArcGISImageServiceLayer"===e.declaredClass||"esri.layers.ArcGISImageServiceVectorLayer"===e.declaredClass}});return u("extend-esri")&&(a.PopupManager=m),m});