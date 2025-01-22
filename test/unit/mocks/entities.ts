import { vi } from 'vitest'

import cloneDeep from 'lodash/cloneDeep'
import { makeLink, makeVersionedLink } from '../../utils'
import type { ContentFields } from '../../../lib/entities/content-type-fields'
import type { AppSigningSecretProps } from '../../../lib/entities/app-signing-secret'
import type { CollectionProp, Link, MetaLinkProps, MetaSysProps } from '../../../lib/common-types'
import type { AppEventSubscriptionProps } from '../../../lib/entities/app-event-subscription'
import type { SpaceProps } from '../../../lib/entities/space'
import type { EnvironmentProps } from '../../../lib/entities/environment'
import type { EnvironmentTemplateProps } from '../../../lib/entities/environment-template'
import type {
  EnvironmentTemplateInstallationProps,
  EnvironmentTemplateValidationProps,
} from '../../../lib/entities/environment-template-installation'
import type { AppKeyProps } from '../../../lib/entities/app-key'
import type { UserProps } from '../../../lib/entities/user'
import type { PersonalAccessTokenProps } from '../../../lib/entities/personal-access-token'
import type { AppBundleProps } from '../../../lib/entities/app-bundle'
import type { AppActionProps } from '../../../lib/entities/app-action'
import type {
  AppActionCallProps,
  AppActionCallResponseData,
} from '../../../lib/entities/app-action-call'
import type { AppDetailsProps } from '../../../lib/entities/app-details'
import type {
  AppDefinitionProps,
  AppInstallationsForOrganizationProps,
} from '../../../lib/entities/app-definition'
import type { AppUploadProps } from '../../../lib/entities/app-upload'
import type { AppSignedRequestProps } from '../../../lib/entities/app-signed-request'
import type { AppAccessTokenProps } from '../../../lib/entities/app-access-token'
import type { BulkActionProps } from '../../../lib/entities/bulk-action'
import { BulkActionStatus } from '../../../lib/entities/bulk-action'
import type { ContentTypeProps } from '../../../lib/entities/content-type'
import type { SnapshotProps } from '../../../lib/entities/snapshot'
import type { EntryProps } from '../../../lib/entities/entry'
import type { EditorInterfaceProps } from '../../../lib/entities/editor-interface'
import type { FunctionProps } from '../../../lib/entities/function'
import type { AssetProps } from '../../../lib/entities/asset'
import type { AssetKeyProps } from '../../../lib/entities/asset-key'
import type { UploadProps } from '../../../lib/entities/upload'
import type { LocaleProps } from '../../../lib/entities/locale'
import type { TeamMembershipProps } from '../../../lib/entities/team-membership'
import type { TeamSpaceMembershipProps } from '../../../lib/entities/team-space-membership'
import type { WebhookProps } from '../../../lib/entities/webhook'
import type { SpaceMemberProps } from '../../../lib/entities/space-member'
import type { SpaceMembershipProps } from '../../../lib/entities/space-membership'
import type { OrganizationMembershipProps } from '../../../lib/entities/organization-membership'
import type { TeamProps } from '../../../lib/entities/team'
import type { OrganizationInvitationProps } from '../../../lib/entities/organization-invitation'
import type { RoleProps } from '../../../lib/entities/role'
import type { ReleaseProps } from '../../../lib/entities/release'
import type { ReleaseActionProps } from '../../../lib/entities/release-action'
import type { ApiKey, ApiKeyProps } from '../../../lib/entities/api-key'
import type { OrganizationProps } from '../../../lib/entities/organization'
import type { UsageProps } from '../../../lib/entities/usage'
import type { ExtensionProps } from '../../../lib/entities/extension'
import type { AppInstallationProps } from '../../../lib/entities/app-installation'
import type { EnvironmentAliasProps } from '../../../lib/entities/environment-alias'
import type { TaskProps } from '../../../lib/entities/task'
import type { CommentProps } from '../../../lib/entities/comment'
import type { ConceptProps } from '../../../lib/entities/concept'
import type { ConceptSchemeProps } from '../../../lib/entities/concept-scheme'
import type { TagProps } from '../../../lib/entities/tag'
import type {
  ScheduledActionCollection,
  ScheduledActionProps,
} from '../../../lib/entities/scheduled-action'
import { ScheduledActionStatus } from '../../../lib/entities/scheduled-action'
import type {
  WorkflowDefinitionProps,
  WorkflowStepProps,
} from '../../../lib/entities/workflow-definition'
import type { WorkflowProps } from '../../../lib/entities/workflow'
import type { WorkflowsChangelogEntryProps } from '../../../lib/entities/workflows-changelog-entry'
import type { UIConfigProps } from '../../../lib/entities/ui-config'
import type { UserUIConfigProps } from '../../../lib/entities/user-ui-config'
import type { FunctionLogProps } from '../../../lib/entities/function-log'

