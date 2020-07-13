import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CollectionProp, QueryParams } from './common-types'
import {
  PersonalAccessTokenProp,
  CreatePersonalAccessTokenProps,
} from '../../entities/personal-access-token'

export const get = (http: AxiosInstance, params: { tokenId: string }) => {
  return raw.get<PersonalAccessTokenProp>(http, `/users/me/access_tokens/${params.tokenId}`)
}

export const getMany = (http: AxiosInstance, params: QueryParams) => {
  return raw.get<CollectionProp<PersonalAccessTokenProp>>(http, '/users/me/access_tokens', {
    params: params.query,
  })
}

export const create = (
  http: AxiosInstance,
  rawData: CreatePersonalAccessTokenProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<PersonalAccessTokenProp>(http, '/users/me/access_tokens', rawData, {
    headers,
  })
}

export const revoke = (http: AxiosInstance, params: { tokenId: string }) => {
  return raw.put<PersonalAccessTokenProp>(http, `/users/me/access_tokens/${params.tokenId}`, null)
}
