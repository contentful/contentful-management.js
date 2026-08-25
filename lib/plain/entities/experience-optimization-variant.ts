import type {
  GetExperienceOptimizationVariantParams,
  GetManyExperienceOptimizationVariantParams,
} from '../../common-types'
import type {
  CreateExperienceOptimizationVariantProps,
  ExperienceOptimizationVariantCollection,
  ExperienceOptimizationVariantProps,
  ExperienceOptimizationVariantQueryOptions,
  UpsertExperienceOptimizationVariantProps,
} from '../../entities/experience-optimization-variant'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ExperienceOptimizationVariantPlainClientAPI = {
  /**
   * Fetches all optimization variants for an Experience.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  getMany(
    params: OptionalDefaults<
      GetManyExperienceOptimizationVariantParams & {
        query: ExperienceOptimizationVariantQueryOptions
      }
    >,
  ): Promise<ExperienceOptimizationVariantCollection>

  /**
   * Fetches a single optimization variant by ID.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  get(
    params: OptionalDefaults<GetExperienceOptimizationVariantParams>,
  ): Promise<ExperienceOptimizationVariantProps>

  /**
   * Creates an optimization variant for an Experience.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  create(
    params: OptionalDefaults<GetManyExperienceOptimizationVariantParams>,
    rawData: CreateExperienceOptimizationVariantProps,
  ): Promise<ExperienceOptimizationVariantProps>

  /**
   * Upserts an optimization variant (creates or updates via PUT).
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  upsert(
    params: OptionalDefaults<GetExperienceOptimizationVariantParams>,
    rawData: UpsertExperienceOptimizationVariantProps,
  ): Promise<ExperienceOptimizationVariantProps>

  /**
   * Deletes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  delete(params: OptionalDefaults<GetExperienceOptimizationVariantParams>): Promise<void>

  /**
   * Publishes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  publish(
    params: OptionalDefaults<GetExperienceOptimizationVariantParams & { version: number }>,
  ): Promise<ExperienceOptimizationVariantProps>

  /**
   * Unpublishes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  unpublish(
    params: OptionalDefaults<GetExperienceOptimizationVariantParams & { version: number }>,
  ): Promise<ExperienceOptimizationVariantProps>

  /**
   * Archives an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  archive(
    params: OptionalDefaults<GetExperienceOptimizationVariantParams & { version: number }>,
  ): Promise<ExperienceOptimizationVariantProps>

  /**
   * Unarchives an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  unarchive(
    params: OptionalDefaults<GetExperienceOptimizationVariantParams & { version: number }>,
  ): Promise<ExperienceOptimizationVariantProps>
}
