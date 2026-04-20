/**
 * @module
 * @category Shared Types
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest } from '../common-types'

/** The lifecycle status of a content semantics index */
export type ContentSemanticsIndexStatus = 'ACTIVE' | 'PENDING' | 'DELETING'

/** Properties of a content semantics index */
export type ContentSemanticsIndexProps = {
  sys: {
    id: string
    type: 'ContentSemanticsIndex'
    status: ContentSemanticsIndexStatus
    localeCode: string
    createdAt: string
    updatedAt: string
    createdBy: Link<'User'> | null
    locale: Link<'Locale'>
    environment: Link<'Environment'>
    space: Link<'Space'>
    organization: Link<'Organization'>
  }
}

/** Properties of a collection of content semantics indexes */
export type ContentSemanticsIndexCollectionProps = {
  sys: {
    type: 'Array'
  }
  items: ContentSemanticsIndexProps[]
}

/** Properties required to create a content semantics index */
export type CreateContentSemanticsIndexProps = {
  spaceId: string
  locale: string
}

/** A content semantics index entity */
export interface ContentSemanticsIndex
  extends ContentSemanticsIndexProps,
    DefaultElements<ContentSemanticsIndexProps> {}

/** A collection of content semantics index entities */
export interface ContentSemanticsIndexCollection
  extends ContentSemanticsIndexCollectionProps,
    DefaultElements<ContentSemanticsIndexCollectionProps> {}

/**
 * @internal
 * @param _makeRequest - function to make requests via an adapter
 * @param data - Raw Content Semantics Index data
 * @returns Wrapped Content Semantics Index data
 */
export function wrapContentSemanticsIndex(
  _makeRequest: MakeRequest,
  data: ContentSemanticsIndexProps,
): ContentSemanticsIndex {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}

/**
 * @internal
 * @param _makeRequest - function to make requests via an adapter
 * @param data - Raw Content Semantics Index collection data
 * @returns Wrapped Content Semantics Index collection data
 */
export function wrapContentSemanticsIndexCollection(
  _makeRequest: MakeRequest,
  data: ContentSemanticsIndexCollectionProps,
): ContentSemanticsIndexCollection {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}
