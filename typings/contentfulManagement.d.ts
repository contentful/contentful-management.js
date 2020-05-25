import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ClientParams } from './generated/create-cma-http-client';
import { User } from './user'
import { PersonalAccessToken, PersonalAccessTokenProp } from './personalAccessToken'
import { Space, SpaceProps } from './space'
import { Collection } from './collection'
import { Organization } from './organization'
import * as Usage from './usage'

export { ClientParams } from './generated/create-cma-http-client'

export as namespace contentfulManagementStatic

declare function createClient(params: ClientParams): ClientAPI

export interface getSpacesParams {
  limit?: number,
  skip?: number
}

export interface ClientAPI {
  createPersonalAccessToken(data: PersonalAccessTokenProp): Promise<PersonalAccessToken>,
  createSpace(data: SpaceProps, organizationId: string): Promise<Space>,
  getCurrentUser(): Promise<User>,
  getOrganization(id: string): Promise<Organization>,
  getOrganizations(): Promise<Collection<Organization>>,
  getPersonalAccessToken(data: PersonalAccessTokenProp): Promise<void>,
  getPersonalAccessTokens(): Promise<Collection<PersonalAccessToken>>,
  getSpace(id: string): Promise<Space>,
  getSpaces(params?: getSpacesParams): Promise<Collection<Space>>,
  getOrganizationUsage(organizationId: string, query: Usage.UsageQuery): Promise<Collection<Usage.Usage>>,
  getSpaceUsage(organizationId: string, query: Usage.UsageQuery): Promise<Collection<Usage.Usage>>,
  rawRequest(Opts: AxiosRequestConfig): Promise<AxiosResponse>,
}
