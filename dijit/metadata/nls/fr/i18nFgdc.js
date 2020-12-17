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

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"Aucun",notComplete:"Non terminé",other:"Autre",present:"Présent",unknown:"Inconnue",unpublishedMaterial:"Document non publié"},hints:{integerGreaterThanOne:"(saisissez un entier > 1)",integer0To100:"(saisissez un entier 0..100)"},citeinfo:{caption:"Informations de référence",origin:"Créateur",pubdate:"Date de publication",pubtime:"Heure de publication",title:"Titre",edition:"Mise à jour",geoform:{caption:"Formulaire de présentation de données géospatiales",atlas:"Atlas",audio:"Audio",diagram:"Diagramme",sDocument:"Document",globe:"Globe",map:"Carte",model:"Modèle",multiMediaPresentation:"Présentation multimédia",profile:"Profil",rasterDigitalData:"Données numériques raster",remoteSensingImage:"Image télé-détectée",section:"Section",spreadsheet:"Feuille de calcul",tabularDigitalData:"Données numériques tabulaires",vectorDigitalData:"Données numériques vectorielles",video:"Vidéo",view:"Vue"},serinfo:{caption:"Informations sur la série",sername:"Nom de la série",issue:"Identification d’émission"},pubinfo:{caption:"Informations de publication",pubplace:"Site de publication",publish:"Éditeur"},othercit:"Autres détails de référence",onlink:"Lien en ligne (URL)"},cntinfo:{caption:"Coordonnées",section:{primary:"Principale",phoneAndEmail:"Téléphone et adresse e-mail",hoursAndInstructions:"Heures et instructions"},cntorgp:{caption:"Par organisation",cntorg:"Organisation",cntper:"Personne"},cntperp:{caption:"Par personne",cntper:"Personne",cntorg:"Organisation"},cntpos:"Position",cntaddr:{caption:"Adresse",addrtype:{caption:"Type d’adresse",mailing:"Envoi par e-mail",physical:"Physique",mailingAndPhysical:"Envoi par e-mail et physique"},address:"Adresse",city:"Ville",state:"Région",postal:"Code postal",country:"Pays"},cntvoice:"Voix",cnttdd:"Téléphone TDD/TTY (pour personnes malentendantes)",cntfax:"Télécopie",cntemail:"Adresse e-mail",hours:"Heures",cntinst:"Instructions"},dataqual:{caption:"Informations de qualité des données",section:{attributeAccuracy:"Précision d’attribut",logicalConsistency:"Cohérence logique",completeness:"Intégralité",positionalAccuracy:"Précision de position",lineage:"Lignée",cloudCover:"Couverture nuageuse"},attracc:{caption:"Précision d’attribut",attraccr:"Rapport de précision d’attribut",qattracc:{caption:"Évaluation quantitative de la précision d’attribut",attraccv:"Valeur de précision d’attribut",attracce:"Explication de la précision d’attribut"}},logic:"Rapport de cohérence logique",complete:"Rapport de complétude",posacc:"Précision de position",horizpa:{caption:"Précision de la position horizontale",horizpar:"Rapport de précision de la position horizontale",qhorizpa:{caption:"Évaluation quantitative de la précision de position horizontale",horizpav:"Valeur de précision de la position horizontale",horizpae:"Explication de précision de position horizontale"}},vertacc:{caption:"Précision de position verticale",vertaccr:"Rapport de précision de la position verticale",qvertpa:{caption:"Évaluation quantitative de la précision de position verticale",vertaccv:"Valeur de précision de position verticale",vertacce:"Explication de précision de position verticale"}},lineage:{caption:"Lignée"},srcinfo:{caption:"Informations sur la source",srccite:"Référence de source",srcscale:"Échelle de la source",typesrc:{caption:"Type de support média",paper:"Papier",stableBaseMaterial:"Document de base stable",microfiche:"Microfiche",microfilm:"Microfilm",audiocassette:"Cassette audio",chart:"Diagramme",filmstrip:"Pellicule",transparency:"Transparence",videocassette:"Cassette vidéo",videodisc:"Disque vidéo",videotape:"Bande vidéo",physicalModel:"Modèle physique",computerProgram:"Programme informatique",disc:"Disque",cartridgeTape:"Bande à cartouche",magneticTape:"Bande magnétique",online:"En ligne",cdrom:"CD-ROM",electronicBulletinBoard:"Bulletin électronique",electronicMailSystem:"Système de courrier électronique"},srctime:"Période source de contenu",srccurr:"Référence d’actualité de la source",srccitea:"Abréviation de référence de source",srccontr:"Contribution source"},procstep:{caption:"Étape de processus",procdesc:"Description du processus",srcused:"Abréviation de référence utilisée pour la source",procdate:"Date de traitement",proctime:"Durée de traitement",srcprod:"Abréviation de référence produite pour la source",proccont:"Contact du traitement"},cloud:"Couverture nuageuse"},distinfo:{caption:"Informations de distribution",section:{distributor:"Distributeur",description:"Description",orderProcess:"Traitement des commandes",prerequisites:"Conditions requises",availability:"Disponibilité"},distrib:"Distributeur",resdesc:{caption:"Description de la ressource",liveData:"Données et cartes dynamiques",downloadableData:"Données téléchargeables",offlineData:"Données hors connexion",staticMapImages:"Cartes statiques de type image",sDocument:"Autres documents",application:"Applications",geographicService:"Services géographiques",clearingHouse:"Centres d’information",mapFiles:"Fichiers de cartes",geographicActivies:"Activités géographiques"},distliab:"Instruction de fiabilité de distribution",custom:"Processus de commande personnalisé",techpreq:"Conditions techniques préalables",availabl:"Disponibilité"},eainfo:{caption:"Informations sur l’entité et l’attribut",overview:"Description de vue d’ensemble",eaover:"Vue d’ensemble des entités et des attributs",eadetcit:"Référence détaillée d’entité et d’attribut"},idinfo:{caption:"Informations d’identification",section:{timeAndStatus:"Heure et statut",constraints:"Contraintes",contact:"Contact",additional:"Supplémentaire"},citeinfo:"Référence",descript:{caption:"Description",sAbstract:"Résumé",purpose:"Objet",supplinf:"Informations supplémentaires"},timeperd:{caption:"Période du contenu",current:{caption:"Référence d’actualité",groundCondition:"Conditions au sol",publicationDate:"Date de publication"}},status:{caption:"Statut",progress:{caption:"État d’avancement",complete:"Complet",inWork:"En cours",planned:"Planifié"},update:{caption:"Fréquence de maintenance et de mise à jour",continual:"Continue",daily:"Quotidienne",weekly:"Toutes les semaines",monthly:"Tous les mois",annually:"Annuelle",unknown:"Inconnue",asNeeded:"Si nécessaire",irregular:"Irrégulière",nonePlanned:"Non planifiée"}},spdom:{caption:"Étendue",bounding:{caption:"Coordonnées d’emprise",westbc:"Longitude limite ouest",eastbc:"Longitude limite est",northbc:"Latitude limite nord",southbc:"Latitude limite sud"}},keywords:{caption:"Mot-clé",theme:"Thème",place:"Localisation géographique",stratum:"Niveau",temporal:"Temporel",thesaursus:"Dictionnaire des synonymes associé",delimited:"Mot-clé",themektIsoTopicCategory:"Rubrique ISO...",themektIsoTopicDialog:"Rubrique ISO",placektGnis:"Système d’information des noms géographiques"},accconst:"Contraintes d’accès",useconst:"Contraintes d’utilisation",ptcontac:"Point de contact de la ressource",browse:{caption:"Parcourir le graphique",browsen:"Parcourir l’URL du graphique",browsed:"Parcourir les descriptions de fichier graphique",browset:"Parcourir les types de fichier graphique"},datacred:"Crédit de jeu de données",secinfo:{caption:"Informations de sécurité",secsys:"Système de classification de sécurité",secclass:{caption:"Classification de sécurité",topSecret:"Top Secret",secret:"Secret",confidential:"Confidentiel",restricted:"Restreint",unclassified:"Non classé",sensitive:"Sensible"},sechandl:"Description de manipulation de sécurité"},sNative:"Environnement de jeu de données natif",crossref:"Référence croisée"},metadata:{idinfo:"Identification",dataqual:"Qualité",spdoinfo:"Organisation spatiale des données",spref:"Référence spatiale",eainfo:"Entity and Attribute",distinfo:"Répartition",metainfo:"Métadonnées"},metainfo:{caption:"Informations de métadonnées",section:{dates:"Dates des métadonnées",contact:"Contacts de métadonnées",standard:"Norme des métadonnées",additional:"Supplémentaire"},metd:"Date des métadonnées",metrd:"Date d’examen des métadonnées",metfrd:"Date future d’examen des métadonnées",metstdn:"Nom standard des métadonnées",metstdv:"Version standard des métadonnées",metac:"Contraintes d’accès aux métadonnées",metuc:"Contraintes d’utilisation des métadonnées",metsi:{caption:"Informations de sécurité des métadonnées",metscs:"Système de classification de sécurité des métadonnées",metsc:"Classification de sécurité des métadonnées",metshd:"Description de manipulation de sécurité des métadonnées"}},spref:{caption:"Informations de référence spatiale",horizsys:{caption:"Système de coordonnées horizontales",geograph:{caption:"Géographique",latres:"Résolution de latitude",longres:"Résolution de longitude",geogunit:{caption:"Unités de coordonnées géographiques",decimalDegrees:"Degrés décimaux",decimalMinutes:"Minutes décimales",decimalSeconds:"Secondes décimales",degreesAndDecimalMinutes:"Degrés et minutes décimales",degreesMinutesAndDecimalSeconds:"Degré, minutes et secondes décimales",radians:"Radians",grads:"Grades"}},planar:{caption:"Planaire"},local:{caption:"Local",localdes:"Description locale",localgeo:"Informations de géoréférence locales"},geodetic:{caption:"Modèle géodésique",horizdn:{caption:"Nom de datum horizontal",nad83:"North American Datum de 1983",nad27:"North American Datum de 1927"},ellips:{caption:"Nom ellipsoïde",grs80:"Système de référence géodésique 80",clarke1866:"Clarke 1866"},semiaxis:"Demi-grand axe",denflat:"Dénominateur du coefficient d’aplatissement"}},vertdef:{caption:"Système de coordonnées verticales",altsys:{caption:"Système d’altitude",altdatum:{caption:"Nom de datum d’altitude",navd88:"Datum vertical nord-américain de 1988",ngvd29:"Datum vertical géodésique national de 1929"},altres:"Résolution d’altitude",altunits:{caption:"Unités de distance d’altitude",meters:"Mètres",feet:"Pieds"},altenc:{caption:"Méthode de codage d’altitude",explicit:"Coordonnée d’altitude explicite incluse avec les coordonnées horizontales",implicit:"Coordonnée implicite",attribute:"Valeurs attributaires"}},depthsys:{caption:"Système de profondeur",depthdn:{caption:"Nom de datum de profondeur",option1:"Surface locale",option2:"Datum de diagramme ; datum de réduction sonore",option3:"Marée astronomique la plus basse",option4:"Marée astronomique la plus haute",option5:"Basse mer moyenne",option6:"Haute mer moyenne",option7:"Niveau moyen de la mer",option8:"Datum d’arpentage",option9:"Marée de vive-eau moyenne",option10:"Marée haute de vive-eau",option11:"Basse mer moyenne de morte-eau",option12:"Pleine mer moyenne de morte-eau",option13:"Basse mer inférieure moyenne",option14:"Marée de vive-eau inférieure moyenne",option15:"Haute mer supérieure moyenne",option16:"Basse mer supérieure moyenne",option17:"Pleine mer supérieure moyenne",option18:"Vive-eau",option19:"Basse mer inférieure tropicale",option20:"Marée de vive-eau",option21:"Haute mer",option22:"Haute mer supérieure",option23:"Basse mer",option24:"Datum de basse mer",option25:"Basse mer la plus basse",option26:"Basse mer inférieure",option27:"Basse mer normale la plus basse",option28:"Niveau moyen de marée",option29:"Basse mer de vive-eau indienne",option30:"Haute mer complète et chargée",option31:"Basse mer complète et chargée",option32:"Datum du fleuve Columbia",option33:"Datum de basse mer de la côte du Golfe",option34:"Marée de vive-eau équatoriale",option35:"Approximation de la marée astronomique la plus basse",option36:"Aucune correction"},depthres:"Résolution de profondeur",depthdu:{caption:"Unités de distance de profondeur",meters:"Mètres",feet:"Pieds"},depthem:{caption:"Méthode de codage de profondeur",explicit:"Coordonnée de profondeur explicite incluse avec les coordonnées horizontales",implicit:"Coordonnée implicite",attribute:"Valeurs attributaires"}}}},timeinfo:{caption:"Informations sur la période",sngdate:"Date/Heure",mdattim:"Dates multiples",rngdates:"Plage de dates",caldate:"Date",time:"Temps",begdate:"Date de début",begtime:"Heure de début",enddate:"Date de fin",endtime:"Heure de fin"}});