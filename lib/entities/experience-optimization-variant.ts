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
export type ExperienceOptimizationVariantProps = ExperienceProps

export type CreateExperienceOptimizationVariantProps = CreateExperienceProps

export type UpsertExperienceOptimizationVariantProps = UpsertExperienceProps

/** Query options for listing optimization variants. */
export type ExperienceOptimizationVariantQueryOptions = Pick<
  ExperienceQueryOptions,
  'sys.archivedAt[exists]'
>

export type ExperienceOptimizationVariantCollection = {
  sys: {
    type: 'Array'
  }
  items: ExperienceOptimizationVariantProps[]
}
