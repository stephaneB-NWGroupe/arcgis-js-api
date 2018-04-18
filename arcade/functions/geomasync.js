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

define(["require","exports","../../geometry/Geometry","../../geometry/Polygon","../../geometry/Polyline","../../geometry/Point","../../geometry/Extent","../../geometry/Multipoint","../../geometry/jsonUtils","../languageUtils","../kernel","../../kernel","dojo/Deferred","../../geometry/geometryEngineAsync","./centroid"],function(n,e,r,t,i,l,o,u,f,a,c,s,g,d,h){function m(n){return v?n.clone():f.fromJson(n.toJson())}function w(n){return 0===s.version.indexOf("4.")?t.fromExtent(n):new t({spatialReference:n.spatialReference,rings:[[[n.xmin,n.ymin],[n.xmin,n.ymax],[n.xmax,n.ymax],[n.xmax,n.ymin],[n.xmin,n.ymin]]]})}function p(n,e,s){function p(n){if(a.pcCheck(n,2,2),n[0]instanceof r&&n[1]instanceof r);else if(n[0]instanceof r&&null===n[1]);else if(n[1]instanceof r&&null===n[0]);else if(null!==n[0]||null!==n[1])throw new Error("Illegal Argument")}n.disjoint=function(n,e){return s(n,e,function(n,e,r){return p(r),null===r[0]||null===r[1]||d.disjoint(r[0],r[1])})},n.intersects=function(n,e){return s(n,e,function(n,e,r){return p(r),null!==r[0]&&null!==r[1]&&d.intersects(r[0],r[1])})},n.touches=function(n,e){return s(n,e,function(n,e,r){return p(r),null!==r[0]&&null!==r[1]&&d.touches(r[0],r[1])})},n.crosses=function(n,e){return s(n,e,function(n,e,r){return p(r),null!==r[0]&&null!==r[1]&&d.crosses(r[0],r[1])})},n.within=function(n,e){return s(n,e,function(n,e,r){return p(r),null!==r[0]&&null!==r[1]&&d.within(r[0],r[1])})},n.contains=function(n,e){return s(n,e,function(n,e,r){return p(r),null!==r[0]&&null!==r[1]&&d.contains(r[0],r[1])})},n.overlaps=function(n,e){return s(n,e,function(n,e,r){return p(r),null!==r[0]&&null!==r[1]&&d.overlaps(r[0],r[1])})},n.equals=function(n,e){return s(n,e,function(n,e,t){return a.pcCheck(t,2,2),t[0]===t[1]||(t[0]instanceof r&&t[1]instanceof r?d.equals(t[0],t[1]):!(!a.isDate(t[0])||!a.isDate(t[1]))&&t[0].getTime()===t[1].getTime())})},n.relate=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,3,3),t[0]instanceof r&&t[1]instanceof r)return d.relate(t[0],t[1],a.toString(t[2]));if(t[0]instanceof r&&null===t[1])return!1;if(t[1]instanceof r&&null===t[0])return!1;if(null===t[0]&&null===t[1])return!1;throw new Error("Illegal Argument")})},n.intersection=function(n,e){return s(n,e,function(n,e,r){return p(r),null===r[0]||null===r[1]?null:d.intersect(r[0],r[1])})},n.union=function(n,e){return s(n,e,function(e,t,i){var l=[];if(0===i.length)throw new Error("Function called with wrong number of Parameters");if(1===i.length)if(a.isArray(i[0])){for(var o=0;o<i[0].length;o++)if(null!==i[0][o]){if(!(i[0][o]instanceof r))throw new Error("Illegal Argument");l.push(i[0][o])}}else{if(!a.isImmutableArray(i[0])){if(i[0]instanceof r)return a.fixSpatialReference(m(i[0]),n.spatialReference);if(null===i[0])return null;throw new Error("Illegal Argument")}for(var u=i[0].toArray(),o=0;o<u.length;o++)if(null!==u[o]){if(!(u[o]instanceof r))throw new Error("Illegal Argument");l.push(u[o])}}else for(var o=0;o<i.length;o++)if(null!==i[o]){if(!(i[o]instanceof r))throw new Error("Illegal Argument");l.push(i[o])}return 0===l.length?null:d.union(l)})},n.difference=function(n,e){return s(n,e,function(n,e,r){return p(r),null!==r[0]&&null===r[1]?m(r[0]):null===r[0]?null:d.difference(r[0],r[1])})},n.symmetricdifference=function(n,e){return s(n,e,function(n,e,r){return p(r),null===r[0]&&null===r[1]?null:null===r[0]?m(r[1]):null===r[1]?m(r[0]):d.symmetricDifference(r[0],r[1])})},n.clip=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,2,2),!(t[1]instanceof o)&&null!==t[1])throw new Error("Illegal Argument");if(null===t[0])return null;if(!(t[0]instanceof r))throw new Error("Illegal Argument");return null===t[1]?null:d.clip(t[0],t[1])})},n.cut=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,2,2),!(t[1]instanceof i)&&null!==t[1])throw new Error("Illegal Argument");if(null===t[0])return[];if(!(t[0]instanceof r))throw new Error("Illegal Argument");return null===t[1]?[m(t[0])]:d.cut(t[0],t[1])})},n.area=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,1,2),null===t[0])return 0;if(!(t[0]instanceof r))throw new Error("Illegal Argument");return d.planarArea(t[0],c.convertSquareUnitsToCode(a.defaultUndefined(t[1],-1)))})},n.areageodetic=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,1,2),null===t[0])return 0;if(!(t[0]instanceof r))throw new Error("Illegal Argument");return d.geodesicArea(t[0],c.convertSquareUnitsToCode(a.defaultUndefined(t[1],-1)))})},n.length=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,1,2),null===t[0])return 0;if(!(t[0]instanceof r))throw new Error("Illegal Argument");return d.planarLength(t[0],c.convertLinearUnitsToCode(a.defaultUndefined(t[1],-1)))})},n.lengthgeodetic=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,1,2),null===t[0])return 0;if(!(t[0]instanceof r))throw new Error("Illegal Argument");return d.geodesicLength(t[0],c.convertLinearUnitsToCode(a.defaultUndefined(t[1],-1)))})},n.distance=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,2,3),!(t[0]instanceof r))throw new Error("Illegal Argument");if(!(t[1]instanceof r))throw new Error("Illegal Argument");return d.distance(t[0],t[1],c.convertLinearUnitsToCode(a.defaultUndefined(t[2],-1)))})},n.densify=function(n,e){return s(n,e,function(n,e,l){if(a.pcCheck(l,2,3),null===l[0])return null;if(!(l[0]instanceof r))throw new Error("Illegal Argument");var u=a.toNumber(l[1]);if(isNaN(u))throw new Error("Illegal Argument");if(u<=0)throw new Error("Illegal Argument");return l[0]instanceof t||l[0]instanceof i?d.densify(l[0],u,c.convertLinearUnitsToCode(a.defaultUndefined(l[2],-1))):l[0]instanceof o?d.densify(w(l[0]),u,c.convertLinearUnitsToCode(a.defaultUndefined(l[2],-1))):l[0]})},n.densifygeodetic=function(n,e){return s(n,e,function(n,e,l){if(a.pcCheck(l,2,3),null===l[0])return null;if(!(l[0]instanceof r))throw new Error("Illegal Argument");var u=a.toNumber(l[1]);if(isNaN(u))throw new Error("Illegal Argument");if(u<=0)throw new Error("Illegal Argument");return l[0]instanceof t||l[0]instanceof i?d.geodesicDensify(l[0],u,c.convertLinearUnitsToCode(a.defaultUndefined(l[2],-1))):l[0]instanceof o?d.geodesicDensify(w(l[0]),u,c.convertLinearUnitsToCode(a.defaultUndefined(l[2],-1))):l[0]})},n.generalize=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,2,4),null===t[0])return null;if(!(t[0]instanceof r))throw new Error("Illegal Argument");var i=a.toNumber(t[1]);if(isNaN(i))throw new Error("Illegal Argument");return d.generalize(t[0],i,a.toBoolean(a.defaultUndefined(t[2],!0)),c.convertLinearUnitsToCode(a.defaultUndefined(t[3],-1)))})},n.buffer=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,2,3),null===t[0])return null;if(!(t[0]instanceof r))throw new Error("Illegal Argument");var i=a.toNumber(t[1]);if(isNaN(i))throw new Error("Illegal Argument");return 0===i?m(t[0]):d.buffer(t[0],i,c.convertLinearUnitsToCode(a.defaultUndefined(t[2],-1)))})},n.buffergeodetic=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,2,3),null===t[0])return null;if(!(t[0]instanceof r))throw new Error("Illegal Argument");var i=a.toNumber(t[1]);if(isNaN(i))throw new Error("Illegal Argument");return 0===i?m(t[0]):d.geodesicBuffer(t[0],i,c.convertLinearUnitsToCode(a.defaultUndefined(t[2],-1)))})},n.offset=function(n,e){return s(n,e,function(n,e,r){if(a.pcCheck(r,2,6),null===r[0])return null;if(!(r[0]instanceof t||r[0]instanceof i))throw new Error("Illegal Argument");var l=a.toNumber(r[1]);if(isNaN(l))throw new Error("Illegal Argument");var o=a.toNumber(a.defaultUndefined(r[4],10));if(isNaN(o))throw new Error("Illegal Argument");var u=a.toNumber(a.defaultUndefined(r[5],0));if(isNaN(u))throw new Error("Illegal Argument");return d.offset(r[0],l,c.convertLinearUnitsToCode(a.defaultUndefined(r[2],-1)),a.toString(a.defaultUndefined(r[3],"round")).toLowerCase(),o,u)})},n.rotate=function(n,e){return s(n,e,function(n,e,i){a.pcCheck(i,2,3);var u=i[0];if(null===u)return null;if(!(u instanceof r))throw new Error("Illegal Argument");u instanceof o&&(u=t.fromExtent(u));var f=a.toNumber(i[1]);if(isNaN(f))throw new Error("Illegal Argument");var c=a.defaultUndefined(i[2],null);if(null===c)return d.rotate(u,f);if(c instanceof l)return d.rotate(u,f,c);throw new Error("Illegal Argument")})},n.centroid=function(n,e){return s(n,e,function(e,f,c){if(a.pcCheck(c,1,1),null===c[0])return null;if(!(c[0]instanceof r))throw new Error("Illegal Argument");return c[0]instanceof l?a.fixSpatialReference(m(c[0]),n.spatialReference):c[0]instanceof t?v?c[0].centroid:c[0].getCentroid():c[0]instanceof i?h.centroidPolyline(c[0]):c[0]instanceof u?h.centroidMultiPoint(c[0]):c[0]instanceof o?v?c[0].center:c[0].getExtent().getCenter():null})},n.multiparttosinglepart=function(n,e){return s(n,e,function(e,s,h){a.pcCheck(h,1,1);var w=[];if(null===h[0])return null;if(!(h[0]instanceof r))throw new Error("Illegal Argument");if(h[0]instanceof l)return[a.fixSpatialReference(m(h[0]),n.spatialReference)];if(h[0]instanceof o)return[a.fixSpatialReference(m(h[0]),n.spatialReference)];var p=new g;return d.simplify(h[0]).then(c.callback(function(e){if(e instanceof t){for(var r=[],l=[],o=0;o<e.rings.length;o++)if(e.isClockwise(e.rings[o])){var c=f.fromJson({rings:[e.rings[o]],hasZ:e.hasZ,hazM:e.hasM,spatialReference:e.spatialReference.toJson()});r.push(c)}else l.push({ring:e.rings[o],pt:e.getPoint(o,0)});for(var s=0;s<l.length;s++)for(var g=0;g<r.length;g++)if(r[g].contains(l[s].pt)){r[g].addRing(l[s].ring);break}p.resolve(r)}else if(e instanceof i){for(var d=[],o=0;o<e.paths.length;o++){var v=f.fromJson({paths:[e.paths[o]],hasZ:e.hasZ,hazM:e.hasM,spatialReference:e.spatialReference.toJson()});d.push(v)}p.resolve(d)}else if(h[0]instanceof u){for(var A=a.fixSpatialReference(m(h[0]),n.spatialReference),o=0;o<A.points.length;o++)w.push(A.getPoint(o));p.resolve(w)}else p.resolve(null)},p),c.errback(p)),p.promise})},n.issimple=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,1,1),null===t[0])return!0;if(t[0]instanceof r)return d.isSimple(t[0]);throw new Error("Illegal Argument")})},n.simplify=function(n,e){return s(n,e,function(n,e,t){if(a.pcCheck(t,1,1),null===t[0])return null;if(t[0]instanceof r)return d.simplify(t[0]);throw new Error("Illegal Argument")})}}Object.defineProperty(e,"__esModule",{value:!0});var v=0===s.version.indexOf("4.");e.registerFunctions=p});