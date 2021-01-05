/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../core/maybe","../../../../../core/Handles","../../../../interactive/dragEventPipeline","../../../../interactive/GraphicManipulator","../dragEventPipeline3D","./Manipulation","./moveUtils"],(function(e,t,i,a,r,n,o,l,c){"use strict";let p=function(e){function l(t){var i;return(i=e.call(this)||this)._handles=new a,i._view=t.view,i._tool=t.tool,i._graphicState=t.graphicState,i._createManipulator(),i.forEachManipulator((e=>i._tool.manipulators.add(e))),i}t._inheritsLoose(l,e);var p=l.prototype;return p.destroy=function(){this._handles.destroy(),this.forEachManipulator((e=>{this._tool.manipulators.remove(e),e.destroy()})),this._tool=null,this._view=null,this._manipulator=null,this._graphicState=null},p.forEachManipulator=function(e){e(this._manipulator,1)},p.createGraphicDragPipeline=function(e){return c.createGraphicMoveDragPipeline(this._graphicState,e,(e=>this.createDragPipeline(e)))},p.createDragPipeline=function(e){const t=this._view,a=this._graphicState.graphic,n=i.isSome(a.geometry)?a.geometry.spatialReference:null;return r.createManipulatorDragEventPipeline(this._manipulator,((i,l,c,p,s)=>{const u=l.next(o.screenToMapXYForGraphic(s,t,a,n)).next(r.addMapDelta()).next(r.addScreenDelta());e(i,u,c,p,s)}))},p._createManipulator=function(){const e=this._view,t=this._graphicState.graphic;this._manipulator=new n.GraphicManipulator({graphic:t,view:e,selectable:!0,cursor:"move"})},l}(l.Manipulation);e.MoveXYGraphicManipulation=p,Object.defineProperty(e,"__esModule",{value:!0})}));