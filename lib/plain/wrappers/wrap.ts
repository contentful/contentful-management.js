/* eslint-disable @typescript-eslint/no-explicit-any */

import { Except } from 'type-fest'
import { MakeRequest, MRActions, MROpts, MRReturn } from '../../common-types'

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
  makeRequest: MakeRequest
  defaults?: DefaultParams
}

export type WrapFn<
  ET extends keyof MRActions,
  Action extends keyof MRActions[ET],
  Params = 'params' extends keyof MROpts<ET, Action, false>
    ? MROpts<ET, Action, false>['params']
    : undefined,
  Payload = 'payload' extends keyof MROpts<ET, Action, false>
    ? MROpts<ET, Action, false>['payload']
    : undefined,
  Headers = 'headers' extends keyof MROpts<ET, Action, false>
    ? MROpts<ET, Action, false>['headers']
    : undefined,
  Return = MRReturn<ET, Action>
> = Params extends undefined
  ? () => Return
  : Payload extends undefined
  ? (params: Params) => Return
  : Headers extends undefined
  ? (params: Params, payload: Payload) => Return
  : (params: Params, payload: Payload, headers: Headers) => Return

export const wrap = <ET extends keyof MRActions, Action extends keyof MRActions[ET]>(
  { makeRequest, defaults }: WrapParams,
  entityType: ET,
  action: Action
): WrapFn<ET, Action> => {
  type Params = 'params' extends keyof MRActions[ET][Action]
    ? MRActions[ET][Action]['params']
    : never
  type Payload = 'payload' extends keyof MRActions[ET][Action]
    ? MRActions[ET][Action]['payload']
    : never
  type Headers = 'headers' extends keyof MRActions[ET][Action]
    ? MRActions[ET][Action]['headers']
    : never

  // It's not really possible to make this type safe as we are overloading `makeRequest`.
  // This missing typesafety is only within `wrap`. `wrap` has proper public types.
  // @ts-expect-error
  return (params?: Params, payload?: Payload, headers?: Headers): MRReturn<ET, Action> =>
    // @ts-expect-error
    makeRequest({
      // @ts-expect-error
      entityType,
      // @ts-expect-error
      action,
      // @ts-expect-error
      params: { ...defaults, ...params },
      payload,
      headers,
    })
}
