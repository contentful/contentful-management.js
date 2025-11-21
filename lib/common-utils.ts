/* eslint-disable @typescript-eslint/ban-ts-comment */

import { toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  BasicCursorPaginationOptions,
  Collection,
  CollectionProp,
  CursorBasedParams,
  CursorPaginatedCollection,
  CursorPaginatedCollectionProp,
  MakeRequest,
} from './common-types'

/**
 * @private
 */
export const wrapCollection =
  <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) =>
  (makeRequest: MakeRequest, data: CollectionProp<T>, ...rest: Rest): Collection<R, T> => {
    const collectionData = toPlainObject(copy(data))
    // @ts-expect-error
    collectionData.items = collectionData.items.map((entity) => fn(makeRequest, entity, ...rest))
    // @ts-expect-error
    return collectionData
  }

export const wrapCursorPaginatedCollection =
  <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) =>
  (
    makeRequest: MakeRequest,
    data: CursorPaginatedCollectionProp<T>,
    ...rest: Rest
  ): CursorPaginatedCollection<R, T> => {
    const collectionData = toPlainObject(copy(data))
    // @ts-expect-error
    collectionData.items = collectionData.items.map((entity) => fn(makeRequest, entity, ...rest))
    // @ts-expect-error
    return collectionData
  }
export function isSuccessful(statusCode: number) {
  return statusCode < 300
}

export function shouldRePoll(statusCode: number) {
  return [404, 422, 429, 400].includes(statusCode)
}

export async function waitFor(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function normalizeCursorPaginationParameters(
  query: BasicCursorPaginationOptions,
): CursorBasedParams {
  const { pagePrev, pageNext, ...rest } = query

  return {
    ...rest,
    cursor: true,
    // omit pagePrev and pageNext if the value is falsy
    ...(pagePrev ? { pagePrev } : null),
    ...(pageNext ? { pageNext } : null),
  } as CursorBasedParams
}

function extractQueryParam(key: string, url?: string): string | undefined {
  if (!url) return

  const queryIndex = url.indexOf('?')
  if (queryIndex === -1) return

  const queryString = url.slice(queryIndex + 1)
  return new URLSearchParams(queryString).get(key) ?? undefined
}

const Pages = {
  prev: 'pagePrev',
  next: 'pageNext',
} as const

const PAGE_KEYS = ['prev', 'next'] as const

export function normalizeCursorPaginationResponse<T>(
  data: CursorPaginatedCollectionProp<T>
): CursorPaginatedCollectionProp<T> {
  const pages: { prev?: string; next?: string } = {}

  for (const key of PAGE_KEYS) {
    const token = extractQueryParam(Pages[key], data.pages?.[key])
    if (token) pages[key] = token
  }

  return {
    ...data,
    pages,
  }
}
