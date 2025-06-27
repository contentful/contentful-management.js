import type {
  BasicCursorPaginationOptions,
  CursorPaginatedCollectionProp,
  Link,
  MakeRequest,
} from '../common-types.js'
import { wrapCursorPaginatedCollection } from '../common-utils.js'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'

export type ResourceQueryOptions = LookupQueryOptions | SearchQueryOptions

type LookupQueryOptions = {
  'sys.urn[in]': string
  locale?: string
} & BasicCursorPaginationOptions

type SearchQueryOptions = {
  query: string
  locale?: string
} & BasicCursorPaginationOptions

export type ResourceProps = {
  sys: {
    type: 'Resource'
    urn: string
    resourceType: Link<'ResourceType'>
    resourceProvider: Link<'ResourceProvider'>
    appDefinition: Link<'AppDefinition'>
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
  data: CursorPaginatedCollectionProp<ResourceProps>
) => CursorPaginatedCollectionProp<ResourceProps> = wrapCursorPaginatedCollection(wrapResource)
