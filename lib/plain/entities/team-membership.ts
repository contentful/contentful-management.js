import { RawAxiosRequestHeaders } from 'axios'
import {
  GetTeamMembershipParams,
  GetOrganizationParams,
  QueryParams,
  CollectionProp,
  GetTeamParams,
} from '../../common-types'
import { TeamMembershipProps, CreateTeamMembershipProps } from '../../export-types'
import { OptionalDefaults } from '../wrappers/wrap'

export type TeamMembershipPlainClientAPI = {
  get(params: OptionalDefaults<GetTeamMembershipParams>): Promise<TeamMembershipProps>
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>
  ): Promise<CollectionProp<TeamMembershipProps>>
  getManyForTeam(
    params: OptionalDefaults<GetTeamParams & QueryParams>
  ): Promise<CollectionProp<TeamMembershipProps>>
  create(
    params: OptionalDefaults<GetTeamParams>,
    rawData: CreateTeamMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TeamMembershipProps>
  update(
    params: OptionalDefaults<GetTeamMembershipParams>,
    rawData: TeamMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TeamMembershipProps>
  delete(params: OptionalDefaults<GetTeamMembershipParams>): Promise<void>
}
