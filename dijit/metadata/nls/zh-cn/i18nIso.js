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

define({documentTypes:{data:{caption:"ISO 19115 (数据)",description:""},service:{caption:"ISO 19119 (服务)",description:""},gmi:{caption:"ISO 19115-2 (影像和格网化数据)",description:""}},general:{reference:"引用"},sections:{metadata:"元数据",identification:"标识",distribution:"分发",quality:"质量",acquisition:"收购"},metadataSection:{identifier:"标识符",contact:"联系人",date:"日期",standard:"标准工具",reference:"引用"},identificationSection:{citation:"引用信息",description:"描述",contact:"联系人",thumbnail:"缩略图",keywords:"关键字",constraints:"约束",resource:"资源",resourceTab:{representation:"表示形式",language:"语言",classification:"分类",extent:"范围"},serviceResourceTab:{serviceType:"服务类型",extent:"范围",couplingType:"耦合类型",operation:"操作",operatesOn:"运行于"}},distributionSection:{},qualitySection:{scope:"范围",conformance:"一致性",lineage:"谱系"},acquisitionSection:{requirement:"要求",objective:"目标",instrument:"仪器",plan:"测量图",operation:"操作",platform:"平台",environment:"环境"},AbstractMD_Identification:{sAbstract:"摘要",purpose:"用途",credit:"制作者名单",pointOfContact:"联系方",resourceMaintenance:"维护",graphicOverview:"图形总览",descriptiveKeywords:"关键字采集",resourceConstraints:"约束"},CI_Address:{deliveryPoint:"投递点",city:"城市",administrativeArea:"行政区",postalCode:"邮政编码",country:"国家/地区",electronicMailAddress:"电子邮件地址"},CI_Citation:{title:"标题",alternateTitle:"别名",identifier:"唯一资源标识符",resource:{title:"资源标题",date:"资源日期"},specification:{title:"规范标题",date:"规范日期"}},CI_Contact:{phone:"手机",address:"地址",onlineResource:"在线资源",hoursOfService:"服务时间",contactInstructions:"联系说明"},CI_Date:{date:"日期",dateType:"日期类型"},CI_DateTypeCode:{caption:"日期类型",creation:"创建日期",publication:"发布日期",revision:"修订日期"},CI_OnLineFunctionCode:{caption:"功能",download:"下载",information:"信息",offlineAccess:"离线访问",order:"排序",search:"搜索"},CI_OnlineResource:{caption:"在线资源",linkage:"URL",protocol:"协议",applicationProfile:"应用程序配置文件",name:"名称",description:"描述",sFunction:"功能"},CI_ResponsibleParty:{caption:"联系方",individualName:"个人姓名",organisationName:"组织名称",positionName:"职位名称",contactInfo:"联系人信息",role:"角色"},CI_RoleCode:{caption:"角色",resourceProvider:"资源提供商",custodian:"管理人",owner:"所有者",user:"用户",distributor:"经销商",originator:"创作者",pointOfContact:"联系方",principalInvestigator:"首席调查员",processor:"处理者",publisher:"发布者",author:"作者"},CI_Telephone:{voice:"语音",facsimile:"传真"},DCPList:{caption:"DCP",XML:"XML",CORBA:"CORBA",JAVA:"JAVA",COM:"COM",SQL:"SQL",WebServices:"Web 服务"},DQ_ConformanceResult:{caption:"一致性结果",explanation:"说明",degree:{caption:"度",validationPerformed:"已执行验证",conformant:"一致",nonConformant:"不一致"}},DQ_DataQuality:{report:"报告"},DQ_Scope:{level:"范围(适用于质量信息)",levelDescription:"级别描述"},EX_Extent:{caption:"范围",description:"描述",geographicElement:"空间范围",temporalElement:"时间范围",verticalElement:"垂直范围"},EX_GeographicBoundingBox:{westBoundLongitude:"西部边界经度",eastBoundLongitude:"东部边界经度",southBoundLatitude:"南部边界纬度",northBoundLatitude:"北部边界纬度"},EX_GeographicDescription:{caption:"地理描述"},EX_TemporalExtent:{TimePeriod:{beginPosition:"开始日期",endPosition:"结束日期"}},EX_VerticalExtent:{minimumValue:"最小值",maximumValue:"最大值",verticalCRS:"垂直 CRS"},Length:{caption:"长度",uom:"测量单位",km:"公里",m:"米",mi:"英里",ft:"英尺"},LI_Lineage:{statement:"谱系说明"},MD_BrowseGraphic:{fileName:"浏览图形 URL",fileDescription:"浏览图形标题",fileType:"浏览图形类型"},MD_ClassificationCode:{unclassified:"未分类",restricted:"受限",confidential:"秘密",secret:"机密",topSecret:"绝密"},MD_Constraints:{caption:"使用约束",useLimitation:"使用局限性"},MD_DataIdentification:{spatialRepresentationType:"空间表示类型",spatialResolution:"空间分辨率",language:"资源语言",supplementalInformation:"附加"},MD_DigitalTransferOptions:{onLine:"在线"},MD_Distribution:{distributionFormat:"分发格式",transferOptions:"传输选项"},MD_Format:{name:"格式名称",version:"格式版本"},MD_Identifier:{caption:"URI",identifierCaption:"标识符",code:"代码"},MD_Keywords:{delimitedCaption:"关键字",thesaurusName:"关联主题词表"},MD_KeywordTypeCode:{caption:"关键字类型",discipline:"领域",place:"地点",stratum:"层级",temporal:"时间",theme:"主题"},MD_LegalConstraints:{caption:"法律限制",accessConstraints:"访问限制",useConstraints:"使用限制",otherConstraints:"其他限制"},MD_MaintenanceFrequencyCode:{caption:"频率",continual:"持续",daily:"每天",weekly:"每周",fortnightly:"每两周",monthly:"每月",quarterly:"季度",biannually:"一年两次",annually:"每年",asNeeded:"根据需要",irregular:"不定期",notPlanned:"未计划",unknown:"未知"},MD_Metadata:{caption:"元数据",fileIdentifier:"文件标识符",language:"元数据语言",hierarchyLevel:"等级分级",hierarchyLevelName:"等级分级名称",contact:"元数据联系人",dateStamp:"元数据日期",metadataStandardName:"元数据标准名称",metadataStandardVersion:"元数据标准版",referenceSystemInfo:"参考系统",identificationInfo:"标识",distributionInfo:"分发",dataQualityInfo:"质量"},MD_ProgressCode:{caption:"进度代码",completed:"已完成",historicalArchive:"历史归档",obsolete:"废弃",onGoing:"正在进行",planned:"已计划",required:"必需",underDevelopment:"研发中"},MD_RepresentativeFraction:{denominator:"分母"},MD_Resolution:{equivalentScale:"等量比例",distance:"距离"},MD_RestrictionCode:{copyright:"版权所有",patent:"专利",patentPending:"专利申请中",trademark:"商标",license:"许可",intellectualPropertyRights:"知识产权",restricted:"受限",otherRestrictions:"其他约束条件"},MD_ScopeCode:{attribute:"属性",attributeType:"属性类型",collectionHardware:"采集硬件",collectionSession:"采集会话",dataset:"数据集",series:"系列",nonGeographicDataset:"非地理数据集",dimensionGroup:"尺寸组",feature:"要素",featureType:"要素类型",propertyType:"属性类型",fieldSession:"字段会话",software:"软件",service:"服务",model:"模型",tile:"切片"},MD_ScopeDescription:{attributes:"属性",features:"要素",featureInstances:"要素实例",attributeInstances:"属性实例",dataset:"数据集",other:"其他"},MD_SecurityConstraints:{caption:"安全限制",classification:"分类",userNote:"用户注意事项",classificationSystem:"分类系统",handlingDescription:"处理描述"},MD_SpatialRepresentationTypeCode:{caption:"空间表示类型",vector:"矢量",grid:"格网",textTable:"文本表",tin:"TIN",stereoModel:"立体模型",video:"视频"},MD_TopicCategoryCode:{caption:"主题类别",boundaries:"行政管理边界",farming:"农林牧渔",climatologyMeteorologyAtmosphere:"大气与气候",biota:"生物与生态",economy:"商业与经济",planningCadastre:"地籍",society:"文化、社会与人口统计",elevation:"高程与衍生产品",environment:"环境与资源保护",structure:"设施与建筑",geoscientificInformation:"地质与地球物理",health:"人类健康与疾病",imageryBaseMapsEarthCover:"影像与底图",inlandWaters:"内陆水资源",location:"位置与大地网",intelligenceMilitary:"军事",oceans:"海洋与海湾",transportation:"交通网络",utilitiesCommunication:"公用事业和通信"},MI_ContextCode:{caption:"环境",acquisition:"收购",pass:"传递",wayPoint:"路点"},MI_EnvironmentalRecord:{caption:"环境条件",averageAirTemperature:"平均气温",maxRelativeHumidity:"最高相对湿度",maxAltitude:"最高海拔",meterologicalConditions:"气象条件"},MI_Event:{identifier:"事件标识符",time:"时间",expectedObjectiveReference:"预期目标(目标标识符)",relatedSensorReference:"相关传感器(仪器标识符)",relatedPassReference:"相关传递(平台传递标识符)"},MI_GeometryTypeCode:{point:"点",linear:"线",areal:"面",strip:"带状"},MI_Instrument:{citation:"仪器引用",identifier:"仪器标识符",sType:"仪器类型",description:"仪器描述",mountedOn:"安装于",mountedOnPlatformReference:"安装于(平台标识符)"},MI_Metadata:{acquisitionInformation:"收购"},MI_Objective:{caption:"目标",identifier:"目标标识符",priority:"目标优先级",sFunction:"目标函数",extent:"范围",pass:"平台传递",sensingInstrumentReference:"感测仪器(仪器标识符)",objectiveOccurrence:"事件",sections:{identification:"标识",extent:"范围",pass:"传递",sensingInstrument:"感测仪器",objectiveOccurrence:"事件"}},MI_ObjectiveTypeCode:{caption:"类型(目标的采集方法)",instantaneousCollection:"瞬时采集",persistentView:"持续观察",survey:"测量"},MI_Operation:{caption:"操作",description:"操作描述",citation:"操作引用",identifier:"操作标识符",status:"操作状态",objectiveReference:"相关目标(目标标识符)",planReference:"相关计划(计划标识符)",significantEventReference:"相关事件(事件标识符)",platformReference:"相关平台(平台标识符)",sections:{identification:"标识",related:"相关内容"}},MI_OperationTypeCode:{caption:"操作类型",real:"真实",simulated:"模拟",synthesized:"综合"},MI_Plan:{sType:"用于采集数据的采样几何",status:"计划状态",citation:"负责方采集请求的引用",satisfiedRequirementReference:"满足的要求(要求标识符)",operationReference:"相关操作(操作标识符)"},MI_Platform:{citation:"平台引用",identifier:"平台标识符",description:"支持仪器的平台描述",sponsor:"平台的赞助组织",instrument:"安装在平台上的仪器",instrumentReference:"仪器标识符",sections:{identification:"标识",sponsor:"赞助商",instruments:"仪器"}},MI_PlatformPass:{identifier:"平台传递标识符",extent:"平台传递范围",relatedEventReference:"相关事件(事件标识符)"},MI_PriorityCode:{critical:"重要",highImportance:"重要性 - 高",mediumImportance:"重要性 - 中",lowImportance:"重要性 - 低"},MI_RequestedDate:{requestedDateOfCollection:"采集申请日期",latestAcceptableDate:"最近可接受日期"},MI_Requirement:{caption:"要求",citation:"对要求指导资料的引用",identifier:"要求标识符",requestor:"要求的申请者",recipient:"要求结果的接收者",priority:"要求优先级",requestedDate:"申请日期",expiryDate:"有效期限",satisifiedPlanReference:"满足的计划(计划标识符)",sections:{identification:"标识",requestor:"申请者",recipient:"接收者",priorityAndDates:"优先级和日期",satisifiedPlan:"满足的计划"}},MI_SequenceCode:{caption:"顺序",start:"开始",end:"结束",instantaneous:"瞬时"},MI_TriggerCode:{caption:"触发器",automatic:"自动",manual:"手动",preProgrammed:"预先编程"},ObjectReference:{uuidref:"UUID 参考",xlinkref:"URL 参考"},RS_Identifier:{caption:"ID 加代码空格",code:"代码",codeSpace:"代码空间"},SV_CouplingType:{loose:"松散",mixed:"混合",tight:"紧密"},SV_OperationMetadata:{operationName:"操作名称",DCP:"DCP",connectPoint:"连接点"},SV_ServiceIdentification:{serviceType:"服务类型",couplingType:"耦合类型",containsOperations:"操作元数据",operatesOn:"运行于"},TM_Primitive:{indeterminatePosition:"不定向位置",indeterminates:{before:"之前",after:"之后",now:"当前时间",unknown:"未知"}},gemet:{concept:{gemetConceptKeyword:"GEMET 概念关键字",tool:"正在查找...",dialogTitle:"GEMET - 概念关键字",searchLabel:"搜索：",searchTip:"搜索 GEMET"},theme:{tool:"正在查找...",dialogTitle:"GEMET - 激励专题数据"},ioerror:"与 GEMET 服务通信时出错:{url}",searching:"正在搜索 GEMET...",noMatch:"未找到匹配的结果。",languages:{bg:"保加利亚语",cs:"捷克语",da:"丹麦语",nl:"荷兰语",en:"英语",et:"爱沙尼亚语",fi:"芬兰语",fr:"法语",de:"德国",el:"希腊语",hu:"匈牙利语",ga:"盖尔语(爱尔兰语)",it:"意大利语",lv:"拉脱维亚语",lt:"立陶宛语",mt:"马耳他语",pl:"波兰语",pt:"葡萄牙语",ro:"罗马尼亚语",sk:"斯洛伐克语",sl:"斯洛文尼亚语",es:"西班牙语",sv:"瑞典语"}}});