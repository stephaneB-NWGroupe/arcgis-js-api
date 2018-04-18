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

define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/sniff","dojo/io-query","dojo/dom-construct","dojo/dom-style","../kernel","../config","../lang","../request","../urlUtils","../SpatialReference","../geometry/webMercatorUtils","../dijit/PopupTemplate","./layer","./KMLFolder","./KMLGroundOverlay","./MapImageLayer","./FeatureLayer"],function(e,t,i,r,n,o,s,a,l,h,d,c,f,u,p,_,g,y,v,m,b,k,L){var w=t([v],{declaredClass:"esri.layers.KMLLayer",serviceUrl:p.getProtocolForWebResource()+"//utility.arcgis.com/sharing/kml",constructor:function(e,t){e||console.log("KMLLayer:constructor - please provide url for the KML file"),this._outSR=t&&t.outSR||new _({wkid:4326}),this._options=r.mixin({},t),c.defaults.kmlService&&(this.serviceUrl=c.defaults.kmlService);var i=this.linkInfo=t&&t.linkInfo;i&&(this.visible=!!i.visibility,this._waitingForMap=!!i.viewFormat),(!i||i&&i.visibility&&!this._waitingForMap)&&this._parseKml(),this.refresh=r.hitch(this,this.refresh),this.registerConnectEvents("esri.layers.KMLLayer",!0)},getFeature:function(e){if(e){var t,i,o,s=e.type,a=e.id;switch(s){case"esriGeometryPoint":case"esriGeometryPolyline":case"esriGeometryPolygon":var l=this["_"+s];l&&(t=r.getObject("_mode._featureMap."+a,!1,l));break;case"GroundOverlay":var h=this._groundLyr;if(h){var d=h.getImages();for(o=d.length,i=0;i<o;i++)if(d[i].id===a){t=d[i];break}}break;case"ScreenOverlay":break;case"NetworkLink":n.some(this._links,function(e){return!(!e.linkInfo||e.linkInfo.id!==a)&&(t=e,!0)});break;case"Folder":var c=this.folders;for(o=c?c.length:0,i=0;i<o;i++)if(c[i].id===a){t=c[i];break}break;default:console.log("KMLLayer:getFeature - unknown feature type")}return t}},getLayers:function(){var e=[];return this._groundLyr&&e.push(this._groundLyr),this._fLayers&&(e=e.concat(this._fLayers)),this._links&&n.forEach(this._links,function(t){t.declaredClass&&e.push(t)}),e},setFolderVisibility:function(e,t){e&&(this._fireUpdateStart(),e.visible=t,t&&(t=this._areLocalAncestorsVisible(e)),this._setState(e,t),this._fireUpdateEnd())},_eventMap:{"network-link-error":["error"]},onRefresh:function(){},onOpacityChange:function(){},onNetworkLinkError:function(){},_parseKml:function(e){var t=this;this._fireUpdateStart(),this._io=u({url:this.serviceUrl,content:{url:this._url.path+this._getQueryParameters(e),model:"simple",folders:"",refresh:!!this.loaded||void 0,outSR:o.toJson(this._outSR.toJson())},callbackParamName:"callback",load:function(e){t._io=null,t._initLayer(e)},error:function(e){t._io=null,e=r.mixin(new Error,e),e.message="Unable to load KML: "+(e.message||""),t._fireUpdateEnd(e),t._errorHandler(e)}})},_initLayer:function(e){var t;this.loaded&&(t=[],n.forEach(this.folders,function(e){e.visible&&t.push(e.id)}),this._options.minScale=this.minScale,this._options.maxScale=this.maxScale,this._options.opacity=this.opacity,this._removeInternalLayers()),this.name=e.name,this.description=e.description,this.snippet=e.snippet,this.visibility=e.visibility,this.featureInfos=e.featureInfos;var i,o,s,a=this.folders=e.folders,l=[];if(a)for(o=a.length,i=0;i<o;i++)s=a[i]=new m(a[i]),-1===s.parentFolderId&&l.push(s);var h,d=this._links=e.networkLinks;for(o=d?d.length:0,i=0;i<o;i++)if(!d[i].viewRefreshMode||-1===d[i].viewRefreshMode.toLowerCase().indexOf("onregion")){h=r.mixin({},this._options),h.linkInfo=d[i],h.id&&(h.id=h.id+"_"+i);var c=d[i]=new w(d[i].href,h);c._parentLayer=this,c._parentFolderId=this._getLinkParentId(c.linkInfo.id),c._linkErrorHandle=c.on("error,network-link-error",r.hitch(c,function(e){this._parentLayer.onNetworkLinkError(e.error)}))}var f=e.groundOverlays;if(f&&f.length>0){h=r.mixin({},this._options),h.id&&(h.id=h.id+"_mapImage");var u=this._groundLyr=new k(h);for(o=f.length,i=0;i<o;i++)u.addImage(new b(f[i]))}var p=r.getObject("featureCollection.layers",!1,e);if(p&&p.length>0&&(this._fLayers=[],n.forEach(p,function(e,t){var i,n=r.getObject("featureSet.features",!1,e);n&&n.length>0&&(h=r.mixin({outFields:["*"],infoTemplate:e.popupInfo?new y(e.popupInfo):null,editable:!1},this._options),h.id&&(h.id=h.id+"_"+t),h.webgl=!1,e.layerDefinition.capabilities="Query,Data",i=new L(e,h),i.geometryType&&(this["_"+i.geometryType]=i),this._fLayers.push(i))},this),0===this._fLayers.length&&delete this._fLayers),!this.loaded)for(o=l.length,i=0;i<o;i++)s=l[i],this._setState(s,s.visible);this._fireUpdateEnd(),this.loaded?(this._addInternalLayers(),n.forEach(this.folders,function(e){n.indexOf(t,e.id)>-1?this.setFolderVisibility(e,!0):this.setFolderVisibility(e,!1)},this),this.onRefresh()):(this.loaded=!0,this.onLoad(this))},_addInternalLayers:function(){var e=this._map;this._fireUpdateStart(),this._links&&n.forEach(this._links,function(t){t.declaredClass&&(e.addLayer(t),t._waitingForMap&&(t._waitingForMap=null,t.visible?t._parseKml(e):t._wMap=e))});var t,i=e.spatialReference,r=this._outSR;if(!i.equals(r))if(i.isWebMercator()&&4326===r.wkid)t=g.geographicToWebMercator;else{if(!r.isWebMercator()||4326!==i.wkid)return void console.log("KMLLayer:_setMap - unsupported workflow. Spatial reference of the map and kml layer do not match, and the conversion cannot be done on the client.");t=g.webMercatorToGeographic}this._groundLyr&&(t&&n.forEach(this._groundLyr.getImages(),function(e){e.extent=t(e.extent)}),e.addLayer(this._groundLyr));var o=this._fLayers;o&&o.length>0&&n.forEach(o,function(i){if(t){var r,n,o=i.graphics,s=o?o.length:0;for(r=0;r<s;r++)(n=o[r].geometry)&&o[r].setGeometry(t(n))}e.addLayer(i)}),this.onVisibilityChange(this.visible)},_removeInternalLayers:function(){var e=this._map;this._links&&n.forEach(this._links,function(e){e.declaredClass&&e._io&&e._io.cancel(),e._linkErrorHandle&&(e._linkErrorHandle.remove(),e._linkErrorHandle=null)}),e&&n.forEach(this.getLayers(),e.removeLayer,e)},_setState:function(e,t){var i,r,n,o=e.featureInfos,s=o?o.length:0,a=t?"show":"hide";for(n=0;n<s;n++)i=o[n],(r=this.getFeature(i))&&("Folder"===i.type?this._setState(r,t&&r.visible):"NetworkLink"===i.type?this._setInternalVisibility(r,t):r[a]())},_areLocalAncestorsVisible:function(e){for(var t=e.parentFolderId,i=e.visible;i&&-1!==t;){var r=this.getFeature({type:"Folder",id:t});i=i&&r.visible,t=r.parentFolderId}return i},_setInternalVisibility:function(e,t){var i=e._parentLayer,r=e._parentFolderId;for(t=t&&e.visible;t&&i;)t=t&&i.visible,r>-1&&(t=t&&i._areLocalAncestorsVisible(i.getFeature({type:"Folder",id:r}))),r=i._parentFolderId,i=i._parentLayer;this._setIntState(e,t)},_setIntState:function(e,t){e&&n.forEach(e.getLayers(),function(i){i.linkInfo?e._setIntState(i,t&&i.visible&&e._areLocalAncestorsVisible(e.getFeature({type:"Folder",id:i._parentFolderId}))):i.setVisibility(t)})},_getLinkParentId:function(e){var t=-1;return this.folders&&n.some(this.folders,function(i){return!(!i.networkLinkIds||-1===n.indexOf(i.networkLinkIds,e))&&(t=i.id,!0)}),t},_checkAutoRefresh:function(){var e=this.linkInfo;if(e)if(this.visible){if(this.loaded&&this._map){var t=e.refreshMode,r=e.refreshInterval,n=e.viewRefreshMode,o=e.viewRefreshTime;t&&-1!==t.toLowerCase().indexOf("oninterval")&&r>0&&(this._stopAutoRefresh(),this._timeoutHandle=setTimeout(this.refresh,1e3*r)),n&&-1!==n.toLowerCase().indexOf("onstop")&&o>0&&(this._extChgHandle||(this._extChgHandle=i.connect(this._map,"onExtentChange",this,this._extentChanged)))}}else this._stopAutoRefresh(),i.disconnect(this._extChgHandle),delete this._extChgHandle},_stopAutoRefresh:function(){clearTimeout(this._timeoutHandle),this._timeoutHandle=null},_getQueryParameters:function(t){t=t||this._map;var i,n={},o=this.linkInfo,s=t&&t.extent;if(this._url.query&&(r.mixin(n,this._url.query),i=!!this._url.query.token),d.id&&!i){var l=d.id.findCredential(this._url.path);l&&(n.token=l.token)}if(o){var h=o.viewFormat,c=o.httpQuery,u=o.viewBoundScale;if(s&&h){var p=s,_=s,y=s.spatialReference;y&&(y.isWebMercator()?p=g.webMercatorToGeographic(s):4326===y.wkid&&(_=g.geographicToWebMercator(s)));var v=p.getCenter(),m=Math.max(_.getWidth(),_.getHeight());u&&(p=p.expand(u)),h=h.replace(/\[bboxWest\]/gi,p.xmin).replace(/\[bboxEast\]/gi,p.xmax).replace(/\[bboxSouth\]/gi,p.ymin).replace(/\[bboxNorth\]/gi,p.ymax).replace(/\[lookatLon\]/gi,v.x).replace(/\[lookatLat\]/gi,v.y).replace(/\[lookatRange\]/gi,m).replace(/\[lookatTilt\]/gi,0).replace(/\[lookatHeading\]/gi,0).replace(/\[lookatTerrainLon\]/gi,v.x).replace(/\[lookatTerrainLat\]/gi,v.y).replace(/\[lookatTerrainAlt\]/gi,0).replace(/\[cameraLon\]/gi,v.x).replace(/\[cameraLat\]/gi,v.y).replace(/\[cameraAlt\]/gi,m).replace(/\[horizFov\]/gi,60).replace(/\[vertFov\]/gi,60).replace(/\[horizPixels\]/gi,t.width).replace(/\[vertPixels\]/gi,t.height).replace(/\[terrainEnabled\]/gi,0),r.mixin(n,a.queryToObject(h))}c&&(c=c.replace(/\[clientVersion\]/gi,d.version).replace(/\[kmlVersion\]/gi,2.2).replace(/\[clientName\]/gi,"ArcGIS API for JavaScript").replace(/\[language\]/gi,e.locale),r.mixin(n,a.queryToObject(c)))}var b,k=[];for(b in n)f.isDefined(n[b])&&k.push(b+"="+n[b]);return k=k.join("&"),k?"?"+k:""},setScaleRange:function(e,t){this.inherited(arguments),n.forEach(this.getLayers(),function(i){i.setScaleRange(e,t)})},setOpacity:function(e){this.opacity!=e&&(n.forEach(this.getLayers(),function(t){t.setOpacity(e)}),this.opacity=e,this.onOpacityChange(e))},_setMap:function(e,t){this.inherited(arguments),this._map=e;var i=this._div=l.create("div",null,t);return h.set(i,"position","absolute"),this._addInternalLayers(),this.evaluateSuspension(),i},_unsetMap:function(e,t){this._io&&this._io.cancel(),this._stopAutoRefresh(),i.disconnect(this._extChgHandle),delete this._extChgHandle,this._removeInternalLayers();var r=this._div;r&&(t.removeChild(r),l.destroy(r)),this._wMap=this._div=null,this.inherited(arguments)},onVisibilityChange:function(e){if(!this.loaded)return void(this.linkInfo&&e&&(this._waitingForMap||this._parseKml(this._wMap)));this._fireUpdateStart(),this._setInternalVisibility(this,e),this._checkAutoRefresh(),this._fireUpdateEnd()},refresh:function(){this.loaded&&this._map&&!this._io&&this.visible&&this._parseKml()},getFeatureCollection:function(e){var t,i=[],r=this.getFeature({type:"Folder",id:e});return r&&(t=n.map(r.featureInfos,function(e){if("esriGeometryPoint"===e.type||"esriGeometryPolyline"===e.type||"esriGeometryPolygon"===e.type)return e.id},this))&&t.length>0&&n.forEach(this._fLayers,function(e){var r,o;r=e.toJson(),r.featureSet.features&&r.featureSet.features.length>0&&(o=n.filter(r.featureSet.features,function(i){if(-1!==n.indexOf(t,i.attributes[e.objectIdField]))return i},this)),o&&o.length>0&&(r.featureSet.features=o,i.push(r))},this),i},getFeatureCount:function(e){var t=this.getFeature({type:"Folder",id:e}),i={points:0,polylines:0,polygons:0};return t&&n.forEach(t.featureInfos,function(e){"esriGeometryPoint"===e.type&&(i.points+=1),"esriGeometryPolyline"===e.type&&(i.polylines+=1),"esriGeometryPolygon"===e.type&&(i.polygons+=1)}),i},_extentChanged:function(){this._stopAutoRefresh(),this._timeoutHandle=setTimeout(this.refresh,1e3*this.linkInfo.viewRefreshTime)}});return s("extend-esri")&&r.setObject("layers.KMLLayer",w,d),w});