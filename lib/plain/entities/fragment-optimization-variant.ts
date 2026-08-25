import type {
  GetFragmentOptimizationVariantParams,
  GetManyFragmentOptimizationVariantParams,
} from '../../common-types'
import type {
  CreateFragmentOptimizationVariantProps,
  FragmentOptimizationVariantCollection,
  FragmentOptimizationVariantProps,
  FragmentOptimizationVariantQueryOptions,
  UpsertFragmentOptimizationVariantProps,
} from '../../entities/fragment-optimization-variant'
import type { OptionalDefaults } from '../wrappers/wrap'

export type FragmentOptimizationVariantPlainClientAPI = {
  /**
   * Fetches all optimization variants for a Fragment.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  getMany(
    params: OptionalDefaults<
      GetManyFragmentOptimizationVariantParams & {
        query: FragmentOptimizationVariantQueryOptions
      }
    >,
  ): Promise<FragmentOptimizationVariantCollection>

  /**
   * Fetches a single optimization variant by ID.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  get(
    params: OptionalDefaults<GetFragmentOptimizationVariantParams>,
  ): Promise<FragmentOptimizationVariantProps>

  /**
   * Creates an optimization variant for a Fragment.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  create(
    params: OptionalDefaults<GetManyFragmentOptimizationVariantParams>,
    rawData: CreateFragmentOptimizationVariantProps,
  ): Promise<FragmentOptimizationVariantProps>

  /**
   * Upserts an optimization variant (creates or updates via PUT).
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  upsert(
    params: OptionalDefaults<GetFragmentOptimizationVariantParams>,
    rawData: UpsertFragmentOptimizationVariantProps,
  ): Promise<FragmentOptimizationVariantProps>

  /**
   * Deletes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  delete(params: OptionalDefaults<GetFragmentOptimizationVariantParams>): Promise<void>

  /**
   * Publishes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  publish(
    params: OptionalDefaults<GetFragmentOptimizationVariantParams & { version: number }>,
  ): Promise<FragmentOptimizationVariantProps>

  /**
   * Unpublishes an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  unpublish(
    params: OptionalDefaults<GetFragmentOptimizationVariantParams & { version: number }>,
  ): Promise<FragmentOptimizationVariantProps>

  /**
   * Archives an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  archive(
    params: OptionalDefaults<GetFragmentOptimizationVariantParams & { version: number }>,
  ): Promise<FragmentOptimizationVariantProps>

  /**
   * Unarchives an optimization variant.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  unarchive(
    params: OptionalDefaults<GetFragmentOptimizationVariantParams & { version: number }>,
  ): Promise<FragmentOptimizationVariantProps>
}
