import { MetaSys, MetaSysProps, DefaultElements, Collection, QueryOptions } from './generated/common-types'
import { AppDefinition, AppDefinitionProps } from './generated/entities/app-definition'
import {OrganizationInvitation, OrganizationInvitationProps} from './organizationInvitation';
import { Options as TeamMembershipOptions, TeamMembership, TeamMembershipProps } from './generated/entities/team-membership'
import { Options as TeamSpaceMembershipOptions, TeamSpaceMembership } from './generated/entities/team-space-membership'
import { Team, TeamProps } from './generated/entities/team'
import { User } from './generated/entities/user'
import { Options as OrganizationMembershipOptions, OrganizationMembership } from './generated/entities/organization-membership'

export interface OrganizationProp {
  name: string
}

export interface ContentfulOrganizationAPI {
  createAppDefinition(data: AppDefinitionProps): Promise<AppDefinition>
  getAppDefinition(id: string): Promise<AppDefinition>
  getAppDefinitions(): Promise<Collection<AppDefinition>>
  getUser(userId: string): Promise<User>
  getUsers(): Promise<Collection<User>>
  createTeam(data: TeamProps): Promise<Team>
  getTeam(teamId: string, id: string): Promise<Team>
  getTeams(teamId: string): Promise<Collection<Team>>
  createTeamMembership(teamId: string, data: TeamMembershipProps): Promise<TeamMembership>
  getTeamMembership(teamId: string, id: string): Promise<TeamMembership>
  getTeamMemberships(opts?: TeamMembershipOptions): Promise<Collection<TeamMembership>>
  getTeamSpaceMembership(id: string): Promise<TeamSpaceMembership>
  getTeamSpaceMemberships(
    opts?: TeamSpaceMembershipOptions
  ): Promise<Collection<TeamSpaceMembership>>
  getOrganizationInvitation(id: string): Promise<OrganizationInvitation>
  createOrganizationInvitation(data: OrganizationInvitationProps): Promise<OrganizationInvitation>
  getOrganizationMemberships(query?: QueryOptions): Promise<Collection<OrganizationMembership>>
  getOrganizationMembership(id: string): Promise<OrganizationMembership>
}

export interface Organization
  extends DefaultElements<OrganizationProp>,
    OrganizationProp,
    MetaSys<MetaSysProps>,
    ContentfulOrganizationAPI {}
