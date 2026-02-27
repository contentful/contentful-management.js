import type { MakeRequest } from './common-types'
import type { UserUIConfig } from './entities/user-ui-config'

import { wrapUserUIConfig } from './entities/user-ui-config'

/**
 * @internal
 */
export type ContentfulUserUIConfigAPI = ReturnType<typeof createUserUIConfigApi>

/**
 * @internal
 */
export default function createUserUIConfigApi(makeRequest: MakeRequest) {
  const getParams = (self: UserUIConfig) => {
    const userUIConfig = self.toPlainObject()

    return {
      params: {
        spaceId: userUIConfig.sys.space.sys.id,
        environmentId: userUIConfig.sys.environment.sys.id,
      },
      raw: userUIConfig,
    }
  }

  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @returns Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getUserUIConfig())
     * .then((uiConfig) => {
     *   uiConfig.entryListViews = [...]
     *   return uiConfig.update()
     * })
     * .then((uiConfig) => console.log(`UserUIConfig updated.`))
     * .catch(console.error)
     * ```
     */
    update: async function update() {
      const { raw, params } = getParams(this)

      const data = await makeRequest({
        entityType: 'UserUIConfig',
        action: 'update',
        params,
        payload: raw,
      })
      return wrapUserUIConfig(makeRequest, data)
    },
  }
}
