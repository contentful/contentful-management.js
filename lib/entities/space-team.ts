import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { DefaultElements, MakeRequest, MetaLinkProps, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'

export type SpaceTeamProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & { memberCount: number; organization: { sys: MetaLinkProps } }

  /**
   * Name of the team
   */
  name: string

  /**
   * Description of the team
   */
  description: string
}

export interface SpaceTeam extends SpaceTeamProps, DefaultElements<SpaceTeamProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space team data
 * @return Wrapped space team data
 */
export function wrapSpaceTeam(_makeRequest: MakeRequest, data: SpaceTeamProps) {
  const spaceTeam = toPlainObject(copy(data))
  return freezeSys(spaceTeam)
}

/**
 * @private
 */
export const wrapSpaceTeamCollection = wrapCollection(wrapSpaceTeam)
