/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","./definitions"],(function(e,i){"use strict";const t={title:"PointCloud Layer config on layer item",type:"object",properties:{layers:{type:"array",items:{properties:{disablePopup:{type:"boolean",description:"disablePopups allows a client to ignore popups defined by the service item."},id:{type:"integer",description:"ID of the service layer."},layerDefinition:{type:"object",description:"A layerDefinition object defining the attribute schema and drawing information for the layer.",allOf:[{$ref:"#/definitions/layerDefinition_schema.json"},{properties:{drawingInfo:{allOf:[{$ref:"#/definitions/drawingInfo_schema.json"},{properties:{renderer:{},transparency:{}},additionalProperties:!1}]},elevationInfo:{},filters:{},minScale:{},maxScale:{}},additionalProperties:!1}]},listMode:{type:"string",description:"To show or hide the layer in the layer list",enum:["hide","show"]},popupInfo:{type:"object",description:"A popupInfo object defining the content of pop-up windows when you click a point.",$ref:"#/definitions/popupInfo_schema.json"},showLegend:{type:"boolean",description:"Boolean value indicating whether to display the layer in the legend. Default value is `true`.",default:!0},visibility:{type:"boolean",description:"Boolean property determining whether the layer is initially visible",default:!0}},additionalProperties:!1}}},additionalProperties:!1,$schema:"http://json-schema.org/draft-07/schema",definitions:i.schema_definitions};e.json=t,Object.defineProperty(e,"__esModule",{value:!0})}));