import sinon from 'sinon'

import cloneDeep from 'lodash/cloneDeep'
import { makeLink, makeVersionedLink } from '../../utils'

const linkMock = {
  id: 'linkid',
  type: 'Link',
  linkType: 'linkType',
}

const sysMock = {
  type: 'Type',
  id: 'id',
  space: { sys: cloneDeep(linkMock) },
  createdAt: 'createdatdate',
  updatedAt: 'updatedatdate',
}

const spaceMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Space',
  }),
  name: 'name',
  locales: ['en-US'],
}

const environmentMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Environment',
    space: spaceMock,
  }),
  name: 'name',
}

const userMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'User',
  }),
  firstName: 'Dwight',
  lastName: 'Schrute',
  avatarUrl: 'https://images.contentful.com/abcd1234',
  email: 'dwight@dundermifflin.com',
  activated: true,
  signInCount: 1,
  confirmed: true,
}

const personalAccessTokenMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'PersonalAccessToken',
  }),
  name: 'My Token',
  revokeAt: null,
  scopes: ['content_management_manage'],
}

const appBundleMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppBundle',
    organization: { sys: { id: 'organziation-id' } },
    appDefinition: { sys: { id: 'app-definition-id' } },
  }),
  files: [
    {
      name: 'build/asset-manifest.json',
      size: 1066,
      md5: '38OsiWdvD1sZJzEXx8jiaA==',
    },
    {
      name: 'build/index.html',
      size: 2010,
      md5: 'xkXIzwdDGA4ynvPYBpvRww==',
    },
  ],
}

const appDefinitionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppDefinition',
    organization: { sys: { id: 'organziation-id' } },
  }),
  name: 'AI Image Tagging',
  src: 'https://ai-image-tagging.app-host.com/frontend/',
  locations: [
    {
      location: 'app-config',
    },
    {
      location: 'entry-field',
      fieldTypes: [{ type: 'Symbol' }],
    },
  ],
}

const appUploadMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppUpload',
    organization: { sys: { id: 'organization-id' } },
  }),
}

const appSignedRequestMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppSignedRequest',
    appDefinition: { sys: { type: 'link', linkType: 'AppDefinition', id: 'app-definition-id' } },
  }),
  additionalHeaders: {
    'x-contentful-signature': '9b78a9203175d414b70b5b259b56f5d5507f6920997054533fd1da9b1eb442d6',
    'x-contentful-signed-headers':
      'x-contentful-environment-id,x-contentful-signed-headers,x-contentful-space-id,x-contentful-timestamp,x-contentful-user-id',
    'x-contentful-timestamp': '1631112126937',
    'x-contentful-space-id': 'space-id',
    'x-contentful-environment-id': 'master',
    'x-contentful-user-id': 'user-id',
  },
}

const appSigningSecretMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppSigningSecret',
    appDefinition: { sys: { type: 'link', linkType: 'AppDefinition', id: 'app-definition-id' } },
  }),
  redactedValue: 'wI74',
}

const appMetadataMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppMetadata',
    appDefinition: { sys: { type: 'link', linkType: 'AppDefinition', id: 'app-definition-id' } },
  }),
  icon: 'some_image',
}

const bulkActionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'BulkAction',
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    status: 'created',
  }),
  action: 'validate',
  payload: {
    entities: {
      sys: { type: 'Array' },
      items: [makeLink('Entry', 'entry-id'), makeLink('Asset', 'asset-id')],
    },
  },
}

const bulkActionPublishMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'BulkAction',
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    status: 'created',
  }),
  action: 'publish',
  payload: {
    entities: {
      sys: { type: 'Array' },
      items: [makeVersionedLink('Entry', 'entry-id', 1), makeVersionedLink('Asset', 'asset-id', 2)],
    },
  },
}

const contentTypeMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'ContentType',
    space: {
      sys: { id: 'space-id' },
    },
    environment: {
      sys: { id: 'environment-id' },
    },
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
      required: false,
    },
  ],
}
const snapShotMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Snapshot',
  }),
  fields: {
    field1: 'str',
  },
}
const entryMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Entry',
    contentType: Object.assign(cloneDeep(linkMock), { linkType: 'ContentType' }),
    environment: {
      sys: { id: 'environment-id' },
    },
    locale: 'locale',
  }),
  fields: {
    field1: 'str',
  },
}

const entryMockWithTags = {
  ...entryMock,
  metadata: {
    tags: [
      {
        name: 'entrytag',
        sys: {
          visibility: 'private',
          type: 'Tag',
          id: 'entrytag',
        },
      },
    ],
  },
}

const editorInterfaceMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'EditorInterface',
    contentType: { sys: Object.assign(cloneDeep(linkMock), { linkType: 'ContentType' }) },
    space: { sys: Object.assign(cloneDeep(linkMock), { linkType: 'Space' }) },
    environment: { sys: Object.assign(cloneDeep(linkMock), { linkType: 'Environment' }) },
  }),
  controls: [
    {
      fieldId: 'fieldId',
      widgetId: 'singleLine',
    },
  ],
}
const assetMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Asset',
    locale: 'locale',
    space: {
      sys: { id: 'space-id' },
    },
    environment: {
      sys: { id: 'environment-id' },
    },
  }),
  fields: {
    field1: 'str',
  },
}

const assetKeyMock = {
  policy: 'assetKey.policyJWT',
  secret: 'assetKeySecret',
}

const assetMockWithTags = {
  ...assetMock,
  metadata: {
    tags: [
      {
        name: 'tagname',
        sys: {
          type: 'Tag',
          id: 'tagname',
        },
      },
    ],
  },
}

const assetWithFilesMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Asset',
    locale: 'locale',
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
            id: 'some_random_id',
          },
        },
      },
      locale2: {
        contentType: 'image/svg',
        fileName: 'filename.svg',
        uploadFrom: {
          sys: {
            type: 'Link',
            linkType: 'Upload',
            id: 'some_random_id',
          },
        },
      },
    },
  },
}

const uploadMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Upload',
    id: 'some_random_id',
    space: {
      sys: { id: 'space-id' },
    },
    environment: {
      sys: { id: 'environment-id' },
    },
  }),
}

const localeMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    environment: {
      sys: { id: 'environment-id' },
    },
    type: 'Locale',
  }),
  name: 'English',
  code: 'en',
  contentDeliveryApi: true,
  contentManagementApi: true,
  default: true,
}

const membershipMock = {
  type: 'TeamSpaceMembership',
  id: 'randomId',
  version: 3,
  space: Object.assign(cloneDeep(linkMock), { linkType: 'Space' }),
  team: { sys: Object.assign(cloneDeep(linkMock), { linkType: 'Team' }) },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

const webhookMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'WebhookDefinition',
    space: {
      sys: { id: 'space-id' },
    },
  }),
}

const spaceMemberMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'SpaceMember',
  }),
}

const spaceMembershipMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'SpaceMembership',
  }),
}

const teamSpaceMembershipMock = {
  sys: Object.assign(cloneDeep(membershipMock), {
    type: 'TeamSpaceMembership',
    team: {
      sys: {
        id: 'team_id',
        type: 'Link',
        linkType: 'Space',
      },
    },
    space: {
      sys: {
        id: 'space_id',
        type: 'Link',
        linkType: 'Space',
      },
    },
  }),
  roles: [{ sys: Object.assign(cloneDeep(linkMock), { linkType: 'Role' }) }],
}

const organizationMembershipMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'OrganizationMembership',
  }),
}

const teamMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Team',
    organization: { sys: { id: 'org-id' } },
  }),
}

const teamMembershipMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'TeamMembership',
    team: { sys: { id: 'team-id' } },
    organization: { sys: { id: 'org-id' } },
    organizationMembership: { sys: { id: 'org-membership-id' } },
  }),
}

const organizationInvitationMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'organizationInvitation',
  }),
}

const roleMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Role',
  }),
}

const releaseMock = {
  sys: {
    ...sysMock,
    type: 'Release',
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    updatedBy: makeLink('User', 'user-id'),
    version: 1,
  },
  entities: {
    sys: { type: 'Array' },
    items: [makeLink('Entry', 'entry-id'), makeLink('Asset', 'asset-id')],
  },
  title: 'Release Mock',
}

const releaseActionMock = {
  sys: {
    ...sysMock,
    type: 'ReleaseAction',
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    updatedBy: makeLink('User', 'user-id'),
    completedAt: '2021-05-18T10:00:00Z',
    release: makeLink('Release', 'release-id'),
    status: 'created',
  },
  action: 'publish',
}

const releaseActionValidateMock = {
  ...releaseActionMock,
  action: 'validate',
}

const releaseActionUnpublishMock = {
  ...releaseActionMock,
  action: 'unpublish',
}

const apiKeyMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'ApiKey',
  }),
}

const previewApiKeyMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'ApiKey',
  }),
}

const organizationMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Organization',
  }),
  name: 'name',
}

const usageMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Usage',
  }),
}

const extensionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Extension',
    space: {
      sys: { id: 'space-id' },
    },
    environment: {
      sys: { id: 'environment-id' },
    },
  }),
  name: 'Some Extension',
}

const appInstallationMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppInstallation',
    environment: {
      sys: { id: 'environment-id' },
    },
    appDefinition: {
      sys: {
        id: '<app_definition_id>',
      },
    },
  }),
}

const environmentAliasMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'EnvironmentAlias',
  }),
  environment: environmentMock,
}

const taskMock = {
  sys: {
    id: 'task-id',
    space: {
      sys: cloneDeep(linkMock),
    },
    version: 1,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    type: 'Task',
    environment: {
      sys: {
        id: 'environment-id',
        type: 'Link',
        linkType: 'Environment',
      },
    },
    parentEntity: {
      sys: {
        id: 'entry-id',
        type: 'Link',
        linkType: 'Entry',
      },
    },
  },
  body: 'Body',
  assignedTo: {
    sys: {
      id: 'user-id',
      type: 'User',
    },
  },
  status: 'active',
}

const errorMock = {
  config: {
    url: 'requesturl',
    headers: {},
  },
  data: {},
  response: {
    status: 404,
    statusText: 'Not Found',
  },
}

export const tagMock = {
  name: 'My tag',
  sys: {
    id: 'my-tag',
    space: {
      sys: cloneDeep(linkMock),
    },
    version: 1,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    type: 'Tag',
    environment: {
      sys: {
        id: 'environment-id',
        type: 'Link',
        linkType: 'Environment',
      },
    },
  },
}

export const scheduledActionMock = {
  sys: {
    id: 'my-scheduled-action',
    space: {
      sys: cloneDeep(linkMock),
    },
    version: 1,
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    type: 'ScheduledAction',
    status: 'scheduled',
  },
  action: 'publish',
  entity: { sys: cloneDeep(linkMock) },
  environment: { sys: cloneDeep(linkMock) },
  scheduledFor: {
    datetime: '2006-01-02T15:04:05-0700',
    timezone: 'Asia/Kolkata',
  },
}

export const scheduledActionCollectionMock = {
  sys: {
    type: 'Array',
  },
  pages: {},
  limit: 1,
  items: [cloneDeep(scheduledActionMock)],
}

const entryWithReferencesMock = {
  sys: {
    type: 'Array',
  },
  items: [entryMock],
}

const entryReferencesCollectionMock = {
  sys: {
    type: 'Array',
  },
  limit: 1,
  items: [cloneDeep(entryWithReferencesMock)],
  includes: [makeLink('Entry', 'entry-1'), makeLink('Entry', 'entry-2')],
}

