import type { MakeRequest} from './common-types'
import entities from './entities'
import type { FunctionProps } from './entities/function'

/**
 * @private
 */
export type ContentfulFunctionApi = ReturnType<typeof createFunctionApi>

/**
 * @private
 */
export default function createFunctionApi(makeRequest: MakeRequest) {
  const { wrapFunction, wrapFunctionCollection } = entities.func

  return {
    getManyFunctions() {
      const raw = this.toPlainObject() as FunctionProps
      return makeRequest({
        entityType: 'Function',
        action: 'getMany',
        params: {
          appDefinitionId: raw.sys.appDefinition.sys.id,
          organizationId: raw.sys.organization.sys.id,
        },
      }).then((data) => wrapFunctionCollection(makeRequest, data))
    },

    getFunction(functionId: string) {
      const raw = this.toPlainObject() as FunctionProps
      return makeRequest({
        entityType: 'Function',
        action: 'get',
        params: {
          appDefinitionId: raw.sys.appDefinition.sys.id,
          organizationId: raw.sys.organization.sys.id,
          functionId,
        },
      }).then((data) => wrapFunction(makeRequest, data))
    },

    getManyFunctionsForEnvironment(
      spaceId: string,
      environmentId: string,
      appInstallationId: string
    ) {
      return makeRequest({
        entityType: 'Function',
        action: 'getManyForEnvironment',
        params: {
          spaceId: spaceId,
          environmentId: environmentId,
          appInstallationId: appInstallationId,
        },
      }).then((data) => wrapFunctionCollection(makeRequest, data))
    },
  }
}
