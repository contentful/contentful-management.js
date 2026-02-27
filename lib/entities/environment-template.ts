/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { BasicMetaSysProps, Link, MakeRequest, DefaultElements } from '../common-types'
import { wrapCursorPaginatedCollection } from '../common-utils'
import type { ContentfulEnvironmentTemplateAPI } from '../create-environment-template-api'
import { createEnvironmentTemplateApi } from '../create-environment-template-api'
import enhanceWithMethods from '../enhance-with-methods'
import type { ContentTypeProps } from './content-type'
import type { EditorInterfaceProps } from './editor-interface'

/** A migration hint describing a field operation such as renaming */
export type Hint = {
  operation: 'renameFieldId'
  fieldId: string
  previousFieldId: string
}

/** Editor interface configuration within an environment template */
export interface EditorInterfaceTemplateProps extends Omit<EditorInterfaceProps, 'sys'> {
  contentTypeTemplate: Link<'ContentTypeTemplate'>
}

/** Content type definition within an environment template */
export interface ContentTypeTemplateProps extends Omit<ContentTypeProps, 'sys'> {
  id: string
  basedOn?: {
    space: Link<'Space'>
    environment: Link<'Environment'>
    contentType: Link<'ContentType'>
  }
  hints?: Array<Hint>
}

/** Properties of an environment template containing content type and editor interface definitions */
export type EnvironmentTemplateProps = {
  sys: BasicMetaSysProps & { version: number; organization: Link<'Organization'> }
  name: string
  description?: string
  versionName: string
  versionDescription?: string
  entities: {
    contentTypeTemplates: Array<ContentTypeTemplateProps>
    editorInterfaceTemplates: Array<EditorInterfaceTemplateProps>
  }
  forTemplatedSpaces?: boolean
}

/** Properties required to create a new environment template */
export type CreateEnvironmentTemplateProps = Omit<EnvironmentTemplateProps, 'sys'>

/** An environment template with methods to update, version, install, and validate */
export type EnvironmentTemplate = EnvironmentTemplateProps &
  DefaultElements<EnvironmentTemplateProps> &
  ContentfulEnvironmentTemplateAPI

export function wrapEnvironmentTemplate(
  makeRequest: MakeRequest,
  data: EnvironmentTemplateProps,
  organizationId: string,
): EnvironmentTemplate {
  const environmentTemplate = toPlainObject(copy(data))
  const environmentTemplateApi = createEnvironmentTemplateApi(makeRequest, organizationId)
  const enhancedEnvironmentTemplate = enhanceWithMethods(
    environmentTemplate,
    environmentTemplateApi,
  )
  return freezeSys(enhancedEnvironmentTemplate)
}

export const wrapEnvironmentTemplateCollection =
  wrapCursorPaginatedCollection(wrapEnvironmentTemplate)
