import type { ExoCursorPaginatedCollectionProp } from '../common-types'
import type {
  CreateFragmentProps,
  FragmentProps,
  FragmentQueryOptions,
  UpsertFragmentProps,
} from './fragment'

/**
 * An optimization variant of a Fragment.
 *
 * Optimization variants share the Fragment response and request shapes. The
 * variant identity is represented by the `variant`, `variantType`, and
 * `variantDimension` fields on `sys`.
 */
export type FragmentOptimizationVariantProps = FragmentProps

export type CreateFragmentOptimizationVariantProps = CreateFragmentProps

export type UpsertFragmentOptimizationVariantProps = UpsertFragmentProps

/** Query options for listing optimization variants. */
export type FragmentOptimizationVariantQueryOptions = Pick<
  FragmentQueryOptions,
  'sys.archivedAt[exists]'
>

export type FragmentOptimizationVariantCollection =
  ExoCursorPaginatedCollectionProp<FragmentOptimizationVariantProps>
