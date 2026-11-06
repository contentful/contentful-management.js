import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CursorPaginatedCollectionProp,
  GetAutomationDefinitionParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  AutomationDefinitionProps,
  AutomationDefinitionQueryOptions,
  CreateAutomationDefinitionProps,
  UpdateAutomationDefinitionProps,
} from '../../entities/automation-definition'

export type DeleteAutomationDefinitionParams = GetAutomationDefinitionParams & { version: number }

export type AutomationDefinitionPlainClientAPI = {
  get(
    params: OptionalDefaults<GetAutomationDefinitionParams>,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AutomationDefinitionProps>
  getMany(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { query?: AutomationDefinitionQueryOptions }
    >,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CursorPaginatedCollectionProp<AutomationDefinitionProps>>
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateAutomationDefinitionProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AutomationDefinitionProps>
  update(
    params: OptionalDefaults<GetAutomationDefinitionParams>,
    rawData: UpdateAutomationDefinitionProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AutomationDefinitionProps>
  delete(
    params: OptionalDefaults<DeleteAutomationDefinitionParams>,
    headers?: RawAxiosRequestHeaders,
  ): Promise<void>
}
