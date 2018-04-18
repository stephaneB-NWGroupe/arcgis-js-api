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

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","dojox/string/BidiEngine","../2d/engine/webgl/Geometry","../2d/engine/webgl/TextShaping","./Bucket","./GeometryUtils","./Placement","./style/StyleLayer"],function(t,e,a,o,n,i,r,s,l,h,c){function d(t,e){return t.iconMosaicItem&&e.iconMosaicItem?t.iconMosaicItem.page===e.iconMosaicItem.page?0:t.iconMosaicItem.page<e.iconMosaicItem.page?-1:1:t.iconMosaicItem&&!e.iconMosaicItem?1:!t.iconMosaicItem&&e.iconMosaicItem?-1:0}!function(){function t(){}}();return function(t){function e(e,a,o,n,i,r,s,l){var h=t.call(this,e,a)||this;if(h._markerMap=new Map,h._glyphMap=new Map,h._glyphBufferDataStorage=new Map,h._sdfMarkers=!1,e.hasDataDrivenIcon!==o.isDataDriven())throw new Error("incompatible icon buffer");if(e.hasDataDrivenText!==i.isDataDriven())throw new Error("incompatible text buffer");return h._iconVertexBuffer=o,h._iconIndexBuffer=n,h._textVertexBuffer=i,h._textIndexBuffer=r,h._placementEngine=s,h._workerTileHandler=l,h}return a(e,t),Object.defineProperty(e.prototype,"markerPageMap",{get:function(){return this._markerMap},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"glyphsPageMap",{get:function(){return this._glyphMap},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"sdfMarker",{get:function(){return this._sdfMarkers},enumerable:!0,configurable:!0}),e.prototype.copy=function(t,a,o,n,i){var r=new e(this.layer,this.zoom,t,a,o,n,i,this._workerTileHandler);return r.layerIndex=this.layerIndex,r.layerExtent=this.layerExtent,r._iconIndexStart=a.index,r._textIndexStart=n.index,r._iconIndexCount=0,r._textIndexCount=0,r._symbolInstances=this._symbolInstances,r._workerTileHandler=this._workerTileHandler,r._fontArray=this._fontArray,r._textLayout=this._textLayout,r._iconLayout=this._iconLayout,r._isLinePlacement=this._isLinePlacement,r._avoidEdges=this._avoidEdges,r},e.prototype.getResources=function(t,a,o){var n=this.layer,i=this.zoom,r=n.hasDataDrivenIcon,s=n.hasDataDrivenText;t&&t.setExtent(this.layerExtent);for(var l=n.getLayoutProperty("icon-image"),h=n.getLayoutProperty("text-field"),c=n.getLayoutValue("text-font",i),d=n.getLayoutValue("text-transform",i),x=[],u=0,y=this._features;u<y.length;u++){var p=y[u],f=p.getGeometry(t);if(f&&0!==f.length){var m=void 0;l&&(m=n.getLayoutValue("icon-image",i,p),l.isDataDriven||(m=this._replaceKeys(m,p.values)),m&&a.add(m));var g=void 0,_=!1;if(h&&(g=n.getLayoutValue("text-field",i,p),h.isDataDriven||(g=this._replaceKeys(g,p.values)),g)){switch(d){case 2:g=g.toLowerCase();break;case 1:g=g.toUpperCase()}if(e._bidiEngine.hasBidiChar(g)){var v=e._bidiEngine.checkContextual(g),I=void 0;I="rtl"===v?"IDNNN":"ICNNN",g=e._bidiEngine.bidiTransform(g,I,"VLYSN"),_=!0}var b=g.length;if(b>0)for(var M=0,z=c;M<z.length;M++){var L=z[M],P=o[L];P||(P=o[L]=new Set);for(var V=0;V<b;V++){var A=g.charCodeAt(V);P.add(A)}}}if(m||g){var w=n.getLayoutValue("icon-size",i,p),S=n.getLayoutValue("text-size",i,p),T={sprite:m,label:g,rtl:_,geometry:f,iconSize:w,iconRotate:n.getLayoutValue("icon-rotate",i,p),ddIconValues:r?{color:n.getPaintValue("icon-color",i,p),opacity:n.getPaintValue("icon-opacity",i,p),size:w}:null,textSize:S,textRotate:n.getLayoutValue("text-rotate",i,p),ddTextValues:s?{color:n.getPaintValue("text-color",i,p),opacity:n.getPaintValue("text-opacity",i,p),size:S}:null};x.push(T)}}}this._symbolFeatures=x},e.prototype.processFeatures=function(t,a){t&&t.setExtent(this.layerExtent);var o,n,i=this.layer,s=this.zoom,x=this._isLinePlacement=1===i.getLayoutValue("symbol-placement",s),u=this._avoidEdges=i.getLayoutValue("symbol-avoid-edges",s)&&!x,y=8*i.getLayoutValue("symbol-spacing",s),p=i.getLayoutProperty("icon-image"),f=i.getLayoutProperty("text-field"),m=this._workerTileHandler;p&&(this._iconLayout=new c.IconLayout(i,s,x),o=m.getSpriteItems(),n=this._getTranslate(!0));var g,_,v;if(f){var I=this._textLayout=new c.TextLayout(i,s,x);this._fontArray=I.fontArray;var b=.5;switch(I.anchor){case 5:case 1:case 7:b=0;break;case 6:case 2:case 8:b=1}var M=.5;switch(I.anchor){case 5:case 3:case 6:M=0;break;case 7:case 4:case 8:M=1}var z=.5;switch(I.justify){case 0:z=0;break;case 2:z=1}var L=24*I.letterSpacing,P=x?0:24*I.maxWidth,V=24*I.lineHeight,A=[24*I.offset[0],24*I.offset[1]];g=this._fontArray.map(function(t){return m.getGlyphItems(t)}),_=new r(g,P,V,L,A,b,M,z),v=this._getTranslate(!1)}this._iconIndexStart=this._iconIndexBuffer.index,this._textIndexStart=this._textIndexBuffer.index,this._iconIndexCount=0,this._textIndexCount=0,this._markerMap.clear(),this._glyphMap.clear();var w=[];this._symbolInstances=w;var S=this._textLayout,T=1;S&&S.size&&(T=S.size/24);for(var E=S?S.maxAngle*l.C_DEG_TO_RAD:0,k=S?8*S.size:0,D=0,C=this._symbolFeatures;D<C.length;D++){var B=C[D],N=void 0;B.sprite&&(N=o[B.sprite])&&N.sdf&&(this._sdfMarkers=!0);var F=void 0,R=B.label,G=0;if(R&&(F=_.getShaping(R,B.rtl))&&F.length>0){for(var H=1e30,Y=-1e30,j=0,q=F;j<q.length;j++){var O=q[j];H=Math.min(H,O.x),Y=Math.max(Y,O.x)}G=(Y-H+48)*T*8}for(var K=0,U=B.geometry;K<U.length;K++){var W=U[K],J=void 0;if(x){if(F&&F.length>0&&S&&S.size){var Q=8*S.size*(2+Math.min(2,4*Math.abs(S.offset[1])));e._smoothVertices(W,Q)}J=e._findAnchors(W,y,G)}else J=[new h.Anchor(W[0].x,W[0].y)];for(var X=0,Z=J;X<Z.length;X++){var $=Z[X];$.x<0||$.x>4096||$.y<0||$.y>4096||(x&&G>0&&0===S.rotationAlignment&&!e._honorsTextMaxAngle(W,$,G,E,k)||w.push({shaping:F,line:W,iconMosaicItem:N,anchor:$,iconSize:B.iconSize,iconRotate:B.iconRotate,ddIconValues:B.ddIconValues,textSize:B.textSize,textRotate:B.textRotate,ddTextValues:B.ddTextValues}))}}}w.sort(d);for(var tt=0,et=w;tt<et.length;tt++){var at=et[tt];this._processFeature(at,n,v,u)}this._addPlacedGlyphs()},e.prototype.updateSymbols=function(){this._iconIndexStart=this._iconIndexBuffer.index,this._textIndexStart=this._textIndexBuffer.index,this._iconIndexCount=0,this._textIndexCount=0,this._markerMap.clear(),this._glyphMap.clear();var t,e=this._avoidEdges,a=this.layer,o=a.getLayoutProperty("icon-image");o&&(t=this._getTranslate(!0));var n,i=a.getLayoutProperty("text-field");i&&(n=this._getTranslate(!1));for(var r=this._symbolInstances,s=0,l=r;s<l.length;s++){var h=l[s];this._processFeature(h,t,n,e)}this._addPlacedGlyphs()},e.prototype._getTranslate=function(t){var e=this.layer.getPaintValue(t?"icon-translate":"text-translate",this.zoom);if(0!==e[0]||0!==e[1]){var a=this._placementEngine.mapAngle;if(0!==a&&0===this.layer.getPaintValue(t?"icon-translate-anchor":"text-translate-anchor",this.zoom)){var o=Math.sin(a),n=Math.cos(a);return[8*(e[0]*n-e[1]*o),8*(e[0]*o+e[1]*n)]}return[8*e[0],8*e[1]]}},e.prototype._replaceKeys=function(t,e){return t.replace(/{([^{}]+)}/g,function(t,a){return a in e?e[a]:""})},e.prototype._processFeature=function(t,e,a,o){var n=t.line,r=t.iconMosaicItem,s=t.shaping,h=t.anchor,c=this._iconLayout,d=c&&!!r,x=!0,u=1;if(d){c.size=t.iconSize,c.rotate=t.iconRotate;u=8*c.size,x=c.optional||!r}var y=this._textLayout,p=y&&s&&s.length>0,f=1,m=f,g=!0;p&&(y.size=t.textSize,y.rotate=t.textRotate,f=y.size/24,m=8*f,g=y.optional||!s||0===s.length);var _,v=new i.Point(0,-17);if(d){if(_=this._placementEngine.getIconPlacement(h,e,r,u,n,c,o),_.footprint.minzoom===l.C_INFINITY&&!x)return;h.minzoom>_.footprint.minzoom&&(_.footprint.minzoom=h.minzoom)}var I;if(p&&(I=this._placementEngine.getTextPlacement(h,a,v,s,m,n,y,o))){if(I.footprint.minzoom===l.C_INFINITY&&!g)return;h.minzoom>I.footprint.minzoom&&(I.footprint.minzoom=h.minzoom)}if(!g&&!x||!x&&I&&I.footprint.minzoom!==l.C_INFINITY||!g&&_&&_.footprint.minzoom!==l.C_INFINITY){var b=Math.max(_.footprint.minzoom,I.footprint.minzoom);_.footprint.minzoom=b,I.footprint.minzoom=b}I&&I.footprint.minzoom!==l.C_INFINITY&&(y.ignorePlacement||this._placementEngine.add(I),this._storePlacedGlyphs(I.shapes,I.footprint.minzoom,this.zoom,t.ddTextValues)),_&&_.footprint.minzoom!==l.C_INFINITY&&(c.ignorePlacement||this._placementEngine.add(_),this._addPlacedIcons(_.shapes,_.footprint.minzoom,this.zoom,r.page,t.ddIconValues))},e.prototype._addPlacedIcons=function(t,e,a,o,n){for(var i=Math.max(a+l.log2(e),0),r=this._iconVertexBuffer,s=this._iconIndexBuffer,h=0,c=t;h<c.length;h++){var d=c[h],x=Math.max(a+l.log2(d.minzoom),i),u=Math.min(a+l.log2(d.maxzoom),25);if(!(u<=x)){var y=d.tl,p=d.tr,f=d.bl,m=d.br,g=d.mosaicRect,_=d.labelAngle,v=d.anchor,I=r.index,b=g.x,M=g.y,z=b+g.width,L=M+g.height;r.add(v.x,v.y,y.x,y.y,b,M,_,x,u,i,n),r.add(v.x,v.y,p.x,p.y,z,M,_,x,u,i,n),r.add(v.x,v.y,f.x,f.y,b,L,_,x,u,i,n),r.add(v.x,v.y,m.x,m.y,z,L,_,x,u,i,n),s.add(I+0,I+1,I+2),s.add(I+1,I+2,I+3),this._markerMap.has(o)?this._markerMap.get(o)[1]+=6:this._markerMap.set(o,[this._iconIndexStart+this._iconIndexCount,6]),this._iconIndexCount+=2}}},e.prototype._addPlacedGlyphs=function(){var t=this,e=this._textVertexBuffer,a=this._textIndexBuffer;this._glyphBufferDataStorage.forEach(function(o,n){for(var i=0,r=o;i<r.length;i++){var s=r[i],l=e.index;e.add(s.glyphAnchor[0],s.glyphAnchor[1],s.tl[0],s.tl[1],s.xmin,s.ymin,s.labelAngle,s.minLod,s.maxLod,s.placementLod,s.ddValues),e.add(s.glyphAnchor[0],s.glyphAnchor[1],s.tr[0],s.tr[1],s.xmax,s.ymin,s.labelAngle,s.minLod,s.maxLod,s.placementLod,s.ddValues),e.add(s.glyphAnchor[0],s.glyphAnchor[1],s.bl[0],s.bl[1],s.xmin,s.ymax,s.labelAngle,s.minLod,s.maxLod,s.placementLod,s.ddValues),e.add(s.glyphAnchor[0],s.glyphAnchor[1],s.br[0],s.br[1],s.xmax,s.ymax,s.labelAngle,s.minLod,s.maxLod,s.placementLod,s.ddValues),a.add(l+0,l+1,l+2),a.add(l+1,l+2,l+3),t._glyphMap.has(n)?t._glyphMap.get(n)[1]+=6:t._glyphMap.set(n,[t._textIndexStart+t._textIndexCount,6]),t._textIndexCount+=2}}),this._glyphBufferDataStorage.clear()},e.prototype._storePlacedGlyphs=function(t,e,a,o){for(var n=Math.max(a+l.log2(e),0),i=0,r=t;i<r.length;i++){var s=r[i],h=Math.max(a+l.log2(s.minzoom),n),c=Math.min(a+l.log2(s.maxzoom),25);if(!(c<=h)){var d=s.tl,x=s.tr,u=s.bl,y=s.br,p=s.labelAngle,f=s.anchor,m=s.mosaicRect;this._glyphBufferDataStorage.has(s.page)||this._glyphBufferDataStorage.set(s.page,[]);this._glyphBufferDataStorage.get(s.page).push({glyphAnchor:[f.x,f.y],tl:[d.x,d.y],tr:[x.x,x.y],bl:[u.x,u.y],br:[y.x,y.y],xmin:m.x,ymin:m.y,xmax:m.x+m.width,ymax:m.y+m.height,labelAngle:p,minLod:h,maxLod:c,placementLod:n,ddValues:o})}}},e._findAnchors=function(t,e,a){e+=a;for(var o=0,n=t.length-1,r=0;r<n;r++)o+=i.Point.distance(t[r],t[r+1]);var s=a||e;if(s*=.5,o<=s)return[];var c=s/o;e=o/Math.max(Math.round(o/e),1);for(var d=0,x=-e/2,u=[],y=t.length-1,r=0;r<y;r++){for(var p=t[r],f=t[r+1],m=f.x-p.x,g=f.y-p.y,_=Math.sqrt(m*m+g*g),v=void 0;x+e<d+_;){x+=e;var I=(x-d)/_,b=l.interpolate(p.x,f.x,I),M=l.interpolate(p.y,f.y,I);void 0===v&&(v=Math.atan2(g,m)),u.push(new h.Anchor(b,M,v,r,c))}d+=_}return u},e.deviation=function(t,e,a){var o=(e.x-t.x)*(a.x-e.x)+(e.y-t.y)*(a.y-e.y),n=(e.x-t.x)*(a.y-e.y)-(e.y-t.y)*(a.x-e.x);return Math.atan2(n,o)},e._honorsTextMaxAngle=function(t,e,a,o,n){for(var r=0,s=a/2,l=new i.Point(e.x,e.y),h=e.segment+1;r>-s;){if(--h<0)return!1;r-=i.Point.distance(t[h],l),l=t[h]}r+=i.Point.distance(t[h],t[h+1]);for(var c=[],d=0,x=t.length;r<s;){var u=t[h],y=h,p=void 0;do{if(++y===x)return!1;p=t[y]}while(p.isEqual(u));var f=y,m=void 0;do{if(++f===x)return!1;m=t[f]}while(m.isEqual(p));var g=this.deviation(u,p,m);for(c.push({deviation:g,distToAnchor:r}),d+=g;r-c[0].distToAnchor>n;)d-=c.shift().deviation;if(Math.abs(d)>o)return!1;r+=i.Point.distance(p,m),h=y}return!0},e._smoothVertices=function(t,e){if(!(e<=0)){var a=t.length;if(!(a<3)){var o=[],n=0;o.push(0);for(var r=1;r<a;r++)n+=i.Point.distance(t[r],t[r-1]),o.push(n);e=Math.min(e,.2*n);var s=[];s.push(t[0].x),s.push(t[0].y);var l=t[a-1].x,h=t[a-1].y,c=i.Point.sub(t[0],t[1]);c.normalize(),t[0].x+=e*c.x,t[0].y+=e*c.y,c.assignSub(t[a-1],t[a-2]),c.normalize(),t[a-1].x+=e*c.x,t[a-1].y+=e*c.y;for(var r=1;r<a;r++)o[r]+=e;o[a-1]+=e;for(var d=.5*e,r=1;r<a-1;r++){for(var x=0,u=0,y=0,p=r-1;p>=0&&!(o[p+1]<o[r]-d);p--){var f=d+o[p+1]-o[r],m=o[p+1]-o[p],g=o[r]-o[p]<d?1:f/m;if(Math.abs(g)<1e-6)break;var _=g*g,v=g*f-.5*_*m,I=g*m/e,b=t[p+1],M=t[p].x-b.x,z=t[p].y-b.y;x+=I/v*(b.x*g*f+.5*_*(f*M-m*b.x)-_*g*m*M/3),u+=I/v*(b.y*g*f+.5*_*(f*z-m*b.y)-_*g*m*z/3),y+=I}for(var p=r+1;p<a&&!(o[p-1]>o[r]+d);p++){var f=d-o[p-1]+o[r],m=o[p]-o[p-1],g=o[p]-o[r]<d?1:f/m;if(Math.abs(g)<1e-6)break;var _=g*g,v=g*f-.5*_*m,I=g*m/e,b=t[p-1],M=t[p].x-b.x,z=t[p].y-b.y;x+=I/v*(b.x*g*f+.5*_*(f*M-m*b.x)-_*g*m*M/3),u+=I/v*(b.y*g*f+.5*_*(f*z-m*b.y)-_*g*m*z/3),y+=I}s.push(x/y),s.push(u/y)}s.push(l),s.push(h);for(var r=0,p=0;r<a;r++)t[r].x=s[p++],t[r].y=s[p++]}}},e._bidiEngine=new n,e}(s)});