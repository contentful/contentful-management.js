import { AppDefinition, AppDefinitionProps } from './generated/entities/app-definition'
import { DefaultElements, Collection, QueryOptions } from './generated/types/common-types'
import { OrganizationInvitation, OrganizationInvitationProps } from './generated/entities/organization-invitation';
import { Options as TeamMembershipOptions, TeamMembership, TeamMembershipProps } from './generated/entities/team-membership'
import { Options as TeamSpaceMembershipOptions, TeamSpaceMembership } from './generated/entities/team-space-membership'
import { Team, TeamProps } from './generated/entities/team'
import { User } from './generated/entities/user'
import { OrganizationMembership } from './generated/entities/organization-membership'
import { OrganizationProp } from './generated/entities/organization';

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
  createOrganizationInvitation(data: Omit<OrganizationInvitationProps, 'sys'>): Promise<OrganizationInvitation>
  getOrganizationMemberships(query?: QueryOptions): Promise<Collection<OrganizationMembership>>
  getOrganizationMembership(id: string): Promise<OrganizationMembership>
}

export interface Organization
  extends DefaultElements<OrganizationProp>,
    OrganizationProp,
    ContentfulOrganizationAPI {}
