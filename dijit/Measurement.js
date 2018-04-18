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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/debounce","dojo/sniff","dojo/dom-style","dojo/dom-construct","dojox/gfx","dijit/_Widget","dijit/registry","dijit/Menu","dijit/MenuItem","../symbols/PictureMarkerSymbol","../symbols/SimpleLineSymbol","../symbols/SimpleFillSymbol","../symbols/jsonUtils","../geometry/geodesicUtils","../geometry/webMercatorUtils","../geometry/Point","../geometry/Polyline","../geometry/Polygon","../graphic","../tasks/AreasAndLengthsParameters","../tasks/LengthsParameters","../tasks/GeometryService","../kernel","../config","../domUtils","../numberUtils","../lang","../units","../WKIDUnitConversion","../SpatialReference","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","./_EventedWidget","dojo/text!./templates/Measurement.html","dojo/i18n!../nls/jsapi","dijit/form/ToggleButton","dijit/form/DropDownButton","dijit/layout/ContentPane"],function(t,e,i,s,n,a,o,r,h,l,_,c,u,p,m,d,g,S,y,f,M,L,v,G,b,D,N,U,w,C,P,T,k,R,H,A,x,E,j,q,F){var W=e([j,c,x,E],{declaredClass:"esri.dijit.Measurement",widgetsInTemplate:!0,templateString:q,_map:null,_geometryService:null,_interpolatedMap:null,_mouseImgURL:null,_defaultPinURL:null,_measureGraphics:[],_measureGraphic:null,_locationGraphic:null,_tempGraphic:null,_polylineGraphics:null,_polygonGraphic:null,_pointSymbol:null,_useDefaultPointSymbol:!0,_defaultLineSymbol:null,_lineSymbol:null,_areaLineSymbol:null,_defaultFillSymbol:null,_fillSymbol:null,_borderlessFillSymbol:null,_defaultCustomPointSymbolHeight:25,_defaultCustomPointSymbolWidth:25,_userGeometry:null,_currentGeometry:null,_inputPoints:[],_unitDictionary:[],_densificationRatio:.07848050723825097,numberPattern:"#,###,###,##0.0",result:null,_defaultDistanceUnit:null,_defaultAreaUnit:null,_defaultLocationUnit:null,currentDistanceUnit:null,currentAreaUnit:null,currentLocationUnit:null,_unitStrings:{},_locationUnitStrings:[],_locationUnitStringsLong:[],_distanceUnitStrings:[],_distanceUnitStringsLong:[],_areaUnitStrings:[],_areaUnitStringsLong:[],_calculatingMsg:null,_gsErrorMsg:null,_NLS_Lat:null,_NLS_Lon:null,_mouseMoveMapHandler:null,_mouseClickMapHandler:null,_doubleClickMapHandler:null,_mouseDragMapHandler:null,_clickMapHandler:null,_mapExtentChangeHandler:null,_geometryAreaHandler:null,_snappingCallback:null,_calcTimer:null,_buttonDijits:{},previousTool:null,activeTool:null,markerLongitude:null,markerLatitude:null,mouseLongitude:null,mouseLatitude:null,_eventMap:{"measure-start":["toolName","unitName"],measure:["toolName","geometry","values","unitName","segmentLength"],"measure-end":["toolName","geometry","values","unitName"],"tool-change":["toolName","unitName","previousToolName"],"unit-change":["unitName","toolName"]},constructor:function(e,s){if(!e||!e.map)return void console.log("Unable to find the required 'map' property in widget parameters");if(this._map=e.map,this._map.loaded)this._map.cs=this._checkCS(this._map.spatialReference),this._interpolatedMap=!("Web Mercator"===this._map.cs||"PCS"===this._map.cs);else var r=n.connect(this._map,"onLoad",this,function(){n.disconnect(r),r=null,this._map.cs=this._checkCS(this._map.spatialReference),this._interpolatedMap=!("Web Mercator"===this._map.cs||"PCS"===this._map.cs)});this._geometryService=C.defaults.geometryService,this._mouseImgURL=t.toUrl("./images/cursor16x24.png"),this._defaultPinURL=t.toUrl("./images/esriGreenPin16x26.png"),this._defaultLineSymbol=new g(g.STYLE_SOLID,new a([0,128,255]),3),this._defaultFillSymbol=new S(g.STYLE_SOLID,this._defaultLineSymbol,new a([0,0,0,.5])),e.pointSymbol?(this._pointSymbol=e.pointSymbol,this._useDefaultPointSymbol=!1):(this._pointSymbol=new d(this._defaultPinURL,16,26),this._pointSymbol.setOffset(0,12));var h=e.fillSymbol||this._defaultFillSymbol;this._fillSymbol=h,this._areaLineSymbol=h.outline||this._defaultLineSymbol,this._borderlessFillSymbol=y.fromJson(h.toJson()),this._borderlessFillSymbol.setOutline(null),e.lineSymbol?this._lineSymbol=e.lineSymbol:this._lineSymbol=this._defaultLineSymbol,e.defaultLengthUnit?this._defaultDistanceUnit=e.defaultLengthUnit:this._defaultDistanceUnit=R.MILES,e.defaultAreaUnit?this._defaultAreaUnit=e.defaultAreaUnit:this._defaultAreaUnit=R.ACRES,e.defaultLocationUnit?this._defaultLocationUnit=e.defaultLocationUnit:this._defaultLocationUnit=R.DECIMAL_DEGREES,this._snappingCallback=i.hitch(this,this._snappingCallback),e.geometry&&(this._userGeometry=e.geometry),this._calcTimer=null,this.advancedLocationUnits=e.advancedLocationUnits||!1,this._NLS_Lon=F.widgets.measurement.NLS_longitude,this._NLS_Lat=F.widgets.measurement.NLS_latitude,this._gsErrorMsg=F.widgets.measurement.NLS_geometry_service_error,this._calculatingMsg=F.widgets.measurement.NLS_calculating,this._geometryServiceLength=o(this._geometryServiceLength,250)},startup:function(){if(this._setupDictionaries(),l.create("img",{src:this._mouseImgURL,style:"vertical-align: middle"},this.mouseCell),this._useDefaultPointSymbol?l.create("img",{src:this._defaultPinURL,style:"vertical-align: middle"},this.pinCell):this._drawPointGraphics(this.pinCell),this._userGeometry)if(this._map.loaded)this._measureCustomGeometry(this._userGeometry),this._userGeometry=null;else var t=n.connect(this._map,"onLoad",this,function(){n.disconnect(t),t=null,this._measureCustomGeometry(this._userGeometry),this._userGeometry=null})},destroy:function(){this._resetToolState(),this.clearResult(),this.inherited(arguments),this._map=this._geometryService=this._measureGraphics=this._measureGraphic=this._tempGraphic=null},setTool:function(t,e){this.previousTool=this.activeTool||null,this._polylineGraphics=[],this._resetToolState(),this._polygonGraphic&&(this._map.graphics.remove(this._polygonGraphic),this._polygonGraphic=null);var i=u.byNode(this._buttonDijits[t].domNode).checked;h.set(this._unitDropDown.domNode,"visibility","visible"),u.byNode(this._buttonDijits.area.domNode).set("checked",!1),u.byNode(this._buttonDijits.distance.domNode).set("checked",!1),u.byNode(this._buttonDijits.location.domNode).set("checked",!1),!0!==e&&!1!==e||(i=e),u.byNode(this._buttonDijits[t].domNode).set("checked",i),this._toggleLocationResultsTable(!1,!0),i?(this.activeTool=t,this._dblClickZoom=this._map.isDoubleClickZoom,this._dblClickZoom&&this._map.disableDoubleClickZoom(),"area"===t?this._setupAreaTool():"distance"===t?this._setupDistanceTool():"location"===t&&this._setupLocationTool(),this._map.snappingManager&&(this._map.snappingManager._startSelectionLayerQuery(),this._map.snappingManager._setUpSnapping())):(this.activeTool=null,h.set(this._unitDropDown.domNode,"visibility","hidden")),this.activeTool!==this.previousTool&&this.onToolChange(this.activeTool,this.getUnit(),this.previousTool)},measure:function(t){t&&this._measureCustomGeometry(t)},clearResult:function(){var t,e=this._map;for(this.result=0,this.resultValue.setContent("&nbsp"),t=0;t<this._measureGraphics.length;t++)e.graphics.remove(this._measureGraphics[t]);this._currentGeometry=null,this._locationGraphic=null,this._measureGraphic=null,this._measureGraphics=[],e.graphics.remove(this._tempGraphic),n.disconnect(this._mouseMoveMapHandler),this._mouseMoveMapHandler=null},show:function(){P.show(this.domNode)},hide:function(){P.hide(this.domNode)},showTool:function(t){h.set(this._buttonDijits[t].domNode,"display","inline-block")},hideTool:function(t){h.set(this._buttonDijits[t].domNode,"display","none")},getTool:function(){if(this.activeTool)return{toolName:this.activeTool,unitName:this.getUnit()}},getUnit:function(){if("unit"!==this._unitDropDown.label)return this._unitDropDown.label},_setupLocationTool:function(){this._map.navigationManager.setImmediateClick(!0),this._measureGraphics=[],this._map.graphics.remove(this._locationGraphic),this._createLocationUnitList(),"PCS"===this._map.cs&&(this._projectMapExtent(this._map.extent),this._mapExtentChangeHandler=n.connect(this._map,"onExtentChange",i.hitch(this,this._projectMapExtent))),this._clickMapHandler=n.connect(this._map,"onClick",this,"_locationClickHandler"),!("esriDegreeMinuteSeconds"===this.currentLocationUnit||"esriDecimalDegrees"===this.currentLocationUnit)||(this._mouseMoveMapHandler=n.connect(this._map,"onMouseMove",this,"_locationMoveHandler"))},_locationButtonToggle:function(){this.clearResult(),this.setTool("location")},_measureCustomPoint:function(t){this.setTool("location",!0),"Web Mercator"===this._map.cs&&t.spatialReference!==this._map.spatialReference&&(t=M.geographicToWebMercator(t)),this._measureGraphic=new b,this._measureGraphic.setSymbol(this._pointSymbol),this._measureGraphic.setGeometry(t),this._measureGraphics.push(this._measureGraphic),this._map.graphics.add(this._measureGraphic),this._currentGeometry=t,this._calculateLocation(t,!0)},_calculateLocation:function(t,e){var s=!("esriDegreeMinuteSeconds"===this.currentLocationUnit||"esriDecimalDegrees"===this.currentLocationUnit);s&&this._mouseMoveMapHandler&&(n.disconnect(this._mouseMoveMapHandler),this._mouseMoveMapHandler=null);var a=i.clone(t);if(e){if("Web Mercator"!==this.map.cs&&this.map.spatialReference&&4326!==this.map.spatialReference.wkid)return void this._projectLocation(a,s);this._updateMarkerLocation(a.x,a.y)}a=this._getGCSLocation(a),this._advancedLocationDisplayHandler(a,s,e)},_projectLocation:function(t,e){this._geometryService.project([t],new A({wkid:4326}),i.hitch(this,function(t){this._advancedLocationDisplayHandler(t[0],e,!0)}),i.hitch(this,function(t){console.log(this._gsErrorMsg,t)}))},_advancedLocationDisplayHandler:function(t,e,i){var s;e?this._updateGeocoordinateStringLocation({coordinates:[[t.x,t.y]],sr:{wkid:4326},conversionType:this._unitStrings[this.currentLocationUnit]},t):(s=this._calculateXY(t.x,t.y),i?(this._updateClickLocation(s[0],s[1]),this.onMeasureEnd(this.activeTool,t,[s[0],s[1]],this.getUnit())):this._updateMouseLocation(s[0],s[1]))},_updateMarkerLocation:function(t,e){this.markerLocationX=t,this.markerLocationY=e},_updateMouseLocation:function(t,e){this.mouseLongitude.innerHTML=t,this.mouseLatitude.innerHTML=e},_updateClickLocation:function(t,e){this._updateMouseLocation(t,e),this.markerLongitude.innerHTML=t,this.markerLatitude.innerHTML=e},_updateGeocoordinateStringLocation:function(t,e){this.resultValue.setContent("&nbsp"),this._geometryService.toGeoCoordinateString(t,i.hitch(this,function(t){clearTimeout(this._calcTimer),t?(this.resultValue.setContent(t[0]),this.onMeasureEnd(this.activeTool,e,t,this.getUnit())):(this.resultValue.setContent(this._gsErrorMsg),this.onMeasureEnd(this.activeTool,null,null,this.getUnit()))})),clearTimeout(this._calcTimer),this._calcTimer=setTimeout(i.hitch(this,function(){this.resultValue.setContent(this._calculatingMsg)},1e3))},_switchLocationUnit:function(t){if(u.byNode(this._unitDropDown.domNode).set("label",this._unitStrings[t]),this.currentLocationUnit=t,n.disconnect(this._mouseMoveMapHandler),this._mouseMoveMapHandler=null,this.onUnitChange(this._unitStrings[t],this.activeTool),"esriDegreeMinuteSeconds"===t||"esriDecimalDegrees"===t)this._mouseMoveMapHandler=n.connect(this._map,"onMouseMove",this,"_locationMoveHandler"),this._toggleLocationResultsTable(!0,!1),this._locationGraphic&&this._calculateLocation(this._locationGraphic.geometry,!0);else{if(this._toggleLocationResultsTable(!1,!1),null===this.resultValue||null===this.markerLocationX&&null===this.markerLocationY)return;if(this._locationGraphic){var e=this._getGCSLocation(this._locationGraphic.geometry);this._updateGeocoordinateStringLocation({coordinates:[[e.x,e.y]],sr:{wkid:4326},conversionType:this._unitStrings[t]},this._locationGraphic.geometry)}}},_toggleLocationResultsTable:function(t,e){e&&(this.resultValue.setContent("&nbsp"),this.markerLongitude.innerHTML="---",this.markerLatitude.innerHTML="---",this.mouseLongitude.innerHTML="---",this.mouseLatitude.innerHTML="---"),t?(P.show(this.resultTable.domNode),P.hide(this.resultValueContainer.domNode)):(P.hide(this.resultTable.domNode),P.show(this.resultValueContainer.domNode),n.disconnect(this._mouseMoveMapHandler)),"PCS"===this._map.cs&&P.hide(this._mouseRow)},_setupDistanceTool:function(){this._map.navigationManager.setImmediateClick(!0),"PCS"===this._map.cs&&(this._projectMapExtent(this._map.extent),this._mapExtentChangeHandler=n.connect(this._map,"onExtentChange",this,"_projectMapExtent")),this._inputPoints=[],this._createDistanceUnitList(),this._mouseClickMapHandler=n.connect(this._map,"onClick",this,"_measureDistanceMouseClickHandler"),this._doubleClickMapHandler=n.connect(this._map,"onDblClick",this,"_measureDistanceDblClickHandler")},_distanceButtonToggle:function(){this.clearResult(),this.setTool("distance")},_measureCustomDistance:function(t){if(t.paths[0].length>1){this.setTool("distance",!0),this._inputPoints=[],s.forEach(t.paths[0],i.hitch(this,function(e,i){this._inputPoints.push(e);var s=new b(new L(e[0],e[1],t.spatialReference),this._pointSymbol);this._measureGraphics.push(s),this._map.graphics.add(s),0!==i&&(this.result+=this._geodesicDistance(e,t.paths[0][i-1]))})),this._measureGraphic=new b,this._measureGraphic.setSymbol(this._lineSymbol),this._measureGraphics.push(this._measureGraphic);var e=this._densifyGeometry(t);this._measureGraphic.setGeometry(e),this._map.graphics.add(this._measureGraphic),this._inputPoints=[];var n=this._outputResult(this.result,this.getUnit());this._currentGeometry=t,this.onMeasureEnd(this.activeTool,t,n,this.getUnit())}},_showDistance:function(t){t&&this._outputResult(t,u.byNode(this._unitDropDown.domNode).label)},_setupAreaTool:function(){this._map.navigationManager.setImmediateClick(!0),this._inputPoints=[],this._createAreaUnitList(),this._tempGraphic=new b,this._tempGraphic.setSymbol(this._areaLineSymbol),this._tempGraphic.setGeometry(new v(this._map.spatialReference)),this._map.graphics.add(this._tempGraphic),"PCS"===this._map.cs&&(this._geometryAreaHandler=n.connect(this._geometryService,"onAreasAndLengthsComplete",this,"_outputArea")),this._mouseClickMapHandler=n.connect(this._map,"onClick",this,"_measureAreaMouseClickHandler"),this._doubleClickMapHandler=n.connect(this._map,"onDblClick",this,"_measureAreaDblClickHandler")},_areaButtonToggle:function(){this.clearResult(),this.setTool("area")},_generatePolygonFromPaths:function(){var t=[];s.forEach(this._polylineGraphics,i.hitch(this,function(e){s.forEach(e.geometry.paths,i.hitch(this,function(e){s.forEach(e,i.hitch(this,function(e){t.push(e)}))}))})),t.push(t[0]);var e=new G(this._map.spatialReference);e.addRing(t);var n=this._densifyGeometry(e),a=new b;return a.setGeometry(n),a.setSymbol(this._borderlessFillSymbol),this._measureGraphic=a,this._measureGraphics.push(a),a},_getArea:function(t){var e=[],n=new D;if(n.areaUnit=U.UNIT_SQUARE_METERS,n.calculationType="geodesic",G.prototype.isSelfIntersecting(t))this._geometryService.simplify([t],i.hitch(this,function(t){s.forEach(t,i.hitch(this,function(i){if("PCS"===this._map.cs)return n.polygons=t,void this._geometryService.areasAndLengths(n);"Web Mercator"===this._map.cs&&(i=M.webMercatorToGeographic(i)),e.push(i)}));var a=f.geodesicAreas(e,R.SQUARE_METERS);this._showArea(a[0])}));else{if("Web Mercator"===this._map.cs&&(t=M.webMercatorToGeographic(t)),e.push(t),"PCS"===this._map.cs)return n.polygons=e,void this._geometryService.areasAndLengths(n);var a=f.geodesicAreas(e,R.SQUARE_METERS);this._showArea(Math.abs(a[0]))}},_outputArea:function(t){this._showArea(Math.abs(t.areas[0]))},_showArea:function(t){if(t){this.result=t;var e=u.byNode(this._unitDropDown.domNode).label,i=this._outputResult(this.result,e);this._mouseMoveMapHandler?this.onMeasure(this.activeTool,this._currentGeometry,i,this.getUnit(),null):this.onMeasureEnd(this.activeTool,this._currentGeometry,i,this.getUnit())}},_measureCustomArea:function(t){this.setTool("area",!0),this._inputPoints=[];var e=this._densifyGeometry(t);this._currentGeometry=t,this._measureGraphic=new b,this._measureGraphic.setGeometry(e),this._measureGraphic.setSymbol(this._fillSymbol),this._measureGraphics.push(this._measureGraphic),this._map.graphics.add(this._measureGraphic),this._getArea(t),this._inputPoints=[]},_resetToolState:function(){var t=this._map;t.navigationManager.setImmediateClick(!1),this._dblClickZoom&&t.enableDoubleClickZoom(),this._inputPoints=[],n.disconnect(this._mouseClickMapHandler),n.disconnect(this._mouseMoveMapHandler),n.disconnect(this._doubleClickMapHandler),n.disconnect(this._mouseDragMapHandler),n.disconnect(this._clickMapHandler),n.disconnect(this._mapExtentChangeHandler),n.disconnect(this._geometryAreaHandler),this._mouseClickMapHandler=this._mouseMoveMapHandler=this._doubleClickMapHandler=this._mouseDragMapHandler=this._clickMapHandler=this._mapExtentChangeHandler=this._geometryAreaHandler=null,t.snappingManager&&t.snappingManager._snappingGraphic&&t.graphics.remove(t.snappingManager._snappingGraphic),this._map.snappingManager&&(this._map.snappingManager._stopSelectionLayerQuery(),this._map.snappingManager._killOffSnapping()),this._unitDropDown._opened&&this._unitDropDown.closeDropDown()},_measureCustomGeometry:function(t){switch(this.clearResult(),t.type){case"point":this._measureCustomPoint(t);break;case"polyline":this._measureCustomDistance(t);break;case"polygon":this._measureCustomArea(t)}},_densifyGeometry:function(t){var e,i=this._map.cs,s=t.spatialReference,n=f.getSpheroidInfo(s),a=n.radius,o=a*this._densificationRatio;if("Web Mercator"===i){var r=M.webMercatorToGeographic(t),h=f.geodesicDensify(r,o);e=M.geographicToWebMercator(h)}else e="PCS"===i?t:f.geodesicDensify(t,o);return e},_geodesicDistance:function(t,e){var i=new v(this._map.spatialReference);return"PCS"===this._map.cs&&(t=this._getGCSLocation(t),e=this._getGCSLocation(e)),i.addPath([t,e]),"Web Mercator"===this._map.cs&&(i=M.webMercatorToGeographic(i)),f.geodesicLengths([i],R.METERS)[0]},_calculateXY:function(t,e){var i,s,n,a=F.widgets.measurement,o=this._map.getScale();if(this.getUnit()===a.NLS_decimal_degrees)n=o>=500?6:o<500&&o>=50?7:o<50&&o>=5?8:9,i=t.toFixed(n),this._map.spatialReference._isWrappable()||(i=this._roundX(i)),i=T.format(i),s=T.format(this._roundY(e.toFixed(n)));else if(this.getUnit()===a.NLS_deg_min_sec){var r,h,l,_,c,u,p=!1,m=!1;n=o>=9e4?0:o<9e4&&o>=9e3?1:o<9e3&&o>=900?2:o<900&&o>90?3:4,t<0&&(p=!0,t=Math.abs(t)),e<0&&(m=!0,e=Math.abs(e)),e=this._roundY(e),this._map.spatialReference._isWrappable()||(t=this._roundX(t)),r=Math.floor(e)+"°",h=Math.floor(t)+"°",l=Math.floor(this._getDegreeMinutes(e))+"'",_=Math.floor(this._getDegreeMinutes(t))+"'",c=T.format(this._getDegreeSeconds(e).toFixed(n))+'"',u=T.format(this._getDegreeSeconds(t).toFixed(n))+'"',s=r+l+c,i=h+_+u,p&&(i="-"+i),m&&(s="-"+s)}return[i,s]},_getDegreeMinutes:function(t){return 60*(t-Math.floor(t))},_getDegreeSeconds:function(t){return 60*(60*(t-Math.floor(t))-Math.floor(60*(t-Math.floor(t))))},_roundY:function(t){return t>90?t=90:t<-90&&(t=-90),t},_roundX:function(t){return t>180?t=180:t<-180&&(t=-180),t},_getGCSLocation:function(t){var e=i.clone(t),s=this._map,n=s.extent,a=s._newExtent;if("Web Mercator"===s.cs)e=M.webMercatorToGeographic(e);else if("PCS"===s.cs){if(a){var o=Math.abs((a.xmax-a.xmin)/(n.xmax-n.xmin)),r=Math.abs((a.ymax-a.ymin)/(n.ymax-n.ymin)),h=(e.x-n.xmin)*o+a.xmin,l=(e.y-n.ymin)*r+a.ymin;e=new L(h,l,s.spatialReference)}}else e=e.normalize();return e},_projectMapExtent:function(t){var e=new b(t),s=new A({wkid:4326});this._geometryService.project([e.geometry],s,i.hitch(this,function(t){this._mouseMoveMapHandler||"location"!==this.activeTool||("esriDegreeMinuteSeconds"!==this.currentLocationUnit&&"esriDecimalDegrees"!==this.currentLocationUnit||(this._mouseMoveMapHandler=n.connect(this._map,"onMouseMove",i.hitch(this,this._locationMoveHandler))),this._mouseMoveMapHandler=n.connect(this._map,"onMouseMove",i.hitch(this,this._locationMoveHandler))),this._map._newExtent=t[0]}))},_checkCS:function(t){return t.wkid?3857===t.wkid||102100===t.wkid||102113===t.wkid?"Web Mercator":k.isDefined(H[t.wkid])?"PCS":"GCS":t.wkt?-1!==t.wkt.indexOf("WGS_1984_Web_Mercator")?"Web Mercator":0===t.wkt.indexOf("PROJCS")?"PCS":"GCS":void 0},_switchUnit:function(t){if("distance"===this.activeTool?this.currentDistanceUnit=t:"area"===this.activeTool?this.currentAreaUnit=t:"location"===this.activeTool&&(this.currentLocationUnit=t),u.byNode(this._unitDropDown.domNode).set("label",this._unitStrings[t]),null!==this.result){var e=this._outputResult(this.result,this._unitStrings[t]);if(this.onUnitChange(this._unitStrings[t],this.activeTool),null!==this._currentGeometry||null!==this._measureGraphic){var i=this._currentGeometry||this._measureGraphic.geometry;this._mouseMoveMapHandler?this.onMeasure(this.activeTool,i,e,this.getUnit(),null):this.onMeasureEnd(this.activeTool,i,e,this.getUnit())}}},_setupDictionaries:function(){var t=F.widgets.measurement;this._unitDictionary[t.NLS_length_meters]=1,this._unitDictionary[t.NLS_length_kilometers]=1e3,this._unitDictionary[t.NLS_length_feet]=.3048,this._unitDictionary[t.NLS_length_miles]=1609.344,this._unitDictionary[t.NLS_length_yards]=.9144,this._unitDictionary[t.NLS_length_nautical_miles]=1852,this._unitDictionary[t.NLS_length_miles_us]=1609.347218694438,this._unitDictionary[t.NLS_length_feet_us]=.3048006096012192,this._unitDictionary[t.NLS_length_yards_us]=.9144018288036576,this._unitDictionary[t.NLS_area_sq_meters]=1,this._unitDictionary[t.NLS_area_sq_kilometers]=1e6,this._unitDictionary[t.NLS_area_sq_feet]=.09290304,this._unitDictionary[t.NLS_area_acres]=4046.8564224,this._unitDictionary[t.NLS_area_sq_miles]=2589988.110336,this._unitDictionary[t.NLS_area_hectares]=1e4,this._unitDictionary[t.NLS_area_sq_yards]=.83612736,this._unitDictionary[t.NLS_area_sq_nautical_miles]=3429904,this._unitDictionary[t.NLS_area_acres_us]=4046.872609874252,this._unitDictionary[t.NLS_area_sq_miles_us]=2589998.470319522,this._unitDictionary[t.NLS_area_sq_feet_us]=.09290341161327487,this._unitDictionary[t.NLS_area_sq_yards_us]=.8361307045194736,this._unitStrings={esriMiles:t.NLS_length_miles,esriKilometers:t.NLS_length_kilometers,esriFeet:t.NLS_length_feet,esriFeetUS:t.NLS_length_feet_us,esriMeters:t.NLS_length_meters,esriYards:t.NLS_length_yards,esriNauticalMiles:t.NLS_length_nautical_miles,esriMilesUS:t.NLS_length_miles_us,esriYardsUS:t.NLS_length_yards_us,esriAcres:t.NLS_area_acres,esriSquareMiles:t.NLS_area_sq_miles,esriSquareKilometers:t.NLS_area_sq_kilometers,esriHectares:t.NLS_area_hectares,esriSquareYards:t.NLS_area_sq_yards,esriSquareFeet:t.NLS_area_sq_feet,esriSquareFeetUS:t.NLS_area_sq_feet_us,esriSquareMeters:t.NLS_area_sq_meters,esriAcresUS:t.NLS_area_acres_us,esriSquareMilesUS:t.NLS_area_sq_miles_us,esriSquareYardsUS:t.NLS_area_sq_yards_us,esriSquareNauticalMiles:t.NLS_area_sq_nautical_miles,esriDecimalDegrees:t.NLS_decimal_degrees,esriDegreeMinuteSeconds:t.NLS_deg_min_sec,esriMGRS:t.NLS_MGRS,esriUSNG:t.NLS_USNG,esriUTM:t.NLS_UTM,esriGARS:t.NLS_GARS,esriGeoRef:t.NLS_GeoRef,esriDDM:t.NLS_DDM,esriDD:t.NLS_DD},this._locationUnitStrings=[t.NLS_decimal_degrees,t.NLS_deg_min_sec,t.NLS_MGRS,t.NLS_USNG,t.NLS_UTM,t.NLS_GeoRef,t.NLS_GARS],this._locationUnitStringsLong=["esriDecimalDegrees","esriDegreeMinuteSeconds","esriMGRS","esriUSNG","esriUTM","esriGeoRef","esriGARS"],this._distanceUnitStrings=[t.NLS_length_miles,t.NLS_length_kilometers,t.NLS_length_feet,t.NLS_length_feet_us,t.NLS_length_meters,t.NLS_length_yards,t.NLS_length_nautical_miles],this._distanceUnitStringsLong=["esriMiles","esriKilometers","esriFeet","esriFeetUS","esriMeters","esriYards","esriNauticalMiles"],this._areaUnitStrings=[t.NLS_area_acres,t.NLS_area_sq_miles,t.NLS_area_sq_kilometers,t.NLS_area_hectares,t.NLS_area_sq_yards,t.NLS_area_sq_feet,t.NLS_area_sq_feet_us,t.NLS_area_sq_meters],this._areaUnitStringsLong=["esriAcres","esriSquareMiles","esriSquareKilometers","esriHectares","esriSquareYards","esriSquareFeet","esriSquareFeetUS","esriSquareMeters"],this._buttonDijits={area:this._areaButton,distance:this._distanceButton,location:this._locationButton},u.byNode(this._distanceButton.domNode).setLabel(t.NLS_distance),u.byNode(this._areaButton.domNode).setLabel(t.NLS_area),u.byNode(this._locationButton.domNode).setLabel(t.NLS_location),u.byNode(this.resultLabel.domNode).setContent(t.NLS_resultLabel)},onToolChange:function(){},onUnitChange:function(){},onMeasureStart:function(){},onMeasure:function(){},onMeasureEnd:function(){},_measureAreaMouseClickHandler:function(t){var e,i;this._map.snappingManager&&(e=this._map.snappingManager._snappingPoint);var s=e||t.mapPoint;if(this._inputPoints.push(s),this._currentStartPt=s,1===this._inputPoints.length){for(this._tempGraphic.setGeometry(new v(this._map.spatialReference)),i=0;i<this._measureGraphics.length;i++)this._map.graphics.remove(this._measureGraphics[i]);this._measureGraphics=[],this.result=0,this._outputResult(this.result,F.widgets.measurement.NLS_area_sq_meters),this._mouseMoveMapHandler=n.connect(this._map,"onMouseMove",this,"_measureAreaMouseMoveHandler"),this.onMeasureStart(this.activeTool,this.getUnit())}if(this._measureGraphic=new b,this._measureGraphic.setSymbol(this._areaLineSymbol),this._measureGraphics.push(this._measureGraphic),this._inputPoints.length>1){var a=new v(this._map.spatialReference);a.addPath([this._inputPoints[this._inputPoints.length-2],s]);var o=new v(this._map.spatialReference);o.addPath([this._inputPoints[0],s]);var r=this._densifyGeometry(a),h=this._densifyGeometry(o);this._tempGraphic.setGeometry(h),this._measureGraphic.setGeometry(r),this._map.graphics.add(this._measureGraphic);var l=new b;if(l.setGeometry(a),this._polylineGraphics.push(l),this._inputPoints.length>2){var _=new G(this._map.spatialReference),c=[];for(i=0;i<this._inputPoints.length;i++)c.push([this._inputPoints[i].x,this._inputPoints[i].y]);c.push([this._inputPoints[0].x,this._inputPoints[0].y]),_.addRing(c),this._currentGeometry=_,this._polygonGraphic?(this._map.graphics.remove(this._polygonGraphic),this._polylineGraphics.push(this._tempGraphic),this._polygonGraphic=this._generatePolygonFromPaths(),this._map.graphics.add(this._polygonGraphic),this._measureGraphic=this._polygonGraphic,this._polylineGraphics.pop()):(this._polygonGraphic=this._generatePolygonFromPaths(),this._map.graphics.add(this._polygonGraphic)),this._getArea(_)}}else this._polygonGraphic&&(this._map.graphics.remove(this._polygonGraphic),this._polygonGraphic=null)},_measureAreaMouseMoveHandler:function(t){var e;if(this._inputPoints.length>0){var i,s=new v(this._map.spatialReference);this._map.snappingManager&&(i=this._map.snappingManager._snappingPoint),e=i||t.mapPoint,s.addPath([this._currentStartPt,e]);var n=this._densifyGeometry(s);this._tempGraphic.setGeometry(n)}if(this._inputPoints.length>1){var a=new v(this._map.spatialReference);a.addPath([e,this._inputPoints[0]]);var o=this._densifyGeometry(a);this._tempGraphic.setGeometry(this._tempGraphic.geometry.addPath(o.paths[0]))}},_measureAreaDblClickHandler:function(t){n.disconnect(this._mouseMoveMapHandler),this._mouseMoveMapHandler=null,"touch"===this._map.navigationManager.eventModel&&r("ios")&&this._measureAreaMouseClickHandler(t);var e,i=new G(this._map.spatialReference),s=[];for(e=0;e<this._inputPoints.length;e++)s.push([this._inputPoints[e].x,this._inputPoints[e].y]);s.push([this._inputPoints[0].x,this._inputPoints[0].y]),i.addRing(s),this._inputPoints=[],this._currentGeometry=i,this._polygonGraphic&&(this._map.graphics.remove(this._polygonGraphic),this._polylineGraphics.push(this._tempGraphic),this._polygonGraphic=this._generatePolygonFromPaths(),this._map.graphics.add(this._polygonGraphic)),this._getArea(i),this._polylineGraphics=[]},_measureDistanceMouseClickHandler:function(t){var e;this._map.snappingManager&&(e=this._map.snappingManager._snappingPoint);var i=e||t.mapPoint;if(this._inputPoints.push(i),this._currentStartPt=i,1===this._inputPoints.length){var s;for(s=0;s<this._measureGraphics.length;s++)this._map.graphics.remove(this._measureGraphics[s]);this._map.graphics.remove(this._tempGraphic),this._measureGraphics=[],this.result=0,this._outputResult(this.result,F.widgets.measurement.NLS_length_meters),this._tempGraphic=new b,this._tempGraphic.setSymbol(this._lineSymbol),this._map.graphics.add(this._tempGraphic),this._mouseMoveMapHandler=n.connect(this._map,"onMouseMove",this,"_measureDistanceMouseMoveHandler"),this.onMeasureStart(this.activeTool,this.getUnit())}this._tempGraphic.setGeometry(new v(this._map.spatialReference));var a=new b;if(a.setSymbol(this._pointSymbol),a.setGeometry(i),this._measureGraphics.push(a),this._map.graphics.add(a),this._inputPoints.length>1){this._measureGraphic=new b,this._measureGraphic.setSymbol(this._lineSymbol),this._measureGraphics.push(this._measureGraphic);var o=new v(this._map.spatialReference);o.addPath([this._inputPoints[this._inputPoints.length-2],i]);var r=this._densifyGeometry(o);if(this._measureGraphic.setGeometry(r),this._map.graphics.add(this._measureGraphic),"PCS"===this._map.cs)this._geometryServiceLength(o,!1);else{var h=this._geodesicDistance(this._inputPoints[this._inputPoints.length-2],i),l=this._outputResult(h,this.getUnit());this.result=this.result+h,this._showDistance(this.result);var _=this._outputResult(this.result,this.getUnit());this.onMeasure(this.activeTool,i,_,this.getUnit(),l)}}else a.setSymbol(this._pointSymbol)},_measureDistanceMouseMoveHandler:function(t){if(this._inputPoints.length>0){var e,i=new v(this._map.spatialReference);this._map.snappingManager&&(e=this._map.snappingManager._snappingPoint);var s=e||t.mapPoint;i.addPath([this._currentStartPt,s]);var n=this._densifyGeometry(i);if(this._tempGraphic.setGeometry(n),"PCS"!==this._map.cs){var a=this._geodesicDistance(this._currentStartPt,s),o=this._outputResult(a,this.getUnit()),r=a+this.result;this._showDistance(r);var h=this._outputResult(r,this.getUnit());this.onMeasure(this.activeTool,s,h,this.getUnit(),o)}}},_measureDistanceDblClickHandler:function(t){var e,i;n.disconnect(this._mouseMoveMapHandler),this._mouseMoveMapHandler=null,"touch"===this._map.navigationManager.eventModel&&r("ios")&&this._measureDistanceMouseClickHandler(t),e=new v(this._map.spatialReference),e.addPath(this._inputPoints),this._currentGeometry=e,i=this._densifyGeometry(e),this._measureGraphic.geometry=i,"PCS"===this._map.cs?this._geometryServiceLength(e,!0):(this._inputPoints=[],this.onMeasureEnd(this.activeTool,e,this._outputResult(this.result,this.getUnit()),this.getUnit()))},_geometryServiceLength:function(t,e){var s=new N;s.polylines=[t],s.lengthUnit=9001,s.calculationType="geodesic",this._geometryService.lengths(s,i.hitch(this,function(i){var s=i.lengths[0];if(e)this.result=s,this._showDistance(this.result),this._inputPoints=[],this.onMeasureEnd(this.activeTool,t,this._outputResult(this.result,this.getUnit()),this.getUnit());else{var n=this._outputResult(s,this.getUnit());this.result=this.result+s,this._showDistance(this.result),this.onMeasure(this.activeTool,t,this._outputResult(this.result,this.getUnit()),this.getUnit(),n)}}))},_locationClickHandler:function(t){var e,i;this._map.snappingManager&&(e=this._map.snappingManager._snappingPoint),i=e||t.mapPoint,this._locationButtonToggle(),this._locationGraphic=new b,this._locationGraphic.setGeometry(i),this._locationGraphic.setSymbol(this._pointSymbol),this._map.graphics.add(this._locationGraphic),this._measureGraphics.push(this._locationGraphic),this._calculateLocation(i,!0)},_locationMoveHandler:function(t){var e,i;this._map.snappingManager&&(e=this._map.snappingManager._snappingPoint),i=e||t.mapPoint,this._calculateLocation(i,!1)},_outputResult:function(t,e){var i=t/this._unitDictionary[e];return 0===i?this.resultValue.setContent("&nbsp"):i>1e6?this.resultValue.setContent(T.format(i.toPrecision(9),{pattern:this.numberPattern})+" "+e):i<10?this.resultValue.setContent(T.format(i.toFixed(2),{pattern:this.numberPattern+"0"})+" "+e):this.resultValue.setContent(T.format(i.toFixed(2),{pattern:this.numberPattern})+" "+e),i},_createDistanceUnitList:function(){var t,e=new p({style:"display: none;"})
;s.forEach(this._distanceUnitStrings,i.hitch(this,function(t,s){var n=new m({label:t,onClick:i.hitch(this,function(){this._switchUnit(this._distanceUnitStringsLong[s])})});n.set("class","unitDropDown"),e.addChild(n)})),u.byNode(this._unitDropDown.domNode).set("dropDown",e),this.currentDistanceUnit?(t=this._unitStrings[this.currentDistanceUnit],u.byNode(this._unitDropDown.domNode).set("label",t)):(t=this._unitStrings[this._defaultDistanceUnit],u.byNode(this._unitDropDown.domNode).set("label",t),this.currentDistanceUnit=this._defaultDistanceUnit)},_createAreaUnitList:function(){var t,e=new p({style:"display: none;"});s.forEach(this._areaUnitStrings,i.hitch(this,function(t,s){var n=new m({label:t,onClick:i.hitch(this,function(){this._switchUnit(this._areaUnitStringsLong[s])})});n.set("class","unitDropDown"),e.addChild(n)})),u.byNode(this._unitDropDown.domNode).set("dropDown",e),this.currentAreaUnit?(t=this._unitStrings[this.currentAreaUnit],u.byNode(this._unitDropDown.domNode).set("label",t)):(t=this._unitStrings[this._defaultAreaUnit],u.byNode(this._unitDropDown.domNode).set("label",t),this.currentAreaUnit=this._defaultAreaUnit)},_createLocationUnitList:function(){var t,e=this._locationUnitStrings,n=new p({style:"display: none;"});null!==this._geometryService&&!1!==this.advancedLocationUnits||(e=e.slice(0,2)),s.forEach(e,i.hitch(this,function(t,e){var s=new m({label:t,onClick:i.hitch(this,function(){this._switchLocationUnit(this._locationUnitStringsLong[e])})});s.set("class","unitDropDown"),n.addChild(s)})),u.byNode(this._unitDropDown.domNode).set("dropDown",n),this.currentLocationUnit||(this.currentLocationUnit=this._defaultLocationUnit),t=this._unitStrings[this.currentLocationUnit],u.byNode(this._unitDropDown.domNode).set("label",t),"esriDegreeMinuteSeconds"!==this.currentLocationUnit&&"esriDecimalDegrees"!==this.currentLocationUnit||this._toggleLocationResultsTable(!0,!1)},_drawPointGraphics:function(t){var e,s,n,a,o=this._pointSymbol,c=this._defaultCustomPointSymbolWidth,u=this._defaultCustomPointSymbolHeight,p=l.create("div",{class:"esriLocationResultSymbol"},t);s=_.createSurface(p,c,u),r("ie")<9&&(e=s.getEventSource(),h.set(e,"position","relative"),h.set(e.parentNode,"position","relative")),n=o.getShapeDescriptors();try{a=s.createShape(n.defaultShape).setFill(n.fill).setStroke(n.stroke)}catch(t){return s.clear(),void s.destroy()}var m=a.getBoundingBox(),d=m.width,g=m.height,S=-(m.x+d/2),y=-(m.y+g/2),f=s.getDimensions(),M={dx:S+f.width/2,dy:y+f.height/2};if(d>c||g>u){var L=d/c>g/u,v=L?d:g,G=L?c:u,b=(G-5)/v;i.mixin(M,{xx:b,yy:b})}a.applyTransform(M)}});return r("extend-esri")&&i.setObject("dijit.Measurement",W,w),W});