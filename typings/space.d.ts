/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 * @packageDocumentation
 */

import { MetaSys, MetaSysProps, DefaultElements, Collection, QueryOptions } from './generated/common-types'
import { ApiKey, CreateApiKeyProps } from './generated/entities/api-key'
import { Environment, EnvironmentProps } from './environment'
import { Asset, AssetProps, AssetFileProp } from './generated/entities/asset'
import { ContentType, ContentTypeProps } from './generated/entities/content-type'
import { EntryProp, Entry } from './entry'
import { CreateLocaleProps, Locale } from './generated/entities/locale'
import { SpaceMember } from './generated/entities/space-member'
import { Role, RoleProps } from './generated/entities/role'
import { SpaceMembershipProps, SpaceMembership } from './generated/entities/space-membership'
import { TeamSpaceMembershipProps, TeamSpaceMembership } from './generated/entities/team-space-membership'
import { UIExtension, UIExtensionProps } from './generated/entities/ui-extension'
import { Upload } from './generated/entities/upload'
import { Stream } from 'stream'
import { Snapshot } from './generated/entities/snapshot'
import { EditorInterface } from './generated/entities/editor-interface'
import { WebhookProps, WebHooks } from './generated/entities/webhook'
import { PreviewApiKey } from './generated/entities/preview-api-key'
import { User } from './generated/entities/user'

export interface SpaceProps {
  name: string
}

export interface EnvironmentAlias extends MetaSys<MetaSysProps> {
  environment: Environment
  update(): Promise<EnvironmentAlias>
}

