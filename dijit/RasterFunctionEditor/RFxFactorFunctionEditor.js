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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/json","dojo/has","dojox/lang/functional/object","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/form/Select","./RFxGridBase","../../kernel","dojo/text!../../layers/support/rasterFunctionResources.json","dojo/i18n!../../nls/jsapi","dojo/text!./templates/RFxFactorFunctionEditor.html"],(function(t,e,i,o,n,r,a,c,s,u,l,h,f,d,F){var g=o.parse(f).dataTypes,p=t("RFxFactorFunctionEditor",[a,c,s],{baseClass:"esri-rfx-factor-function-editor",widgetsInTemplate:!0,templateString:F,factorFunctionTypesGrid:null,factorFunctionTypesSelect:null,factorFunctionMode:null,verticalFactorTypes:{BINARY:"factorFunctionBinary",LINEAR:"factorFunctionLinear",SYM_LINEAR:"factorFunctionSymLinear",INVERSE_LINEAR:"factorFunctionInvLinear",SYM_INVERSE_LINEAR:"factorFunctionSymInvLinear",COS:"factorFunctionCos",SEC:"factorFunctionSec",COS_SEC:"factorFunctionCosSec",SEC_COS:"factorFunctionSecCos",TABLE:"factorFunctionTable"},horizontalFactorTypes:{BINARY:"factorFunctionBinary",FORWARD:"factorFunctionForward",LINEAR:"factorFunctionLinear",INVERSE_LINEAR:"factorFunctionInvLinear",TABLE:"factorFunctionTable"},factorFunctionTypeModifiers:{zeroFactor:"factorFunctionZeroFactor",cutAngle:"factorFunctionCutAngle",sideValue:"factorFunctionSideFactor",slope:"factorFunctionSlope",lowCutAngle:"factorFunctionLowCutAngle",highCutAngle:"factorFunctionHighCutAngle",power:"localPower",cosPower:"factorFunctionCosPower",secPower:"factorFunctionSecPower",table:"factorFunctionTablePath"},verticalFactorModifiers:{BINARY:{zeroFactor:1,lowCutAngle:-30,highCutAngle:30},LINEAR:{zeroFactor:1,lowCutAngle:-90,highCutAngle:90,slope:1/90},SYM_LINEAR:{zeroFactor:1,lowCutAngle:-90,highCutAngle:90,slope:1/90},INVERSE_LINEAR:{zeroFactor:1,lowCutAngle:-45,highCutAngle:45,slope:-1/45},SYM_INVERSE_LINEAR:{zeroFactor:1,lowCutAngle:-45,highCutAngle:45,slope:-1/45},COS:{lowCutAngle:-90,highCutAngle:90,power:1},SEC:{lowCutAngle:-90,highCutAngle:90,power:1},COS_SEC:{lowCutAngle:-90,highCutAngle:90,cosPower:1,secPower:1},SEC_COS:{lowCutAngle:-90,highCutAngle:90,cosPower:1,secPower:1}},horizotalFactorModifiers:{BINARY:{zeroFactor:1,cutAngle:45},FORWARD:{zeroFactor:.5,sideValue:1},LINEAR:{zeroFactor:.5,cutAngle:181,slope:1/90},INVERSE_LINEAR:{zeroFactor:2,cutAngle:180,slope:-1/90}},constructor:function(){this.inherited(arguments),this._i18n=d.rasterFunctions.enumLabels,this._i18n=e.mixin(this._i18n,d.rasterFunctions.rfxArgs)},postCreate:function(){this.inherited(arguments),this._setLabels(),r.keys(this.triggerArgs).forEach((function(t){this.factorFunctionMode=t.indexOf("vertical")>=0?"VERTICAL":t.indexOf("horizontal")>=0?"HORIZONTAL":null}),this);var t=this._getPersistedValue(),e=this._generateDropdownOptions(this._getFactorFunctionTypesOptionsObject());if(this.factorFunctionTypesSelect=this._generateDropdownNode(e,this._templateContainerNode),this._createFactorFunctionTypesGrid(),this.factorFunctionTypesSelect.on("change",function(t){this._createFactorFunctionTypesGrid(),this._updateValue()}.bind(this)),t){var i=this._getParsedWidgetValue(t);this.factorFunctionTypesSelect.set("value",i.factorFunctionType,!1),this.factorFunctionTypesGrid.updateStoreValue(i.gridData)}this._setupTriggerArgs()},_setLabels:function(){r.keys(this.inputArgs).forEach(function(t){this.factorFunctionLabel.innerHTML=this.inputArgs[t].displayName}.bind(this))},_getPersistedValue:function(){var t;return r.keys(this.inputArgs).forEach(function(e){t=this.inputArgs[e].value}.bind(this)),t},_setInputArgValue:function(t){r.keys(this.inputArgs).forEach(function(e){this.inputArgs[e].value=t}.bind(this))},_getFactorFunctionTypesOptionsObject:function(){var t;switch(this.factorFunctionMode){case"VERTICAL":t=this.verticalFactorTypes;break;case"HORIZONTAL":t=this.horizontalFactorTypes}return t},_getFactorFunctionTypeModifier:function(t){var e;switch(this.factorFunctionMode){case"VERTICAL":e=this.verticalFactorModifiers[t];break;case"HORIZONTAL":e=this.horizotalFactorModifiers[t]}return e},_getParsedWidgetValue:function(t){var e=t.split(" "),i=e[0],o=e.splice(1),n=[],a=this._getFactorFunctionTypeModifier(i);return r.keys(a).forEach((function(t,e){n.push({factorModifier:this._i18n[this.factorFunctionTypeModifiers[t]],factorModifierValue:parseFloat(o[e])})}),this),{gridData:n,factorFunctionType:i}},_setupTriggerArgs:function(){r.keys(this.triggerArgs).forEach((function(t){this.triggerArgs[t].input.on("change",function(){this._updateValue()}.bind(this))}),this)},_createFactorFunctionTypesGrid:function(){var t=this.factorFunctionTypesSelect.value,e=this._getFactorFunctionTypeModifier(t),i=this._getGridSchema(),o=this._getGridData(e);this.factorFunctionTypesGrid&&this.factorFunctionTypesGrid.destroy();var n=document.createElement("div");this._templateContainerNode.appendChild(n),this.factorFunctionTypesGrid=new l({schema:i,data:o,hasIdColumn:!1,isExtensible:!1,showHeader:!1},n),this.factorFunctionTypesGrid.startup(),this.factorFunctionTypesGrid.on("change",function(){this._updateValue()}.bind(this))},_getGridSchema:function(){var t=[g.string,g.long],e=[!1,!0];return["factorModifier","factorModifierValue"].map((function(i,o){return{name:i,dataType:t[o],isEditable:e[o]}}),this)},_getGridData:function(t){var e=[];return t?(r.keys(t).forEach((function(i){e.push({factorModifier:this._i18n[this.factorFunctionTypeModifiers[i]],factorModifierValue:t[i]})}),this),e):e},_generateDropdownOptions:function(t){return r.keys(t).map(function(e){return{value:e,label:this._i18n[t[e]]}}.bind(this))},_generateDropdownNode:function(t,e){var i=document.createElement("div");return e.appendChild(i),new u({options:t},i)},_updateValue:function(){var t=this.factorFunctionTypesGrid.getStoreValue(),e=this.factorFunctionTypesSelect.value,i=t.map((function(t){return t.factorModifierValue})),o=e+" "+(i=i.join(" "));this._setInputArgValue(o)}});return n("extend-esri")&&e.setObject("dijit.RasterFunctionEditor.RFxFactorFunctionEditor",p,h),p}));