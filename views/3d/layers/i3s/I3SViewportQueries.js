// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../lib/glMatrix","./I3SUtil","../../webgl-engine/lib/Util","../../support/projectionUtils","../graphics/featureExpressionInfoUtils","../graphics/ElevationContext","../graphics/Graphics3DSymbolCommonCode","../../../../geometry/Point"],function(e,t,r,i,s,o,n,a,c,h){var p=r.vec3d,l=r.vec4d,u=!1,m=1e5,d=function(){function e(e,t,r,i,o,c,p,u,m){void 0===m&&(m={}),this._computedMbs=e,this.indexSR=t,this._renderCoordsHelper=r,this.extent=o,this.errorMetricPreference=c,this.elevationProvider=p,this.options=m,this.fp=[],this.maxLodLevel=2,this._tmp1=[0,0,0],this._tmp2=[0,0,0],this._tmp3=[0,0,0],this._tmp0=[0,0,0],this.supportedMetrics=["screenSpaceRelative","maxScreenThreshold","removedFeatureDiameter","distanceRangeFromDefaultCamera"],this.screenspaceErrorBias=m.screenspaceErrorBias||1,this.progressiveLoadFactor=m.progressiveLoadFactor||1,this.enableLoD=!m.disableLod;for(var d=0;8>d;++d)this.fp[d]=l.create();s.matrix2frustumPlanes(i.viewMatrix,i.projectionMatrix,this.fp),this.engineSR=this._renderCoordsHelper.spatialReference,this._screenSizeFactor=1/i.perPixelRatio,this._camPos=i.eye,u?(this._elevationContext=new a,this._elevationContext.featureExpressionInfoContext=n.createContext(n.extractExpressionInfo(u,!1)),this._elevationContext.mixinApi(u)):this._elevationContext=null,this.tmpPoint=new h({x:0,y:0,z:0,spatialReference:t})}return e.prototype.computedMbs=function(e){var t=this._computedMbs[e.id];return null==t&&(t=l.createFrom(0,0,0,-1),this._computedMbs[e.id]=t),t[3]<0&&(l.set(e.mbs,t),this._elevationContext&&e.mbs[3]<m&&(this.tmpPoint.x=t[0],this.tmpPoint.y=t[1],this.tmpPoint.z=t[2],t[2]=c.computeElevation(this.elevationProvider,this.tmpPoint,this._elevationContext,this._renderCoordsHelper,null)),o.mbsToMbs(t,this.indexSR,t,this.engineSR)),t},e.prototype.isNodeVisible=function(e){var t=this.computedMbs(e);return this.isMBSinExtent(t)&&this.isMBSVisible(t)},e.prototype.isMBSinExtent=function(e){return this.extent?0!==i.intersectBoundingBoxWithMbs(this.extent,e):!0},e.prototype.isMBSVisible=function(e){var t=e[0],r=e[1],i=e[2],s=e[3],o=this.fp;return o[0][0]*t+o[0][1]*r+o[0][2]*i+o[0][3]<=s&&o[1][0]*t+o[1][1]*r+o[1][2]*i+o[1][3]<=s&&o[2][0]*t+o[2][1]*r+o[2][2]*i+o[2][3]<=s&&o[3][0]*t+o[3][1]*r+o[3][2]*i+o[3][3]<=s&&o[4][0]*t+o[4][1]*r+o[4][2]*i+o[4][3]<=s&&o[5][0]*t+o[5][1]*r+o[5][2]*i+o[5][3]<=s},e.prototype.calcScreenSpaceSize=function(e,t){var r=this.computedMbs(e),i=r[3],s=p.dist2(r,this._camPos)-i*i;return 0>s?.5*Number.MAX_VALUE:t/Math.sqrt(s)*this._screenSizeFactor},e.prototype.calcCameraDistance=function(e){var t=this.computedMbs(e);return Math.max(0,p.dist(t,this._camPos)-t[3])},e.prototype.calcAngleDependentLoD=function(e){var t=this.computedMbs(e),r=t[3],i=Math.abs(t[0]*(t[0]-this._camPos[0])+t[1]*(t[1]-this._camPos[1])+t[2]*(t[2]-this._camPos[2]))/p.length(t),s=(i+r)/p.dist(t,this._camPos);return Math.min(1,s)},e.prototype.hasLOD=function(e){return null!=e.lodSelection},e.prototype.hasFeatures=function(e){return null!=e.featureData},e.prototype.getDistancePlanarMode=function(e,t,r){var i=e[0]-t[0],s=e[1]-t[1],o=e[2]-t[2],n=i+i+s*s;if(r*r>=n)return Math.abs(o);var a=Math.sqrt(n)-r;return Math.sqrt(o*o+a*a)},e.prototype.getDistanceGlobeMode=function(e,t,r){var i=p.length(t),s=p.length(e)-i;p.scale(e,p.dot(e,t)/p.length2(e),this._tmp0);var o=p.dist2(t,this._tmp0);if(r*r>=o)return Math.abs(s);var n=p.scale(t,1/i,this._tmp0),a=r,c=i,h=a*a/2/c,l=p.scale(n,c-h,this._tmp1),u=e,m=p.subtract(u,l,this._tmp2),d=p.subtract(m,p.scale(n,p.dot(n,m),this._tmp3),this._tmp2),f=p.add(l,p.scale(d,a/p.length(d),this._tmp2),this._tmp2),v=p.dist(u,f);if(s>=2e5){var g=p.subtract(u,f,this._tmp1),x=p.dot(g,n)/p.length(g);.08>x&&(x=1e-4),v/=x}return v},e.prototype.getDistance=function(e,t,r){return this.engineSR===o.SphericalECEFSpatialReference?this.getDistanceGlobeMode(e,t,r):this.getDistancePlanarMode(e,t,r)},e.prototype._selectErrorMetric=function(e){if(this.errorMetricPreference){for(var t=0;t<this.errorMetricPreference.length;t++)for(var r=0;r<e.length;r++)if(e[r].metricType===this.errorMetricPreference[t])return e[r]}else for(var t=0;t<e.length;t++)if(this.supportedMetrics.indexOf(e[t].metricType)>=0)return e[t];return null},e.prototype.getLodLevel=function(e){if(e.lodSelection&&e.lodSelection.length>0){if(this.hasFeatures(e)===!1)return 0;if(null==e.children||0===e.children.length)return this.maxLodLevel;var t=this.enableLoD?this._selectErrorMetric(e.lodSelection):null;if(null!=t){if(this.progressiveLoadFactor<1){var r=this.progressiveLoadFactor*this.screenspaceErrorBias,i=this.screenspaceErrorBias;return this.evaluateLODmetric(e,r,t)?this.evaluateLODmetric(e,i,t)?2:1:0}return this.evaluateLODmetric(e,this.screenspaceErrorBias,t)?this.maxLodLevel:0}}return 0},e.prototype.evaluateLODmetric=function(e,t,r){if("screenSpaceRelative"===r.metricType){var i=this.computedMbs(e),s=this.getDistance(this._camPos,i,i[3]),o=2*s/this._screenSizeFactor;return u&&(console.debug("----node id "+e.id),console.debug("dist "+s),console.debug("screenSpaceRelative "+o),console.debug("lodMetric.maxError "+r.maxError),r.maxError>o?console.debug("isTooHighLOD false"):console.debug("isTooHighLOD true")),r.maxError*t<=o}if("maxScreenThreshold"===r.metricType){var n=this.calcScreenSpaceSize(e,e.mbs[3]*t);return this.options.angleDependentLoD&&(n*=this.calcAngleDependentLoD(e)),n<r.maxError}if("removedFeatureDiameter"===r.metricType){var a=this.calcScreenSpaceSize(e,r.maxError);return 10>a*t}return"distanceRangeFromDefaultCamera"===r.metricType?this.calcCameraDistance(e)>r.maxError*t:!1},e.prototype.distToPOI=function(e,t){var r=this.computedMbs(e);return p.dist(r,t)-r[3]},e.prototype.distCameraToPOI=function(e){return p.dist(this._camPos,e)},e}();return d});