const linkMock: MetaLinkProps = {
  id: 'linkid',
  type: 'Link',
  linkType: 'linkType',
}

const sysMock: MetaSysProps = {
  type: 'Type',
  id: 'id',
  space: makeLink('Space', 'mock-space-id'),
  createdAt: 'createdatdate',
  updatedAt: 'updatedatdate',
  version: 0,
}

const spaceMock: SpaceProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Space',
    organization: makeLink('Organization', 'mock-organization-id'),
  }),
  name: 'name',
}

const environmentMock: EnvironmentProps = {
  sys: {
    ...cloneDeep(sysMock),
    space: makeLink('Space', 'mock-space-id'),
    status: makeLink('Status', 'mock-status-id'),
  },
  name: 'name',
}

const environmentTemplateMock: EnvironmentTemplateProps = {
  name: 'Mock Environment Template',
  description: 'This is a mock template',
  versionName: 'mocked-version-name',
  sys: Object.assign(cloneDeep(sysMock), {
    version: 1,
    organization: makeLink('Organization', 'mock-organization-id'),
  }),
  entities: {
    contentTypeTemplates: [
      {
        id: 'mock-content-type-templates-id',
        basedOn: {
          space: makeLink('Space', 'mock-space-id'),
          contentType: makeLink('ContentType', 'mock-content-type-id'),
          environment: makeLink('Environment', 'mock-environment-id'),
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
          ...makeLink('ContentTypeTemplate', 'mock-content-type-templates-id'),
        },
        controls: [{ fieldId: 'testApp', widgetNamespace: 'app', widgetId: 'private-app-id' }],
      },
    ],
  },
}

const environmentTemplateInstallationMock: EnvironmentTemplateInstallationProps = {
  sys: {
    id: 'mock-environment-template-installation-id',
    type: 'EnvironmentTemplateInstallation',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
    template: makeVersionedLink('Template', 'mock-template-id', 1),
    status: 'succeeded',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: makeLink('User', 'mock-user-id'),
    updatedBy: makeLink('User', 'mock-user-id'),
    version: 1,
  },
}

const environmentTemplateValidationMock: EnvironmentTemplateValidationProps = {
  sys: {
    type: 'Array',
    environment: { sys: { type: 'Link', linkType: 'Environment', id: 'mock-environment-id' } },
    space: { sys: { type: 'Link', linkType: 'Space', id: 'mock-space-id' } },
    changeSet: {
      sys: { type: 'Link', linkType: 'ChangeSet', id: 'mock-change-set-id' },
    },
  },
  items: [],
}

const userMock: UserProps = {
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

const personalAccessTokenMock: PersonalAccessTokenProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'PersonalAccessToken',
  }),
  name: 'My Token',
  revokedAt: null,
  scopes: ['content_management_manage'],
}

const accessTokenMock: PersonalAccessTokenProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AccessToken',
  }),
  name: 'My Token',
  revokedAt: null,
  scopes: ['content_management_manage'],
}

