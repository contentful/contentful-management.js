import { Link, VersionedLink } from '../lib/common-types'

export function makeLink(type, id): Link<'Entry' | 'Asset'> {
  return {
    sys: { id, linkType: type, type: 'Link' },
  }
}

export function makeVersionedLink(type, id, version: number): VersionedLink<'Entry' | 'Asset'> {
  return {
    sys: { id, linkType: type, type: 'Link', version },
  }
}

export function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
