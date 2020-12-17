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

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"없음",notComplete:"완료되지 않음",other:"기타",present:"현재",unknown:"알 수 없음",unpublishedMaterial:"미발행 자료"},hints:{integerGreaterThanOne:"(1보다 큰 정수 입력)",integer0To100:"(0에서 100 사이의 정수 입력)"},citeinfo:{caption:"인용 정보",origin:"출처",pubdate:"발행일",pubtime:"발행 시간",title:"제목",edition:"에디션",geoform:{caption:"공간 정보 데이터 표현 형식",atlas:"아틀라스",audio:"오디오",diagram:"다이어그램",sDocument:"문서",globe:"글로브",map:"맵",model:"모델",multiMediaPresentation:"멀티미디어 프레젠테이션",profile:"프로필",rasterDigitalData:"래스터 디지털 데이터",remoteSensingImage:"원격탐사 이미지",section:"섹션",spreadsheet:"스프레드시트",tabularDigitalData:"테이블 디지털 데이터",vectorDigitalData:"벡터 디지털 데이터",video:"비디오",view:"보기"},serinfo:{caption:"계열 정보",sername:"계열 이름",issue:"문제 ID"},pubinfo:{caption:"발행 정보",pubplace:"발행 장소",publish:"발행자"},othercit:"기타 인용 세부정보",onlink:"온라인 연결(URL)"},cntinfo:{caption:"연락처 정보",section:{primary:"기본",phoneAndEmail:"전화 및 이메일",hoursAndInstructions:"시간 및 지침"},cntorgp:{caption:"기관별",cntorg:"기관",cntper:"사람"},cntperp:{caption:"사람별",cntper:"사람",cntorg:"기관"},cntpos:"위치",cntaddr:{caption:"주소",addrtype:{caption:"주소 유형",mailing:"우편",physical:"실제",mailingAndPhysical:"우편 및 실제"},address:"주소",city:"시",state:"주",postal:"우편 번호",country:"국가"},cntvoice:"음성",cnttdd:"TDD/TTY 전화(청각 장애)",cntfax:"팩스",cntemail:"이메일 주소",hours:"시간",cntinst:"지침"},dataqual:{caption:"데이터 품질 정보",section:{attributeAccuracy:"속성 정확도",logicalConsistency:"논리적 일관성",completeness:"완전성",positionalAccuracy:"위치 정확도",lineage:"계보",cloudCover:"운량"},attracc:{caption:"속성 정확도",attraccr:"속성 정확도 보고서",qattracc:{caption:"정량적 속성 정확도 평가",attraccv:"속성 정확도 값",attracce:"속성 정확도 설명"}},logic:"논리적 일관성 보고서",complete:"완전성 보고서",posacc:"위치 정확도",horizpa:{caption:"수평 위치 정확도",horizpar:"수평 위치 정확도 보고서",qhorizpa:{caption:"정량적 수평 위치 정확도 평가",horizpav:"수평 위치 정확도 값",horizpae:"수평 위치 정확도 설명"}},vertacc:{caption:"수직 위치 정확도",vertaccr:"수직 위치 정확도 보고서",qvertpa:{caption:"정량적 수직 위치 정확도 평가",vertaccv:"수직 위치 정확도 값",vertacce:"수직 위치 정확도 설명"}},lineage:{caption:"계보"},srcinfo:{caption:"원본 정보",srccite:"원본 인용",srcscale:"원본 축척 분모",typesrc:{caption:"원본 미디어 유형",paper:"종이",stableBaseMaterial:"안정 기재",microfiche:"마이크로피시",microfilm:"마이크로필름",audiocassette:"오디오 카세트",chart:"차트",filmstrip:"필름 슬라이드",transparency:"투명도",videocassette:"비디오 카세트",videodisc:"비디오 디스크",videotape:"비디오 테이프",physicalModel:"실제 모형",computerProgram:"컴퓨터 프로그램",disc:"디스크",cartridgeTape:"카트리지 테이프",magneticTape:"자기 테이프",online:"온라인",cdrom:"CD-ROM",electronicBulletinBoard:"전자 게시판",electronicMailSystem:"전자 우편 시스템"},srctime:"콘텐츠의 원본 기간",srccurr:"원본 현재 참조",srccitea:"원본 인용 약어",srccontr:"원본 제공"},procstep:{caption:"프로세스 단계",procdesc:"프로세스 설명",srcused:"인용 약어가 사용된 원본",procdate:"프로세스 날짜",proctime:"프로세스 시간",srcprod:"인용 약어로 제작된 원본",proccont:"프로세스 담당자"},cloud:"운량"},distinfo:{caption:"배포 정보",section:{distributor:"디스트리뷰터",description:"설명",orderProcess:"주문 프로세스",prerequisites:"필수 구성 요소",availability:"사용 가능 여부"},distrib:"디스트리뷰터",resdesc:{caption:"리소스 설명",liveData:"실시간 데이터 및 맵",downloadableData:"다운로드 가능한 데이터",offlineData:"오프라인 데이터",staticMapImages:"정적 맵 이미지",sDocument:"기타 문서",application:"응용프로그램",geographicService:"지리 서비스",clearingHouse:"정보 센터",mapFiles:"맵 파일",geographicActivies:"지리적 활동"},distliab:"배포 책임 설명",custom:"사용자 정의 주문 프로세스",techpreq:"기술 전제 조건",availabl:"사용 가능 여부"},eainfo:{caption:"엔티티 및 속성 정보",overview:"오버뷰 설명",eaover:"엔티티 및 속성 오버뷰",eadetcit:"엔티티 및 속성 세부정보 인용"},idinfo:{caption:"ID 정보",section:{timeAndStatus:"시간 및 상태",constraints:"제약",contact:"연락처",additional:"추가"},citeinfo:"인용",descript:{caption:"설명",sAbstract:"요약",purpose:"목적",supplinf:"추가 정보"},timeperd:{caption:"콘텐츠의 기간",current:{caption:"현재 참조",groundCondition:"지반 조건",publicationDate:"발행일"}},status:{caption:"상태",progress:{caption:"진행률",complete:"완료",inWork:"작업 중",planned:"계획됨"},update:{caption:"유지관리 및 업데이트 빈도",continual:"지속적으로",daily:"매일",weekly:"매주",monthly:"매월",annually:"매년",unknown:"알 수 없음",asNeeded:"필요할 때",irregular:"규칙적이지 않음",nonePlanned:"계획되지 않음"}},spdom:{caption:"범위",bounding:{caption:"경계 좌표",westbc:"서쪽 경계 경도",eastbc:"동쪽 경계 경도",northbc:"북쪽 경계 경도",southbc:"남쪽 경계 경도"}},keywords:{caption:"키워드",theme:"테마",place:"장소",stratum:"계층",temporal:"시간",thesaursus:"관련 동의어 사전",delimited:"키워드",themektIsoTopicCategory:"ISO 주제...",themektIsoTopicDialog:"ISO 주제",placektGnis:"지명 정보 시스템"},accconst:"접근 제약",useconst:"사용 제약 조건",ptcontac:"리소스 연락 담당자",browse:{caption:"그래픽 찾아보기",browsen:"그래픽 URL 찾아보기",browsed:"그래픽 파일 설명 찾아보기",browset:"그래픽 파일 유형 찾아보기"},datacred:"데이터셋 크레딧",secinfo:{caption:"보안 정보",secsys:"보안 분류 시스템",secclass:{caption:"보안 분류",topSecret:"일급 기밀",secret:"비공개",confidential:"기밀",restricted:"제한됨",unclassified:"분류되지 않음",sensitive:"중요"},sechandl:"보안 처리 설명"},sNative:"기본 데이터셋 환경",crossref:"상호 참조"},metadata:{idinfo:"ID",dataqual:"품질",spdoinfo:"공간 데이터 기관",spref:"공간 기준 체계",eainfo:"엔티티 및 속성",distinfo:"분포",metainfo:"메타데이터"},metainfo:{caption:"메타데이터 정보",section:{dates:"메타데이터 날짜",contact:"메타데이터 연락처",standard:"메타데이터 표준",additional:"추가"},metd:"메타데이터 날짜",metrd:"메타데이터 검토 날짜",metfrd:"메타데이터 예정 검토 날짜",metstdn:"메타데이터 표준 이름",metstdv:"메타데이터 표준 버전",metac:"메타데이터 접근 제약",metuc:"메타데이터 사용 제약",metsi:{caption:"메타데이터 보안 정보",metscs:"메타데이터 보안 분류 시스템",metsc:"메타데이터 보안 분류",metshd:"메타데이터 보안 처리 설명"}},spref:{caption:"공간 기준 체계 정보",horizsys:{caption:"수평 좌표계",geograph:{caption:"지리",latres:"위도 해상도",longres:"경도 해상도",geogunit:{caption:"지리 좌표 단위",decimalDegrees:"십진도수",decimalMinutes:"십진 분",decimalSeconds:"십진 초",degreesAndDecimalMinutes:"도분",degreesMinutesAndDecimalSeconds:"도분초",radians:"라디안",grads:"그라디안"}},planar:{caption:"평면"},local:{caption:"로컬",localdes:"로컬 설명",localgeo:"로컬 지리보정 정보"},geodetic:{caption:"측지 모델",horizdn:{caption:"수평 데이텀 이름",nad83:"North American Datum of 1983",nad27:"North American Datum of 1927"},ellips:{caption:"타원체 이름",grs80:"Geodetic Reference System 80",clarke1866:"Clarke 1866"},semiaxis:"반장축",denflat:"역 편평률"}},vertdef:{caption:"수직 좌표계",altsys:{caption:"고도 시스템",altdatum:{caption:"고도 데이텀 이름",navd88:"North American Vertical Datum of 1988",ngvd29:"National Geodetic Vertical Datum of 1929"},altres:"고도 해상도",altunits:{caption:"고도 거리 단위",meters:"미터",feet:"피트"},altenc:{caption:"고도 인코딩 방법",explicit:"수평 좌표에 포함된 명시적 고도 좌표",implicit:"암시적 좌표",attribute:"속성 값"}},depthsys:{caption:"깊이 시스템",depthdn:{caption:"깊이 데이텀 이름",option1:"로컬 표면",option2:"차트 데이텀: 측심 감소 데이텀",option3:"최저 천문조",option4:"최고 천문조",option5:"평균 저조위",option6:"평균 고조위",option7:"평균 해수면",option8:"육지 측량 데이텀",option9:"대조 평균 저조위",option10:"대조 평균 고조위",option11:"소조 평균 저조위",option12:"소조 평균 고조위",option13:"평균 저저조위",option14:"대조 평균 저저조위",option15:"평균 고고조위",option16:"평균 고저조위",option17:"평균 저고조위",option18:"대조",option19:"열대 저저조위",option20:"소조",option21:"고조위",option22:"고고조위",option23:"저조위",option24:"저조위 데이텀",option25:"최저 저조위",option26:"저저조위",option27:"평균 최저조위",option28:"평균 조위",option29:"인도양 대조 저조위",option30:"고조 간격",option31:"저조 간격",option32:"컬럼비아 강 데이텀",option33:"걸프 해안 저조위 데이텀",option34:"적도 대조 저조위",option35:"근사 최저 천문조",option36:"보정 없음"},depthres:"깊이 해상도",depthdu:{caption:"깊이 거리 단위",meters:"미터",feet:"피트"},depthem:{caption:"깊이 인코딩 방법",explicit:"수평 좌표에 포함된 명시적 깊이 좌표",implicit:"암시적 좌표",attribute:"속성 값"}}}},timeinfo:{caption:"기간 정보",sngdate:"단일 날짜",mdattim:"여러 날짜",rngdates:"날짜 범위",caldate:"날짜",time:"시간",begdate:"시작일",begtime:"시작 시간",enddate:"종료일",endtime:"종료 시간"}});