const appBundleMock: AppBundleProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppBundle',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
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

const appActionMock: AppActionProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppAction',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
  }),
  name: 'nice app action',
  url: 'https://www.example.com',
  type: 'endpoint',
  category: 'Custom',
  parameters: [],
}

const appActionCallMock: AppActionCallProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppActionCall',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
    action: makeLink('Action', 'mock-action-id'),
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
  }),
}

const appActionCallResponseMock: Partial<AppActionCallResponseData> = {
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
  callId: 'mock-call-id',
  appActionId: 'mock-app-action-id',
  spaceId: 'mock-space-id',
  environmentId: 'mock-environment-id',
}

const appDefinitionMock: AppDefinitionProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppDefinition',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
    action: makeLink('Action', 'mock-action-id'),
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
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

const appUploadMock: AppUploadProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppUpload',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
    action: makeLink('Action', 'mock-action-id'),
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
    expiresAt: '2022-02-20T10:01:00Z',
  }),
}

const appSignedRequestMock: AppSignedRequestProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppSignedRequest',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
    action: makeLink('Action', 'mock-action-id'),
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
  }),
  additionalHeaders: {
    'x-contentful-signature': '9b78a9203175d414b70b5b259b56f5d5507f6920997054533fd1da9b1eb442d6',
    'x-contentful-signed-headers':
      'x-contentful-environment-id,x-contentful-signed-headers,x-contentful-space-id,x-contentful-timestamp,x-contentful-user-id',
    'x-contentful-timestamp': '1631112126937',
    'x-contentful-space-id': 'mock-space-id',
    'x-contentful-environment-id': 'master',
    'x-contentful-user-id': 'user-id',
  },
}

const appSigningSecretMock: AppSigningSecretProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppSigningSecret',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
  }),
  redactedValue: 'wI74',
}

const appEventSubscriptionMock: AppEventSubscriptionProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppEventSubscription',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
  }),
  targetUrl: 'https://contentful.fake/event-processor',
  topics: ['Entry.create'],
}

const appKeyMock: AppKeyProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppKey',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
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

const appAccessTokenMock: AppAccessTokenProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppAccessToken',
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
    expiresAt: '2020-03-30T13:38:37.000Z',
  }),
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImViZWY2MDJlLTMxZGItNGMzYi1iZjAwL',
}

const appDetailsMock: AppDetailsProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppDetails',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
  }),
  icon: { value: 'some_image', type: 'base64' },
}

const bulkActionMock: BulkActionProps = {
  sys: {
    ...cloneDeep(sysMock),
    environment: makeLink('Environment', 'mock-environment-id'),
    space: makeLink('Space', 'mock-space-id'),
    createdBy: makeLink('User', 'user-id'),
    status: BulkActionStatus.created,
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

const bulkActionPublishMock: BulkActionProps = {
  sys: {
    ...cloneDeep(sysMock),
    environment: makeLink('Environment', 'mock-environment-id'),
    space: makeLink('Space', 'mock-space-id'),
    createdBy: makeLink('User', 'user-id'),
    status: BulkActionStatus.created,
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

const contentTypeMock: ContentTypeProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'ContentType',
    environment: makeLink('Environment', 'mock-environment-id'),
    space: makeLink('Space', 'mock-space-id'),
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
  ] as ContentFields<object>[],
}
const snapShotMock: SnapshotProps<unknown> = {
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
const entryMock: EntryProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Entry',
    space: makeLink('Space', 'mock-space-id'),
    contentType: makeLink('ContentType', 'mock-content-type-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
    locale: 'locale',
    automationTags: [],
  }),
  fields: {
    field1: 'str',
  },
}

const entryMockWithTags: Omit<EntryProps, 'metadata'> & Pick<Required<EntryProps>, 'metadata'> = {
  ...entryMock,
  metadata: {
    tags: [makeLink('Tag', 'mock-entry-tag-id')],
  },
}

const editorInterfaceMock: EditorInterfaceProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'EditorInterface',
    space: makeLink('Space', 'mock-space-id'),
    contentType: makeLink('ContentType', 'mock-content-type-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
  }),
  controls: [
    {
      fieldId: 'fieldId',
      widgetId: 'singleLine',
    },
  ],
}
const assetMock: AssetProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Asset',
    locale: 'locale',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
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

