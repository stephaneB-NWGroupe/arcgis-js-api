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

define(["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/has","dojo/keys","dojo/on","dojo/query","dojo/window","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dnd/Avatar","dojo/dnd/Source","dojo/i18n!../nls/jsapi","dijit/a11yclick","dijit/_WidgetBase","../kernel","../domUtils","../Evented","../geometry/Extent","./BookmarkItem","dijit/_TemplatedMixin","dojo/text!./templates/Bookmarks.html"],(function(e,o,t,i,s,n,r,a,d,h,k,m,c,l,u,_,p,B,b,f,x,v,g,N,H){var L=t([B,N,x],{declaredClass:"esri.dijit.Bookmarks",templateString:H,bookmarks:[],bookmarkDomNode:null,bookmarkTable:null,initBookmarks:null,editable:null,map:null,_oldGenerateText:null,_customGenerateText:!1,_LTR:!0,_dndSource:null,_inputBox:null,_label:null,_css:{esriBookmarks:"esriBookmarks",esriBookmarksRTL:"esriBookmarksRTL",esriBookmarkList:"esriBookmarkList",esriBookmarkTable:"esriBookmarkTable",esriBookmarkEditImage:"esriBookmarkEditImage",esriBookmarkRemoveImage:"esriBookmarkRemoveImage",esriBookmarkLabel:"esriBookmarkLabel",esriBookmarkItem:"esriBookmarkItem",esriBookmarkHighlight:"esriBookmarkHighlight",esriAddBookmark:"esriAddBookmark",esriBookmarkEditBox:"esriBookmarkEditBox"},_clickHandlers:[],_mouseOverHandlers:[],_mouseOutHandlers:[],_removeHandlers:[],_editHandlers:[],_dndHandlers:[],_eventMap:{click:!0,edit:!0,remove:!0},onClick:function(){},onEdit:function(){},onRemove:function(){},constructor:function(e,o){this.initBookmarks=e.bookmarks,delete e.bookmarks},postCreate:function(){this.srcNodeRef=this.domNode,this._LTR=this.isLeftToRight(),this._LTR||k.add(this.domNode,this._css.esriBookmarksRTL),this._dndSource=new u(this.bookmarkTable,{creator:this._avatarCreator,singular:!0,checkAcceptance:function(e,o){return this===e}}),this._dndSourceNodes=this._dndSource.getAllNodes(),this._dndHandlers.push(r(this._dndSource,"DndStart",i.hitch(this,(function(e){e===this._dndSource&&(this._oldGenerateText=l.prototype._generateText,l.prototype._generateText=i.hitch(this,this._generateText),this._customGenerateText=!0,this._inputBox&&this._inputBox.blur())})))),this._dndHandlers.push(r(this._dndSource,"DndDrop",i.hitch(this,(function(e){e===this._dndSource&&(this._syncBookmarksAfterReorder(),this.emit("reorder",this.bookmarks))})))),this._dndHandlers.push(r(this._dndSource,"DndCancel",i.hitch(this,(function(){this._customGenerateText&&(l.prototype._generateText=this._oldGenerateText,this._customGenerateText=!1)})))),this._addInitialBookmarks()},destroy:function(){this.inherited(arguments),this.map=null,e.forEach(this._clickHandlers,(function(e){o.disconnect(e)})),e.forEach(this._mouseOverHandlers,(function(e){o.disconnect(e)})),e.forEach(this._mouseOutHandlers,(function(e){o.disconnect(e)})),e.forEach(this._removeHandlers,(function(e){o.disconnect(e)})),e.forEach(this._editHandlers,(function(e){o.disconnect(e)})),m.destroy(this.bookmarkDomNode)},addBookmark:function(e){var t,s,n,r,h,c,l,u,B;"esri.dijit.BookmarkItem"===e.declaredClass?t=e:(s=new v(e.extent),t=new g({name:e.name,extent:s})),this.editable?(h=(r=_.widgets.bookmarks).NLS_bookmark_edit,c=r.NLS_bookmark_remove,n=m.create("div",{innerHTML:'<div tabindex="0" role="button" class=\'esriBookmarkLabel\'>'+e.name+'</div><div tabindex="0" role="button" title=\''+c+"' class='esriBookmarkRemoveImage'><br/></div><div tabindex=\"0\" role=\"button\" title='"+h+"' class='esriBookmarkEditImage'><br/></div>"}),l=a(".esriBookmarkEditImage",n)[0],u=a(".esriBookmarkRemoveImage",n)[0],this._removeHandlers.push(o.connect(u,p,this,"_removeBookmark")),this._editHandlers.push(o.connect(l,p,this,"_editBookmarkLabel"))):n=m.create("div",{innerHTML:"<div tabindex=\"0\" class='esriBookmarkLabel'>"+e.name+"</div>"}),k.add(n,this._css.esriBookmarkItem),"esri.geometry.Extent"===e.extent.declaredClass?e.extent:new v(e.extent),B=a(".esriBookmarkLabel",n)[0],this._clickHandlers.push(o.connect(B,p,i.hitch(this,"_onClickHandler",e))),this._mouseOverHandlers.push(o.connect(n,"onmouseover",i.hitch(this,(function(){k.add(n,this._css.esriBookmarkHighlight)})))),this._mouseOutHandlers.push(o.connect(n,"onmouseout",i.hitch(this,(function(){k.remove(n,this._css.esriBookmarkHighlight)})))),this.bookmarks.push(t),this._dndSource.insertNodes(!1,[n]),this._dndSourceNodes=this._dndSource.getAllNodes(),d.scrollIntoView(n),this._syncBookmarksAfterReorder()},removeBookmark:function(o){this._inputBox&&this._inputBox.blur();var t,i=a(".esriBookmarkLabel",this.bookmarkDomNode),s=e.filter(i,(function(e){return e.innerHTML===o}));for(e.forEach(s,(function(e){e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)})),t=this.bookmarks.length-1;t>=0;t--)this.bookmarks[t].name===o&&this.bookmarks.splice(t,1);this.onRemove()},hide:function(){f.hide(this.bookmarkDomNode)},show:function(){f.show(this.bookmarkDomNode)},_addInitialBookmarks:function(){if(this.editable){var t=_.widgets.bookmarks.NLS_add_bookmark,s=m.create("div",{tabIndex:0,role:"button",innerHTML:"<div>"+t+"</div>"});k.add(s,this._css.esriBookmarkItem),k.add(s,this._css.esriAddBookmark),this._clickHandlers.push(o.connect(s,p,this,this._newBookmark)),this._mouseOverHandlers.push(o.connect(s,"onmouseover",i.hitch(this,(function(){k.add(s,this._css.esriBookmarkHighlight)})))),this._mouseOutHandlers.push(o.connect(s,"onmouseout",i.hitch(this,(function(){k.remove(s,this._css.esriBookmarkHighlight)})))),this.domNode.appendChild(s)}this.bookmarks=[],e.forEach(this.initBookmarks,(function(e){this.addBookmark(e)}),this)},_newBookmark:function(){var e,o,t,i,s,n,r,d,h,k,m,c,l=this.map,u=_.widgets.bookmarks.NLS_new_bookmark,p=l.extent;l.spatialReference._isWrappable()?(o=v.prototype._normalizeX(p.xmin,l.spatialReference._getInfo()).x)>(t=v.prototype._normalizeX(p.xmax,l.spatialReference._getInfo()).x)?(i=(d=l.spatialReference.isWebMercator())?20037508.342788905:180,s=d?-20037508.342788905:-180,Math.abs(o-i)>Math.abs(t-s)?(n=o,r=i):(n=s,r=t),c=new v(n,p.ymin,r,p.ymax,l.spatialReference)):c=new v(o,p.ymin,t,p.ymax,l.spatialReference):c=p,h=new g({name:u,extent:c}),this.addBookmark(h),m=(k=a(".esriBookmarkItem",this.bookmarkDomNode))[k.length-1],(e={target:{parentNode:null}}).target.parentNode=m,this._editBookmarkLabel(e)},_removeBookmark:function(e){e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode),this.removeBookmark(e.target.parentNode.textContent)},_syncBookmarksAfterReorder:function(){var o=[],t=this._dndSource.getAllNodes();e.forEach(t,i.hitch(this,(function(e){var t=this._dndSourceNodes.map((function(o,t){if(o===e)return t})).filter(isFinite)[0];o.push(this.bookmarks[t])}))),this.bookmarks=o,this._dndSourceNodes=t},_generateText:function(){return this._dndSource&&this._dndSource.getSelectedNodes()[0]&&this._dndSource.getSelectedNodes()[0].firstChild.firstChild.innerHTML?this._dndSource.getSelectedNodes()[0].firstChild.firstChild.innerHTML:""},_editBookmarkLabel:function(e){this._inputBox&&this._inputBox.blur();var o,t,s,d=_.widgets.bookmarks.NLS_new_bookmark,h=e.target.parentNode,k=h.firstChild||a(".esriBookmarkLabel",h)[0],l=c.position(h,!0).y;this._label=k,s=k.innerHTML!==d?k.textContent:"",t={top:l+"px"},this._inputBox=m.create("input",{className:"esriBookmarkEditBox",value:s,style:t},this.domNode),r(this._inputBox,"keyup",i.hitch(this,(function(e){switch(e.keyCode){case n.ENTER:this._inputBox.blur()}}))),r(this._inputBox,"focus",i.hitch(this,(function(){this.map&&"function"==typeof this.map.disableKeyboardNavigation&&this.map.disableKeyboardNavigation()}))),r(this._inputBox,"blur",i.hitch(this,(function(){this.map&&"function"==typeof this.map.enableKeyboardNavigation&&this.map.enableKeyboardNavigation(),this._finishEdit()}))),this._inputBox.focus(),this._inputBox.select(),o=c.position(h,!0),this._inputBox.style.top=o.y+"px"},_finishEdit:function(){if(this._inputBox){var o=_.widgets.bookmarks.NLS_new_bookmark,t=a(".esriBookmarkLabel",this.bookmarkDomNode),i=this._inputBox.value;if(i===this._label.innerHTML)return this._inputBox.parentNode.removeChild(this._inputBox),void(this._inputBox=null);this._label.textContent=""!==i?i:o,e.forEach(this.bookmarks,(function(e,o){e&&t[o]&&(e.name=t[o].innerHTML)})),this._inputBox.parentNode.removeChild(this._inputBox),this._inputBox=null,this.onEdit()}},_avatarCreator:function(e,o){var t=m.create("div");return t.id=dojo.dnd.getUniqueId(),k.add(t,"dojoDndItem"),"avatar"!==o&&m.place(e,t),{node:t,data:e,type:"something"}},_onClickHandler:function(e){var o=e.extent;e.extent.declaredClass||(o=new v(e.extent)),this.map.setExtent(o),this.onClick()},toJson:function(){var o=[];return e.forEach(this.bookmarks,(function(e){e&&o.push(e.toJson())})),o}});return s("extend-esri")&&i.setObject("dijit.Bookmarks",L,b),L}));