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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/_base/connect","dojo/sniff","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dijit/Tooltip","dojox/charting/action2d/Tooltip","dojox/lang/functional","dojox/gfx/matrix","./_BuilderUtil","./_ColumnBarChartTooltipBuilder","./_GaugeChartTooltipBuilder","./_LineChartTooltipBuilder","./_PieDonutRingChartTooltipBuilder","../chartUtils/ChartTypes","../../supportClasses/conditionalStyling/ConditionalStyleLegendBuilder","esri/dijit/geoenrichment/utils/DomUtil","dojo/i18n!../../../../../../nls/jsapi"],function(t,e,o,i,a,n,r,s,l,d,h,c,u,p,_,f,T,y,m,C,g){g=g.geoenrichment.dijit.ReportPlayer.ChartTooltip;var v=Math.PI/4,b=Math.PI/2,x={_nodeInLayoutCheckHandle:null,_rawNode:null,_node:null,show:function(t,e,o,i){e&&(this.hide(e),l.show(t,e,o),this._setClasses(!0),this._setListeners(e,i))},hide:function(t){l.hide(t),this._setClasses(!1),this._setListeners(null,null)},_setClasses:function(t){l._masterTT&&(n[t?"add":"remove"](l._masterTT.domNode,"esriGEChartContainer_chartTooltip_masterTooltip"),n[t?"add":"remove"](l._masterTT.containerNode,"esriGEChartContainer_chartTooltip_containerNode"))},_setListeners:function(t,e){var o=this;clearInterval(this._nodeInLayoutCheckHandle),e&&(this._node=t,this._rawNode=e,this._nodeInLayoutCheckHandle=setInterval(function(){C.isNodeInLayout(o._rawNode)||o.hide(o._node)},500))}};return t(d,{showStatistics:!0,_chartType:null,constructor:function(){var t=this,e=function(e,o){var i=e.run&&e.run.data&&e.run.data[e.index];if(i.tooltip&&"object"==typeof i.tooltip)return t._renderTooltip(i.tooltip)},o=this.text;this.text=function(t,i){return e(t)||o(t,i)}},process:function(t){function n(){e.mixin(d,r())}function r(){var e=t.shape.rawNode.getBoundingClientRect(),o=s.position(l.chart.node,!0);return{x:e.left-o.x,y:e.top-o.y,w:e.width,h:e.height}}var l=this;if("onplotreset"===t.type||"onmouseout"===t.type)return x.hide(this.aroundRect),this.aroundRect=null,void("onplotreset"===t.type&&delete this.angles);if(!(!t.shape||this.mouseOver&&"onmouseover"!==t.type||!this.mouseOver&&"onclick"!==t.type)){var d={type:"rect"},u=["after-centered","before-centered"];if(y.isPictureLike(this._chartType))n();else{switch(t.element){case"marker":case"circle":case"spider_circle":case"spider_plot":case"candlestick":n();break;case"column":u=["above-centered","below-centered"];case"bar":n();break;default:if(!this.angles){var p="number"==typeof t.run.data[0]?h.map(t.run.data,"x ? Math.max(x, 0) : 0"):h.map(t.run.data,"x ? Math.max(x.y, 0) : 0");this.angles=h.map(h.scanl(p,"+",0),"* 2 * Math.PI / this",h.foldl(p,"+",0))}var _=c._degToRad(t.plot.opt.startAngle),f=(this.angles[t.index]+this.angles[t.index+1])/2+_;n(),_&&(f<0||f>2*Math.PI)&&(f=Math.abs(2*Math.PI-Math.abs(f))),f<v||(f<b+v?u=["below-centered","above-centered"]:f<Math.PI+v?u=["before-centered","after-centered"]:f<2*Math.PI-v&&(u=["above-centered","below-centered"]))}a("dojo-bidi")&&this._recheckPosition(t,d,u)}var T=this.chart.getCoords();d.x+=T.x,d.y+=T.y,d.x=Math.round(d.x),d.y=Math.round(d.y),d.w=Math.ceil(d.w),d.h=Math.ceil(d.h),this.aroundRect=d;var m=this.text(t,this.plot);m&&x.show(this._format(m),this.aroundRect,u,t.shape.rawNode),this.mouseOver||(this._handle=i.connect(o.doc,"onclick",this,"onClick"))}},setChartType:function(t){this._chartType=t},_renderTooltip:function(t){var e=r.create("div",{class:"esriGEChartContainer_chartTooltip"},document.body);if(this.showStatistics)this._chartType===y.PIE||this._chartType===y.DONUT||this._chartType===y.RING?T.buildPieDonutRingChartTooltip(t,e):this._chartType===y.GAUGE?_.buildGaugeChartTooltip(t,e):y.isColumnBarLike(this._chartType)?p.buildColumnChartTooltip(t,e):this._chartType===y.LINE&&f.buildLineChartTooltip(t,e);else{u.addTitle(e,t.label,t.color);var o=r.create("div",{class:"chartTooltip_row esriGERowHigh"},e);t.fieldInfo&&u.addValue((t.fieldInfo.script?t.fieldInfo.script.alias:t.fieldInfo.alias)||"",o)}t.conditionalStyling&&(this.showStatistics||r.create("div",{class:"chartTooltip_row",style:"margin-top:30px;margin-left:10px;",innerHTML:g.colorOfBackWillDependOnValue},e),r.place(m.createLegendNode(t.conditionalStyling,"chart",t.value),e));var i=e.outerHTML;return r.destroy(e),i}})});