const assetKeyMock: AssetKeyProps = {
  policy: 'assetKey.policyJWT',
  secret: 'assetKeySecret',
}

const assetMockWithTags: AssetProps = {
  ...assetMock,
  metadata: {
    tags: [makeLink('Tag', 'mock-asset-tag-id')],
  },
}

const assetWithFilesMock: AssetProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Asset',
    locale: 'locale',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
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

const uploadMock: UploadProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Upload',
    id: 'some_random_id',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
  }),
}

const uploadCredentialMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'UploadCredential',
    id: 'some_random_id',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
  }),
  uploadCredential: {
    policy: 'some-policy',
    signature: 'some-signature',
    createdAt: '2020-03-30T13:38:37.000Z',
    expiresAt: '2020-03-30T13:38:37.000Z',
  },
}

const localeMock: Omit<LocaleProps, 'internal_code'> = {
  sys: Object.assign(cloneDeep(sysMock), {
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
    type: 'Locale',
  }),
  name: 'English',
  code: 'en',
  contentDeliveryApi: true,
  contentManagementApi: true,
  default: true,
  fallbackCode: null,
  optional: false,
}

const membershipMock: TeamSpaceMembershipProps['sys'] = {
  type: 'TeamSpaceMembership',
  id: 'randomId',
  version: 3,
  space: makeLink('Space', 'mock-space-id'),
  team: makeLink('Team', 'mock-team-id'),
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

const webhookMock: WebhookProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'WebhookDefinition',
    space: {
      sys: { id: 'mock-space-id' },
    },
  }),
  active: true,
  headers: [],
  name: 'mocked-webhook',
  topics: [],
  url: 'https://example.com',
}

const spaceMemberMock: SpaceMemberProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'SpaceMember',
  }),
  admin: false,
  roles: [],
}

const spaceMembershipMock: SpaceMembershipProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'SpaceMembership',
    space: makeLink('Space', 'mock-space-id'),
    user: makeLink('User', 'mock-user-id'),
  }),
  admin: false,
  roles: [makeLink('Role', 'mock-role-id')],
  user: makeLink('User', 'mock-user-id'),
}

const teamSpaceMembershipMock: SpaceMembershipProps = {
  sys: Object.assign(cloneDeep(membershipMock), {
    type: 'TeamSpaceMembership',
    user: makeLink('User', 'mock-user-id'),
  }),
  admin: false,
  user: makeLink('User', 'mock-user-id'),
  roles: [{ sys: Object.assign(cloneDeep(linkMock), { linkType: 'Role' }) }],
}

const organizationMembershipMock: OrganizationMembershipProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'OrganizationMembership',
    user: makeLink('User', 'mock-user-id'),
  }),
  role: 'mocked-role',
  status: false,
}

const teamMock: TeamProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Team',
    organization: makeLink('Organization', 'mock-organization-id'),
    memberCount: 1,
  }),
  name: 'mocked-name',
  description: 'mocked-description',
}

const teamMembershipMock: TeamMembershipProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'TeamMembership',
    team: makeLink('Team', 'mock-team-id'),
    organization: makeLink('Organization', 'mock-organization-id'),
    organizationMembership: makeLink(
      'OrganizationMembership',
      'mock-organization-membership-team-id'
    ),
  }),
  admin: false,
  organizationMembershipId: 'mock-organization-membership-id',
}

