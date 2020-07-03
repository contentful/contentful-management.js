import { MetaSysProps } from '../common-types'

export const isPublished = (data: { sys: MetaSysProps }) => !!data.sys.publishedVersion

export const isUpdated = (data: { sys: MetaSysProps }) =>
  !!(data.sys.publishedVersion && data.sys.version > data.sys.publishedVersion + 1)

export const isDraft = (data: { sys: MetaSysProps }) => !data.sys.publishedVersion
