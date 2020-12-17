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

define(["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojox/charting/plot2d/CartesianBase","dojox/charting/plot2d/_PlotEvents","dojox/charting/plot2d/common","dojox/lang/utils","dojox/lang/functional","dojox/lang/functional/reversed","./labelsRendering/_BarsLabelRenderingFix","./animation/_ClusteredBarsAnimation","./_MinVisibleBar"],(function(t,e,a,i,r,s,n,h,o,l,u,d){var c=o.lambda("item.purgeGroup()");return a("dojox.charting.plot2d.Bars",[i,r,l,u,d],{_mainShapes:null,_animationInfos:null,_noCrispEdges:!1,defaultParams:{gap:0,animate:null},optionalParams:{minBarSize:1,maxBarSize:1},constructor:function(e,a){this.opt=t.clone(t.mixin(this.opt,this.defaultParams)),n.updateWithObject(this.opt,a),n.updateWithPattern(this.opt,a,this.optionalParams),this.animate=this.opt.animate,this.renderingOptions=this._noCrispEdges?null:{"shape-rendering":"crispEdges"}},getSeriesStats:function(){var t,e=s.collectSimpleStats(this.series,(function(t){return null==t}));return e.hmin-=.5,e.hmax+=.5,t=e.hmin,e.hmin=e.vmin,e.vmin=t,t=e.hmax,e.hmax=e.vmax,e.vmax=t,e},render:function(t,a){if(!this.chart.isPreRenderMode){var i;this.dirty=this.isDirty(),this.resetEvents(),this.dirty&&(e.forEach(this.series,c),this._eventSeries={},this.cleanGroup(),i=this.getGroup(),h.forEachRev(this.series,(function(t){t.cleanGroup(i)})));var r=this.chart.theme,s=this._hScaler.scaler.getTransformerFromModel(this._hScaler),n=this._vScaler.scaler.getTransformerFromModel(this._vScaler),o=Math.max(r.series.baseLineValue||0,this._hScaler.bounds.lower),l=s(o),u=this.events(),d=this.getBarProperties();this._mainShapes=[],this._animationInfos=[];var m=this.extractValues(this._vScaler);m=this.rearrangeValues(m,s,l);for(var p=this.series.length-1;p>=0;--p){var f=this.series[p];if(this.dirty||f.dirty){f.cleanGroup();var g=r.next("bar",[this.opt,f]),v=new Array(f.data.length);i=f.group;for(var _=e.some(f.data,(function(t){return"number"==typeof t||t&&!t.hasOwnProperty("x")})),x=_?Math.max(0,Math.floor(this._vScaler.bounds.from-1)):0,y=_?Math.min(f.data.length,Math.ceil(this._vScaler.bounds.to)):f.data.length,b=x;b<y;++b){var S=f.data[b];if(null!=S){var M,B=this.getValue(S,b,p,_),j=(s(B.y),m[p][b]);if(this.opt.styleFunc||"number"!=typeof S){var P="number"!=typeof S?[S]:[];this.opt.styleFunc&&P.push(this.opt.styleFunc(S)),M=r.addMixin(g,"bar",P,!0)}else M=r.post(g,"bar");if(d.height>=1){var E={x:a.l+l+Math.min(j,0),y:t.height-a.b-n(B.x+1.5)+d.gap+d.thickness*this._getYShift(p,r),width:Math.abs(j),height:d.height},V=this._drawBar(i,S,E,M,t,a,f,l,b),w=V.shape;if(r.series.isEditMode&&(w.rawNode.style.cursor="pointer"),w.value=S,this._mainShapes.push(w),E=V.rect,u){var z={element:"bar",index:b,run:f,shape:w,cx:B.y,cy:B.x+1.5,x:_?b:f.data[b].x,y:_?f.data[b]:f.data[b].y};this._connectEvents(z),v[b]=z}if(this.createLabel(i,S,E,M,t,a,o),this.animate){var C={shape:w,hoffset:a.l+l,hsize:-j};this._animationInfos.push(C),this._animateBar(C)}}}}this._eventSeries[f.name]=v,f.dirty=!1}else r.skip(),this._reconnectEvents(f.name)}return this._renderLabels(M,t,a,i),this.dirty=!1,this}},getMainShapes:function(){return this._mainShapes},_drawBar:function(t,e,a,i,r,s,n,h,o){},_getYShift:function(t,e){return e.series.renderColumnBarsInOppositeDirections&&t>=this.series.length/2?t-this.series.length/2:t},getValue:function(t,e,a,i){var r,s;return i?(r="number"==typeof t?t:t.y,s=e):(r=t.y,s=t.x-1),{y:r,x:s}},extractValues:function(t){for(var a=[],i=this.series.length-1;i>=0;--i){var r=this.series[i];if(this.dirty||r.dirty){var s=e.some(r.data,(function(t){return"number"==typeof t||t&&!t.hasOwnProperty("x")})),n=s?Math.max(0,Math.floor(t.bounds.from-1)):0,h=s?Math.min(r.data.length,Math.ceil(t.bounds.to)):r.data.length,o=a[i]=[];o.min=n,o.max=h;for(var l=n;l<h;++l){var u=r.data[l];o[l]=this.isNullValue(u)?0:"number"==typeof u?u:u.y}}}return a},rearrangeValues:function(t,e,a){for(var i=0,r=t.length;i<r;++i){var s=t[i];if(s)for(var n=s.min,h=s.max;n<h;++n){var o=s[n];s[n]=this.isNullValue(o)?0:e(o)-a}}return t},getBarProperties:function(){var t=s.calculateBarSize(this._vScaler.bounds.scale,this.opt,this._getClusterSize());return{gap:t.gap,height:t.size,thickness:t.size}},_getClusterSize:function(){var t=this.series.length;return this.chart.theme.series.renderColumnBarsInOppositeDirections?Math.round(t/2):t}})}));