const organizationInvitationMock: OrganizationInvitationProps = {
  sys: {
    ...cloneDeep(sysMock),
    status: 'mocked',
    type: 'organizationInvitation',
    organizationMembership: makeLink(
      'OrganizationMembership',
      'mock-organization-membership-team-id'
    ),
    user: makeLink('User', 'mock-user-id'),
    invitationUrl: 'https://example.com/mocked/invitation/url',
  },
  email: 'mocked-email',
  firstName: 'mocked-first-name',
  lastName: 'mocked-last-name',
  role: 'mocked-role',
}

const roleMock: RoleProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Role',
    space: makeLink('Space', 'mock-space-id'),
  }),
  name: 'mocked-role',
  permissions: {
    ContentDelivery: [],
    ContentModel: [],
    EnvironmentAliases: [],
    Environments: [],
    Settings: [],
    Tags: [],
  },
  policies: [],
}

const releaseMock: ReleaseProps = {
  sys: {
    ...cloneDeep(sysMock),
    status: 'active',
    type: 'Release',
    space: makeLink('Space', 'mock-space-id'),
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

const releaseActionMock: ReleaseActionProps = {
  sys: {
    ...cloneDeep(sysMock),
    type: 'ReleaseAction',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'master'),
    createdBy: makeLink('User', 'user-id'),
    updatedBy: makeLink('User', 'user-id'),
    release: makeLink('Release', 'release-id'),
    status: 'created',
  },
  action: 'publish',
}

const releaseActionValidateMock: ReleaseActionProps = {
  ...releaseActionMock,
  action: 'validate',
}

const releaseActionUnpublishMock: ReleaseActionProps = {
  ...releaseActionMock,
  action: 'unpublish',
}

const apiKeyMock: ApiKeyProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'ApiKey',
  }),
  accessToken: 'mocked-access-token',
  environments: [],
  name: 'mocked-access-token-name',
  preview_api_key: makeLink('ApiKey', 'mocked-preview-api-key-id'),
}

const previewApiKeyMock: Partial<ApiKey> = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'ApiKey',
  }),
  accessToken: 'mocked-access-token',
  environments: [],
  name: 'mocked-access-token-name',
  preview_api_key: makeLink('ApiKey', 'mocked-preview-api-key-id'),
}

const organizationMock: OrganizationProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Organization',
  }),
  name: 'name',
}

const usageMock: UsageProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Usage',
  }),
  usage: 1,
  dateRange: {
    startAt: new Date().toISOString(),
    endAt: new Date().toISOString(),
  },
  metric: 'cda',
  unitOfMeasure: 'kb',
  usagePerDay: {},
}

const extensionMock: ExtensionProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'Extension',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'master'),
  }),
  extension: {
    name: 'Some Extension',
    fieldTypes: [],
  },
}

const appInstallationMock: AppInstallationProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'AppInstallation',
    space: makeLink('Space', 'mock-space-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
    environment: makeLink('Environment', 'master'),
  }),
}

const appInstallationsForOrgMock: AppInstallationsForOrganizationProps = {
  sys: {
    ...cloneDeep(sysMock),
    type: 'Array',
  },
  items: [cloneDeep(appInstallationMock)],
  includes: {
    Environment: [cloneDeep(environmentMock)],
  },
}

const environmentAliasMock: EnvironmentAliasProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'EnvironmentAlias',
    space: makeLink('Space', 'mock-space-id'),
  }),
  environment: makeLink('Environment', 'master'),
}

const taskMock: TaskProps = {
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
    parentEntity: makeLink('Entry', 'mock-entry-id'),
  },
  body: 'Body',
  assignedTo: makeLink('User', 'mock-user-id'),
  status: 'active',
}

const commentMock: CommentProps = {
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
    parentEntity: makeLink('Entry', 'mock-entry-id'),
    parent: null,
  },
  body: 'Body',
  status: 'active',
}

