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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/has","dojo/_base/array","dojo/_base/json","dojo/_base/connect","dojo/_base/Color","dojo/dom-class","dojo/dom-style","dojo/json","dojo/string","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/form/HorizontalSlider","dijit/form/HorizontalRule","dijit/form/HorizontalRuleLabels","../../kernel","../../lang","./utils","./RasterAnalysisMixin","dojo/i18n!../../nls/jsapi","dojo/text!./templates/InterpolatePointsEBK.html"],function(t,e,i,s,o,n,r,l,a,u,h,p,d,c,f,_,m,g,O,b,z,C,v,S,I,N){var E=e([d,c,f,_,m,S],{declaredClass:"esri.dijit.analysis.InterpolatePointsEBK",templateString:N,widgetsInTemplate:!0,inputLayer:null,interpolateField:null,interpolateOption:5,cellUnit:null,cellsize:null,predictionError:null,transform:null,numberOfNeighbors:null,sizeOfModels:null,toolName:"InterpolatePointsEBK",helpFileName:"InterpolatePointsEBK",toolNlsName:I.interpolatePointsEBKTool,rasterGPToolName:"InterpolatePoints",resultParameter:"outputRaster",returnProcessInfo:!0,constructor:function(t,e){if(this._pbConnects=[],t.containerNode&&(this.container=t.containerNode),t.rerun){t.inputLayer=t.inputPointFeatures,t.transform=t.transformData,t.sizeOfModels=t.sizeOfLocalModels,t.cellsize=t.outputCellSize&&t.outputCellSize.distance,t.cellUnit=t.outputCellSize&&t.outputCellSize.units,t.predictionError=t.outputPredictionError,t.outputErrorLayerName=t.outputErrorRaster;var i=t.optimizeFor;i&&(t.interpolateOption="SPEED"===i?1:"BALANCE"===i?5:9),this._sizeChanged=!0,this._numberChanged=!0,this._transformChanged=!0}},_getJobParameters:function(){var t=n.toJson(v.constructAnalysisInputLyrObj(this.get("inputLayer"))),e=this.get("interpolateField"),i=this.get("interpolateOption"),s={distance:this.get("cellsize"),units:this.get("cellSizeUnit")},o=this.get("transform"),r=this.get("sizeOfLocalModels"),l=this.get("numberOfNeighbors"),a=this.get("predictionError"),u=1==i?"SPEED":5==i?"BALANCE":"ACCURACY";return a&&(this.resultParameter=["outputRaster","outputErrorRaster"]),{inputPointFeatures:t,interpolateField:e,optimizeFor:u,transformData:o,sizeOfLocalModels:r,numberOfNeighbors:l,outputCellSize:h.stringify(s),outputPredictionError:a,outputErrorRaster:a?this.outputErrorLayerName:null}},_setDefaultInputs:function(){this.set("interpolateFields",this.interpolateField),this._cellSizeUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this.cellsize&&this._outputCellSizeInput.set("value",this.cellsize),this.cellUnit&&this._cellSizeUnitsSelect.set("value",this.cellUnit),this.interpolateOption&&this.set("interpolateOption",this.interpolateOption),this.transform&&this._transformCheck.set("checked",this.transform),this.sizeOfModels&&(this._sizeOfLocalModelsInput.textbox.value=this.sizeOfModels),this.numberOfNeighbors&&(this._numberOfNeighborsInput.textbox.value=this.numberOfNeighbors),this.predictionError&&this._predictionErrorCheck.set("checked",this.predictionError),this._sizeOfLocalModelsInput.set("rangeMessage",this.i18n.sizeOfLocalModelsInValidMsg),this._numberOfNeighborsInput.set("rangeMessage",this.i18n.numberOfNeighborsInValidMsg),this._outputCellSizeInput.set("rangeMessage",this.i18n.cellsizeInValidMsg)},_resetUI:function(){this.set("interpolateFields",this.interpolateField),this.outputErrorLayerName=p.substitute(this.i18n.outputErrorLayerName,{layername:this.inputLayer.name}),this.outputTableName=p.substitute(this.i18n.outputTableName,{layername:this.inputLayer.name})},_handleOptionsBtnClick:function(){a.contains(this._optionsDiv,"disabled")||(a.contains(this._optionsDiv,"optionsClose")?(a.remove(this._optionsDiv,"optionsClose"),a.add(this._optionsDiv,"optionsOpen")):a.contains(this._optionsDiv,"optionsOpen")&&(a.remove(this._optionsDiv,"optionsOpen"),a.add(this._optionsDiv,"optionsClose")))},_handleOptimizeSliderChange:function(t){this.set("interpolateOption",this._optimizeSlider.get("value")),this._transformChanged||this._transformCheck.set("checked",9===this.interpolateOption),this._sizeChanged||this.set("sizeOfLocalModels",1===this.interpolateOption?50:5===this.interpolateOption?75:100),this._numberChanged||this.set("numberOfNeighbors",1===this.interpolateOption?8:5===this.interpolateOption?10:15)},_handleOptionalOutputsBtnClick:function(){a.contains(this._optionalOutputsDiv,"disabled")||(a.contains(this._optionalOutputsDiv,"optionsClose")?(a.remove(this._optionalOutputsDiv,"optionsClose"),a.add(this._optionalOutputsDiv,"optionsOpen")):a.contains(this._optionalOutputsDiv,"optionsOpen")&&(a.remove(this._optionalOutputsDiv,"optionsOpen"),a.add(this._optionalOutputsDiv,"optionsClose")))},_handleSizeOfLocalModelsChange:function(){this._sizeChanged=!0},_handleNumberOfNeighborsChange:function(){this._numberChanged=!0},_handleTransformChange:function(){this._transformChanged=!0},_setInterpolateFieldsAttr:function(t){if(this.inputLayer){var e=this.inputLayer.fields;this._interpolateFieldSelect.removeOption(this._interpolateFieldSelect.getOptions()),o.forEach(e,function(t){-1!==o.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],t.type)&&t.name!==this.inputLayer.objectIdField&&this._interpolateFieldSelect.addOption({value:t.name,label:C.isDefined(t.alias)&&""!==t.alias?t.alias:t.name})},this),t&&this._interpolateFieldSelect.set("value",t)}},_setInterpolateFieldAttr:function(t){this.interpolateField=t},_getInterpolateFieldAttr:function(){return this._interpolateFieldSelect&&this._interpolateFieldSelect.get("value")&&(this.interpolateField=this._interpolateFieldSelect.get("value")),this.interpolateField},_getCellsizeAttr:function(){return this._outputCellSizeInput&&this._outputCellSizeInput.get("value")&&(this.cellsize=this._outputCellSizeInput.get("value")),this.cellsize},_setCellsizeAttr:function(t){this.cellsize=t},_getCellSizeUnitAttr:function(){return this._cellSizeUnitsSelect&&this._cellSizeUnitsSelect.get("value")&&(this.cellUnit=this._cellSizeUnitsSelect.get("value")),this.cellUnit},_setCellSizeUnitAttr:function(t){this.cellUnit=t},_setSizeOfLocalModelsAttr:function(t){this.sizeOfModels=t,this._sizeOfLocalModelsInput.textbox.value=t},_getSizeOfLocalModelsAttr:function(){return this._sizeOfLocalModelsInput&&this._sizeOfLocalModelsInput.get("value")&&(this.sizeOfModels=this._sizeOfLocalModelsInput.get("value")),this.sizeOfModels},_setNumberOfNeighborsAttr:function(t){this.numberOfNeighbors=t,this._numberOfNeighborsInput.textbox.value=t},_getNumberOfNeighborsAttr:function(){return this._numberOfNeighborsInput&&this._numberOfNeighborsInput.get("value")&&(this.numberOfNeighbors=this._numberOfNeighborsInput.get("value")),this.numberOfNeighbors},_setInterpolateOptionAttr:function(t){this.interpolateOption=t,this._optimizeSlider.set("value",this.interpolateOption)},_getInterpolateOptionAttr:function(){return this._optimizeSlider&&(this.interpolateOption=Math.floor(this._optimizeSlider.get("value"))),this.interpolateOption},_setTransformAttr:function(t){this.transform=t,this._transformCheck.get("checked",t)},_getTransformAttr:function(){return this._transformCheck&&(this.transform=this._transformCheck.get("checked")),this.transform},_setPredictionErrorAttr:function(t){this.predictionError=t,this._predictionErrorCheck.set("value",t)},_getPredictionErrorAttr:function(){return this._predictionErrorCheck&&(this.predictionError=this._predictionErrorCheck.get("checked")),this.predictionError}});return s("extend-esri")&&i.setObject("dijit.analysis.InterpolatePointsEBK",E,z),E});