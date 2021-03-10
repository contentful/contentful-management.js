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
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return (
    params?: Record<string, unknown>,
    payload?: unknown,
    headers?: Record<string, unknown>
  ): Promise<any> =>
    makeRequest({
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      entityType,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      action,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      params: { ...defaults, ...params },
      payload,
      headers,
    })
}
