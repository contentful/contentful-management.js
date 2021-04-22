import { Link, VersionedLink } from '../lib/common-types'

export function makeLink<T extends string>(type: T, id): Link<T> {
  return {
    sys: { id, linkType: type, type: 'Link' },
  }
}

export function makeVersionedLink<T extends string>(
  type: T,
  id: string,
  version: number
): VersionedLink<T> {
  return {
    sys: { id, linkType: type, type: 'Link', version },
  }
}
