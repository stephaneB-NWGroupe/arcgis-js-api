/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../Point","../Extent","../Multipoint","../Polygon","../Polyline"],(function(e,n,t,o,i,a){"use strict";const s={convertToGEGeometry:function(e,n){if(null==n)return null;let t="cache"in n?n.cache._geVersion:void 0;null==t&&(t=e.convertJSONToGeometry(n),"cache"in n&&(n.cache._geVersion=t));return t},exportPoint:function(e,t,o){const i=e.hasZ(t),a=e.hasM(t),s=new n({x:e.getPointX(t),y:e.getPointY(t),spatialReference:o});i&&(s.z=e.getPointZ(t));a&&(s.m=e.getPointM(t));return s.cache._geVersion=t,s},exportPolygon:function(e,n,t){const o=new i({rings:e.exportPaths(n),hasZ:e.hasZ(n),hasM:e.hasM(n),spatialReference:t});return o.cache._geVersion=n,o},exportPolyline:function(e,n,t){const o=new a({paths:e.exportPaths(n),hasZ:e.hasZ(n),hasM:e.hasM(n),spatialReference:t});return o.cache._geVersion=n,o},exportMultipoint:function(e,n,t){const i=new o({hasZ:e.hasZ(n),hasM:e.hasM(n),points:e.exportPoints(n),spatialReference:t});return i.cache._geVersion=n,i},exportExtent:function(e,n,o){const i=e.hasZ(n),a=e.hasM(n),s=new t({xmin:e.getXMin(n),ymin:e.getYMin(n),xmax:e.getXMax(n),ymax:e.getYMax(n),spatialReference:o});if(i){const t=e.getZExtent(n);s.zmin=t.vmin,s.zmax=t.vmax}if(a){const t=e.getMExtent(n);s.mmin=t.vmin,s.mmax=t.vmax}return s.cache._geVersion=n,s}};e.hydratedAdapter=s,Object.defineProperty(e,"__esModule",{value:!0})}));