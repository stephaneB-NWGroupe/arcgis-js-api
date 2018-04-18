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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/url","dojo/sniff","dojo/string","../config","../kernel","../request","../urlUtils","../SpatialReference","../geometry/Extent","./TiledMapServiceLayer","./TileInfo"],function(e,l,t,s,i,r,o,a,n,u,c,h,v,f){function m(e,t){var s,i,r=[];if(e&&t&&(t.customLayerParameters||t.customParameters)){s=l.clone(t.customParameters||{}),l.mixin(s,t.customLayerParameters||{}),i=u.urlToObject(e);for(var o in i.query)s.hasOwnProperty(o)||r.push(o+"="+i.query[o]);e=i.path+(r.length?"?"+r.join("&"):"")}return e}var d=e(v,{declaredClass:"esri.layers.WebTiledLayer",constructor:function(e,a){a||(a={}),e=m(e,a.wmtsInfo),this.urlTemplate=e;var v=new h(-20037508.342787,-20037508.34278,20037508.34278,20037508.342787,new c({wkid:102100})),d=new h(-20037508.342787,-20037508.34278,20037508.34278,20037508.342787,new c({wkid:102100}));if(this.initialExtent=a.initialExtent||v,this.fullExtent=a.fullExtent||d,a.tileInfo)this.tileInfo=a.tileInfo;else{var y=[{level:0,resolution:156543.033928,scale:591657527.591555},{level:1,resolution:78271.5169639999,scale:295828763.795777},{level:2,resolution:39135.7584820001,scale:147914381.897889},{level:3,resolution:19567.8792409999,scale:73957190.948944},{level:4,resolution:9783.93962049996,scale:36978595.474472},{level:5,resolution:4891.96981024998,scale:18489297.737236},{level:6,resolution:2445.98490512499,scale:9244648.868618},{level:7,resolution:1222.99245256249,scale:4622324.434309},{level:8,resolution:611.49622628138,scale:2311162.217155},{level:9,resolution:305.748113140558,scale:1155581.108577},{level:10,resolution:152.874056570411,scale:577790.554289},{level:11,resolution:76.4370282850732,scale:288895.277144},{level:12,resolution:38.2185141425366,scale:144447.638572},{level:13,resolution:19.1092570712683,scale:72223.819286},{level:14,resolution:9.55462853563415,scale:36111.909643},{level:15,resolution:4.77731426794937,scale:18055.954822},{level:16,resolution:2.38865713397468,scale:9027.977411},{level:17,resolution:1.19432856685505,scale:4513.988705},{level:18,resolution:.597164283559817,scale:2256.994353},{level:19,resolution:.298582141647617,scale:1128.497176},{level:20,resolution:.14929107082380833,scale:564.248588},{level:21,resolution:.07464553541190416,scale:282.124294},{level:22,resolution:.03732276770595208,scale:141.062147},{level:23,resolution:.01866138385297604,scale:70.5310735}],p=new f({dpi:96,rows:256,cols:256,origin:{x:-20037508.342787,y:20037508.342787},spatialReference:{wkid:102100},lods:y});this.tileInfo=p}this.spatialReference=new c(this.tileInfo.spatialReference.toJson()),this.copyright=a.copyright||"";var w=new s(e),b=w.scheme+"://"+w.authority+"/";if(this.urlPath=e.substring(b.length),this.tileServers=a.tileServers||[],-1===w.authority.indexOf("{subDomain}")&&this.tileServers.push(b),a.subDomains&&a.subDomains.length>0&&w.authority.split(".").length>1){this.subDomains=a.subDomains;var g;t.forEach(a.subDomains,function(e){w.authority.indexOf("${subDomain}")>-1?g=w.scheme+"://"+r.substitute(w.authority,{subDomain:e})+"/":w.authority.indexOf("{subDomain}")>-1&&(g=w.scheme+"://"+w.authority.replace(/\{subDomain\}/gi,e)+"/"),this.tileServers.push(g)},this)}this.tileServers=t.map(this.tileServers,function(e){return"/"!==e.charAt(e.length-1)&&(e+="/"),e}),this._levelToLevelValue=[];var I=0;t.forEach(this.tileInfo.lods,function(e,l){this._levelToLevelValue[e.level]=e.levelValue||e.level,0===l&&(I=this._levelToLevelValue[e.level])},this),this._wmtsInfo=a.wmtsInfo;var _=l.hitch(this,function(){this.loaded=!0,this.onLoad(this)});if(i("chrome")){var L=this.getTileUrl(I,0,0),x=o.defaults.io,P="with-credentials"===x.useCors?u.canUseXhr(L,!0):-1,T=P>-1?x.corsEnabledServers[P]:null;T&&T.withCredentials?n({url:L,handleAs:"arraybuffer"}).addBoth(function(){_()}):_()}else _()},getTileUrl:function(e,l,t){e=this._levelToLevelValue[e];var s=this.tileServers[l%this.tileServers.length]+r.substitute(this.urlPath,{level:e,col:t,row:l});return s=s.replace(/\{level\}/gi,e).replace(/\{row\}/gi,l).replace(/\{col\}/gi,t),s=this._appendCustomLayerParameters(s),s=this.addTimestampToURL(s),u.addProxy(s)},_appendCustomLayerParameters:function(e){var t,s;if(this._wmtsInfo&&(this._wmtsInfo.customLayerParameters||this._wmtsInfo.customParameters)){s=l.clone(this._wmtsInfo.customParameters||{}),l.mixin(s,this._wmtsInfo.customLayerParameters||{});for(t in s)e+=(-1===e.indexOf("?")?"?":"&")+t+"="+encodeURIComponent(s[t])}return e}});return i("extend-esri")&&l.setObject("layers.WebTiledLayer",d,a),d});