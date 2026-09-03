import type { ExoCursorPaginatedCollectionProp } from '../common-types'
import type {
  CreateExperienceProps,
  ExperienceProps,
  ExperienceQueryOptions,
  UpsertExperienceProps,
} from './experience'

/**
 * An optimization variant of an Experience.
 *
 * Optimization variants share the Experience response and request shapes. The
 * variant identity is represented by the `variant`, `variantType`, and
 * `variantDimension` fields on `sys`.
 */
export type ExperienceVariantProps = ExperienceProps

export type CreateExperienceVariantProps = CreateExperienceProps

export type UpsertExperienceVariantProps = UpsertExperienceProps

/** Query options for listing optimization variants. */
export type ExperienceVariantQueryOptions = Pick<ExperienceQueryOptions, 'sys.archivedAt[exists]'>

export type ExperienceVariantCollection = ExoCursorPaginatedCollectionProp<ExperienceVariantProps>
