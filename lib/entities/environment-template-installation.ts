import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  BasicMetaSysProps,
  DefaultElements,
  ISO8601Timestamp,
  Link,
  MakeRequest,
  VersionedLink,
} from '../common-types'
import { wrapCursorPaginatedCollection } from '../common-utils'

type JsonObject = { [Key in string]?: JsonValue }
type JsonArray = Array<JsonValue>
type JsonValue = string | number | boolean | JsonObject | JsonArray | null
enum EnvironmentTemplateInstallationStatuses {
  created = 'created',
  inProgress = 'inProgress',
  failed = 'failed',
  succeeded = 'succeeded',
  disconnected = 'disconnected',
  inRetry = 'inRetry',
}
// WARNING: This is using 'keyof' which looks at the left hand name, not the right hand value
export type EnvironmentTemplateInstallationStatus =
  keyof typeof EnvironmentTemplateInstallationStatuses

export type EnvironmentTemplateInstallationProps = {
  sys: BasicMetaSysProps & {
    type: 'EnvironmentTemplateInstallation'
    space: Link<'Space'>
    template: VersionedLink<'Template'>
    status: EnvironmentTemplateInstallationStatus
    createdAt: ISO8601Timestamp
    updatedAt: ISO8601Timestamp
    createdBy: Link<'User' | 'AppDefinition'>
    updatedBy: Link<'User' | 'AppDefinition'>
    completedAt?: ISO8601Timestamp
    errors?: JsonArray
    environment: Link<'Environment'>
    version: number
  }
}

export type CreateEnvironmentTemplateInstallationProps = {
  version: number
  takeover?: Link<'ContentType'>[]
  changeSet?: Link<'ChangeSet'>
}

export type ValidateEnvironmentTemplateInstallationProps = Omit<
  CreateEnvironmentTemplateInstallationProps,
  'version'
>

export type ValidationFinding = {
  message: string
  details: Record<string, unknown>
}

export type ValidationProps = {
  sys: {
    type: 'Array'
    environment: Link<'Environment'>
    space: Link<'Space'>
    changeSet: Link<'ChangeSet'>
  }
  items: ValidationFinding[]
}

export type EnvironmentTemplateInstallation = EnvironmentTemplateInstallationProps &
  DefaultElements<EnvironmentTemplateInstallationProps>

export function wrapEnvironmentTemplateInstallation(
  makeRequest: MakeRequest,
  data: EnvironmentTemplateInstallationProps
): EnvironmentTemplateInstallation {
  const environmentTemplate = toPlainObject(copy(data))
  return freezeSys(environmentTemplate)
}

export const wrapEnvironmentTemplateInstallationCollection = wrapCursorPaginatedCollection(
  wrapEnvironmentTemplateInstallation
)
