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
  space: makeLink('Space', 'mockSpaceId'),
  createdAt: 'createdatdate',
  updatedAt: 'updatedatdate',
  version: 0,
}

const spaceMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Space',
    organization: makeLink('Organization', 'mockOrganizationId'),
  }),
  name: 'name',
}

const environmentMock = {
  sys: {
    ...cloneDeep(sysMock),
    space: makeLink('Space', 'mockSpaceId'),
    status: makeLink('Status', 'mockStatusId'),
  },
  name: 'name',
}

const environmentTemplateMock = {
  name: 'Mock Environment Template',
  description: 'This is a mock template',
  versionName: 'mockedVersionName',
  sys: Object.assign(cloneDeep(sysMock), {
    version: 1,
    organization: makeLink('Organization', 'mockOrganizationId'),
  }),
  entities: {
    contentTypeTemplates: [
      {
        id: 'mockContentTypeTemplatesId',
        basedOn: {
          space: makeLink('Space', 'mockSpaceId'),
          contentType: makeLink('ContentType', 'mockContentTypeId'),
          environment: makeLink('Environment', 'mockEnvironmentId'),
        },
        name: 'mockedContentTypeTemplate',
        description: 'mockedContentTypeTemplateDescription',
        displayField: 'mockedField',
        fields: [],
      },
    ],
    editorInterfaceTemplates: [
      {
        contentTypeTemplate: {
          ...makeLink('ContentTypeTemplate', 'mockContentTypeTemplatesId'),
        },
        controls: [{ fieldId: 'testApp', widgetNamespace: 'app', widgetId: 'private-app-id' }],
      },
    ],
  },
}

const environmentTemplateInstallationMock = {
  sys: {
    id: 'mockEnvironmentTemplateInstallationId',
    type: 'EnvironmentTemplateInstallation',
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
    template: makeVersionedLink('Template', 'mockTemplateId', 1),
    status: 'succeeded',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: makeLink('User', 'mockUserId'),
    updatedBy: makeLink('User', 'mockUserId'),
    version: 1,
  },
}

const environmentTemplateValidationMock = {
  sys: {
    type: 'Array',
    environment: { sys: { type: 'Link', linkType: 'Environment', id: 'mockEnvironmentId' } },
    space: { sys: { type: 'Link', linkType: 'Space', id: 'mockSpaceId' } },
    changeSet: {
      sys: { type: 'Link', linkType: 'ChangeSet', id: 'mockChangeSetId' },
    },
  },
  items: [],
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
  '2faEnabled': true,
  cookieConsentData: 'mocked',
}

const personalAccessTokenMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'PersonalAccessToken',
  }),
  name: 'My Token',
  revokedAt: null,
  scopes: ['content_management_manage'],
}

const accessTokenMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AccessToken',
  }),
  name: 'My Token',
  revokedAt: null,
  scopes: ['content_management_manage'],
}

const appBundleMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppBundle',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
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

const appActionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppAction',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
  }),
  name: 'nice app action',
  url: 'https://www.example.com',
  type: 'endpoint',
  category: 'Custom',
  parameters: [],
}

const appActionCallMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppActionCall',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
    action: makeLink('Action', 'mockActionId'),
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
  }),
}

const appActionCallResponseMock = {
  sys: {
    id: 'call-id',
    createdAt: '2022-02-20T10:00:00Z',
    type: 'AppActionCall',
  },
  request: {
    url: 'https://example.com/webhook',
    method: '',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'token123',
    },
    body: 'OK',
  },
  response: {
    url: 'https://example.com/webhook',
    method: '',
    headers: {
      'Content-Type': 'application/json',
    },
    body: 'OK',
    statusCode: 200,
  },
  statusCode: 200,
  errors: [],
  eventType: 'message.created',
  url: 'https://example.com/webhook',
  requestAt: '2022-02-20T10:00:00Z',
  responseAt: '2022-02-20T10:01:00Z',
}

const appActionCallDetailsMock = {
  callId: 'call-id',
  appActionId: 'app-action-id',
  spaceId: 'space-id',
  environmentId: 'environment-id',
}

const appDefinitionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppDefinition',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
    action: makeLink('Action', 'mockActionId'),
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
    shared: true,
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
  parameters: {
    instance: [
      {
        name: 'my-bool-param',
        id: 'param',
        type: 'Boolean',
      },
    ],
    installation: [
      {
        name: 'my-secret-param',
        id: 'param',
        type: 'Secret',
      },
    ],
  },
}

const appUploadMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppUpload',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
    action: makeLink('Action', 'mockActionId'),
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
    expiresAt: '2022-02-20T10:01:00Z',
  }),
}

const appSignedRequestMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppSignedRequest',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
    action: makeLink('Action', 'mockActionId'),
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
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
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
  }),
  redactedValue: 'wI74',
}

const appEventSubscriptionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppEventSubscription',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
  }),
  targetUrl: 'https://contentful.fake/event-processor',
  topics: ['Entry.create'],
}

const appKeyMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppKey',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
  }),
  jwk: {
    alg: 'RS256',
    kty: 'RSA',
    use: 'sig',
    x5c: ['x5c'],
    kid: 'kid',
    x5t: 'x5t',
  },
}

const appAccessTokenMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppAccessToken',
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
    expiresAt: '2020-03-30T13:38:37.000Z',
  }),
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImViZWY2MDJlLTMxZGItNGMzYi1iZjAwL',
}

const appDetailsMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppDetails',
    organization: makeLink('Organization', 'mockOrganizationId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
  }),
  icon: { value: 'some_image', type: 'base64' },
}

const bulkActionMock = {
  sys: {
    ...cloneDeep(sysMock),
    environment: makeLink('Environment', 'mockEnvironmentId'),
    space: makeLink('Space', 'mockSpaceId'),
    createdBy: makeLink('User', 'user-id'),
    status: 'created',
    type: 'BulkAction',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  action: 'validate',
  payload: {
    entities: {
      sys: { type: 'Array' },
      items: [makeLink('Entry', 'entry-id'), makeLink('Asset', 'asset-id')],
    },
  },
}

const bulkActionPublishMock = {
  sys: {
    ...cloneDeep(sysMock),
    environment: makeLink('Environment', 'mockEnvironmentId'),
    space: makeLink('Space', 'mockSpaceId'),
    createdBy: makeLink('User', 'user-id'),
    status: 'created',
    type: 'BulkAction',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
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
    environment: makeLink('Environment', 'mockEnvironmentId'),
    space: makeLink('Space', 'mockSpaceId'),
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
  sys: {
    ...cloneDeep(sysMock),
    type: 'Snapshot',
    snapshotType: 'mockedSnapshotTypeId',
    snapshotEntityType: 'mockedSnapshotEntityTypeId',
  },
  snapshot: {
    fields: {
      field1: 'str',
    },
  },
}
const entryMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Entry',
    space: makeLink('Space', 'mockSpaceId'),
    contentType: makeLink('ContentType', 'mockContentTypeId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
    locale: 'locale',
    automationTags: [],
  }),
  fields: {
    field1: 'str',
  },
}

const entryMockWithTags = {
  ...entryMock,
  metadata: {
    tags: [makeLink('Tag', 'mockEntryTagId')],
  },
}

const editorInterfaceMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'EditorInterface',
    space: makeLink('Space', 'mockSpaceId'),
    contentType: makeLink('ContentType', 'mockContentTypeId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
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
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
  }),
  fields: {
    title: { 'en-US': 'MockedAssetTitle' },
    file: {
      'en-US': {
        contentType: 'image/jpeg',
        fileName: 'mocked.jpeg',
        upload: 'https://example.com/mocked.jpg',
      },
    },
  },
}

const assetKeyMock = {
  policy: 'assetKey.policyJWT',
  secret: 'assetKeySecret',
}

const assetMockWithTags = {
  ...assetMock,
  metadata: {
    tags: [makeLink('Tag', 'mockAssetTagId')],
  },
}

const assetWithFilesMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Asset',
    locale: 'locale',
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
  }),
  fields: {
    title: { 'en-US': 'MockedAssetTitle' },
    file: {
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
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
  }),
}

const localeMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'mockEnvironmentId'),
    type: 'Locale',
  }),
  name: 'English',
  code: 'en',
  contentDeliveryApi: true,
  contentManagementApi: true,
  default: true,
  internal_code: 'en',
  fallbackCode: null,
  optional: false,
}

