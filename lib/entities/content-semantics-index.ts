import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest } from '../common-types'

export type ContentSemanticsIndexStatus = 'ACTIVE' | 'PENDING' | 'DELETING'

export type ContentSemanticsIndexProps = {
  localeCode: string
  sys: {
    id: string
    type: 'ContentSemanticsIndex'
    status: ContentSemanticsIndexStatus
    localeCode: string
    createdAt: string
    updatedAt: string
    createdBy: Link<'User'> | null
    locale: Link<'Locale'> | null
    environment: Link<'Environment'> | null
    space: Link<'Space'>
    organization: Link<'Organization'>
  }
}

export type ContentSemanticsIndexCollectionProps = {
  sys: {
    type: 'Array'
  }
  items: ContentSemanticsIndexProps[]
}

export type CreateContentSemanticsIndexProps = {
  spaceId: string
  locale: string
}

export interface ContentSemanticsIndex
  extends ContentSemanticsIndexProps,
    DefaultElements<ContentSemanticsIndexProps> {}

export function wrapContentSemanticsIndex(
  _makeRequest: MakeRequest,
  data: ContentSemanticsIndexProps,
): ContentSemanticsIndex {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}