export interface ContentfulSpaceAPI {
  /**
   * Deletes the space
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   *   .then((space) => space.delete())
   *   .then(() => console.log('Space deleted.'))
   *   .catch(console.error)
   * ```
   */
  delete(): Promise<void>
  /**
   * Updates the space
   * @return Promise for the updated space.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => {
   *   space.name = 'New name'
   *   return space.update()
   * })
   * .then((space) => console.log(`Space ${space.sys.id} renamed.`)
   * .catch(console.error)
   * ```
   */
  update(): Promise<void>
  /**
   * Creates a Api Key
   * @param data - Object representation of the Api Key to be created
   * @return Promise for the newly created Api Key
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createApiKey({
   *   name: 'API Key name',
   *   environments:[
   *    {
   *     sys: {
   *      type: 'Link'
   *      linkType: 'Environment',
   *      id:'<environment_id>'
   *     }
   *    }
   *   ]
   *   }
   * }))
   * .then((apiKey) => console.log(apiKey))
   * .catch(console.error)
   * ```
   */
  createApiKey(data: CreateApiKeyProps): Promise<ApiKey>
  /**
   * Creates a Api Key with a custom ID
   * @param id - Api Key ID
   * @param data - Object representation of the Api Key to be created
   * @return Promise for the newly created Api Key
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createApiKeyWithId('<api-key-id>', {
   *   name: 'API Key name'
   *   environments:[
   *    {
   *     sys: {
   *      type: 'Link'
   *      linkType: 'Environment',
   *      id:'<environment_id>'
   *     }
   *    }
   *   ]
   *   }
   * }))
   * .then((apiKey) => console.log(apiKey))
   * .catch(console.error)
   * ```
   */
  createApiKeyWithId(id: string, data: CreateApiKeyProps): Promise<ApiKey>
  /**
   * Creates a Asset. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @deprecated since version 5.0
   * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @return Promise for the newly created Asset
   * @example ```javascript
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create asset
   * client.getSpace('<space_id>')
   * .then((space) => space.createAsset({
   *   fields: {
   *     title: {
   *       'en-US': 'Playsam Streamliner'
   *    },
   *    file: {
   *       'en-US': {
   *         contentType: 'image/jpeg',
   *        fileName: 'example.jpeg',
   *        upload: 'https://example.com/example.jpg'
   *      }
   *    }
   *   }
   * }))
   * .then((asset) => asset.processForLocale("en-US")) // OR asset.processForAllLocales()
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   * ```
   */
  createAsset(data: Omit<AssetProps, 'sys'>): Promise<Asset>
  /**
   * Creates a Asset based on files. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @deprecated since version 5.0
   * @param data - Object representation of the Asset to be created. Note that the field object should have an uploadFrom property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @param data.fields.file.[LOCALE].file - Can be a string, an ArrayBuffer or a Stream.
   * @return Promise for the newly created Asset
   * @example ```javascript
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getSpace('<space_id>')
   * .then((space) => space.createAssetFromFiles({
   *   fields: {
   *     file: {
   *       'en-US': {
   *          contentType: 'image/jpeg',
   *          fileName: 'filename_english.jpg',
   *          file: createReadStream('path/to/filename_english.jpg')
   *       },
   *       'de-DE': {
   *          contentType: 'image/svg+xml',
   *          fileName: 'filename_german.svg',
   *          file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
   *       }
   *     }
   *   }
   * }))
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   * ```
   */
  createAssetFromFiles(data: Omit<AssetFileProp, 'sys'>): Promise<Asset>
  /**
   * Creates a Asset with a custom ID. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @deprecated since version 5.0
   * @param id - Asset ID
   * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @return Promise for the newly created Asset
   * @example ```javascript
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create asset
   * client.getSpace('<space_id>')
   * .then((space) => space.createAssetWithId('<asset_id>', {
   *   title: {
   *     'en-US': 'Playsam Streamliner'
   *   },
   *   file: {
   *     'en-US': {
   *       contentType: 'image/jpeg',
   *       fileName: 'example.jpeg',
   *       upload: 'https://example.com/example.jpg'
   *     }
   *   }
   * }))
   * .then((asset) => asset.process())
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   * ```
   */
  createAssetWithId(id: string, data: Omit<AssetProps, 'sys'>): Promise<Asset>
  /**
   * Creates a Content Type
   * @deprecated since version 5.0
   * @param data - Object representation of the Content Type to be created
   * @return Promise for the newly created Content Type
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createContentType({
   *   name: 'Blog Post',
   *   fields: [
   *     {
   *       id: 'title',
   *       name: 'Title',
   *       required: true,
   *       localized: false,
   *       type: 'Text'
   *     }
   *   ]
   * }))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   * ```
   */
  createContentType(data: Omit<ContentTypeProps, 'sys'>): Promise<ContentType>
  /**
   * Creates a Content Type with a custom ID
   * @deprecated since version 5.0
   * @param id - Content Type ID
   * @param data - Object representation of the Content Type to be created
   * @return Promise for the newly created Content Type
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createContentTypeWithId('<content-type-id>', {
   *   name: 'Blog Post',
   *   fields: [
   *     {
   *       id: 'title',
   *       name: 'Title',
   *       required: true,
   *       localized: false,
   *       type: 'Text'
   *     }
   *   ]
   * }))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   * ```
   */
  createContentTypeWithId(id: string, data: Omit<ContentTypeProps, 'sys'>): Promise<ContentType>
  /**
   * Gets a collection of Environments
   * @return Promise for a collection of Environment
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironments())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getEnvironments(): Promise<Collection<Environment>>
  /**
   * Gets an environment
   * @param id - Environment ID
   * @return Promise for an Environment
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environement_id>'))
   * .then((environment) => console.log(environment))
   * .catch(console.error)
   * ```
   */
  getEnvironment(id: string): Promise<Environment>
  /**
   * Creates a Entry
   * @deprecated since version 5.0
   * @param contentTypeId - The Content Type which this Entry is based on
   * @param data - Object representation of the Entry to be created
   * @return Promise for the newly created Entry
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createEntry('<content_type_id>', {
   *   fields: {
   *     title: {
   *       'en-US': 'Entry title'
   *     }
   *   }
   * }))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   * ```
   */
  createEntry(contentTypeID: string, data: EntryProp): Promise<Entry>
  /**
   * Creates a Entry with a custom ID
   * @deprecated since version 5.0
   * @param contentTypeId - The Content Type which this Entry is based on
   * @param id - Entry ID
   * @param data - Object representation of the Entry to be created
   * @return Promise for the newly created Entry
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create entry
   * client.getSpace('<space_id>')
   * .then((space) => space.createEntryWithId('<content_type_id>', '<entry_id>', {
   *   fields: {
   *     title: {
   *       'en-US': 'Entry title'
   *     }
   *   }
   * }))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   * ```
   */
  createEntryWithId(contentTypeID: string, id: string, data: EntryProp): Promise<Entry>
  /**
   * Creates an Environement
   * @param data - Object representation of the Environment to be created
   * @return Promise for the newly created Environment
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createEnvironment({ name: 'Staging' }))
   * .then((environment) => console.log(environment))
   * .catch(console.error)
   * ```
   */
  createEnvironment(data: EnvironmentProps): Promise<Environment>
  /**
   * Creates an Environment with a custom ID
   * @param id - Environment ID
   * @param data - Object representation of the Environment to be created
   * @param sourceEnvironmentId - ID of the source environment that will be copied to create the new environment. Default is "master"
   * @return Promise for the newly created Environment
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createEnvironmentWithId('<environment-id>', { name: 'Staging'}, 'master'))
   * .then((environment) => console.log(environment))
   * .catch(console.error)
   * ```
   */
  createEnvironmentWithId(
    id: string,
    data: EnvironmentProps,
    sourceEnvironmentId: string
  ): Promise<Environment>