const membershipMock = {
  type: 'TeamSpaceMembership',
  id: 'randomId',
  version: 3,
  space: makeLink('Space', 'mockSpaceId'),
  team: makeLink('Team', 'mockTeamId'),
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
    space: makeLink('Space', 'mockSpaceId'),
    user: makeLink('User', 'mockUserId'),
  }),
}

const teamSpaceMembershipMock = {
  sys: Object.assign(cloneDeep(membershipMock), {
    type: 'TeamSpaceMembership',
    user: makeLink('User', 'mockUserId'),
  }),
  admin: false,
  user: makeLink('User', 'mockUserId'),
  roles: [{ sys: Object.assign(cloneDeep(linkMock), { linkType: 'Role' }) }],
}

const organizationMembershipMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'OrganizationMembership',
    user: makeLink('User', 'mockUserId'),
  }),
}

const teamMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Team',
    organization: makeLink('Organization', 'mockOrganizationId'),
    memberCount: 1,
  }),
}

const teamMembershipMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'TeamMembership',
    team: makeLink('Team', 'mockTeamId'),
    organization: makeLink('Organization', 'mockOrganizationId'),
    organizationMembership: makeLink('OrganizationMembership', 'mockOrganizationMembershipTeamId'),
  }),
}

const organizationInvitationMock = {
  sys: {
    ...cloneDeep(sysMock),
    status: 'mocked',
    type: 'organizationInvitation',
    organizationMembership: makeLink('OrganizationMembership', 'mockOrganizationMembershipTeamId'),
    user: makeLink('User', 'mockUserId'),
    invitationUrl: 'https://example.com/mocked/invitation/url',
  },
}

const roleMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Role',
    space: makeLink('Space', 'mockSpaceId'),
  }),
}

const releaseMock = {
  sys: {
    ...cloneDeep(sysMock),
    status: 'active',
    type: 'Release',
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    updatedBy: makeLink('User', 'user-id'),
    archivedBy: undefined,
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
    ...cloneDeep(sysMock),
    type: 'ReleaseAction',
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    updatedBy: makeLink('User', 'user-id'),
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
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'master'),
  }),
  extension: {
    name: 'Some Extension',
    fieldTypes: [],
  },
}

const appInstallationMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppInstallation',
    space: makeLink('Space', 'mockSpaceId'),
    appDefinition: makeLink('AppDefinition', 'mockAppDefinitionId'),
    environment: makeLink('Environment', 'master'),
  }),
}

const appInstallationsForOrgMock = {
  sys: {
    ...cloneDeep(sysMock),
    type: 'Array',
  },
  items: [cloneDeep(appInstallationMock)],
  includes: {
    Environment: [cloneDeep(environmentMock)],
  },
}

const environmentAliasMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'EnvironmentAlias',
    space: makeLink('Space', 'mockSpaceId'),
  }),
  environment: makeLink('Environment', 'master'),
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
    environment: makeLink('Environment', 'master'),
    parentEntity: makeLink('Entry', 'mockEntryId'),
  },
  body: 'Body',
  assignedTo: makeLink('User', 'mockUserId'),
  status: 'active',
}

const commentMock = {
  sys: {
    id: 'comment-id',
    space: {
      sys: cloneDeep(linkMock),
    },
    version: 1,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    type: 'Comment',
    environment: makeLink('Environment', 'master'),
    parentEntity: makeLink('Entry', 'mockEntryId'),
    parent: null,
  },
  body: 'Body',
  status: 'active',
}

const conceptMock = {
  sys: {
    id: 'concept-id',
    type: 'TaxonomyConcept',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: makeLink('User', 'mockUserId'),
    updatedBy: makeLink('User', 'mockUserId'),
    version: 1,
  },
  uri: null,
  prefLabel: {
    'en-US': 'c1',
  },
  altLabels: {
    'en-US': [],
  },
  hiddenLabels: {
    'en-US': [],
  },
  note: { 'en-US': null },
  definition: { 'en-US': null },
  editorialNote: { 'en-US': null },
  example: { 'en-US': null },
  historyNote: { 'en-US': null },
  scopeNote: { 'en-US': null },
  notations: [],
  broader: [],
  related: [],
}

