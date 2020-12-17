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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/lang","../core/accessorSupport/decorators","./Geometry","./Point","./SpatialReference","./support/contains","./support/intersects","./support/spatialReferenceUtils","./support/webMercatorUtils"],(function(t,e,i,n,r,a,s,m,o,h,p,x,c){function l(t,e,i){return null==e?i:null==i?e:t(e,i)}var u=function(t){function e(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];var n=t.call(this)||this;return n.type="extent",n.xmin=0,n.ymin=0,n.mmin=void 0,n.zmin=void 0,n.xmax=0,n.ymax=0,n.mmax=void 0,n.zmax=void 0,n}return i(e,t),s=e,e.prototype.normalizeCtorArgs=function(t,e,i,n,r){return!(a=t)||"esri.geometry.SpatialReference"!==a.declaredClass&&null==a.wkid?"object"==typeof t?(t.spatialReference=null!=t.spatialReference?t.spatialReference:o.WGS84,t):{xmin:t,ymin:e,xmax:i,ymax:n,spatialReference:null!=r?r:o.WGS84}:{spatialReference:t,xmin:0,ymin:0,xmax:0,ymax:0};var a},Object.defineProperty(e.prototype,"center",{get:function(){var t=new m({x:.5*(this.xmin+this.xmax),y:.5*(this.ymin+this.ymax),spatialReference:this.spatialReference});return this.hasZ&&(t.z=.5*(this.zmin+this.zmax)),this.hasM&&(t.m=.5*(this.mmin+this.mmax)),t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extent",{get:function(){return this.clone()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hasM",{get:function(){return null!=this.mmin&&null!=this.mmax},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hasZ",{get:function(){return null!=this.zmin&&null!=this.zmax},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return Math.abs(this.ymax-this.ymin)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"width",{get:function(){return Math.abs(this.xmax-this.xmin)},enumerable:!0,configurable:!0}),e.prototype.centerAt=function(t){var e=this.center;return null!=t.z&&this.hasZ?this.offset(t.x-e.x,t.y-e.y,t.z-e.z):this.offset(t.x-e.x,t.y-e.y)},e.prototype.clone=function(){var t=new s;return t.xmin=this.xmin,t.ymin=this.ymin,t.xmax=this.xmax,t.ymax=this.ymax,t.spatialReference=this.spatialReference,null!=this.zmin&&(t.zmin=this.zmin,t.zmax=this.zmax),null!=this.mmin&&(t.mmin=this.mmin,t.mmax=this.mmax),t},e.prototype.contains=function(t){if(!t)return!1;var e=this.spatialReference,i=t.spatialReference;return e&&i&&!e.equals(i)&&c.canProject(e,i)&&(t=e.isWebMercator?c.geographicToWebMercator(t):c.webMercatorToGeographic(t,!0)),"point"===t.type?h.extentContainsPoint(this,t):"extent"===t.type&&h.extentContainsExtent(this,t)},e.prototype.equals=function(t){if(!t)return!1;var e=this.spatialReference,i=t.spatialReference;return e&&i&&!e.equals(i)&&c.canProject(e,i)&&(t=e.isWebMercator?c.geographicToWebMercator(t):c.webMercatorToGeographic(t,!0)),this.xmin===t.xmin&&this.ymin===t.ymin&&this.zmin===t.zmin&&this.mmin===t.mmin&&this.xmax===t.xmax&&this.ymax===t.ymax&&this.zmax===t.zmax&&this.mmax===t.mmax},e.prototype.expand=function(t){var e=.5*(1-t),i=this.width*e,n=this.height*e;if(this.xmin+=i,this.ymin+=n,this.xmax-=i,this.ymax-=n,this.hasZ){var r=(this.zmax-this.zmin)*e;this.zmin+=r,this.zmax-=r}if(this.hasM){var a=(this.mmax-this.mmin)*e;this.mmin+=a,this.mmax-=a}return this},e.prototype.intersects=function(t){if(!t)return!1;var e=this.spatialReference,i=t.spatialReference;e&&i&&!e.equals(i)&&c.canProject(e,i)&&(t=e.isWebMercator?c.geographicToWebMercator(t):c.webMercatorToGeographic(t,!0));var n=p.getExtentIntersector(t.type);return"mesh"!==t.type?n(this,t):n(this,t.extent)},e.prototype.normalize=function(){var t=this._normalize(!1,!0);return Array.isArray(t)?t:[t]},e.prototype.offset=function(t,e,i){return this.xmin+=t,this.ymin+=e,this.xmax+=t,this.ymax+=e,null!=i&&(this.zmin+=i,this.zmax+=i),this},e.prototype.shiftCentralMeridian=function(){return this._normalize(!0)},e.prototype.union=function(t){return this.xmin=Math.min(this.xmin,t.xmin),this.ymin=Math.min(this.ymin,t.ymin),this.xmax=Math.max(this.xmax,t.xmax),this.ymax=Math.max(this.ymax,t.ymax),(this.hasZ||t.hasZ)&&(this.zmin=l(Math.min,this.zmin,t.zmin),this.zmax=l(Math.max,this.zmax,t.zmax)),(this.hasM||t.hasM)&&(this.mmin=l(Math.min,this.mmin,t.mmin),this.mmax=l(Math.max,this.mmax,t.mmax)),this},e.prototype.intersection=function(t){return this.intersects(t)?(this.xmin=Math.max(this.xmin,t.xmin),this.ymin=Math.max(this.ymin,t.ymin),this.xmax=Math.min(this.xmax,t.xmax),this.ymax=Math.min(this.ymax,t.ymax),(this.hasZ||t.hasZ)&&(this.zmin=l(Math.max,this.zmin,t.zmin),this.zmax=l(Math.min,this.zmax,t.zmax)),(this.hasM||t.hasM)&&(this.mmin=l(Math.max,this.mmin,t.mmin),this.mmax=l(Math.min,this.mmax,t.mmax)),this):null},e.prototype.toJSON=function(t){return this.write(null,t)},e.prototype._shiftCM=function(t){if(void 0===t&&(t=x.getInfo(this.spatialReference)),!t||!this.spatialReference)return this;var e=this.spatialReference,i=this._getCM(t);if(i){var n=e.isWebMercator?c.webMercatorToGeographic(i):i;this.xmin-=i.x,this.xmax-=i.x,e.isWebMercator||(n.x=this._normalizeX(n.x,t).x),this.spatialReference=new o(r.substitute({Central_Meridian:n.x},e.isWGS84?t.altTemplate:t.wkTemplate))}return this},e.prototype._getCM=function(t){var e=null,i=t.valid,n=i[0],r=i[1],a=this.xmin,s=this.xmax;return a>=n&&a<=r&&(s>=n&&s<=r)||(e=this.center),e},e.prototype._normalize=function(t,e,i){var n=this.spatialReference;if(!n)return this;if(!(i=i||x.getInfo(n)))return this;var r=this._getParts(i).map((function(t){return t.extent}));if(r.length<2)return r[0]||this;if(r.length>2)return t?this._shiftCM(i):this.set({xmin:i.valid[0],xmax:i.valid[1]});if(t)return this._shiftCM(i);if(e)return r;var a=!0,s=!0;return r.forEach((function(t){t.hasZ||(a=!1),t.hasM||(s=!1)})),{rings:r.map((function(t){var e=[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]];if(a)for(var i=(t.zmax-t.zmin)/2,n=0;n<e.length;n++)e[n].push(i);if(s){var r=(t.mmax-t.mmin)/2;for(n=0;n<e.length;n++)e[n].push(r)}return e})),hasZ:a,hasM:s,spatialReference:n}},e.prototype._getParts=function(t){var e=this.cache._parts;if(!e){e=[];var i=this.ymin,n=this.ymax,r=this.spatialReference,a=this.width,m=this.xmin,o=this.xmax,h=void 0,p=(t=t||x.getInfo(r)).valid,c=p[0],l=p[1],u=(h=this._normalizeX(this.xmin,t)).x,y=h.frameId,f=(h=this._normalizeX(this.xmax,t)).x,d=h.frameId,v=u===f&&a>0;if(a>2*l){var z=new s(m<o?u:f,i,l,n,r),b=new s(c,i,m<o?f:u,n,r),M=new s(0,i,l,n,r),g=new s(c,i,0,n,r),w=[],R=[];z.contains(M)&&w.push(y),z.contains(g)&&R.push(y),b.contains(M)&&w.push(d),b.contains(g)&&R.push(d);for(var O=y+1;O<d;O++)w.push(O),R.push(O);e.push({extent:z,frameIds:[y]},{extent:b,frameIds:[d]},{extent:M,frameIds:w},{extent:g,frameIds:R})}else u>f||v?e.push({extent:new s(u,i,l,n,r),frameIds:[y]},{extent:new s(c,i,f,n,r),frameIds:[d]}):e.push({extent:new s(u,i,f,n,r),frameIds:[y]});this.cache._parts=e}var j=this.hasZ,P=this.hasM;if(j||P){var _={};j&&(_.zmin=this.zmin,_.zmax=this.zmax),P&&(_.mmin=this.mmin,_.mmax=this.mmax);for(var I=0;I<e.length;I++)e[I].extent.set(_)}return e},e.prototype._normalizeX=function(t,e){var i,n=e.valid,r=n[0],a=n[1],s=2*a,m=0;return t>a?(t-=(i=Math.ceil(Math.abs(t-a)/s))*s,m=i):t<r&&(t+=(i=Math.ceil(Math.abs(t-r)/s))*s,m=-i),{x:t,frameId:m}},n([a.property({dependsOn:["xmin","ymin","zmin","mmin","xmax","ymax","zmax","mmax","spatialReference"]})],e.prototype,"cache",void 0),n([a.property({readOnly:!0,dependsOn:["cache"]})],e.prototype,"center",null),n([a.property({readOnly:!0,dependsOn:["cache"]})],e.prototype,"extent",null),n([a.property({readOnly:!0,dependsOn:["mmin","mmax"],json:{write:{enabled:!1,overridePolicy:null}}})],e.prototype,"hasM",null),n([a.property({readOnly:!0,dependsOn:["zmin","zmax"],json:{write:{enabled:!1,overridePolicy:null}}})],e.prototype,"hasZ",null),n([a.property({readOnly:!0,dependsOn:["ymin","ymax"]})],e.prototype,"height",null),n([a.property({readOnly:!0,dependsOn:["xmin","xmax"]})],e.prototype,"width",null),n([a.property({type:Number,json:{write:!0}})],e.prototype,"xmin",void 0),n([a.property({type:Number,json:{write:!0}})],e.prototype,"ymin",void 0),n([a.property({type:Number,json:{origins:{"web-scene":{write:!1}},write:{overridePolicy:function(){return{enabled:this.hasM}}}}})],e.prototype,"mmin",void 0),n([a.property({type:Number,json:{origins:{"web-scene":{write:!1}},write:{overridePolicy:function(){return{enabled:this.hasZ}}}}})],e.prototype,"zmin",void 0),n([a.property({type:Number,json:{write:!0}})],e.prototype,"xmax",void 0),n([a.property({type:Number,json:{write:!0}})],e.prototype,"ymax",void 0),n([a.property({type:Number,json:{origins:{"web-scene":{write:!1}},write:{overridePolicy:function(){return{enabled:this.hasM}}}}})],e.prototype,"mmax",void 0),n([a.property({type:Number,json:{origins:{"web-scene":{write:!1}},write:{overridePolicy:function(){return{enabled:this.hasZ}}}}})],e.prototype,"zmax",void 0),e=s=n([a.subclass("esri.geometry.Extent")],e);var s}(a.declared(s));return u.prototype.toJSON.isDefaultToJSON=!0,u}));