/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../core/maybe","../../../../../core/Evented","../../../../../core/mathUtils","../../../../../chunks/vec3f64","../../../../../chunks/vec3","../../../../../core/Handles","../../../../../chunks/mat4","../../../../../core/colorUtils","../../../../../chunks/mat4f64","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/lib/Geometry","../../../../interactive/dragEventPipeline","../dragEventPipeline3D","../../Manipulator3D","../../manipulatorUtils","../settings","./config","./Manipulation","./moveUtils"],(function(e,t,a,r,i,n,o,s,l,c,u,p,d,m,h,M,g,f,_,v,y){"use strict";let w=function(e){function v(t){var a;return(a=e.call(this)||this)._handles=new s,a._radius=_.DISC_RADIUS,a.events=new r,a._tool=t.tool,a._view=t.view,null!=t.radius&&(a._radius=t.radius),a.createManipulator(),a.forEachManipulator((e=>a._tool.manipulators.add(e))),a}t._inheritsLoose(v,e);var w=v.prototype;return w.destroy=function(){this._handles.destroy(),this.forEachManipulator((e=>{this._tool.manipulators.remove(e),e.destroy()}))},w.forEachManipulator=function(e){e(this._manipulator,0)},w.createGraphicDragPipeline=function(e,t){const r=a.unwrap(e.graphic.geometry).spatialReference;return y.createGraphicMoveDragPipeline(e,t,(e=>this.createDragPipeline(e,r)))},w.createDragPipeline=function(e,t){const a=this._view;return m.createManipulatorDragEventPipeline(this._manipulator,((r,i,n,o,s)=>{const l=i.next((e=>({...e,manipulatorType:0}))).next(h.screenToZConstrained(a,r.renderLocation,t)).next(m.addScreenDelta());e(r,l,n,o,s)}))},w.updateManipulator=function(){const e=this._radius/_.DISC_RADIUS,t=f.settings.zManipulator.height*e,a=f.settings.zManipulator.coneHeight*e,r=f.settings.zManipulator.coneWidth*e,i=f.settings.zManipulator.width*e,o=[n.fromValues(0,0,0),n.fromValues(0,0,t)],s=new d(p.createTubeGeometry(o,i/2,16,!1),"move-z"),m=p.createConeGeometry(a,r/2,16,!1),h=new d(m),M=[n.fromValues(0,0,0),n.fromValues(0,0,t+a)],v=(e=>{const a=u.create();if(l.translate(a,a,[0,0,t]),l.rotateX(a,a,Math.PI/2),e){const t=1+2*e/r;l.scale(a,a,[t,t,t])}return a})(0),y=(e,t)=>{const a=c.darken(f.settings.zManipulator.color,t);return[a.r/255,a.g/255,a.b/255,f.settings.zManipulator.color.a*e]},w=g.createManipulatorMaterial(y(1,.25),1),D=g.createManipulatorMaterial(y(1,0),1),b=g.createManipulatorMaterial(y(.7,0),f.settings.zManipulator.renderOccluded),k=g.createManipulatorMaterial(y(.85,0),f.settings.zManipulator.renderOccluded);this._manipulator.renderObjects=[{geometry:h,transform:v,material:w,stateMask:1},{geometry:s,material:w,stateMask:1},{geometry:h,transform:v,material:D,stateMask:2},{geometry:s,material:D,stateMask:2},{geometry:h,transform:v,material:b,stateMask:1},{geometry:s,material:b,stateMask:1},{geometry:h,transform:v,material:k,stateMask:2},{geometry:s,material:k,stateMask:2}],this._manipulator.radius=i/2+2,this._manipulator.collisionType={type:"line",paths:[M]}},w.createManipulator=function(){const e=new M.Manipulator3D({view:this._view,autoScaleRenderObjects:!1,worldSized:!1,selectable:!1,cursor:"ns-resize",elevationInfo:this.elevationInfo,worldOriented:!0,collisionPriority:1.6});e.applyObjectTransform=e=>{const t=this._view.state.camera,a=D;this._view.renderCoordsHelper.toRenderCoords(this._manipulator.elevationAlignedLocation,a);const r=o.dist(t.eye,a),n=t.computeRenderPixelSizeAtDist(r),s=o.subtract(b,a,t.eye);o.normalize(s,s);const l=k;this._view.renderCoordsHelper.worldUpAtPosition(D,l);const c=Math.abs(o.dot(s,l)),u=o.cross(b,s,l),p=o.cross(b,u,l),d=i.clamp(c,.01,1),m=1-Math.sqrt(1-d*d)/d/t.fullWidth,h=this._radius/_.DISC_RADIUS,M=f.settings.zManipulator.width*h;o.scale(p,o.normalize(p,p),(1/m-1)*r+n*M),e[12]-=b[0],e[13]-=b[1],e[14]-=b[2]},this._manipulator=e,this.updateManipulator()},t._createClass(v,[{key:"radius",get:function(){return this._radius},set:function(e){e!==this._radius&&(this._radius=e,this.updateManipulator())}}]),v}(v.Manipulation);const D=n.create(),b=n.create(),k=n.create();e.MoveZManipulation=w,Object.defineProperty(e,"__esModule",{value:!0})}));