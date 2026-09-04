import type { ExoCursorPaginatedCollectionProp } from '../common-types'
import type {
  CreateExperienceFragmentProps,
  ExperienceFragmentProps,
  ExperienceFragmentQueryOptions,
  UpsertExperienceFragmentProps,
} from './experience-fragment'

/**
 * An optimization variant of an ExperienceFragment.
 *
 * Optimization variants share the ExperienceFragment response and request shapes. The
 * variant identity is represented by the `variant`, `variantType`, and
 * `variantDimension` fields on `sys`.
 */
export type ExperienceFragmentVariantProps = ExperienceFragmentProps

export type CreateExperienceFragmentVariantProps = CreateExperienceFragmentProps

export type UpsertExperienceFragmentVariantProps = UpsertExperienceFragmentProps

/** Query options for listing optimization variants. */
export type ExperienceFragmentVariantQueryOptions = Pick<
  ExperienceFragmentQueryOptions,
  'sys.archivedAt[exists]'
>

export type ExperienceFragmentVariantCollection =
  ExoCursorPaginatedCollectionProp<ExperienceFragmentVariantProps>
