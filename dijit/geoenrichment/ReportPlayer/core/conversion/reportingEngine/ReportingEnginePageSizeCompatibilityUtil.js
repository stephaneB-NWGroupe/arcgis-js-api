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

define(["../../supportClasses/DocumentOptions"],function(e){var n={},t={a4:1,letter:1};return n.getReportingEnginePageSize=function(n,r){if(t[n])return n;var i=e.SIZE_TYPE_TO_DIM_HASH[n]&&e.SIZE_TYPE_TO_DIM_HASH[n][r];return i?e.combineCustomSizeString(i.w,i.h):n},n});