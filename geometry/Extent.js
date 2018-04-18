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

define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/has","../kernel","../lang","../SpatialReference","./Geometry","./Point","./webMercatorUtils","./mathUtils","../srUtils"],function(t,e,i,n,s,a,r,h,x,m,o,c){function f(){}var u={type:"extent",xmin:0,ymin:0,xmax:0,ymax:0},l=t(h,{declaredClass:"esri.geometry.Extent",type:"extent",xmin:0,ymin:0,xmax:0,ymax:0,constructor:function(t,e,i,n,s){a.isObject(t)?(a.mixin(this,t),this.spatialReference&&(this.spatialReference=c.createSpatialReference(this.spatialReference))):this.update(t,e,i,n,s),this.verifySR()},getWidth:function(){return Math.abs(this.xmax-this.xmin)},getHeight:function(){return Math.abs(this.ymax-this.ymin)},getCenter:function(){return new x((this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2,this.spatialReference)},centerAt:function(t){var e=this.getCenter(),i=t.x-e.x,n=t.y-e.y;return new l(this.xmin+i,this.ymin+n,this.xmax+i,this.ymax+n,this.spatialReference)},update:function(t,e,i,n,s){return this.xmin=t,this.ymin=e,this.xmax=i,this.ymax=n,this.spatialReference=s,this.clearCache(),this},offset:function(t,e){return new l(this.xmin+t,this.ymin+e,this.xmax+t,this.ymax+e,this.spatialReference)},expand:function(t){var e=(1-t)/2,i=this.getWidth()*e,n=this.getHeight()*e;return new l(this.xmin+i,this.ymin+n,this.xmax-i,this.ymax-n,this.spatialReference)},intersects:function(t){if(!t)return!1;var e=t.type,i=this.spatialReference,n=t.spatialReference;switch(i&&n&&!i.equals(n)&&i._canProject(n)&&(t=i.isWebMercator()?m.geographicToWebMercator(t):m.webMercatorToGeographic(t,!0)),e){case"point":return this.contains(t);case"multipoint":return this._intersectsMultipoint(t);case"extent":return this._intersectsExtent(t);case"polygon":return this._intersectsPolygon(t);case"polyline":return this._intersectsPolyline(t)}},normalize:function(){var t=this._normalize(!1,!0);return i.isArray(t)||(t=[t]),t},shiftCentralMeridian:function(){return this._normalize(!0)},bisect:function(){var t=this.spatialReference,e=t&&t._getInfo(),i=[],n=0;if(e&&this._isOutOfBounds(e)){var s=this,a=s.xmin,h=s.ymin,x=s.ymax,m=e.valid[0],o=e.valid[1];if(s.getWidth()>2*o){var c=s.getCenter();s=new l(c.x-o,h,c.x+o,x,new r(t.toJson()))}n=s.xmin-a;var f=this._normalizeX(s.xmin,e),u=this._normalizeX(s.xmax,e);f.frameId===u.frameId?i.push(new l(f.x,h,u.x,x,new r(t.toJson()))):i.push(new l(f.x,h,o,x,new r(t.toJson())),new l(m,h,u.x,x,new r(t.toJson())))}else i.push(this.getExtent());return{extents:i,marginLeft:n}},_intersectsMultipoint:function(t){var e,i=t.points.length;for(e=0;e<i;e++)if(this.contains(t.getPoint(e)))return!0;return!1},_intersectsExtent:function(t){var e,i,n,s,a=!1;return this.xmin<=t.xmin?(e=t.xmin,this.xmax<e?a=!0:n=Math.min(this.xmax,t.xmax)-e):(e=this.xmin,t.xmax<e?a=!0:n=Math.min(this.xmax,t.xmax)-e),this.ymin<=t.ymin?(i=t.ymin,this.ymax<i?a=!0:s=Math.min(this.ymax,t.ymax)-i):(i=this.ymin,t.ymax<i?a=!0:s=Math.min(this.ymax,t.ymax)-i),a?null:new l(e,i,e+n,i+s,this.spatialReference)},_intersectsPolygon:function(t){var e,i,n,s,a=[this.xmin,this.ymax],r=[this.xmax,this.ymax],h=[this.xmin,this.ymin],m=[this.xmax,this.ymin],o=[a,r,h,m],c=[[h,a],[a,r],[r,m],[m,h]],f=t.rings,u=f.length,l=new x(0,0,this.spatialReference);for(s=o.length,e=0;e<s;e++)if(l.update(o[e][0],o[e][1]),t.contains(l))return!0;l.setSpatialReference(t.spatialReference);var y,p;for(e=0;e<u;e++)if(n=f[e],s=n.length){if(y=n[0],l.update(y[0],y[1]),this.contains(l))return!0;for(i=1;i<s;i++){if(p=n[i],l.update(p[0],p[1]),this.contains(l)||this._intersectsLine([y,p],c))return!0;y=p}}return!1},_intersectsPolyline:function(t){var e,i,n,s,a,r,h=[[[this.xmin,this.ymin],[this.xmin,this.ymax]],[[this.xmin,this.ymax],[this.xmax,this.ymax]],[[this.xmax,this.ymax],[this.xmax,this.ymin]],[[this.xmax,this.ymin],[this.xmin,this.ymin]]],m=t.paths,o=m.length,c=new x(0,0,t.spatialReference);for(e=0;e<o;e++)if(n=m[e],s=n.length){if(a=n[0],c.update(a[0],a[1]),this.contains(c))return!0;for(i=1;i<s;i++){if(r=n[i],c.update(r[0],r[1]),this.contains(c)||this._intersectsLine([a,r],h))return!0;a=r}}return!1},_intersectsLine:function(t,e){var i,n=o._getLineIntersection2,s=e.length;for(i=0;i<s;i++)if(n(t,e[i]))return!0;return!1},contains:function(t){if(!t)return!1;var e=t.type;if("point"===e){var i,n=this.spatialReference,s=t.spatialReference,a=t.x,r=t.y;return n&&s&&!n.equals(s)&&n._canProject(s)&&(i=n.isWebMercator()?x.lngLatToXY(a,r):x.xyToLngLat(a,r,!0),a=i[0],r=i[1]),a>=this.xmin&&a<=this.xmax&&r>=this.ymin&&r<=this.ymax}return"extent"===e&&this._containsExtent(t)},_containsExtent:function(t){var e=t.xmin,i=t.ymin,n=t.xmax,s=t.ymax,a=t.spatialReference,r=new x(e,i,a),h=new x(e,s,a),m=new x(n,s,a),o=new x(n,i,a);return!!(this.contains(r)&&this.contains(h)&&this.contains(m)&&this.contains(o))},union:function(t){return new l(Math.min(this.xmin,t.xmin),Math.min(this.ymin,t.ymin),Math.max(this.xmax,t.xmax),Math.max(this.ymax,t.ymax),this.spatialReference)},getExtent:function(){var t=this.spatialReference;return new l(this.xmin,this.ymin,this.xmax,this.ymax,t&&new r(t.toJson()))},_shiftCM:function(t){var e=this.getCacheValue("_shifted");if(!e){var i=new l(this.toJson()),n=i.spatialReference;if(t=t||n._getInfo()){var s=this._getCM(t);if(s){var h=n._isWebMercator()?m.webMercatorToGeographic(s):s;i.xmin-=s.x,i.xmax-=s.x,n._isWebMercator()||(h.x=this._normalizeX(h.x,t).x),i.setSpatialReference(new r(a.substitute({Central_Meridian:h.x},4326===n.wkid?t.altTemplate:t.wkTemplate)))}}e=i,this.setCacheValue("_shifted",e)}return e},_getCM:function(t){var e;return this._isOutOfBounds(t)&&(e=this.getCenter()),e},_isOutOfBounds:function(t){var e=t.valid[0],i=t.valid[1],n=this.xmin,s=this.xmax,a=n>=e&&n<=i,r=s>=e&&s<=i;return!(a&&r)},_normalize:function(t,i,n){var s=new l(this.toJson()),a=s.spatialReference;if(a&&(n=n||a._getInfo())){var r=e.map(this._getParts(n),function(t){return t.extent});return r.length>2?t?this._shiftCM(n):s.update(n.valid[0],s.ymin,n.valid[1],s.ymax,a):2===r.length?t?this._shiftCM(n):i?r:{rings:e.map(r,function(t){return[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]]}),spatialReference:a}:r[0]||s}return s},_getParts:function(t){var e=this.getCacheValue("_parts");if(!e){e=[];var i,n,s,a,r=this.xmin,h=this.xmax,x=this.ymin,m=this.ymax,o=this.spatialReference,c=this.getWidth(),f=r,u=h,y=0,p=0;if(t=t||o._getInfo(),n=t.valid[0],s=t.valid[1],i=this._normalizeX(r,t),r=i.x,y=i.frameId,i=this._normalizeX(h,t),h=i.x,p=i.frameId,a=r===h&&c>0,c>2*s){var d,g=new l(f<u?r:h,x,s,m,o),_=new l(n,x,f<u?h:r,m,o),v=new l(0,x,s,m,o),w=new l(n,x,0,m,o),M=[],R=[];for(g.contains(v)&&M.push(y),g.contains(w)&&R.push(y),_.contains(v)&&M.push(p),_.contains(w)&&R.push(p),d=y+1;d<p;d++)M.push(d),R.push(d);e.push({extent:g,frameIds:[y]},{extent:_,frameIds:[p]},{extent:v,frameIds:M},{extent:w,frameIds:R})}else r>h||a?e.push({extent:new l(r,x,s,m,o),frameIds:[y]},{extent:new l(n,x,h,m,o),frameIds:[p]}):e.push({extent:new l(r,x,h,m,o),frameIds:[y]});this.setCacheValue("_parts",e)}return e},_normalizeX:function(t,e){var i,n=0,s=e.valid[0],a=e.valid[1],r=2*a;return t>a?(i=Math.ceil(Math.abs(t-a)/r),t-=i*r,n=i):t<s&&(i=Math.ceil(Math.abs(t-s)/r),t+=i*r,n=-i),{x:t,frameId:n}},toJson:function(){var t={xmin:this.xmin,ymin:this.ymin,xmax:this.xmax,ymax:this.ymax},e=this.spatialReference;return e&&(t.spatialReference=e.toJson()),t}});return f.prototype=l.prototype,l.simpleConstructor=f,l.defaultProps=u,n("extend-esri")&&(i.setObject("geometry.Extent",l,s),s.geometry.defaultExtent=u),l});