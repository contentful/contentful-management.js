import { MakeRequest, MRActions, MRReturn } from '../../common-types'

export type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
}

/**
 * @private
 */
export type OptionalDefaults<T> = Omit<T, keyof DefaultParams> &
  ('organizationId' extends keyof T ? { organizationId?: string } : Record<string, unknown>) &
  ('spaceId' extends keyof T ? { spaceId?: string } : Record<string, unknown>) &
  ('environmentId' extends keyof T ? { environmentId?: string } : Record<string, unknown>)

/**
 * @private
 */
export type WrapParams = {
  makeRequest: MakeRequest
  defaults?: DefaultParams
}

/**
 * @private
 */
export type WrapFn<
  ET extends keyof MRActions,
  Action extends keyof MRActions[ET],
  Params = 'params' extends keyof MRActions[ET][Action]
    ? MRActions[ET][Action]['params']
    : undefined,
  Payload = 'payload' extends keyof MRActions[ET][Action]
    ? MRActions[ET][Action]['payload']
    : undefined,
  Headers = 'headers' extends keyof MRActions[ET][Action]
    ? MRActions[ET][Action]['headers']
    : undefined,
  Return = MRReturn<ET, Action>
> = Params extends undefined
  ? () => Return
  : Payload extends undefined
  ? (params: Params) => Return
  : Headers extends undefined
  ? (params: Params, payload: Payload) => Return
  : (params: Params, payload: Payload, headers: Headers) => Return

/**
 * @private
 */
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
