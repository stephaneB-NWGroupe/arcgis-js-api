/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../core/has","../../../Color","../../../core/screenUtils","../../../chunks/vec3f64","../../../support/elevationInfoUtils","./Settings","../../3d/interactive/visualElements/ExtendedLineVisualElement","../../3d/interactive/visualElements/RightAngleQuadVisualElement"],(function(e,t,n,i,r,a,o,s,c){"use strict";function d(e,t,n,i,o=r.create()){const s=t.toXYZ(e);return s[2]=a.getConvertedElevationFromMapPoint(i,s,t.spatialReference,n),i.renderCoordsHelper.toRenderCoords(s,t.spatialReference,o),o}function l(e,t,i,r,a=!0,c=!0){const d=new s.ExtendedLineVisualElement({view:t,extensionType:3,start:i,end:r,color:n.toUnitRGBA(o.defaults.orange),renderOccluded:16});switch(e){case 0:d.width=o.defaults.lineHintWidthTarget,d.fadedExtensions={start:0,end:o.defaults.lineHintFadedExtensions};break;case 3:d.width=o.defaults.lineHintWidthReference,d.fadedExtensions={start:0,end:0};break;case 1:case 2:d.width=o.defaults.lineHintWidthReference,d.fadedExtensions={start:a?o.defaults.lineHintFadedExtensions:0,end:c?o.defaults.lineHintFadedExtensions:0}}return d.attached=!0,d}const u=r.create(),f=i.createScreenPointArray();e.anyMapPointToRender=d,e.anyMapPointToScreenPoint=function(e,t,n,r){return d(e,t,n,r,u),r.state.camera.projectToScreen(u,f),i.createScreenPoint(f[0],f[1])},e.createLineSegmentHint=l,e.createLineSegmentHintFromEdge=function(e,t,n,i,r,a=!0,o=!0){return l(e,r,d(t.left.pos,n,i,r),d(t.right.pos,n,i,r),a,o)},e.createLineSegmentHintFromMap=function(e,t,n,i,r,a){return l(e,a,d(t,i,r,a),d(n,i,r,a))},e.createQuadHint=function(e,t,i,r,a,s){return new c.RightAngleQuadVisualElement({view:s,attached:!0,color:n.toUnitRGBA(o.defaults.orange),renderOccluded:2,outlineRenderOccluded:16,outlineColor:n.toUnitRGBA(o.defaults.orange),outlineSize:o.defaults.rightAngleHintOutlineSize,size:o.defaults.rightAngleHintSize,geometry:{previous:d(e,r,a,s),center:d(t,r,a,s),next:d(i,r,a,s)}})},e.objectEqual=function(e,t){const n=e.length===t.length&&e[0]===t[0]&&e[1]===t[1];switch(e.length){case 2:return n;case 3:return n&&e[2]===t[2];case 4:return n&&e[3]===t[3]}return!1},e.squareDistance=function(e,t){const n=e.x-t.x,i=e.y-t.y;return n*n+i*i},Object.defineProperty(e,"__esModule",{value:!0})}));