const mocks = {
  apiKey: apiKeyMock,
  appBundle: appBundleMock,
  appDefinition: appDefinitionMock,
  appInstallation: appInstallationMock,
  appUpload: appUploadMock,
  appSignedRequest: appSignedRequestMock,
  appSigningSecret: appSigningSecretMock,
  appMetadata: appMetadataMock,
  asset: assetMock,
  assetKey: assetKeyMock,
  assetWithTags: assetMockWithTags,
  bulkAction: bulkActionMock,
  bulkActionPublish: bulkActionPublishMock,
  contentType: contentTypeMock,
  editorInterface: editorInterfaceMock,
  entry: entryMock,
  entryWithTags: entryMockWithTags,
  entryWithReferences: entryWithReferencesMock,
  entryReferencesCollection: entryReferencesCollectionMock,
  environmentAlias: environmentAliasMock,
  error: errorMock,
  extension: extensionMock,
  link: linkMock,
  locale: localeMock,
  organization: organizationMock,
  organizationInvitation: organizationInvitationMock,
  organizationMembership: organizationMembershipMock,
  personalAccessToken: personalAccessTokenMock,
  previewApiKey: previewApiKeyMock,
  role: roleMock,
  release: releaseMock,
  releaseAction: releaseActionMock,
  releaseActionValidate: releaseActionValidateMock,
  releaseActionUnpublish: releaseActionUnpublishMock,
  scheduledAction: scheduledActionMock,
  snapshot: snapShotMock,
  spaceMember: spaceMemberMock,
  spaceMembership: spaceMembershipMock,
  sys: sysMock,
  tag: tagMock,
  task: taskMock,
  team: teamMock,
  teamMembership: teamMembershipMock,
  teamSpaceMembership: teamSpaceMembershipMock,
  upload: uploadMock,
  usage: usageMock,
  user: userMock,
  webhook: webhookMock,
}

function cloneMock(name) {
  return cloneDeep(mocks[name])
}

function mockCollection(entityMock) {
  return {
    total: 1,
    skip: 0,
    limit: 100,
    items: [entityMock],
  }
}

