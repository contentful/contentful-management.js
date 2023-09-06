import { RawAxiosRequestHeaders } from 'axios'
import {
  CollectionProp,
  GetEditorInterfaceParams,
  GetSpaceEnvironmentParams,
  QueryParams,
} from '../../common-types'
import { EditorInterfaceProps } from '../../entities/editor-interface'
import { OptionalDefaults } from '../wrappers/wrap'

export type EditorInterfacePlainClientAPI = {
  /**
   * Fetch an Editor Interface
   * @param params entity IDs to identify the Editor Interface
   * @returns the Editor Interface config
   * @throws if the request fails, or the Editor Interface is not found
   * @example
   * ```javascript
   * const editorInterface = await contentfulClient.editorInterface.get({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   *   contentTypeId: "<content_type_id>",
   * });
   * ```
   */
  get(params: OptionalDefaults<GetEditorInterfaceParams>): Promise<EditorInterfaceProps>
  /**
   * Fetch all Editor Interfaces for the given Space and Environment
   * @param params entity IDs to identify the Environment from which to fetch Editor Interfaces
   * @returns an object containing an array of Editor Interfaces
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const results = await contentfulClient.editorInterface.getMany({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>"
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>
  ): Promise<CollectionProp<EditorInterfaceProps>>
  /**
   * Update an Editor Interface
   * @param params entity IDs to identify the Editor Interface
   * @param rawData the updated Editor Iterface config
   * @returns the updated Editor Interface config
   * @throws if the request fails, the Editor Interface is not found, or the update payload is malformed
   * @example
   * ```javascript
   * const updatedEditorInterface =
   *   await contentfulClient.editorInterface.update(
   *     {
   *       spaceId: "<space_id>",
   *       environmentId: "<environment_id>",
   *       contentTypeId: "<content_type_id>",
   *     },
   *     {
   *       ...existingEditorInterface,
   *       sidebar: [
   *         ...(existingEditorInterface.sidebar ?? []),
   *         {
   *           widgetId: "translation-widget",
   *           widgetNamespace: "sidebar-builtin",
   *           settings: {
   *             defaultLocale: "en-US",
   *           },
   *         },
   *       ],
   *     }
   *   );
   * ```
   */
  update(
    params: OptionalDefaults<GetEditorInterfaceParams>,
    rawData: EditorInterfaceProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<EditorInterfaceProps>
}