const conceptSchemeMock = {
  sys: {
    id: 'concept-scheme-id',
    type: 'TaxonomyConceptScheme',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: makeLink('User', 'mockUserId'),
    updatedBy: makeLink('User', 'mockUserId'),
    version: 1,
  },
  prefLabel: {
    'en-US': 'cs1',
  },
  definition: { 'en-US': null },
  uri: null,
  totalConcepts: 0,
  concepts: [],
  topConcepts: [],
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
    version: 1,
    visibility: 'private',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    type: 'Tag',
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'master'),
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
    createdBy: makeLink('User', 'mockUserId'),
    updatedAt: 'updatedAt',
    updatedBy: makeLink('User', 'mockUserId'),
    type: 'ScheduledAction',
    status: 'scheduled',
  },
  action: 'publish',
  entity: makeLink('Entry', 'mockEntryid'),
  environment: makeLink('Environment', 'mockUserId'),
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
  total: 1,
  limit: 100,
  skip: 0,
}

const entryReferencesCollectionMock = {
  sys: {
    type: 'Array',
  },
  total: 1,
  limit: 100,
  skip: 0,
  items: [entryMock],
  includes: [makeLink('Entry', 'entry-1'), makeLink('Entry', 'entry-2')],
}

export const workflowStepMock = {
  id: sysMock.id,
  name: 'In review',
  description: 'Test WorkflowStep',
  actions: [
    {
      appActionId: 'mockAppActionId',
      appId: 'mockAppId',
      type: 'app',
    },
  ],
  annotations: ['cf-color-blue', 'cf-icon-research'],
}

export const workflowDefinitionMock = {
  sys: {
    ...cloneDeep(sysMock),
    type: 'WorkflowDefinition',
    version: 1,
    environment: makeLink('Environment', 'master'),
    isLocked: false,
    space: makeLink('Space', 'mockSpaceId'),
  },
  name: 'Test WorkflowDefinition',
  description: 'this is a definition of a workflow',
  appliesTo: [
    {
      type: 'Link',
      validations: [
        {
          linkContentType: ['ct-name'],
        },
      ],
      linkType: 'Entry',
    },
  ],
  steps: [cloneDeep(workflowStepMock)],
}

export const workflowMock = {
  stepId: 'some-step-id',
  sys: {
    ...cloneDeep(sysMock),
    type: 'Workflow',
    version: 1,
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    updatedBy: makeLink('User', 'user-id'),
    workflowDefinition: makeLink('WorkflowDefinition', 'wf-def-id'),
    entity: makeLink('Entry', 'entry-id'),
    space: makeLink('Space', 'mockSpaceId'),
  },
}

export const workflowsChangelogEntryMock = {
  event: 'stepChanged',
  eventBy: makeLink('User', 'user-id'),
  eventAt: 'eventatdate',
  workflow: makeVersionedLink('Workflow', 'workflow-id', 1),
  workflowDefinition: makeLink('WorkflowDefinition', 'workflow-definition-id'),
  entity: makeLink('Entry', 'entity-id'),
  stepId: sysMock.id,
  stepAnnotations: ['cf-color-blue', 'cf-icon-research'],
  stepName: 'In review',
}

export const uiConfigMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'UIConfig',
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'master'),
  }),
  assetListViews: [],
  entryListViews: [],
  homeViews: [],
}

export const userUIConfigMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'UserUIConfig',
    space: makeLink('Space', 'mockSpaceId'),
    environment: makeLink('Environment', 'master'),
  }),
  assetListViews: [],
  entryListViews: [],
}

