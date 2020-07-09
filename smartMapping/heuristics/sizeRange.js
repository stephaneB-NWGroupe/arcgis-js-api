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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","tslib","../../core/compilerUtils","../../core/Error","../../core/maybe","../../core/screenUtils","../../geometry/support/scaleUtils","../../renderers/visualVariables/SizeVariable","./scaleRange","../support/utils"],(function(e,n,l,a,r,i,t,s,o,c,u){var v=[10,8,4,2],p=[100,100,60,30],f=[2,1,.75,.5],m=[32,18,12,6],w=[{level:0,resolution:156543.03392800014,scale:591657527.591555},{level:1,resolution:78271.51696399994,scale:295828763.795777},{level:2,resolution:39135.75848200009,scale:147914381.897889},{level:3,resolution:19567.87924099992,scale:73957190.948944},{level:4,resolution:9783.93962049996,scale:36978595.474472},{level:5,resolution:4891.96981024998,scale:18489297.737236},{level:6,resolution:2445.98490512499,scale:9244648.868618},{level:7,resolution:1222.992452562495,scale:4622324.434309},{level:8,resolution:611.4962262813797,scale:2311162.217155},{level:9,resolution:305.74811314055756,scale:1155581.108577},{level:10,resolution:152.87405657041106,scale:577790.554289},{level:11,resolution:76.43702828507324,scale:288895.277144},{level:12,resolution:38.21851414253662,scale:144447.638572},{level:13,resolution:19.10925707126831,scale:72223.819286},{level:14,resolution:9.554628535634155,scale:36111.909643},{level:15,resolution:4.77731426794937,scale:18055.954822},{level:16,resolution:2.388657133974685,scale:9027.977411},{level:17,resolution:1.1943285668550503,scale:4513.988705},{level:18,resolution:.5971642835598172,scale:2256.994353},{level:19,resolution:.29858214164761665,scale:1128.497176}];function g(e){return l.__awaiter(this,void 0,void 0,(function(){var n,a,t,s,o,c,v,p;return l.__generator(this,(function(f){switch(f.label){case 0:if(n=e.view,!(e&&n&&e.layer))throw new r("size-range:missing-parameters","'view' and 'layer' parameters are required");if(a=[0,2,3,1],t=e.layer,s=l.__rest(e,["layer"]),o=u.createLayerAdapter(t,a),c=l.__assign({layerAdapter:o},s),!o)throw new r("size-range:invalid-parameters","'layer' must be one of these types: "+u.getLayerTypeLabels(a).join(", "));return[4,n.when()];case 1:return f.sent(),v=i.isSome(c.signal)?{signal:c.signal}:null,[4,o.load(v)];case 2:if(f.sent(),"point"!==(p=o.geometryType)&&"multipoint"!==p&&"polyline"!==p&&"polygon"!==p)throw new r("size-range:not-supported","sizeRange is not supported for geometryType: "+p);return[2,c]}}))}))}function h(e,n){var l=e.view,a=n.minScale||1e8,r=l.constraints&&"effectiveLODs"in l.constraints&&l.constraints.effectiveLODs||w,i=[];for(var t in r){if(!(r[t].scale>a)){for(var s=Number(t),o=0,c=[s-3,s,s+3,s+6];o<c.length;o++){var u=c[o];u>-1&&u<r.length&&i.push(r[u].scale)}break}}return i.sort((function(e,n){return e-n}))}function S(e,n){var l=h(e,{minScale:n.minScale,maxScale:n.maxScale});if(!l.length)throw new r("scale-range:insufficient-info","not enough scale values");return{minSize:new o({valueExpression:"$view.scale",stops:l.map((function(e,n){return{value:e,size:t.px2pt(v[n])}}))}),maxSize:new o({valueExpression:"$view.scale",stops:l.map((function(e,n){return{value:e,size:t.px2pt(p[n])}}))})}}function x(e,n){var l=h(e,{minScale:n.minScale,maxScale:n.maxScale});if(!l.length)throw new r("scale-range:insufficient-info","not enough scale values");return{minSize:new o({valueExpression:"$view.scale",stops:l.map((function(e,n){return{value:e,size:t.px2pt(f[n])}}))}),maxSize:new o({valueExpression:"$view.scale",stops:l.map((function(e,n){return{value:e,size:t.px2pt(m[n])}}))})}}function y(e,n){var l=n.spatialStatistics,a=n.minScale,i=n.maxScale;if(!("avgSize"in l&&l.avgSize))throw new r("size-range:insufficient-info","average polygon size is invalid");var c=l.avgSize,u=e.view,v=u.resolution/u.scale,p=function(e,n){var l=e.view,a=e.layerAdapter,r=a.fullExtent,i=a.minScale||1128.497176,t=a.maxScale||591657527.591555,o=n.minScale||0,c=n.maxScale||0,u=r?s.getScale(l,r):0;return{scales:[i,t,o,c,u=u<i&&u>t?u:0].map(Math.round).sort((function(e,n){return e-n})).filter((function(e,n,l){return!!e&&l.indexOf(e)===n})).filter((function(e,n,l){return!n||Math.abs(e-l[n-1])>5})),fullExtentScale:u}}(e,{minScale:a,maxScale:i}),f=p.scales,m=p.fullExtentScale,w=[],g=[];return f.forEach((function(e,n){var l=function(e,n){var l=Math.ceil(e/n),a=Math.ceil(l/4);a<4?a=4:a>16&&(a=16);var r=5*a;return{min:a,max:r<50?50:r}}(c,v*e),a=l.min,r=l.max,i=f.indexOf(m),s=i>-1&&n>i?2:1;w.push({value:e,size:t.px2pt(a/s)}),g.push({value:e,size:t.px2pt(r/s)})})),{minSize:new o({valueExpression:"$view.scale",stops:w}),maxSize:new o({valueExpression:"$view.scale",stops:g})}}return function(e){return l.__awaiter(this,void 0,void 0,(function(){var n,r,i,t,s,o;return l.__generator(this,(function(l){switch(l.label){case 0:return[4,g(e)];case 1:return n=l.sent(),r=n.view,i=n.layerAdapter,t=n.signal,[4,c({layer:i,view:r,signal:t})];case 2:switch(s=l.sent(),o=i.geometryType){case"point":case"multipoint":return[2,S(n,s)];case"polyline":return[2,x(n,s)];case"polygon":return[2,y(n,s)];case"mesh":case"multipatch":return[2,null];default:a.neverReached(o)}return[2,null]}}))}))}}));