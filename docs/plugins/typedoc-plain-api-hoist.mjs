/**
 * TypeDoc plugin — plain API method hoist
 *
 * For every module in lib/plain/entities/, the exported *PlainClientAPI (or
 * *API) type alias is the only thing TypeDoc would otherwise render on the
 * module page, forcing an extra click to reach the actual methods.
 *
 * This plugin runs on Converter.EVENT_RESOLVE_END *before* TypeDoc's internal
 * GroupPlugin (priority -100), so it runs at priority 100.  It:
 *
 *   1. Finds the single *API type alias that is the sole export of the module.
 *   2. Moves its method children directly onto the module.
 *   3. Removes the now-empty type alias from the project.
 *
 * After this transformation GroupPlugin creates groups for the module that
 * include the hoisted methods, so they appear directly on the module page —
 * one click from the sidebar rather than two.
 *
 * No TypeScript source changes are required; this is purely a docs-layer
 * reorganisation.
 */

import { Converter, ReflectionKind } from 'typedoc'

/**
 * @param {import('typedoc').Application} app
 */
export function load(app) {
  app.converter.on(
    Converter.EVENT_RESOLVE_END,
    (context) => {
      const project = context.project

      for (const mod of project.getChildrenByKind(ReflectionKind.Module)) {
        // Only process plain entity files.
        const fileName = mod.sources?.[0]?.fileName ?? ''
        if (!fileName.includes('lib/plain/entities/')) continue

        // Find the single *API type alias.  Most files export exactly one
        // *PlainClientAPI type; a few (e.g. upload-credential.ts) also export
        // a plain data type — we only want the one ending with 'API'.
        const apiTypes = (mod.children ?? []).filter((c) => c.name.endsWith('API'))
        if (apiTypes.length !== 1) continue

        const apiType = apiTypes[0]
        const members = [...(apiType.children ?? [])]
        if (members.length === 0) continue

        // Move each method child from the API type to the module.
        // addChild/removeChild maintain both .children and
        // .childrenIncludingDocuments; parent must be updated manually.
        for (const member of members) {
          apiType.removeChild(member)
          member.parent = mod
          mod.addChild(member)
        }

        // Remove the now-empty API type alias.  project.removeReflection also
        // unlinks it from the module's children array via parent traversal.
        project.removeReflection(apiType)
      }
    },
    null,
    100, // Higher than GroupPlugin's -100 → runs first
  )
}
