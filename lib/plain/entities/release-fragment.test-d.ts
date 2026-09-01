import { describe, expectTypeOf, it } from 'vitest'
import type {
  CreateReleaseFragmentProps,
  ReleaseFragment,
  ReleaseFragmentCollection,
  UpsertReleaseFragmentProps,
} from '../../entities/fragment'
import type { ReleaseFragmentPlainClientAPI } from './release-fragment'

describe('ReleaseFragmentPlainClientAPI', () => {
  it('exposes all release fragment methods with the expected types', () => {
    void ((client: ReleaseFragmentPlainClientAPI) => {
      const params = {
        spaceId: 'space-id',
        environmentId: 'environment-id',
        releaseId: 'release-id',
      }
      const fragmentParams = { ...params, fragmentId: 'fragment-id' }
      const createPayload = {} as CreateReleaseFragmentProps
      const upsertPayload = {} as UpsertReleaseFragmentProps

      expectTypeOf(client.getMany({ ...params, query: {} })).toEqualTypeOf<
        Promise<ReleaseFragmentCollection>
      >()
      expectTypeOf(client.get(fragmentParams)).toEqualTypeOf<Promise<ReleaseFragment>>()
      expectTypeOf(client.create(params, createPayload)).toEqualTypeOf<Promise<ReleaseFragment>>()
      expectTypeOf(client.upsert(fragmentParams, upsertPayload)).toEqualTypeOf<
        Promise<ReleaseFragment>
      >()
      expectTypeOf(client.delete(fragmentParams)).toEqualTypeOf<Promise<void>>()
    })
  })
})
