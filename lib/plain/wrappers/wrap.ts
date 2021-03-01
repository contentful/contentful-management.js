/* eslint-disable @typescript-eslint/no-explicit-any */

import { Except } from 'type-fest'
import { MakeRequestWithUserAgent } from '../../common-types'

export type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
}

export type MarkOptional<BaseType, Keys extends keyof BaseType = keyof BaseType> =
  // Pick just the keys that are not optional from the base type.
  Except<BaseType, Keys> &
    // Pick the keys that should be optional from the base type and make them optional.
    Partial<Pick<BaseType, Keys>>

export type WrapParams = {
  makeRequest: MakeRequestWithUserAgent
  defaults?: DefaultParams
}

export const wrap = <Params extends {}, Payload extends {}>(
  { makeRequest, defaults }: WrapParams,
  entityType: string,
  action: string
) => {
  return (params?: Params, payload?: Payload, headers?: Record<string, unknown>): Promise<any> =>
    makeRequest({
      entityType,
      action,
      params: { ...defaults, ...params },
      payload,
      headers,
    })
}
