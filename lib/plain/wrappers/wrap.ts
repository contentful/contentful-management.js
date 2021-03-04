/* eslint-disable @typescript-eslint/no-explicit-any */

import { Except } from 'type-fest'
import { Adapter, MakeRequestOptions } from '../../common-types'

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
  adapter: Adapter
  defaults?: DefaultParams
  userAgent: string
}

export const wrap = <Params extends {}, Payload extends {}>(
  { adapter, defaults, userAgent }: WrapParams,
  entityType: string,
  action: string
) => {
  return (params?: Params, payload?: Payload, headers?: Record<string, unknown>) =>
    (adapter.makeRequest as (options: MakeRequestOptions) => Promise<any>)({
      entityType,
      action,
      params: { ...defaults, ...params },
      payload,
      headers,
      userAgent,
    })
}
