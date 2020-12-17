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

define({general:{cancel:"Tühista",close:"Sulge",none:"Puudub",ok:"OK",other:"Muu",stamp:"Tempel",now:"Praegu",choose:"Vali üks:"},editor:{noMetadata:"Sellel üksusel puuduvad metaandmed",xmlViewOnly:"Redaktor ei toeta selle üksusega seotud metaandmete tüüpi. Metaandmed peavad olema ArcGIS-i vormingus.",editorDialog:{caption:"Metaandmed",captionPattern:"Metaandmed - {title}"},primaryToolbar:{view:"Vaatamine",viewXml:"Kuva XML",edit:"Muuda",initializing:"Laadimine...",startingEditor:"Redaktori käivitamine...",loadingDocument:"Dokumendi laadimine...",updatingDocument:"Dokumendi uuendamine...",generatingView:"Vaate genereerimine...",errors:{errorGeneratingView:"Vaate genereerimisel tekkis viga.",errorLoadingDocument:"Dokumendi laadimisel tekkis viga."}},changesNotSaved:{prompt:"Teie dokumendis on salvestamata muudatusi.",dialogTitle:"Sulge metaandmete redaktor",closeButton:"Sulge"},download:{caption:"Laadi alla",dialogTitle:"Laadi alla",prompt:"Faili allalaadimiseks klõpsake siin."},load:{caption:"Avatud",dialogTitle:"Avatud",typeTab:"Uus dokument",fileTab:"Ava fail",templateTab:"Mall",itemTab:"Teie üksus",filePrompt:"Valige kohalik ArcGIS-i metaandmete XML-fail. Metaandmed peavad olema ArcGIS-i vormingus.",templatePrompt:"Metaandmete loomine",pullItem:"Määrake metaandmed üksuse detailide kasutades.",importWarning:"Valitud faili ei kuvata ArcGIS-i vormingus. Üles laaditud metaandmed peavad olema ArcGIS-i vormingus.",loading:"Laadimine...",noMetadata:"Selle üksuse metaandmeid saab luua, valides ühe järgmistest valikutest.",unrecognizedMetadata:"Redaktor ei toeta selle üksusega seotud metaandmete tüüpi. Toetatud metaandmeid saab luua, valides ühe järgmistest valikutest.",errorLoading:"Laadimisel ilmnes viga.",warnings:{badFile:"Valitud faili ei saanud laadida.",notAnXml:"Valitud fail pole XML-fail.",notSupported:"Seda failitüüpi ei toetata."},portalCaption:"Kirjuta üle"},save:{caption:"Salvesta",dialogTitle:"Metaandmete salvestamine",working:"Metaandmete salvestamine...",errorSaving:"Ilmnes viga, Teie metaandmeid ei salvestatud.",saveDialog:{pushCaption:"Rakenda muudatused üksusele"}},saveAndClose:{caption:"Salvesta ja sulge"},saveDraft:{caption:"Allalaadimine",dialogTitle:"Allalaadimine"},validate:{caption:"Valideeri",dialogTitle:"Valideerimine",docIsValid:"Dokument on kehtiv."},viewHtml:{caption:"Vaatamine",dialogTitle:"Kuva metaandmed",savePrompt:"Teie dokumendis on salvestamata muudatusi. Nende nägemiseks metaandmete vaatamisel peate kõik muudatused salvestama.",saveButton:"Salvesta ja kuva",portalNone:"Standarditel põhinevatel metaandmetel puudub autor. Enne metaandmete vaatamist peate salvestama."},del:{caption:"Kustuta",dialogTitle:"Kustuta metaandmed",prompt:"Kas soovite need metaandmed kindlasti kustutada?",working:"Metaandmete kustutamine...",errorDeleting:"Ilmnes viga, Teie metaandmeid ei kustutatud.",portalNone:"Metaandmete dokumenti pole kustutamiseks saadaval. Standarditel põhinevatel metaandmetel puudub autor.",portalPrompt:"Sellega kustutatakse metaandmete dokument ja lähtestatakse selle üksuse metaandmed teabele (nt pealkiri, sisukirjeldus jt).",portalPrompt2:"See kustutab standardipõhised metaandmed. Kas soovite need metaandmed kindlasti kustutada?",portalButton:"Kustuta ja sulge"},transform:{caption:"Teisenda",dialogTitle:"Teisenda:",prompt:"",working:"Teisendamine...",errorTransforming:"Dokumendi teisendamisel ilmnes viga."},errorDialog:{dialogTitle:"Ilmnes viga"}},arcgis:{portal:{metadataButton:{caption:"Metaandmed"}}},calendar:{button:"Kalender...",title:"Kalender"},geoExtent:{button:"Määra geograafiline ulatus",title:"Geograafiline ulatus",navigate:"Navigeeri",draw:"Joonista ristkülik",drawHint:"Alustamiseks hoia all ja lõpetamiseks vabasta."},hints:{date:"(yyyy või yyyy-mm või yyyy-mm-dd)",dateTime:"(yyyy-mm-ddThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(yyyy või yyyy-mm või yyyy-mm-dd või yyyy-mm-ddThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(eraldamiseks kasuta koma või reapiiri)",fgdcDate:"(yyyy või yyyy-mm või yyyy-mm-dd)",fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(sisesta täisarv)",latitude:"(kümnendikkraadid)",longitude:"(kümnendikkraadid)",number:"(sisesta number)",numberGreaterThanZero:"(sisesta number > 0)"},isoTopicCategoryCode:{caption:"Teemakategooria",boundaries:"Administratiiv- ja poliitilised piirid",farming:"Põllumajandus ja loomakasvatus",climatologyMeteorologyAtmosphere:"Atmosfäär ja kliima",biota:"Bioloogia ja ökoloogia",economy:"Äri ja majandus",planningCadastre:"Katastriandmed",society:"Kultuur, ühiskond ja demograafia",elevation:"Kõrgus ja tuletatud tooted",environment:"Keskkond ja loodushoid",structure:"Omadused ja struktuurid",geoscientificInformation:"Geoloogiline ja geofüüsiline",health:"Tervishoid ja haigused",imageryBaseMapsEarthCover:"Satelliit- ja aluskaardid",inlandWaters:"Siseveeressursid",location:"Asukohad ja geodeetilised võrgud",intelligenceMilitary:"Sõjaline",oceans:"Ookeanid ja suudmed",transportation:"Transpordivõrgustikud",utilitiesCommunication:"Tehnoettevõtted"},multiplicity:{moveElementDown:"Vii jaotis allapoole",moveElementUp:"Vii jaotis ülespoole",removeElement:"Eemalda jaotis",repeatElement:"Korda jaotist"},optionalNode:{switchTip:"Kaasa see jaotis või jäta välja"},serviceTypes:{featureService:"Objektiteenus",mapService:"Kaarditeenus",imageService:"Pilditeenus",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {message}",patternWithHint:"{label} - {message} {hint}",ok:"OK",empty:"Väärtus on nõutav.",date:"Väärtus peab olema kuupäev.",integer:"Väärtus peab olema täisarv.",number:"Väärtus peab olema arv.",other:"Vigane väärtus"},validationPane:{clearMessages:"Tühjenda teated",prompt:"(klõpsake iga allolevat sõnumit ja sisestage määratud väljale vajalik teave)"}});