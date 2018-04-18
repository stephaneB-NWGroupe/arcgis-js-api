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

define(["dojo/_base/declare","dojo/on","dojo/string","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dijit/_WidgetBase","dijit/_TemplatedMixin","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/NodeLabelEditor","dojo/text!./templates/PageNavigator.html","dojo/i18n!../../nls/jsapi"],function(e,t,n,i,r,a,o,s,g,d,u,h){return h=h.geoenrichment.dijit.ReportPlayer.PageNavigator,e([o,s],{templateString:u,nls:h,hideForSinglePage:!0,showArrows:!0,_labelEditor:null,postCreate:function(){var e=this;this.inherited(arguments),this._labelEditor=new d({numericOnly:!0,onApply:function(t){e._showPageAt(t-1)},onCancel:function(){e._updatePageNavigator()}}),this.showArrows?(t(this.prevPageButton,"click",function(){e._showPrevPage()}),t(this.nextPageButton,"click",function(){e._showNextPage()})):g.hide([this.prevPageButton,this.nextPageButton]),t(this.currentPageLabel,"click",function(){e._labelEditor.range={min:1,max:e.getNumPages()},e._labelEditor.editNodeLabel(e.currentPageLabel,e._currentPageIndex+1)})},_currentPageIndex:0,_updatePageNavigator:function(){var e=this.getNumPages();g[1==e&&this.hideForSinglePage?"hide":"show"](this.domNode),this.currentPageLabel.innerHTML=n.substitute(h.currentPageOutOfN,{current:this._currentPageIndex+1,total:e}),i[0==this._currentPageIndex?"add":"remove"](this.prevPageButton,"disabled"),i[this._currentPageIndex==e-1?"add":"remove"](this.nextPageButton,"disabled")},_showPrevPage:function(){0!==this._currentPageIndex&&this.setCurrentPageIndex(this._currentPageIndex-1,!0)},_showNextPage:function(){this._currentPageIndex!==this.getNumPages()-1&&this.setCurrentPageIndex(this._currentPageIndex+1,!0)},_showPageAt:function(e){e<0||e>this.getNumPages()-1||e===this._currentPageIndex||this.setCurrentPageIndex(e,!0)},getCurrentPageIndex:function(){return this._currentPageIndex},getNumPages:function(){return 0},setCurrentPageIndex:function(e,t){this._currentPageIndex=e,this._updatePageNavigator(),t&&this.onPageChanged(this._currentPageIndex)},reset:function(){this.setCurrentPageIndex(0)},onPageChanged:function(e){}})});