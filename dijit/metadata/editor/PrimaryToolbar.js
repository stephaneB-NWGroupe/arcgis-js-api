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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/Deferred","dojo/_base/fx","dojo/dom-class","dojo/dom-style","dojo/has","dojo/query","../base/Templated","./PrimaryToolbarMixin","dojo/text!./templates/PrimaryToolbar.html","dojo/i18n!../nls/i18nBase","../base/TabButton","../base/ValidationTracker","./util/MessageDialog","../../../kernel"],(function(e,t,i,o,s,d,n,a,l,r,h,c,m,u,v,g,w){var f=e([r,h],{_disabled:!0,_escapeSingleQuotes:!0,_mode:null,editor:null,lastSavedXml:null,templateString:c,canDownloadFiles:!1,postCreate:function(){this.inherited(arguments)},initialize:function(){var e=this.editor.gxeAdaptor.getAllowEditMetadata();e||n.set(this.editButton.domNode,"display","none"),this.editor.gxeContext.allowViewXml||n.set(this.viewXmlButton.domNode,"display","none"),this.editor.gxeContext.allowView||e&&(n.set(this.viewButton.domNode,"display","none"),this.editor.gxeContext.allowViewXml||n.set(this.editButton.domNode,"display","none")),this.editor.gxeContext.arcgisMode&&(this.loadButtonLabel.innerHTML=this.i18nBase.editor.load.portalCaption),this.updateUI()},initializeView:function(){this._initializeView()},_checkForChanges:function(e,t){var i=new o,s=this.editor.getEditDocument();if(!s)return i.resolve(!0),i;var d=new v({ignoreErrors:!0}),n=s.generateXml(d);return this._compareXmls(n,this.lastSavedXml)?(i.resolve(!0),i):(new g({title:e,okLabel:t,onOkClick:function(e){i.resolve(!0)},onCancelClick:function(e){i.resolve(!1)}}).show(m.editor.changesNotSaved.prompt),i)},_close:function(){this.editor.dialogBroker&&this.editor.dialogBroker.dialog&&this.editor.dialogBroker.hide()},_fadeIn:function(e){n.set(this.messageArea,"display","none"),this.workingNode.innerHTML="",s.fadeIn({node:this.editor.canvasNode,onEnd:t.hitch(this,(function(){this._disabled=!1,this.updateUI(),e&&e()}))}).play()},_fadeOut:function(e,o){this._disabled=!0,n.set(this.messageArea,"display","inline-block"),this.setNodeText(this.workingNode,e),i.forEach(l("button",this.domNode),(function(e){e.disabled=!0})),s.fadeOut({node:this.editor.canvasNode,onEnd:t.hitch(this,(function(){o&&o()}))}).play()},_onCloseClick:function(){if(!this._disabled){var e=m.editor.changesNotSaved.dialogTitle,i=m.editor.changesNotSaved.closeButton;this._checkForChanges(e,i).then(t.hitch(this,(function(e){e&&this._close()})))}},_onDeleteClick:function(){this._disabled||(this.lastSavedXml?this._confirmAndDelete():this.editor.gxeContext.arcgisMode&&new g({title:m.editor.del.caption,cancelLabel:m.general.close,showOk:!1}).show(m.editor.del.portalNone))},_onDownloadClick:function(){if(!this._disabled){var e=this.editor.xmlPane.xmlString,t=this.editor.xmlPane.xmlTitle;null!==e&&this._download(e,t,!1)}},_onEditClick:function(e){if(!this._disabled){var t=this.editor.getEditDocument();this._setMode("edit"),t||this._loadEditor()}},_onLoadClick:function(){this._disabled||this._showLoadDialog(null)},_onSaveClick:function(){if(!this._disabled){var e={isSaveAsDraft:!1,isSaveAndClose:!1,bPushToItem:!1,showDialog:!1};this.editor.gxeAdaptor.getAllowPushToItem()&&(e.bPushToItem=!0),this._save(e)}},_onSaveAndCloseClick:function(){if(!this._disabled){var e={isSaveAsDraft:!1,isSaveAndClose:!0,bPushToItem:!1,showDialog:!1};this.editor.gxeAdaptor.getAllowPushToItem()&&(e.bPushToItem=!0),this._save(e)}},_onSaveDraftClick:function(){if(!this._disabled){this._save({isSaveAsDraft:!0,isSaveAndClose:!1,bPushToItem:!1,showDialog:!1})}},_onTransformClick:function(){if(!this._disabled){var e=this.editor.getEditDocument();if(e){var t=this._getTransformationTypes(e);t.length>0&&this._showTransformDialog(e,t)}}},_onValidateClick:function(){this._disabled||this._validate(!1)},_onViewClick:function(){this._disabled||this._loadView()},_onViewHtmlClick:function(){if(!this._disabled){var e=this.editor.getEditDocument();if(e){var i,o=m.editor.viewHtml.savePrompt;this.lastSavedXml||(o=m.editor.viewHtml.portalNone);var s=this.editor.gxeAdaptor.getAllowPushToItem();this.editor.validationPane.clearMessages();var d=new v({isSaveAsDraft:!0,validationPane:this.editor.validationPane}),n=e.generateXml(d);d.hadValidationErrors||((i=new g({title:m.editor.viewHtml.dialogTitle,okLabel:m.editor.viewHtml.saveButton})).show(o),i.okCancelBar.onOkClick=t.hitch(this,(function(){i.okCancelBar.disableOk(),this.editor.gxeAdaptor.saveXml(e,n,s).then(t.hitch(this,(function(){this.lastSavedXml=n,setTimeout(t.hitch(this,(function(){this.editor.gxeAdaptor.viewHtml(n).then((function(){})),i.hide()})),1500)})),t.hitch(this,(function(e){var t=m.editor.save.errorSaving;i.okCancelBar.showFatalError(t,e)})))})))}}},_onViewXmlClick:function(){if(!this._disabled){var e=this.editor.getEditDocument();if(e){var t=new v({ignoreErrors:!0}),i=e.generateXml(t);this.editor.xmlPane.setXml(i,t.documentTitle),this._setMode("viewXml"),this.updateUI()}else this._setMode("viewXml")}},_setMode:function(e){"viewXml"===e&&(this.editor.gxeContext.allowViewXml||(e="view")),"view"===e?(d.add(this.viewButton.domNode,"current"),d.remove(this.viewXmlButton.domNode,"current"),d.remove(this.editButton.domNode,"current"),n.set(this.editToolset,"display","none"),n.set(this.viewToolset,"display",""),this.editor.validationPane.clearMessages(),n.set(this.editor.xmlPane.domNode,"display","none"),n.set(this.editor.editDocumentPane.domNode,"display","none"),n.set(this.editor.viewDocumentPane.domNode,"display",""),this.editor.resizeDocument(this.editor.viewDocumentPane)):"viewXml"===e?(d.add(this.viewXmlButton.domNode,"current"),d.remove(this.viewButton.domNode,"current"),d.remove(this.editButton.domNode,"current"),n.set(this.editToolset,"display","none"),n.set(this.viewToolset,"display",""),this.editor.validationPane.clearMessages(),n.set(this.editor.viewDocumentPane.domNode,"display","none"),n.set(this.editor.editDocumentPane.domNode,"display","none"),n.set(this.editor.xmlPane.domNode,"display",""),this.editor.resizeXmlPane()):"edit"===e&&(d.add(this.editButton.domNode,"current"),d.remove(this.viewButton.domNode,"current"),d.remove(this.viewXmlButton.domNode,"current"),n.set(this.viewToolset,"display","none"),n.set(this.editToolset,"display",""),n.set(this.editor.viewDocumentPane.domNode,"display","none"),n.set(this.editor.xmlPane.domNode,"display","none"),n.set(this.editor.editDocumentPane.domNode,"display",""),this.editor.resizeDocument(this.editor.editDocumentPane)),this._mode=e,this.updateUI()},updateUI:function(){var e=function(e,t){e.disabled=!t,t?n.set(e,"display",""):n.set(e,"display","none")},t=this.editor.xmlPane.xmlString,i=this.editor.xmlPane.xmlTitle,o=this.editor.getEditDocument(),s=this._getTransformationTypes(o),d=null!==o,a=this.editor.gxeAdaptor.getAllowEditMetadata(),l=this.editor.gxeAdaptor.getAllowDeleteMetadata(),r=this.editor.gxeContext.allowDownload,h=this.editor.gxeContext.allowDraft,c=this.editor.gxeContext.allowSaveAndClose,m=this.editor.gxeContext.showValidateButton,u=this.editor.gxeContext.allowViewHtml,v=null!==t&&null!==i,g=a&&d,w=s.length>0,f=l&&null!==this.lastSavedXml,_=this.editor&&this.editor.dialogBroker,p=u&&g;l&&this.editor.gxeContext.arcgisMode&&(f=!0);var x=!1,b=!1;try{"undefined"!=typeof FileReader&&"undefined"!=typeof Blob&&(x=!0,b=!0)}catch(e){}e(this.downloadButton,b&&v&&r),e(this.viewHtmlButton,p),e(this.saveButton,g),e(this.saveAndCloseButton,g&&_&&c),e(this.saveDraftButton,b&&d&&h),e(this.validateButton,g&&m),e(this.loadButton,x),e(this.transformButton,w),e(this.deleteButton,f),e(this.closeButton,_)}});return a("extend-esri")&&t.setObject("dijit.metadata.editor.PrimaryToolbar",f,w),f}));