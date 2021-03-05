import { AxiosInstance } from 'contentful-sdk-core'
import { MRActions, MROpts, MRReturn } from '../../common-types'

export type RestEndpoint<ET extends keyof MRActions, Action extends keyof MRActions[ET]> = (
  http: AxiosInstance,
  params: 'params' extends keyof MROpts<ET, Action, false>
    ? MROpts<ET, Action, false>['params']
    : never,
  payload: 'payload' extends keyof MROpts<ET, Action, false>
    ? MROpts<ET, Action, false>['payload']
    : never,
  headers: 'header' extends keyof MROpts<ET, Action, false>
    ? MROpts<ET, Action, false>['header']
    : never
) => MRReturn<ET, Action>
