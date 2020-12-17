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

define(["dojo/_base/lang","../templateJsonUtils/fieldInfo/FieldInfoBuilder","../templateJsonUtils/fieldInfo/FieldLibrary","../../grid/coreUtils/GridDataUtil","esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes"],(function(e,t,a,i,l){var n={};return n.createTable=function(a){var i=a.numColumns,l=a.numRows,n=a.width,r=a.widths,o=a.style,s=a.attributes&&a.attributes.fixedColumns,f=a.attributes&&a.attributes.dynamicColumns;if(n)if(r)r=r.map((function(e){return n*Number(e.replace("%",""))/100}));else{var d=n/i;r=[];for(var u=0;u<i;u++)r.push(d)}if(r)n||isNaN(Number(r[0]))||(n=0,r.forEach((function(e){n+=e})));else{var c=Number(100/i).toFixed(3)+"%";r=[];for(var h=0;h<i;h++)r.push(c)}for(var m=[],g=0;g<i;g++)m.push({field:"field"+g,style:{width:r[g]}});for(var p=[],b=!0,y=a.height?a.height/l:a.rowHeight||15.07,I=0;I<l;I++){var S={style:{height:y,fields:{}},fieldInfos:{}};for(g=0;g<i;g++){var T="field"+g;!1!==a.useDefaultTheme&&(S.style.fields[T]=e.mixin({horizontalAlign:0===g?"left":"right",overrideStyle:0===I?l>1?!1!==a.useDefaultHeaderTheme?"TableHeader":"Default":void 0:b?"AlternatingRow":"Default"},a.cellParams)),f&&g>=s&&0===I&&(S.fieldInfos[T]=t.createFieldInfoFromSpecialFieldName("AREA_DESC")),a.processTableCell&&a.processTableCell(S,T,I,g,a)}p.push(S),b=!b}return{id:"table",attributes:e.mixin({},a.attributes),style:e.mixin({width:n||772.33},o),data:{columns:m,data:p}}},n.createSingleCellTable=function(e){e=e||{};var t=n.createTable({numColumns:1,numRows:1,attributes:e.attributes,useDefaultTheme:!1});return n.modifyTableJson(t,0,0,e),t},n.modifyTableJson=function(e,t,a,i){var l=e.data.data[t],n=e.data.columns[a],r=n.field;i.text&&(l[r]=i.text),i.fieldInfo&&(l.fieldInfos[r]=i.fieldInfo),i.cellStyle&&(l.style.fields[r]=i.cellStyle),i.columnSpan&&(l.columnSpans=l.columnSpans||{},l.columnSpans[r]=i.columnSpan),i.rowSpan&&(l.rowSpans=l.rowSpans||{},l.rowSpans[r]=i.rowSpan),l.themeStyle=i.themeStyle,i.width&&(e.style.width=i.width,n.style.width=i.width),i.height&&(l.style.height=i.height),void 0!==i.left&&(e.style.left=i.left),void 0!==i.top&&(e.style.top=i.top)},n.getTableWidth=function(e){return e.style.width},n.getTableHeight=function(e){var t=0;return e.data.data.forEach((function(e){t+=e.style?e.style.height:0})),t},n.calcTableBox=function(e){return{x:e.style.left||0,y:e.style.top||0,w:n.getTableWidth(e),h:n.getTableHeight(e)}},n.createDetailsSection=function(e){return{type:l.DETAILS,stack:[n.createTable(e)]}},n.createDetailsSectionForFieldInfos=function(t,i){return{type:l.DETAILS,stack:[(r=n.createTable(e.mixin({numColumns:2,numRows:t.length+1},i)),r.data.data.forEach((function(e,i){if(0!==i){var l=t[i-1];e.field0=l.script?l.script.alias:l.hasVariable?l.alias:a.getFieldLabel(l.name)||"",e.fieldInfos.field1=l}else e.field0=t[0].hasVariable?t[0].fieldCategory:""})),n.provideSpaceAfter(r),r)]};var r},n.createDetailsSectionForFieldInfoGroups=function(t,a){return{type:l.DETAILS,stack:[(i=t[0],r=n.createTable(e.mixin({numColumns:t.length+1,numRows:i.length+1},a)),r.data.data.forEach((function(e,a){r.data.columns.forEach((function(i,l){if(0!==l)if(0!==a){var n=t[l-1][a-1];e.field0=e.field0||(n.script?n.script.alias:n.alias),e.fieldInfos[i.field]=n}else e[i.field]=t[l-1][0].fieldCategory||""}))})),n.provideSpaceAfter(r),r)]};var i,r},n.provideSpaceAfter=function(e,t){e.style.spaceAfter=Math.max(t||0,90-15.07*e.data.data.length)},n.applyDefaultStyling=function(e){var t=!0;e.data.data.forEach((function(a,i){e.data.columns.forEach((function(e){a.style.fields[e.field].overrideStyle=0===i?"TableHeader":t?"AlternatingRow":void 0})),t=!t}))},n.setTableHeaderStyle=function(e){if(e.style)for(var t in e.style.fields){(e.style.fields[t]=e.style.fields[t]||{}).overrideStyle="TableHeader"}},n.DEFAULT_ROW_HEIGHT=15.07,n.isEmptyTable=function(e){return e.isGrid?!(e.columns&&e.columns.length&&e.store&&e.store.data.length):!!e.data&&!(e.data.columns&&e.data.columns.length&&e.data.data&&e.data.data.length)},n.isSingleCelledTable=function(e){return e.isGrid?e.store&&1===e.store.data.length&&e.columns&&1===e.columns.length:!!e.data&&(1===e.data.columns.length&&1===e.data.data.length)},n.isMultiDataTable=function(e){return e.isGrid?e.columns.length>1||e.store.data.length>2:!!e.data&&(e.data.columns.length>1||e.data.data.length>2)},n.getTableSubtype=function(e){if(!n.isSingleCelledTable(e))return null;var t=n.getFirstFieldInfo(e);return i.isTextLikeCell(t)?"isTextLike":t.isImage?t.triggerJson?"isImage.hasConditionalStyling":"isImage":t.isShape?"isShape":null},n.getFirstFieldInfo=function(e){return e.isGrid?e.store.data[0].fieldInfos&&e.store.data[0].fieldInfos[e.columns[0].field]:e.data.data[0].fieldInfos&&e.data.data[0].fieldInfos[e.data.columns[0].field]},n.tableJsonHasInfographic=function(e){return!!n.getTableJsonInfographic(e)},n.getTableJsonInfographic=function(e){var t;return e.data.data.some((function(e){if(e.fieldInfos)for(var a in e.fieldInfos){var i=e.fieldInfos[a];if(i&&i.isInfographic)return t=i.infographicJson,!0}})),t},n.getTableJsonFirstFieldInfo=function(e){return e.data.data[0].fieldInfos[e.data.columns[0].field]},n.tableJsonHasChart=function(e){return e.data.data.some((function(e){if(e.fieldInfos)for(var t in e.fieldInfos){var a=e.fieldInfos[t];if(a&&a.isChart)return!0}}))},n}));