import { vi } from 'vitest'

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

const environmentTemplateMock = {
  name: 'Mock Environment Template',
  description: 'This is a mock template',
  sys: { id: 'mockEnvironmentTemplateId', version: 1 },
  entities: {
    contentTypeTemplates: [
      {
        id: 'mockContentTypeTemplatesId',
        basedOn: {
          space: makeLink('space', 'mockSpaceId'),
          contentType: makeLink('ContentType', 'mockContentTypeId'),
          environment: makeLink('Environment', 'mockEnvironmentId'),
        },
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
    environment: makeLink('Environments', 'mockEnvironmentId'),
    template: makeLink('EnvironmentTemplate', 'mockEnvironmentTemplateId'),
    status: 'succeeded',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: makeLink('User', 'mockUserId'),
    updatedBy: makeLink('User', 'mockUserId'),
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
}

const personalAccessTokenMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'PersonalAccessToken',
  }),
  name: 'My Token',
  revokeAt: null,
  scopes: ['content_management_manage'],
}

const accessTokenMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AccessToken',
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

const appActionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppAction',
    organization: { sys: { id: 'organziation-id' } },
    appDefinition: { sys: { id: 'app-definiton-id' } },
  }),
  name: 'nice app action',
  url: 'https://www.example.com',
  type: 'endpoint',
}

const appActionCallMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppActionCall',
    appDefinition: { sys: { id: 'app-definiton-id' } },
    action: { sys: { id: 'app-action-id' } },
    space: { sys: { id: 'space-id' } },
    environment: { sys: { id: 'environment-id' } },
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

const appEventSubscriptionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppEventSubscription',
    organization: { sys: { id: 'org-id' } },
    appDefinition: { sys: { type: 'link', linkType: 'AppDefinition', id: 'app-definition-id' } },
  }),
  targetUrl: 'https://contentful.fake/event-processor',
  topics: ['Entry.create'],
}

const appKeyMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppKey',
    organization: { sys: { id: 'org-id' } },
    appDefinition: { sys: { type: 'link', linkType: 'AppDefinition', id: 'app-definition-id' } },
  }),
  jwk: {
    alg: 'RS256',
    kty: 'RSA',
    use: 'sig',
    x56: ['x5c'],
    kid: 'kid',
    x5t: 'x5t',
  },
}

const appAccessTokenMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppAccessToken',
    space: { sys: { id: 'space-id' } },
    environment: { sys: { id: 'environment-id' } },
    appDefinition: { sys: { id: 'app-definition-id' } },
    expiresAt: '2020-03-30T13:38:37.000Z',
  }),
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImViZWY2MDJlLTMxZGItNGMzYi1iZjAwL',
  id: undefined,
}

const appDetailsMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppDetails',
    appDefinition: { sys: { type: 'link', linkType: 'AppDefinition', id: 'app-definition-id' } },
  }),
  icon: { value: 'some_image', type: 'base64' },
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
    automationTags: [],
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

const appInstallationsForOrgMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'array',
  }),
  items: [cloneDeep(appInstallationMock)],
  includes: {
    Environment: [cloneDeep(environmentMock)],
  },
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
    environment: {
      sys: {
        id: 'environment-id',
        type: 'Link',
        linkType: 'Environment',
      },
    },
    parentEntity: {
      sys: {
        id: 'workflow-id',
        type: 'Link',
        linkType: 'Workflow',
        ref: 'versions.3',
      },
    },
  },
  body: 'Body',
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

export const workflowStepMock = {
  id: sysMock.id,
  name: 'In review',
  description: 'Test WorkflowStep',
  actions: [
    {
      action: {
        sys: {
          type: 'Link',
          linkType: 'AppAction',
          id: 'some-app-action-id',
        },
      },
      body: 'some-body',
      headers: [
        {
          key: 'value',
        },
      ],
    },
  ],
  annotations: ['cf-color-blue', 'cf-icon-research'],
}

