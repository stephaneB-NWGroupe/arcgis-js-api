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

define(["require","exports","../../../core/libs/gl-matrix/mat3","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../../../core/libs/gl-matrix/vec4","../GeometryUtils","./rendererUtils","./vtShaderSnippets","../../webgl/ShaderVariations","../../webgl/VertexArrayObject"],function(t,e,i,r,o,n,a,l,s,f,u){return function(){function t(){this._fillAttributeLocations={a_pos:0},this._fillAttributeLocationsDD={a_pos:0,a_color:1},this._outlineAttributeLocations={a_pos:0,a_offset:1,a_xnormal:2},this._outlineAttributeLocationsDD={a_pos:0,a_offset:1,a_xnormal:2,a_color:3},this._initialized=!1,this._viewProjMat=r.create(),this._offsetVector=o.create(),this._patternMatrix=i.create(),this._color=n.create(),this._outlineColor=n.create()}return t.prototype.dispose=function(){},t.prototype.render=function(t,e,i,o,n,s,f,u,_,d,c){if(0!==e.triangleElementCount){this._initialized||this._initialize(t);var m,h=f.getPaintValue("fill-pattern",i),D=void 0!==h,V=c*f.getPaintValue("fill-opacity",i),v=f.getPaintValue("fill-color",i),x=3===n;x&&(m=l.int32To4Bytes(e.layerID));var p=s.tileTransform.transform,b=s.coordRange/512,y=f.getPaintValue("fill-translate",i);if(0!==y[0]||0!==y[1]){r.copy(this._viewProjMat,s.tileTransform.transform);var A=y[0],g=y[1],O=0,M=0,P=(1<<s.key.level)/Math.pow(2,i)*b;if(1===f.getPaintValue("fill-translate-anchor",i)){var j=-a.C_DEG_TO_RAD*o,z=Math.sin(j),w=Math.cos(j);O=P*(A*w-g*z),M=P*(A*z+g*w)}else O=P*A,M=P*g;this._offsetVector[0]=O,this._offsetVector[1]=M,this._offsetVector[2]=0,r.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),p=this._viewProjMat}this._drawFill(t,e,i,n,s,f,u,p,d,c,x,m);if(f.getPaintValue("fill-antialias",i)&&!D&&e.outlineElementCount>0&&(1===n||3===n)){var U=f.hasDataDrivenOutline,C=f.getPaintValue("fill-outline-color",i);if(0===C[3]){if(1!==this._color[3]&&!U)return;C=v}var S=.75/d,E=this._getOutlineVAO(t,s,U);if(E){t.bindVAO(E);var I=this._outlineShaderVariations.getProgram([U,x],void 0,void 0,U?this._outlineAttributeLocationsDD:this._outlineAttributeLocations);if(t.bindProgram(I),I.setUniformMatrix4fv("u_transformMatrix",p),I.setUniformMatrix4fv("u_extrudeMatrix",_),I.setUniform2fv("u_normalized_origin",s.tileTransform.displayCoord),I.setUniform1f("u_depth",f.z+1/65536),I.setUniform1f("u_outline_width",S),!U){var L=V*C[3];this._outlineColor[0]=L*C[0],this._outlineColor[1]=L*C[1],this._outlineColor[2]=L*C[2],this._outlineColor[3]=L,I.setUniform4fv("u_color",this._outlineColor)}x&&I.setUniform4f("u_id",m[0],m[1],m[2],m[3]),t.drawElements(4,e.outlineElementCount,5125,12*e.outlineElementStart),t.bindVAO()}}}},t.prototype._initialize=function(t){if(this._initialized)return!0;var e=new f("fill",["fillVS","fillFS"],[],s,t);e.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN"),e.addDefine("DD","DD",[!0,!1],"DD"),e.addDefine("ID","ID",[!0,!0],"ID"),this._fillShaderVariations=e,this._fillVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]},this._fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]};var i=new f("outline",["outlineVS","outlineFS"],[],s,t);return i.addDefine("DD","DD",[!0,!1],"DD"),i.addDefine("ID","ID",[!0,!0],"ID"),this._outlineShaderVariations=i,this._outlineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]},this._outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]},this._initialized=!0,!0},t.prototype._drawFill=function(t,e,r,o,n,a,l,s,f,u,_,d){var c=a.getPaintValue("fill-pattern",r),m=void 0!==c,h=u*a.getPaintValue("fill-opacity",r),D=a.getPaintValue("fill-color",r),V=a.hasDataDrivenFill,v=V?.5:D[3]*h,x=!1;if(m||1!==v||(x=!0),(!m||0!==o)&&(!x||1!==o)&&(m||x||0!==o)){var p=this._getFillVAO(t,n,V);if(p){t.bindVAO(p);var b=this._fillShaderVariations.getProgram([m,V,_],void 0,void 0,V?this._fillAttributeLocationsDD:this._fillAttributeLocations);if(t.bindProgram(b),m){var y=l.getMosaicItemPosition(c,!0);if(y){var A=n.coordRange/512,g=A/Math.pow(2,Math.round(r)-n.key.level)/f;i.identity(this._patternMatrix);var O=1/(y.size[0]*g),M=1/(y.size[1]*g);this._patternMatrix[0]=O,this._patternMatrix[4]=M,l.bind(t,9729,y.page,1),b.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix),b.setUniform2f("u_pattern_tl",y.tl[0],y.tl[1]),b.setUniform2f("u_pattern_br",y.br[0],y.br[1]),b.setUniform1i("u_texture",1)}}if(b.setUniformMatrix4fv("u_transformMatrix",s),b.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord),b.setUniform1f("u_depth",a.z+1/65536),!V){var P=h*D[3];this._color[0]=P*D[0],this._color[1]=P*D[1],this._color[2]=P*D[2],this._color[3]=P,b.setUniform4fv("u_color",this._color)}_&&b.setUniform4f("u_id",d[0],d[1],d[2],d[3]),t.drawElements(4,e.triangleElementCount,5125,12*e.triangleElementStart),t.bindVAO()}}},t.prototype._getFillVAO=function(t,e,i){if(i){if(e.fillDDVertexArrayObject)return e.fillDDVertexArrayObject;var r=e.fillDDVertexBuffer,o=e.fillIndexBuffer;return r&&o?(e.fillDDVertexArrayObject=new u(t,this._fillAttributeLocationsDD,this._fillVertexAttributesDD,{geometry:r},o),e.fillDDVertexArrayObject):null}if(e.fillVertexArrayObject)return e.fillVertexArrayObject;var r=e.fillVertexBuffer,o=e.fillIndexBuffer;return r&&o?(e.fillVertexArrayObject=new u(t,this._fillAttributeLocations,this._fillVertexAttributes,{geometry:r},o),e.fillVertexArrayObject):null},t.prototype._getOutlineVAO=function(t,e,i){if(i){if(e.outlineDDVertexArrayObject)return e.outlineDDVertexArrayObject;var r=e.outlineDDVertexBuffer,o=e.outlineIndexBuffer;return r&&o?(e.outlineDDVertexArrayObject=new u(t,this._outlineAttributeLocationsDD,this._outlineVertexAttributesDD,{geometry:r},o),e.outlineDDVertexArrayObject):null}if(e.outlineVertexArrayObject)return e.outlineVertexArrayObject;var r=e.outlineVertexBuffer,o=e.outlineIndexBuffer;return r&&o?(e.outlineVertexArrayObject=new u(t,this._outlineAttributeLocations,this._outlineVertexAttributes,{geometry:r},o),e.outlineVertexArrayObject):null},t}()});