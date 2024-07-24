import { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, QueryParams } from '../../../common-types'
import {
  CreatePersonalAccessTokenProps,
  PersonalAccessTokenProps,
} from '../../../entities/personal-access-token'
import { RestEndpoint } from '../types'
import * as raw from './raw'

/**
 * @deprecated use `access-token.get` instead `personal-access-token.get`
 */
export const get: RestEndpoint<'PersonalAccessToken', 'get'> = (
  http: AxiosInstance,
  params: { tokenId: string }
) => {
  return raw.get<PersonalAccessTokenProps>(http, `/users/me/access_tokens/${params.tokenId}`)
}

/**
 * @deprecated use `access-token.getMany` instead `personal-access-token.getMany`
 */
export const getMany: RestEndpoint<'PersonalAccessToken', 'getMany'> = (
  http: AxiosInstance,
  params: QueryParams
) => {
  return raw.get<CollectionProp<PersonalAccessTokenProps>>(http, '/users/me/access_tokens', {
    params: params.query,
  })
}

/**
 * @deprecated use `access-token.createPersonalAccessToken` instead. `personal-access-token.create`
 */
export const create: RestEndpoint<'PersonalAccessToken', 'create'> = (
  http: AxiosInstance,
  _params: {},
  rawData: CreatePersonalAccessTokenProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.post<PersonalAccessTokenProps>(http, '/users/me/access_tokens', rawData, {
    headers,
  })
}

/**
 * @deprecated use `access-token.rovoke` instead. `personal-access-token.revoke`
 */
export const revoke: RestEndpoint<'PersonalAccessToken', 'revoke'> = (
  http: AxiosInstance,
  params: { tokenId: string }
) => {
  return raw.put<PersonalAccessTokenProps>(
    http,
    `/users/me/access_tokens/${params.tokenId}/revoked`,
    null
  )
}
