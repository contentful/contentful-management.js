import type { Link, DefaultElements } from '../common-types.js'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { wrapCollection } from '../common-utils.js'
import type { MakeRequest } from '../common-types.js'
import enhanceWithMethods from '../enhance-with-methods.js'

export type FunctionProps = {
  sys: {
    id: string
    type: 'Function'
    createdBy: Link<'User'> // Only users can CRUD
    createdAt: string
    updatedBy: Link<'User'> // Only users can CRUD
    updatedAt: string
    organization: Link<'Organization'>
    appDefinition: Link<'AppDefinition'>
  }
  name: string
  description: string
  path: string
  accepts: string[]
  allowNetworks?: string[]
}

export interface Function extends FunctionProps, DefaultElements<FunctionProps> {}

/**
 * @private
 */
function createFunctionApi(makeRequest: MakeRequest) {
  return {
    getFunction: function getFunction() {
      const raw = this.toPlainObject() as FunctionProps
      return makeRequest({
        entityType: 'Function',
        action: 'get',
        params: {
          organizationId: raw.sys.organization.sys.id,
          appDefinitionId: raw.sys.appDefinition.sys.id,
          functionId: raw.sys.id,
        },
      }).then((data) => wrapFunction(makeRequest, data))
    },
    getManyFunctions: function getManyFunctions() {
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
    getManyFunctionsForEnvironment(
      spaceId: string,
      environmentId: string,
      appInstallationId: string,
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

/**
 * @private
 * @param makeRequest - (real) function to make requests via an adapter
 * @param data - raw contentful-Function data
 * @return Wrapped Function data
 */
export function wrapFunction(makeRequest: MakeRequest, data: FunctionProps): FunctionProps {
  const func = toPlainObject(copy(data))
  const funcWithMethods = enhanceWithMethods(func, createFunctionApi(makeRequest))
  return freezeSys(funcWithMethods)
}
/**
 * @private
 */
export const wrapFunctionCollection = wrapCollection(wrapFunction)
