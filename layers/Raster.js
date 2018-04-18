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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/array","dojo/_base/config","dojo/json","dojo/sniff","../kernel","../Evented","../request","../geometry/Extent","../SpatialReference","../deferredUtils","./PixelBlock","./rasterFormats/LercCodec","./rasterFormats/Lerc2Codec"],function(e,t,a,i,r,o,n,s,d,l,h,c,p,u,f,m,x){var g,w,y,v,_,D,T=t(l,{declaredClass:"esri.layers.Raster",imageServiceUrl:null,validPixelTypes:["U1","U2","U4","U8","U16","U32","S8","S16","S32","F32"],validFormats:["lerc","jpeg","jpg","jpgpng","png","png8","png24","png32","bip","bsq","tiff"],_eventMap:{"raster-read-complete":["pixelData","params"]},constructor:function(e){this.imageServiceUrl=e,this.registerConnectEvents(),this._loadRasterFormatModules()},read:function(e,t,o){var n=this,d=new i(u._dfdCanceller);if(s("ie")<10)throw"This browser is not supported.";if(!e.imageServiceParameters)throw"Insufficient parameters to read data";var l=a.clone(e.imageServiceParameters),c=e.pixelType;r.some(this.validPixelTypes,function(e){return e===c})||(l.pixelType="F32"),r.some(this.validFormats,function(e){return e.toLowerCase()===l.format.toLowerCase()})||(l.format="lerc");var p,f=e.decodeFunc;this._prepareGetImageParameters(l);var m=l.width,x=l.height,g=l.extent;return delete l.width,delete l.height,delete l.extent,d._pendingDfd=h({url:this.imageServiceUrl+"/exportImage",handleAs:"arraybuffer",content:a.mixin(l,{f:"image"}),load:function(e){var a={width:m,height:x,planes:null,pixelType:c,noDataValue:l.noData,format:l.format,decodeFunc:f};n.decode(e,a).then(function(e){p={pixelBlock:e,extent:g},n._resolve([p,l],"onRasterReadComplete",t,d)},function(e){n._resolve([e],null,o,d,!0)})},error:function(e){n._resolve([e],null,o,d,!0)}}),d.promise},decode:function(e,t){if(void 0===t||null===t)throw"missing decode options";var a,i;return t.format&&(a=t.format.toUpperCase()),"BSQ"!==a&&"BIP"!==a&&(a=this._getFormat(e)),i=t.decodeFunc,void 0!==i&&null!==i||(i=this._getFormatDecoderDfd(a)),i(e,t)},onRasterReadComplete:function(){},_prepareGetImageParameters:function(e){if(e.size&&e.bbox){var t=e.size.split(",");if(e.width=parseFloat(t[0]),e.height=parseFloat(t[1]),!e.extent){var i=e.bbox.split(",");e.extent=new c(parseFloat(i[0]),parseFloat(i[1]),parseFloat(i[2]),parseFloat(i[3]),new p(e.bboxSR))}}else{if(!e.width||Math.floor(e.width)!==e.width||!e.height||Math.floor(e.height)!==e.height)throw"Incorrect Image Dimensions";if(!e.extent||"esri.geometry.Extent"!==e.extent.declaredClass)throw"Incorrect extent";var r=e.extent,o=r.spatialReference.wkid||n.toJson(r.spatialReference.toJson());delete e._ts,a.mixin(e,{bbox:r.xmin+","+r.ymin+","+r.xmax+","+r.ymax,imageSR:o,bboxSR:o,size:e.width+","+e.height},e.disableClientCaching?{_ts:(new Date).getTime()}:{})}},_adjustExtent:function(e,t,a){var i=e.ymax-e.ymin,r=e.xmax-e.xmin;return a>=t?(i=r*t/a,e.ymax=e.ymin+i):(r=i*a/t,e.xmax=e.xmin+r),e},_resolve:function(e,t,a,i,r){t&&this[t].apply(this,e),a&&a.apply(null,e),i&&u._resDfd(i,e,r)},_getFormatDecoderDfd:function(e){var t=null;switch(e){case"LERC":t=this._decodeLerc;break;case"LERC2":t=this._decodeLerc2;break;case"JPEG":t=this._decodeJpeg;break;case"PNG":t=this._decodePng;break;case"BSQ":t=this._decodeBsq;break;case"BIP":t=this._decodeBip;break;case"TIFF":t=this._decodeTiff;break;default:t=function(e,t){throw"The raster format is not supported"}}return t=a.hitch(this,t),function(a,r){var o=new i;try{var n;"LERC"===e||!0===_?(n=t(a,r),o.resolve(n)):D.then(function(){n=t(a,r),o.resolve(n)})}catch(e){o.reject(e)}return o}},_getFormat:function(e){var t=new Uint8Array(e,0,10),a="";return 255===t[0]&&216===t[1]?a="JPEG":137===t[0]&&80===t[1]&&78===t[2]&&71===t[3]?a="PNG":67===t[0]&&110===t[1]&&116===t[2]&&90===t[3]&&73===t[4]&&109===t[5]&&97===t[6]&&103===t[7]&&101===t[8]&&32===t[9]?a="LERC":76===t[0]&&101===t[1]&&114===t[2]&&99===t[3]&&50===t[4]&&32===t[5]?a="LERC2":String.fromCharCode.apply(null,t).toLowerCase().indexOf("error")>-1?a="ERROR":(73===t[0]&&73===t[1]&&42===t[2]&&0===t[3]||77===t[0]&&77===t[1]&&0===t[2]&&42===t[3])&&(a="TIFF"),a},_validateDecodeParams:function(e){if(!e.height||Math.floor(e.height)!==e.height)throw"Height not provided.";if(!e.width||Math.floor(e.width)!==e.width)throw"Width not provided."},_decodeJpeg:function(e,t){if(!g)throw"The jpeg decoder module is not loaded.";this._validateDecodeParams(t);var a=new g,i=a.decode(e);if(!U(i,t))throw"The decoded image dimensions are incorrect.";var r,o,n=[];for(r=0;r<i.pixels.length;r++)o=i.pixels[r],n.push(this._calculateBandStatistics(o));return new f({width:i.width,height:i.height,pixels:i.pixels,pixelType:"U8",mask:i.mask,statistics:n})},_decodePng:function(e,t){if(!w)throw"The png decoder module is not loaded.";this._validateDecodeParams(t);var a=new Uint8Array(e),i=new w(a),r=new Uint8Array(t.width*t.height*4);i.copyToImageData(r,i.decodePixels());var o,n=0,s=0,d=new Uint8Array(t.width*t.height);for(n=0;n<t.width*t.height;n++)d[n]=r[4*n+3];var l=new f({width:t.width,height:t.height,pixels:[],pixelType:"U8",mask:d,statistics:[]});for(n=0;n<3;n++){for(o=new Uint8Array(t.width*t.height),s=0;s<t.width*t.height;s++)o[s]=r[4*s+n];l.addData({pixels:o,statistics:this._calculateBandStatistics(o)})}return l},_decodeBsq:function(e,t){if(!y)throw"The bsq decoder module is not loaded.";this._validateDecodeParams(t),F=t.noDataValue,t.pixelType=k(t.pixelType);var a,i=y.decodeBSQ(e,{bandCount:t.planes,width:t.width,height:t.height,pixelType:b,noDataValue:F}),r=[],o=null;for(a=0;a<i.pixels.length;a++)o=i.pixels[a],r.push(this._calculateBandStatistics(o));return new f({width:t.width,height:t.height,pixels:i.pixels,pixelType:t.pixelType,mask:i.maskData,statistics:r})},_decodeBip:function(e,t){this._validateDecodeParams(t),F=t.noDataValue,t.pixelType=k(t.pixelType);var a,i=y.decodeBIP(e,{bandCount:t.planes,width:t.width,height:t.height,pixelType:b,noDataValue:F}),r=[],o=null;for(a=0;a<i.pixels.length;a++)o=i.pixels[a],r.push(this._calculateBandStatistics(o));return new f({width:t.width,height:t.height,pixels:i.pixels,pixelType:t.pixelType,mask:i.maskData,statistics:r})},_decodeTiff:function(e,t){this._validateDecodeParams(t),F=t.noDataValue,t.pixelType=k(t.pixelType);var a,i=v.decode(e),r=[],o=null;for(a=0;a<i.pixels.length;a++)o=i.pixels[a],r.push(this._calculateBandStatistics(o,i.maskData));return new f({width:i.width,height:i.height,pixels:i.pixels,pixelType:i.pixelType,mask:i.maskData,statistics:r})},_decodeLerc:function(e,t){this._validateDecodeParams(t),F=t.noDataValue,t.pixelType=k(t.pixelType);for(var a,i,r=0,o=0,n=e.byteLength-10;o<n;){var s=m.decode(e,{inputOffset:o,encodedMaskData:a,returnMask:0===r,returnEncodedMask:0===r,returnFileInfo:!0,pixelType:b,noDataValue:F});if(o=s.fileInfo.eofOffset,0===r&&(a=s.encodedMaskData,i=new f({width:t.width,height:t.height,pixels:[],pixelType:t.pixelType,mask:s.maskData,statistics:[]})),r++,!U(s,t))throw"The decoded image dimensions are incorrect";i.addData({pixels:s.pixelData,statistics:{minValue:s.minValue,maxValue:s.maxValue,noDataValue:s.noDataValue}})}return i},_decodeLerc2:function(e,t){this._validateDecodeParams(t),F=t.noDataValue,t.pixelType=k(t.pixelType);for(var a,i,r,o=0,n=0,s=e.byteLength-10;n<s;){if(i=x.decode(e,{inputOffset:n,maskData:a,returnFileInfo:!0}),n=i.fileInfo.eofOffset,0===o&&(a=i.maskData,r=new f({width:t.width,height:t.height,pixels:[],pixelType:i.fileInfo.pixelType,mask:i.maskData,statistics:[]})),o++,!U(i,t))throw"The decoded image dimensions are incorrect";r.addData({pixels:i.pixelData,statistics:{minValue:i.minValue,maxValue:i.maxValue,noDataValue:i.noDataValue}})}return r},_calculateBandStatistics:function(e,t){var a,i=1/0,r=-1/0,o=e.length,n=0;if(t)for(a=0;a<o;a++)t[a]&&(n=e[a],i=n<i?n:i,r=n>r?n:r);else for(a=0;a<o;a++)n=e[a],i=n<i?n:i,r=n>r?n:r;return{minValue:i,maxValue:r}},_loadRasterFormatModules:function(){_||(D||(D=new i),s("ie")<10?D.isRejected()||D.reject("unsupported browser version"):e(["./rasterFormats/JpgPlus","./rasterFormats/Png","./rasterFormats/Raw","./rasterFormats/TiffDecoder","./rasterFormats/Zlib"],function(e,t,a,i){g=e,w=t,y=a,v=i,_=!0,D.isResolved()||D.resolve(!0)}))}}),b=null,F=null,k=function(e){return"U1"===e||"U2"===e||"U4"===e||"U8"===e?(e="U8",F=Math.pow(2,8)-1,b=Uint8Array,e):"U16"===e?(F=F||Math.pow(2,16)-1,b=Uint16Array,e):"U32"===e?(F=F||Math.pow(2,32)-1,b=Uint32Array,e):"S8"===e?(F=F||0-Math.pow(2,7),b=Int8Array,e):"S16"===e?(F=F||0-Math.pow(2,15),b=Int16Array,e):"S32"===e?(F=F||0-Math.pow(2,31),b=Int32Array,e):(b=Float32Array,e)},U=function(e,t){return e.height===t.height&&e.width===t.width};return s("extend-esri")&&a.setObject("layers.Raster",T,d),T});