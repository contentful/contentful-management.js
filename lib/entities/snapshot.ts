import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, DefaultElements, MakeRequestWithoutUserAgent } from '../common-types'

export type SnapshotProps<T> = {
  sys: MetaSysProps & {
    snapshotType: string
    snapshotEntityType: string
  }
  snapshot: T
}

export interface Snapshot<T> extends SnapshotProps<T>, DefaultElements<SnapshotProps<T>> {}

function createSnapshotApi() {
  return {
    /* In case the snapshot object evolve later */
  }
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw snapshot data
 * @return Wrapped snapshot data
 */
export function wrapSnapshot<T>(
  _makeRequest: MakeRequestWithoutUserAgent,
  data: SnapshotProps<T>
): Snapshot<T> {
  const snapshot = toPlainObject(copy(data))
  const snapshotWithMethods = enhanceWithMethods(snapshot, createSnapshotApi())
  return freezeSys(snapshotWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw snapshot collection data
 * @return Wrapped snapshot collection data
 */
export const wrapSnapshotCollection = wrapCollection(wrapSnapshot)
