import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, QueryParams } from '../../../common-types'
import {
  CreatePersonalAccessTokenProps,
  PersonalAccessTokenProp,
} from '../../../entities/personal-access-token'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'PersonalAccessToken', 'get'> = (
  http: AxiosInstance,
  params: { tokenId: string }
) => {
  return raw.get<PersonalAccessTokenProp>(http, `/users/me/access_tokens/${params.tokenId}`)
}

export const getMany: RestEndpoint<'PersonalAccessToken', 'getMany'> = (
  http: AxiosInstance,
  params: QueryParams
) => {
  return raw.get<CollectionProp<PersonalAccessTokenProp>>(http, '/users/me/access_tokens', {
    params: params.query,
  })
}

export const create: RestEndpoint<'PersonalAccessToken', 'create'> = (
  http: AxiosInstance,
  _params: {},
  rawData: CreatePersonalAccessTokenProps,
  headers?: AxiosRequestHeaders
) => {
  return raw.post<PersonalAccessTokenProp>(http, '/users/me/access_tokens', rawData, {
    headers,
  })
}

export const revoke: RestEndpoint<'PersonalAccessToken', 'revoke'> = (
  http: AxiosInstance,
  params: { tokenId: string }
) => {
  return raw.put<PersonalAccessTokenProp>(
    http,
    `/users/me/access_tokens/${params.tokenId}/revoked`,
    null
  )
}