const mocks = {
  apiKey: apiKeyMock,
  appAction: appActionMock,
  appActionCall: appActionCallMock,
  appActionCallDetails: appActionCallDetailsMock,
  appActionCallResponse: appActionCallResponseMock,
  appBundle: appBundleMock,
  appDefinition: appDefinitionMock,
  appInstallation: appInstallationMock,
  appUpload: appUploadMock,
  appSignedRequest: appSignedRequestMock,
  appSigningSecret: appSigningSecretMock,
  appEventSubscription: appEventSubscriptionMock,
  appKey: appKeyMock,
  appAccessToken: appAccessTokenMock,
  appDetails: appDetailsMock,
  asset: assetMock,
  assetKey: assetKeyMock,
  assetWithTags: assetMockWithTags,
  bulkAction: bulkActionMock,
  bulkActionPublish: bulkActionPublishMock,
  comment: commentMock,
  concept: conceptMock,
  conceptScheme: conceptSchemeMock,
  contentType: contentTypeMock,
  editorInterface: editorInterfaceMock,
  entry: entryMock,
  entryWithTags: entryMockWithTags,
  entryWithReferences: entryWithReferencesMock,
  entryReferencesCollection: entryReferencesCollectionMock,
  environmentAlias: environmentAliasMock,
  environmentTemplate: environmentTemplateMock,
  environmentTemplateInstallation: environmentTemplateInstallationMock,
  error: errorMock,
  extension: extensionMock,
  link: linkMock,
  locale: localeMock,
  organization: organizationMock,
  organizationInvitation: organizationInvitationMock,
  organizationMembership: organizationMembershipMock,
  appInstallationsForOrg: appInstallationsForOrgMock,
  personalAccessToken: personalAccessTokenMock,
  accessToken: accessTokenMock,
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
  uiConfig: uiConfigMock,
  user: userMock,
  userUIConfig: userUIConfigMock,
  webhook: webhookMock,
  workflowStep: workflowStepMock,
  workflowDefinition: workflowDefinitionMock,
  workflow: workflowMock,
  workflowsChangelogEntry: workflowsChangelogEntryMock,
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
    appAction: {
      wrapAppAction: sinon.stub(),
      wrapAppActionCollection: sinon.stub(),
    },
    appActionCall: {
      wrapAppActionCall: sinon.stub(),
      wrapAppActionCallResponse: sinon.stub(),
    },
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
    appEventSubscription: {
      wrapAppEventSubscription: sinon.stub(),
    },
    appKey: {
      wrapAppKey: sinon.stub(),
      wrapAppKeyCollection: sinon.stub(),
    },
    appAccessToken: {
      wrapAppAccessToken: sinon.stub(),
    },
    appDetails: {
      wrapAppDetails: sinon.stub(),
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
    organizationAppInstallations: {
      wrapOrganizationAppInstallations: sinon.stub(),
      wrapOrganizationAppInstallationsCollection: sinon.stub(),
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
    accessToken: {
      wrapAccessToken: sinon.stub(),
      wrapAccessTokenCollection: sinon.stub(),
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
    comment: {
      wrapComment: sinon.stub(),
      wrapCommentCollection: sinon.stub(),
    },
    workflowDefinition: {
      wrapWorkflowDefinition: sinon.stub(),
      wrapWorkflowDefinitionCollection: sinon.stub(),
    },
    workflow: {
      wrapWorkflow: sinon.stub(),
      wrapWorkflowCollection: sinon.stub(),
    },
    workflowsChangelogEntry: {
      wrapWorkflowsChangelogEntry: sinon.stub(),
      wrapWorkflowsChangelogEntryCollection: sinon.stub(),
    },
    environmentTemplate: {
      wrapEnvironmentTemplate: sinon.stub(),
      wrapEnvironmentTemplateCollection: sinon.stub(),
    },
    EnvironmentTemplateInstallation: {
      wrapEnvironmentTemplateInstallation: sinon.stub(),
      wrapEnvironmentTemplateInstallationCollection: sinon.stub(),
    },
  }
  rewiredModuleApi.__Rewire__('entities', entitiesMock)

  return entitiesMock
}

export {
  appActionMock,
  appActionCallMock,
  appBundleMock,
  appInstallationMock,
  appDefinitionMock,
  appUploadMock,
  appSignedRequestMock,
  appSigningSecretMock,
  appEventSubscriptionMock,
  appKeyMock,
  appAccessTokenMock,
  appDetailsMock,
  linkMock,
  sysMock,
  spaceMock,
  bulkActionMock,
  commentMock,
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
  appInstallationsForOrgMock,
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
  accessTokenMock,
  environmentMock,
  usageMock,
  environmentAliasMock,
  environmentTemplateMock,
  environmentTemplateInstallationMock,
  environmentTemplateValidationMock,
  taskMock,
}
