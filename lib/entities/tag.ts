import { AxiosInstance } from 'axios'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { cloneDeep } from 'lodash'
import { DefaultElements, MetaSysProps } from '../common-types'
import { VersionHeader, wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import errorHandler from '../error-handler'

export type TagSysProps = Pick<
  MetaSysProps,
  'id' | 'space' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Tag'
  environment: {
    sys: {
      id: string
      type: 'Link'
      linkType: 'Environment'
    }
  }
}

export type TagProps = {
  sys: TagSysProps
  name: string
}

export type TagCollectionProps = {
  sys: {
    type: 'Array'
  }
  items: TagProps[]
  total: number
}

export interface TagCollection {
  items: Tag[]
  total: number
}

type ThisContext = TagProps & DefaultElements<TagProps>

type TagApi = {
  update(): Promise<Tag>
  delete(): Promise<void>
}

export interface Tag extends TagProps, DefaultElements<TagProps>, TagApi {}

export function createDeleteTag(http: AxiosInstance): () => Promise<void> {
  return function (): Promise<void> {
    const self = this as ThisContext
    return (
      http
        .delete('tags/' + self.sys.id, VersionHeader(self.sys.version))
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .then(() => {}, errorHandler)
    )
  }
}

export function createUpdateTag(http: AxiosInstance): () => Promise<Tag> {
  return function (): Promise<Tag> {
    const self = this as ThisContext
    return http
      .put(
        'tags',
        {
          name: self.name,
          sys: {
            id: self.sys.id,
          },
        },
        VersionHeader(self.sys.version)
      )
      .then((response) => wrapTag(http, response.data), errorHandler)
  }
}

export default function createTagApi(http: AxiosInstance): TagApi {
  return {
    update: createUpdateTag(http),
    delete: createDeleteTag(http),
  }
}

export function wrapTag(http: AxiosInstance, data: TagProps): Tag {
  const tag = toPlainObject(cloneDeep(data))
  const tagWithMethods = enhanceWithMethods(tag, createTagApi(http))
  return freezeSys(tagWithMethods)
}

export const wrapTagCollection = wrapCollection(wrapTag)
