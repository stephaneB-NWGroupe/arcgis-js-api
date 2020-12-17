/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../core/Handles","../../../core/watchUtils","./constants","./HoveredPoints2D","./InputRepresentation2D"],(function(t,e,n,i,s,o){"use strict";let r=function(){function t(t){this._handles=new e;const i=t.view;this._inputRepresentation=new o.InputRepresentation2D({view:i}),this._hoveredPoints=new s.HoveredPoints2D(i),this._handles.add([n.init(t,"hoveredPoints",(t=>this._hoveredPoints.update(t))),n.init(t,"input",(()=>this._updateInputRepresentation(t)))])}var r=t.prototype;return r.destroy=function(){this._handles.destroy(),this._handles=null,this._inputRepresentation.destroy(),this._inputRepresentation=null,this._hoveredPoints.destroy(),this._hoveredPoints=null},r._updateInputRepresentation=function({input:t,state:e}){e===i.ElevationProfileState.Selected?this._inputRepresentation.update(t):this._inputRepresentation.remove()},t}();t.ElevationProfileVisualization2D=r,Object.defineProperty(t,"__esModule",{value:!0})}));