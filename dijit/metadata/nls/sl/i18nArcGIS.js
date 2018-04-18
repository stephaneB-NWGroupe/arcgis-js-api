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

define({documentTypes:{arcgis:{caption:"Metapodatki ArcGIS",editorCaption:"Metapodatki",description:""}},emptyOption:"Prazno",conditionals:{ISO19139A1_ROW4:"Če je raven hierarhije metapodatkov podatkovni sklop, je zahtevan geografski omejitveni okvir ali geografski opis.",ISO19139A1_ROW6:"Zahtevan je identifikator ali ime sklopa podatkov.",ISO19139A1_ROW7:"Če so izbrane druge restrikcije, so zahtevane druge omejitve.",ISO19139A1_ROW9:"Če domet ne vsebuje podatkovnega sklopa ali niza je zahtevan opis stopnje.",ISO19139A1_ROW10_11_12:"Če domet ni podatkovni sklop ali niz, je zahtevana izjava, korak postopka ali vir podatkov.",ISO19139A1_ROW15:"Če je izbrana razpoložljivost točke preverjanja, je zahtevan opis točke preverjanja.",ISO19139A1_ROW18:"Če je dokumentirana distribucija, je zahtevana oblika ali distributer/oblika.",INSPIRE_AccessLimitation:" Zahtevana je najmanj ena omejitvena koda za zakonit dostop ali varnostna klasifikacijska koda. (INSPIRE)",INSPIRE_UseLimitation:" Zahtevana je najmanj ena omejitev uporabe (INSPIRE)",INSPIRE_ConformanceResult:"Poročilo o domenski usklajenosti zahteva rezultat usklajenosti. (INSPIRE)",INSPIRE_DomainConsistency:"Zahtevano je poročilo o domenski usklajenosti. (INSPIRE)",INSPIRE_LineageStatement:"Če je domet podatkovni sklop ali niz, je zahtevana izjava porekla. (INSPIRE)",FGDC_DescIfTemporal:"Za trenutni obseg je zahtevan opis. (FGDC)",FGDC_Keywords:"Zahtevana je tema, oznaka ali ključna beseda teme. (FGDC)",FGDC_Reports:"Zahtevani sta poročili o pomanjkljivostih v celovitosti in konceptualni skladnosti. (FGDC)",FGDC_Temporal:"Zahtevan je najmanj en trenutni obseg. (FGDC)",NAP_Contact:"Zahtevan je naslov/dostavna točka, telefonska/glasovna številka ali spletni vir/URL. (NAP)",GEN_BoundingBox:"Zahtevan je najmanj en geografski omejitveni okvir.",GEN_ReportResult:"Zahtevana je skladnost ali kvantitativni rezultat.",minLessThanMax:"Najmanjša vrednost mora biti manjša kot največja vrednost."},hints:{integerGreaterThanZero:"(vnesite celo število > 0)",integerGreaterThanOne:"(vnesite celo število > 1)",integer0To100:"(vnesite celo število 0..100)",maxScale:"(vnesite celo število > 0, npr. 50.000)",minScale:"(vnesite celo število > 0, npr. 150.000.000)",number0To100:"(vnesite število 0..100)",number0To360:"(vnesite število 0...360)",number90To90:"(vnesite število –90...90)",listOfDoubles:"(vnesite seznam števil, ločite s presledkom)"},htmlEditor:{button:"Uredi..."},sections:{overview:"Pregled",esri:"Esri",resource:"Vir",reference:"Referenca",content:"Vsebina",distribution:"Distribucija",quality:"Kakovost",eainfo:"Polja",representation:"Predstavitev",metadata:"Metapodatki"},metadataStyle:{caption:"Slog metapodatkov ArcGIS",changeButton:"Spremeni...",dialogTitle:"Izberite slog metapodatkov",updating:"Posodabljanje dokumenta...","Item Description":"Opis elementa","FGDC CSDGM Metadata":"Metapodatki FGDC CSDGM","ISO 19139 Metadata Implementation Specification":"Specifikacije za uvedbo metapodatkov v skladu z ISO 19139","ISO 19139 Metadata Implementation Specification GML3.2":"Specifikacije za uvedbo metapodatkov GML3.2 v skladu z ISO 19139","INSPIRE Metadata Directive":"Direktiva o metapodatkih INSPIRE","North American Profile of ISO19115 2003":"Profil za Severno Ameriko ISO19115 2003"},aggrInfo:{caption:"Agregacija informacij",datasetHint:"Zahtevan je identifikator ali ime sklopa podatkov.",aggrDSIdent:"Identifikator podatkovnega sklopa",aggrDSName:"Ime podatkovnega sklopa"},appSchInfo:{caption:"Shema aplikacije",asName:"Ime sheme",asSchLang:"Jezik sheme",asCstLang:"Jezik omejitve",asAscii:"ASCII",asGraFile:"Grafična datoteka",asGraFile_src:"Vir grafične datoteke",asSwDevFile:"Razvojna datoteka programske opreme",asSwDevFile_src:"Vir razvojne datoteke programske opreme",asSwDevFiFt:"Oblika razvojne datoteke programske opreme"},citation:{caption:"Navedek",section:{titlesAndDates:"Naslovi in datumi",links:"URL-ji",identifiers:"Identifikatorji",presentation:"Obrazec",other:"Drugo",edition:"Izdaja",series:"Serije"},conditionalDate:{caption:"Datum navedka",msg:"Zahtevan je datum ustvarjanja, datum objave ali datum revizije.",msg_nap:"Zahtevan je datum navedka."},resTitle:"Naslov",resAltTitle:"Drugi naslov",collTitle:"Kolektivni naslov",date:{createDate:"Datum ustvarjanja",pubDate:"Datum objave",reviseDate:"Datum revizije",notavailDate:"Datum ni na voljo",inforceDate:"Datum v veljavi",adoptDate:"Datum sprejetja",deprecDate:"Zastarani datum",supersDate:"Zamenjani datum"},isbn:"ISBN",issn:"ISSN",citId:{caption:"Identifikator",identCode:"Koda",identAuth:"Navedek overitelja"},resEd:"Izdaja",resEdDate:"Datum izdaje",datasetSeries:{seriesName:"Ime",issId:"Težava",artPage:"Stran"},otherCitDet:"Druge podrobnosti",contactCaption:"Stik za navedke"},cntAddress:{caption:"Naslov",delPoint:"Dostavna točka",city:"Mesto",adminArea:"Administrativno območje",postCode:"Poštna številka",country:"Država",eMailAdd:"E-pošta",addressType:{caption:"Tip naslova",postal:"Poštna številka",physical:"Fizični naslov",both:"Oboje"}},cntOnlineRes:{caption:"Spletni vir",linkage:"URL",protocol:"Protokol",appProfile:"Profil aplikacije",orName:"Ime",orDesc:"Opis"},cntPhone:{caption:"Telefon",voiceNum:"Telefonska tajnica",faxNum:"Faks",tddtty:"Tehnični pripomoček za gluhe, naglušne in gluhoslepe"},codeRef:{caption:"Identifikator",identCode:"Koda",idCodeSpace:"Prostor kode",idVersion:"Različica",identAuth:"Navedek overitelja"},constraints:{caption:"Omejitve",useLimit:"Omejitev uporabe",general:{caption:"Splošno"},legal:{caption:"Legal",accessConsts:"Omejitve dostopa",useConsts:"Omejitve uporabe",othConsts:"Druge omejitve"},security:{caption:"Varnost",classSys:"Sistem klasificiranja",userNote:"Opomba uporabnika",handDesc:"Opis obravnavanja"}},contInfo:{caption:"Informacije o vsebini",section:{CovDesc:"Opis pokritosti",ImgDesc:"Opis slike",FetCatDesc:"Katalog geoobjektov"},attDesc:"Opis atributa",covDim:{caption:"Razpon ali pas",seqID:"Identifikator zaporedja",seqIDType:"Tip identifikatorja zaporedja",dimDescrp:"Deskriptor"},RangeDim:{caption:"Dimenzija razpona"},Band:{caption:"Pas",minVal:"Minimalna vrednost",maxVal:"Maksimalna vrednost",valUnit:"Enote vrednosti",pkResp:"Najvišji odziv",bitsPerVal:"Bitov na vrednost",toneGrad:"Prehajanje barvnega tona",sclFac:"Faktor merila",offset:"Odmik"},CovDesc:{caption:"Opis pokritosti",section:{description:"Opis",rangesAndBands:"Razponi in pasovi"}},ImgDesc:{caption:"Opis slike",section:{description:"Opis",rangesAndBands:"Razponi in pasovi"},illElevAng:"Kot višine osvetljenosti",illAziAng:"Kot azimuta osvetljenosti",cloudCovPer:"Odstotek oblačnosti",cmpGenQuan:"Kakovost stiskanja",trianInd:"Kazalnik triangulacije?",radCalDatAv:"Razpoložljivost podatkov o radiometričnem umerjanju?",camCalInAv:"Razpoložljivost informacij o umerjanju kamere?",filmDistInAv:"Razpoložljivost informacij o deformaciji filma?",lensDistInAv:"Razpoložljivost informacij o deformaciji leč?",imagQuCode:"Koda kakovosti",prcTypCde:"Koda stopnje obdelave"},FetCatDesc:{caption:"Katalog geoobjektov",section:{description:"Opis",featureTypes:"Tipi geoobjektov",citation:"Navedek"},compCode:"Je v skladu z ISO 19110?",incWithDS:"Included With Dataset?",catCitation:"Navedek kataloga geoobjektov",catFetTyps:{caption:"Tip geoobjekta",genericName:"Ime",codeSpace:"Mesto kode"}}},contact:{caption:"Stik",section:{name:"Ime stika",info:"Podatki za stik",hoursAndInstructions:"Ure in navodila"},conditionalName:{caption:"Ime stika",msg:"Zahtevano je ime posameznika, ime organizacije ali ime položaja.",msg_fgdc:"Zahtevano je ime posameznika ali ime organizacije."},rpIndName:"Ime posameznika",rpOrgName:"Ime organizacije",rpPosName:"Ime položaja",rpCntInfo:"Kontaktni podatki",cntHours:"Delovni čas",cntInstr:"Kontaktna navodila"},distInfo:{caption:"Informacije o distribuciji",section:{format:"Format",distributor:"Distributer",transfer:"Možnosti prenosa"},distFormat:{caption:"Format distribucije",formatName:"Ime formata",formatVer:"Različica formata",formatAmdNum:"Številka spremembe",formatSpec:"Specifikacija",fileDecmTech:"Tehnika ekstrahiranja",formatInfo:"Informacije o vsebini"},distributor:{caption:"Distributer"},distTranOps:{caption:"Možnosti digitalnega prenosa",section:{unitsAndSize:"Enote"},unitsODist:"Enote distribucije",transSize:"Velikost prenosa",offLineMed:{caption:"Medij brez povezave",medDensity:"Gostota",medDenUnits:"Enote gostote",medVol:"Količine",medNote:"Opomba o mediju"}},distorOrdPrc:{caption:"Proces naročanja",resFees:"Znesek",planAvDtTm:"Razpoložljiv datum",planAvTmPd:{caption:"Razpoložljivo datumsko obdobje",tmBegin:"Datum/čas začetka",tmEnd:"Datum/čas zaključka"},ordInstr:"Navodila za naročila",ordTurn:"Čas obdelave naročila"}},dqInfo:{caption:"Kakovost podatkov",section:{scope:"Obseg",report:"Prijava",lineage:"Poreklo"},dqScope:{section:{level:"Stopnja",extent:"Obseg"},scpLvl:"Obseg",scpLvlDesc:"Opis stopnje",scpExt:"Obseg"},report:{section:{measure:"Meritve",evaluation:"Ocena",result:"Rezultat",conformance:"Skladnost"},measDesc:"Opis meritve",measName:"Ime meritve",measDateTm:"Datum meritve",measId:"Identifikator meritve",evalMethDesc:"Metoda ocene",evalProc:"Navedek postopka",ConResult:{caption:"Rezultat usklajenosti",conExpl:"Pojasnilo",conSpec:"Specifikacija",conPass:{caption:"Stopinja",_1:"Skladno",_0:"Ni skladno"}},QuanResult:{caption:"Kvantitativni rezultat",quanVal:"Vrednost",quanValType:"Tip vrednosti",quanValUnit:"Enote vrednosti",errStat:"Statistika napak"}},dataLineage:{section:{statement:"Izjava",dataSource:"Vir podatkov",prcStep:"Korak postopka"},statement:"Splošen opis porekla vira",dataSource:{caption:"Vir podatkov",section:{description:"Opis",srcRefSys:"Referenčni sistem",srcExt:"Obseg",srcCitatn:"Navedek"},srcDesc:"Opis vira",srcScale:{rfDenom:"Imenovalec merila"},srcRefSys:"Referenčni sistem vira",srcExt:"Obseg vira",srcCitatn:"Navedek vira"},prcStep:{caption:"Korak postopka",section:{description:"Opis",stepProc:"Procesor",stepSrc:"Vir podatkov"},stepDesc:"Opis postopka",stepRat:"Obrazložitev",stepDateTm:"Datum koraka postopka",stepProc:"Procesor",stepSrc:"Vir podatkov"}}},eainfo:{caption:"Informacije o entiteti in atributu",section:{detailed:"Podrobnosti",overview:"Pregled"},detailed:{caption:"Podrobnosti o entiteti in atributu",section:{enttyp:"Entiteta",attr:"Atributi"},enttyp:{caption:"Tip entitete",enttypl:"Napis",enttypt:"Objekt",enttypc:"Števec",enttypd:"Opredelitev",enttypds:"Vir opredelitve"},attr:{caption:"Atribut",section:{description:"Opis",value:"Vrednost",domain:"Domena"},attrlabl:"Napis",attalias:"Vzdevek",attrdef:"Opredelitev",attrdefs:"Vir opredelitve",attrtype:"Tip",attwidth:"Širina",atprecis:"Natančnost",attscale:"Merilo",atindex:"Indeksiran",attrvai:{attrva:"Obrazložitev vrednosti",attrvae:"Natančnost vrednosti"},attrmfrq:"Pogostost merjenja vrednosti",begdatea:"Začetni datum vrednosti",enddatea:"Končni datum vrednosti",attrdomv:{caption:"Domena",edom:{caption:"Oštevilčeno",edomv:"Vrednost",edomvd:"Opredelitev",edomvds:"Vir opredelitve"},rdom:{caption:"Razpon",rdommin:"Minimalna vrednost",rdommax:"Maksimalna vrednost",rdommean:"Srednja vrednost",rdomstdv:"Standardni odklon",attrunit:"Enote",attrmres:"Ločljivost meritve"},codesetd:{caption:"Kodni sklop",codesetn:"Ime",codesets:"Vir"},udom:{caption:"Ni reprezentativno"}}}},overview:{caption:"Pregled",eaover:"Povzetek",eadetcit:"Navedek"}},extent:{caption:"Obseg",section:{description:"Opis",geographic:"Geografsko",temporal:"Časovno",vertical:"Vertikalno"},exDesc:"Opis obsega",geoEle:{caption:"Geografski obseg",GeoBndBox:{caption:"Omejitveni okvir",esriExtentType:"Obseg namenjen iskanju?",exTypeCode:"Obseg vsebuje vir?",westBL:"Zahodna omejitvena G.Š.",eastBL:"Vzhodna omejitvena G.Š.",southBL:"Južna omejitvena G.Š.",northBL:"Severna omejitvena G.Š."},GeoDesc:{caption:"Geografski opis",exTypeCode:"Opis vsebuje vir?",identCode:"Koda"}},tempEle:{caption:"Začasen obseg",TM_Period:"Časovno obdobje",TM_Instant:"Časovni trenutek",tmPosition:"Datum",tmBegin:"Datum začetka",tmEnd:"Datum zaključka"},vertEle:{caption:"Višinski obseg",vertMinVal:"Minimalna vrednost",vertMaxVal:"Maksimalna vrednost"}},graphOver:{caption:"Dodaj grafiko",bgFileName:"Dodaj URL grafike",bgFileDesc:"Dodaj opis grafike",bgFileType:"Dodaj določen tip grafike"},keywords:{caption:"Ključne besede",section:{topicCategory:"Tema",searchKeys:"Oznake",themeKeys:"Tema",placeKeys:"Kraj",tempKeys:"Časovno",discKeys:"Področje",stratKeys:"Razred",productKeys:"Izdelek",subTopicCatKeys:"Podtema",otherKeys:"Drugo"},delimited:"Ključne besede",searchKeys:"Oznake",themeKeys:"Ključne besede teme",placeKeys:"Ključne besede kraja",tempKeys:"Časovne ključne besede",discKeys:"Ključne besede področja",stratKeys:"Ključne besede razreda",productKeys:"Ključne besede izdelka",subTopicCatKeys:"Ključne besede podteme",otherKeys:"Druge ključne besede",thesaName:"Navedek slovarja sopomenk",thesaLang:"Jezik slovarja sopomenk"},locales:{caption:"Območne nastavitve",locale:"Območna nastavitev",resTitle:"Naslov",idAbs:"Povzetek"},maintenance:{caption:"Vzdrževanje",section:{frequency:"Pogostost",scope:"Obseg",note:"Opomba"},usrDefFreq:"Prilagodi postavke",dateNext:"Naslednja posodobitev",maintScp:"Posodobi obseg",upScpDesc:{caption:"Opis obsega",attribSet:"Atributi",attribIntSet:"Primerki atributa",featSet:"Geoobjekti",featIntSet:"Primerki geoobjekta",datasetSet:"Podatkovni slop",other:"Drugi primerki"},maintNote:"Opomba k vzdrževanju",maintCont:"Stik za vzdrževanje"},metadata:{section:{profile:"Profil",details:"Obseg"},mdFileID:"Identifikator datoteke",mdParentID:"Nadrejeni identifikator",datasetURI:"URI sklopa podatkov",dataSetFn:"Funkcija podatkovnega sklopa",mdDateSt:"Datum metapodatkov",mdLang:"Jezik metapodatkov",mdChar:"Sklop znakov",mdHrLv:"Raven hierarhije",mdHrLvName:"Ime ravni hierarhije",mdContact:"Stik za metapodatke",mdMaint:"Vzdrževanje metapodatkov",mdConst:"Omejitve metapodatkov"},porCatInfo:{caption:"Navedek prikazovanja"},refSysInfo:{caption:"Koordinatni sistem"},resource:{section:{citation:"Navedek",details:"Podrobnosti",description:"Opis",keywords:"Ključne besede",status:"Status",resolution:"Ločljivost",representation:"Predstavitev",browse:"Dodaj grafiko",format:"Format",usage:"Uporaba",aggregateInfo:"Agregacija",additional:"Dodatno"},idAbs:"Opis (izvleček)",idPurp:"Povzetek (namen)",suppInfo:"Dodatne informacije",idCredit:"Krediti",envirDesc:"Procesno okolje",dataLang:"Jezik vira",dataExt:"Obseg vira",idPoC:"Kontaktna oseba",resMaint:"Vzdrževanje vira",resConst:"Omejitve vira",dsFormat:"Format vira",dataScale:{caption:"Merilo podatkov",equScale:"Ločljivost merila",scaleDist:"Ločljivost razdalje",scaleDist_value:"Razdalja"},idSpecUse:{caption:"Uporaba vira",specUsage:"Posebna uporaba",usageDate:"Datum uporabe",usrDetLim:"Omejitve",usrCntInfo:"Stik za uporabo"}},service:{caption:"Storitev",svType:"Tip storitve",svType_Name:"Ime",svAccProps:"Lastnosti dostopa",svCouplRes:{caption:"Povezan vir",svOpName:"Ime operacije",svResCitId:"Identifikator vira"},svCoupleType:"Tip spajanja"},scaleRange:{caption:"Razpon merila",maxScale:"Maksimalno merilo",minScale:"Minimalno merilo"},spatRepInfo:{caption:"Prostorska predstavitev",section:{dimension:"Dimenzija",parameters:"Parametri"},numDims:"Število dimenzij",tranParaAv:"Razpoložljivost parametra transformacije",axisDimension:{caption:"Dimenzija",dimSize:"Velikost",dimResol:{caption:"Ločljivost",_value:"Vrednost ločljivosti",uom:"Enote ločljivosti"}},VectSpatRep:{caption:"Vektor",geometObjs:"Geometrični objekti",geoObjCnt:"Števec objektov"},GridSpatRep:{caption:"Ribiška mreža"},Georect:{caption:"Georektifikacija",section:{centerPoint:"Središčna točka",cornerPts:"Kotne točke"},chkPtAv:"Razpoložljivost točke preverjanja?",chkPtDesc:"Opis točke preverjanja",ptInPixel:"Točka v pikslu",transDimDesc:"Opis dimenzije transformacije",transDimMap:"Kartiranje dimenzije transformacije",cornerPts:{caption:"Kotna točka",pos:"Položaj",gmlDesc:"Opis",gmlDescRef:"Referenca",gmlIdent:"Identifikator",codeSpace:"Mesto kode identifikatorja"}},Georef:{caption:"Možnost georeferenciranja",ctrlPtAv:"Razpoložljivost kontrolne točke?",orieParaAv:"Razpoložljivost parametra usmerjenosti",orieParaDs:"Opis parametra usmerjenosti",georefPars:"Georeferencirani parametri",paraCit:"Navedek parametra"},Indref:{caption:"Posredno"}},booleanOptions:{_false:"Ne",_true:"Da"},codelist:{CountryCode:"Država",LanguageCode:"Jezik",MonetaryUnits:"Denarne enote",MonetaryUnits_empty:"Ni univerzalne valute",PresentationForm:"Oblika predstavitve geoprostorskih podatkov FGDC-ja",CI_PresentationFormCode:"Oblika predstavitve",CI_RoleCode:"Vloga",CI_OnLineFunctionCode:"Funkcija",IMS_ContentType:"Tip vsebine",DQ_ElementDimension:"Dimenzija",DQ_ElementType:"Tip poročila",DQ_EvaluationMethodTypeCode:"Tip ocene",DS_AssociationTypeCode:"Tip združenja",DS_InitiativeTypeCode:"Tip iniciative",LI_SourceType:"Tip vira",MD_CellGeometryCode:"Geometrija celice",MD_CharacterSetCode:"Sklop znakov",MD_ClassificationCode:"Klasificikacija",MD_CoverageContentTypeCode:"Tip vsebine",MD_DimensionNameTypeCode:"Tip dimenzije",MD_GeometricObjectTypeCode:"Tip geometričnega objekta",MD_ImagingConditionCode:"Stanje slikovja",MD_MaintenanceFrequenceCode:"Pogostost posodabljanja",MD_MediumFormatCode:"Fomat kode",MD_MediumNameCode:"Ime medija",MD_PixelOrientationCode:"Usmerjenost pikslov",MD_ProgressCode:"Status",MD_RestrictionCode:"Omejevalna koda",MD_ScopeCode:"Obseg",MD_SpatialRepresentationTypeCode:"Tip prostorske predstavitve",MD_TopicCategoryCode:"Kategorija teme",MD_TopologyLevelCode:"Raven topologije",RS_Dimension:"Dimenzija",SV_CouplingType:"Tip spajanja",UCUM:"Enote",UCUM_Length:"Enote razdalje"}});