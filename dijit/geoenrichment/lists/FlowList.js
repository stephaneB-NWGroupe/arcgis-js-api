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

define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-construct","dojo/dom-class","dojo/on","../utils/DeviceUtil","../utils/DnDUtil","../utils/MouseUtil","../utils/TooltipUtil","./FlowListDefaultItemRenderer","../utils/PopupUtil","dijit/_WidgetBase","dijit/_TemplatedMixin"],(function(e,t,s,i,n,r,l,o,d,a,h,c,m){var u=e([c,m],{templateString:"<div class='esriGEFlowList esriGENonSelectable'></div>",idProperty:"value",labelProperty:"label",selectedIndex:-1,selectedItem:null,items:null,store:null,defaultItemRendererClass:a,itemRenderer:null,itemClass:null,itemClassSelected:null,keepScrollPosition:!1,allowRepetitiveSelection:!0,selectOnMouseDown:!1,noDragTolerance:0,selectionValidator:null,allowManualSelection:!0,stopMouseEventPropagation:!0,hasSelectableItems:!0,autoDetectUrlsInLabels:!1,storeItemsInInnerDiv:!1,_addedWrappers:null,_clickHandles:null,_valueOnCreation:null,_isCreated:!1,itemsDiv:null,postCreate:function(){this.inherited(arguments),this.storeItemsInInnerDiv?this.itemsDiv=s.create("div",{class:"esriGEFlowList_innerDiv"},this.domNode):this.itemsDiv=this.domNode,this._clearHandlers(),this._setUpItemRenderer(),d.autoTooltip(this.domNode),this._isCreated=!0,this._valueOnCreation?this._setValueAttr(this._valueOnCreation):this.refresh()},_setUpItemRenderer:function(){this.itemRenderer||(this.itemRenderer=new this.defaultItemRendererClass),this.itemClass&&(this.itemRenderer.itemClass=this.itemClass),this.itemClassSelected&&(this.itemRenderer.itemClassSelected=this.itemClassSelected)},_getValueAttr:function(){return this.selectedItem&&this.selectedItem[this.idProperty]},_setValueAttr:function(e){var t=this;if(this._isCreated){var s=this.items||this.store&&this.store.data;s&&s.some((function(s){if(s[t.idProperty]==e)return t.setSelectedItem(s),!0}))}else this._valueOnCreation=e},_scrollTopMemo:0,memoScroll:function(){this._scrollTopMemo=this.domNode.scrollTop},applyScrollFromMemo:function(){this.domNode.scrollTop=this._scrollTopMemo||0},_setItemsAttr:function(e){this.setItems(e)},setItems:function(e,t){this.keepScrollPosition&&this.memoScroll(),this.clear(),this.items=e,t||(this.items&&this._isCreated?(this._addItems(e),this._checkIfStillSelected(),this.keepScrollPosition&&this.applyScrollFromMemo()):this._checkIfStillSelected())},_checkIfStillSelected:function(){if(-1!=this.selectedIndex||this.selectedItem){var e=this;this._addedWrappers&&this._addedWrappers.some((function(t,s){return e._isItemSelected(t,s)}))||(this.selectedIndex=-1,this.selectedItem=null)}},refresh:function(){this.store?this.setStore(this.store):this.setItems(this.items)},setSelectedItem:function(e,t){this.hasSelectableItems&&(this.selectedItem=e,this.selectedIndex=-1,this.refresh(),t&&this._dispatchChangeEvent())},setSelectedIndex:function(e,t){this.hasSelectableItems&&(this.selectedIndex=e,this.selectedItem=null,this.refresh(),t&&this._dispatchChangeEvent())},getItemNode:function(e){var t;return this._addedWrappers&&this._addedWrappers.some((function(s){if(s.itemRef===e)return t=s.__itemPresentation,!0})),t},getItemByNode:function(e){var t;return this._addedWrappers&&this._addedWrappers.some((function(s){if(s.__itemPresentation===e)return t=s.itemRef,!0})),t},getItemByValue:function(e){var t,s=this;return this._addedWrappers&&this._addedWrappers.some((function(i){if(i[s.idProperty]===e)return t=i.itemRef,!0})),t},__selectedPresentation:null,_addItems:function(e){this._addedWrappers=this._addedWrappers||[];var s=this;e.forEach((function(e){var i=t.mixin({},e);i.itemRef=e,s.__addWrapper(i)}))},__addWrapper:function(e){var t=this._addedWrappers.length,s=this.itemRenderer.createPresentation(e.itemRef,this._isItemSelected(e,t),this.itemsDiv,this,e);if(s){s.index=t,s.item=e.itemRef,e.__itemPresentation=s,this._isItemSelected(e,t)&&(this.selectedItem=e.itemRef,this.selectedIndex=t,this.__selectedPresentation=s),this._addClickHandler(s),this._addedWrappers.push(e);var n=this._addedWrappers.length-1;i.add(s,"listItem_"+n),i.add(s,"listItem_"+(n%2==0?"even":"odd"))}},_isItemSelected:function(e,t){if(!this.hasSelectableItems||!this._isItemClickable(e))return!1;if(t==this.selectedIndex)return!0;if(e.itemRef===this.selectedItem)return!0;if(e.itemRef&&this.selectedItem){var s=e.itemRef[this.idProperty],i=this.selectedItem[this.idProperty];return void 0!==s&&s===i}return!1},_isItemClickable:function(e){return this.selectionValidator?this.selectionValidator(e):this._selectionValidatorDefault(e)},_selectionValidatorDefault:function(e){return!!e&&!e.isSeparator&&!1!==e.enabled},_addClickHandler:function(e){var t,s=this;this.allowManualSelection&&(t=this.selectOnMouseDown||!this.noDragTolerance?n(e,this.selectOnMouseDown?r.press:r.click,(function(e){s.stopMouseEventPropagation&&e.stopPropagation(),i()})):l.addNoDragClickHandler(e,i,{tolerance:this.noDragTolerance}),this._clickHandles.push(t));function i(){(s.allowRepetitiveSelection||s.__selectedPresentation!=e)&&s._isItemClickable(e.item)&&(s.__selectedPresentation&&s.itemRenderer.selectPresentation&&s.itemRenderer.selectPresentation(s.__selectedPresentation,!1,s.__selectedPresentation.item),s.itemRenderer.selectPresentation&&s.itemRenderer.selectPresentation(e,s.hasSelectableItems,e.item),s.__selectedPresentation=e,s.selectedIndex=e.index,s.selectedItem=e.item,s._dispatchChangeEvent())}},_dispatchChangeEvent:function(){this.onChange({type:"change",selectedIndex:this.selectedIndex,selectedItem:this.selectedItem,value:this.selectedItem&&this.selectedItem[this.idProperty]})},clear:function(){this.__selectedPresentation=null,this._addedWrappers=this._addedWrappers||[],this._addedWrappers&&this._addedWrappers.forEach((function(e){e.destroyPresentation&&e.destroyPresentation()})),this._addedWrappers.length=0,this.itemsDiv&&(this.itemsDiv.innerHTML=""),this._clearHandlers()},_clearHandlers:function(){this._clickHandles=this._clickHandles||[],this._clickHandles.forEach((function(e){e.remove()})),this._clickHandles.length=0},scrollToItem:function(e){var t=this.getItemNode(e);t&&(this.domNode.scrollTop=t.offsetTop)},store:null,onDemandModeLoadStep:1e3,onDemandPopulateLimit:1e3,onDemandPopulatePeriod:200,_storeScrollHandler:null,_setStoreAttr:function(e){this.setStore(e)},setStore:function(e){if(this.domNode)if(this.keepScrollPosition&&this._memoScroll(),this.clear(),this.store=e,this.idProperty=e&&e.idProperty,this.store&&this._isCreated){this._loadNextPart(),this._checkIfStillSelected(),this.keepScrollPosition&&this.applyScrollFromMemo();var t=this;this._storeScrollHandler=this._storeScrollHandler||n(this.domNode,"scroll",(function(){var e=t._addedWrappers[t._addedWrappers.length-30],s=e?e.__itemPresentation:null;s&&s.offsetTop<t.domNode.scrollTop&&t._loadNextPart()}))}else this._checkIfStillSelected()},_loadNextPart:function(){if(this.store&&this.store.query().length!=this._addedWrappers.length){var e=this.store.query(null,{start:this._addedWrappers.length,count:this.onDemandModeLoadStep});if(delete e.total,this._addItems(e),e.length&&this._addedWrappers.length<this.onDemandPopulateLimit){var t=this._loadNextPart.bind(this);setTimeout(t,this.onDemandPopulatePeriod)}}},isMouseOver:function(e){return o.isMouseOver(this.domNode,{event:e})},onChange:function(e){},destroy:function(){this.clear(),this.inherited(arguments)}});return u.createPopup=function(e){var t;function s(){return t||(t=new u({class:e.listClass,itemRenderer:e.itemRenderer,items:e.options,onChange:function(s){e.onChange(s),!e.keepSelection&&t.setSelectedItem(null),h.close(t)}}),e.doNotOwn||e.wizard.own(t),e.isDeferred&&e.isDeferred(t)),t}return h.makePopup(e.isDeferred?s:s(),e.wizard,e.aroundNode,e.popupOptions||{}),t},u}));