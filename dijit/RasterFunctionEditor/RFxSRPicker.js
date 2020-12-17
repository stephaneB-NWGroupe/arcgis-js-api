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

define(["dojo/_base/declare","dojo/dom-class","dojo/query","dojo/on","dojo/Evented","dijit/registry","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/text!./templates/RFxSRPicker.html","dojo/i18n!../../nls/jsapi","./srUtils","dojo/NodeList","dojo/NodeList-traverse"],(function(e,t,i,s,r,o,n,a,d,l,h,c){return e("esriRFxSRPicker",[n,a,d,r],{templateString:l,idPrefix:"srsList",dismissContainer:null,dismissOutside:!0,category:1,_uniqueId:"",treeviewStyle:"treeview-sm",rightIcon:"om-svg-chevron-right",constructor:function(e,t){this.domNode=t,this._i18n=h.analysisSettings,this.dismissContainer=e&&e.dismissContainer,this._uniqueId=o.getUniqueId(this.idPrefix),this.templateString=this.templateString.replace("{srconfig.id}",this._uniqueId),this.category=e&&null!=e.category?e.category:this.category;var i=c.categories;switch(this.category){case 1:i={"Geographic Coordinate Systems":i["Geographic Coordinate Systems"],"Projected Coordinate Systems":i["Projected Coordinate Systems"]};break;case 2:i={"Vertical Coordinate Systems":i["Vertical Coordinate Systems"]};break;default:i=i}this.srCategories=i,this._flattedSRS=this._getFlattedSRS(),this._l10nResources={"Geographic Coordinate Systems":this._i18n.geographicCS,"Projected Coordinate Systems":this._i18n.projCS},this.value=e&&e.value},postCreate:function(){var e=this.createTreeView(this.srCategories);this.srsTreeNode.innerHTML=e,this._leaves=i(".treeview a.leaf",this.domNode),this._divs=i(".treeview div",this.domNode),this._folders=i(".treeview .list-group-item:not(.leaf)",this.domNode),this._icons=this._divs.prev().children("i"),this._treeview=i(".treeview",this.domNode)[0];var r=this.srsInputNode,o=this._treeview;if(this.value&&this._populateSRSInput(this.value),this.dismissOutside){var n=this.dismissContainer||document;this.own(s(n,":not(.treeview):click",(function(e){o.contains(e.target)||r.parentNode.contains(e.target)||t.remove(o,"in")})))}this.own(s(this.domNode,".treeview a.leaf:click",function(e){var i=e.target.innerText;t.remove(o,"in"),this.setSR(i)}.bind(this)),s(this.domNode,".treeview .list-group:click",function(e){var i,s=e.target;s&&s.matches(".list-group-item")?(i=s.dataset&&s.dataset.target,t.toggle(s,"open")):s&&s.matches(".om-svg")&&(i=s.parentElement.dataset&&s.parentElement.dataset.target,t.toggle(s.parentElement,"open")),i&&this._toggleVisibility(i)}.bind(this)))},reset:function(){this.srsInputNode.value="",this._divs.removeClass("in"),this._leaves.removeClass("hidden"),this._folders.removeClass("hidden"),this._searchText="",t.add(this.nodeClearSRS,"hidden")},_getFlattedSRS:function(){var e=[];return function t(i,s){"object"==typeof s?Object.keys(s).forEach((function(e){t(e,s[e])})):e.push({wkid:i,name:s})}(null,this.srCategories),e},createTreeView:function(e,t,i,s,r){if(null==t&&(t=0),i=i||this._uniqueId,"object"==typeof e){var o=Object.keys(e),n=i+"-"+t;null==r&&(r=0),null==this.currentIndex&&(this.currentIndex=0);var a,d=i+"-"+(t-1)+"-"+r;a=1===t?this._l10nResources[s]:s;var l='<a class="list-group-item level'+t+'" data-target="#'+n+"-"+this.currentIndex+'" data-parent="#'+d+'"><i class="om-svg '+this.rightIcon+'"></i><i class="om-svg om-svg-folder-close"></i>'+a+"</a>",h=this.currentIndex,c=this.treeviewStyle?this.treeviewStyle:"treeview-popup",u=o.map((function(s){var r=this.createTreeView(e[s],t+1,i,s,h,this.currentIndex+1);return this.currentIndex++,r}),this).join("");return 0===t?'<div class="treeview '+c+' collapse"><div class="list-group" id="'+n+'">'+u+"</div></div>":l+'<div class="collapse" id="'+n+"-"+h+'">'+u+"</div>"}return'<a class="list-group-item level'+t+' leaf" tabIndex="0" role="listitem"><i class="esri-icon-globe"></i><span>'+e+"</span></a>"},setSR:function(e){this.srsInputNode.value=e,this._searchText=e,t.remove(this.nodeClearSRS,"hidden")},getSR:function(e){var t=this.srsInputNode.value,i=this._flattedSRS.find((function(e){return e.name.toLowerCase().trim()===t.toLowerCase().trim()}));return(i=i||{wkid:0,name:t}).wkid=parseInt(i.wkid),i},getSRWithID:function(e){return this._flattedSRS.find((function(t){return t.wkid.toLowerCase().trim()===e.toString()}))},showOptions:function(){var e="#"+this._uniqueId+" .treeview";this._toggleVisibility(e)},_toggleVisibility:function(e){t.toggle(i(e,this.domNode)[0],"in")},_populateSRSInput:function(){var e=this.getSRWithID(this.value.wkid);e&&this.setSR(e.name)},_getValueAttr:function(){var e=this.getSR(this.srsInputNode.value);return this.value={wkid:e.wkid,latestWkid:e.wkid},this.value}})}));