function setupEntitiesMock(rewiredModuleApi) {
  const entitiesMock = {
    appDefinition: {
      wrapAppDefinition: sinon.stub(),
      wrapAppDefinitionCollection: sinon.stub(),
    },
    appUpload: {
      wrapAppUpload: sinon.stub(),
      wrapAppUploadCollection: sinon.stub(),
    },
    appBundle: {
      wrapAppBundle: sinon.stub(),
      wrapAppBundleCollection: sinon.stub(),
    },
    appSignedRequest: {
      wrapAppSignedRequest: sinon.stub(),
    },
    appSigningSecret: {
      wrapAppSigningSecret: sinon.stub(),
    },
    appMetadata: {
      wrapAppMetadata: sinon.stub(),
    },
    space: {
      wrapSpace: sinon.stub(),
      wrapSpaceCollection: sinon.stub(),
    },
    environment: {
      wrapEnvironment: sinon.stub(),
      wrapEnvironmentCollection: sinon.stub(),
    },
    bulkAction: {
      wrapBulkAction: sinon.stub(),
    },
    contentType: {
      wrapContentType: sinon.stub(),
      wrapContentTypeCollection: sinon.stub(),
    },
    entry: {
      wrapEntry: sinon.stub(),
      wrapEntryCollection: sinon.stub(),
    },
    asset: {
      wrapAsset: sinon.stub(),
      wrapAssetCollection: sinon.stub(),
    },
    assetKey: {
      wrapAssetKey: sinon.stub(),
    },
    locale: {
      wrapLocale: sinon.stub(),
      wrapLocaleCollection: sinon.stub(),
    },
    webhook: {
      wrapWebhook: sinon.stub(),
      wrapWebhookCollection: sinon.stub(),
    },
    spaceMember: {
      wrapSpaceMember: sinon.stub(),
      wrapSpaceMemberCollection: sinon.stub(),
    },
    spaceMembership: {
      wrapSpaceMembership: sinon.stub(),
      wrapSpaceMembershipCollection: sinon.stub(),
    },
    teamSpaceMembership: {
      wrapTeamSpaceMembership: sinon.stub(),
      wrapTeamSpaceMembershipCollection: sinon.stub(),
    },
    organizationMembership: {
      wrapOrganizationMembership: sinon.stub(),
      wrapOrganizationMembershipCollection: sinon.stub(),
    },
    team: {
      wrapTeam: sinon.stub(),
      wrapTeamCollection: sinon.stub(),
    },
    teamMembership: {
      wrapTeamMembership: sinon.stub(),
      wrapTeamMembershipCollection: sinon.stub(),
    },
    organizationInvitation: {
      wrapOrganizationInvitation: sinon.stub(),
    },
    role: {
      wrapRole: sinon.stub(),
      wrapRoleCollection: sinon.stub(),
    },
    release: {
      wrapRelease: sinon.stub(),
      wrapReleaseCollection: sinon.stub(),
    },
    releaseAction: {
      wrapReleaseAction: sinon.stub(),
    },
    apiKey: {
      wrapApiKey: sinon.stub(),
      wrapApiKeyCollection: sinon.stub(),
    },
    previewApiKey: {
      wrapPreviewApiKey: sinon.stub(),
      wrapPreviewApiKeyCollection: sinon.stub(),
    },
    editorInterface: {
      wrapEditorInterface: sinon.stub(),
      wrapEditorInterfaceCollection: sinon.stub(),
    },
    upload: {
      wrapUpload: sinon.stub(),
    },
    snapshot: {
      wrapSnapshot: sinon.stub(),
      wrapSnapshotCollection: sinon.stub(),
    },
    organization: {
      wrapOrganization: sinon.stub(),
      wrapOrganizationCollection: sinon.stub(),
    },
    extension: {
      wrapExtension: sinon.stub(),
      wrapExtensionCollection: sinon.stub(),
    },
    appInstallation: {
      wrapAppInstallation: sinon.stub(),
      wrapAppInstallationCollection: sinon.stub(),
    },
    user: {
      wrapUser: sinon.stub(),
      wrapUserCollection: sinon.stub(),
    },
    personalAccessToken: {
      wrapPersonalAccessToken: sinon.stub(),
      wrapPersonalAccessTokenCollection: sinon.stub(),
    },
    usage: {
      wrapUsageCollection: sinon.stub(),
    },
    environmentAlias: {
      wrapEnvironmentAlias: sinon.stub(),
      wrapEnvironmentAliasCollection: sinon.stub(),
    },
    scheduledAction: {
      wrapScheduledAction: sinon.stub(),
      wrapScheduledActionCollection: sinon.stub(),
    },
    task: {
      wrapTask: sinon.stub(),
      wrapTaskCollection: sinon.stub(),
    },
  }
  rewiredModuleApi.__Rewire__('entities', entitiesMock)

  return entitiesMock
}

export {
  appBundleMock,
  appInstallationMock,
  appDefinitionMock,
  appUploadMock,
  appSignedRequestMock,
  appSigningSecretMock,
  appMetadataMock,
  linkMock,
  sysMock,
  spaceMock,
  bulkActionMock,
  contentTypeMock,
  editorInterfaceMock,
  entryMock,
  entryWithReferencesMock,
  entryReferencesCollectionMock,
  extensionMock,
  assetMock,
  assetWithFilesMock,
  assetKeyMock,
  localeMock,
  webhookMock,
  spaceMemberMock,
  spaceMembershipMock,
  teamSpaceMembershipMock,
  organizationMembershipMock,
  teamMock,
  teamMembershipMock,
  organizationInvitationMock,
  releaseMock,
  roleMock,
  apiKeyMock,
  previewApiKeyMock,
  errorMock,
  cloneMock,
  mockCollection,
  setupEntitiesMock,
  uploadMock,
  organizationMock,
  snapShotMock,
  userMock,
  personalAccessTokenMock,
  environmentMock,
  usageMock,
  environmentAliasMock,
  taskMock,
}
