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

define({documentTypes:{data:{caption:"INSPIRE(데이터)",description:""},service:{caption:"INSPIRE(서비스)",description:""}},dataThemeKeywords:{caption:"Inspire 데이터 테마"},inspireServiceType:{discovery:"검색 서비스",view:"조회 서비스",download:"다운로드 서비스",transformation:"변환 서비스",invoke:"호출 서비스",other:"기타 서비스"},keywordSections:{dataTheme:"Inspire 데이터 테마",serviceCategory:"ISO 19119 서비스 범주",gemetConcept:"GEMET 개념",otherKeywords:"다른 키워드"},LanguageCode:{bul:"불가리아어",cze:"체코어",dan:"덴마크어",dut:"네덜란드어",eng:"영어",est:"에스토니아어",fin:"핀란드어",fre:"프랑스어",ger:"독일어",gre:"그리스어",hun:"헝가리어",gle:"게일어(아일랜드)",ita:"이탈리아어",lav:"라트비아어",lit:"리투아니아어",mlt:"몰타어",pol:"폴란드어",por:"포르투갈어",rum:"루마니아어",slo:"슬로바키아어",slv:"슬로베니아어",spa:"스페인어",swe:"스웨덴어",chi:"중국어",kor:"한국어",nor:"노르웨이어",rus:"러시아어",tur:"터키어"},otherConstraints:{noLimitations:"제한 사항 없음",confidentialityOfProceedings:"공공 기관의 절차 기밀성...",internationalRelations:"국제 관계, 사회 안전 또는 국방",courseOfJustice:"법 집행, 누구나 공정한 재판을 받을 권리...",confidentialityOfCommercial:"상업 또는 산업 정보의 기밀성...",intellectualProperty:"지적 재산권",confidentialityOfPersonalData:"개인 데이터 및/또는 파일의 기밀성...",interestsOrProtection:"정보 제공자의 권익 또는 보호...",protectionOfEnvironment:"이러한 정보와 관련된 환경의 보호...",freeText:"자유 텍스트"},serviceType:{humanInteractionService:"100 지리 인간 상호 작용 서비스",humanCatalogueViewer:"101 카탈로그 뷰어",humanGeographicViewer:"102 지리 뷰어",humanGeographicSpreadsheetViewer:"103 지리 스프레드시트 뷰어",humanServiceEditor:"104 서비스 편집기",humanChainDefinitionEditor:"105 체인 정의 편집기",humanWorkflowEnactmentManager:"106 워크플로 수행 관리자",humanGeographicFeatureEditor:"107 지리 피처 편집기",humanGeographicSymbolEditor:"108 지리 심볼 편집기 ",humanFeatureGeneralizationEditor:"109 피처 일반화 편집기",humanGeographicDataStructureViewer:"110 지리 데이터 구조 뷰어",infoManagementService:"200 지리 모델/정보 관리 서비스",infoFeatureAccessService:"201 피처 액세스 서비스",infoMapAccessService:"202 맵 액세스 서비스",infoCoverageAccessService:"203 커버리지 액세스 서비스",infoSensorDescriptionService:"204 센서 설명 서비스",infoProductAccessService:"205 제품 액세스 서비스",infoFeatureTypeService:"206 피처 유형 서비스",infoCatalogueService:"207 카탈로그 서비스",infoRegistryService:"208 등록 서비스",infoGazetteerService:"209 지명 사전 서비스",infoOrderHandlingService:"210 주문 처리 서비스",infoStandingOrderService:"211 정기 구독 서비스",taskManagementService:"300 지리 워크플로/작업 관리 서비스",chainDefinitionService:"301 체인 정의 서비스",workflowEnactmentService:"302 워크플로 수행 서비스",subscriptionService:"303 구독 서비스",spatialProcessingService:"400 지리 처리 서비스 - 공간",spatialCoordinateConversionService:"401 좌표 변환 서비스",spatialCoordinateTransformationService:"402 좌표 변형 서비스",spatialCoverageVectorConversionService:"403 커버리지/벡터 변환 서비스",spatialImageCoordinateConversionService:"404 이미지 좌표 변환 서비스",spatialRectificationService:"405 보정 서비스",spatialOrthorectificationService:"406 정사보정 서비스",spatialSensorGeometryModelAdjustmentService:"407 센서 지오메트리 모델 조정 서비스",spatialImageGeometryModelConversionService:"408 이미지 지오메트리 모델 변환 서비스",spatialSubsettingService:"409 하위 설정 서비스",spatialSamplingService:"410 샘플링 서비스",spatialTilingChangeService:"411 타일링 변경 서비스",spatialDimensionMeasurementService:"412 디멘전 측정 서비스",spatialFeatureManipulationService:"413 피처 조작 서비스",spatialFeatureMatchingService:"414 피처 일치 서비스",spatialFeatureGeneralizationService:"415 피처 일반화 서비스",spatialRouteDeterminationService:"416 경로 결정 서비스",spatialPositioningService:"417 위치 확인 서비스",spatialProximityAnalysisService:"418 근접성 분석 서비스",thematicProcessingService:"500 지리 처리 서비스 - 주제",thematicGoparameterCalculationService:"501 지리 매개변수 계산 서비스",thematicClassificationService:"502 주제 분류 서비스",thematicFeatureGeneralizationService:"503 피처 일반화 서비스",thematicSubsettingService:"504 하위 설정 서비스",thematicSpatialCountingService:"505 공간 계산 서비스",thematicChangeDetectionService:"506 변경 감지 서비스",thematicGeographicInformationExtractionService:"507 지리 정보 추출 서비스",thematicImageProcessingService:"508 이미지 처리 서비스",thematicReducedResolutionGenerationService:"509 감소 해상도 생성 서비스",thematicImageManipulationService:"510 이미지 조작 서비스",thematicImageUnderstandingService:"511 이미지 이해 서비스",thematicImageSynthesisService:"512 이미지 합성 서비스",thematicMultibandImageManipulationService:"513 다중 밴드 이미지 조작",thematicObjectDetectionService:"514 객체 감지 서비스",thematicGeoparsingService:"515 지오파싱 서비스",thematicGeocodingService:"516 지오코딩 서비스",temporalProcessingService:"600 지리 처리 서비스 - 시간",temporalReferenceSystemTransformationService:"601 시간 기준 체계 변환 서비스",temporalSubsettingService:"602 하위 설정 서비스",temporalSamplingService:"603 샘플링 서비스",temporalProximityAnalysisService:"604 시간 근접성 분석 서비스",metadataProcessingService:"700 지리 처리 서비스 - 메타데이터",metadataStatisticalCalculationService:"701 통계 계산 서비스",metadataGeographicAnnotationService:"702 지리 주석 서비스",comService:"800 지리 통신 서비스",comEncodingService:"801 인코딩 서비스",comTransferService:"802 전송 서비스",comGeographicCompressionService:"803 지리 압축 서비스",comGeographicFormatConversionService:"804 지리 형식 변환 서비스",comMessagingService:"805 메시징 서비스",comRemoteFileAndExecutableManagement:"806 원격 파일 및 실행 파일 관리"},useLimitation:{noCondition:"적용되는 조건 없음",unknownCondition:"조건을 알 수 없음",freeText:"자유 텍스트"}});