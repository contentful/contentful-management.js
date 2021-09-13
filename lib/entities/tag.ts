import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { DefaultElements, GetTagParams, MakeRequest, MetaSysProps, SysLink } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export type TagVisibility = 'private' | 'public'

export type TagSysProps = Pick<
  MetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Tag'
  visibility: TagVisibility
  space: SysLink
  environment: SysLink
}

export type TagProps = {
  sys: TagSysProps
  name: string
}

export type CreateTagProps = Omit<TagProps, 'sys'> & { sys: Pick<TagSysProps, 'visibility'> }
export type UpdateTagProps = Omit<TagProps, 'sys'> & { sys: Pick<TagSysProps, 'version'> }

export type DeleteTagParams = GetTagParams & { version: number }

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

/**
 * @private
 */
export default function createTagApi(makeRequest: MakeRequest): TagApi {
  const getParams = (tag: TagProps) => ({
    spaceId: tag.sys.space.sys.id,
    environmentId: tag.sys.environment.sys.id,
    tagId: tag.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as TagProps

      return makeRequest({
        entityType: 'Tag',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapTag(makeRequest, data))
    },

    delete: function () {
      const raw = this.toPlainObject() as TagProps

      return makeRequest({
        entityType: 'Tag',
        action: 'delete',
        params: {
          ...getParams(raw),
          version: raw.sys.version,
        },
      }).then(() => {
        // noop
      })
    },
  }
}

/**
 * @private
 */
export function wrapTag(makeRequest: MakeRequest, data: TagProps): Tag {
  const tag = toPlainObject(copy(data))
  const tagWithMethods = enhanceWithMethods(tag, createTagApi(makeRequest))
  return freezeSys(tagWithMethods)
}

/**
 * @private
 */
export const wrapTagCollection = wrapCollection(wrapTag)
