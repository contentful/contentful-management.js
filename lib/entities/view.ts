import type { Link, MetadataProps, SysLink } from '../common-types'
import type { ComponentTypeViewport, DesignPropertyValue, ViewNode } from './component-type'

export type ViewQueryOptions = {
  _experienceCtId: string
  skip?: number
  limit?: number
  pageNext?: string
  pagePrev?: string
  order?: string
  [key: string]: unknown
}

export type ViewDimensionKeyMap = {
  designProperties: Record<string, { breakpoint: string }>
}

export type ViewContentBindings = {
  sys: {
    type: 'Link'
    id: string
    linkType: 'DataAssembly'
  }
  parameters: Record<string, Link<string>>
}

export type ViewSys = {
  id: string
  type: 'View'
  version: number
  space: SysLink
  environment: SysLink
  componentType: SysLink
  createdAt?: string
  updatedAt?: string
  createdBy?: Link<'User'>
  updatedBy?: Link<'User'>
  variant?: string
  publishedAt?: string
  publishedVersion?: number
  publishedCounter?: number
  firstPublishedAt?: string
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
  localeStatus?: Record<string, 'draft' | 'published' | 'changed'>
}

export type ViewLocalePublishPayload = { add: string[] } | { remove: string[] } | null

type ViewCommonProps = {
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  contentProperties: Record<string, unknown>
  designProperties: Record<string, DesignPropertyValue>
  dimensionKeyMap: ViewDimensionKeyMap
  contentBindings?: ViewContentBindings
  metadata?: MetadataProps
  slots?: Record<string, ViewNode[]>
}

export type ViewProps = ViewCommonProps & {
  sys: ViewSys
  _experienceCtId: string
  _slug?: string
}

export type CreateViewProps = ViewCommonProps & {
  componentTypeId: string
  _experienceCtId: string
  _slug: string
}
