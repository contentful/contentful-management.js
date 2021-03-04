import { GetContentTypeParams, MakeRequest } from '../common-types'
import { ContentTypeProps } from '../entities/content-type'

type OmitOrDelete = 'omitted' | 'deleted'

/**
 * @private
 * @param id - unique ID of the field
 * @param key - the attribute on the field to change
 * @param value - the value to set the attribute to
 */
const findAndUpdateField = function (
  contentType: ContentTypeProps,
  fieldId: string,
  omitOrDelete: OmitOrDelete
) {
  const field = contentType.fields.find((field) => field.id === fieldId)
  if (!field) {
    return Promise.reject(
      new Error(
        `Tried to omitAndDeleteField on a nonexistent field, ${fieldId}, on the content type ${contentType.name}.`
      )
    )
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  field[omitOrDelete] = true

  return Promise.resolve(contentType)
}

export const omitAndDeleteField = (
  makeRequest: MakeRequest,
  {
    fieldId,
    ...params
  }: {
    fieldId: string
  } & GetContentTypeParams,
  contentType: ContentTypeProps
) => {
  return findAndUpdateField(contentType, fieldId, 'omitted')
    .then((newContentType) => {
      return makeRequest({
        entityType: 'ContentType',
        action: 'update',
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        params,
        payload: newContentType,
      })
    })
    .then((newContentType) => {
      return findAndUpdateField(newContentType, fieldId, 'deleted')
    })
    .then((newContentType) => {
      return makeRequest({
        entityType: 'ContentType',
        action: 'update',
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        params,
        payload: newContentType,
      })
    })
}
