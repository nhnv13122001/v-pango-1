export const TYPES = {
  STRING: 'String',
  DOUBLE: 'Double',
  LONG: 'Long',
  BOOLEAN: 'Boolean',
  TIMESTAMP: 'Timestamp'
}

export const OPERATORS = {
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  LIKES: 'likes',
  NOT_LIKES: 'notLikes',
  CONTAIN_ALL: 'containAll',
  EXIST: 'exist',
  WILDCARD: 'wildcard',
  GT: 'gt',
  GTE: 'gte',
  LT: 'lt',
  LTE: 'lte',
  BETWEEN: 'between',
  RELATIVE_TIME: 'relativeTime'
}

export const dataModel = [
  {
    id: 'Email_Interaction',
    name: 'Email Interaction',
    category: 'Activity',
    objectModel: 'EmailInteraction',
    sysModel: false,
    order: 7,
    sysIndex: 'email_interaction',
    requiredDateField: false,
    dateFields: [],
    customerSegment: false,
    contactEmailSegment: true,
    contactPhoneSegment: true,
    leadSegment: false,
    deviceSegment: false,
    zouidSegment: true,
    fbpsidSegment: true,
    gcidSegment: false,
    idField: 'ID',
    customerField: null,
    contactEmailField: 'EMAIL',
    contactPhoneField: 'PHONE',
    leadField: null,
    deviceField: null,
    zouidField: 'ZOUID',
    fbpsidField: 'FB_PSID',
    gcidField: null,
    hasCustomField: true,
    defaultDateField: 'Action date',
    defaultEsDateField: 'action_at',
    attributes: [
      {
        key: 'event_name',
        sysIndexKey: 'EVENT',
        name: 'Event Name',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'event_at',
        sysIndexKey: 'EVENT_AT',
        name: 'Event Time',
        dataType: 'Timestamp',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'action_at',
        sysIndexKey: 'ACTION_AT',
        name: 'Action Time',
        dataType: 'Timestamp',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'message_id',
        sysIndexKey: 'MESSAGE_ID',
        name: 'Message Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'email',
        sysIndexKey: 'EMAIL',
        name: 'Email',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'service_provider',
        sysIndexKey: 'SERVICE_PROVIDER',
        name: 'Service Provider',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'ga_tid',
        sysIndexKey: 'GA_TID',
        name: 'Google Tid',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'ga_cid',
        sysIndexKey: 'GA_CID',
        name: 'Google Cid',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'o2o_cid',
        sysIndexKey: 'O2O_CID',
        name: 'O2O Cookie',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zoa_id',
        sysIndexKey: 'ZOA_ID',
        name: 'ZOA Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zouid',
        sysIndexKey: 'ZOUID',
        name: 'ZOA Uid',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'fb_psid',
        sysIndexKey: 'FB_PSID',
        name: 'FB Psid',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'fb_page_id',
        sysIndexKey: 'FB_PAGE_ID',
        name: 'Page Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'link',
        sysIndexKey: 'LINK',
        name: '1st Link',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'link2',
        sysIndexKey: 'LINK2',
        name: '2nd Link',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'template_id',
        sysIndexKey: 'TEMPLATE_ID',
        name: 'Email Template Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'campaign_id',
        sysIndexKey: 'CAMPAIGN_ID',
        name: 'Campaign Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'tags',
        sysIndexKey: 'TAGS',
        name: 'Tags',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'createdAt',
        sysIndexKey: 'CREATED_AT',
        name: 'System Created Time',
        dataType: 'Timestamp',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'updatedAt',
        sysIndexKey: 'UPDATED_AT',
        name: 'System Updated Time',
        dataType: 'Timestamp',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'recordStatus',
        sysIndexKey: 'RECORD_STATUS',
        name: 'Record Status',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'customField01',
        sysIndexKey: 'customField01',
        name: 'Field 01',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'customFieldList01',
        sysIndexKey: 'customFieldList01',
        name: 'Field List 01',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'customFieldDouble01',
        sysIndexKey: 'customFieldDouble01',
        name: 'Field Double 01',
        dataType: 'Double',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'customFieldLong01',
        sysIndexKey: 'customFieldLong01',
        name: 'Field Long 01',
        dataType: 'Long',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'customFieldBoolean01',
        sysIndexKey: 'customFieldBoolean01',
        name: 'Field Boolean 01',
        dataType: 'Boolean',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'customFieldTimestamp01',
        sysIndexKey: 'customFieldTimestamp01',
        name: 'Field Timestamp 01',
        dataType: 'Timestamp',
        refType: null,
        ctxMasterDataRef: null
      }
    ],
    ctxInitCustomField: false,
    ctxDefaultDateField: null
  },
  {
    id: 'MasterData',
    name: 'Master Data',
    category: 'Master Data',
    objectModel: 'MasterData',
    sysModel: false,
    order: 1,
    sysIndex: 'master_data',
    requiredDateField: false,
    dateFields: [],
    customerSegment: false,
    contactEmailSegment: false,
    contactPhoneSegment: false,
    leadSegment: false,
    deviceSegment: false,
    zouidSegment: false,
    fbpsidSegment: false,
    gcidSegment: false,
    idField: 'id',
    customerField: null,
    contactEmailField: null,
    contactPhoneField: null,
    leadField: null,
    deviceField: null,
    zouidField: null,
    fbpsidField: null,
    gcidField: null,
    hasCustomField: true,
    defaultDateField: 'Created Time',
    defaultEsDateField: 'createdAt',
    attributes: [
      {
        key: 'id',
        sysIndexKey: 'id',
        name: 'Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'name',
        sysIndexKey: 'name',
        name: 'Name',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'refId',
        sysIndexKey: 'refId',
        name: 'Ref Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'code',
        sysIndexKey: 'code',
        name: 'Code',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'value',
        sysIndexKey: 'value',
        name: 'Value',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'description',
        sysIndexKey: 'description',
        name: 'Description',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'parentType',
        sysIndexKey: 'parentType',
        name: 'Parent Type',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'parentCode',
        sysIndexKey: 'parentCode',
        name: 'Parent Code',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'updatedAt',
        sysIndexKey: 'updatedAt',
        name: 'Updated Time',
        dataType: 'Timestamp',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'updatedBy',
        sysIndexKey: 'updatedBy',
        name: 'Updated By',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      }
    ],
    ctxInitCustomField: false,
    ctxDefaultDateField: null
  },
  {
    id: 'ZaloOA_MiniApp_Log',
    name: 'Zalo Mini App Logs',
    category: 'Social Network',
    objectModel: 'ZaloOA_MiniApp_Log',
    sysModel: false,
    order: 3,
    sysIndex: 'zalo_mini_app_log',
    requiredDateField: false,
    dateFields: [],
    customerSegment: false,
    contactEmailSegment: true,
    contactPhoneSegment: true,
    leadSegment: false,
    deviceSegment: false,
    zouidSegment: true,
    fbpsidSegment: false,
    gcidSegment: false,
    idField: 'id',
    customerField: null,
    contactEmailField: 'email',
    contactPhoneField: 'phone',
    leadField: null,
    deviceField: null,
    zouidField: 'zoaUserId',
    fbpsidField: null,
    gcidField: null,
    hasCustomField: false,
    defaultDateField: 'Event Time',
    defaultEsDateField: 'eventAt',
    attributes: [
      {
        key: 'id',
        sysIndexKey: 'id',
        name: 'Record Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zaloAppId',
        sysIndexKey: 'appType',
        name: 'Zalo App Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'enabledConnId',
        sysIndexKey: 'enabledConnId',
        name: 'Connection Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'sessionId',
        sysIndexKey: 'sessionId',
        name: 'Session Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'cdpAppId',
        sysIndexKey: 'cdpAppId',
        name: 'Cdp App Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zaloUserAppId',
        sysIndexKey: 'zaloUserAppId',
        name: 'Zalo User App Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zmaZone',
        sysIndexKey: 'zmaZone',
        name: 'ZMA Zone (Saas, Private)',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'devZaloAppId',
        sysIndexKey: 'devZaloAppId',
        name: 'Zalo Developer App',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'appTemplateType',
        sysIndexKey: 'appTemplateType',
        name: 'ZMA Template',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'appType',
        sysIndexKey: 'appType',
        name: 'App Type',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zoaId',
        sysIndexKey: 'zoaId',
        name: 'ZOA Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zoaUserId',
        sysIndexKey: 'zoaUserId',
        name: 'ZOA User Id',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zoaUserName',
        sysIndexKey: 'zoaUserName',
        name: 'Zalo User Name',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'zoaUserAvatar',
        sysIndexKey: 'zoaUserAvatar',
        name: 'Zalo User Avatar',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'userIdByFOA',
        sysIndexKey: 'userIdByFOA',
        name: 'Got User Id from ZaloByOA',
        dataType: 'Boolean',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'phone',
        sysIndexKey: 'phone',
        name: 'Phone',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'email',
        sysIndexKey: 'email',
        name: 'Email',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'eventTrigger',
        sysIndexKey: 'eventTrigger',
        name: 'Event Trigger',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'eventName',
        sysIndexKey: 'eventName',
        name: 'Event Name',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'eventAt',
        sysIndexKey: 'eventAt',
        name: 'Event Time',
        dataType: 'Timestamp',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'eventData',
        sysIndexKey: 'eventData',
        name: 'Event Data',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'tid',
        sysIndexKey: 'tid',
        name: 'GA Tracking Id (tid)',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'cid',
        sysIndexKey: 'cid',
        name: 'GA Client Id (cid)',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      {
        key: 'utmSource',
        sysIndexKey: 'utmSource',
        name: 'UTM Source',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'utmMedium',
        sysIndexKey: 'utmMedium',
        name: 'UTM Medium',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'utmCampaign',
        sysIndexKey: 'utmCampaign',
        name: 'UTM Campaign',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'utmKeyword',
        sysIndexKey: 'utmKeyword',
        name: 'UTM Keyword',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'utmContent',
        sysIndexKey: 'utmContent',
        name: 'UTM Content',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'userAgent',
        sysIndexKey: 'userAgent',
        name: 'User Agent',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'device',
        sysIndexKey: 'device',
        name: 'Device',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'brwType',
        sysIndexKey: 'brwType',
        name: 'Browser Type',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'brwName',
        sysIndexKey: 'brwName',
        name: 'Browser Name',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'brwVersion',
        sysIndexKey: 'brwVersion',
        name: 'Browser Version',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'osName',
        sysIndexKey: 'osName',
        name: 'OS Name',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'osProducer',
        sysIndexKey: 'osProducer',
        name: 'OS Producer',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'osVersion',
        sysIndexKey: 'osVersion',
        name: 'OS Version',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'osVersionMj',
        sysIndexKey: 'osVersionMj',
        name: 'OS Version Major',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'hourKey',
        sysIndexKey: 'hourKey',
        name: 'Hour Key',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'dayKey',
        sysIndexKey: 'dayKey',
        name: 'Day Key',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'retry',
        sysIndexKey: 'retry',
        name: 'Retry',
        dataType: 'Boolean',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'screenView',
        sysIndexKey: 'screenView',
        name: 'Screen View',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      },
      {
        key: 'retryReason',
        sysIndexKey: 'retryReason',
        name: 'Retry Reason',
        dataType: 'String',
        refType: 'null',
        ctxMasterDataRef: null
      }
    ],
    ctxInitCustomField: false,
    ctxDefaultDateField: null
  }
]

export const operators: Record<string, { value: string; label: string }[]> = {
  [TYPES.STRING]: [
    { value: OPERATORS.EQUALS, label: 'Equals' },
    { value: OPERATORS.NOT_EQUALS, label: 'Not Equals' },
    { value: OPERATORS.LIKES, label: 'Likes' },
    { value: OPERATORS.NOT_LIKES, label: 'Not Likes' },
    { value: OPERATORS.CONTAIN_ALL, label: 'Contains All' },
    { value: OPERATORS.EXIST, label: 'Exist' },
    { value: OPERATORS.WILDCARD, label: 'Wildcard' }
  ],
  [TYPES.DOUBLE]: [
    { value: OPERATORS.NOT_EQUALS, label: 'Not Equals' },
    { value: OPERATORS.EQUALS, label: 'Equals' },
    { value: OPERATORS.GT, label: 'Greater than' },
    { value: OPERATORS.GTE, label: 'Greater than Equal' },
    { value: OPERATORS.LT, label: 'Less than' },
    { value: OPERATORS.LTE, label: 'Less than Equal' },
    { value: OPERATORS.BETWEEN, label: 'Between' },
    { value: OPERATORS.EXIST, label: 'Exist' }
  ],
  [TYPES.LONG]: [
    { value: OPERATORS.NOT_EQUALS, label: 'Not Equals' },
    { value: OPERATORS.EQUALS, label: 'Equals' },
    { value: OPERATORS.GT, label: 'Greater than' },
    { value: OPERATORS.GTE, label: 'Greater than Equal' },
    { value: OPERATORS.LT, label: 'Less than' },
    { value: OPERATORS.LTE, label: 'Less than Equal' },
    { value: OPERATORS.BETWEEN, label: 'Between' },
    { value: OPERATORS.EXIST, label: 'Exist' }
  ],
  [TYPES.BOOLEAN]: [
    { value: OPERATORS.EQUALS, label: 'Equals' },
    { value: OPERATORS.NOT_EQUALS, label: 'Not Equals' },
    { value: OPERATORS.EXIST, label: 'Exist' }
  ],
  [TYPES.TIMESTAMP]: [
    { value: OPERATORS.EQUALS, label: 'Equals' },
    { value: OPERATORS.NOT_EQUALS, label: 'Not Equals' },
    { value: OPERATORS.BETWEEN, label: 'Between' },
    { value: OPERATORS.GTE, label: 'Greater than Equal' },
    { value: OPERATORS.LTE, label: 'Less than Equal' },
    { value: OPERATORS.RELATIVE_TIME, label: 'Relative Time' },
    { value: OPERATORS.EXIST, label: 'Exist' }
  ]
}

export const response = {
  moreFilters: [
    {
      attribute: 'customField01',
      index: 1,
      operator: 'equals',
      textValues: ['12312'],
      valueType: 'String',
      metaAttr: {
        key: 'customField01',
        sysIndexKey: 'customField01',
        name: 'Field 01',
        dataType: 'String',
        refType: null,
        ctxMasterDataRef: null
      },
      display: 'Field 01'
    }
  ],
  pageSize: 1
}
