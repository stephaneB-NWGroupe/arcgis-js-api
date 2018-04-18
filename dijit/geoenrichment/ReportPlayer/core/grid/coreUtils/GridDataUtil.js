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

define(["dojo/_base/lang"],function(e){var i={};return i.getNumericCellValue=function(e){return i.getNumericDataValue(e.gridData,e.column.field)},i.getNumericDataValue=function(e,i){return e&&i&&e[i+"_numeric"]},i.setNumericDataValue=function(e,i,t){i[t+"_numeric"]=e},i.isEmptyCell=function(e){return!e.get("value")&&!e.gridData[e.column.field]&&!i.getFieldInfo(e)},i.hasSpans=function(e){return i.getColumnSpan(e)||i.getRowSpan(e)},i.getColumnSpan=function(e){return e.gridData&&e.gridData.columnSpans&&e.gridData.columnSpans[e.column.field]},i.getRowSpan=function(e){return e.gridData&&e.gridData.rowSpans&&e.gridData.rowSpans[e.column.field]},i.getDataColumnSpan=function(e,i){return e&&e.columnSpans&&e.columnSpans[i]},i.getDataRowSpan=function(e,i){return e&&e.rowSpans&&e.rowSpans[i]},i.getFieldInfo=function(e){return e&&e.gridData&&e.gridData.fieldInfos&&e.gridData.fieldInfos[e.column.field]},i.getGridFirstFieldInfo=function(e){return i.getFieldInfo(e.getFieldCells()[0])},i.setFieldInfo=function(e,i){e.gridData&&(e.gridData.fieldInfos[e.column.field]=i,i||e.setInfoTooltip&&e.setInfoTooltip(null))},i.provideFieldInfo=function(e){return i.setFieldInfo(e,i.getFieldInfo(e)||{}),i.getFieldInfo(e)},i.getCellStyle=function(e,t){if(!e||!e.gridData)return null;var n=e.gridData.style&&e.gridData.style.fields&&e.gridData.style.fields[e.column.field];return!n&&t&&(n={},i.setCellStyle(e,n)),n},i.setCellStyle=function(e,i){var t=e.gridData.style=e.gridData.style||{};t.fields=t.fields||{},t.fields[e.column.field]=i},i.updateCellStyle=function(t,n){var l=i.getCellStyle(t,!0);e.mixin(l,n)},i.copyFieldStyle=function(e,t,n){var l=i.getCellStyle(e),r=i.getCellStyle(t,!0);for(var a in n)void 0!==l[a]&&(r[a]=l[a])},i.getFieldCellText=function(e){return e.gridData&&e.gridData[e.column.field]},i.setFieldCellContent=function(e,i){e.set("value",i||""),e.gridData[e.column.field]=e.get("value")},i.clearFieldInfo=function(e,i){e.fieldInfos&&delete e.fieldInfos[i.field],e[i.field]=""},i.getFieldCellUrl=function(e){if(e.gridData&&e.gridData.urls&&e.column)return e.gridData.urls[e.column.field]},i.setFieldCellUrl=function(e,i){e.gridData&&e.column&&(e.gridData.urls=e.gridData.urls||{},void 0===i?delete e.gridData.urls[e.column.field]:e.gridData.urls[e.column.field]=i)},i.getConditionalFormatting=function(e){var t=i.getFieldInfo(e);return t&&t.triggerJson},i.setConditionalFormatting=function(t,n){var l=i.provideFieldInfo(t);n&&n.fieldInfo===l&&(n.fieldInfo=e.clone(n.fieldInfo),delete n.fieldInfo.triggerJson),l.triggerJson=n},i.isRichTextCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.isRichText)},i.isVariableFieldCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.hasVariable&&!t.script)},i.isOnlyVariableFieldCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.hasVariable)},i.isScriptFieldCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.script)},i.isUneditableScript=function(e){var t=i.getFieldInfo(e);return!!(t&&t.script&&t.script.isUneditableScript)},i.isNumericVariableFieldCell=function(e){var t=i.getFieldInfo(e);return!(!t||!(t.hasVariable&&"esriFieldTypeString"!==t.type||t.script&&!t.script.isUneditableScript&&"String"!==t.script.type))},i.isStringVariableFieldCell=function(e){var t=i.getFieldInfo(e);return!(!t||!(t.hasVariable&&"esriFieldTypeString"===t.type||t.script&&"String"===t.script.type))},i.isChartCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.isChart)},i.isImageCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.isImage)},i.isMapImageCell=function(e){var t=i.getFieldInfo(e);return!!(t&&t.isImage&&t.imageJson.isMapImage)},i.isImageTriggerCell=function(e){var t=i.getFieldInfo(e);return!!(t&&t.isImage&&t.triggerJson)},i.isShapeCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.isShape)},i.isEmptyShapeCell=function(e){var t=i.getFieldInfo(e),n=t&&t.shapeJson;return!(!n||n.g&&n.g.length)},i.isReportSectionCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.isReportSection)},i.isInfographicCell=function(e){var t=i.getFieldInfo(e);return!(!t||!t.isInfographic)},i});