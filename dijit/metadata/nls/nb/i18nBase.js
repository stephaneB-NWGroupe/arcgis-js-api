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

define({general:{cancel:"Avbryt",close:"Lukk",none:"Ingen",ok:"OK",other:"Annet",stamp:"Stempel",now:"Nå",choose:"Velg ett:"},editor:{noMetadata:"Det er ingen metadata for dette elementet.",xmlViewOnly:"Typen metadata knyttet til dette elementet støttes ikke av redigeringsprogrammet. Metadataene må være i ArcGIS-format.",editorDialog:{caption:"Metadata",captionPattern:"Metadata for {title}"},primaryToolbar:{view:"Vis",viewXml:"Vis XML",edit:"Rediger",initializing:"Laster inn...",startingEditor:"Starter redigeringsprogram...",loadingDocument:"Laster inn dokument...",updatingDocument:"Oppdaterer dokument...",generatingView:"Genererer visning...",errors:{errorGeneratingView:"Det oppstod en feil under generering av visningen.",errorLoadingDocument:"Det oppstod en feil under innlasting av dokumentet."}},changesNotSaved:{prompt:"Dokumentet har endringer som ikke er blitt lagret.",dialogTitle:"Lukk redigeringsprogrammet for metadata",closeButton:"Lukk"},download:{caption:"Last ned",dialogTitle:"Last ned",prompt:"Klikk her for å laste ned filen."},load:{caption:"Åpne",dialogTitle:"Åpne",typeTab:"Nytt dokument",fileTab:"Åpne fil",templateTab:"En mal",itemTab:"Elementet ditt",filePrompt:"Velg en lokal ArcGIS-XML-fil for metadata. Metadata må være i ArcGIS-format.",templatePrompt:"Opprett metadata",pullItem:"Fyll ut metadata med elementdetaljer.",importWarning:"Den valgte filen ser ikke ut til å være i ArcGIS-format. Opplastede metadata må være i ArcGIS-format.",loading:"Laster inn...",noMetadata:"Du kan opprette metadata for dette elementet ved å velge ett av følgende alternativer.",unrecognizedMetadata:"Den typen metadata som er knyttet til dette elementet støttes ikke av redigeringsprogrammet. Du kan opprette støttede metadata ved å velge ett av følgende alternativer.",errorLoading:"Det oppstod en feil under lasting.",warnings:{badFile:"Den valgte filen kan ikke lastes inn.",notAnXml:"Den valgte filen er ikke en XML-fil.",notSupported:"Denne filtypen støttes ikke."},portalCaption:"Overskriv"},save:{caption:"Lagre",dialogTitle:"Lagre metadata",working:"Lagrer metadata",errorSaving:"Det oppsto en feil. Metadataene ble ikke lagret.",saveDialog:{pushCaption:"Bruk endringene på elementet"}},saveAndClose:{caption:"Lagre og lukk"},saveDraft:{caption:"Last ned",dialogTitle:"Last ned"},validate:{caption:"Valider",dialogTitle:"Validering",docIsValid:"Dokumentet er gyldig."},viewHtml:{caption:"Vis",dialogTitle:"Vis metadata",savePrompt:"Dokumentet har ulagrede endringer. Du må lagre eventuelle endringer for å se dem når du viser metadata",saveButton:"Lagre og vis",portalNone:"Standardbaserte metadata er ikke opprettet. Du må lagre før du kan vise metadata."},del:{caption:"Slett",dialogTitle:"Slett metadata",prompt:"Er du sikker på at du vil slette disse metadataene?",working:"Sletter metadata...",errorDeleting:"Det oppsto en feil. Metadataene ble ikke slettet.",portalNone:"Det er ingen tilgjengelige metadatadokumenter som kan slettes. Standardbaserte metadata er ikke opprettet.",portalPrompt:"Dette sletter metadatadokumentet og tilbakestiller metadataene for dette elementet til elementinformasjon som tittel, beskrivelse osv.",portalPrompt2:"Dette sletter standardbaserte metadata. Er du sikker på at du vil slette disse metadataene?",portalButton:"Slett og lukk"},transform:{caption:"Transformer",dialogTitle:"Transformer til",prompt:"",working:"Transformerer...",errorTransforming:"Det oppstod en feil under transformering av dokumentet."},errorDialog:{dialogTitle:"Det oppstod en feil"}},arcgis:{portal:{metadataButton:{caption:"Metadata"}}},calendar:{button:"Kalender...",title:"Kalender"},geoExtent:{button:"Angi geografisk utstrekning",title:"Geografisk utstrekning",navigate:"Navigere",draw:"Tegn et rektangel",drawHint:"Trykk ned for å starte, og slipp for å avslutte."},hints:{date:"(åååå eller åååå-mm eller åååå-mm-dd)",dateTime:"(åååå-mm-ddTtt:mm:ss.sss[+-]tt:mm)",dateOrDateTime:"(åååå eller åååå-mm eller åååå-mm-dd eller åååå-mm-ddTtt:mm:ss.sss[+-]tt:mm)",delimitedTextArea:"(skill med komma eller linjeskift)",fgdcDate:"(åååå eller åååå-mm eller åååå-mm-dd)",fgdcTime:"(tt:mm:ss.sss[+-]tt:mm)",integer:"(angi et heltall)",latitude:"(desimalgrader)",longitude:"(desimalgrader)",number:"(skriv inn et nummer)",numberGreaterThanZero:"(skriv inn et nummer > 0)"},isoTopicCategoryCode:{caption:"Emnekategori",boundaries:"Administrative og politiske grenser",farming:"Landbruk og gårdsdrift",climatologyMeteorologyAtmosphere:"Atmosfære og klima",biota:"Biologi og økologi",economy:"Næringsliv og økonomi",planningCadastre:"Matrikkel",society:"Kultur, samfunn og demografi",elevation:"Høyde og avledede produkter",environment:"Miljø og naturforvaltning",structure:"Fasiliteter og konstruksjoner",geoscientificInformation:"Geologisk og geofysisk",health:"Human helse og sykdom",imageryBaseMapsEarthCover:"Bilde- og bakgrunnskart",inlandWaters:"Innlands vannressurser",location:"Lokasjoner og geodetiske nettverk",intelligenceMilitary:"Militært",oceans:"Hav og elvemunninger",transportation:"Transportnettverk",utilitiesCommunication:"Forsyningsverk og kommunikasjon"},multiplicity:{moveElementDown:"Flytt seksjon ned",moveElementUp:"Flytt seksjon opp",removeElement:"Fjern seksjon",repeatElement:"Gjenta seksjon"},optionalNode:{switchTip:"Inkluder eller ekskluder denne delen."},serviceTypes:{featureService:"featuretjeneste",mapService:"Karttjeneste",imageService:"Bildetjeneste",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {message}",patternWithHint:"{label} - {message} {hint}",ok:"OK",empty:"Verdi er obligatorisk.",date:"Verdien må være en dato.",integer:"Verdi må være et heltall.",number:"Verdi må være et tall.",other:"Ugyldig verdi."},validationPane:{clearMessages:"Fjern meldinger",prompt:"(klikk på hver av meldingene nedenfor, og oppgi de nødvendige opplysningene i feltet som er angitt)"}});