/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../core/has","../../../../../core/maybe","../../../../../core/Logger","../../../../../core/accessorSupport/ensureType","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/decorators/subclass","../../../../../core/urlUtils","../../../../../core/uuid","../../../../../portal/support/resourceExtension","../../../../../core/promiseUtils","../../../../../core/watchUtils","../../../../../layers/graphics/featureConversionUtils","../../../../../layers/support/FieldsIndex","../../../../../core/HandleOwner","../support/FeatureSetReaderJSON","../../../../support/QueueProcessor","../support/AttributeStore","../support/ComputedAttributeStorage","../FeatureStore2D","../../../../../layers/graphics/data/QueryEngine","../support/UpdateToken","../Source2D","../support/ClusterStore"],(function(e,t,r,i,s,a,o,n,u,h,c,d,l,p,g,f,y,_,S,m,v,b,w,I,T){"use strict";function C(e){if(!d.isAbortError(e)&&!function(e){return"worker:port-closed"===e.name}(e))throw e}let E=function(t){function s(){var e;return(e=t.apply(this,arguments)||this)._storage=new m.ComputedAttributeStorage,e._markedIdsBufId=e._storage.createBitset(),e._lastCleanup=performance.now(),e._cleanupNeeded=!1,e._invalidated=!1,e._tileToResolver=new Map,e.tileStore=null,e.config=null,e.processor=null,e.remoteClient=null,e.service=null,e._editing=!1,e}e._inheritsLoose(s,t);var a=s.prototype;return a.initialize=function(){this._initAttributeStore(),this._initStores(),this._initQueryEngine(),this._initSource(),this._updateQueue=new _.QueueProcessor({concurrency:4,process:(e,t)=>this._onDisplayTilePatch(e,{signal:t})}),this.handles.add([this.tileStore.on("update",this.onTileUpdate.bind(this)),this.watch("updating",(e=>!e&&this.onIdle()))])},a.startup=async function(){this._initAttributeStore()},a._initSource=function(){this._source=new I.Source2D(this.service,this.spatialReference,this.tileStore.tileScheme),this._source.onDisplayTilePatch=(e,t)=>(this._invalidated=!0,this._patchTile(e,t)),this._source.canAcceptPatch=()=>this._updateQueue.length<50;const e=this._source.sourceEvents;if("geoevent"===e.type){const t=e.events;this.handles.add([t.on("connectionStatus",(e=>this.remoteClient.invoke("setProperty",{propertyName:"connectionStatus",value:e}).catch(C))),t.on("errorString",(e=>this.remoteClient.invoke("setProperty",{propertyName:"errorString",value:e}).catch(C))),t.on("feature",(e=>this.remoteClient.invoke("emitEvent",{name:"data-received",event:{attributes:e.attributes,centroid:e.centroid,geometry:e.geometry}}).catch(C))),t.on("updateRate",(e=>this.remoteClient.invoke("emitEvent",{name:"update-rate",event:{...e}}).catch(C)))])}},a._initAttributeStore=function(){this.attributeStore?this.attributeStore.invalidateResources():this.attributeStore=new S.default({type:"remote",initialize:(e,t)=>d.ignoreAbortErrors(this.remoteClient.invoke("tileRenderer.featuresView.attributeView.initialize",e,{signal:t}).catch(C)),update:(e,t)=>d.ignoreAbortErrors(this.remoteClient.invoke("tileRenderer.featuresView.attributeView.requestUpdate",e,{signal:t}).catch(C)),render:e=>d.ignoreAbortErrors(this.remoteClient.invoke("tileRenderer.featuresView.requestRender",void 0,{signal:e}).catch(C))},this.config)},a._initStores=function(){const e={geometryInfo:{geometryType:this.service.geometryType,hasM:!1,hasZ:!1},spatialReference:this.spatialReference,fieldsIndex:this.fieldsIndex,fields:this.service.fields};this.featureStore=new v.FeatureStore2D(e,this._storage),this.aggregateStore=new T.ClusterStore(e,this.spatialReference,this._storage),this.handles.add(this.aggregateStore.events.on("valueRangesChanged",(e=>{this.remoteClient.invoke("emitEvent",{name:"valueRangesChanged",event:{valueRanges:e.valueRanges}}).catch(C)})))},a._initQueryEngine=function(){var e;const t=this;null==(e=this.queryEngine)||e.destroy(),this.queryEngine=new b.default({definitionExpression:this.config.definitionExpression,fields:this.service.fields,geometryType:this.service.geometryType,objectIdField:this.service.objectIdField,hasM:!1,hasZ:!1,spatialReference:this.spatialReference.toJSON(),cacheSpatialQueries:!0,featureStore:this.featureStore,aggregateAdapter:{getFeatureObjectIds:e=>t.aggregateStore.getFeatureDisplayIdsForAggregate(e).map((e=>t.getObjectId(e)))},timeInfo:this.service.timeInfo})},a.destroy=function(){this._updateQueue.destroy(),this._source.destroy(),this.queryEngine.destroy(),this.attributeStore&&this.attributeStore.destroy()},a.isUpdating=function(){return this._source.updating||!!this._updateQueue.length},a.enableEvent=function(e){this._source.enableEvent(e.name,e.value)},a.invalidate=async function(e){if(!e.any())return;r("esri-2d-update-debug")&&e.describe();const t=this.tileStore.tiles.map((({key:e})=>{const t=d.createResolver();return this._tileToResolver.set(e.id,t),t.promise})),i=this._updateQueue.takeAll();this._updateQueue.resume(),this.hasAggregates&&e.mesh&&e.targets.aggregate&&!e.queryFilter?this._repushAggregateMeshTiles(e):(this._source.resubscribe(e),d.all(t).then((()=>{this._source.resume()})),e.mesh&&await l.whenFalseOnce(this,"updating")),this.notifyChange("updating"),await d.all(t),this._updateQueue.pause();for(const e of i)this._patchTile(e);e.source&&(this._cleanupNeeded=!0)},a.resume=function(){return this._updateQueue.resume(),this._source.resume()},a.update=async function(e,t,r=!1){this._editing&&await l.whenFalseOnce(this,"updating"),r&&(this._source.pause(),this._updateQueue.pause()),this._set("config",t),this._schema=t.schema,this._initQueryEngine(),await d.all([this._source.update(e,t.schema.source),this.featureStore.updateSchema(e,t.schema.targets.feature),this.attributeStore.update(e,t),this.attributeStore.updateFilters(e,this)]),await this.aggregateStore.updateSchema(e,t.schema.targets.aggregate)},a.refresh=async function(){this._source.resubscribe(w.UpdateToken.all(),!0),this._cleanupNeeded=!0,this.notifyChange("updating"),await l.whenFalseOnce(this,"updating",!0)},a.onTileUpdate=function(e){this.aggregateStore.onTileUpdate(e);for(const t of e.added)this._source.subscribe(t),this._level=t.level;for(const t of e.removed)this._source.unsubscribe(t),this._cleanupNeeded=!0,this._tileToResolver.has(t.id)&&(this._tileToResolver.get(t.id).resolve(),this._tileToResolver.delete(t.id));this.notifyChange("updating")},a.onIdle=function(){this.hasAggregates&&this._invalidated&&(this._repushAggregateMeshTiles(),this._invalidated=!1),this._markAndSweep()},a.onEdits=async function(e){if(this._editing)return await l.whenFalseOnce(this,"updating"),await d.after(16),this.onEdits(e);this._editing=!0;try{await this._source.onEdits(e),await l.whenFalseOnce(this,"updating")}catch(e){}this._editing=!1},a.queryExtent=function(e){return this.queryEngine.executeQueryForExtent(e)},a.queryFeatures=function(e){return this.queryEngine.executeQuery(e)},a.queryFeatureCount=function(e){return this.queryEngine.executeQueryForCount(e)},a.queryLatestObservations=function(e){return this.queryEngine.executeQueryForLatestObservations(e)},a.queryObjectIds=function(e){return this.queryEngine.executeQueryForIds(e)},a.queryStatistics=async function(){return{...this.featureStore.storeStatistics,displayedFeatureCount:0,displayedVertexCount:0,displayPreProcessTime:0}},a.getObjectId=function(e){return this.featureStore.lookupObjectId(e,this._storage)},a.getDisplayId=function(e){if(this._schema.targets.aggregate){const t=this.aggregateStore.getDisplayId(e);if(i.isNone(t)){const t=this.featureStore.lookupDisplayId(e);return this.aggregateStore.getDisplayIdForReferenceId(t)}return t}return this.featureStore.lookupDisplayId(e)},a.getFeature=function(e){const t=this.featureStore.lookupFeatureByDisplayId(e,this._storage);if(i.isNone(t))return null;const r=t.readHydratedGeometry(),s=p.convertToGeometry(r,t.geometryType,t.hasZ,t.hasM);return{attributes:t.readAttributes(),geometry:s}},a.getAggregate=function(e){return this.aggregateStore.getAggregate(e)},a.setHighlight=async function(e){const t=e.map((e=>this.getDisplayId(e)));return this.attributeStore.setHighlight(e,t)},a._repushAggregateMeshTiles=function(e){for(const t of this.tileStore.tiles)this._patchTile({type:"replace",id:t.key.id,addOrUpdate:y.FeatureSetReaderJSON.fromOptimizedFeatures([],this.service.geometryType),remove:[],end:!0,noData:!1,update:e||w.UpdateToken.create({mesh:!0,targets:{aggregate:!0}})})},a._maybeForceCleanup=function(){performance.now()-this._lastCleanup>5e3&&this._markAndSweep()},a._patchTile=function(e,t){const r=this._updateQueue.push(e,t).then((()=>{this.notifyChange("updating")})).catch((e=>{this.notifyChange("updating")}));return this.notifyChange("updating"),r},a._onDisplayTilePatch=async function(e,t){d.throwIfAborted(t);const r=this.tileStore.get(e.id);if(!r)return;const s=e.update;e.remove.length&&(this._cleanupNeeded=!0);const a=[];for(const t of e.remove)a.push(this.featureStore.lookupDisplayId(t));e.remove=a;try{if(i.isNone(e.addOrUpdate))return this.processor.onTileData(r,{...e,addOrUpdate:null},t).catch((e=>{d.throwIfNotAbortError(e)})),void this._finishedPatch(e);e.addOrUpdate._storage=this._storage;const a=e.addOrUpdate.hasFilter(),o=e.addOrUpdate.instance;e.addOrUpdate._arcadeSpatialReference=this.spatialReference,(!this.featureStore.hasInstance(o)||s.targets.feature&&!a)&&this.featureStore.onTileData(r,e,this._storage),!s.storage.data&&!s.storage.filters||a||(this.attributeStore.onTileData(r,e),this._source.isStream?await this.attributeStore.sendUpdates():this.attributeStore.sendUpdates()),this.hasAggregates&&s.targets.aggregate&&(this.aggregateStore.onTileData(r,e,this._storage,this.attributeStore,s.mesh),s.mesh&&(this.attributeStore.onTileData(r,e),await this.attributeStore.sendUpdates())),s.mesh&&await this.processor.onTileData(r,e,t),this._maybeForceCleanup(),this._finishedPatch(e)}catch(e){d.throwIfNotAbortError(e)}},a._finishedPatch=function(e){if((e.noData||e.end)&&this._tileToResolver.has(e.id)){this._tileToResolver.get(e.id).resolve(),this._tileToResolver.delete(e.id)}},a._markAndSweep=function(){if(this._lastCleanup=performance.now(),!this._cleanupNeeded&&!this._source.isStream)return;this._cleanupNeeded=!1;const e=this._storage.getBitset(this._markedIdsBufId),t=new Set;e.clear();const r=r=>{const i=this.featureStore.lookupDisplayId(r),s=(4294901760&this._storage.getInstanceId(i))>>>16;i&&(t.add(s),e.set(i))};for(const e of this.tileStore.tiles)this._source.forEachRequest(e.key.id,(e=>{if(i.isNone(e.features))return;const t=e.features.getCursor();for(;t.next();){const e=t.getObjectId();r(e)}}));this._source.forEachPendingEdit((e=>r(e))),this._updateQueue.forEach((e=>{for(const t of e.remove)r(t)})),this.config.schema.targets.aggregate&&(this.aggregateStore.sweepFeatures(e,this.featureStore),this.aggregateStore.sweepClusters(this._storage,this.attributeStore,this._level)),this.featureStore.sweepFeatures(e,this._storage,this.attributeStore),this.featureStore.sweepFeatureSets(t)},e._createClass(s,[{key:"fieldsIndex",get:function(){return new g(this.service.fields)}},{key:"hasAggregates",get:function(){return!!this.config.schema.targets.aggregate}},{key:"spatialReference",get:function(){return this.tileStore.tileScheme.spatialReference}},{key:"updating",get:function(){return this.isUpdating()}}]),s}(f.HandleOwner);return t.__decorate([o.property({constructOnly:!0})],E.prototype,"tileStore",void 0),t.__decorate([o.property()],E.prototype,"config",void 0),t.__decorate([o.property({readOnly:!0,dependsOn:["service"]})],E.prototype,"fieldsIndex",null),t.__decorate([o.property()],E.prototype,"processor",void 0),t.__decorate([o.property({constructOnly:!0})],E.prototype,"remoteClient",void 0),t.__decorate([o.property({constructOnly:!0})],E.prototype,"service",void 0),t.__decorate([o.property({dependsOn:["tileStore"]})],E.prototype,"spatialReference",null),t.__decorate([o.property()],E.prototype,"updating",null),E=t.__decorate([n.subclass("esri.views.2d.layers.features.controllers.FeatureController2D")],E),E}));