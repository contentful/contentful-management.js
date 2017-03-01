import sinon from 'sinon'
import assign from 'lodash/assign'
import cloneDeep from 'lodash/cloneDeep'

const linkMock = {
  id: 'linkid',
  type: 'Link',
  linkType: 'linkType'
}

const sysMock = {
  type: 'Type',
  id: 'id',
  space: cloneDeep(linkMock),
  createdAt: 'createdatdate',
  updatedAt: 'updatedatdate'
}

const spaceMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'Space'
  }),
  name: 'name',
  locales: [ 'en-US' ]
}

const contentTypeMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'ContentType'
  }),
  name: 'name',
  description: 'desc',
  displayField: 'displayfield',
  fields: [
    {
      id: 'fieldid',
      name: 'fieldname',
      type: 'Text',
      localized: true,
      required: false
    }
  ]
}

const entryMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'Entry',
    contentType: assign(cloneDeep(linkMock), {linkType: 'ContentType'}),
    locale: 'locale'
  }),
  fields: {
    field1: 'str'
  }
}
const editorInterfaceMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'EditorInterface',
    contentType: {sys: assign(cloneDeep(linkMock), {linkType: 'ContentType'})},
    space: assign(cloneDeep(linkMock), {linkType: 'Space'})
  }),
  controls: [
    {
      'fieldId': 'fieldId',
      'widgetId': 'singleLine'
    }
  ]
}
const assetMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'Asset',
    locale: 'locale'
  }),
  fields: {
    field1: 'str'
  }
}

const assetWithFilesMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'Asset',
    locale: 'locale'
  }),
  fields: {
    files: {
      locale: {
        contentType: 'image/svg',
        fileName: 'filename.svg',
        uploadFrom: {
          sys: {
            type: 'Link',
            linkType: 'Upload',
            id: 'some_random_id'
          }
        }
      },
      locale2: {
        contentType: 'image/svg',
        fileName: 'filename.svg',
        uploadFrom: {
          sys: {
            type: 'Link',
            linkType: 'Upload',
            id: 'some_random_id'
          }
        }
      }
    }
  }
}

const uploadMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'Upload',
    id: 'some_random_id'
  })
}

const localeMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'Locale'
  }),
  name: 'English',
  code: 'en',
  contentDeliveryApi: true,
  contentManagementApi: true,
  default: true
}

const webhookMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'WebhookDefinition'
  })
}

const spaceMembershipMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'SpaceMembership'
  })
}

const roleMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'Role'
  })
}

const apiKeyMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'ApiKey'
  })
}

const errorMock = {
  config: {
    url: 'requesturl',
    headers: {}
  },
  data: {},
  response: {
    status: 404,
    statusText: 'Not Found'
  }
}

const mocks = {
  link: linkMock,
  sys: sysMock,
  contentType: contentTypeMock,
  editorInterface: editorInterfaceMock,
  entry: entryMock,
  asset: assetMock,
  locale: localeMock,
  webhook: webhookMock,
  spaceMembership: spaceMembershipMock,
  role: roleMock,
  apiKey: apiKeyMock,
  error: errorMock,
  upload: uploadMock
}

function cloneMock (name) {
  return cloneDeep(mocks[name])
}

function mockCollection (entityMock) {
  return {
    total: 1,
    skip: 0,
    limit: 100,
    items: [entityMock]
  }
}

function setupEntitiesMock (rewiredModuleApi) {
  const entitiesMock = {
    space: {
      wrapSpace: sinon.stub(),
      wrapSpaceCollection: sinon.stub()
    },
    contentType: {
      wrapContentType: sinon.stub(),
      wrapContentTypeCollection: sinon.stub()
    },
    entry: {
      wrapEntry: sinon.stub(),
      wrapEntryCollection: sinon.stub()
    },
    asset: {
      wrapAsset: sinon.stub(),
      wrapAssetCollection: sinon.stub()
    },
    locale: {
      wrapLocale: sinon.stub(),
      wrapLocaleCollection: sinon.stub()
    },
    webhook: {
      wrapWebhook: sinon.stub(),
      wrapWebhookCollection: sinon.stub()
    },
    spaceMembership: {
      wrapSpaceMembership: sinon.stub(),
      wrapSpaceMembershipCollection: sinon.stub()
    },
    role: {
      wrapRole: sinon.stub(),
      wrapRoleCollection: sinon.stub()
    },
    apiKey: {
      wrapApiKey: sinon.stub(),
      wrapApiKeyCollection: sinon.stub()
    },
    editorInterface: {
      wrapEditorInterface: sinon.stub()
    },
    upload: {
      wrapUpload: sinon.stub()
    }
  }
  rewiredModuleApi.__Rewire__('entities', entitiesMock)

  return entitiesMock
}

export {
  linkMock,
  sysMock,
  spaceMock,
  contentTypeMock,
  editorInterfaceMock,
  entryMock,
  assetMock,
  assetWithFilesMock,
  localeMock,
  webhookMock,
  spaceMembershipMock,
  roleMock,
  apiKeyMock,
  errorMock,
  cloneMock,
  mockCollection,
  setupEntitiesMock,
  uploadMock
}