  /**
   * Creates a Locale
   * @deprecated since version 5.0
   * @param data - Object representation of the Locale to be created
   * @return Promise for the newly created Locale
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create locale
   * client.getSpace('<space_id>')
   * .then((space) => space.createLocale({
   *   name: 'German (Austria)',
   *   code: 'de-AT',
   *   fallbackCode: 'de-DE',
   *   optional: true
   * }))
   * .then((locale) => console.log(locale))
   * .catch(console.error)
   * ```
   */
  createLocale(data: CreateLocaleProps): Promise<Locale>
  /**
   * Creates a Role
   * @param data - Object representation of the Role to be created
   * @return  Promise for the newly created Role
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getSpace('<space_id>')
   * .then((space) => space.createRole({
   *   name: 'My Role',
   *   description: 'foobar role',
   *   permissions: {
   *     ContentDelivery: 'all',
   *     ContentModel: ['read'],
   *     Settings: []
   *   },
   *   policies: [
   *     {
   *       effect: 'allow',
   *       actions: 'all',
   *       constraint: {
   *         and: [
   *           {
   *             equals: [
   *               { doc: 'sys.type' },
   *               'Entry'
   *             ]
   *           },
   *           {
   *             equals: [
   *               { doc: 'sys.type' },
   *               'Asset'
   *             ]
   *           }
   *         ]
   *       }
   *     }
   *   ]
   * }))
   * .then((role) => console.log(role))
   * .catch(console.error)
   * ```
   */
  createRole(data: Omit<RoleProps, 'sys'>): Promise<Role>
  /**
   * Creates a Role with a custom ID
   * @param id - Role ID
   * @param data - Object representation of the Role to be created
   * @return Promise for the newly created Role
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getSpace('<space_id>')
   * .then((space) => space.createRoleWithId('<role-id>', {
   *   name: 'My Role',
   *   description: 'foobar role',
   *   permissions: {
   *     ContentDelivery: 'all',
   *     ContentModel: ['read'],
   *     Settings: []
   *   },
   *   policies: [
   *     {
   *       effect: 'allow',
   *       actions: 'all',
   *       constraint: {
   *         and: [
   *           {
   *             equals: [
   *               { doc: 'sys.type' },
   *               'Entry'
   *             ]
   *           },
   *           {
   *             equals: [
   *               { doc: 'sys.type' },
   *               'Asset'
   *             ]
   *           }
   *         ]
   *       }
   *     }
   *   ]
   * }))
   * .then((role) => console.log(role))
   * .catch(console.error)
   * ```
   */
  createRoleWithId(id: string, ata: Omit<RoleProps, 'sys'>): Promise<Role>
  /**
   * Gets a Role
   * @param id - Role ID
   * @return Promise for a Role
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createRole({
   *   fields: {
   *     title: {
   *       'en-US': 'Role title'
   *     }
   *   }
   * }))
   * .then((role) => console.log(role))
   * .catch(console.error)
   * ```
   */
  getRole(id: string): Promise<Role>
  /**
   * Gets a collection of Roles
   * @return Promise for a collection of Roles
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getRoles())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getRoles(): Promise<Collection<Role>>
  /**
   * Creates a Space Membership
   * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
   * @param  data - Object representation of the Space Membership to be created
   * @return Promise for the newly created Space Membership
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createSpaceMembership({
   *   admin: false,
   *   roles: [
   *     {
   *       type: 'Link',
   *       linkType: 'Role',
   *       id: '<role_id>'
   *     }
   *   ],
   *   email: 'foo@example.com'
   * }))
   * .then((spaceMembership) => console.log(spaceMembership))
   * .catch(console.error)
   * ```
   */
  createSpaceMembership(data: Omit<SpaceMembershipProps, 'sys'>): Promise<SpaceMembership>
  /**
   * Creates a Space Membership with a custom ID
   * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
   * @param id - Space Membership ID
   * @param data - Object representation of the Space Membership to be created
   * @return Promise for the newly created Space Membership
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createSpaceMembershipWithId('<space-membership-id>', {
   *   admin: false,
   *   roles: [
   *     {
   *       type: 'Link',
   *       linkType: 'Role',
   *       id: '<role_id>'
   *     }
   *   ],
   *   email: 'foo@example.com'
   * }))
   * .then((spaceMembership) => console.log(spaceMembership))
   * .catch(console.error)
   * ```
   */
  createSpaceMembershipWithId(id: string, data: Omit<SpaceMembershipProps, 'sys'>): Promise<SpaceMembership>
  /**
   * Creates a Team Space Membership
   * @param id - Team ID
   * @param data - Object representation of the Team Space Membership to be created
   * @return Promise for the newly created Team Space Membership
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createTeamSpaceMembership('team_id', {
   *   admin: false,
   *   roles: [
   *    {
          sys: {
   *       type: 'Link',
   *       linkType: 'Role',
   *       id: '<role_id>'
   *      }
   *    }
   *   ],
   * }))
   * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
   * .catch(console.error)
   * ```
   */
  createTeamSpaceMembership(teamId: string, data: TeamSpaceMembershipProps): Promise<TeamSpaceMembership>
  /**
   * Creates a UI Extension
   * @deprecated since version 5.0
   * @param data - Object representation of the UI Extension to be created
   * @return Promise for the newly created UI Extension
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createUiExtension({
   *   extension: {
   *     name: 'My awesome extension',
   *     src: 'https://example.com/my',
   *     fieldTypes: [
   *       {
   *         type: 'Symbol'
   *       },
   *       {
   *         type: 'Text'
   *       }
   *     ],
   *     sidebar: false
   *   }
   * }))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   * ```
   */
  createUiExtension(data: UIExtensionProps): Promise<UIExtension>
  /**
   * Creates a UI Extension with a custom ID
   * @deprecated since version 5.0
   * @param id - UI Extension ID
   * @param data - Object representation of the UI Extension to be created
   * @return Promise for the newly created UI Extension
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createUiExtensionWithId('<extension_id>', {
   *   extension: {
   *     name: 'My awesome extension',
   *     src: 'https://example.com/my',
   *     fieldTypes: [
   *       {
   *         type: 'Symbol'
   *       },
   *       {
   *         type: 'Text'
   *       }
   *     ],
   *     sidebar: false
   *   }
   * }))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   * ```
   */
  createUiExtensionWithId(id: string, data: UIExtensionProps): Promise<UIExtension>
  /**
   * Creates a Upload.
   * @deprecated since version 5.0
   * @param data - Object with file information.
   * @param data.file - Actual file content. Can be a string, an ArrayBuffer or a Stream.
   * @return Upload object containing information about the uploaded file.
   * @example ```javascript
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * const uploadStream = createReadStream('path/to/filename_english.jpg')
   * client.getSpace('<space_id>')
   * .then((space) => space.createUpload({file: uploadStream, 'image/png'})
   * .then((upload) => console.log(upload))
   * .catch(console.error)
   * ```
   */
  createUpload(data: { file: string | ArrayBuffer | Stream }): Promise<Upload>
  /**
   * Gets a Api Key
   * @param id - API Key ID
   * @return  Promise for a Api Key
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getApiKey('<apikey-id>'))
   * .then((apikey) => console.log(apikey))
   * .catch(console.error)
   * ```
   */
  getApiKey(id: string): Promise<ApiKey>
  /**
   * Gets a collection of Api Keys
   * @return Promise for a collection of Api Keys
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getApiKeys())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getApiKeys(): Promise<Collection<ApiKey>>
  /**
   * Gets an Asset
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @deprecated since version 5.0
   * @param id - Asset ID
   * @param query - Object with search parameters. In this method it's only useful for `locale`.
   * @return Promise for an Asset
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getAsset('<asset_id>'))
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   * ```
   */
  getAsset(id: string, query?: QueryOptions): Promise<Asset>
  /**
   * Gets a collection of Assets
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @deprecated since version 5.0
   * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return Promise for a collection of Assets
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getAssets())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getAssets(query?: QueryOptions): Promise<Collection<Asset>>
  /**
   * Gets a collection of Content Types
   * @deprecated since version 5.0
   * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return Promise for a collection of Content Types
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getContentTypes())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getContentTypes(object?: QueryOptions): Promise<Collection<ContentType>>
  /**
   * Gets a Content Type
   * @deprecated since version 5.0
   * @param id - Content Type ID
   * @return Promise for a Content Type
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getContentType('<content_type_id>'))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   * ```
   */
  getContentType(id: string): Promise<ContentType>
  /**
   * Gets all snapshots of a contentType
   * @deprecated since version 5.0
   * @param contentTypeId - Content Type ID
   * @param query - additional query paramaters
   * @return Promise for a collection of Content Type Snapshots
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getContentTypeSnapshots('<contentTypeId>'))
   * .then((snapshots) => console.log(snapshots.items))
   * .catch(console.error)
   * ```
   */
  getContentTypeSnapshots(
    contentTypeId: string,
    query?: QueryOptions
  ): Promise<Collection<Snapshot<ContentTypeProps>>>
  /**
   * Gets an EditorInterface for a ContentType
   * @deprecated since version 5.0
   * @param contentTypeId - Content Type ID
   * @return Promise for an EditorInterface
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEditorInterfaceForContentType('<content_type_id>'))
   * .then((EditorInterface) => console.log(EditorInterface))
   * .catch(console.error)
   * ```
   */
  getEditorInterfaceForContentType(contentTypeId: string): Promise<EditorInterface>
  /**
   * Gets an Entry
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @deprecated since version 5.0
   * @param id - Entry ID
   * @param query - Object with search parameters. In this method it's only useful for `locale`.
   * @return Promise for an Entry
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEntry('<entry-id>'))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   * ```
   */
  getEntry(id: string): Promise<Entry>
  /**
   * Gets a collection of Entries
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @deprecated since version 5.0
   * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return Promise for a collection of Entries
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEntries({'content_type': 'foo'})) // you can add more queries as 'key': 'value'
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getEntries(object?: QueryOptions): Promise<Collection<Entry>>

  /**
   * Gets all snapshots of an entry
   * @deprecated since version 5.0
   * @param entryId - Entry ID
   * @param query - additional query paramaters
   * @return Promise for a collection of Entry Snapshots
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEntrySnapshots('<entry_id>'))
   * .then((snapshots) => console.log(snapshots.items))
   * .catch(console.error)
   * ```
   */
  getEntrySnapshots(id: string): Promise<Collection<Snapshot<EntryProp>>>
  /**
   * Gets an Environment Alias
   * @param Environment Alias ID
   * @return Promise for an Environment Alias
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironmentAlias('<alias-id>'))
   * .then((alias) => console.log(alias))
   * .catch(console.error)
   * ```
   */
  getEnvironmentAlias(id: string): Promise<EnvironmentAlias>
  /**
   * Gets a collection of Environment Aliases
   * @return Promise for a collection of Environment Aliases
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironmentAliases()
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getEnvironmentAliases(): Promise<Collection<EnvironmentAlias>>
  /**
   * Gets a Locale
   * @deprecated since version 5.0
   * @param id - Locale ID
   * @return Promise for an Locale
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getLocale('<locale_id>'))
   * .then((locale) => console.log(locale))
   * .catch(console.error)
   * ```
   */
  getLocale(id: string): Promise<Locale>
  /**
   * Gets a collection of Locales
   * @deprecated since version 5.0
   * @return Promise for a collection of Locales
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getLocales())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getLocales(): Promise<Collection<Locale>>
  /**
   * Gets an UI Extension
   * @deprecated since version 5.0
   * @param id - UI Extension ID
   * @return Promise for an UI Extension
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getUiExtension('<extension-id>'))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   * ```
   */
  getUiExtension(id: string): Promise<UIExtension>
  /**
   * Gets a collection of UI Extension
   * @deprecated since version 5.0
   * @return Promise for a collection of UI Extensions
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getUiExtensions()
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getUiExtensions(): Promise<Collection<UIExtension>>
  /**
   * Gets an Upload
   * @deprecated since version 5.0
   * @param id - Upload ID
   * @return Promise for an Upload
   * @example ```javascript
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * const uploadStream = createReadStream('path/to/filename_english.jpg')
   * client.getSpace('<space_id>')
   * .then((space) => space.getUpload('<upload-id>')
   * .then((upload) => console.log(upload))
   * .catch(console.error)
   * ```
   */
  getUpload(id: string): Promise<Upload>
  /**
   * Creates a Webhook
   * @param data - Object representation of the Webhook to be created
   * @return Promise for the newly created Webhook
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createWebhook({
   *   'name': 'My webhook',
   *   'url': 'https://www.example.com/test',
   *   'topics': [
   *     'Entry.create',
   *     'ContentType.create',
   *     '*.publish',
   *     'Asset.*'
   *   ]
   * }))
   * .then((webhook) => console.log(webhook))
   * .catch(console.error)
   * ```
   */
  createWebhook(data: WebhookProps): Promise<WebHooks>
  /**
   * Creates a Webhook with a custom ID
   * @param id - Webhook ID
   * @param  data - Object representation of the Webhook to be created
   * @return Promise for the newly created Webhook
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createWebhookWithId('<webhook_id>', {
   *   'name': 'My webhook',
   *   'url': 'https://www.example.com/test',
   *   'topics': [
   *     'Entry.create',
   *     'ContentType.create',
   *     '*.publish',
   *     'Asset.*'
   *   ]
   * }))
   * .then((webhook) => console.log(webhook))
   * .catch(console.error)
   * ```
   */
  createWebhookWithId(id: string, data: WebhookProps): Promise<WebHooks>
  /**
   * Gets a preview Api Key
   * @param id - Preview API Key ID
   * @return  Promise for a Preview Api Key
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getPreviewApiKey('<preview-apikey-id>'))
   * .then((previewApikey) => console.log(previewApikey))
   * .catch(console.error)
   * ```
   */
  getPreviewApiKey(id: string): Promise<PreviewApiKey>
  /**
   * Gets a collection of preview Api Keys
   * @return Promise for a collection of Preview Api Keys
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getPreviewApiKeys())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getPreviewApiKeys(): Promise<Collection<PreviewApiKey>>
  /**
   * Gets a Webhook
   * @param id - Webhook ID
   * @return Promise for a Webhook
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhook('<webhook_id>'))
   * .then((webhook) => console.log(webhook))
   * .catch(console.error)
   * ```
   */
  getWebhook(id: string): Promise<WebHooks>
  /**
   * Gets a collection of Webhooks
   * @return Promise for a collection of Webhooks
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhooks())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getWebhooks(): Promise<Collection<WebHooks>>
  /**
   * Gets a Space Member
   * @param id Get Space Member by user_id
   * @return Promise for a Space Member
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceMember(id))
   * .then((spaceMember) => console.log(spaceMember))
   * .catch(console.error)
   * ```
   */
  getSpaceMember(id: string): Promise<SpaceMember>

