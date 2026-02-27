/**
 * @module
 * @category Entities
 */
import type {
  BasicCursorPaginationOptions,
  CursorPaginatedCollectionProp,
  MakeRequest,
  SysLink,
} from '../common-types'
import { wrapCursorPaginatedCollection } from '../common-utils'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'

/** Query options for looking up or searching external resources */
export type ResourceQueryOptions = LookupQueryOptions | SearchQueryOptions

type LookupQueryOptions = {
  'sys.urn[in]': string
  locale?: string
  referencingEntryId?: string
} & BasicCursorPaginationOptions

type SearchQueryOptions = {
  query: string
  locale?: string
  referencingEntryId?: string
} & BasicCursorPaginationOptions

/** Properties of an external resource linked via a resource provider */
export type ResourceProps = {
  sys: {
    type: 'Resource'
    urn: string
    resourceType: SysLink
    resourceProvider: SysLink
    appDefinition: SysLink
  }
  fields: {
    title: string
    subtitle?: string
    description?: string
    externalUrl?: string
    image?: {
      url: string
      altText?: string
    }
    badge?: {
      label: string
      variant: 'primary' | 'negative' | 'positive' | 'warning' | 'secondary'
    }
  }
}
export function wrapResource(makeRequest: MakeRequest, data: ResourceProps) {
  const resource = toPlainObject(data)
  return freezeSys(resource)
}
export const wrapResourceCollection: (
  makeRequest: MakeRequest,
  data: CursorPaginatedCollectionProp<ResourceProps>,
) => CursorPaginatedCollectionProp<ResourceProps> = wrapCursorPaginatedCollection(wrapResource)
