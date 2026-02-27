/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
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

/** Status of an environment template installation */
export type EnvironmentTemplateInstallationStatus =
  keyof typeof EnvironmentTemplateInstallationStatuses

/** Properties of an environment template installation */
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

/** Properties required to create an environment template installation */
export type CreateEnvironmentTemplateInstallationProps = {
  version: number
  takeover?: {
    items: Link<'ContentType'>[]
  }
  changeSet?: Link<'ChangeSet'>
  deleteDeletedFields?: boolean
}

/** Properties for validating an environment template installation */
export type ValidateEnvironmentTemplateInstallationProps = Omit<
  CreateEnvironmentTemplateInstallationProps,
  'version'
>

/** A single validation finding with a message and details */
export type ValidationFinding = {
  message: string
  details: Record<string, unknown>
}

/** Validation results for an environment template installation */
export type EnvironmentTemplateValidationProps<T = ValidationFinding> = {
  sys: {
    type: 'Array'
    environment: Link<'Environment'>
    space: Link<'Space'>
    changeSet: Link<'ChangeSet'>
  }
  items: T[]
}

/** An environment template installation entity */
export type EnvironmentTemplateInstallation = EnvironmentTemplateInstallationProps &
  DefaultElements<EnvironmentTemplateInstallationProps>

export function wrapEnvironmentTemplateInstallation(
  makeRequest: MakeRequest,
  data: EnvironmentTemplateInstallationProps,
): EnvironmentTemplateInstallation {
  const environmentTemplate = toPlainObject(copy(data))
  return freezeSys(environmentTemplate)
}

export const wrapEnvironmentTemplateInstallationCollection = wrapCursorPaginatedCollection(
  wrapEnvironmentTemplateInstallation,
)