export const workflowDefinitionMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'WorkflowDefinition',
    version: 1,
    environment: makeLink('Environment', 'master'),
    isLocked: false,
  }),
  name: 'Test WorkflowDefinition',
  description: 'this is a definition of a workflow',
  applicableEntities: [
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
  permissions: [
    {
      action: 'publish',
      effect: 'deny',
      actor: {
        sys: {
          type: 'Link',
          linkType: 'User',
          id: 'some-user-id',
        },
      },
    },
  ],
}

export const workflowMock = {
  stepId: 'some-step-id',
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Workflow',
    version: 1,
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    updatedBy: makeLink('User', 'user-id'),
    workflowDefinition: makeLink('WorkflowDefinition', 'wf-def-id'),
  }),
}

export const workflowsChangelogEntryMock = {
  event: 'stepChanged',
  eventBy: makeLink('User', 'user-id'),
  eventAt: 'eventatdate',
  workflow: makeLink('Workflow', 'workflow-id'),
  workflowDefinition: makeLink('WorkflowDefinition', 'workflow-definition-id'),
  entity: makeLink('Entity', 'entity-id'),
  stepId: sysMock.id,
  stepAnnotations: ['cf-color-blue', 'cf-icon-research'],
  stepName: 'In review',
}

export const uiConfigMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'UIConfig',
    space: {
      sys: { id: 'space-id' },
    },
    environment: {
      sys: { id: 'environment-id' },
    },
  }),
  assetListViews: [],
  entryListViews: [],
}

export const userUIConfigMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'UserUIConfig',
    space: {
      sys: { id: 'space-id' },
    },
    environment: {
      sys: { id: 'environment-id' },
    },
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

