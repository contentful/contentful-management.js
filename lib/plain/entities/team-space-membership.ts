import { RawAxiosRequestHeaders } from 'axios'
import {
  GetTeamSpaceMembershipParams,
  GetSpaceParams,
  QueryParams,
  CollectionProp,
  GetOrganizationParams,
} from '../../common-types'
import { TeamSpaceMembershipProps, CreateTeamSpaceMembershipProps } from '../../export-types'
import { OptionalDefaults } from '../wrappers/wrap'

export type TeamSpaceMembershipPlainClientAPI = {
  get(params: OptionalDefaults<GetTeamSpaceMembershipParams>): Promise<TeamSpaceMembershipProps>
  getMany(
    params: OptionalDefaults<GetSpaceParams & QueryParams>
  ): Promise<CollectionProp<TeamSpaceMembershipProps>>
  getForOrganization(
    params: OptionalDefaults<GetOrganizationParams & { teamSpaceMembershipId: string }>
  ): Promise<TeamSpaceMembershipProps>
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams & { teamId?: string }>
  ): Promise<CollectionProp<TeamSpaceMembershipProps>>
  create(
    params: OptionalDefaults<GetSpaceParams & { teamId: string }>,
    rawData: CreateTeamSpaceMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TeamSpaceMembershipProps>
  update(
    params: OptionalDefaults<GetTeamSpaceMembershipParams>,
    rawData: TeamSpaceMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TeamSpaceMembershipProps>
  delete(params: OptionalDefaults<GetTeamSpaceMembershipParams>): Promise<void>
}
