import { AxiosInstance } from 'contentful-sdk-core'
import { MRActions, MROpts, MRReturn } from '../../common-types'

/**
 * @private
 */
export type RestEndpoint<
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
  ? (http: AxiosInstance) => Return
  : Payload extends undefined
  ? (http: AxiosInstance, params: Params) => Return
  : Headers extends undefined
  ? (http: AxiosInstance, params: Params, payload: Payload) => Return
  : (http: AxiosInstance, params: Params, payload: Payload, headers: Headers) => Return
