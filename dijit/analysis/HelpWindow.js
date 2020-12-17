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

define(["require","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/aspect","dojo/has","dojo/dom-construct","dojo/dom-class","dojo/dom-attr","dojo/dom-style","dojo/query","dojo/window","dojo/dom-geometry","dijit/_Widget","dijit/TooltipDialog","dijit/popup","../../kernel","../../lang","../../urlUtils","../../request","../_EventedWidget","dojo/i18n!../../nls/jsapi"],(function(e,i,t,s,l,o,a,n,h,p,r,d,c,f,H,u,g,m,v,w,M,y,_,j,x){var P=t([g],{declaredClass:"esri.dijit.analysis.HelpWindow",i18n:null,onlineHelpMap:null,showLearnMore:!1,class:"esriAnalyisHelpWindow",constructor:function(e){this.isPortal=e&&e.isPortal},postMixInProperties:function(){this.inherited(arguments),this.i18n={},s.mixin(this.i18n,x.common),s.mixin(this.i18n,x.analysisHelp)},postCreate:function(){this.inherited(arguments);var i,t,l,o,n=["ar","he"];for(this.onlineHelpMap={},i=0;i<n.length;i+=1)t=n[i],a.locale&&-1!==a.locale.indexOf(t)&&(-1!==a.locale.indexOf("-")?-1!==a.locale.indexOf(t+"-")&&(this._isRightToLeft=!0):this._isRightToLeft=!0);o=this.isPortal?"./help/helpmap_enterprise.json":"./help/helpmap.json",l=e.toUrl(o),_({url:l}).then(s.hitch(this,(function(e){this.onlineHelpMap=e.map}))),this._initSelfHelpMap()},_getAbsoluteUrl:function(e){var i=y.getProtocolForWebResource();return/^https?\:/i.test(e)?e:/^\/\//i.test(e)?i+e:/^\//i.test(e)?i+"//"+window.location.host+e:void 0},_computeSize:function(e){var i={w:400,h:200};return h("esri-mobile")?i={w:"50%",h:"90%"}:-1!==e.indexOf("Category")?(i.w=400,i.h=320):-1!==e.indexOf("Tool")?(i.w=400,i.h=320):-1!==e.indexOf("toolDescription")&&(i.w=400,i.h=520),i},_initSelfHelpMap:function(){this.isPortal&&this.portalSelf&&this.portalSelf.helpMap&&(this.selfHelpMap=this.portalSelf.helpMap.m)},_setHelpTopicAttr:function(t){this.tooltipHelpDlg&&(v.close(this.tooltipHelpDlg),this.tooltipHelpDlg.destroy(),this.tooltipHelpDlg=null);var l,o,n,h,p,r,d,c,f,H,u,g;this.showLearnMore=!1,c=this._analysisGpServer&&-1!==this._analysisGpServer.indexOf("dev")?"dev":this._analysisGpServer&&-1!==this._analysisGpServer.indexOf("qa")?"uat":"",H=this.isPortal?"-PortalOnly":"-OnlineOnly",g=["es-es","es-mx","fr-fr","fr-ch","it-ch","it-it","de-de","de-ch"],"nb"===(l=s.clone(a.locale))?l="no":-1!==i.indexOf(g,l)&&(l=l.split("-")[0]),o=["ar","bs","ca","cs","da","de","es","el","et","fi","fr","he","hr","hu","id","it","ja","ko","lt","lv","ru","nl","no","pl","pt-br","pt-pt","ro","sl","sk","sv","sr","th","tr","uk","vi","zh-cn","zh-hk","zh-tw"],f=["ar","de","es","fr","it","ja","ko","ru","pl","pt-br","zh-cn"],"SHOWHELPURL"===t?(p=this.helpIdUrl,this.showLearnMore=!1):(p=e.toUrl("esri/dijit/analysis/help/"+this.helpFileName+".html"),u=this.helpFileName,M.isDefined(this.onlineHelpMap[u])&&M.isDefined(this.onlineHelpMap[u][t])&&(this.showLearnMore=!0,d="https://doc"+c+".arcgis.com/en/arcgis-online/analyze/"+this.onlineHelpMap[u][t],this.isPortal&&this.helpBase&&this.selfHelpMap&&(d=this.helpBase+this.selfHelpMap[this.onlineHelpMap[u][t]])),-1!==i.indexOf(o,l)&&(-1!==l.indexOf("-")&&(r=l.split("-"),l=r[0]+"-"+r[1].toUpperCase()),p=e.toUrl("esri/dijit/analysis/help/"+l+"/"+this.helpFileName+".html")),-1!==i.indexOf(f,l)&&this.showLearnMore&&(d="https://doc"+c+".arcgis.com/"+l+"/arcgis-online/analyze/"+this.onlineHelpMap[u][t],this.isPortal&&this.helpBase&&this.selfHelpMap?d=this.helpBase+this.selfHelpMap[this.onlineHelpMap[u][t]]:this.isPortal&&!this.helpBase&&(d="https://server"+c+".arcgis.com/"+l+"/portal/latest/use/"+this.onlineHelpMap[u][t]))),n=this._computeSize(t),this._size=n,h="<div class='' style='position:relative'<div class='sizer content'><div class='contentPane'><div class='esriFloatTrailing' style='padding:0;'><a href='#' class='esriAnalysisCloseIcon' title='"+this.i18n.close+"'></a></div><iframe frameborder='0'  id='"+t+"' src='"+p+"#"+t+H+"' width='"+n.w+"' height='"+n.h+"' marginheight='0' marginwidth='0'></iframe></div></div><div class='sizer'><div class='actionsPane'><div class='actionList"+(this.showLearnMore?"'>":" hidden'>")+"<a class='action zoomTo' href='"+(this.showLearnMore?d:"#")+"' target='_help'>"+this.i18n.learnMore+"</a></div></div></div></div></div>",this.tooltipHelpDlg=new m({preload:!0,content:h,class:"esriHelpPopup esriHelpPopupWrapper esriAnalyisHelpWindow"}),this.tooltipHelpDlg.startup()},show:function(e,i){this.helpFileName=i.helpFileName,this._analysisGpServer=i.analysisGpServer,this.isPortal=i.isPortal,this.helpBase=i.helpBase,i.portalSelf&&(this.portalSelf=i.portalSelf),this.selfHelpMap||this._initSelfHelpMap(),i.analysisMode&&(this.analysisMode=i.analysisMode),i.showHelpFromUrl&&i.helpUrl&&(this.showHelpFromUrl=i.showHelpFromUrl,this.helpIdUrl=i.helpUrl,i.helpId="SHOWHELPURL"),this.set("helpTopic",i.helpId);var t,l,o,a=n.after(v,"open",s.hitch(this,(function(){f(".esriAnalysisCloseIcon",this.tooltipHelpDlg.domNode).on("click",s.hitch(this,this.close)),a.remove()}))),h=e.pageX,p=H.getBox();o=!1,i.helpParentNode&&(t=i.helpParentNode),t&&(l=u.position(t)),l&&p.w-e.pageX<l.w?(o=!0,h=l.x-this._size.w-10,this._isRightToLeft&&(h-=10)):this._isRightToLeft&&h-40<this._size.w&&(h=l.w+this._size.w+80),v.open({popup:this.tooltipHelpDlg,x:!0===this._isRightToLeft||o?h-40:h+40,y:e.screenY-e.pageY+10,onCancel:s.hitch(this,(function(){this.close()})),onExecute:function(){this.close()}}),this.tooltipHelpDlg.domNode.parentNode&&c.set(this.tooltipHelpDlg.domNode.parentNode,"overflowY","hidden")},close:function(e,i){v.close(this.tooltipHelpDlg)}});return h("extend-esri")&&s.setObject("dijit.analysis.HelpWindow",P,w),P}));