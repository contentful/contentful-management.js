import type {
  GetExperienceFragmentVariantParams,
  GetManyExperienceFragmentVariantParams,
} from '../../common-types'
import type {
  CreateExperienceFragmentVariantProps,
  ExperienceFragmentVariantCollection,
  ExperienceFragmentVariantProps,
  ExperienceFragmentVariantQueryOptions,
  UpsertExperienceFragmentVariantProps,
} from '../../entities/experience-fragment-variant'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ExperienceFragmentVariantPlainClientAPI = {
  /**
   * Fetches all optimization variants for an ExperienceFragment.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  getMany(
    params: OptionalDefaults<
      GetManyExperienceFragmentVariantParams & {
        query: ExperienceFragmentVariantQueryOptions
      }
    >,
  ): Promise<ExperienceFragmentVariantCollection>

  /**
   * Fetches a single optimization variant by ID.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  get(
    params: OptionalDefaults<GetExperienceFragmentVariantParams>,
  ): Promise<ExperienceFragmentVariantProps>

  /**
   * Creates an optimization variant for an ExperienceFragment.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  create(
    params: OptionalDefaults<GetManyExperienceFragmentVariantParams>,
    rawData: CreateExperienceFragmentVariantProps,
  ): Promise<ExperienceFragmentVariantProps>

  /**
   * Upserts an optimization variant (creates or updates via PUT).
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  upsert(
    params: OptionalDefaults<GetExperienceFragmentVariantParams>,
    rawData: UpsertExperienceFragmentVariantProps,
  ): Promise<ExperienceFragmentVariantProps>

  /**
   * Deletes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  delete(params: OptionalDefaults<GetExperienceFragmentVariantParams>): Promise<void>

  /**
   * Publishes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  publish(
    params: OptionalDefaults<GetExperienceFragmentVariantParams & { version: number }>,
  ): Promise<ExperienceFragmentVariantProps>

  /**
   * Unpublishes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  unpublish(
    params: OptionalDefaults<GetExperienceFragmentVariantParams & { version: number }>,
  ): Promise<ExperienceFragmentVariantProps>

  /**
   * Archives an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  archive(
    params: OptionalDefaults<GetExperienceFragmentVariantParams & { version: number }>,
  ): Promise<ExperienceFragmentVariantProps>

  /**
   * Unarchives an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  unarchive(
    params: OptionalDefaults<GetExperienceFragmentVariantParams & { version: number }>,
  ): Promise<ExperienceFragmentVariantProps>
}
