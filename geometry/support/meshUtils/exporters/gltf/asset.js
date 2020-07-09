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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports"],(function(e,n){Object.defineProperty(n,"__esModule",{value:!0});var t=function(){function e(){this.copyright="",this.defaultScene=0,this.generator="",this._scenes=[]}return e.prototype.addScene=function(e){if(this._scenes.indexOf(e)>=0)throw new Error("Scene already added");this._scenes.push(e)},e.prototype.removeScene=function(e){var n=this._scenes.indexOf(e);n>=0&&this._scenes.splice(n,1)},e.prototype.forEachScene=function(e){this._scenes.forEach(e)},e}();n.Asset=t}));