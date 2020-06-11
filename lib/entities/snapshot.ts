import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { MetaSysProps, DefaultElements, CollectionProp } from '../common-types'

type SnapshotProps<T> = {
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
 * @param http - HTTP client instance
 * @param data - Raw snapshot data
 * @return Wrapped snapshot data
 */
export function wrapSnapshot<T>(_http: AxiosInstance, data: SnapshotProps<T>) {
  const snapshot = toPlainObject(cloneDeep(data))
  enhanceWithMethods(snapshot, createSnapshotApi())
  return freezeSys(snapshot)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw snapshot collection data
 * @return Wrapped snapshot collection data
 */
export function wrapSnapshotCollection<T>(
  http: AxiosInstance,
  data: CollectionProp<SnapshotProps<T>>
) {
  const snapshots = toPlainObject(cloneDeep(data))
  snapshots.items = snapshots.items.map((entity) => wrapSnapshot(http, entity))
  return freezeSys(snapshots)
}
