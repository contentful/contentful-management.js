import { QueryOptions } from '../../../common-types'

export function normalizeSelect(query?: QueryOptions): QueryOptions | undefined {
  if (query && query.select && !/sys/i.test(query.select)) {
    return {
      ...query,
      select: query.select + ',sys',
    }
  }
  return query
}

export function normalizeSpaceId(query?: QueryOptions): QueryOptions | undefined {
  if (query && query.spaceId) {
    return {
      ...query,
      'sys.space.sys.id[in]': query.spaceId,
    }
  }
  return query
}
