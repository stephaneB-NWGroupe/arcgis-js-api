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

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/promise/all","esri/dijit/geoenrichment/Deferred","esri/dijit/geoenrichment/when","dojo/on","dojo/keys","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","./config","./playerSupports/_CommandSupport","./playerSupports/_LogoSupport","./playerSupports/_MapSupport","./playerSupports/_PageNavigationSupport","./playerSupports/_PrintSupport","./playerSupports/_ReportContainersSwitcher","./playerSupports/_SmartLayoutSupport","./playerSupports/_ZoomSupport","./playerSupports/_WaitingSupport","./supportClasses/PlayerConfigurator","./supportClasses/PlayerToFullScreenAnimator","./toolbar/PlayerToolbar","./ReportPlayerViewModel","./PlayerResizeModes","./PlayerThemes","./PlayerViewModes","./ReportPlayerState","./PlayerZoomBehaviors","./DataProviderGE","./dataProvider/commands/supportClasses/LayoutXMLBuilder","esri/dijit/geoenrichment/utils/DelayUtil","esri/dijit/geoenrichment/utils/DeviceUtil","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/InvokeUtil","esri/dijit/geoenrichment/utils/async/AsyncQueue","dojo/text!./templates/ReportPlayer.html","dojo/i18n!esri/nls/jsapi","./_devConfig"],(function(e,t,r,i,o,n,a,s,l,h,d,u,p,_,c,g,A,y,f,m,S,w,v,D,P,C,R,M,T,b,E,I,V,F,B,x,N,L,O){return e([l,h,u,p,_,g,A,y,f,c,m],{templateString:N,nls:L=L.geoenrichment.dijit.ReportPlayer.ReportPlayer,isPlayer:!0,dataProvider:null,exportCommands:null,config:null,theme:void 0,viewMode:void 0,enableDataDrilling:!0,showToolbarInPopup:!1,showAreaTitle:void 0,showReportTitle:!1,scaleSlidesToFitWindow:void 0,showCloseButton:!1,showToFullScreenAnimation:!1,canAddMoreAreas:!1,areasSelectButtons:null,comparisonSettings:null,resizeMode:void 0,printConfig:{subtitle:L.preparedByEsri,printDialogClass:"esri/dijit/geoenrichment/ReportPlayer/printing/PageOptionsDialog/PageOptionsDialog"},showProgressBar:!0,defaultZoomBehavior:void 0,nlsMap:null,isDataDrillingPlayer:!1,isPlayerOnServer:!1,_viewModel:null,_reportData:null,_analysisAreaIndex:0,_originalAreaViewMode:null,_showAllAreasSideBySide:!1,playerToolbar:null,postCreate:function(){this.config=t.mixin(d,this.config),d.isPlayerOnServer=this.isPlayerOnServer,this.isPlayerOnServer&&(d.maps.maxNumberOfMapsShownAtTheSameTime=1e6,this.defaultZoomBehavior=T.RESET),this._viewModel=new(this._getViewModelClass()),this._setUpDataProvider(),S.configurePlayer(this),!this.isPlayerOnServer&&this._initToolbar(),this._initContainerSwither(),!this.isPlayerOnServer&&this._initSmartLayout(),!this.isPlayerOnServer&&this._initCommands(),!this.isPlayerOnServer&&this._initPageNavigationControls(),!this.isPlayerOnServer&&this._initZoomControls(),!this.isPlayerOnServer&&this._applyTheme(),!this.isPlayerOnServer&&this._showError(!1),!this.isPlayerOnServer&&this._initProgressController(),V.isMobileDevice()&&(s.add(this.domNode,"esriGEReportPlayerMobile"),this._setUpMobileOrientationHandling()),this._updateElementsVisibility()},_setUpDataProvider:function(){this.dataProvider=this.dataProvider||new b,this.exportCommands&&this.exportCommands.forEach((function(e){this.dataProvider.registerCommand(e)}),this)},_orientationDfd:null,_setUpMobileOrientationHandling:function(){var e=this;this.own(n(window,"orientationchange",(function(){e._orientationDfd&&e._orientationDfd.resolve("cancel");var t=e._orientationDfd=new i;e._showWaiting(t.promise,"orientationchange"),t.promise.then((function(t){"cancel"!==t&&(e._setViewMode(null),e.refresh())})),o(e.getRenderPromise(),(function(){I.delay(500).then(t.resolve,t.resolve)}))})))},_getViewModelClass:function(){return D},_setViewMode:function(e){S.configurePlayer(this,e),this._refreshZoomControls()},_initToolbar:function(){var e=this;this.playerToolbar=new v({player:this,popupButtonDiv:this.playerAfterToolbarDiv,showToolbarInPopup:this.showToolbarInPopup,showAreaTitle:this.showAreaTitle,stretchToolbarNode:!this.showToolbarInPopup&&(this.resizeMode===P.FIT_WINDOW?document.body:this.domNode),showCloseButton:this.showCloseButton,canAddMoreAreas:this.canAddMoreAreas,areasSelectButtons:this.areasSelectButtons,onShowAnalysisAreaAt:function(t){e.showAnalysisAreaAt(t)},onCompareAreasSideBySide:function(){e.showAllAnalysisAreasSideBySide()},onShowPageAt:function(t){e.showPageAt(t)},isScrollShown:function(){var t=e.getCurrentReportContainer();return t&&t.isScrollShown&&t.isScrollShown()},onClose:function(){e._onClose()},onAddMoreAreas:function(){e.onAddMoreAreas()},onRemoveAreas:function(t){if(e.onAreasPreRemoved(t),t.forEach((function(e){e.hidden=!0})),e.viewMode===R.PANELS_IN_STACK_ALL)if(e.getAnalysisAreas().filter((function(e){return!e.hidden})).length<2)e._setAllAreasVisible(!1);else{var r={};t.forEach((function(e){r[e.index]=!1})),e.getCurrentReportContainer().setAreasVisibilityState(r,{append:!0}),e._updateAreaSelect()}else if(e.getCurrentAnalysisArea().hidden){var i=e.getAnalysisAreas().filter((function(e){return!e.hidden}))[0];i?e.showAnalysisAreaAt(i.index):e.refresh()}else e._updateAreaSelect();e.onAreasRemoved(t)}}).placeAt(this.playerToolbarDiv),this.own(this.playerToolbar),this.showCloseButton&&this.own(n(window,"keyup",(function(t){e.getWaitingPromise()||M.isViewingDataDrillingZoom||M.isImageViewerShown||t.keyCode===a.ESCAPE&&e._onClose()})))},_applyTheme:function(){s.remove(this.domNode,"playerThemeDark playerThemeLight"),s.add(this.domNode,this.theme===C.DARK?"playerThemeDark":"playerThemeLight"),this.playerToolbar.setTheme(this.theme)},playReport:function(e,t){return this._showWaiting(this._callAfterRendering("_doPlayReport",[e,t]),"playReport")},_doPlayReport:function(e,t){this.playerToolbar&&this.playerToolbar.closePopup();var r=this;return this._showError(!1),this._progressController&&this._progressController.reset(),this.showToFullScreenAnimation&&this.resizeMode===P.FIT_WINDOW&&w.animateTo(this),this.dataProvider._onCreateReportStarted=function(){r._viewModel.preInitialize()},this._viewModel.reset(),o(this.dataProvider.getReportData(e,{progressCallback:function(e){r._progressController&&r._progressController.setLoadDataProgress(e)}}),(function(e){if(r.viewMode===R.PANELS_IN_STACK_ALL){var i=e.analysisAreas.length>1&&!e.isMultiFeature,o=r.viewMode;i?r._originalAreaViewMode||(r._showAllAreasSideBySide=!0,r._originalAreaViewMode=S.getDefaultViewMode(r)):(r._showAllAreasSideBySide=!1,o=r._originalAreaViewMode||S.getDefaultViewMode(r)),r._setViewMode(o)}return r.setReportData(e,t)}),(function(e){r._showError(e)}))},refresh:function(e){return this._reportData&&o(this.setReportData(this._reportData,{waitUntilAllContentIsReady:!(!e||!e.waitUntilAllContentIsReady)}),function(){return this.showPageAt(0),this.resize()}.bind(this))},_isDataBeingSetFlag:!1,_notifyShownPendingFlag:!1,setReportData:function(e,t){return this._showWaiting(this._callAfterRendering("_doSetReportData",[e,t]),"setReportData")},setReportDataAndExport:function(e,r){var n=this;if(!e.reportObject.isMultiFeature){var a=new i,s=0,l=[],h=function(){var i=n.dataProvider.reportDataToSingleAreaReportData(e,{currentFeatureIndex:s,reportTitle:e.reportTitle,templateJson:e.templateJson});n.setReportData(i,{waitUntilAllContentIsReady:!0,disableAnimation:!0}).then((function(){var i=t.mixin({},r.commandParams);return i.pageNumerationInfo={startAreaIndex:s,numAreas:e.analysisAreas.length},o(n.executeCommand(r.commandId,i)).then((function(t){l.push(t),++s===e.analysisAreas.length?a.resolve(E.stitchDocuments(l)):setTimeout(h)}))}))};return h(),a.promise}return this.setReportData(e,{waitUntilAllContentIsReady:!0,disableAnimation:!0}).then((function(){return n.executeCommand(r.commandId,r.commandParams)}))},_doSetReportData:function(e,t){var r=this;if(t=t||{},this._reportData=e,O.emulateErrors.playerError&&(e=null),e&&!O.emulateErrors.emptyDataProviderResponse){this._isDataBeingSetFlag=!0,M.isAnimationSuspended=!0,this.onSetReportDataStart();var n=new i;return this._viewModel.setAnimationAllowed(!t.disableAnimation),this._configureViewModel(e),a(0).then((function(){if(1===e.analysisAreas.length||e.isMultiFeature)r._destroyAllContainers(),r._resetMapBuilder(),r._applyReportData({analysisAreaIndex:0,rerenderContent:!0}).then(n.resolve,n.reject);else{!1!==t._resetLoadedContents&&(r._destroyAllContainers(),r._resetMapBuilder());var i=e.analysisAreas.length-1,o=function(){for(;i>=0&&e.analysisAreas[i].hidden;)i--;i<0?n.resolve():r._applyReportData({analysisAreaIndex:i--,rerenderContent:!1,isFinalArea:i<0}).then((function(){a(0).then(o)}),n.reject)};o()}})),this._progressController&&this._progressController.setNumAreas(e.analysisAreas.length),this._progressController&&this._progressController.setLoadDataProgress(1),n.promise.then((function(){return r._progressController&&r._progressController.finalize()})).otherwise((function(e){r._showError(e)})).always((function(){var e=r.getCurrentReportContainer();if(e&&e.domNode)return a(300).then((function(){if(r._isDataBeingSetFlag=!1,r._notifyShownPendingFlag=!F.isNodeInLayout(r.domNode),M.isAnimationSuspended=r.isPlayerOnServer,r.onSetReportDataEnd(),r._emitPendingResizedEvent(),r._progressController&&r._progressController.reset(),t.waitUntilAllContentIsReady)return r.getRenderPromise()}))}))}function a(e){return r.isPlayerOnServer?o():I.delay(e)}this._showError(!0)},showAnalysisAreaAt:function(e){return this._callAfterRendering("_doShowAnalysisAreaAt",[e])},_doShowAnalysisAreaAt:function(e){var t=this;return o(this._setAllAreasVisible(!1),(function(){if(t._analysisAreaIndex!==e&&t.getAnalysisAreas()[e]&&!t.getAnalysisAreas()[e].hidden)return t._applyReportData({analysisAreaIndex:e,rerenderContent:!1})}))},showAllAnalysisAreasSideBySide:function(){return this._callAfterRendering("_doShowAllAnalysisAreasSideBySide")},_doShowAllAnalysisAreasSideBySide:function(){return this._setAllAreasVisible(!0)},_setAllAreasVisible:function(e){if(this._showAllAreasSideBySide!==e)return e?(this._showAllAreasSideBySide=!0,this._originalAreaViewMode=this.viewMode===R.PANELS_IN_STACK_ALL?S.getDefaultViewMode(this):this.viewMode,this._setViewMode(R.PANELS_IN_STACK_ALL)):(this._showAllAreasSideBySide=!1,this._setViewMode(this._originalAreaViewMode),this._originalAreaViewMode=null),this.refresh()},_applyReportData:function(e){var t=this;e=e||{};var r=this._reportData&&this._reportData.isMultiFeature?0:e.analysisAreaIndex||0,i=!1!==e.rerenderContent;if(this._analysisAreaIndex=r,this._showError(!this._reportData),this._reportData)return o(this._viewModel.initialize(!this._reportData.reportObject.isGraphicReport,this.viewMode),(function(){return t._setReportContainer(i)?t._doApplyTemplateJson({analysisAreaIndex:r,isFinalArea:e.isFinalArea}):t._updateAreaSelect()}))},_doApplyTemplateJson:function(e){var r=this,i=this.getCurrentReportContainer(),n=t.clone(this._reportData.templateJson);O.emulateErrors.emptyTemplateJson&&(n.sectionsTables.length=0);var a=i.fromJson(n,{waitUntilAllContentIsReady:!0,progressCallback:function(t){r._progressController&&r._progressController.setProgressForAreaAt(t,e.analysisAreaIndex)},analysisAreaIndex:e.analysisAreaIndex,isFinalArea:e.isFinalArea,renderSync:this.isPlayerOnServer}),s=i.getPagePromise?i.getPagePromise():a,l=i.getContentPromise?i.getContentPromise():a;return this._registerContainerLoadPromise(l||s),this._updateAreaSelect(),o(s,(function(){return r._setCurrentContainerLoaded(),r.showPageAt(r._currentPageIndex),r.resize()}))},_updateAreaSelect:function(){this.playerToolbar&&this.playerToolbar.updateAreaSelect({analysisAreas:this._reportData.analysisAreas,combinedAreasInfo:this._reportData.combinedAreasInfo,currentAreaIndex:this._showAllAreasSideBySide?"all":this.getCurrentAnalysisAreaIndex(),isMultiFeature:this._reportData.isMultiFeature})},getReportData:function(){return this._reportData},getReportTitle:function(){return this._reportData&&this._reportData.reportTitle||""},getCurrentAnalysisAreaIndex:function(){return this._analysisAreaIndex},getCurrentAnalysisArea:function(){return this._reportData&&this._reportData.analysisAreas[this._analysisAreaIndex]},getAnalysisAreas:function(){return this._reportData&&this._reportData.analysisAreas},reportDataToJson:function(e){return this._showWaiting(this.dataProvider.reportDataToJson(this.getReportData(),e),"reportDataToJson")},reportDataFromJson:function(e,t){var r=this;return this._showError(!1),this._showWaiting(o(this.dataProvider.reportDataFromJson(e),(function(e){return r.setReportData(e,t)})),"reportDataFromJson")},_configureViewModel:function(e){this._viewModel.setTheme(this._reportData.templateJson.theme),this._viewModel.enableDataDrilling=!this.isPlayerOnServer&&this.enableDataDrilling,this._viewModel.setDynamicReportInfo({fieldData:this._reportData.fieldData,analysisAreas:this._reportData.analysisAreas,combinedAreasInfo:this._reportData.combinedAreasInfo,attachmentsStore:this._reportData.attachmentsStore,createMapFunc:t.hitch(this,this._createMap),reportObject:this._reportData.reportObject,isMultiFeature:this._reportData.isMultiFeature,isFixedDataMode:!this._reportData.config.geoenrichmentUrl,geClient:this._reportData.geClient,templateVariableProvider:this._reportData.templateVariableProvider,countryID:this._reportData.config.countryID,hierarchy:this._reportData.config.hierarchy,templateJson:this._reportData.templateJson}),this._viewModel.getDynamicImageFunc=t.hitch(this,this._getReportLogo)},notifyShown:function(){!this._isDataBeingSetFlag&&this._notifyShownPendingFlag&&(this.getCurrentReportContainer()&&this.getCurrentReportContainer().notifyShown(),this._notifyShownPendingFlag=!1)},_isErrorShown:!1,_showError:function(e){this.errorViewDiv&&F.destroy(this.errorViewDiv),this.errorViewDiv=null,F[e?"hide":"show"](this.printableDivContainer),s[e?"add":"remove"](this.domNode,"esriGEReportPlayerError"),this._isErrorShown=!!e,this._updateElementsVisibility(),e?(this.errorViewDiv=F.create("div",{class:"esriGEReportPlayerErrorMessage",innerHTML:L.cantPlayReportError},this.domNode),this.playerToolbar&&this.playerToolbar.setErrorShown(!0),this._progressController&&this._progressController.reset(),console.log(e),this.onError(e)):this.playerToolbar&&this.playerToolbar.setErrorShown(!1)},isErrorShown:function(){return this._isErrorShown},_updateElementsVisibility:function(){var e=!(this._waitingCount>0)&&(this._reportData||this._isErrorShown),t=!(this._waitingCount>0||this._isErrorShown),r=!(this._waitingCount>0||this._isErrorShown);this.playerToolbarDiv&&(this.playerToolbarDiv.style.opacity=e?"":"0.001"),this.sidePageNavigator&&(this.sidePageNavigator.style.opacity=t?"":"0.001"),this.reportContainerDiv.style.opacity=r?"":"0.001"},setPrintMode:function(e){s[e?"add":"remove"](this.domNode,"esriGEReportPlayerInPrinting")},resize:function(e,t){this._resize({width:e,height:t}),this._updatePageNavigator(),this._updateZoomControls(),this.playerToolbar&&this.playerToolbar.update()},_pendingResizeEvent:null,_emitResizedEvent:function(e){this._pendingResizeEvent={isPaginating:!!e},this._isDataBeingSetFlag||this._emitPendingResizedEvent()},_emitPendingResizedEvent:function(){this._pendingResizeEvent&&(this.onResized(this._pendingResizeEvent.isPaginating),this._pendingResizeEvent=null)},_onClose:function(){var e;this.showToFullScreenAnimation&&this.resizeMode===P.FIT_WINDOW&&(e=w.animateFrom(this)),o(e,function(){this.onClose()}.bind(this))},getVisualState:function(){return{type:"reportPlayer",viewMode:this.viewMode,reportContainers:this.getAllReportContainers().map((function(e){return e.getVisualState&&e.getVisualState()}))}},setVisualState:function(e){return this._callAfterRendering("_doSetVisualState",[e])},_doSetVisualState:function(e){var t=e&&this.getAllReportContainers().map((function(t,r){return t.setVisualState&&t.setVisualState(e.reportContainers[r])}));return r(t)},_renderQueue:null,getRenderPromise:function(){return this._renderQueue&&this._renderQueue.getPromise()},_registerContainerLoadPromise:function(e){this._renderQueue=this._renderQueue||new x,this._renderQueue.add(e),this.playerToolbar&&this.playerToolbar.setContentLoadPromise(this.getRenderPromise())},_safeFuncCaller:null,_callAfterRendering:function(e,t){if(this.isPlayerOnServer)return this[e].apply(this,t);var r=this;return this._safeFuncCaller=this._safeFuncCaller||{},this._safeFuncCaller[e]=function(){return r[e].apply(r,t)},o(this.getRenderPromise(),(function(){return B.invoke(r._safeFuncCaller,e)}))},onSetReportDataStart:function(){},onSetReportDataEnd:function(){},onResized:function(e){},onClose:function(){},onError:function(e){},onAddMoreAreas:function(){},onAreasPreRemoved:function(e){},onAreasRemoved:function(e){},destroy:function(){this._destroyAllContainers(),this.inherited(arguments)}})}));