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

define(["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/dom-construct","dojo/dom-class","dojo/dom-style","dojo/dom-geometry","dojo/store/Memory","dijit/_WidgetBase","dijit/_TemplatedMixin","./lists/FlowList","./lists/FlowListDefaultItemRenderer","./lists/_FlowListHoverSupport","./utils/DeviceUtil","./utils/DomUtil","./utils/MouseUtil","./utils/PopupUtil","./utils/TooltipUtil","dojo/text!./templates/OnDemandSelect.html"],(function(e,t,o,i,s,n,l,r,p,u,h,a,c,d,m,_,v,P,L){var f=e([h,c]),S={_currentSelect:null,_keyHandler:null,_mouseMoveHandler:null,_currentItemIndex:-1,_currentSearchLetter:null,setFocusedSelect:function(e){this._currentSelect=e,this._updateHandlers()},_updateHandlers:function(){var e=this;this._keyHandler&&this._keyHandler.remove(),this._keyHandler=null,this._mouseMoveHandler&&this._mouseMoveHandler.remove(),this._mouseMoveHandler=null,this._currentItemIndex=-1,this._currentSearchLetter=null,this._setNodeFocused(null),this._currentSelect&&(this._keyHandler=o(document.body,"keyup",(function(t){var o=String.fromCharCode(t.keyCode);1===o.length&&(o=o.toLowerCase(),e._tryHighlightNextItemForKey(o))})),this._mouseMoveHandler=o(this._currentSelect.popupList.domNode,"mousemove",(function(){e._setNodeFocused(null)})))},_tryHighlightNextItemForKey:function(e){e===this._currentSearchLetter?this._currentItemIndex++:this._currentItemIndex=0,this._currentSearchLetter=e;var t=this,o=this._currentSelect.store.query((function(o){var i=o[t._currentSelect.labelProperty];return i&&i.toLowerCase().charAt(0)===e}));if(o.length){this._currentItemIndex>o.length-1&&(this._currentItemIndex=0);var i=o[this._currentItemIndex],s=i&&this._currentSelect.popupList.getItemNode(i);i&&this._currentSelect.popupList.scrollToItem(i),this._setNodeFocused(s)}},_currentFocusedNode:null,_setNodeFocused:function(e){this._currentFocusedNode&&(s.remove(this._currentFocusedNode,"listItemFocused"),this._currentFocusedNode=null),e&&(s.add(e,"listItemFocused"),this._currentFocusedNode=e)}};return e([p,u],{templateString:L,value:null,popupList:null,listClass:null,placeHolderClass:"placeHolder",idProperty:"value",labelProperty:"label",options:null,store:null,itemRenderer:null,itemClass:null,placeHolder:null,requireSelection:!0,renderSelectionAsItem:!1,makePopupListWidthMatchOpenButtonWidth:!0,orient:null,noPopupOverflow:!1,stopOpenEventPropagation:!1,stopPopupInteractionEventPropagation:!0,onClickComponent:null,clearPopupOnClose:!0,detectItemHover:!1,hasSelectableItems:!0,allowRepetitiveSelection:!0,labelTextToKeep:null,nodeToKeepAsSelected:null,openMouseEvent:null,toggleOnClick:!0,supportsKeyNavigation:!0,_closePopupOnChangeFunc:null,_lastPopupListScrollTop:0,postCreate:function(){var e=this;this.inherited(arguments),this._normalizeValue(),this.labelTextToKeep?this.selectedLabel.innerHTML=this.labelTextToKeep:this.requireSelection||this._tryAssignPlaceholder(),this.nodeToKeepAsSelected?this._updateSelection():m.hide(this.selectedItemHolder),this._createPopupList(),this.own(this.popupList),this.listClass&&s.add(this.popupList.domNode,this.listClass),this._popupCreationHandler=o(this.openButton,this.openMouseEvent||d.click,(function(t){e.stopOpenEventPropagation&&("function"==typeof e.stopOpenEventPropagation?e.stopOpenEventPropagation(t):t.stopPropagation()),e.openPopup()})),this.popupList.startup(),this._trySelectValue(),o(this.popupList.domNode,d.clickOrRelease,(function(t){e.stopPopupInteractionEventPropagation&&t.stopPropagation()})),o(this.popupList.domNode,"scroll",(function(t){e._lastPopupListScrollTop=e.popupList.domNode.scrollTop})),P.autoTooltip(this.domNode)},_createPopupList:function(){var e=this,o=this.itemRenderer||new a;this.popupList=new(this.detectItemHover?f:h)(t.mixin({class:"esriGEOnDemandSelectFlowList",idProperty:this.idProperty,labelProperty:this.labelProperty,itemRenderer:o,itemClass:this.itemClass,stopMouseEventPropagation:this.stopPopupInteractionEventPropagation,hasSelectableItems:this.hasSelectableItems,allowRepetitiveSelection:this.allowRepetitiveSelection,onChange:function(){e._processOnChangeEvent()},onItemHovered:function(t){e.onItemHovered(t)}},this._buildAdditionalPopupListProperties()))},_buildAdditionalPopupListProperties:function(){return null},_processOnChangeEvent:function(){if(this.popupList.selectedItem){var e=this.value,t=this.popupList.selectedItem;this.value=t[this.idProperty],this._updateSelection(),this.onChange&&this.onChange({type:"change",value:this.value,previousValue:e,selectedItem:t})}(!this._closePopupOnChangeFunc||this._closePopupOnChangeFunc(this.value))&&v.close(this.popupList)},_makePopup:function(){if(this._popupCreationHandler){this._popupCreationHandler.remove(),delete this._popupCreationHandler;var e=this;v.makePopup(this.popupList,this,this.openButton,{openMouseEvent:this.openMouseEvent,stopEventPropagation:this.stopOpenEventPropagation,toggleOnClick:this.toggleOnClick,wrapperClass:this.listClass?this.listClass.split(" ").map((function(e){return e+"Popup"})).join(" "):null,orient:this.orient,allowAutoOrientation:this.allowAutoOrientation,noOverflow:this.noPopupOverflow,onClickComponent:this.onClickComponent,onPreShow:function(){e.onPopupListPreBuild(),e.makePopupListWidthMatchOpenButtonWidth&&n.set(e.popupList.domNode,"minWidth",l.getContentBox(e.domNode).w+"px"),e._updatePopupListStore(),e.onPopupPreOpened()},onShow:function(){e.onPopupOpened(),S.setFocusedSelect(e),e._onPopupOpened()},onClose:function(){e.onPopupClosed(),S.setFocusedSelect(null),e.clearPopupOnClose&&e._clearPopup()},isMouseOver:function(){return e.isMouseOverList()}})}},_clearPopup:function(){this.popupList&&this.popupList.clear&&this.popupList.clear()},_tryAssignPlaceholder:function(){return this.placeHolder&&null===this.value?(this.selectedLabel.innerHTML=this.placeHolder,s.add(this.selectedLabel,this.placeHolderClass),!0):(s.remove(this.selectedLabel,this.placeHolderClass),!1)},_normalizeValue:function(){null!==this.value&&(void 0!==this.value?("string"==typeof this.value&&(this.value=this.value.trim()),String(this.value)||(this.value=null)):this.value=null)},trySelectValue:function(e){return this.value=e,this._normalizeValue(),this._trySelectValue()},_trySelectValue:function(){if(null!==this.value&&this._setValueAttr(this.value,!0))return!0;if(this.requireSelection){var e=this.store&&this.store.query();if(e&&e.length){var t=this;this.value&&e.some((function(e){return t.value===e[t.idProperty]}))?this._setValueAttr(this.value,!0):this._setValueAttr(e[0][this.idProperty],!0)}}return!1},_setValueAttr:function(e,t){if(this.value=e,this._normalizeValue(),!this.store||!this.popupList)return!1;var o=this,i=this.store.query((function(e){return e[o.idProperty]===o.value}))[0];return i&&this.popupList.setSelectedItem(i),this._updateSelection(i),!!i},_setOptionsAttr:function(e){this.options=e,this.store=this._createStore(e),this._updatePopupListStore(),this._trySelectValue()},_setStoreAttr:function(e){this.store=this._createStore(e),this.options=this.store&&this.store.query(),e.idProperty&&(this.idProperty=e.idProperty),this._updatePopupListStore(),this._trySelectValue()},_createStore:function(e){return e instanceof Array?new r({data:e,idProperty:this.idProperty}):e},_updatePopupListStore:function(){this.popupList&&(this.popupList.store&&this.popupList.store===this.store&&!this.clearPopupOnClose||this.popupList.setStore(this.store,!0),this.popupList.setSelectedItem(this.getSelectedItem()),this._lastPopupListScrollTop&&(this.popupList.domNode.scrollTop=this._lastPopupListScrollTop))},getSelectedItem:function(){if(!this.store)return null;var e=this.get("value"),t=this;return void 0!==e&&this.store.query((function(o){return o[t.idProperty]===e}))[0]},setSelectedItem:function(e){this.store&&this.popupList&&e&&this._setValueAttr(e[this.idProperty],!0)},getSelectedIndex:function(){var e=this,t=-1;if(this.store){var o=this.get("value");void 0!==o&&this.store.query().some((function(i,s){if(i[e.idProperty]==o)return t=s,!0}))}return t},setSelectedIndex:function(e){var t=this.store&&this.store.data[e];this.setSelectedItem(t)},_nodeToKeepAsSelectedPlacedFlag:!1,_updateSelection:function(e){e=e||this.getSelectedItem(),this.nodeToKeepAsSelected?this._nodeToKeepAsSelectedPlacedFlag||(m.hide(this.selectedLabel),m.show(this.selectedItemHolder),this.selectedItemHolder.innerHTML="",i.place(this.nodeToKeepAsSelected,this.selectedItemHolder),this._nodeToKeepAsSelectedPlacedFlag=!0):this.renderSelectionAsItem?(m.hide(this.selectedLabel),m.show(this.selectedItemHolder),this.selectedItemHolder.innerHTML="",e&&this.popupList.itemRenderer.createPresentation(e,!1,this.selectedItemHolder,this.popupList)):(m.hide(this.selectedItemHolder),this.labelTextToKeep?this.selectedLabel.innerHTML=this.labelTextToKeep:(this.selectedLabel.innerHTML=e?e[this.labelProperty]:"",this.selectedLabel.innerHTML&&s.remove(this.selectedLabel,this.placeHolderClass),m[this.selectedLabel.innerHTML||this._tryAssignPlaceholder()?"show":"hide"](this.selectedLabel)))},refresh:function(){this.popupList.refresh(),this._updateSelection()},isPopupOpen:function(){return v.isOpen(this.popupList)},openPopup:function(){this.isPopupOpen()||(this._makePopup(),v.open(this.popupList))},closePopup:function(){this._popupCreationHandler||v.close(this.popupList)},refreshPopup:function(){this.isPopupOpen()&&v.refresh(this.popupList)},isMouseOver:function(e){return _.isMouseOver(this.domNode,{event:e})||this.isMouseOverList(e)},isMouseOverList:function(e){return this.popupList&&_.isMouseOver(this.popupList.domNode,{event:e})},onPopupListPreBuild:function(){},onPopupPreOpened:function(){},onPopupOpened:function(){},_onPopupOpened:function(){},onPopupClosed:function(){},onChange:function(e){},onItemHovered:function(e){},destroy:function(){this._popupCreationHandler&&this._popupCreationHandler.remove(),this.closePopup(this.popupList),this.popupList.destroy(),this.inherited(arguments)}})}));