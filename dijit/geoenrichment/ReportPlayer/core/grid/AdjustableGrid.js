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

define(["dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/on","dojo/store/Memory","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dijit/_WidgetBase","dijit/_TemplatedMixin","./_GridHighlightSupport","./_GridLocatorPreviewSupport","./ValueField","./coreUtils/GridBackgroundForegroundUtil","./coreUtils/GridFloatingTablesUtil","./coreUtils/GridBorderUtil","./coreUtils/GridDataUtil","./coreUtils/GridQueryUtil","./coreUtils/GridLayoutCalculator","./coreUtils/GridCellRenderer","./coreUtils/GridStyleUtil","./coreUtils/GridSortUtil","./coreUtils/GridLayoutSizer","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/async/AsyncQueue","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ViewModes","dojo/text!../templates/AdjustableGrid.html"],function(t,e,i,n,o,s,l,r,a,d,h,u,c,f,g,_,m,b,S,C,w,y,p,F,T,v,R,A){var M={defaultRowHeight:15.33,rowMinHeight:3,columnMinWidth:3,defaultChartRowHeight:150};return t([d,h,u,c],{templateString:A,viewModel:null,theme:null,columns:null,store:null,backgroundSectionJson:null,foregroundSectionJson:null,enableBackgroundForeground:!1,floatingTablesSectionJson:null,isFloatingTable:!1,layoutDefaults:null,stickToRight:!1,looseResize:!1,keepGridSizeWhenResized:!1,parentWidget:null,parentElementInPageInfo:null,viewPortContainer:null,parentGrid:null,reportContainerPageNode:null,getPreviewValueFunction:null,previewFeatureIndex:null,fixedViewMode:null,fieldCellClass:null,applyThemeStyle:!0,inheritThemeBackground:!0,enableAsyncRendering:!1,noBorderLineStyle:null,previewModeBorderLineStyle:null,editModeBorderLineStyle:null,renderBordersFromTheme:!1,hasRealBorders:!1,allowSorting:!1,trimTextIfOverflows:!1,shouldStayWithinParent:!0,backgroundSection:null,foregroundSection:null,floatingTablesSection:null,_cellRenderer:null,_fieldCells:null,_dynamicBindings:null,_isBeingResizedFlag:!1,_asyncQueue:null,postCreate:function(){this.inherited(arguments),this.layoutDefaults=e.mixin({},M,this.layoutDefaults)},refresh:function(t){if(this.domNode)return t=t||{},C.markAsDirty(this),t.preserveFocus||t.preserveFocusAll?this.__refreshAndPreserveFocus(t):this.__simpleRefresh(t),p.updateSorting(this,!1!==t.applyCurrentSorting),this.getRenderPromise()},__simpleRefresh:function(t){if(this.mainNode){t=t||{};this.store&&(this._destroyTableContent(),l.empty(this.mainNode),this.isEmptyTable()?l.create("div",{class:"adjustableGrid_emptyRow"},this.mainNode):(s[this.isSingleCelledTable()?"add":"remove"](this.domNode,"esriGEAdjustableGridSingleCell"),C.recalcRows(this),void 0===t.stickToRight&&(t.stickToRight=this.stickToRight),C.recalcColumns(this,t),C.autoSnapLayout(this),this._createCellsFromStoreData(),this._renderCells(),C.positionCells(this)),this.refreshBackground(),this._renderFloatingTables(),this.refreshForeground())}},__refreshAndPreserveFocus:function(t){this.__simpleRefresh(t)},_createCellsFromStoreData:function(){var t=this;this.enableAsyncRendering&&(this._asyncQueue=new v),this.store.data.forEach(function(e){t.columns.forEach(function(i,n){if(!(e.excludedIndexHorizontal&&e.excludedIndexHorizontal[n]||e.excludedIndexVertical&&e.excludedIndexVertical[n])){var o=i.index+(b.getDataColumnSpan(e,i.field)||1)===t.columns.length,s=e.index+(b.getDataRowSpan(e,i.field)||1)===t.store.data.length;t._createField(e,i,o,s)}})})},_getFieldClass:function(){return f},_createField:function(t,e,i,n){var o="adjustableGridField field-"+e.field+(i?" lastInRow":"")+(n?" lastRow":""),s={viewModel:this.viewModel,fieldStyle:y.combineCellStyle(this,t,e),borderStyle:this._getBorderStyle(t,e,i,n),class:o,fieldCellClass:this.fieldCellClass,trimTextIfOverflows:this.trimTextIfOverflows,rowId:t.id,columnId:e.id,parentGrid:this,uniqueId:t.id+e.id,gridData:t,column:e,isLastInRow:i,isLastInColumn:n},l=this._doCreateFieldFromParams(s,t,e);return l.domNode.style.position="absolute",this._fieldCells.push(l),l},_getBorderStyle:function(t,e,i,n){return m.getBorderStyle(this,t,e,i,n)},getRenderPromise:function(){return this._asyncQueue&&this._asyncQueue.getPromise()},_doCreateFieldFromParams:function(t,e,i){return(new this._getFieldClass)(t).placeAt(this.mainNode)},_postCreateFieldCell:function(t){},_preRenderFieldCell:function(t){},_postRenderFieldCell:function(t){},_renderFieldContent:function(t){this._preRenderFieldCell(t),this._getCellRenderer().renderCellContent(t),this._configureRenderedCellContentSpecificStyles(t),this._postRenderFieldCell(t)},_configureRenderedCellContentSpecificStyles:function(t){s[b.isNumericVariableFieldCell(t)?"add":"remove"](t.domNode,"hasNumericVariableFieldInfo"),s[b.isStringVariableFieldCell(t)?"add":"remove"](t.domNode,"hasStringVariableFieldInfo"),s[b.getConditionalFormatting(t)?"add":"remove"](t.domNode,"hasConditionalFormatting")},_getCellRenderer:function(){return this._cellRenderer||(this._cellRenderer=new w),this._cellRenderer},_renderCells:function(){function t(t){e._renderFieldContent(t),e._postCreateFieldCell(t),e._updateCellViewMode(t)}var e=this;this._fieldCells.forEach(function(i){e._asyncQueue?e._asyncQueue.add(t.bind(e,i),{delayAfter:0}):t(i)})},refreshBackground:function(){this.enableBackgroundForeground&&(this.backgroundSection&&this.backgroundSection.destroy(),this.backgroundSection=g.renderBackground(this,this.backgroundSectionJson,this._getBackgroundSectionCreationParams()))},_getBackgroundSectionCreationParams:function(){return this._getContentLoadingParams()},refreshForeground:function(){this.enableBackgroundForeground&&(this.foregroundSection&&this.foregroundSection.destroy(),this.foregroundSection=g.renderForeground(this,this.foregroundSectionJson,this._getForegroundSectionCreationParams()))},_getForegroundSectionCreationParams:function(){return this._getContentLoadingParams()},_renderFloatingTables:function(){this.floatingTablesSection&&this.floatingTablesSection.destroy(),this.floatingTablesSection=_.renderFloatingTables(this,this.floatingTablesSectionJson,this._getFloatingTablesSectionParams())},_getFloatingTablesSectionParams:function(){var t=this,i={tableParams:e.mixin({isFloatingTable:!0,parentGrid:this,inheritThemeBackground:this.inheritThemeBackground,layoutDefaults:this.layoutDefaults,_preRenderFieldCell:function(e){t._preRenderFieldCell(e)},_postCreateFieldCell:function(e){t._postCreateFieldCell(e)}},this._getContentLoadingParams())};return this._addFloatingTablesSectionCreationParams(i),i},_addFloatingTablesSectionCreationParams:function(t){return t},getVisualState:function(){return{sorting:p.getSorting(this),cells:this.getFieldCells().map(function(t){return t.content&&t.content.getVisualState&&t.content.getVisualState()}),backgroundSection:this.backgroundSection&&this.backgroundSection.getVisualState(),floatingTablesSection:this.floatingTablesSection&&this.floatingTablesSection.getVisualState(),foregroundSection:this.foregroundSection&&this.foregroundSection.getVisualState()}},setVisualState:function(t){if(t){if(t.sorting&&p.setSorting(this,t.sorting),t.cells){var e=this.getFieldCells();t.cells.length===e.length&&e.forEach(function(e,i){e.content&&e.content.setVisualState&&e.content.setVisualState(t.cells[i])})}t.backgroundSection&&this.backgroundSection.setVisualState(t.backgroundSection),t.floatingTablesSection&&this.floatingTablesSection.setVisualState(t.floatingTablesSection),t.foregroundSection&&this.foregroundSection.setVisualState(t.foregroundSection)}},_setCellWidth:function(t,e){C.adjustColumnWidth(this,t.gridData,t.column,e),C.positionCells(this)},_setCellHeight:function(t,e){C.adjustRowHeight(this,t.gridData,t.column.field,e),C.positionCells(this)},setCellWidth:function(t,e){this._setCellWidth(t,e)},setCellHeight:function(t,e){this._setCellHeight(t,e)},_maxWidth:500,_width:500,_height:0,_spaceAfter:0,_maxHeight:0,_left:0,_top:0,_alternatingStyle:null,getMaxHeight:function(t){return this._maxHeight},setMaxHeight:function(t){this._maxHeight=t},getHeight:function(t,e){return this._height+(!1!==e?this._top:0)+(t?this._spaceAfter||0:0)},getMaxWidth:function(){return this._maxWidth},setMaxWidth:function(t,e){var i=0;if(e&&e.preserveRightOffset){C.recalcGridWidth(this);var n=this.getAllowedWidth();i=(n-this._width)/n}this._maxWidth=t,e&&e.resizeToFitAllowedWidth&&this.resizeToFitAllowedWidth({rightOffsetWeight:e.preserveRightOffset?i:0})},getLeft:function(){return this._left},getTop:function(){return this._top},setSpaceAfter:function(t){this._spaceAfter=t},getAllowedWidth:function(){return this._maxWidth-this._left},getAllowedWidthFromParent:function(){return this.shouldStayWithinParent?a.get(this.domNode.parentNode,"width")-this._left:1e6},getTableBox:function(){var t=this.getSettings().style;return{l:t.left,t:t.spaceBefore,w:t.width,h:this.getHeight(!1,!1)}},getDomPosition:function(){return T.position(this.domNode)},resizeToFitAllowedWidth:function(t){this.isEmptyTable()||F.resizeToFitAllowedWidth(this,t)},resizeToFitWidth:function(t){this.isEmptyTable()||F.resizeToFitWidth(this,t)},resizeToFitHeight:function(t,e){if(!this.isEmptyTable()){if(!1!==e){t-=this._top}F.resizeToFitHeight(this,t)}},scaleProportionallyWithinParent:function(t){F.scaleProportionallyWithinParent(this,t)},collapseContent:function(){this.getFieldCells().forEach(function(t){t.content&&t.content.collapseContent&&t.content.collapseContent()})},hasHiddenContent:function(){return this._checkNeedResizeRowHeightToShowCellsContent(!1)},resizeRowHeightToShowCellsContent:function(){this._checkNeedResizeRowHeightToShowCellsContent(!0)},_checkNeedResizeRowHeightToShowCellsContent:function(t){var e,i=this;return this.getFieldCells().forEach(function(n){if(n.content&&n.content.getPreferredHeight){var o=n.content.getPreferredHeight();o>n.getHeight()&&(t&&(o&&(o+=10),i._setCellHeight(n,o)),e=!0)}}),e},_tableAttributes:null,setSettings:function(t){var e,i=this._left;if(this.columns.forEach(function(t){t.style&&"number"==typeof t.style.width&&(t._wasBeforeRecalc=!0)}),t.style){void 0!==t.style.left&&this.setGridPosition(t.style.left),void 0!==t.style.spaceBefore&&this.setGridPosition(void 0,t.style.spaceBefore),void 0!==t.style.spaceAfter&&(this._spaceAfter=t.style.spaceAfter),t.style.width&&(this._width=t.style.width),t.style.alternatingStyle&&(this._alternatingStyle=t.style.alternatingStyle);var n=this._width;this._width=Math.min(this._width,this.getAllowedWidth()),this._width===n&&i===this._left||(e=!0)}t.attributes&&(this._adjustColumnsForSettings(t)&&(e=!0),this._tableAttributes=t.attributes,this._tableAttributes.rowCount&&this._tableAttributes.rowCount!==this.store.data.length&&this._adjustRowsForSettings(t),delete this._tableAttributes.rowCount,delete this._tableAttributes.columnCount),void 0!==t.scaleToFitWidth&&(this._scaleToFitWidth=t.scaleToFitWidth),void 0!==t.scaleToFitHeight&&(this._scaleToFitHeight=t.scaleToFitHeight),this._tableAttributes=this._tableAttributes||{};var o=[];this.columns.forEach(function(t){t._wasBeforeRecalc&&o.push(t),delete t._wasBeforeRecalc}),this.viewModel.dynamicReportInfo&&this.getNumDynamicColumns()?(C.trimColumnsForNumberOfFeatures(this),this.refresh({resetWidth:!0})):this.viewModel.dynamicReportInfo&&this.getNumDynamicRows()?(C.adjustRowsForNumberOfFeatures(this),this.refresh()):e?this.refresh({resetWidth:!0,columnsToPreserve:o}):this.refresh()},setGridPosition:function(t,e){void 0!==t&&(this._left=t||0,this.domNode.style.left=this._left+"px"),void 0!==e&&(this._top=e||0,this.domNode.style.top=this._top+"px")},_adjustColumnsForSettings:function(t){return!1},_adjustRowsForSettings:function(t){},getSettings:function(){return C.recalcGridWidth(this),{style:{width:this._width,left:this._left,spaceBefore:this._top,spaceAfter:this._spaceAfter,alternatingStyle:this._alternatingStyle},attributes:e.mixin(e.clone(this._tableAttributes),{columnCount:this.columns.length,rowCount:this.store.data.length}),scaleToFitWidth:this._scaleToFitWidth,scaleToFitHeight:this._scaleToFitHeight}},needScaleToFitWidth:function(){return this._scaleToFitWidth},needScaleToFitHeight:function(){return this._scaleToFitHeight},isEmptyTable:function(){return!(this.columns&&this.columns.length&&this.store&&this.store.data.length)},isSingleCelledTable:function(){return 1===this.store.data.length&&1===this.columns.length},isMultiFeatureTable:function(){return!!this.getNumDynamicColumns()||!!this.getNumDynamicRows()},isLocatorTable:function(){return!(!this._tableAttributes||!this._tableAttributes.locatorSettings)},getLocatorSettings:function(){return this._tableAttributes&&this._tableAttributes.locatorSettings},setLocatorSettings:function(t){this._tableAttributes=this._tableAttributes||{},this._tableAttributes.locatorSettings=t},isLocatorHeaderTable:function(){return!(!this._tableAttributes||!this._tableAttributes.isLocatorHeader)},isSummarizeTable:function(){return!(!this._tableAttributes||!this._tableAttributes.summarizeSettings)},getNumFixedColumns:function(){return this._tableAttributes&&this._tableAttributes.fixedColumns||0},setNumFixedColumns:function(t){this._tableAttributes.fixedColumns=t},getNumDynamicColumns:function(){return this._tableAttributes&&this._tableAttributes.dynamicColumns||0},setNumDynamicColumns:function(t){this._tableAttributes.dynamicColumns=t},getNumFixedRows:function(){return this._tableAttributes&&this._tableAttributes.fixedRows||0},setNumFixedRows:function(t){this._tableAttributes.fixedRows=t},getNumDynamicRows:function(){return this._tableAttributes&&this._tableAttributes.dynamicRows||0},setNumDynamicRows:function(t){this._tableAttributes.dynamicRows=t},collectFieldInfos:function(t){return t=t||{},t.onlySelectedCells&&(t.fieldCells=this.getSelectedCells()||[]),S.collectFieldInfos(this,t)},_viewMode:null,_specificViewMode:null,_viewModeKey:null,getViewMode:function(){return this._viewMode},getSpecificViewMode:function(){return this._specificViewMode},setViewMode:function(t,e){var i=this;t=this.fixedViewMode||t;var n=t+e;this._viewModeKey!==n&&(this._viewModeKey=n,this._viewMode=t,void 0!==e&&(this._specificViewMode=e),s[this._viewMode===R.EDIT?"add":"remove"](this.domNode,"adjustableGridEditMode"),s[this._viewMode===R.EDIT?"remove":"add"](this.domNode,"adjustableGridPreviewMode"),this._fieldCells&&this._fieldCells.forEach(function(t){i._updateCellViewMode(t)}),this.backgroundSection&&this.backgroundSection.setViewMode(this._viewMode,this._specificViewMode),this.floatingTablesSection&&this.floatingTablesSection.setViewMode(this._viewMode,this._specificViewMode),this.foregroundSection&&this.foregroundSection.setViewMode(this._viewMode,this._specificViewMode),this.isLocatorTable()&&this._updatePreviewLocatorTables(this._viewMode!==R.EDIT))},_updateCellViewMode:function(t){t.setBorderStyle(this._getBorderStyle(t.gridData,t.column,t.isLastInRow,t.isLastInColumn)),t.content&&t.content.setViewMode&&t.content.setViewMode(this._viewMode,this._specificViewMode),this._getCellRenderer().updateViewMode(t)},_getContentLoadingParams:function(){return{onContentLoadingStart:this.onContentLoadingStart.bind(this),onContentLoadingEnd:this.onContentLoadingEnd.bind(this)}},getFieldCells:function(t){return t&&t.floatingCells?this.getFloatingCells().concat(this._fieldCells):this._fieldCells},queryCells:function(t){return S.queryCells(this,t)},getFirstCell:function(){return this.getFieldCells()[0]},getCellText:function(t){return b.getFieldCellText(t)},renderCell:function(t){this._renderFieldContent(t)},getInfographicJson:function(){var t=this.getFirstCell();return b.isInfographicCell(t)?b.getFieldInfo(t).infographicJson:null},getFloatingCells:function(t){var e=[];return this.floatingTablesSection?(this.floatingTablesSection.getTables().forEach(function(t){e=e.concat(t.getFieldCells())}),t&&t.topFirst&&e.reverse(),e):e},getChartJson:function(){var t=this.getFirstCell();return b.isChartCell(t)?b.getFieldInfo(t).chartJson:null},toJson:function(){var t=this.getSettings();return t.id="table",t.data={data:this.store.data,columns:this.columns},["backgroundSection","foregroundSection","floatingTablesSection"].forEach(function(e){var i=this[e];if(i){var n=i.toJson();n.stack.length&&(t[e+"Json"]=n)}},this),e.clone(t)},fromJson:function(t){t&&t.data&&(this.columns=t.data.columns||[],this.store=new o({data:t.data.data||[],idProperty:"id"}),this.backgroundSectionJson=t.backgroundSectionJson,this.foregroundSectionJson=t.foregroundSectionJson,this.refresh())},notifyShown:function(){this.getFieldCells().forEach(function(t){t.content&&t.content.notifyShown&&t.content.notifyShown()}),this.backgroundSection&&this.backgroundSection.notifyShown(),this.floatingTablesSection&&this.floatingTablesSection.notifyShown(),this.foregroundSection&&this.foregroundSection.notifyShown()},onContentLoadingStart:function(){},onContentLoadingEnd:function(){},onRequestScaleToFitHeight:function(){},_destroyTableContent:function(){this._renderInfo=null,this._fieldCells=this._fieldCells||[],this._fieldCells.forEach(function(t){t.parentGrid=null,t.gridData=null,t.column=null,t.destroy()}),this._fieldCells.length=0,this.backgroundSection&&this.backgroundSection.destroy(),this.backgroundSection=null,this.floatingTablesSection&&this.floatingTablesSection.destroy(),this.floatingTablesSection=null,this.foregroundSection&&this.foregroundSection.destroy(),this.foregroundSection=null,this._asyncQueue&&this._asyncQueue.destroy(),this._asyncQueue=null},destroy:function(){this._destroyTableContent(),this.inherited(arguments)}})});