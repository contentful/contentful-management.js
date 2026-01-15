import type { MakeRequest, MRActions, MRReturn } from '../../common-types'

export type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
  releaseSchemaVersion?: 'Release.v1' | 'Release.v2'
  releaseId?: string
}
/**
 * @private
 */
type UnionOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

/**
 * @private Not meant to be used directly by consumers and may change at any time
 */
export type OptionalDefaults<T> = UnionOmit<T, keyof DefaultParams> &
  Partial<Pick<T, Extract<keyof T, keyof DefaultParams>>>

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
  Return = MRReturn<ET, Action>,
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
  action: Action,
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
      // Required after adding optional headers to a delete method for the first time
      // @ts-expect-error
      headers,
    })
}
