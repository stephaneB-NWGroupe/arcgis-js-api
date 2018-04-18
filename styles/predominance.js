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

define(["dojo/_base/array","dojo/_base/lang","dojo/has","../kernel","../Color","./colors","./size"],function(e,n,o,a,r,i,t){function m(n,o){return e.map(n,function(e){var n=new r(e);return null!=o&&(n.a=o),n})}function c(e,n,o,a,t){var c,p=i[e];if(p)switch(c={},c.colors=m(p[t]||p.stops),c.noDataColor=new r(n.noDataColor),c.opacity=n.fillOpacity||1,c.sizeInfo=a,o){case"point":c.outline={color:new r(n.outline.color),width:n.outline.width},c.size=n.size;break;case"line":c.width=n.width;break;case"polygon":c.outline={color:new r(n.outline.color),width:n.outline.width},a&&a.marker&&null!=n.markerSize&&(a.marker.size=n.markerSize)}return c}function p(e){var n=e;return"esriGeometryPoint"===n||"esriGeometryMultipoint"===n?n="point":"esriGeometryPolyline"===n?n="line":"esriGeometryPolygon"!==n&&"esriGeometryMultiPatch"!==n||(n="polygon"),n}var d={light:{color:[153,153,153,1],width:1},dark:{color:[51,51,51,1],width:1},darker:{color:[26,26,26,1],width:1}},l={default:{name:"default",label:"Default",description:"Default theme for visualizing features by their predominant category.",basemapGroups:{light:["streets","gray","topo","terrain","national-geographic","oceans","osm"],dark:["satellite","hybrid","dark-gray"]},pointSchemes:{light:{common:{noDataColor:"#aaaaaa",outline:d.light,size:8},primary:"predominant-v1",secondary:["predominant-v2","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]},dark:{common:{noDataColor:"#aaaaaa",outline:d.darker,size:8},primary:"predominant-v2",secondary:["predominant-v1","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]}},lineSchemes:{light:{common:{noDataColor:"#aaaaaa",width:2},primary:"predominant-v1",secondary:["predominant-v2","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]},dark:{common:{noDataColor:"#aaaaaa",width:2},primary:"predominant-v2",secondary:["predominant-v1","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]}},polygonSchemes:{light:{common:{noDataColor:"#aaaaaa",outline:d.light,fillOpacity:.8,markerSize:8},primary:"predominant-v1",secondary:["predominant-v2","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]},dark:{common:{noDataColor:"#aaaaaa",outline:d.dark,fillOpacity:.8,markerSize:8},primary:"predominant-v2",secondary:["predominant-v1","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]}}}},s={};!function(){var e,n,o,a,r,i,t,m;for(e in l){n=l[e],o=n.basemapGroups,r=s[e]={basemaps:[].concat(o.light).concat(o.dark),point:{},line:{},polygon:{}};for(a in o)for(i=o[a],t=0;t<i.length;t++)m=i[t],n.pointSchemes&&(r.point[m]=n.pointSchemes[a]),n.lineSchemes&&(r.line[m]=n.lineSchemes[a]),n.polygonSchemes&&(r.polygon[m]=n.polygonSchemes[a])}}();var h={getAvailableThemes:function(n){var o,a,r,i=[];for(o in l)a=l[o],r=s[o],n&&-1===e.indexOf(r.basemaps,n)||i.push({name:a.name,label:a.label,description:a.description,basemaps:r.basemaps.slice(0)});return i},getSchemes:function(n){var o,a,r=n.theme,i=n.basemap,m=p(n.geometryType),d=n.numColors,l=t.getSchemes({theme:"default",basemap:n.basemap,geometryType:n.geometryType}),h=l&&l.primaryScheme,u=s[r];return o=u&&u[m],o=o&&o[i],o&&(a={primaryScheme:c(o.primary,o.common,m,h,d),secondarySchemes:e.map(o.secondary,function(e){return c(e,o.common,m,h,d)})}),a},cloneScheme:function(e){var o;return e&&(o=n.mixin({},e),o.colors=m(o.colors),o.noDataColor&&(o.noDataColor=new r(o.noDataColor)),o.outline&&(o.outline={color:o.outline.color&&new r(o.outline.color),width:o.outline.width}),o.sizeInfo&&(o.sizeInfo=t.cloneScheme(o.sizeInfo))),o}};return o("extend-esri")&&n.setObject("styles.predominance",h,a),h});