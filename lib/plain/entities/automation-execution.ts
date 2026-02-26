import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CursorPaginatedCollectionProp,
  GetAutomationExecutionParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  AutomationExecutionByDefinitionQueryOptions,
  AutomationExecutionProps,
  AutomationExecutionQueryOptions,
} from '../../entities/automation-execution'

export type AutomationExecutionPlainClientAPI = {
  get(
    params: OptionalDefaults<GetAutomationExecutionParams>,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AutomationExecutionProps>
  getMany(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { query?: AutomationExecutionQueryOptions }
    >,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CursorPaginatedCollectionProp<AutomationExecutionProps>>
  getForAutomationDefinition(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & {
        automationDefinitionId: string
        query?: AutomationExecutionByDefinitionQueryOptions
      }
    >,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CursorPaginatedCollectionProp<AutomationExecutionProps>>
}
