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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/array","dojo/_base/config","dojo/_base/json","dojo/sniff","dojo/DeferredList","dojo/when","../../../kernel","../../../Evented","../../../request","../../../geometry/Extent","../../../geometry/Point","../../../SpatialReference","../../../deferredUtils","../../../urlUtils","../../MosaicRule","../../ImageServiceParameters","../../PixelBlock","../../rasterFormats/rasterCodec","../tile/RasterHandler","./rasterProjectionHelper","./RasterInfo"],(function(e,t,r,n,i,o,s,l,a,c,h,d,f,u,p,v,_,j,x,w,I,g,y,m,R){return t([d],{url:null,dataType:null,rasterInfo:null,tileInfo:null,serviceInfo:null,loaded:null,constructor:function(e){if(e){var t=e.url;if(t){var r=j.urlToObject(t);this.url=r.path,this._query=r.query}this.dataType=e.dataType,this.serviceInfo=e.serviceInfo,this.rasterInfo=e.rasterInfo,this.tileInfo=e.tileInfo,this.serviceInfo=e.serviceInfo}},open:function(){},read:function(e){},identify:function(e){var t,i=new n,o=this.rasterInfo.extent;return m.requirePE(o.spatialReference,e.spatialReference)?m.load().then(r.hitch(this,(function(){t=m.project(e,o.spatialReference),i.resolve(t)})),(function(){i.reject(new Error("cannot project into this spatial reference"))})):(t=m.project(e,o.spatialReference),i.resolve(t)),i.then(r.hitch(this,(function(e){var t=this.tileInfo,r=t.origin,n=t.lods[t.lods.length-1],i=(e.x-r.x)/t.cols/n.resolution,s=(r.y-e.y)/t.rows/n.resolution,l=Math.round((i-Math.floor(i))*t.cols),a=Math.round((s-Math.floor(s))*t.rows)*t.cols+l,c=new u(r.x+n.resolution*t.cols*i,r.y-n.resolution*t.rows*(s+1),r.x+n.resolution*t.cols*(i+1),r.y-n.resolution*t.rows*s,o.spatialReference),h=this.getMemberRasters?this.getMemberRasters()[0]:this;return h.read({level:n.level,row:Math.floor(s),col:Math.floor(i),extent:c,width:t.cols,height:t.rows,virtual:h.tileInfo.virtual,tileType:h.tileInfo.tileType}).then((function(e){var t=e&&e.pixelBlock;return!(t&&t.pixels&&t.pixels.length>0)||t.mask&&!t.mask[a]?{pixelValue:null}:{pixelValue:t.pixels.map((function(e){return e[a]}))}}))})))},getProjectedFullExtent:function(e,t){var i=new n;if(this.projectedFullExtent&&!t)return i.resolve(this.projectedFullExtent),i.promise;var o,s=this.rasterInfo.extent;return m.requirePE(this.rasterInfo.extent.spatialReference,e)?m.load().then(r.hitch(this,(function(){o=m.project(s,e),o=new u(o.toJson()),this.projectedFullExtent=o,i.resolve(o)})),(function(){i.reject(new Error("cannot project into this spatial reference"))})):(o=m.project(s,e),o=new u(o.toJson()),this.projectedFullExtent=o,i.resolve(o)),i.promise},setFetchParameters:function(e,t){},_setRasterHandler:function(e){this._rasterHandler=e,this.getMemberRasters&&this.getMemberRasters().forEach(r.hitch(this,(function(t){t._rasterHandler=e})))},_findCredential:function(){this.url&&(this._credential=h.id&&h.id.findCredential(this.url),(this._credential&&this._credential.ssl||this.serviceInfo&&this.serviceInfo._ssl)&&(this.url=this.url.replace(/^http:/i,"https:")))},_initWorker:function(){this._rasterHandler=new y,this._rasterHandler.start().then(function(){this._rasterHandlerInitialized=!0}.bind(this))},_requestPixels:function(e){var t=e.url,i=e.payload,o=e.decodeParams,s=e.tileOptions,l=new n(_._dfdCanceller);this._rasterHandler||this._initWorker();var a=this._rasterHandler,c={},h={url:t,handleAs:"arraybuffer",content:i};return e.headers&&(h.headers=e.headers),l._pendingDfd=f(h).then(r.hitch(this,(function(e){(a&&this._rasterHandlerInitialized?a.decode({encodedData:e,decodeParams:o}):g.decode(e,o)).then((function(e){c.pixelBlock=new I(e),c.extent=s.extent,c.level=s.level,c.row=s.row,c.col=s.col,c.width=s.width,c.height=s.height,_._resDfd(l,[c])}),(function(e){_._resDfd(l,[e],!0)}))})),(function(e){_._resDfd(l,[e],!0)})),l},_computeSignature:function(e){if("string"==typeof e){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=e.charCodeAt(r);e=t}for(var n=65535,i=65535,o=e.length,s=Math.floor(o/2),l=0;s;){var a=s>=359?359:s;s-=a;do{n+=e[l++]<<8,i+=n+=e[l++]}while(--a);n=(65535&n)+(n>>>16),i=(65535&i)+(i>>>16)}return 1&o&&(i+=n+=e[l]<<8),((i=(65535&i)+(i>>>16))<<16|(n=(65535&n)+(n>>>16)))>>>0}})}));