  /**
   * Gets a collection of Space Members
   * @param query
   * @return Promise for a collection of Space Members
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceMembers({'limit': 100}))
   * .then((spaceMemberCollection) => console.log(spaceMemberCollection))
   * .catch(console.error)
   * ```
   */
  getSpaceMembers(query?: object): Promise<Collection<SpaceMember>>

  /**
   * Gets a Space Membership
   * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
   * @param id - Space Membership ID
   * @return Promise for a Space Membership
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceMembership('id'))
   * .then((spaceMembership) => console.log(spaceMembership))
   * .catch(console.error)
   * ```
   */
  getSpaceMembership(id: string): Promise<SpaceMembership>

  /**
   * Gets a collection of Space Memberships
   * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
   * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return Promise for a collection of Space Memberships
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getSpaceMemberships(query?: object): Promise<Collection<SpaceMembership>>

  /**
   * Gets a User
   * @param id - User ID
   * @return Promise for a User
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceUser('id'))
   * .then((user) => console.log(user))
   * .catch(console.error)
   * ```
   */
  getSpaceUser(id: string): Promise<User>
  /**
   * Gets a collection of Users in a space
   * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return Promise a collection of Users in a space
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceUsers(query))
   * .then((data) => console.log(data))
   * .catch(console.error)
   * ```
   */
  getSpaceUsers: (query: QueryOptions) => Promise<Collection<User>>
  /**
   * Gets a Team Space Membership
   * @param id - Team Space Membership ID
   * @return Promise for a Team Space Membership
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getTeamSpaceMembership('team_space_membership_id'))
   * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
   * .catch(console.error)
   * ```
   */
  getTeamSpaceMembership(id: string): Promise<TeamSpaceMembership>

  /**
   * Gets a collection of Team Space Memberships
   * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return Promise for a collection of Team Space Memberships
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getTeamSpaceMemberships())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getTeamSpaceMemberships(): Promise<Collection<TeamSpaceMembership>>
}

export interface Space
  extends SpaceProps,
    DefaultElements<SpaceProps & MetaSys>,
    MetaSys,
    ContentfulSpaceAPI {}