const conceptMock: ConceptProps = {
  sys: {
    id: 'concept-id',
    type: 'TaxonomyConcept',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: makeLink('User', 'mock-user-id'),
    updatedBy: makeLink('User', 'mock-user-id'),
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

const conceptSchemeMock: ConceptSchemeProps = {
  sys: {
    id: 'concept-scheme-id',
    type: 'TaxonomyConceptScheme',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: makeLink('User', 'mock-user-id'),
    updatedBy: makeLink('User', 'mock-user-id'),
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

export const tagMock: TagProps = {
  name: 'My tag',
  sys: {
    id: 'my-tag',
    version: 1,
    visibility: 'private',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    type: 'Tag',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'master'),
  },
}

export const scheduledActionMock: ScheduledActionProps = {
  sys: {
    id: 'my-scheduled-action',
    space: {
      sys: cloneDeep(linkMock),
    },
    version: 1,
    createdAt: 'createdAt',
    createdBy: makeLink('User', 'mock-user-id'),
    updatedAt: 'updatedAt',
    updatedBy: makeLink('User', 'mock-user-id'),
    type: 'ScheduledAction',
    status: ScheduledActionStatus.scheduled,
  },
  action: 'publish',
  entity: makeLink('Entry', 'mock-entryid'),
  environment: makeLink('Environment', 'mock-user-id'),
  scheduledFor: {
    datetime: '2006-01-02T15:04:05-0700',
    timezone: 'Asia/Kolkata',
  },
}

export const scheduledActionCollectionMock: ScheduledActionCollection = {
  sys: {
    type: 'Array',
  },
  pages: {},
  limit: 1,
  items: [cloneDeep(scheduledActionMock)],
}

const entryWithReferencesMock: CollectionProp<EntryProps> = {
  sys: {
    type: 'Array',
  },
  items: [entryMock],
  total: 1,
  limit: 100,
  skip: 0,
}

const entryReferencesCollectionMock: CollectionProp<EntryProps> & { includes: Link<'Entry'>[] } = {
  sys: {
    type: 'Array',
  },
  total: 1,
  limit: 100,
  skip: 0,
  items: [entryMock],
  includes: [makeLink('Entry', 'entry-1'), makeLink('Entry', 'entry-2')],
}

export const workflowStepMock: WorkflowStepProps = {
  id: sysMock.id,
  name: 'In review',
  description: 'Test WorkflowStep',
  actions: [
    {
      appActionId: 'mock-app-action-id',
      appId: 'mock-app-id',
      type: 'app',
    },
  ],
  annotations: ['cf-color-blue', 'cf-icon-research'],
}

export const workflowDefinitionMock: WorkflowDefinitionProps = {
  sys: {
    ...cloneDeep(sysMock),
    type: 'WorkflowDefinition',
    version: 1,
    environment: makeLink('Environment', 'master'),
    isLocked: false,
    space: makeLink('Space', 'mock-space-id'),
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

export const workflowMock: WorkflowProps = {
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
    space: makeLink('Space', 'mock-space-id'),
  },
}

export const workflowsChangelogEntryMock: WorkflowsChangelogEntryProps = {
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

export const uiConfigMock: UIConfigProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'UIConfig',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'master'),
  }),
  assetListViews: [],
  entryListViews: [],
  homeViews: [],
}

export const userUIConfigMock: UserUIConfigProps = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'UserUIConfig',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'master'),
  }),
  assetListViews: [],
  entryListViews: [],
}

const resourceProviderMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'ResourceProvider',
    appDefinition: { sys: { id: 'appDefinition-id', linkType: 'AppDefinition', type: 'Link' } },
    organization: { sys: { id: 'organization-id', linkType: 'Organization', type: 'Link' } },
  }),
  type: 'function',
  function: { sys: { id: 'function-id' } },
}

