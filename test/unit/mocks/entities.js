/* global jest */
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

const organizationMock = {
  sys: assign(cloneDeep(sysMock), {
    type: 'Organization'
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
  upload: uploadMock,
  organization: organizationMock
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
      wrapSpace: jest.fn(),
      wrapSpaceCollection: jest.fn()
    },
    contentType: {
      wrapContentType: jest.fn(),
      wrapContentTypeCollection: jest.fn()
    },
    entry: {
      wrapEntry: jest.fn(),
      wrapEntryCollection: jest.fn()
    },
    asset: {
      wrapAsset: jest.fn(),
      wrapAssetCollection: jest.fn()
    },
    locale: {
      wrapLocale: jest.fn(),
      wrapLocaleCollection: jest.fn()
    },
    webhook: {
      wrapWebhook: jest.fn(),
      wrapWebhookCollection: jest.fn()
    },
    spaceMembership: {
      wrapSpaceMembership: jest.fn(),
      wrapSpaceMembershipCollection: jest.fn()
    },
    role: {
      wrapRole: jest.fn(),
      wrapRoleCollection: jest.fn()
    },
    apiKey: {
      wrapApiKey: jest.fn(),
      wrapApiKeyCollection: jest.fn()
    },
    editorInterface: {
      wrapEditorInterface: jest.fn()
    },
    upload: {
      wrapUpload: jest.fn()
    },
    organization: {
      wrapOrganizationCollection: jest.fn()
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
  uploadMock,
  organizationMock
}
