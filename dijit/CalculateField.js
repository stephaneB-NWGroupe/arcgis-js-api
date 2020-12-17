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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/kernel","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/_base/event","dojo/Evented","dojo/fx/easing","dojo/store/Memory","dojo/mouse","dojo/on","dojo/topic","dojo/_base/window","dojo/Deferred","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/MultiSelect","dijit/form/TextBox","dijit/form/SimpleTextarea","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/ComboBox","dijit/Dialog","dijit/Tooltip","dgrid/OnDemandList","dgrid/Selection","dgrid/Keyboard","dgrid/extensions/DijitRegistry","dgrid/util/mouse","put-selector/put","../kernel","../lang","../request","./SingleFilter","./ExpressionEditor","dojo/i18n!../nls/jsapi","dojo/text!./templates/CalculateField.html"],(function(e,t,i,s,n,a,r,o,l,h,c,d,u,p,m,f,_,b,x,g,y,T,C,F,v,E,D,L,S,P,w,B,N,R,M,A,I,O,j,U,H,k,q,G,W,Q,V,J,X,K,$,z,Y,Z,ee){var te=e([q,W,G,Q]),ie={base:"esriCalcField",titleLabel:"esriCalcTitleLabel",selectField:"esriCalcSelField",expressionBox:"esriExprBox",actionBtnContainer:"esriActionButtonCtr",validateIcon:"esriCalcFieldValidateIcon",validateDisabledIcon:"esriCalcFieldValidateDisabledIcon",actionButton:"esriActionButton",clearIcon:"esriCalcFieldClearIcon",clearDisabledIcon:"esriCalcFieldClearDisabledIcon",fieldFunctionContainer:"esriCalcFieldFuncCtr",fieldContainer:"esriCalcFieldCtr",functionContainer:"esriCalcFuncCtr",fieldLabelDiv:"esriFieldsLabelDiv",functionLabelDiv:"esriFunctionLabelDiv",fieldListContainer:"esriCalcFieldsList",functionListContainer:"esriCalcFunctionList",fieldTypeContainer:"esriFieldsSelectionCtr",loadingIcon:"esriLoadingLarge",formWarning:"esriFormWarning",formSuccess:"esriFormSuccess",addButton:"",closeButton:"",actionDividerLine:"esriActionDividerLine",titleDividerLine:"esriTitleDivideLine",actionCtr:"esriCalcFieldActionCtr"},se=e([v,E,D,L,S,_],{declaredClass:"esri.dijit.CalculateField",templateString:ee,widgetsInTemplate:!0,showSelectField:!1,showHeader:!0,closeOnAdd:!0,addButtonClass:"",closeButtonClass:"",_showMsgTimerInterval:3e3,showHelp:!1,expressionBoxRows:4,expressionBoxCols:2,baseClass:ie.base,constructor:function(e){e.containerNode&&(this.container=e.containerNode),this._css=t.mixin(ie,e.css),this.expressionMode=K.isDefined(e.expressionMode)?e.expressionMode:se.MODE_SQL,this.fieldId=e.fieldId,this.arcadeProfile=e.arcadeProfile,this.arcadeProfileType=e.arcadeProfileType},destroy:function(){this.inherited(arguments)},postMixInProperties:function(){this.inherited(arguments),this.i18n={},t.mixin(this.i18n,Z.common),t.mixin(this.i18n,Z.calculateFields),this.calculateLabel||(this.calculateLabel=this.i18n.calculate)},postCreate:function(){if(this.inherited(arguments),this.expressionMode===se.MODE_ARCADE)this._loadArcadeUIEvents(),this._buildArcadeEditorUI();else{var e,t,i=["ar","he"];for(e=0;e<i.length;e+=1)t=i[e],a.locale&&-1!==a.locale.indexOf(t)&&(-1!==a.locale.indexOf("-")?-1!==a.locale.indexOf(t+"-")&&(this._isRightToLeft=!0):this._isRightToLeft=!0);this._buildUI(),this._loadEvents(),this.onlineHelpMap={},c.set(this._helpNode,"display",this.showHelp?"block":"none"),this.helpUrl&&d.set(this._helpurlNode,"href",this.helpUrl),this.validate()}},_loadArcadeUIEvents:function(){t.mixin(this.i18n,Z.expressionEditor),this.own(this.watch("layer",t.hitch(this,this._buildArcadeEditorUI)))},_deleteArcadeEditorUI:function(){this.expressionEditor&&this._destroyArcadeUI()},_buildArcadeEditorUI:function(){this._deleteArcadeEditorUI();var e=this.expressionMode===se.MODE_ARCADE;c.set(this._expressionForm,"display",e?"none":"block"),c.set(this._headerPane.domNode,"display",e?"none":"block"),c.set(this._arcadeExpressionEditorDlg,"display",e?"block":"none"),this.expressionEditorCommitHandler=T.subscribe("expression-commit",t.hitch(this,(function(e){this.set("expression",e.expression),this.emit("expression-add",e),this._close()}))),this.expressionEditorCancelHandler=T.subscribe("expression-cancel",t.hitch(this,(function(){this._close()}))),K.isDefined(this.fieldId)||(this.fieldId="$feature"),this.expressionEditor=new Y({arcadeEditor:this.arcadeEditor,map:this.map,mapLayer:{layer:this.layer,popupInfo:this.layer.infoTemplate?this.layer.infoTemplate.toJson():null},layer:this.layer,expression:this.get("expression"),captureTitle:!1,fieldId:this.fieldId,arcadeProfile:this.arcadeProfile,arcadeProfileType:this.arcadeProfileType,showViewScale:!1},u.create("div",null,this._arcadeExpressionEditorDlg)),this.expressionEditor.startup(),this.own(this.watch("arcadeProfile",t.hitch(this,(function(){this.expressionEditor.set("arcadeProfile",this.get("arcadeProfile"))}))))},_destroyArcadeUI:function(){this.expressionEditorCommitHandler&&this.expressionEditorCommitHandler.remove(),this.expressionEditorCommitHandler=null,this.expressionEditorCancelHandler&&this.expressionEditorCancelHandler.remove(),this.expressionEditorCancelHandler=null,this.expressionEditor&&this.expressionEditor.destroy(),this.expressionEditor=null,this.expression&&(this.expression=null)},_buildUI:function(){var e,s,n=[];if(c.set(this._header,"display",this.showHeader?"block":"none"),c.set(this._selCalcFieldDiv,"display",this.showSelectField?"block":"none"),this.field&&(s=i.filter(this.layer.fields,(function(e){return e.name===this.field}),this)[0],this._calcField=s,d.set(this._calcFieldLabel,"innerHTML",h.substitute(this.i18n.exprLabel,{fieldName:s?s.name:this.field}))),!this.helperMethods||this.helperMethods&&0===this.helperMethods.length){var a=this._labelFormatter.bind(this),r=[{type:"NumType",label:a({functionName:"ABS(<i>number</i>)",functionDesc:this.i18n.absFunc,functionParams:[{name:"number",label:this.i18n.commonNumberParamDesc}]}),name:"ABS()"},{type:"NumType",label:a({functionName:"CAST(<i>expression</i> AS FLOAT|INT)",functionDesc:this.i18n.castFunc,functionParams:[{name:"expression",label:this.i18n.castParam1Desc},{name:"FLOAT",label:this.i18n.castParam2Desc},{name:"INT",label:this.i18n.castParam3Desc}]}),name:"CAST()"},{type:"NumType",label:a({functionName:"CEILING(<i>number</i>)",functionDesc:this.i18n.ceilingFunc,functionParams:[{name:"number",label:this.i18n.ceilingParamDesc}]}),name:"CEILING()"},{type:"NumType",label:a({functionName:"COS(<i>number</i>)",functionDesc:this.i18n.cosFunc,functionParams:[{name:"number",label:this.i18n.trignomParamDesc}]}),name:"COS()"},{type:"NumType",label:a({functionName:"FLOOR(<i>number</i>)",functionDesc:this.i18n.floorFunc,functionParams:[{name:"number",label:this.i18n.floorParamDesc}]}),name:"FLOOR()"},{type:"NumType",label:a({functionName:"LOG(<i>number</i>)",functionDesc:this.i18n.logFunc,functionParams:[{name:"number",label:this.i18n.commonNumberParamDesc}]}),name:"LOG()"},{type:"NumType",label:a({functionName:"LOG10(<i>number</i>)",functionDesc:this.i18n.log10Func,functionParams:[{name:"number",label:this.i18n.commonNumberParamDesc}]}),name:"LOG10()"},{type:"NumType",label:a({functionName:"MOD(<i>number</i>, <i>n</i>)",functionDesc:this.i18n.modFunc,functionParams:[{name:"number",label:this.i18n.modParam1Desc},{name:"n",label:this.i18n.modParam2Desc}]}),name:"MOD(,)"},{type:"NumType",label:a({functionName:"NULLIF(<i>number</i>,<i>value</i>)",functionDesc:this.i18n.nullifFunc,functionParams:[{name:"number",label:this.i18n.commonNumberParamDesc},{name:"value",label:this.i18n.commonNumberParamDesc}]}),name:"NULLIF(,)"},{type:"NumType",label:a({functionName:"POWER(<i>number</i>, <i>y</i>)",functionDesc:this.i18n.powerFunc,functionParams:[{name:"number",label:this.i18n.powerParam1Desc},{name:"y",label:this.i18n.powerParam2Desc}]}),name:"POWER(,)"},{type:"NumType",label:a({functionName:"ROUND(<i>number</i>, <i>length</i>)",functionDesc:this.i18n.roundFunc,functionParams:[{name:"number",label:this.i18n.roundParam1Desc},{name:"length",label:this.i18n.roundParam2Desc}]}),name:"ROUND(,)"},{type:"NumType",label:a({functionName:"SIN(<i>number</i>)",functionDesc:this.i18n.sinFunc,functionParams:[{name:"number",label:this.i18n.trignomParamDesc}]}),name:"SIN()"},{type:"NumType",label:a({functionName:"TAN(<i>number</i>)",functionDesc:this.i18n.tanFunc,functionParams:[{name:"number",label:this.i18n.trignomParamDesc}]}),name:"TAN()"},{type:"NumType",label:a({functionName:"TRUNCATE(<i>number</i>, <i>decimal_place</i>)",functionDesc:this.i18n.truncateFunc,functionParams:[{name:"number",label:this.i18n.truncateParam1Desc},{name:"decimal_place",label:this.i18n.truncateParam2Desc}]}),name:"TRUNCATE(,)"},{type:"StrType",label:a({functionName:"CHAR_LENGTH(<i>string</i>)",functionDesc:this.i18n.char_lengthFunc,functionParams:[{name:"string",label:this.i18n.char_lengthParamDesc}]}),name:"CHAR_LENGTH()"},{type:"StrType",label:a({functionName:"CONCAT(<i>string1</i>, <i>string2</i>)",functionDesc:this.i18n.concatFunc,functionParams:[{name:"string1",label:this.i18n.concatParam1Desc},{name:"string2",label:this.i18n.concatParam2Desc}]}),name:"CONCAT(,)"},{type:"StrType",label:a({functionName:"POSITION(<i>substring</i>, <i>string</i>)",functionDesc:this.i18n.positionFunc,functionParams:[{name:"substring",label:this.i18n.positionParam1Desc},{name:"string",label:this.i18n.positionParam2Desc}]}),name:"POSITION(,)"},{type:"StrType",label:a({functionName:"LOWER(<i>string</i>)",functionDesc:this.i18n.lowerFunc,functionParams:[{name:"string",label:this.i18n.lowerParamDesc}]}),name:"LOWER()"},{type:"StrType",label:a({functionName:"SUBSTRING(<i>string</i>, <i>start</i>, <i>length</i>)",functionDesc:this.i18n.substringFunc,functionParams:[{name:"string",label:this.i18n.substrParam1Desc},{name:"start",label:this.i18n.substrParam2Desc},{name:"length",label:this.i18n.substrParam3Desc}]}),name:"SUBSTRING(,,)"},{type:"StrType",label:a({functionName:"TRIM(BOTH|LEADING|TRAILING ‘ ‘ FROM string)",functionDesc:this.i18n.trimFunc,functionParams:[{name:"BOTH",label:this.i18n.trimBothDesc},{name:"LEADING",label:this.i18n.trimLeadingDesc},{name:"TRAILING",label:this.i18n.trimTrailingDesc},{name:"string",label:this.i18n.trimParamDesc}]}),name:"TRIM()"},{type:"StrType",label:a({functionName:"UPPER(<i>string</i>)",functionDesc:this.i18n.upperFunc,functionParams:[{name:"string",label:this.i18n.upperParamDesc}]}),name:"UPPER()"},{type:"DateType",label:a({functionName:"CURRENT_DATE()",functionDesc:this.i18n.current_dateFunc}),name:"CURRENT_DATE()"},{type:"DateType",label:h.substitute(this.i18n.current_timeFunc,{functionName:"CURRENT_TIME()"}),name:"CURRENT_TIME()"},{type:"DateType",label:h.substitute(this.i18n.current_timestampFunc,{functionName:"CURRENT_TIMESTAMP()"}),name:"CURRENT_TIMESTAMP()"},{type:"DateType",label:a({functionName:"EXTRACT(unit FROM date)",functionDesc:this.i18n.extractFunc,functionParams:[{name:"unit",label:this.i18n.extractUnitDesc},{name:"date",label:this.i18n.extractDataDesc}]}),name:"EXTRACT()"}];i.forEach(r,(function(e){e.label="<b>"+e.label.substring(0,e.label.indexOf(":")+1)+"</b><br/> "+e.label.substring(e.label.indexOf(":")+1),console.log(e.label)}),this),this.set("helperMethods",r)}if((!this.operators||this.operators&&0===this.operators.length)&&this.set("operators",["+","-","/","*","(",")"]),this._operatorBtns=[],i.forEach(this.operators,(function(e){this._operatorBtns.push(new w({value:e,label:e,style:{width:"4em"},onClick:t.hitch(this,this._updateExpression,{value:e,type:"operator"})},u.create("div",null,this._operatorCtr)))}),this),this.layer&&this.layer.fields&&this.layer.fields.length>0){n=this._createIds(this.layer.fields);var o=i.map(this.layer.fields,(function(e){return{label:e.name,value:e.name}}));this._selCalcField.addOption(o),this._selCalcField.set("value",this.field)}this.fieldsStore=new x({data:n}),this.attributeList=new te({renderRow:t.hitch(this,this._renderAttributesRow),selectionMode:"single",store:this.fieldsStore},this._attributeListCtr),e=this._createIds(this.get("helperMethods")),this.operatorStore=new x({data:e}),this.helpersList=new te({renderRow:t.hitch(this,this._renderOperatorRow),selectionMode:"single",store:this.operatorStore},this._helpersListCtr)},_loadEvents:function(){this.own(this.watch("fields",t.hitch(this,this._handleFieldsChange)),this.watch("field",t.hitch(this,this._handleFieldChange))),this.showSelectField&&this.own(this._selCalcField.on("change",t.hitch(this,this._handleSelcCalFieldChange))),this.own(this._expressionForm.watch("value",t.hitch(this,this._handleHelperTypeChange)),this._expressionForm.on("focus",t.hitch(this,this._setfocus)),this._exprBox.watch("value",t.hitch(this,this._handleExpChange)),this.attributeList.on("dgrid-select",t.hitch(this,(function(e){var t=e.rows;this._updateExpression({value:t[0].data,type:"field"})}))),this.helpersList.on("dgrid-select",t.hitch(this,(function(e){var t=e.rows;this._updateExpression({value:t[0].data,type:"helper"})}))),this.attributeList.on(V.enterRow,t.hitch(this,(function(e){var t,i=this.attributeList.row(e);t="<b>"+(i.data.alias||i.data.name)+"</b>: "+this._getTypeLabel(i.data.type),this._showTooltip(i.element,t)}))),this.attributeList.on(V.leaveRow,t.hitch(this,(function(e){var t=this.attributeList.row(e);this._hideTooltip(t.element)}))),this.helpersList.on(V.enterRow,t.hitch(this,(function(e){var t=this.helpersList.row(e);this._showTooltip(t.element,t.data.label)}))),this.helpersList.on(V.leaveRow,t.hitch(this,(function(e){var t=this.helpersList.row(e);this._hideTooltip(t.element)}))),this.attributeList.on("dgrid-refresh-complete",t.hitch(this,this._setfocus)),this.helpersList.on("dgrid-refresh-complete",t.hitch(this,this._setfocus)),this._exprBox.on("blur",t.hitch(this,(function(){this._exprBox.textbox.setSelectionRange&&"number"==typeof this._exprBox.textbox.selectionStart?this._exprBox.set("cursorPosition",[this._exprBox.textbox.selectionStart,this._exprBox.textbox.selectionEnd]):this._exprBox.set("cursorPosition",this._getCursorRange(this._exprBox.textbox))}))),this._exprBox.on("focus",t.hitch(this,(function(){var e=this._exprBox.get("cursorPosition");e&&(this._exprBox.textbox.setSelectionRange&&"number"==typeof this._exprBox.textbox.selectionStart?this._exprBox.textbox.setSelectionRange(e[1],e[1]):this._setCaretPosition(this._exprBox.textbox,e[1],e[1]))}))),y(this._calcFieldLabel,g.enter,t.hitch(this,(function(e){var t;t=this._getTypeLabel(this._calcField.type),this._showTooltip(this._calcFieldLabel,"<b>"+this._calcField.alias+"</b>: "+t)}))),y(this._calcFieldLabel,g.leave,t.hitch(this,(function(e){this._hideTooltip(this._calcFieldLabel)}))))},startup:function(){this.inherited(arguments),this.expressionMode===se.MODE_SQL&&(this.attributeList.startup(),this.helpersList.startup(),this.set("helperType",this.helperType))},reset:function(){X.show(this.domNode),this.expressionMode===se.MODE_SQL?(this._expressionForm.reset(),this._handleCloseMsg(),this.set("helperType",this.helperType)):this._buildArcadeEditorUI()},_close:function(){this.emit("close",{}),X.hide(this.domNode),this._deleteArcadeEditorUI()},_createIds:function(e){var s=[];return e&&e.length>0&&(s=i.map(e,(function(e,i){return t.mixin(e,{id:i})}))),s},_renderAttributesRow:function(e){var t=u.create("div",{class:"esriCalExpRowOuter"}),i=u.create("div",{class:"esriCalcExpLabelRow"},t);return u.create("div",{class:"esriCalcFieldTextTrimWithEllipses",innerHTML:e.name},i),t},_renderOperatorRow:function(e){var t=u.create("div",{class:"esriCalExpRowOuter"}),i=u.create("div",{class:"esriCalcExpLabelRow"},t);return u.create("div",{class:"esriCalcFieldTextTrimWithEllipses",innerHTML:e.name},i),t},_handleFieldsChange:function(e,t,s){var n=[];if(this.layer&&this.layer.fields&&this.layer.fields.length>0){this._selCalcField.getOptions().length>0&&this._selCalcField.removeOption(this._selCalcField.getOptions()),n=this._createIds(this.layer.fields);var a=i.map(this.layer.fields,(function(e){return{label:e.name,value:e.name}}));this._selCalcField.addOption(a),this._selCalcField.set("value",this.field)}this.fieldsStore=new x({data:n}),this.attributeList.set("store",this.fieldsStore)},_handleFieldChange:function(e,t,i){d.set(this._calcFieldLabel,"innerHTML",h.substitute(this.i18n.exprLabel,{fieldName:i})),this.set("helperType",this.helperType),this._setfocus()},_setHelperTypeAttr:function(e){var t;e?this.helperType=e:this.field?(t=i.filter(this.layer.fields,(function(e){return e.name===this.field}),this)[0],this._calcField=t,t&&"esriFieldTypeDate"===t.type?e="date":t&&"esriFieldTypeString"===t.type?e="string":t&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],t.type)&&(e="numeric")):e="string","string"===e?this._strRadioBtn.set("checked",!0):"numeric"===e?this._numRadioBtn.set("checked",!0):"date"===e&&this._dateRadioBtn.set("checked",!0)},_handleHelperTypeChange:function(e,t,s){this.helpersList.set("query",{type:s.functionType}),"DateType"===s.functionType?this.attributeList.set("query",{type:"esriFieldTypeDate"}):"StrType"===s.functionType?this.attributeList.set("query",{type:"esriFieldTypeString"}):"NumType"===s.functionType&&this.attributeList.set("query",(function(e){return-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)})),this.helpersList.refresh(),this.attributeList.refresh()},_handleSelcCalFieldChange:function(e){this.set("field",e)},_handleRemoveBtnClick:function(){this._exprBox.set("value",""),this._setfocus()},_handleAddButtonClick:function(e){f.stop(e);var i,s=this._exprBox.get("value"),a={f:"json"};s?(this._handleCloseMsg(),a.calcExpression=n.toJson(this.get("expression")),a.sqlFormat="standard",this.layer.supportsASyncCalculate&&(a.async=!0),this.layer.getDefinitionExpression&&this.layer.getDefinitionExpression()?a.where=this.layer.getDefinitionExpression():K.isDefined(this.layer.definitionExpression)&&""!==this.layer.definitionExpression&&(a.where=this.layer.definitionExpression),X.id.getCredential(this.layer.url+"/calculate").then(t.hitch(this,(function(e){a.token=e.token,i=$({url:this.layer.url+"/calculate",content:a},{usePost:!0}),this.emit("calculate-start",{calcPromise:i.promise}),this._addBtn.set("disabled",!0),this._showLoading(),i.then(t.hitch(this,(function(e){this._checkStatus(e).then(t.hitch(this,(function(e){this._addBtn.set("disabled",!1),this._hideLoading();var i={};t.mixin(i,{calcExpression:n.fromJson(a.calcExpression)[0].sqlExpression,where:a.where,sqlFormat:a.sqlFormat},e),this.emit("calculate-success",i),this.layer.refresh(),m.toggle(this._errorMessagePane,this._css.formSuccess,!0),this._showMessages(h.substitute(this.i18n.successMsg,{count:e.updatedFeatureCount||e.recordCount}),!0),this.closeOnAdd&&this._close()})))})),t.hitch(this,this._handleErrorResponse))})),t.hitch(this,this._handleErrorResponse))):this._addBtn.set("disabled",!0)},_checkStatus:function(e,i,s){var n=e&&e.statusUrl,a=s||new F,r=i||500;return this.layer.supportsASyncCalculate?$({url:n,content:{f:"json"}},{usePost:!0}).then(t.hitch(this,(function(s){var n=(s=s||{status:"completed"}).status;n&&"completed"===n.toLowerCase()?a.resolve(s):n&&"failed"===n.toLowerCase()||s.code>400||""===n?this._handleErrorResponse(s):(r+=250,setTimeout(t.hitch(this,(function(){this._checkStatus(e,r,a)})),i))})),t.hitch(this,(function(e){this._handleErrorResponse(e)}))):a.resolve(e),a},_handleErrorResponse:function(e){this._addBtn.set("disabled",!1),this._hideLoading(),this.emit("calculate-error",e),m.toggle(this._errorMessagePane,this._css.formSuccess,!1),this._showMessages(h.substitute(this.i18n.exprFailedMsg,{expr:this._exprBox.get("value")})+"<br/>"+(e.details||e.description).toString())},_handleCloseButtonClick:function(e){f.stop(e),this._close()},_showTooltip:function(e,t){var i=u.create("label",{innerHTML:t,className:"esriSmallFont",dir:"ltr"});this._isRightToLeft?k.show(i.outerHTML,e,["after"],!0):k.show(i.outerHTML,e,["after"])},_hideTooltip:function(e,t){k.hide(e)},_setfocus:function(){this._exprBox.focus()},_showMessages:function(e,i){d.set(this._bodyNode,"innerHTML",e),r.fadeIn({node:this._errorMessagePane,easing:b.quadIn,onEnd:t.hitch(this,(function(){c.set(this._errorMessagePane,{display:""})}))}).play(),i&&window.setTimeout(t.hitch(this,this._handleCloseMsg),this._showMsgTimerInterval)},_handleCloseMsg:function(e){e&&e.preventDefault(),"none"!==c.get(this._errorMessagePane,"display")&&r.fadeOut({node:this._errorMessagePane,easing:b.quadOut,onEnd:t.hitch(this,(function(){c.set(this._errorMessagePane,{display:"none"})}))}).play()},validate:function(){var e=!0;return this.layer?this.field?this.layer.supportsCalculate?this.layer.userIsAdmin||this.layer.getEditCapabilities().canUpdate||(h.substitute(this.i18n.lyrUpdateCapMsg,{layername:this.layer.name}),e=!1):(h.substitute(this.i18n.lyrSupportCalMsg,{layername:this.layer.name}),e=!1):(this.i18n.fieldReqMsg,e=!1):(this.i18n.layerReqMsg,e=!1),this._addBtn.set("disabled",!e),e},_validateExpObj:function(e){var t=!0;return e||(t=!1),t?this._handleCloseMsg():this._showMessages(void 0),t},_updateExpression:function(e){var t,s,n,a=this._exprBox.get("cursorPosition"),r=this._exprBox.get("value"),o=0;if(this._validateExpObj(e)){if(this._exprStack||(this._exprStack=[]),this._exprStack.length>0&&(n=this._exprStack[this._exprStack.length-1]),a&&r||(a=[0,0]),"operator"===e.type)o=(s=" "+e.value+" ").length;else if("helper"===e.type)s=e.value.name,o=-1!==e.value.name.indexOf(",")?e.value.name.indexOf(","):e.value.name.length-1;else if("field"===e.type){var l=K.isDefined(n)&&"helper"===n.type&&-1!==n.value.name.indexOf("MOD")&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle"],e.value.type),h=K.isDefined(n)&&"helper"===n.type&&-1!==n.value.name.indexOf("MOD")&&"esriFieldTypeDouble"===e.value.type;o=(s=this._calcField&&"esriFieldTypeDouble"===this._calcField.type&&!l&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle"],e.value.type)?"CAST("+e.value.name+" AS FLOAT)":this._calcField&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle"],this._calcField.type)&&h?"CAST("+e.value.name+" AS INT)":e.value.name).length+1}t=r.substring(0,a[0])+s+r.substring(a[1]),this._exprBox.set("value",t),this._exprBox.focus(),this._exprBox.textbox.setSelectionRange&&"number"==typeof this._exprBox.textbox.selectionStart?(this._exprBox.textbox.setSelectionRange(a[0]+o,a[0]+o),this._exprBox.set("cursorPosition",[a[0]+o,a[0]+o])):(this._setCaretPosition(this._exprBox.textbox,a[0]+o,a[0]+o),this._exprBox.set("cursorPosition",this._getCursorRange(this._exprBox.textbox))),this._setfocus(),this._exprStack.push(e)}},_setCaretPosition:function(e,t,i){if(e.setSelectionRange&&"number"==typeof e.selectionStart)e.setSelectionRange(t,i);else if(void 0!==e.createTextRange){var s=e.createTextRange();s.collapse(!0),s.moveEnd("character",i),s.moveStart("character",t),s.select()}},_getCaretPosition:function(e){var t=0;if(C.doc.selection){e.focus();var i=C.doc.selection.createRange();i.moveStart("character",-e.value.length),t=i.text.length}else(e.selectionStart||"number"==typeof e.selectionStart)&&(t=e.selectionStart);return t},_getCursorRange:function(e){var t,i;return e.setSelectionRange&&"number"==typeof e.selectionStart?(t=e.selectionStart,i=e.selectionEnd):void 0!==e.createTextRange&&(t=this._getCaretPosition(e),i=this._getCaretPosition(e)),[t,i]},_handleExpChange:function(e,t,i){this._addBtn.set("disabled",!i),this._validateBtn.set("disabled",!i),this._removeBtn.set("disabled",!i)},_handleValidationBtnClick:function(){var e,s={sql:this.field+" = "+this._exprBox.get("value"),sqlType:"where",f:"json"};e=$({url:this.layer.url+"/validateSQL",content:s},{usePost:!0}),this._addBtn.set("disabled",!0),this._validateBtn.set("disabled",!0),this._showLoading(),e.then(t.hitch(this,(function(e){var t;this._hideLoading(),this._validateBtn.set("disabled",!1),this._addBtn.set("disabled",!e.isValidSQL),e.isValidSQL?(m.toggle(this._errorMessagePane,this._css.formSuccess,!0),this._handleCloseMsg(),this._showMessages(Z.calculateFields.validExpression)):(e.validationErrors&&e.validationErrors.length>0?(t="",i.forEach(e.validationErrors,(function(e){if(e.params&&Z.calculateFields.errorCodes[e.errorCode]){var i={};for(var s in e.params)e.params.hasOwnProperty(s)&&(i[s]=e.params[s]);t+=h.substitute(Z.calculateFields.errorCodes[e.errorCode],i)+"<br/>"}else t+=(Z.calculateFields.errorCodes[e.errorCode]||e.description)+"<br/>"}),this),this._showMessages(t,!1)):this._showMessages(Z.calculateFields.invalidExpression),m.toggle(this._errorMessagePane,this._css.formSuccess,!1))})),t.hitch(this,(function(e){this._hideLoading(),this._validateBtn.set("disabled",!1),this._addBtn.set("disabled",!1)})))},_showLoading:function(){c.set(this._underlay,"display","block")},_hideLoading:function(){c.set(this._underlay,"display","none")},_getTypeLabel:function(e){var t;return-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle"],e)?t=this.i18n.integerLabel:"esriFieldTypeDouble"===e?t=this.i18n.doubleLabel:"esriFieldTypeDate"===e?t=this.i18n.dateLabel:"esriFieldTypeString"===e&&(t=this.i18n.stringLabel),t},_labelFormatter:function(e){var t=h.substitute(e.functionDesc,{functionName:e.functionName})+"<br/>",s=this._isRightToLeft;return i.forEach(e.functionParams,(function(e){t+=s?e.label+" - <i>"+e.name+"</i><br/>":"<i>"+e.name+"</i> - "+e.label+"<br/>"})),t},_setLayerAttr:function(e){this._set("layer",e),this._set("fields",e.fields)},_setFieldsAttr:function(e){this._set("fields",e)},_setFieldAttr:function(e){this._set("field",e)},_setHelperMethodsAttr:function(e){this._set("helperMethods",e)},_setOperatorsAttr:function(e){this._set("operators",e)},_setShowSelectFieldAttr:function(e){this._set("showSelectField",e)},_setShowHeaderAttr:function(e){this._set("showHeader",e)},_setCloseOnAddAttr:function(e){this._set("closeOnAdd",e)},_getExpressionAttr:function(){var e,t,i=this._exprBox.get("value");if(i)return i.split(" "),t=[],(e={field:this.field}).sqlExpression=i,t.push(e),this.expressionMode===se.MODE_SQL?t:this._exprBox&&this._exprBox.get("value");this._addBtn.set("disabled",!0)},_setExpressionAttr:function(e){this._set("expression",e),this._exprBox&&this._exprBox.set("value",e)},_setAddButtonClassAttr:function(e){this._set("addButtonClass",e)},_setCloseButtonClassAttr:function(e){this._set("closeButtonClass",e)},_setExpressionBoxRowsAttr:function(e){this.expressionBoxRows=e||4},_setExpressionBoxColsAttr:function(e){this.expressionBoxCols=e||2},_setArcadeEditorAttr:function(e){this.arcadeEditor=e},_setFieldIdAttr:function(e){this.fieldId=e},_setArcadeProfileAttr:function(e){this._set("arcadeProfile",e)},_setArcadeProfileTypeAttr:function(e){this._set("arcadeProfileType",e)}});return t.mixin(se,{MODE_SQL:0,MODE_ARCADE:1}),o("extend-esri")&&t.setObject("dijit.CalculateField",se,X),se}));