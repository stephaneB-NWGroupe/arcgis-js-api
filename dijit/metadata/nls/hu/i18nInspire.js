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

define({documentTypes:{data:{caption:"INSPIRE (adat)",description:""},service:{caption:"INSPIRE (szolgáltatás)",description:""}},dataThemeKeywords:{caption:"Inspire Data téma"},inspireServiceType:{discovery:"Szolgáltatás felfedezése",view:"Szolgáltatás megtekintése",download:"Szolgáltatás letöltése",transformation:"Szolgáltatás átalakítása",invoke:"Szolgáltatás lehívása/lekérdezése",other:"Egyéb szolgáltatás"},keywordSections:{dataTheme:"Inspire Data téma",serviceCategory:"ISO 19119 szolgáltatáskategória",gemetConcept:"GEMET koncepció",otherKeywords:"Egyéb kulcsszavak"},LanguageCode:{bul:"bolgár",cze:"cseh",dan:"dán",dut:"holland",eng:"angol",est:"észt",fin:"finn",fre:"francia",ger:"német",gre:"görög",hun:"magyar",gle:"gael (ír)",ita:"olasz",lav:"lett",lit:"litván",mlt:"máltai",pol:"lengyel",por:"portugál",rum:"román",slo:"szlovák",slv:"szlovén",spa:"spanyol",swe:"svéd",chi:"kínai",kor:"koreai",nor:"norvég",rus:"orosz",tur:"török"},otherConstraints:{noLimitations:"Nincs korlátozás",confidentialityOfProceedings:"A hatósági eljárások titkossága...",internationalRelations:"Nemzetközi kapcsolatok, közbiztonság vagy nemzetbiztonság",courseOfJustice:"Az igazságszolgáltatás folyamata, a tisztességes tárgyaláshoz való jog...",confidentialityOfCommercial:"A kereskedelmi vagy ipari információk titkossága...",intellectualProperty:"Szellemi tulajdonjogok",confidentialityOfPersonalData:"A személyes adatok és/vagy fájlok titkossága...",interestsOrProtection:"Az információt szolgáltató személyek érdekei vagy védelme...",protectionOfEnvironment:"Annak a környezetnek a védelme, amelyre ezek az információk vonatkoznak...",freeText:"Szabad szöveg"},serviceType:{humanInteractionService:"100 térbeli-humán interakciós szolgáltatások",humanCatalogueViewer:"101 Katalógusmegjelenítő",humanGeographicViewer:"102 Földrajzi megjelenítő",humanGeographicSpreadsheetViewer:"103 Földrajzi táblázatmegjelenítő",humanServiceEditor:"104 Szolgáltatásszerkesztő",humanChainDefinitionEditor:"105 Láncdefiníció-szerkesztő",humanWorkflowEnactmentManager:"106 Munkafolyamat-kezelő",humanGeographicFeatureEditor:"107 Földrajzi vektoros elemek szerkesztője",humanGeographicSymbolEditor:"108 Földrajzi szimbólumszerkesztő ",humanFeatureGeneralizationEditor:"109 Vektoroselem-általánosító szerkesztő",humanGeographicDataStructureViewer:"110 Földrajzi adatstruktúra-megtekintő",infoManagementService:"200 Földrajzi modell- és információkezelő szolgáltatás",infoFeatureAccessService:"201 Vektor-hozzáférési szolgáltatás",infoMapAccessService:"202 Térkép-hozzáférési szolgáltatás",infoCoverageAccessService:"203 Coverage-hozzáférési szolgáltatás",infoSensorDescriptionService:"204 Szenzorleíró szolgáltatás",infoProductAccessService:"205 Termék-hozzáférési szolgáltatás",infoFeatureTypeService:"206 Vektoroselemtípus-szolgáltatás",infoCatalogueService:"207 Katalógusszolgáltatás",infoRegistryService:"208 Nyilvántartási szolgáltatás",infoGazetteerService:"209 Helységnévtár-szolgáltatás",infoOrderHandlingService:"210 Rendeléskezelési szolgáltatás",infoStandingOrderService:"211 Állandó megrendelési szolgáltatás",taskManagementService:"300 Földrajzi munkafolyamat- és feladatkezelő szolgáltatások",chainDefinitionService:"301 Láncdefiníció-szolgáltatás",workflowEnactmentService:"302 Munkafolyamat-szolgáltatás",subscriptionService:"303 Előfizetési szolgáltatás",spatialProcessingService:"400 Földrajzi feldolgozási szolgáltatások – térbeli",spatialCoordinateConversionService:"401 Koordináta-konverziós szolgáltatás",spatialCoordinateTransformationService:"402 Koordináta-átalakítási szolgáltatás",spatialCoverageVectorConversionService:"403 Lefedettség- és vektorkonverziós szolgáltatás",spatialImageCoordinateConversionService:"404 Képkoordináta-konverziós szolgáltatás",spatialRectificationService:"Képtranszformációs szolgáltatás",spatialOrthorectificationService:"Ortoképtranszformációs szolgáltatás",spatialSensorGeometryModelAdjustmentService:"407 Modellbeállítási szolgáltatás szenzorgeometriához",spatialImageGeometryModelConversionService:"408 Modellkonverziós szolgáltatás képgeometriához",spatialSubsettingService:"409 Részhalmazképzési szolgáltatás",spatialSamplingService:"410 Mintavételi szolgáltatás",spatialTilingChangeService:"411 Csempemódosítási szolgáltatás",spatialDimensionMeasurementService:"412 Mérési szolgáltatás",spatialFeatureManipulationService:"413 Vektoroselem-kezelési szolgáltatások",spatialFeatureMatchingService:"414 Vektoroselem-egyeztetési szolgáltatás",spatialFeatureGeneralizationService:"415 Vektoroselem-általánosítási szolgáltatás",spatialRouteDeterminationService:"416 Útvonal-meghatározási szolgáltatás",spatialPositioningService:"417 Helymeghatározási szolgáltatás",spatialProximityAnalysisService:"418 Közelségelemzési szolgáltatás",thematicProcessingService:"500 Földrajzi feldolgozási szolgáltatások – tematikus",thematicGoparameterCalculationService:"501 Geoparaméter-számítási szolgáltatás",thematicClassificationService:"502 Tematikus osztályozási szolgáltatás",thematicFeatureGeneralizationService:"503 Vektoroselem-általánosítási szolgáltatás",thematicSubsettingService:"504 Részhalmazképzési szolgáltatás",thematicSpatialCountingService:"505 Térbeli számlálási szolgáltatás",thematicChangeDetectionService:"506 Változásészlelési szolgáltatás",thematicGeographicInformationExtractionService:"507 Helyspecifikus információkinyerési szolgáltatások",thematicImageProcessingService:"508 Képfeldolgozó szolgáltatás",thematicReducedResolutionGenerationService:"509 Csökkentett felbontás elérését célzó szolgáltatás",thematicImageManipulationService:"510 Képszerkesztési szolgáltatások",thematicImageUnderstandingService:"511 Képértelmezési szolgáltatások",thematicImageSynthesisService:"512 Képszintézis-szolgáltatások",thematicMultibandImageManipulationService:"513 Többsávos képmanipuláció",thematicObjectDetectionService:"514 Objektumészlelési szolgáltatás",thematicGeoparsingService:"515 Geoelemző szolgáltatás",thematicGeocodingService:"516 Geokódoló szolgáltatás",temporalProcessingService:"600 Helyspecifikus feldolgozási szolgáltatások – időbeli",temporalReferenceSystemTransformationService:"601 Időbeli referenciarendszer-átalakítási szolgáltatás",temporalSubsettingService:"602 Részhalmazképzési szolgáltatás",temporalSamplingService:"603 Mintavételi szolgáltatás",temporalProximityAnalysisService:"604 Időbeli közelségelemzési szolgáltatás",metadataProcessingService:"700 Helyspecifikusi feldolgozási szolgáltatások – metaadatok",metadataStatisticalCalculationService:"701 Statisztikai számítási szolgáltatás",metadataGeographicAnnotationService:"702 Helyspecifikus annotációs szolgáltatások",comService:"800 Helyspecifikus kommunikációs szolgáltatások",comEncodingService:"801 Kódoló szolgáltatás",comTransferService:"802 Átviteli szolgáltatás",comGeographicCompressionService:"803 Helyspecifikus tömörítési szolgáltatás",comGeographicFormatConversionService:"804 Helyspecifikus formátumkonverziós szolgáltatás",comMessagingService:"805 Üzenetküldési szolgáltatás",comRemoteFileAndExecutableManagement:"806 Távoli fájl- és programkezelés"},useLimitation:{noCondition:"Nincsenek feltételek",unknownCondition:"Ismeretlen feltételek",freeText:"Szabad szöveg"}});