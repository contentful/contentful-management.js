import { MakeRequest } from './common-types'
import entities from './entities'
import { UIConfig } from './entities/ui-config'

/**
 * @private
 */
export type ContentfulUIConfigApi = ReturnType<typeof createUIConfigApi>

/**
 * @private
 */
export default function createUIConfigApi(makeRequest: MakeRequest) {
  const { wrapUIConfig } = entities.uiConfig

  const getParams = (self: UIConfig) => {
    const uiConfig = self.toPlainObject()

    return {
      params: {
        spaceId: uiConfig.sys.space.sys.id,
        environmentId: uiConfig.sys.environment.sys.id,
      },
      raw: uiConfig,
    }
  }

  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getUIConfig())
     * .then((uiConfig) => {
     *   uiConfig.entryListViews = [...]
     *   return uiConfig.update()
     * })
     * .then((uiConfig) => console.log(`UIConfig updated.`))
     * .catch(console.error)
     * ```
     */
    update: async function update() {
      const { raw, params } = getParams(this)

      const data = await makeRequest({
        entityType: 'UIConfig',
        action: 'update',
        params,
        payload: raw,
      })
      return wrapUIConfig(makeRequest, data)
    },
  }
}
