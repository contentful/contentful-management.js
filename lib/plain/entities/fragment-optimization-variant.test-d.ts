import { describe, expectTypeOf, it } from 'vitest'
import type {
  CreateFragmentOptimizationVariantProps,
  FragmentOptimizationVariantCollection,
  FragmentOptimizationVariantProps,
  UpsertFragmentOptimizationVariantProps,
} from '../../entities/fragment-optimization-variant'
import type { FragmentOptimizationVariantPlainClientAPI } from './fragment-optimization-variant'

describe('FragmentOptimizationVariantPlainClientAPI', () => {
  it('exposes all optimization variant methods with the expected types', () => {
    void ((client: FragmentOptimizationVariantPlainClientAPI) => {
      const fragmentParams = {
        spaceId: 'space-id',
        environmentId: 'environment-id',
        fragmentId: 'fragment-id',
      }
      const variantParams = { ...fragmentParams, variantId: 'variant-id' }
      const actionParams = { ...variantParams, version: 1 }
      const createPayload = {} as CreateFragmentOptimizationVariantProps
      const upsertPayload = {} as UpsertFragmentOptimizationVariantProps

      expectTypeOf(
        client.getMany({
          ...fragmentParams,
          query: { 'sys.archivedAt[exists]': false },
        }),
      ).resolves.toEqualTypeOf<FragmentOptimizationVariantCollection>()
      expectTypeOf(
        client.get(variantParams),
      ).resolves.toEqualTypeOf<FragmentOptimizationVariantProps>()
      expectTypeOf(
        client.create(fragmentParams, createPayload),
      ).resolves.toEqualTypeOf<FragmentOptimizationVariantProps>()
      expectTypeOf(
        client.upsert(variantParams, upsertPayload),
      ).resolves.toEqualTypeOf<FragmentOptimizationVariantProps>()
      expectTypeOf(client.delete(variantParams)).resolves.toEqualTypeOf<void>()
      expectTypeOf(
        client.publish(actionParams),
      ).resolves.toEqualTypeOf<FragmentOptimizationVariantProps>()
      expectTypeOf(
        client.unpublish(actionParams),
      ).resolves.toEqualTypeOf<FragmentOptimizationVariantProps>()
      expectTypeOf(
        client.archive(actionParams),
      ).resolves.toEqualTypeOf<FragmentOptimizationVariantProps>()
      expectTypeOf(
        client.unarchive(actionParams),
      ).resolves.toEqualTypeOf<FragmentOptimizationVariantProps>()
    })
  })
})
