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

define(["dojo/_base/declare","dojo/_base/lang","dojo/string","dojo/dom-construct","./ZoomSupportTooltip","./_BuilderUtil","./_ColumnBarChartTooltipBuilder","./_GaugeChartTooltipBuilder","./_WaffleChartTooltipBuilder","./_LineChartTooltipBuilder","./_PieDonutRingChartTooltipBuilder","../utils/ChartTypes","../../supportClasses/conditionalStyling/ConditionalStyleLegendBuilder","../../dataDrilling/DataDrillingVisualizer","../../supportClasses/WidgetQueryUtil","dojo/i18n!esri/nls/jsapi"],(function(i,t,e,o,l,n,a,r,s,d,h,c,u,p,f,g){g=g.geoenrichment.dijit.ReportPlayer.ChartTooltip;var v={lastShownInfo:null,setInfo:function(i){v.lastShownInfo=i,i&&setTimeout((function(){v.lastShownInfo===i&&(v.lastShownInfo=null)}),6e4)}};function T(i,t,e){i._hide();var o=new p({viewModel:t.viewModel,theme:t.theme,parentWidget:t.chartContainer,getPreviewValueFunction:n.buldPreviewValueFunction(t,{type:"dataDrilling"}),domNode:e,closeZoomedDDWhenClickedOutside:!0,closeZoomedDDOnEsc:!0,onClose:function(){o.play(!1,!0)}});o.play(!0,!0,null,t.dataDrillingPanelInfo.sectionJson)}var w=i(l,{tooltipClass:"esriGEChartContainer_chartTooltip_masterTooltip",_chartType:null,constructor:function(){var i=this,t=this.text;this.text=function(e,o){return function(t,e){var o=t.run&&t.run.data&&t.run.data[t.index];if(o.tooltip&&"object"==typeof o.tooltip)return i._renderTooltip(o.tooltip)}(e)||t(e,o)}},_needSetRectFromShape:function(){return c.isPictureLike(this._chartType)},setChartType:function(i){this._chartType=i},_renderTooltip:function(i){var e=!(i=t.mixin({},i,i.getContext())).viewModel.dynamicReportInfo,l=e&&!i.viewModel.isGraphicStyle,n=!f.isDataDrillingView(i.chartContainer);(i.viewModel.enableDataDrilling||e)&&n||delete i.dataDrillingPanelInfo;var a=o.create("div",{class:"esriGEChartContainer_chartTooltip"},document.body);if(l)this._buildVariableNamePreview(i,a);else if(i.richTextFieldInfo||i.showTitle||i.showValue||i.showMin||i.showMax||i.showAvg||i.showWeight||i.showConditional||i.dataDrillingPanelInfo)this._buildTooltip(i,a,e,n);else{if(!e)return{node:null};o.create("div",{class:"chartTooltip_row esriGERowHigh",innerHTML:g.noTooltipAvailable},a)}return v.setInfo(i.dataDrillingPanelInfo&&i.dataDrillingPanelInfo.showOnClick&&!e?{tooltip:this,info:i,root:a}:null),document.body.removeChild(a),{node:a,style:i.tooltipStyle}},_buildTooltip:function(i,t,l,n){var p=this;if(this._chartType===c.PIE||this._chartType===c.DONUT||this._chartType===c.RING?h.buildPieDonutRingChartTooltip(i,t):this._chartType===c.GAUGE?r.buildGaugeChartTooltip(i,t):this._chartType===c.WAFFLE?s.buildWaffleChartTooltip(i,t):c.isColumnBarLike(this._chartType)?a.buildColumnChartTooltip(i,t):c.isLineLike(this._chartType)&&d.buildLineChartTooltip(i,t),i.conditionalStyling&&i.showConditional&&o.place(u.createLegendNode(i.conditionalStyling,"chart",i.isBenchmarked?i.unbenchmarkedValue:i.value),t),i.dataDrillingPanelInfo||l&&n){var f=o.create("div",{class:"chartTooltip_row esriGERowHigh esriGECenter",style:"margin-top:20px;"},t),v=l&&!i.dataDrillingPanelInfo;v||o.create("div",{class:"dijitInline esriGESpaceAfterMedium",innerHTML:e.substitute('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="${fill}" d="M30 28v1H3V4h1v24h2v-9h6v9h2V6h6v22h2V13h6v15h2z"/></svg>',{fill:i.tooltipLinkStyle.color})},f);var w=l?i.dataDrillingPanelInfo?g.drillForMoreDataEdit:g.addDataDrilling:g.drillForMoreData,C=o.create("div",{class:"dijitInline esriGELink",innerHTML:w},f);v||(C.style.color=i.tooltipLinkStyle.color),C.addEventListener("click",(function(){l?(p._hide(),i.chartContainer.onShowDataDrillingPreview(i)):T(p,i,t)}))}},_buildVariableNamePreview:function(i,t){var e=o.create("div",{class:"chartTooltip_row esriGERowHigh"},t);n.addValue((i.fieldInfo.script?i.fieldInfo.script.alias:i.fieldInfo.alias)||"",e)}});return w.tryShowDataDrillingForShownTooltip=function(){var i=v.lastShownInfo;i&&T(i.tooltip,i.info,i.root)},w}));