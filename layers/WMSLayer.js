// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/3.34/esri/copyright.txt for details.

define(["require","dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/sniff","../config","../graphic","../kernel","../request","../urlUtils","../dijit/PopupTemplate","../SpatialReference","../geometry/Extent","../geometry/Point","./DynamicMapServiceLayer","./WMSLayerInfo","dojo/query"],(function(e,t,i,s,r,a,n,h,o,l,u,g,f,c,m,p,_){var y=i([p],{declaredClass:"esri.layers.WMSLayer",_CRS_TO_EPSG:{84:4326,83:4269,27:4267},_REVERSED_LAT_LONG_RANGES:[[4001,4999],[2044,2045],[2081,2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3058,3059],[3068,3068],[3114,3118],[3126,3138],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3416,3416],[20004,20032],[20064,20092],[21413,21423],[21473,21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,27492],[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,31259],[31275,31279],[31281,31290],[31466,31700]],_WEB_MERCATOR:[102100,3857,102113,900913],_WORLD_MERCATOR:[3395,54004],allExtents:[],version:null,constructor:function(t,i){var r=u.urlToObject(t);r.query&&(r.query.version||r.query.Version||r.query.VERSION)&&(this.version=r.query.version||r.query.Version||r.query.VERSION),t=this._stripParameters(t,["version","service","request","bbox","format","height","width","layers","srs","crs","styles","transparent","bgcolor","exceptions","time","elevation","sld","wfs"]),this.url=t,this._url=u.urlToObject(t),this._getCapabilitiesURL=t,this._initLayer=s.hitch(this,this._initLayer),this._parseCapabilities=s.hitch(this,this._parseCapabilities),this._getCapabilitiesError=s.hitch(this,this._getCapabilitiesError),i?(this.customParameters=i.customParameters,this.customLayerParameters=i.customLayerParameters,this.imageFormat=this._getImageFormat(i.format),this.imageTransparency=!1!==i.transparent,this.visibleLayers=i.visibleLayers?i.visibleLayers:[],this.version=i.version||this.version,i.resourceInfo?this._readResourceInfo(i.resourceInfo):this._getCapabilities()):(this.imageFormat="image/png",this.imageTransparency=!0,this.visibleLayers=[],this._getCapabilities()),this._blankImageURL=e.toUrl("../images/pixel.png"),this.extentProcessor=this._createExtentProcessor(0),this._createChildLayer()},setVisibleLayers:function(e){e=this._checkVisibleLayersList(e),this.visibleLayers=e||[],this.refresh(!0)},setImageFormat:function(e){this.imageFormat=this._getImageFormat(e),this.refresh(!0)},setImageTransparency:function(e){this.imageTransparency=e,this.refresh(!0)},setCustomParameters:function(e,t){this.customParameters=e,this.customLayerParameters=t,this.refresh(!0)},refresh:function(){this._refreshTS=Date.now(),this.inherited(arguments),this._childLayer&&this._childLayer.refresh.apply(this._childLayer,arguments)},getImageUrl:function(e,t,i,s){if(this.visibleLayers&&0!==this.visibleLayers.length){var r=this._getImageParams(e,t,i);r=this._mixinCustomLayerParameters(r);var a,n=this.getMapURL;for(a in n+=-1===n.indexOf("?")?"?":"",r)r.hasOwnProperty(a)&&(n+="?"===n.substring(n.length-1,n.length)?"":"&",n+=a+"="+r[a]);n=this.addTimestampToURL(n),s(u.addProxy(n))}else s(this._blankImageURL)},_setMap:function(e,t,i){var s=this.inherited(arguments);return e.wrapAround180?this._childLayer&&(this.suspended&&this._childLayer.suspend(),this._childLayer._setMap(e,s)):(this.extentProcessor=null,this._childLayer=null),s},_unsetMap:function(e,t){this._childLayer&&this._childLayer._unsetMap(e,this._div),this.inherited(arguments)},onSuspend:function(){this.inherited(arguments),this._childLayer&&this._childLayer.suspend()},onResume:function(){this.inherited(arguments),this._childLayer&&this._childLayer.resume()},_createChildLayer:function(){this._childLayer=new p(null,{extentProcessor:this._createExtentProcessor(1)}),this._childLayer._isChildLayer=!0,this._childLayer.getImageUrl=s.hitch(this,this.getImageUrl),this._childLayer.loaded=!0},_createExtentProcessor:function(e){return s.hitch(this,this._extentProcessor,e)},_extentProcessor:function(e,t){var i=t.extent,s=t.width,r=0;if(i){var a=i.getWidth()/s,n=i.bisect(),h=n.extents,o=h[e];if(o){var l=n.marginLeft/a;r=0===e?l:l+h[0].getWidth()/a,s=Math.ceil(o.getWidth()/a),r=Math.ceil(r)}i=o}return{extent:i,width:s,marginLeft:r}},_getImageParams:function(e,t,i){var s=e.spatialReference.wkid;if(-1===r.indexOf(this.spatialReferences,s)&&e.spatialReference.latestWkid&&(s=e.spatialReference.latestWkid),r.some(this._WEB_MERCATOR,(function(e){return e==s}))){var a=r.filter(this.spatialReferences,(function(e){return r.some(this._WEB_MERCATOR,(function(t){return t==e}))}),this);0===a.length&&(a=r.filter(this.spatialReferences,(function(e){return r.some(this._WORLD_MERCATOR,(function(t){return t==e}))}),this)),s=a.length>0?a[0]:this._WEB_MERCATOR[1]}var n=r.filter(this.spatialReferences,(function(e){return e!==s}));this.spatialReferences=n,this.spatialReferences.unshift(s);var h=e.xmin,o=e.xmax,l=e.ymin,u=e.ymax,g={SERVICE:"WMS",REQUEST:"GetMap"};g.FORMAT=this.imageFormat,g.TRANSPARENT=this.imageTransparency?"TRUE":"FALSE",g.STYLES="",g.VERSION=this.version,g.LAYERS=this.visibleLayers?this.visibleLayers.toString():null,g.WIDTH=t,g.HEIGHT=i,this.maxWidth<t&&(g.WIDTH=this.maxWidth),this.maxHeight<i&&(g.HEIGHT=this.maxHeight);var f=s||NaN;return isNaN(f)||("1.3.0"==this.version?g.CRS="EPSG:"+f:g.SRS="EPSG:"+f),"1.3.0"==this.version&&this._useLatLong(f)?g.BBOX=l+","+h+","+u+","+o:g.BBOX=h+","+l+","+o+","+u,g},_initLayer:function(e,t){this.spatialReference=new f(this.extent.spatialReference),this.initialExtent=new c(this.extent),this.fullExtent=new c(this.extent),this.visibleLayers=this._checkVisibleLayersList(this.visibleLayers);var i=s.hitch(this,(function(){this.loaded=!0,this.onLoad(this);var e=this._loadCallback;e&&(delete this._loadCallback,e(this))}));if(a("chrome")){var r=n.defaults.io,h="with-credentials"===r.useCors?u.canUseXhr(this.getMapURL,!0):-1,o=h>-1?r.corsEnabledServers[h]:null;o&&o.withCredentials?l({url:this.getMapURL,handleAs:"text",content:{SERVICE:"WMS",REQUEST:"GetMap"}}).addBoth((function(){i()})):i()}else i()},_readResourceInfo:function(e){e.extent?e.layerInfos?(this.extent=e.extent,this.allExtents[0]=e.extent,this.layerInfos=e.layerInfos,this.description=e.description?e.description:"",this.copyright=e.copyright?e.copyright:"",this.title=e.title?e.title:"",this.getMapURL=e.getMapURL?e.getMapURL:this._getCapabilitiesURL,this.getFeatureInfoURL=e.getFeatureInfoURL,this.featureInfoFormat=e.featureInfoFormat,this.version=e.version?e.version:"1.3.0",this.maxWidth=e.maxWidth?e.maxWidth:5e3,this.maxHeight=e.maxHeight?e.maxHeight:5e3,this.spatialReferences=e.spatialReferences?e.spatialReferences:[],this.imageFormat=this._getImageFormat(e.format),this.setScaleRange(e.minScale,e.maxScale),this.customLayerParameters=e.customLayerParameters||this.customLayerParameters,this.customParameters=e.customParameters||this.customParameters,this._initLayer()):this._errorHandler(new Error("esri.layers.WMSLayer: unable to find the 'layerInfos' property in resourceInfo")):this._errorHandler(new Error("esri.layers.WMSLayer: Unable to find the 'extent' property in resourceInfo."))},_getCapabilities:function(e){var t=this._url.query?this._url.query:{};t.SERVICE="WMS",t.REQUEST="GetCapabilities",this.version&&(t.VERSION=this.version),t=this._mixinCustomParameters(t);var i,s=this._url.path+"?";for(i in t)t.hasOwnProperty(i)&&(s+="?"==s.substring(s.length-1,s.length)?"":"&",s+=i+"="+t[i]);l({url:s,handleAs:e||"xml",headers:{"Content-Type":null},load:this._parseCapabilities,error:this._getCapabilitiesError},{usePost:!1})},_parseCapabilities:function(e,i){var s;if(e){if("text"===i.handleAs){try{var a=new DOMParser;s=a.parseFromString(e,"application/xml")}catch(e){}s&&!s.getElementsByTagName("parsererror").length||this._errorHandler(new Error("GetCapabilities request for "+this._getCapabilitiesURL+" failed. (XML Parse error.)"))}else s=e;var n=this;this.version=this._getAttributeValue("WMS_Capabilities","version",s,null),this.version||(this.version=this._getAttributeValue("WMT_MS_Capabilities","version",s,"1.3.0"));var h=this._getTag("Service",s);this.title=this._getTagValue("Title",h,""),this.title||(this.title=this._getTagValue("Name",h,"")),this.copyright=this._getTagValue("AccessConstraints",h,""),this.description=this._getTagValue("Abstract",h,""),this.maxWidth=parseInt(this._getTagValue("MaxWidth",h,5e3),10),this.maxHeight=parseInt(this._getTagValue("MaxHeight",h,5e3),10);var o=this._getTag("Layer",s);if(o){var l=this._getLayerInfo(o),u=0,g=null,f=this._getTag("Capability",s);if(r.forEach(f.childNodes,(function(e){"Layer"==e.nodeName&&(0===u?g=e:1===u?(l.name&&(l.name="",l.subLayers=[],l.subLayers.push(this._getLayerInfo(g))),l.subLayers.push(this._getLayerInfo(e))):l.subLayers.push(this._getLayerInfo(e)),u++)}),this),l&&(this.layerInfos=l.subLayers,this.layerInfos&&0!==this.layerInfos.length||(this.layerInfos=[l]),this.extent=l.extent,this.extent||(l.extent=new c(this.layerInfos[0].extent.toJson()),this.extent=l.extent),this.allExtents=l.allExtents,this.allExtents&&this.allExtents.length||(l.allExtents=[],r.forEach(this.layerInfos[0].allExtents,(function(e,t){e&&(l.allExtents[t]=new c(e.toJson()))})),this.allExtents=l.allExtents),this.spatialReferences=l.spatialReferences,!this.spatialReferences.length&&this.layerInfos.length>0)){var m,p=function(e){var t;for(t=0;t<e.subLayers.length;t++){var i=e.subLayers[t],s=i.spatialReferences;if(!s.length&&i.subLayers&&i.subLayers.length>0&&(s=p(i)),s.length)return s}return[]};for(m=0;m<this.layerInfos.length;m++){var _=this.layerInfos[m];if(this.spatialReferences=this.layerInfos[0].spatialReferences,!this.spatialReferences.length&&_.subLayers&&_.subLayers.length>0&&(this.spatialReferences=p(_)),this.spatialReferences.length)break}}var y=function(e){var i=t.query("DCPType",n._getTag(e,s));if(i&&i.length>0){var r=t.query("HTTP",i[0]);if(r&&r.length>0){var a=t.query("Get",r[0]);if(a&&a.length>0){var h=n._getAttributeValue("OnlineResource","xlink:href",a[0],null);if(h)return h.indexOf("&")===h.length-1&&(h=h.substring(0,h.length-1)),n._stripParameters(h,["service","request"])}}}return null},d=function(e){var i=[];return 0===t.query("Operation",s).length?r.forEach(t.query("Format",n._getTag(e,s)),(function(e){i.push(e.text?e.text:e.textContent)})):(r.forEach(t.query("Operation",s),(function(s){s.getAttribute("name")===e&&r.forEach(t.query("Format",s),(function(e){i.push(e.text?e.text:e.textContent)}))})),i.length||r.forEach(t.query("Format",n._getTag(e,s)),(function(e){i.push(e.text?e.text:e.textContent)}))),i};if(this.getMapURL=y("GetMap")||this._getCapabilitiesURL,this.getMapFormats=d("GetMap"),this.getMapFormats.length&&(r.some(this.getMapFormats,(function(e){return e.indexOf(this.imageFormat)>-1}),this)||(this.imageFormat=this.getMapFormats[0])),this.getFeatureInfoURL=y("GetFeatureInfo"),this.getFeatureInfoURL&&(this.getFeatureInfoFormats=d("GetFeatureInfo"),r.indexOf(this.getFeatureInfoFormats,"text/html")>-1?this.featureInfoFormat="text/html":r.indexOf(this.getFeatureInfoFormats,"text/plain")>-1&&(this.featureInfoFormat="text/plain")),!this.featureInfoFormat){var x=function(e){if(e&&(e.queryable=!1,e.subLayers))for(var t=0;t<e.subLayers.length;t++)x(e.subLayers[t])};x(l)}this._initLayer()}else this._errorHandler(new Error("esri.layers.WMSLayer: Response does not contain any layers."))}else"xml"===i.handleAs?this._getCapabilities("text"):this._errorHandler(new Error("GetCapabilities request for "+this._getCapabilitiesURL+" failed. (Response is null.)"))},_getCapabilitiesError:function(e){e&&e.message&&(e.message="GetCapabilities request for "+this._getCapabilitiesURL+" failed. ("+e.message+")"),this._errorHandler(e)},_getLayerInfo:function(e){if(!e)return null;var t=new _;t.name="",t.title="",t.description="",t.allExtents=[],t.spatialReferences=[],t.queryable="1"===e.getAttribute("queryable"),t.subLayers=[];var i=this._getTag("LatLonBoundingBox",e);i&&(t.allExtents[0]=this._getExtent(i,4326));var s,a=this._getTag("EX_GeographicBoundingBox",e);a&&((s=new c(0,0,0,0,new f({wkid:4326}))).xmin=parseFloat(this._getTagValue("westBoundLongitude",a,0)),s.ymin=parseFloat(this._getTagValue("southBoundLatitude",a,0)),s.xmax=parseFloat(this._getTagValue("eastBoundLongitude",a,0)),s.ymax=parseFloat(this._getTagValue("northBoundLatitude",a,0)),t.allExtents[0]=s),i||a||(s=new c(-180,-90,180,90,new f({wkid:4326})),t.allExtents[0]=s),t.extent=t.allExtents[0];var n=r.indexOf(["1.0.0","1.1.0","1.1.1"],this.version)>-1?"SRS":"CRS";return r.forEach(e.childNodes,(function(e){if("Name"==e.nodeName)t.name=(e.text?e.text:e.textContent)||"";else if("Title"==e.nodeName)t.title=(e.text?e.text:e.textContent)||"";else if("Abstract"==e.nodeName)t.description=(e.text?e.text:e.textContent)||"";else if("BoundingBox"==e.nodeName){var i,s,a=e.getAttribute(n);if(a&&0===a.indexOf("EPSG:")){if(0!==(i=parseInt(a.substring(5),10))&&!isNaN(i))s="1.3.0"==this.version?this._getExtent(e,i,this._useLatLong(i)):this._getExtent(e,i),t.allExtents[i]=s,t.extent||(t.extent=s)}else a&&0===a.indexOf("CRS:")?0===(i=parseInt(a.substring(4),10))||isNaN(i)||(this._CRS_TO_EPSG[i]&&(i=this._CRS_TO_EPSG[i]),t.allExtents[i]=this._getExtent(e,i)):0===(i=parseInt(a,10))||isNaN(i)||(t.allExtents[i]=this._getExtent(e,i))}else if(e.nodeName==n){var h=(e.text?e.text:e.textContent).split(" ");r.forEach(h,(function(e){0===(e=e.indexOf(":")>-1?parseInt(e.split(":")[1],10):parseInt(e,10))||isNaN(e)||(this._CRS_TO_EPSG[e]&&(e=this._CRS_TO_EPSG[e]),-1==r.indexOf(t.spatialReferences,e)&&t.spatialReferences.push(e))}),this)}else if("Style"!=e.nodeName||t.legendURL)"Layer"===e.nodeName&&t.subLayers.push(this._getLayerInfo(e));else{var o=this._getTag("LegendURL",e);if(o){var l=this._getTag("OnlineResource",o);l&&(t.legendURL=l.getAttribute("xlink:href"))}}}),this),t.title=t.title||t.name,t},_getImageFormat:function(e){switch(e?e.toLowerCase():""){case"jpg":return"image/jpeg";case"bmp":return"image/bmp";case"gif":return"image/gif";case"svg":return"image/svg+xml";default:return"image/png"}},getImageFormat:function(){switch(this.imageFormat?this.imageFormat.toLowerCase():""){case"image/jpeg":return"jpg";case"image/bmp":return"bmp";case"image/gif":return"gif";case"image/svg+xml":return"svg";default:return"png"}},_getExtent:function(e,t,i){var s;if(e){s=new c;var r=parseFloat(e.getAttribute("minx")),a=parseFloat(e.getAttribute("miny")),n=parseFloat(e.getAttribute("maxx")),h=parseFloat(e.getAttribute("maxy"));i?(s.xmin=isNaN(a)?-1*Number.MAX_VALUE:a,s.ymin=isNaN(r)?-1*Number.MAX_VALUE:r,s.xmax=isNaN(h)?Number.MAX_VALUE:h,s.ymax=isNaN(n)?Number.MAX_VALUE:n):(s.xmin=isNaN(r)?-1*Number.MAX_VALUE:r,s.ymin=isNaN(a)?-1*Number.MAX_VALUE:a,s.xmax=isNaN(n)?Number.MAX_VALUE:n,s.ymax=isNaN(h)?Number.MAX_VALUE:h),s.spatialReference=new f({wkid:t})}return s},_useLatLong:function(e){var t,i;for(i=0;i<this._REVERSED_LAT_LONG_RANGES.length;i++){var s=this._REVERSED_LAT_LONG_RANGES[i];if(e>=s[0]&&e<=s[1]){t=!0;break}}return t},_getTag:function(e,i){var s=t.query(e,i);return s&&s.length>0?s[0]:null},_getTagValue:function(e,i,s){var r=t.query(e,i);return r&&r.length>0?r[0].text?r[0].text:r[0].textContent:s},_getAttributeValue:function(e,i,s,r){var a=t.query(e,s);return a&&a.length>0?a[0].getAttribute(i):r},_checkVisibleLayersList:function(e){if(e&&e.length>0&&this.layerInfos&&this.layerInfos.length>0&&"number"==typeof e[0]){var t=[];r.forEach(e,(function(e){e<this.layerInfos.length&&t.push(this.layerInfos[e].name)}),this),e=t}return e},_stripParameters:function(e,t){var i,s=u.urlToObject(e),a=[];for(i in s.query)s.query.hasOwnProperty(i)&&-1===r.indexOf(t,i.toLowerCase())&&a.push(i+"="+s.query[i]);return s.path+(a.length?"?"+a.join("&"):"")},_getPopupGraphic:function(t,i){var s=this.visibleLayers;if(!s||0===s.length)return null;var a=this._popupGraphic;if(!a){var n=new g({title:this.title||"",description:'<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;"><iframe src="{QUERY_URL}" width="250" height="147" frameborder="0" marginwidth="0" marginheight="0" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;background:url(\''+e.toUrl("../dijit/images/loading-throb.gif")+"') transparent center no-repeat;\" onload=\"(event.target || event.srcElement).style.background = 'none';\"></iframe></div>"});(a=this._popupGraphic=new h(null,null,{},n))._layer=this}var o=function(e){var t=[];if(e&&(e.queryable&&e.showPopup&&e.name&&t.push(e.name),e.subLayers))for(var i=0;i<e.subLayers.length;i++){var s=o(e.subLayers[i]);s.length&&(t=t.concat(s))}return t},l=o({subLayers:this.layerInfos});if((l=r.filter(l,(function(e){return r.indexOf(s,e)>-1}))).length){var u=this.getFeatureInfoURL,f=this._getImageParams(t.extent,t.width,t.height);for(var c in(f=this._mixinCustomLayerParameters(f)).REQUEST="GetFeatureInfo",f.INFO_FORMAT=this.featureInfoFormat,f.QUERY_LAYERS=l.join(),f.FEATURE_COUNT=25,"1.3.0"===this.version?(f.I=Math.round(i.x),f.J=Math.round(i.y)):(f.X=Math.round(i.x),f.Y=Math.round(i.y)),u+=-1===u.indexOf("?")?"?":"",f)f.hasOwnProperty(c)&&(u+="?"===u.substring(u.length-1,u.length)?"":"&",u+=c+"="+f[c]);return a.attributes.QUERY_URL=u,a}return null},_mixinCustomParameters:function(e){if(this.customParameters)for(var t in this.customParameters)e[t]=encodeURIComponent(this.customParameters[t]);return e},_mixinCustomLayerParameters:function(e){if(this.customLayerParameters||this.customParameters){var t=s.clone(this.customParameters||{});for(var i in s.mixin(t,this.customLayerParameters||{}),t)"styles"===i.toLowerCase()&&delete e.STYLES,e[i]=encodeURIComponent(t[i])}return e}});return a("extend-esri")&&s.setObject("layers.WMSLayer",y,o),y}));