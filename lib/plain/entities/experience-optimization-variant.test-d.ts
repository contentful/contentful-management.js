import { describe, expectTypeOf, it } from 'vitest'
import type {
  CreateExperienceOptimizationVariantProps,
  ExperienceOptimizationVariantCollection,
  ExperienceOptimizationVariantProps,
  UpsertExperienceOptimizationVariantProps,
} from '../../entities/experience-optimization-variant'
import type { ExperienceOptimizationVariantPlainClientAPI } from './experience-optimization-variant'

describe('ExperienceOptimizationVariantPlainClientAPI', () => {
  it('exposes all optimization variant methods with the expected types', () => {
    void ((client: ExperienceOptimizationVariantPlainClientAPI) => {
      const experienceParams = {
        spaceId: 'space-id',
        environmentId: 'environment-id',
        experienceId: 'experience-id',
      }
      const variantParams = { ...experienceParams, variantId: 'variant-id' }
      const actionParams = { ...variantParams, version: 1 }
      const createPayload = {} as CreateExperienceOptimizationVariantProps
      const upsertPayload = {} as UpsertExperienceOptimizationVariantProps

      expectTypeOf(
        client.getMany({
          ...experienceParams,
          query: { 'sys.archivedAt[exists]': false },
        }),
      ).resolves.toEqualTypeOf<ExperienceOptimizationVariantCollection>()
      expectTypeOf(
        client.get(variantParams),
      ).resolves.toEqualTypeOf<ExperienceOptimizationVariantProps>()
      expectTypeOf(
        client.create(experienceParams, createPayload),
      ).resolves.toEqualTypeOf<ExperienceOptimizationVariantProps>()
      expectTypeOf(
        client.upsert(variantParams, upsertPayload),
      ).resolves.toEqualTypeOf<ExperienceOptimizationVariantProps>()
      expectTypeOf(client.delete(variantParams)).resolves.toEqualTypeOf<void>()
      expectTypeOf(
        client.publish(actionParams),
      ).resolves.toEqualTypeOf<ExperienceOptimizationVariantProps>()
      expectTypeOf(
        client.unpublish(actionParams),
      ).resolves.toEqualTypeOf<ExperienceOptimizationVariantProps>()
      expectTypeOf(
        client.archive(actionParams),
      ).resolves.toEqualTypeOf<ExperienceOptimizationVariantProps>()
      expectTypeOf(
        client.unarchive(actionParams),
      ).resolves.toEqualTypeOf<ExperienceOptimizationVariantProps>()
    })
  })
})
