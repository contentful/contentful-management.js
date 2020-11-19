import { AxiosInstance } from 'axios'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { cloneDeep } from 'lodash'
import { DefaultElements, MetaSysProps, SysLink } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import * as endpoints from '../plain/endpoints'

export type TagSysProps = Pick<
  MetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Tag'
  space: SysLink
  environment: SysLink
}

export type TagProps = {
  sys: TagSysProps
  name: string
}

export type CreateTagProps = Omit<TagProps, 'sys'>

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

type TagApi = {
  update(): Promise<Tag>
  delete(): Promise<void>
}

export interface Tag extends TagProps, DefaultElements<TagProps>, TagApi {}

export default function createTagApi(http: AxiosInstance): TagApi {
  const getParams = (tag: TagProps) => ({
    spaceId: tag.sys.space.sys.id,
    environmentId: tag.sys.environment.sys.id,
    tagId: tag.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as TagProps

      return endpoints.tag.update(http, getParams(raw), raw).then((data) => wrapTag(http, data))
    },

    delete: function () {
      const raw = this.toPlainObject() as TagProps

      return endpoints.tag.del(http, getParams(raw), raw.sys.version).then(() => {
        // noop
      })
    },
  }
}

export function wrapTag(http: AxiosInstance, data: TagProps): Tag {
  const tag = toPlainObject(cloneDeep(data))
  const tagWithMethods = enhanceWithMethods(tag, createTagApi(http))
  return freezeSys(tagWithMethods)
}

export const wrapTagCollection = wrapCollection(wrapTag)
