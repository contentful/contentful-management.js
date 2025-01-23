import type { MakeRequest } from './common-types'
import entities from './entities'
import type { FunctionLogProps } from './entities/function-log'
import { wrapFunctionLogCollection } from './entities/function-log'

/**
 * @private
 */
export type ContentfulFunctionLogApi = ReturnType<typeof createFunctionLogApi>

/**
 * @private
 */
export default function createFunctionLogApi(makeRequest: MakeRequest) {
  const { wrapFunctionLog } = entities.functionLog

  return {
    /**
     * Get a FunctionLog by it's log ID
     * @Param spaceId - Space ID
     * @Param environmentId - Environment ID
     * @Param appInstallationId - App Installation ID
     * @Param functionId - Function ID
     * @Param logId - Log ID
     * @returns a function log
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     * })
     *
     * client.functionLog.get({
     *    spaceId: '<space_id>',
     *    environmentId: '<environment_id>',
     *    appInstallationId: '<app_installation_id>',
     *    functionId: '<function_id>',
     *    logId: '<log_id>'
     * })
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    get(logId: string) {
      const raw = this.toPlainObject() as FunctionLogProps
      return makeRequest({
        entityType: 'FunctionLog',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.environment.sys.id,
          appInstallationId: raw.sys.appDefinition.sys.id,
          functionId: raw.sys.id,
          logId: logId,
        },
      }).then((data) => wrapFunctionLog(makeRequest, data))
    },

    /**
     * Get all FunctionLogs
     * @Param spaceId - Space ID
     * @Param environmentId - Environment ID
     * @Param appInstallationId - App Installation ID
     * @Param functionId - Function ID
     * @returns a collection of FunctionLogs
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     * })
     *
     * client.functionLog.getMany({
     *    spaceId: '<space_id>',
     *    environmentId: '<environment_id>',
     *    appInstallationId: '<app_installation_id>',
     *    functionId: '<function_id>'
     * })
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getMany() {
      const raw = this.toPlainObject() as FunctionLogProps
      return makeRequest({
        entityType: 'FunctionLog',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.environment.sys.id,
          appInstallationId: raw.sys.appDefinition.sys.id,
          functionId: raw.sys.id,
        },
      }).then((data) => wrapFunctionLogCollection(makeRequest, data))
    },
  }
}
