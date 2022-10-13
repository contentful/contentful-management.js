import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { BasicMetaSysProps, Link, MakeRequest, DefaultElements } from '../common-types'
import { wrapCursorPaginatedCollection } from '../common-utils'
import {
  ContentfulEnvironmentTemplateApi,
  createEnvironmentTemplateApi,
} from '../create-environment-template-api'
import enhanceWithMethods from '../enhance-with-methods'
import { ContentType } from './content-type'
import { EditorInterface } from './editor-interface'

export type Hint = {
  operation: 'renameFieldId'
  fieldId: string
  previousFieldId: string
}

export interface EditorInterfaceTemplate extends Omit<EditorInterface, 'sys'> {
  contentTypeTemplate: Link<'ContentTypeTemplate'>
}

export interface ContentTypeTemplate extends Omit<ContentType, 'sys'> {
  id: string
  basedOn?: {
    space: Link<'Space'>
    environment: Link<'Environment'>
    contentType: Link<'ContentType'>
  }
  hints?: Array<Hint>
}

export type EnvironmentTemplateProps = {
  sys: BasicMetaSysProps & { version: number }
  name: string
  description?: string
  versionName: string
  versionDescription?: string
  entities: {
    contentTypeTemplates: Array<ContentTypeTemplate>
    editorInterfaceTemplates: Array<EditorInterfaceTemplate>
  }
}

export type CreateEnvironmentTemplateProps = Omit<EnvironmentTemplateProps, 'sys'>

export type EnvironmentTemplate = EnvironmentTemplateProps &
  DefaultElements<EnvironmentTemplateProps> &
  ContentfulEnvironmentTemplateApi

export function wrapEnvironmentTemplate(
  makeRequest: MakeRequest,
  data: EnvironmentTemplateProps,
  organizationId: string
): EnvironmentTemplate {
  const environmentTemplate = toPlainObject(copy(data))
  const environmentTemplateApi = createEnvironmentTemplateApi(makeRequest, organizationId)
  const enhancedEnvironmentTemplate = enhanceWithMethods(
    environmentTemplate,
    environmentTemplateApi
  )
  return freezeSys(enhancedEnvironmentTemplate)
}

export const wrapEnvironmentTemplateCollection =
  wrapCursorPaginatedCollection(wrapEnvironmentTemplate)
