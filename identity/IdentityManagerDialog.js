// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["../core/declare","dojo/Deferred","dojo/dom-attr","dojo/keys","dijit/registry","dijit/Dialog","../kernel","../core/lang","../core/Error","../core/domUtils","./IdentityManagerBase","dojo/i18n!./nls/identity","dijit/form/Button","dijit/form/Form","dijit/form/ValidationTextBox"],function(e,t,i,r,s,n,a,d,o,l,c,_){var g=c.IdentityManagerBase,u=c.Credential;return e([g],{declaredClass:"esri.identity.IdentityManager",constructor:function(e){d.mixin(this,e)},_dialogContent:"<div data-dojo-type='dijit.form.Form' data-dojo-props='\"class\":\"esriIdForm\"'><div class='dijitDialogPaneContentArea'><div style='padding-bottom: 5px; word-wrap: break-word;'>{info}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><div class='esriErrorMsg' style='display: none; color: white; background-color: #D46464; text-align: center; padding-top: 3px; padding-bottom: 3px;'>{invalidUser}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><table style='width: 100%;'><tr><td>"+'<label>{lblUser}<br/><input data-dojo-type=\'dijit.form.ValidationTextBox\' data-dojo-props=\'type:"text", "class":"esriIdUser", required:true, trim:true, style:"width: 100%;", autocapitalize:"none", autocorrect:"off", spellcheck:false\' /></label></td></tr><tr><td><label>{lblPwd}<br/><input data-dojo-type=\'dijit.form.ValidationTextBox\' data-dojo-props=\'type:"password", "class":"esriIdPwd", required:true, style:"width: 100%;"\' /></label></td></tr></table></div><div class=\'dijitDialogPaneActionBar\'><button data-dojo-type=\'dijit.form.Button\' data-dojo-props=\'type:"button", "class":"esriIdSubmit"\'>{lblOk}</button><button data-dojo-type=\'dijit.form.Button\' data-dojo-props=\'type:"button", "class":"esriIdCancel"\'>{lblCancel}</button></div></div>',signIn:function(e,r,s){this._nls||(this._nls=_),this._loginDialog||(this._loginDialog=this.dialog=this._createLoginDialog(),this.emit("dialog-create"));var n=this._loginDialog,a=s&&s.error,d=s&&s.token,c=new t(function(){n.onCancel()});if(n.open){var g=new o("identity-manager:busy","BUSY");return c.reject(g),c.promise}return l.hide(n.errMsg_),a&&a.details&&403==a.details.httpStatus&&d&&(i.set(n.errMsg_,"innerHTML",this._nls.forbidden),l.show(n.errMsg_)),n.dfd_=c,n.serverInfo_=r,n.resUrl_=e,n.admin_=s&&s.isAdmin,i.set(n.resLink_,{title:e,innerHTML:"("+(this.getResourceName(e)||this._nls.lblItem)+")"}),i.set(n.serverLink_,{title:r.server,innerHTML:(-1!==r.server.toLowerCase().indexOf("arcgis.com")?"ArcGIS Online":r.server)+" "}),n.txtPwd_.set("value",""),n.show(),c.promise},_createLoginDialog:function(){var e=this._nls,t=d.substitute(e,this._dialogContent);t=d.substitute({resource:"<span class='resLink' style='word-wrap: break-word;'></span>",server:"<span class='serverLink' style='word-wrap: break-word;'></span>"},t);var c=new n({title:e.title,content:t,class:" esri-widget esriSignInDialog esriIdentityDialog",style:"width: 18em;",esriIdMgr_:this,onShow:function(){this.domNode.classList.add("esriIdentityDialog--visible")},onHide:function(){this.domNode.classList.remove("esriIdentityDialog--visible")},keypressed_:function(e){e.charOrCode===r.ENTER&&this.execute_()},execute_:function(){var t=this.txtUser_.get("value"),r=this.txtPwd_.get("value"),s=this.dfd_,d=this;if(this.form_.validate()&&t&&r){this.btnSubmit_.set("label",e.lblSigning);var o=a.id.findCredential(d.resUrl_,t),c=function(i){d.btnSubmit_.set("label",e.lblOk),d.btnSubmit_.set("disabled",!1),l.hide(d.errMsg_),d.hide(),n._DialogLevelManager.hide(d);var r=d.serverInfo_;d.dfd_=d.serverInfo_=d.generateDfd_=d.resUrl_=null;var a,c,_,g=o;i&&(a=i.token,c=null!=i.expires?Number(i.expires):null,_=!!i.ssl,g?(g.userId=t,g.token=a,g.expires=c,g.validity=i.validity,g.ssl=_,g.creationTime=Date.now()):g=new u({userId:t,server:r.server,token:a,expires:c,ssl:_,isAdmin:d.admin_,validity:i.validity})),s.resolve(g)};if(o&&!o._enqueued)return void c();d.btnSubmit_.set("disabled",!0),d.generateDfd_=a.id.generateToken(this.serverInfo_,{username:t,password:r},{isAdmin:this.admin_}).then(c).then(null,function(t){d.btnSubmit_.set("disabled",!1),d.generateDfd_=null,d.btnSubmit_.set("label",e.lblOk),i.set(d.errMsg_,"innerHTML",t&&t.details&&t.details.httpStatus?e.invalidUser:e.noAuthService),l.show(d.errMsg_)})}},cancel_:function(){c.generateDfd_&&c.generateDfd_.cancel();var e=c.dfd_,t=c.resUrl_,i=c.serverInfo_;c.btnSubmit_.set("disabled",!1),c.dfd_=c.serverInfo_=c.generateDfd_=c.resUrl_=null,l.hide(c.errMsg_),n._DialogLevelManager.hide(c),c.esriIdMgr_.emit("dialog-cancel",{resourceUrl:t,serverInfo:i});var r=new o("identity-manager:user-aborted","ABORTED");e.reject(r)}}),_=c.domNode;return c.form_=s.byNode(_.getElementsByClassName("esriIdForm")[0]),c.txtUser_=s.byNode(_.getElementsByClassName("esriIdUser")[0]),c.txtPwd_=s.byNode(_.getElementsByClassName("esriIdPwd")[0]),c.btnSubmit_=s.byNode(_.getElementsByClassName("esriIdSubmit")[0]),c.btnCancel_=s.byNode(_.getElementsByClassName("esriIdCancel")[0]),c.resLink_=_.getElementsByClassName("resLink")[0],c.serverLink_=_.getElementsByClassName("serverLink")[0],c.errMsg_=_.getElementsByClassName("esriErrorMsg")[0],c.connect(c.txtUser_,"onKeyPress",c.keypressed_),c.connect(c.txtPwd_,"onKeyPress",c.keypressed_),c.connect(c.btnSubmit_,"onClick",c.execute_),c.connect(c.btnCancel_,"onClick",c.onCancel),c.connect(c,"onCancel",c.cancel_),c}})});