import type { GetExperienceVariantParams, GetManyExperienceVariantParams } from '../../common-types'
import type {
  CreateExperienceVariantProps,
  ExperienceVariantCollection,
  ExperienceVariantProps,
  ExperienceVariantQueryOptions,
  UpsertExperienceVariantProps,
} from '../../entities/experience-variant'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ExperienceVariantPlainClientAPI = {
  /**
   * Fetches all optimization variants for an Experience.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  getMany(
    params: OptionalDefaults<
      GetManyExperienceVariantParams & {
        query: ExperienceVariantQueryOptions
      }
    >,
  ): Promise<ExperienceVariantCollection>

  /**
   * Fetches a single optimization variant by ID.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  get(params: OptionalDefaults<GetExperienceVariantParams>): Promise<ExperienceVariantProps>

  /**
   * Creates an optimization variant for an Experience.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  create(
    params: OptionalDefaults<GetManyExperienceVariantParams>,
    rawData: CreateExperienceVariantProps,
  ): Promise<ExperienceVariantProps>

  /**
   * Upserts an optimization variant (creates or updates via PUT).
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  upsert(
    params: OptionalDefaults<GetExperienceVariantParams>,
    rawData: UpsertExperienceVariantProps,
  ): Promise<ExperienceVariantProps>

  /**
   * Deletes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  delete(params: OptionalDefaults<GetExperienceVariantParams>): Promise<void>

  /**
   * Publishes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  publish(
    params: OptionalDefaults<GetExperienceVariantParams & { version: number }>,
  ): Promise<ExperienceVariantProps>

  /**
   * Unpublishes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  unpublish(
    params: OptionalDefaults<GetExperienceVariantParams & { version: number }>,
  ): Promise<ExperienceVariantProps>

  /**
   * Archives an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  archive(
    params: OptionalDefaults<GetExperienceVariantParams & { version: number }>,
  ): Promise<ExperienceVariantProps>

  /**
   * Unarchives an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  unarchive(
    params: OptionalDefaults<GetExperienceVariantParams & { version: number }>,
  ): Promise<ExperienceVariantProps>
}