const resourceTypeMock = {
  sys: Object.assign(cloneDeep(sysMock), {
    type: 'ResourceType',
    appDefinition: { sys: { id: 'appDefinition-id', linkType: 'AppDefinition', type: 'Link' } },
    organization: { sys: { id: 'organization-id', linkType: 'Organization', type: 'Link' } },
    resourceProvider: {
      sys: { id: 'resourceProvider-id', linkType: 'ResourceProvider', type: 'Link' },
    },
  }),
  name: 'resourceType',
  defaultFieldMapping: {
    title: 'title',
  },
}

const resourceMock = {
  sys: {
    type: 'Resource',
    urn: 'resource-urn',
    resourceType: {
      sys: {
        type: 'Link',
        linkType: 'ResourceType',
        id: 'resourceTypeId',
      },
    },
    resourceProvider: {
      sys: {
        type: 'Link',
        linkType: 'ResourceProvider',
        id: 'resourceProvider-id',
      },
    },
    appDefinition: {
      sys: {
        type: 'Link',
        linkType: 'AppDefinition',
        id: 'appDefinitionId',
      },
    },
  },
  fields: {
    title: 'Resource title',
  },
}

const functionMock: FunctionProps = {
  sys: {
    id: 'function-id',
    type: 'Function',
    createdBy: makeLink('User', 'user-id'),
    createdAt: '2022-02-20T10:00:00Z',
    updatedBy: makeLink('User', 'user-id'),
    updatedAt: '2022-02-20T10:00:01Z',
    organization: makeLink('Organization', 'mock-organization-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
  },
  name: 'function-name',
  description: 'desc',
  path: 'path',
  accepts: ['application/json'],
  allowNetworks: ['test'],
}

const functionCollectionMock = {
  items: [functionMock],
  total: 1,
  limit: 100,
  skip: 0,
}

const functionLogMock: FunctionLogProps = {
  sys: {
    id: 'function-id',
    type: 'FunctionLog',
    createdBy: makeLink('User', 'user-id'), // Only users can CRUD
    createdAt: '2022-02-20T10:00:00Z',
    space: makeLink('Space', 'mock-space-id'),
    environment: makeLink('Environment', 'mock-environment-id'),
    appDefinition: makeLink('AppDefinition', 'mock-app-definition-id'),
  },
  severity: {
    info: 0,
    warn: 0,
    error: 1,
  },
  requestId: 'request-id',
  event: {
    type: 'http',
    query: 'GET',
    isIntrospectionQuery: false,
    variables: {},
  },
  messages: [
    {
      timestamp: 1645363200000,
      type: 'ERROR',
      message: 'error message',
    },
  ],
}

const functionLogCollectionMock = {
  items: [functionLogMock],
  total: 1,
  limit: 100,
  skip: 0,
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
  function: functionMock,
  functionLog: functionLogMock,
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
  resource: resourceMock,
  resourceProvider: resourceProviderMock,
  resourceType: resourceTypeMock,
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

function cloneMock<T extends keyof typeof mocks>(name: T): (typeof mocks)[T] {
  return cloneDeep(mocks[name])
}

function mockCollection<T>(entityMock): CollectionProp<T> {
  return {
    sys: {
      type: 'Array',
    },
    total: 1,
    skip: 0,
    limit: 100,
    items: [entityMock as T],
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
    resourceProvider: {
      wrapResourceProvider: vi.fn(),
    },
    resourceType: {
      wrapResourceType: vi.fn(),
    },
    resource: {
      wrapResourceCollection: vi.fn(),
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
    Function: {
      wrapFunction: vi.fn(),
      wrapFunctionCollection: vi.fn(),
    },
    FunctionLog: {
      wrapFunctionLog: vi.fn(),
      wrapFunctionLogCollection: vi.fn(),
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
  bulkActionPublishMock,
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
  uploadCredentialMock,
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
  resourceProviderMock,
  resourceTypeMock,
  resourceMock,
  functionMock,
  functionCollectionMock,
  functionLogMock,
  functionLogCollectionMock,
}
