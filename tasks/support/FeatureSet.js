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

define(["require","exports","../../core/tsSupport/decorateHelper","../../core/tsSupport/declareExtendsHelper","../../geometry","../../Graphic","../../core/JSONSupport","../../core/kebabDictionary","../../core/accessorSupport/decorators","../../geometry/SpatialReference","../../geometry/support/jsonUtils","../../layers/support/Field"],function(e,t,r,o,n,i,p,a,y,s,u,l){var f=new a.default({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryEnvelope:"extent"}),c=function(e){function t(t){var r=e.call(this,t)||this;return r.displayFieldName=null,r.exceededTransferLimit=!1,r.features=[],r.fields=null,r.geometryType=null,r.hasM=!1,r.hasZ=!1,r.queryGeometry=null,r.spatialReference=null,r}return o(t,e),t.prototype.readFeatures=function(e,t){for(var r=s.fromJSON(t.spatialReference),o=[],n=0;n<e.length;n++){var p=e[n],a=i.fromJSON(p),y=p.geometry&&p.geometry.spatialReference;a.geometry&&!y&&(a.geometry.spatialReference=r),o.push(a)}return o},t.prototype.writeGeometryType=function(e,t,r,o){if(e)return void f.write(e,t,r,o);var n=this.features;if(n)for(var i=0,p=n;i<p.length;i++){var a=p[i];if(a&&a.geometry)return void f.write(a.geometry.type,t,r,o)}},t.prototype.writeSpatialReference=function(e,t,r,o){if(e)return void(t.spatialReference=e.toJSON());var n=this.features;if(n)for(var i=0,p=n;i<p.length;i++){var a=p[i];a&&a.geometry&&a.geometry.spatialReference&&(t.spatialReference=a.geometry.spatialReference.toJSON())}},t.prototype.toJSON=function(e){var t=this.write(null);if(t.features&&Array.isArray(e)&&e.length>0)for(var r=0;r<t.features.length;r++){var o=t.features[r];if(o.geometry){var n=e&&e[r];o.geometry=n&&n.toJSON()||o.geometry}}return t},t.prototype.quantize=function(e){for(var t=e.scale,r=t[0],o=t[1],n=e.translate,i=n[0],p=n[1],a=function(e){return Math.round((e-i)/r)},y=function(e){return Math.round((p-e)/o)},s=this.features,u=this._getQuantizationFunction(this.geometryType,a,y),l=0,f=s.length;l<f;l++)u(s[l].geometry)||(s.splice(l,1),l--,f--);return this.transform=e,this},t.prototype.unquantize=function(){var e=this,t=e.geometryType,r=e.features,o=e.transform;if(!o)return this;for(var n=o.translate,i=n[0],p=n[1],a=o.scale,y=a[0],s=a[1],u=function(e){return e*y+i},l=function(e){return p-e*s},f=this._getHydrationFunction(t,u,l),c=0,m=r;c<m.length;c++){var g=m[c].geometry;g&&f(g)}return this},t.prototype._quantizePoints=function(e,t,r){for(var o,n,i=[],p=0,a=e.length;p<a;p++){var y=e[p];if(p>0){var s=t(y[0]),u=r(y[1]);s===o&&u===n||(i.push([s-o,u-n]),o=s,n=u)}else o=t(y[0]),n=r(y[1]),i.push([o,n])}return i.length>0?i:null},t.prototype._getQuantizationFunction=function(e,t,r){var o=this;return"point"===e?function(e){return e.x=t(e.x),e.y=r(e.y),e}:"polyline"===e||"polygon"===e?function(e){for(var n=u.isPolygon(e)?e.rings:e.paths,i=[],p=0,a=n.length;p<a;p++){var y=n[p],s=o._quantizePoints(y,t,r);s&&i.push(s)}return i.length>0?(u.isPolygon(e)?e.rings=i:e.paths=i,e):null}:"multipoint"===e?function(e){var n;return n=o._quantizePoints(e.points,t,r),n.length>0?(e.points=n,e):null}:"extent"===e?function(e){return e}:void 0},t.prototype._getHydrationFunction=function(e,t,r){return"point"===e?function(e){e.x=t(e.x),e.y=r(e.y)}:"polyline"===e||"polygon"===e?function(e){for(var o,n,i=u.isPolygon(e)?e.rings:e.paths,p=0,a=i.length;p<a;p++)for(var y=i[p],s=0,l=y.length;s<l;s++){var f=y[s];s>0?(o+=f[0],n+=f[1]):(o=f[0],n=f[1]),f[0]=t(o),f[1]=r(n)}}:"extent"===e?function(e){e.xmin=t(e.xmin),e.ymin=r(e.ymin),e.xmax=t(e.xmax),e.ymax=r(e.ymax)}:"multipoint"===e?function(e){for(var o,n,i=e.points,p=0,a=i.length;p<a;p++){var y=i[p];p>0?(o+=y[0],n+=y[1]):(o=y[0],n=y[1]),y[0]=t(o),y[1]=r(n)}}:void 0},r([y.property({type:String,json:{write:!0}})],t.prototype,"displayFieldName",void 0),r([y.property({type:Boolean,json:{write:{overridePolicy:function(e){return{enabled:e}}}}})],t.prototype,"exceededTransferLimit",void 0),r([y.property({type:[i],json:{write:!0}})],t.prototype,"features",void 0),r([y.reader("features")],t.prototype,"readFeatures",null),r([y.property({type:[l],json:{write:!0}})],t.prototype,"fields",void 0),r([y.property({type:["point","multipoint","polyline","polygon","extent","mesh"],json:{read:{reader:f.read}}})],t.prototype,"geometryType",void 0),r([y.writer("geometryType")],t.prototype,"writeGeometryType",null),r([y.property({type:Boolean,json:{write:{overridePolicy:function(e){return{enabled:e}}}}})],t.prototype,"hasM",void 0),r([y.property({type:Boolean,json:{write:{overridePolicy:function(e){return{enabled:e}}}}})],t.prototype,"hasZ",void 0),r([y.property({types:n.geometryTypes,json:{read:u.fromJSON,write:!0}})],t.prototype,"queryGeometry",void 0),r([y.property({type:s,json:{write:!0}})],t.prototype,"spatialReference",void 0),r([y.writer("spatialReference")],t.prototype,"writeSpatialReference",null),r([y.property({json:{write:!0}})],t.prototype,"transform",void 0),t=r([y.subclass("esri.tasks.support.FeatureSet")],t)}(y.declared(p));return c.prototype.toJSON.isDefaultToJSON=!0,c||(c={}),c});