function setupEntitiesMock() {
  const entitiesMock = {
    appAction: {
      wrapAppAction: vi.fn(),
      wrapAppActionCollection: vi.fn(),
    },
    appActionCall: {
      wrapAppActionCall: vi.fn(),
      wrapAppActionCallResponse: vi.fn(),
    },
    appDefinition: {
      wrapAppDefinition: vi.fn(),
      wrapAppDefinitionCollection: vi.fn(),
    },
    appUpload: {
      wrapAppUpload: vi.fn(),
      wrapAppUploadCollection: vi.fn(),
    },
    appBundle: {
      wrapAppBundle: vi.fn(),
      wrapAppBundleCollection: vi.fn(),
    },
    appSignedRequest: {
      wrapAppSignedRequest: vi.fn(),
    },
    appSigningSecret: {
      wrapAppSigningSecret: vi.fn(),
    },
    appEventSubscription: {
      wrapAppEventSubscription: vi.fn(),
    },
    appKey: {
      wrapAppKey: vi.fn(),
      wrapAppKeyCollection: vi.fn(),
    },
    appAccessToken: {
      wrapAppAccessToken: vi.fn(),
    },
    appDetails: {
      wrapAppDetails: vi.fn(),
    },
    space: {
      wrapSpace: vi.fn(),
      wrapSpaceCollection: vi.fn(),
    },
    environment: {
      wrapEnvironment: vi.fn(),
      wrapEnvironmentCollection: vi.fn(),
    },
    bulkAction: {
      wrapBulkAction: vi.fn(),
    },
    contentType: {
      wrapContentType: vi.fn(),
      wrapContentTypeCollection: vi.fn(),
    },
    entry: {
      wrapEntry: vi.fn(),
      wrapEntryCollection: vi.fn(),
    },
    asset: {
      wrapAsset: vi.fn(),
      wrapAssetCollection: vi.fn(),
    },
    assetKey: {
      wrapAssetKey: vi.fn(),
    },
    locale: {
      wrapLocale: vi.fn(),
      wrapLocaleCollection: vi.fn(),
    },
    webhook: {
      wrapWebhook: vi.fn(),
      wrapWebhookCollection: vi.fn(),
    },
    spaceMember: {
      wrapSpaceMember: vi.fn(),
      wrapSpaceMemberCollection: vi.fn(),
    },
    spaceMembership: {
      wrapSpaceMembership: vi.fn(),
      wrapSpaceMembershipCollection: vi.fn(),
    },
    teamSpaceMembership: {
      wrapTeamSpaceMembership: vi.fn(),
      wrapTeamSpaceMembershipCollection: vi.fn(),
    },
    organizationMembership: {
      wrapOrganizationMembership: vi.fn(),
      wrapOrganizationMembershipCollection: vi.fn(),
    },
    organizationAppInstallations: {
      wrapOrganizationAppInstallations: vi.fn(),
      wrapOrganizationAppInstallationsCollection: vi.fn(),
    },
    team: {
      wrapTeam: vi.fn(),
      wrapTeamCollection: vi.fn(),
    },
    teamMembership: {
      wrapTeamMembership: vi.fn(),
      wrapTeamMembershipCollection: vi.fn(),
    },
    organizationInvitation: {
      wrapOrganizationInvitation: vi.fn(),
    },
    role: {
      wrapRole: vi.fn(),
      wrapRoleCollection: vi.fn(),
    },
    release: {
      wrapRelease: vi.fn(),
      wrapReleaseCollection: vi.fn(),
    },
    releaseAction: {
      wrapReleaseAction: vi.fn(),
    },
    apiKey: {
      wrapApiKey: vi.fn(),
      wrapApiKeyCollection: vi.fn(),
    },
    previewApiKey: {
      wrapPreviewApiKey: vi.fn(),
      wrapPreviewApiKeyCollection: vi.fn(),
    },
    editorInterface: {
      wrapEditorInterface: vi.fn(),
      wrapEditorInterfaceCollection: vi.fn(),
    },
    upload: {
      wrapUpload: vi.fn(),
    },
    snapshot: {
      wrapSnapshot: vi.fn(),
      wrapSnapshotCollection: vi.fn(),
    },
    organization: {
      wrapOrganization: vi.fn(),
      wrapOrganizationCollection: vi.fn(),
    },
    extension: {
      wrapExtension: vi.fn(),
      wrapExtensionCollection: vi.fn(),
    },
    appInstallation: {
      wrapAppInstallation: vi.fn(),
      wrapAppInstallationCollection: vi.fn(),
    },
    user: {
      wrapUser: vi.fn(),
      wrapUserCollection: vi.fn(),
    },
    personalAccessToken: {
      wrapPersonalAccessToken: vi.fn(),
      wrapPersonalAccessTokenCollection: vi.fn(),
    },
    accessToken: {
      wrapAccessToken: vi.fn(),
      wrapAccessTokenCollection: vi.fn(),
    },
    usage: {
      wrapUsageCollection: vi.fn(),
    },
    environmentAlias: {
      wrapEnvironmentAlias: vi.fn(),
      wrapEnvironmentAliasCollection: vi.fn(),
    },
    scheduledAction: {
      wrapScheduledAction: vi.fn(),
      wrapScheduledActionCollection: vi.fn(),
    },
    task: {
      wrapTask: vi.fn(),
      wrapTaskCollection: vi.fn(),
    },
    comment: {
      wrapComment: vi.fn(),
      wrapCommentCollection: vi.fn(),
    },
    workflowDefinition: {
      wrapWorkflowDefinition: vi.fn(),
      wrapWorkflowDefinitionCollection: vi.fn(),
    },
    workflow: {
      wrapWorkflow: vi.fn(),
      wrapWorkflowCollection: vi.fn(),
    },
    workflowsChangelogEntry: {
      wrapWorkflowsChangelogEntry: vi.fn(),
      wrapWorkflowsChangelogEntryCollection: vi.fn(),
    },
    environmentTemplate: {
      wrapEnvironmentTemplate: vi.fn(),
      wrapEnvironmentTemplateCollection: vi.fn(),
    },
    EnvironmentTemplateInstallation: {
      wrapEnvironmentTemplateInstallation: vi.fn(),
      wrapEnvironmentTemplateInstallationCollection: vi.fn(),
    },
  }

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
