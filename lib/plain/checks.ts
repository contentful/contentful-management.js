import type { MetaSysProps } from '../common-types'

export const isPublished = <T extends string>(data: { sys: MetaSysProps<T> }) =>
  !!data.sys.publishedVersion

export const isUpdated = <T extends string>(data: { sys: MetaSysProps<T> }) => {
  // The act of publishing an entity increases its version by 1, so any entry which has
  // 2 versions higher or more than the publishedVersion has unpublished changes.
  return !!(data.sys.publishedVersion && data.sys.version > data.sys.publishedVersion + 1)
}

export const isDraft = <T extends string>(data: { sys: MetaSysProps<T> }) =>
  !data.sys.publishedVersion

export const isArchived = <T extends string>(data: { sys: MetaSysProps<T> }) =>
  !!data.sys.archivedVersion
