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
// See http://js.arcgis.com/3.34/esri/copyright.txt for details.

define(["./common"],(function(t){var n,r={};return r.create=function(){var n=new t.ARRAY_TYPE(3);return n[0]=0,n[1]=0,n[2]=0,n},r.clone=function(n){var r=new t.ARRAY_TYPE(3);return r[0]=n[0],r[1]=n[1],r[2]=n[2],r},r.fromValues=function(n,r,a){var u=new t.ARRAY_TYPE(3);return u[0]=n,u[1]=r,u[2]=a,u},r.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},r.set=function(t,n,r,a){return t[0]=n,t[1]=r,t[2]=a,t},r.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t},r.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t},r.sub=r.subtract,r.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t},r.mul=r.multiply,r.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t},r.div=r.divide,r.ceil=function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t},r.floor=function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t},r.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t},r.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t},r.round=function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t},r.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t},r.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t},r.distance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],u=n[2]-t[2];return Math.sqrt(r*r+a*a+u*u)},r.dist=r.distance,r.squaredDistance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],u=n[2]-t[2];return r*r+a*a+u*u},r.sqrDist=r.squaredDistance,r.length=function(t){var n=t[0],r=t[1],a=t[2];return Math.sqrt(n*n+r*r+a*a)},r.len=r.length,r.squaredLength=function(t){var n=t[0],r=t[1],a=t[2];return n*n+r*r+a*a},r.sqrLen=r.squaredLength,r.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},r.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t},r.normalize=function(t,n){var r=n[0],a=n[1],u=n[2],e=r*r+a*a+u*u;return e>0&&(e=1/Math.sqrt(e),t[0]=n[0]*e,t[1]=n[1]*e,t[2]=n[2]*e),t},r.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]},r.cross=function(t,n,r){var a=n[0],u=n[1],e=n[2],o=r[0],i=r[1],c=r[2];return t[0]=u*c-e*i,t[1]=e*o-a*c,t[2]=a*i-u*o,t},r.lerp=function(t,n,r,a){var u=n[0],e=n[1],o=n[2];return t[0]=u+a*(r[0]-u),t[1]=e+a*(r[1]-e),t[2]=o+a*(r[2]-o),t},r.hermite=function(t,n,r,a,u,e){var o=e*e,i=o*(2*e-3)+1,c=o*(e-2)+e,s=o*(e-1),h=o*(3-2*e);return t[0]=n[0]*i+r[0]*c+a[0]*s+u[0]*h,t[1]=n[1]*i+r[1]*c+a[1]*s+u[1]*h,t[2]=n[2]*i+r[2]*c+a[2]*s+u[2]*h,t},r.bezier=function(t,n,r,a,u,e){var o=1-e,i=o*o,c=e*e,s=i*o,h=3*e*i,f=3*c*o,M=c*e;return t[0]=n[0]*s+r[0]*h+a[0]*f+u[0]*M,t[1]=n[1]*s+r[1]*h+a[1]*f+u[1]*M,t[2]=n[2]*s+r[2]*h+a[2]*f+u[2]*M,t},r.random=function(n,r){r=r||1;var a=2*t.RANDOM()*Math.PI,u=2*t.RANDOM()-1,e=Math.sqrt(1-u*u)*r;return n[0]=Math.cos(a)*e,n[1]=Math.sin(a)*e,n[2]=u*r,n},r.transformMat4=function(t,n,r){var a=n[0],u=n[1],e=n[2],o=r[3]*a+r[7]*u+r[11]*e+r[15];return o=o||1,t[0]=(r[0]*a+r[4]*u+r[8]*e+r[12])/o,t[1]=(r[1]*a+r[5]*u+r[9]*e+r[13])/o,t[2]=(r[2]*a+r[6]*u+r[10]*e+r[14])/o,t},r.transformMat3=function(t,n,r){var a=n[0],u=n[1],e=n[2];return t[0]=a*r[0]+u*r[3]+e*r[6],t[1]=a*r[1]+u*r[4]+e*r[7],t[2]=a*r[2]+u*r[5]+e*r[8],t},r.transformQuat=function(t,n,r){var a=n[0],u=n[1],e=n[2],o=r[0],i=r[1],c=r[2],s=r[3],h=s*a+i*e-c*u,f=s*u+c*a-o*e,M=s*e+o*u-i*a,l=-o*a-i*u-c*e;return t[0]=h*s+l*-o+f*-c-M*-i,t[1]=f*s+l*-i+M*-o-h*-c,t[2]=M*s+l*-c+h*-i-f*-o,t},r.rotateX=function(t,n,r,a){var u=[],e=[];return u[0]=n[0]-r[0],u[1]=n[1]-r[1],u[2]=n[2]-r[2],e[0]=u[0],e[1]=u[1]*Math.cos(a)-u[2]*Math.sin(a),e[2]=u[1]*Math.sin(a)+u[2]*Math.cos(a),t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t},r.rotateY=function(t,n,r,a){var u=[],e=[];return u[0]=n[0]-r[0],u[1]=n[1]-r[1],u[2]=n[2]-r[2],e[0]=u[2]*Math.sin(a)+u[0]*Math.cos(a),e[1]=u[1],e[2]=u[2]*Math.cos(a)-u[0]*Math.sin(a),t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t},r.rotateZ=function(t,n,r,a){var u=[],e=[];return u[0]=n[0]-r[0],u[1]=n[1]-r[1],u[2]=n[2]-r[2],e[0]=u[0]*Math.cos(a)-u[1]*Math.sin(a),e[1]=u[0]*Math.sin(a)+u[1]*Math.cos(a),e[2]=u[2],t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t},r.forEach=(n=r.create(),function(t,r,a,u,e,o){var i,c;for(r||(r=3),a||(a=0),c=u?Math.min(u*r+a,t.length):t.length,i=a;i<c;i+=r)n[0]=t[i],n[1]=t[i+1],n[2]=t[i+2],e(n,n,o),t[i]=n[0],t[i+1]=n[1],t[i+2]=n[2];return t}),r.angle=function(t,n){var a=r.fromValues(t[0],t[1],t[2]),u=r.fromValues(n[0],n[1],n[2]);r.normalize(a,a),r.normalize(u,u);var e=r.dot(a,u);return e>1?0:Math.acos(e)},r.str=function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},r.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]},r.equals=function(n,r){var a=n[0],u=n[1],e=n[2],o=r[0],i=r[1],c=r[2];return Math.abs(a-o)<=t.EPSILON*Math.max(1,Math.abs(a),Math.abs(o))&&Math.abs(u-i)<=t.EPSILON*Math.max(1,Math.abs(u),Math.abs(i))&&Math.abs(e-c)<=t.EPSILON*Math.max(1,Math.abs(e),Math.abs(c))},r}));