import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { BasicMetaSysProps, Link, MakeRequest, DefaultElements } from '../common-types'
import { wrapCursorPaginatedCollection } from '../common-utils'
import {
  ContentfulEnvironmentTemplateApi,
  createEnvironmentTemplateApi,
} from '../create-environment-template-api'
import enhanceWithMethods from '../enhance-with-methods'
import { ContentTypeProps } from './content-type'
import { EditorInterfaceProps } from './editor-interface'

export type Hint = {
  operation: 'renameFieldId'
  fieldId: string
  previousFieldId: string
}

export interface EditorInterfaceTemplateProps extends Omit<EditorInterfaceProps, 'sys'> {
  contentTypeTemplate: Link<'ContentTypeTemplate'>
}

export interface ContentTypeTemplateProps extends Omit<ContentTypeProps, 'sys'> {
  id: string
  basedOn?: {
    space: Link<'Space'>
    environment: Link<'Environment'>
    contentType: Link<'ContentType'>
  }
  hints?: Array<Hint>
}

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
