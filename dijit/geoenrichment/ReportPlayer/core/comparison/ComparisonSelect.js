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

define(["dojo/_base/declare","dojo/on","dojo/dom-class","dojo/dom-construct","esri/dijit/geoenrichment/OnDemandSelect","esri/dijit/geoenrichment/lists/FlowListDefaultItemRenderer","../../dataProvider/supportClasses/areas/AreasInfoTemplateBuilder","./ComparisonListUtil","esri/dijit/geoenrichment/utils/DeviceUtil","esri/dijit/geoenrichment/utils/TooltipUtil"],(function(e,t,i,s,a,n,r,o,u,d){var l=e(n,{createLabelNode:!0,fields:null,addFeatureMessage:null,featureIsAlreadyAddedMessage:null,removeFeatureMessage:null,canAddFeatures:!1,canRemoveFeatures:!1,_createImageNode:function(e,a){var n=this;if(e.isArea){if(this.fields&&!u.isMobileDevice()){var r=s.create("div",{class:"esriGESpaceBeforeBig dijitInline esriGEInfoIcon esriGEComparisonSelect_infoIcon"},a);d.setTooltipToNode(r,(function(){return n._buildGeographyTooltip(e)}),{notRestricted:!0})}if(this.canRemoveFeatures){var o=s.create("div",{class:"esriGESpaceBeforeBig dijitInline esriGEComparisonSelect_removeButton"},a);this.isAdded(e)&&this.canRemoveFeature(e)?(t(o,"click",(function(t){t.stopPropagation(),n.onRemoveFeature(e)})),d.setTooltipToNode(o,this.removeFeatureMessage)):i.add(o,"disabled")}if(this.canAddFeatures){var l=s.create("div",{class:"esriGESpaceBeforeBig dijitInline esriGEComparisonSelect_addButton"},a);this.isAdded(e)?(i.add(l,"disabled"),d.setTooltipToNode(l,this.featureIsAlreadyAddedMessage)):(t(l,"click",(function(t){t.stopPropagation(),n.onAddFeature(e)})),d.setTooltipToNode(l,this.addFeatureMessage))}}},_buildGeographyTooltip:function(e){var t=this.fields.map((function(t){return{label:t.label,value:t.formatFunction(e.attributes[t.name])}}));return r.buildAttributesTable(null,t,{padding:10,maxHeight:document.body.clientHeight-40})},isAdded:function(e){},onAddFeature:function(e){},canRemoveFeature:function(e){},onRemoveFeature:function(e){}});return e(a,{listClass:"esriGEOnDemandSelectSpacedOut esriGEOnDemandSelectVeryTallList600",defaultLevelId:null,fields:null,addFeatureMessage:null,featureIsAlreadyAddedMessage:null,removeFeatureMessage:null,canAddFeatures:!1,canRemoveFeatures:!1,showTitleForSingleGroup:!1,buildRendering:function(){var e=this;u.isMobileDevice()&&(this.listClass+=" esriGEComparisonSelectListMobile");var t=new l;t.fields=this.fields,t.addFeatureMessage=this.addFeatureMessage,t.featureIsAlreadyAddedMessage=this.featureIsAlreadyAddedMessage,t.canAddFeatures=this.canAddFeatures,t.isAdded=function(t){return e.isFeatureAdded(t.levelId,t.featureId,t.attributes)},t.onAddFeature=function(t){e.closePopup(),e.onAddFeature(t.levelId,t.featureId,t.attributes)},t.canRemoveFeatures=this.canRemoveFeatures,t.removeFeatureMessage=this.removeFeatureMessage,t.canRemoveFeature=function(t){return e.canRemoveFeature(t.levelId,t.featureId,t.attributes)},t.onRemoveFeature=function(t){e.closePopup(),e.onRemoveFeature(t.levelId,t.featureId,t.attributes)},this.itemRenderer=t,this.inherited(arguments)},setGroups:function(e){this.set("options",o.getOptionsFromGroups(e,{hideTitleForSingleGroup:!this.showTitleForSingleGroup}))},setFeatures:function(e){this.set("options",o.getListOptionsFromFeatures(e))},setDefaultValue:function(e){var t=o.getDefaultOptionValue(this.options,this.defaultLevelId);return this.set("value",t),e&&e.emitEvent&&this.onChange(),t},isFeatureAdded:function(e,t,i){return!1},canRemoveFeature:function(e,t,i){return!0},onChange:function(){var e=this.getSelectedItem();e&&this.onFeatureSelected(e.levelId,e.featureId,e.attributes)},getFeatureIndexById:function(e,t){return o.getFeatureIndexInOptionsById(this.options,e,t)},selectFeatureByIndex:function(e){var t=o.getOptionValueByFeatureIndex(this.options,e||0);return this.set("value",t),t},getNumFeatures:function(){return o.getNumFeaturesFromOptions(this.options)},getValue:function(){var e=this.getSelectedItem();return e&&{value:e.value,featureId:e.featureId,levelId:e.levelId,attributes:e.attributes}},setValue:function(e,t){this.set("value",e+"."+t)},getSelectedAttributes:function(){var e=this.getSelectedItem();return e&&e.attributes},setSelectedAttributes:function(e){e&&this.setValue(e.StdGeographyLevel,e.StdGeographyID)},onFeatureSelected:function(e,t,i){},onAddFeature:function(e,t,i){},onRemoveFeature:function(e,t,i){}})}));