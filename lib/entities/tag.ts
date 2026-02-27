/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  DefaultElements,
  GetTagParams,
  MakeRequest,
  MetaSysProps,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

/** Visibility level of a tag */
export type TagVisibility = 'private' | 'public'

/** System metadata properties for a tag */
export type TagSysProps = Pick<
  MetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Tag'
  visibility: TagVisibility
  space: SysLink
  environment: SysLink
}

/** Properties of a tag used to categorize entries and assets */
export type TagProps = {
  sys: TagSysProps
  name: string
}

/** Properties required to create a new tag */
export type CreateTagProps = Omit<TagProps, 'sys'> & { sys: Pick<TagSysProps, 'visibility'> }
/** Properties for updating an existing tag */
export type UpdateTagProps = Omit<TagProps, 'sys'> & { sys: Pick<TagSysProps, 'version'> }

/** Parameters required to delete a tag */
export type DeleteTagParams = GetTagParams & { version: number }

/** Raw tag collection response from the API */
export type TagCollectionProps = {
  sys: {
    type: 'Array'
  }
  items: TagProps[]
  total: number
}

/** A collection of tag entities */
export interface TagCollection {
  items: Tag[]
  total: number
}

type TagApi = {
  update(): Promise<Tag>
  delete(): Promise<void>
}

/** A tag with methods to update and delete */
export interface Tag extends TagProps, DefaultElements<TagProps>, TagApi {}

/**
 * @internal
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
 * @internal
 */
export function wrapTag(makeRequest: MakeRequest, data: TagProps): Tag {
  const tag = toPlainObject(copy(data))
  const tagWithMethods = enhanceWithMethods(tag, createTagApi(makeRequest))
  return freezeSys(tagWithMethods)
}

/**
 * @internal
 */
export const wrapTagCollection = wrapCollection(wrapTag)
