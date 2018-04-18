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

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"Nenhum",notComplete:"Não completo",other:"Outro",present:"Presente",unknown:"Desconhecido",unpublishedMaterial:"Material Não Publicado"},hints:{integerGreaterThanOne:"(insira um número inteiro > 1)",integer0To100:"(insira um número inteiro 0..100)"},citeinfo:{caption:"Citação Informações",origin:"Autor",pubdate:"Data De Publicação",pubtime:"Tempo publicação",title:"Título",edition:"Edição",geoform:{caption:"Dados Geoespaciais Formulário de Apresentação",atlas:"Atlas",audio:"Áudio",diagram:"Diagrama",sDocument:"Documento",globe:"Globo",map:"Mapa",model:"Modelo",multiMediaPresentation:"Apresentação Multimédia",profile:"Perfil",rasterDigitalData:"Dados Digitais Raster",remoteSensingImage:"Imagem de sensoriamento remoto",section:"Secção",spreadsheet:"Folha de cálculo",tabularDigitalData:"Dados tabulares digitais",vectorDigitalData:"Dados vectoriais digitais",video:"Vídeo",view:"Visualização"},serinfo:{caption:"Informação Series",sername:"Nome da série",issue:"Identificação de Problema"},pubinfo:{caption:"Informações da Publicação",pubplace:"Local de Publicação",publish:"Publicador"},othercit:"Outros Detalhes Citação",onlink:"Linkage Online (URL)"},cntinfo:{caption:"Informação de Contacto",section:{primary:"Principal",phoneAndEmail:"Telefone e correio electrónico",hoursAndInstructions:"Horas e Instruções"},cntorgp:{caption:"Por organização",cntorg:"Organização",cntper:"Pessoa"},cntperp:{caption:"Por Pessoa",cntper:"Pessoa",cntorg:"Organização"},cntpos:"Posição",cntaddr:{caption:"Endereço",addrtype:{caption:"Tipo de Endereço",mailing:"Divulgação",physical:"Físico",mailingAndPhysical:"Divulgação e Físico"},address:"Endereço",city:"Cidade",state:"Estado",postal:"Código Postal",country:"País"},cntvoice:"Voz",cnttdd:"TDD/TTY Telefone (deficientes auditivos)",cntfax:"Fax",cntemail:"Endereço de Correio Electrónico",hours:"Horas",cntinst:"Instruções"},dataqual:{caption:"Informação de Qualidade de Dados",section:{attributeAccuracy:"Atributo Precisão",logicalConsistency:"Consistência lógica",completeness:"Perfeição",positionalAccuracy:"Precisão Posicional",lineage:"Linhagem",cloudCover:"Nebulosidade"},attracc:{caption:"Atributo Precisão",attraccr:"Atributo Precisão Relatório",qattracc:{caption:"Atributo Quantitativo Accuracy Assessment",attraccv:"Atributo Valor Precisão",attracce:"Atributo Precisão Explicação"}},logic:"Relatório Lógico de Consistência",complete:"Relatório de integralidade",posacc:"Precisão Posicional",horizpa:{caption:"Precisão posicional Horizontal",horizpar:"Relatório Posicional Precisão Horizontal",qhorizpa:{caption:"Quantitativa Horizontal Posicional Accuracy Assessment",horizpav:"Precisão Valor Horizontal Posicional",horizpae:"Explicação Precisão Horizontal Posicional"}},vertacc:{caption:"Precisão Posicional Vertical",vertaccr:"Relatório Posicional Precisão Vertical",qvertpa:{caption:"Quantitativa Vertical Posicional Accuracy Assessment",vertaccv:"Valor Precisão Vertical Posicional",vertacce:"Explicação Precisão Vertical Posicional"}},lineage:{caption:"Linhagem"},srcinfo:{caption:"Informações da fonte",srccite:"Citação de Fonte",srcscale:"Fonte Escala Denominador",typesrc:{caption:"Tipo de Fonte Media",paper:"Papel",stableBaseMaterial:"Base material estável",microfiche:"Microficha",microfilm:"Microfilme",audiocassette:"Cassete áudio",chart:"Gráfico",filmstrip:"Faixa de película",transparency:"Transparência",videocassette:"Vídeo-cassete",videodisc:"Disco de vídeo",videotape:"Fita de vídeo",physicalModel:"Modelo físico",computerProgram:"Programa de computador",disc:"Disco",cartridgeTape:"Fita do cartucho",magneticTape:"Fita magnética",online:"Online",cdrom:"CD-ROM",electronicBulletinBoard:"Boletim electrónico",electronicMailSystem:"Sistema de correio electrónico"},srctime:"Fonte Período de Tempo de Conteúdo",srccurr:"Fonte de Referência Actualidade",srccitea:"Fonte Abreviatura de Citação",srccontr:"Fonte Contribuição"},procstep:{caption:"Etapa de Processo",procdesc:"Descrição de Processo",srcused:"Fonte Usado Abreviatura de Citação",procdate:"Processo de Data",proctime:"Tempo de Processo",srcprod:"Fonte Produzido Abreviatura de Citação",proccont:"Processo de contato"},cloud:"Nebulosidade"},distinfo:{caption:"Informação de Distribuição",section:{distributor:"Distribuidor",description:"Descrição",orderProcess:"Processo de Encomenda",prerequisites:"Pré-requisitos",availability:"Disponibilidade"},distrib:"Distribuidor",resdesc:{caption:"Descrição de Recurso",liveData:"Dados e Mapas ao Vivo",downloadableData:"Dados Descarregáveis",offlineData:"Dados Offline",staticMapImages:"Mapa de Imagens Estáticas",sDocument:"Outros Documentos",application:"Aplicações",geographicService:"Serviços Geográficos",clearingHouse:"Clearinghouses",mapFiles:"Ficheiros de Mapas",geographicActivies:"Actividades Geográficas"},distliab:"Declaração de Responsabilidade de Distribuição",custom:"Processo de Ordem de encomenda",techpreq:"Pré-requisitos técnicos",availabl:"Disponibilidade"},eainfo:{caption:"Informação de Entidade e Atributo",overview:"Descrição de Visão Geral",eaover:"Visão Geral de Entidade e Atributo",eadetcit:"Entidade e Citação de Detalhe de Atributo"},idinfo:{caption:"Informações de identificação",section:{timeAndStatus:"Hora e Estado",constraints:"Restrições",contact:"Contacto",additional:"Adicional"},citeinfo:"Citação",descript:{caption:"Descrição",sAbstract:"Abstracto",purpose:"Finalidade",supplinf:"Informações Complementares"},timeperd:{caption:"Período de Conteúdo",current:{caption:"Referência Actualidade",groundCondition:"Condição do Solo",publicationDate:"Data De Publicação"}},status:{caption:"Estado",progress:{caption:"Progresso",complete:"Completo",inWork:"Em Trabalho",planned:"Planeado"},update:{caption:"Manutenção e Actualização Frequente",continual:"Contínuo",daily:"Diariamente",weekly:"Semanalmente",monthly:"Mensalmente",annually:"Anualmente",unknown:"Desconhecido",asNeeded:"Conforme necessário",irregular:"Irregular",nonePlanned:"Não Planeado"}},spdom:{caption:"Estender",bounding:{caption:"Coordenadas Delimitadoras",westbc:"Longitude Delimitadora Oeste",eastbc:"Longitude Delimitadora Este",northbc:"Longitude Delimitadora Norte",southbc:"Longitude Delimitadora Sul"}},keywords:{caption:"Keywords",theme:"Tema",place:"Local",stratum:"Estrato",temporal:"Temporal",thesaursus:"Léxico Associado",delimited:"Palavras-chave",themektIsoTopicCategory:"Tópico ISO...",themektIsoTopicDialog:"Tópico ISO",placektGnis:"Sistema de Informação de Nomes Geográficos"},accconst:"Restrições de acesso",useconst:"Utilize restrições",ptcontac:"Ponto de Contato para o Recurso",browse:{caption:"Navegar Gráfico",browsen:"Navegar URL de Gráfico",browsed:"Navegar Descrição de Ficheiro Gráfico",browset:"Navegar Tipo de Ficheiro Gráfico"},datacred:"Conjunto de Dados de Crédito",secinfo:{caption:"segurança da Informação",secsys:"Sistema de Classificação de Segurança",secclass:{caption:"Classificação de Segurança",topSecret:"Ultra Secreto",secret:"Secreto",confidential:"Confidencial",restricted:"Restrito",unclassified:"Não Classificado",sensitive:"Sensitivo"},sechandl:"Manuseamento de Descrição de Segurança"},sNative:"Ambiente de Conjunto de Dados Nativos",crossref:"Referência Cruzada"},metadata:{idinfo:"Identificação",dataqual:"Qualidade",spdoinfo:"Organização de Dados Espaciais",spref:"Referência Espacial",eainfo:"Entidade e Atributo",distinfo:"Distribuição",metainfo:"Metadados"},metainfo:{caption:"Metadados de Informação",section:{dates:"Datas de Metadados",contact:"Contacto Metadados",standard:"Padrão de Metadados",additional:"Adicional"},metd:"Data Metadados",metrd:"Data da avaliação Metadados",metfrd:"Data de Futura Revisão Metadados",metstdn:"Nome Standard Metadados",metstdv:"Versão Standard dos Metadados",metac:"Restrições de Acesso Metadados",metuc:"Uso de Restrições Metadados",metsi:{caption:"Informação de Segurança Metadados",metscs:"Sistema de Classificação de Segurança Metadados",metsc:"Classificação de Segurança Metadados",metshd:"Classificação de Handling de Segurança Metadados"}},spref:{caption:"Referência Informações Espaciais",horizsys:{caption:"Sistema de Coordenadas Horizontal",geograph:{caption:"Geográficos",latres:"Resolução Latitude",longres:"Resolução Longitude",geogunit:{caption:"Unidades Coordenadas Geográficas",decimalDegrees:"Graus decimais",decimalMinutes:"Minutos decimais",decimalSeconds:"Segundos decimais",degreesAndDecimalMinutes:"Graus e minutos decimais",degreesMinutesAndDecimalSeconds:"Graus, minutos e segundos decimais",radians:"Radians",grads:"grads"}},planar:{caption:"planar"},local:{caption:"Local",localdes:"Descrição Local",localgeo:"Informação Georeferencial Local"},geodetic:{caption:"Modelo Geodésico",horizdn:{caption:"Nome Dado Horizontal",nad83:"Dado Norte Americano de 1983",nad27:"Dado Norte Americano de 1927"},ellips:{caption:"Nome Elipsóide",grs80:"Sistema de Referencia Geodetic 80",clarke1866:"Clarke 1866"},semiaxis:"Eixo Semi-maior",denflat:"Denominador de Relação Flattening"}},vertdef:{caption:"Coordenar Sistema Vertical",altsys:{caption:"Sistema Altitude",altdatum:{caption:"Nome de Altitude Dado",navd88:"Dado Vertical Norte Americano de 1988",ngvd29:"Dado Vertical Geodetic Nacional de 1929"},altres:"Resolução de Altitude",altunits:{caption:"Unidades Distância de Altitude",meters:"Metros",feet:"Pés"},altenc:{caption:"Altitude Método Encoding",explicit:"Coordenadas explicitas de elevação incluem coordenadas horizontais",implicit:"Coordenadas implícitas",attribute:"Valores de atributo"}},depthsys:{caption:"Sistema de profundidade",depthdn:{caption:"Nome de Profundidade Datum",option1:"Superfícies Locais",option2:"Dado Gráfico; Dadopara soar redução",option3:"Mais baixa maré astronómica",option4:"Maior maré astronómica",option5:"A média de água baixa",option6:"A média de água de alta",option7:"Nível médio do mar",option8:"Levantamento fundiário datum",option9:"A média de baixas nascentes de água",option10:"A média de nascentes de água elevados",option11:"A média de maré morta baixa",option12:"A média de maré morta alta",option13:"A média mais baixa de água baixa",option14:"A média de nascentes baixas",option15:"A média de águas elevadas",option16:"A média de água baixa",option17:"A média mais baixa de água elevado",option18:"maré grande",option19:"Tropic inferior água baixa",option20:"Maré morta",option21:"Alta água",option22:"Água de alta superior",option23:"Baixa água",option24:"Dado de baixa-mar",option25:"Água Menor mais baixa",option26:"Água Menor",option27:"Água baixa normal",option28:"Nível da maré média",option29:"Nascente Indian de água baixa",option30:"Água alta cheia e carga",option31:"Água baixa cheia e carga",option32:"Dados do Rio Colúmbia",option33:"Dados de água baixa do Gulf Coast",option34:"Nascentes baixas Equatoriais",option35:"Menor maré astronómica aproximada",option36:"Nenhuma correcção"},depthres:"Resolução de profundidade",depthdu:{caption:"Unidades de Distância de Profundidade",meters:"Metros",feet:"Pés"},depthem:{caption:"Profundidade Método de Codificação",explicit:"Coordenadas de profundidade explicitas, incluído coordenadas horizontais",implicit:"Coordenadas implícitas",attribute:"Valores de atributo"}}}},timeinfo:{caption:"Informação de Período de Tempo",sngdate:"Dados Únicos",mdattim:"Dados Múltiplos",rngdates:"Intervalo de Data",caldate:"Data",time:"Tempo",begdate:"Dados de Começo",begtime:"Tempo de Começo",enddate:"Dados de Término",endtime:"Hora de Término"}});