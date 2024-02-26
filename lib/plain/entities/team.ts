import { RawAxiosRequestHeaders } from 'axios'
import {
  GetTeamParams,
  GetOrganizationParams,
  QueryParams,
  CollectionProp,
  GetSpaceParams,
} from '../../common-types'
import { TeamProps, CreateTeamProps } from '../../export-types'
import { OptionalDefaults } from '../wrappers/wrap'

export type TeamPlainClientAPI = {
  get(params: OptionalDefaults<GetTeamParams>): Promise<TeamProps>
  getMany(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>
  ): Promise<CollectionProp<TeamProps>>
  getManyForSpace(
    params: OptionalDefaults<GetSpaceParams & QueryParams>
  ): Promise<CollectionProp<TeamProps>>
  create(
    params: OptionalDefaults<GetOrganizationParams>,
    rawData: CreateTeamProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<any>
  update(
    params: OptionalDefaults<GetTeamParams>,
    rawData: TeamProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TeamProps>
  delete(params: OptionalDefaults<GetTeamParams>): Promise<void>
}
