import { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, GetOrganizationParams, QueryParams } from '../../../common-types'
import { CreatePersonalAccessTokenProps, AccessTokenProp } from '../../../entities/access-token'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'AccessToken', 'get'> = (
  http: AxiosInstance,
  params: { tokenId: string }
) => {
  return raw.get<AccessTokenProp>(http, `/users/me/access_tokens/${params.tokenId}`)
}

export const getMany: RestEndpoint<'AccessToken', 'getMany'> = (
  http: AxiosInstance,
  params: QueryParams
) => {
  return raw.get<CollectionProp<AccessTokenProp>>(http, '/users/me/access_tokens', {
    params: params.query,
  })
}

export const createPersonalAccessToken: RestEndpoint<'AccessToken', 'createPersonalAccessToken'> = (
  http: AxiosInstance,
  _params: {},
  rawData: CreatePersonalAccessTokenProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.post<AccessTokenProp>(http, '/users/me/access_tokens', rawData, {
    headers,
  })
}

export const revoke: RestEndpoint<'AccessToken', 'revoke'> = (
  http: AxiosInstance,
  params: { tokenId: string }
) => {
  return raw.put<AccessTokenProp>(http, `/users/me/access_tokens/${params.tokenId}/revoked`, null)
}

export const getManyForOrganization: RestEndpoint<'AccessToken', 'getManyForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get<CollectionProp<AccessTokenProp>>(
    http,
    `/organizations/${params.organizationId}/access_tokens`,
    {
      params: params.query,
    }
  )
}
