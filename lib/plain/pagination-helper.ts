import {
  BasicCursorPaginationOptions,
  CollectionProp,
  CursorPaginatedCollectionProp,
  PaginationQueryOptions,
} from '../common-types'

export type OffsetBasedParams = { query?: PaginationQueryOptions }
export type CursorBasedParams = { query?: BasicCursorPaginationOptions }

type ExpectedParams = OffsetBasedParams | CursorBasedParams
type IterableCollection<T> = CollectionProp<T> | CursorPaginatedCollectionProp<T>
export type FetchFn<P extends ExpectedParams, T = unknown> = (
  params: P
) => Promise<IterableCollection<T>>
type ParamsType<P extends ExpectedParams, T extends FetchFn<P>> = T extends (
  params: infer P
) => unknown
  ? P
  : never

function isOffsetBasedCollection<T>(collection: any): collection is CollectionProp<T> {
  return 'total' in collection
}

type CursorBasedCollection<T> = Required<Pick<CursorPaginatedCollectionProp<T>, 'pages'>> &
  Omit<CursorPaginatedCollectionProp<T>, 'pages'>

function isCursorBasedCollection<T>(collection: any): collection is CursorBasedCollection<T> {
  return 'pages' in collection
}

function getSearchParam(url: string, paramName: string): string | null {
  const searchIndex = url.indexOf('?')
  if (searchIndex < 0) {
    return null
  }

  const rawSearchParams = url.slice(searchIndex + 1)
  const searchParams = new URLSearchParams(rawSearchParams)
  return searchParams.get(paramName)
}

function range(from: number, to: number): number[] {
  return Array.from(Array(Math.abs(to - from)), (_, i) => from + i)
}

/**
 * Parameters for endpoint methods that can be paginated are inconsistent, `fetchAll` will only
 * work with the more common version of supplying the limit, skip, and pageNext parameters via a distinct `query` property in the
 * parameters.
 */
export async function fetchAll<
  Params extends ExpectedParams,
  Entity,
  F extends FetchFn<Params, Entity>
>(fetchFn: FetchFn<Params, Entity>, params: ParamsType<Params, F>): Promise<Entity[]> {
  const response = await fetchFn({ ...params })

  if (isOffsetBasedCollection(response)) {
    const { total, limit, items } = response
    const hasMorePages = total > items.length

    if (!hasMorePages) {
      return items
    }

    const pageCount = Math.ceil(total / limit)
    const promises = range(1, pageCount).map((page) =>
      fetchFn({
        ...params,
        query: {
          ...params.query,
          limit,
          skip: page * limit,
        },
      }).then((result) => result.items)
    )
    const remainingItems = await Promise.all(promises)

    return [...items, ...remainingItems.flat(1)]
  }

  if (isCursorBasedCollection(response)) {
    const { pages, items } = response
    if (!pages.next) {
      return items
    }

    const pageNext = getSearchParam(pages.next, 'pageNext')
    if (!pageNext) {
      throw new Error('Missing "pageNext" query param from pages.next from response.')
    }

    return [
      ...items,
      ...(await fetchAll(fetchFn, {
        ...params,
        query: {
          ...params.query,
          pageNext,
        },
      })),
    ]
  }

  throw new Error(
    `Can not determine collection type of response, neither property "total" nor "pages" are present.`
  )
}
