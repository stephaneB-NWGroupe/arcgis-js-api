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
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/sniff","dojo/dom-style","dojox/gfx/Moveable","../kernel","../PointerEvents","../sniff","../geometry/Point","../graphic","../geometry/webMercatorUtils"],function(t,e,i,o,s,n,r,a,h,c,p,l){var d=t(null,{declaredClass:"esri.toolbars.VertexMover",constructor:function(t,e,i,o,s,n,r,a){this.point=t,this.symbol=e,this.relatedGraphic=i,this.segIndex=o,this.ptIndex=s,this.segLength=n,this.editor=r,this.map=r.map,this._scratchGL=r.toolbar._scratchGL,this._placeholder=a||!1,this._type=i.geometry.type,this._init(),this._enable()},refresh:function(t){(t||this._needRefresh())&&(this._disable(),this._enable())},destroy:function(){this._disable(),this.graphic&&this._scratchGL.remove(this.graphic),this.point=this.symbol=this.graphic=this.relatedGraphic=this.segIndex=this.ptIndex=this.segLength=this.editor=this.map=this._scratchGL=null},_init:function(){var t=new c(this.point.toJson()),e=new p(t,this.symbol);switch(this._type){case"multipoint":e._shape=this.relatedGraphic.getDojoShape().children[this.ptIndex];break;case"polyline":case"polygon":this._scratchGL.add(e)}this.graphic=e},_enable:function(){var t=this.graphic.getDojoShape();if(t){t._hasMover=!0,this._moveable=this._getMoveable(t);var e=t.getEventSource();e&&s.set(e,"cursor",this.editor.toolbar._cursors[this._placeholder?"move-gv":"move-v"])}},_disable:function(){var t=this._moveable;if(t){i.disconnect(this._startHandle),i.disconnect(this._firstHandle),i.disconnect(this._movingHandle),i.disconnect(this._stopHandle);var e=t.shape;if(e){var o=e.getEventSource();o&&s.set(o,"cursor","inherit")}t.destroy(),this._moveable=null}},_needRefresh:function(){var t=this.graphic.getDojoShape(),e=!1;if(t)switch(this._type){case"multipoint":var i=this.relatedGraphic.getDojoShape();if(i){var o=i.children[this.ptIndex];t!==o&&(t=o,this.graphic._shape=t,e=!0)}break;case"polyline":case"polygon":e=!t._hasMover}return e},_getMoveable:function(t){var e=new n(t,o("mac")&&o("ff")&&!h("esri-touch")&&{leftButtonOnly:!0});return this._startHandle=i.connect(e,"onMoveStart",this,this._moveStartHandler),this._firstHandle=i.connect(e,"onFirstMove",this,this._firstMoveHandler),this._movingHandle=i.connect(e,"onMoving",this,this._movingHandler),this._stopHandle=i.connect(e,"onMoveStop",this,this._moveStopHandler),e},_getPtIndex:function(){return this.ptIndex+(this._placeholder?1:0)},_getInfo:function(){return{graphic:this.graphic,isGhost:this._placeholder,segmentIndex:this.segIndex,pointIndex:this._getPtIndex()}},_moveStartHandler:function(t){var e=this.map;e.snappingManager&&e.snappingManager._setUpSnapping(),this.editor.toolbar._deactivateScrollWheel(),t.shape.moveToFront(),this.constructor.onMoveStart(this),this.editor.toolbar.onVertexMoveStart(this.relatedGraphic,this._getInfo())},_firstMoveHandler:function(t){var e,i=t.shape,o=this._getControlEdges(),s=this._scratchGL._div,n=[],r=t.host.shape._wrapOffsets[0]||0;for(e=0;e<o.length;e++){var a=o[e];a.x1+=r,a.x2+=r,n.push([s.createLine({x1:a.x1,y1:a.y1,x2:a.x2,y2:a.y2}).setStroke(this.editor._lineStroke),a.x1,a.y1,a.x2,a.y2])}i._lines=n,t.shape.moveToFront(),this.constructor.onFirstMove(this),this.editor.toolbar.onVertexFirstMove(this.relatedGraphic,this._getInfo())},_movingHandler:function(t,e,i){var o,s=this.map;h("esri-pointer")?o=s.navigationManager.pointerEvents._processTouchEvent(i,i):i&&"pointermove"===i.type&&(o=a.prototype._processTouchEvent.call({map:s},i,i)),o&&s.snappingManager&&s.snappingManager._onSnappingMouseMoveHandler(o);var n,r=t.shape,c=r.getTransform(),p=r._lines;for(n=0;n<p.length;n++){var l=p[n];l[0].setShape({x1:l[1]+c.dx,y1:l[2]+c.dy,x2:l[3],y2:l[4]})}this.editor.toolbar.onVertexMove(this.relatedGraphic,this._getInfo(),c)},_moveStopHandler:function(t){var e=t.shape,i=this.editor.toolbar,o=e.getTransform(),s=this.map,n=this.graphic,r=i._geo?l.geographicToWebMercator(n.geometry):n.geometry;i._activateScrollWheel();var a,h=e._lines;if(h){for(a=0;a<h.length;a++)h[a][0].removeShape();e._lines=null}var c=!1,p=!0,d=this._getInfo();o&&(o.dx||o.dy)?this._placeholder&&(this._placeholder=!1,c=!0):p=!1;var g;s.snappingManager&&(g=s.snappingManager._snappingPoint);var _=g||s.toMap(s.toScreen(r).offset(o.dx,o.dy));s.snappingManager&&s.snappingManager._killOffSnapping(),e.setTransform(null),n.setGeometry(i._geo?l.webMercatorToGeographic(_,!0):_),this.constructor.onMoveStop(this,o),i.onVertexMoveStop(this.relatedGraphic,d,o),p||i.onVertexClick(this.relatedGraphic,d),c&&i.onVertexAdd(this.relatedGraphic,this._getInfo())},_getControlEdges:function(){var t=this.map,e=this.relatedGraphic.geometry,i=this.segIndex,o=this.ptIndex,s=this.segLength,n=this._scratchGL.getNavigationTransform(),r=n.dx,a=n.dy,h=t.toScreen(this.graphic.geometry),c=h.x-r,p=h.y-a,l=[],d=this.editor._getControlPoints(this,e,i,o,s);return d[0]&&l.push({x1:c,y1:p,x2:d[0].x-r,y2:d[0].y-a}),d[1]&&l.push({x1:c,y1:p,x2:d[1].x-r,y2:d[1].y-a}),l}});return h("extend-esri")&&e.setObject("toolbars.VertexMover",d,r),e.mixin(d,{onMoveStart:function(){},onFirstMove:function(){},onMoveStop:function(){}}),d});