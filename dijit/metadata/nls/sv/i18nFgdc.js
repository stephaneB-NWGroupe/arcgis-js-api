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

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"Inga",notComplete:"Ej fullständig",other:"Annat",present:"Närvarande",unknown:"Unknown",unpublishedMaterial:"Opublicerat material"},hints:{integerGreaterThanOne:"(ange ett heltal > 1)",integer0To100:"(ange ett heltal 0..100)"},citeinfo:{caption:"Information om omnämnande",origin:"Upphovsman",pubdate:"Publiceringsdatum",pubtime:"Publiceringstid",title:"Titel",edition:"Utgåva",geoform:{caption:"Presentationsformulär för geografiska data",atlas:"Atlas",audio:"Ljud",diagram:"Diagram",sDocument:"Dokument",globe:"Jordglob",map:"Karta",model:"Modell",multiMediaPresentation:"Multimediapresentation",profile:"Profil",rasterDigitalData:"Digitala rasterdata",remoteSensingImage:"Fjärranalysbild",section:"Sektion",spreadsheet:"Kalkylblad",tabularDigitalData:"Digitala tabelldata",vectorDigitalData:"Digitala vektordata",video:"Video",view:"Visa"},serinfo:{caption:"Serieinformation",sername:"Serienamn",issue:"Problemidentifiering"},pubinfo:{caption:"Publiceringsinformation",pubplace:"Publiceringsort",publish:"Utgivare"},othercit:"Annan detaljinformation om omnämnande",onlink:"Internetlänk (URL)"},cntinfo:{caption:"Kontaktinformation",section:{primary:"Primär",phoneAndEmail:"Telefon och e-post",hoursAndInstructions:"Tider och anvisningar"},cntorgp:{caption:"Efter organisation",cntorg:"Organisation",cntper:"Person"},cntperp:{caption:"Efter person",cntper:"Person",cntorg:"Organisation"},cntpos:"Position",cntaddr:{caption:"Adress",addrtype:{caption:"Adresstyp",mailing:"Post",physical:"Fysiskt",mailingAndPhysical:"Post och fysisk"},address:"Adress",city:"Stad",state:"Delstat",postal:"Postnummer",country:"Land"},cntvoice:"Samtal",cnttdd:"Texttelefon (hörselskadade)",cntfax:"Fax",cntemail:"E-postadress",hours:"Timmar",cntinst:"Instruktioner"},dataqual:{caption:"Information om datakvalitet",section:{attributeAccuracy:"Attributnoggrannhet",logicalConsistency:"Logiklikformighet",completeness:"Fullständighet",positionalAccuracy:"Positionsnoggrannhet",lineage:"Lineage",cloudCover:"Cloud Cover"},attracc:{caption:"Attributnoggrannhet",attraccr:"Rapport om attributnoggrannhet",qattracc:{caption:"Kvantitativ utvärdering av attributnoggrannhet",attraccv:"Noggrannhetsvärde för attribut",attracce:"Förklaring av attributnoggrannhet"}},logic:"Rapport om logiklikformighet",complete:"Fullständighetsrapport",posacc:"Positionsnoggrannhet",horizpa:{caption:"Horisontell positionsnoggrannhet",horizpar:"Rapport om horisontell positionsnoggrannhet",qhorizpa:{caption:"Kvantitativ bedömning av horisontell positionsnoggrannhet",horizpav:"Värde för horisontell positionsnoggrannhet",horizpae:"Förklaring av horisontell positionsnoggrannhet"}},vertacc:{caption:"Vertikal positionsnoggrannhet",vertaccr:"Rapport om vertikal positionsnoggrannhet",qvertpa:{caption:"Kvantitativ bedömning av vertikal positionsnoggrannhet",vertaccv:"Värde för vertikal positionsnoggrannhet",vertacce:"Förklaring av vertikal positionsnoggrannhet"}},lineage:{caption:"Lineage"},srcinfo:{caption:"Källinformation",srccite:"Källomnämnande",srcscale:"Nämnare för källskala",typesrc:{caption:"Typ av källmedier",paper:"Papper",stableBaseMaterial:"Material med stabil bas",microfiche:"Mikrokort",microfilm:"Mikrofilm",audiocassette:"Ljudkassett",chart:"Diagram",filmstrip:"Filmremsa",transparency:"Transparens",videocassette:"Videokassett",videodisc:"Videoskiva",videotape:"Videoband",physicalModel:"Fysisk modell",computerProgram:"Datorprogram",disc:"Skiva",cartridgeTape:"Bandpatron",magneticTape:"Magnetband",online:"Online",cdrom:"CD-ROM",electronicBulletinBoard:"Elektronisk anslagstavla",electronicMailSystem:"E-postsystem"},srctime:"Källtidsperiod för innehåll",srccurr:"Aktualitetsreferens för källan",srccitea:"Förkortning av källomnämnande",srccontr:"Källbidrag"},procstep:{caption:"Processteg",procdesc:"Processbeskrivning",srcused:"Förkortning av källa för använt omnämnande",procdate:"Processdatum",proctime:"Processtid",srcprod:"Omnämnandeförkortning från källan",proccont:"Kontaktperson för process"},cloud:"Cloud Cover"},distinfo:{caption:"Distributionsinformation",section:{distributor:"Distributör",description:"Beskrivning",orderProcess:"Rutin för beställning",prerequisites:"Förutsättningar",availability:"Tillgänglighet"},distrib:"Distributör",resdesc:{caption:"Resursbeskrivning",liveData:"Realtidsdata och kartor",downloadableData:"Nedladdningsbara data",offlineData:"Offlinedata",staticMapImages:"Statiska kartbilder",sDocument:"Andra dokument",application:"Applikationer",geographicService:"Geografiska tjänster",clearingHouse:"Clearing house",mapFiles:"Kartfiler",geographicActivies:"Geografiska aktiviteter"},distliab:"Meddelande om distributionsansvar",custom:"Anpassad beställningsprocess",techpreq:"Tekniska förutsättningar",availabl:"Tillgänglighet"},eainfo:{caption:"Information om enhet och attribut",overview:"Beskrivning av översikt",eaover:"Översikt över enhet och attribut",eadetcit:"Omnämnande av detaljinformation om enhet och attribut"},idinfo:{caption:"Information om ID",section:{timeAndStatus:"Tid och status",constraints:"Begränsningar",contact:"Kontaktperson",additional:"Ytterligare"},citeinfo:"Omnämnande",descript:{caption:"Beskrivning",sAbstract:"Sammandrag",purpose:"Syfte",supplinf:"Ytterligare information"},timeperd:{caption:"Tidsperiod för innehåll",current:{caption:"Aktualitetsdatum",groundCondition:"Grundtillstånd",publicationDate:"Publiceringsdatum"}},status:{caption:"Status",progress:{caption:"Förlopp",complete:"Fullständig",inWork:"Under arbete",planned:"Planerat"},update:{caption:"Underhålls- och uppdateringsfrekvens",continual:"Kontinuerligt",daily:"Dagligen",weekly:"Veckovis",monthly:"Månadsvis",annually:"Årlig",unknown:"Unknown",asNeeded:"Efter behov",irregular:"Oregelbunden",nonePlanned:"Inget planerat"}},spdom:{caption:"Utbredning",bounding:{caption:"Begränsningskoordinater",westbc:"Begränsningslongitud väst",eastbc:"Begränsningslongitud öst",northbc:"Begränsningslatitud nord",southbc:"Begränsningslatitud syd"}},keywords:{caption:"Nyckelord",theme:"Tema",place:"Plats",stratum:"Stratum",temporal:"Tidsbestämning",thesaursus:"Associerad synonymordlista",delimited:"Nyckelord",themektIsoTopicCategory:"ISO-ämne...",themektIsoTopicDialog:"ISO-ämne",placektGnis:"Geographic Names Information System"},accconst:"Åtkomstbegränsningar",useconst:"Användningsbegränsningar",ptcontac:"Kontaktpunkt för resursen",browse:{caption:"Bläddringsgrafik",browsen:"Bläddringsgrafik-URL",browsed:"Bläddringsgrafikfilens beskrivning",browset:"Bläddra till grafikfilens typ"},datacred:"Utvecklare av datauppsättning",secinfo:{caption:"Säkerhetsinformation",secsys:"System för säkerhetsklassificering",secclass:{caption:"Säkerhetsklassificering",topSecret:"Topphemlig",secret:"Hemlig",confidential:"Konfidentiellt",restricted:"Begränsat",unclassified:"Utan klassificering",sensitive:"Känslig"},sechandl:"Beskrivning av säkerhetshantering"},sNative:"Ursprunglig datasuppsättningsmiljö",crossref:"Korshänvisning"},metadata:{idinfo:"Identifiering",dataqual:"Kvalitet",spdoinfo:"Organisering av geografiska data",spref:"Geografisk referens",eainfo:"Enhet och attribut",distinfo:"Distribution",metainfo:"Metadata"},metainfo:{caption:"Metadatainformation",section:{dates:"Metadatadatum",contact:"Kontaktperson för metadata",standard:"Metadatastandard",additional:"Ytterligare"},metd:"Metadatadatum",metrd:"Datum för metadatagranskning",metfrd:"Datum för framtida metadatagranskning",metstdn:"Namn på metadatastandard",metstdv:"Metadatastandardens version",metac:"Åtkomstbegränsningar för metadata",metuc:"Begränsningar för metadataanvändning",metsi:{caption:"Säkerhetsinformation om metadata",metscs:"Klassificeringssystem för metadatasäkerhet",metsc:"Säkerhetsklassificering för metadata",metshd:"Beskrivning av säkerhetshantering för metadata"}},spref:{caption:"Geografisk referensinformation",horizsys:{caption:"Horisontellt koordinatsystem",geograph:{caption:"Geografiska",latres:"Latitudupplösning",longres:"Longitudupplösning",geogunit:{caption:"Geografiska koordinatenheter",decimalDegrees:"Decimalgrader",decimalMinutes:"Decimalminuter",decimalSeconds:"Decimalsekunder",degreesAndDecimalMinutes:"Grader och decimalminuter",degreesMinutesAndDecimalSeconds:"Grader, minuter och decimalsekunder",radians:"Radianer",grads:"Nygrader"}},planar:{caption:"Plan"},local:{caption:"Lokal",localdes:"Lokal beskrivning",localgeo:"Lokal georeferensinformation"},geodetic:{caption:"Geodetisk modell",horizdn:{caption:"Horisontellt datumnamn",nad83:"North American Datum 1983",nad27:"North American Datum 1927"},ellips:{caption:"Ellipsoidnamn",grs80:"Geodetic Reference System 80",clarke1866:"Clarke 1866"},semiaxis:"Halv storaxel",denflat:"Nämnare för avplattningsgrad"}},vertdef:{caption:"Vertikalt koordinatsystem",altsys:{caption:"Höjdsystem",altdatum:{caption:"Höjddatumnamn",navd88:"North American Vertical Datum 1988",ngvd29:"National Geodetic Vertical Datum of 1929"},altres:"Höjdupplösning",altunits:{caption:"Höjdavståndsenheter",meters:"Meter",feet:"Fot"},altenc:{caption:"Höjdkodningsmetod",explicit:"Explicit höjdkoordinat inkluderas med horisontella koordinater",implicit:"Implicit koordinat",attribute:"Attributvärden"}},depthsys:{caption:"Djupsystem",depthdn:{caption:"Namn på djupdatum",option1:"Lokal yta",option2:"Diagramdatum; datum för pejlingsreduktion",option3:"Lägsta astronomiska tidvatten",option4:"Högsta astronomiska tidvatten",option5:"Medellågvatten",option6:"Medelhögvatten",option7:"Medelvattenstånd",option8:"Lantmäteridatum",option9:"Medellågvatten springflod",option10:"Medelhögvatten springflod",option11:"Medellågvatten nipflod",option12:"Medelhögvatten nipflod",option13:"Medel av lägsta lågvatten",option14:"Medel av lägsta lågvatten springflod",option15:"Medel av högsta högvatten",option16:"Medel av högsta lågvatten",option17:"Medel av lägsta högvatten",option18:"Springflod",option19:"Lägre tropiskt lågvatten",option20:"Nipflod",option21:"Högvatten",option22:"Högre högvatten",option23:"Lågvatten",option24:"Lågvattensdatum",option25:"Lägsta lågvatten",option26:"Lägre lågvatten",option27:"Lägsta normala lågvatten",option28:"Medeltidvattenstånd",option29:"Lågvatten för indisk springflod",option30:"Högvatten fullt och inflöde",option31:"Lågvatten fullt och inflöde",option32:"Columbia River-datum",option33:"Gulfkustens lågvattendatum",option34:"Lågvatten för ekvatorspringflod",option35:"Ungefärliga lägsta astronomiska tidvatten",option36:"Ingen korrigering"},depthres:"Djupupplösning",depthdu:{caption:"Avståndsenheter för djup",meters:"Meter",feet:"Fot"},depthem:{caption:"Metod för djupkodning",explicit:"Explicit djupkoordinat inkluderas med horisontella koordinater",implicit:"Implicit koordinat",attribute:"Attributvärden"}}}},timeinfo:{caption:"Information om tidsperiod",sngdate:"Ett datum",mdattim:"Flera datum",rngdates:"Datumintervall",caldate:"Datum",time:"Tid",begdate:"Startdatum",begtime:"Starttid",enddate:"Slutdatum",endtime:"Sluttid"}});