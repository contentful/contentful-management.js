import type {
  GetManyReleaseExperienceParams,
  GetReleaseExperienceParams,
  ExoCursorPaginatedCollectionProp,
} from '../../common-types'
import type {
  CreateReleaseExperienceProps,
  ReleaseExperience,
  ReleaseExperienceQueryOptions,
  UpsertReleaseExperienceProps,
} from '../../entities/experience'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ReleaseExperiencePlainClientAPI = {
  /**
   * Fetches all Experiences belonging to a Release.
   */
  getMany(
    params: OptionalDefaults<
      GetManyReleaseExperienceParams & { query: ReleaseExperienceQueryOptions }
    >,
  ): Promise<ExoCursorPaginatedCollectionProp<ReleaseExperience>>

  /**
   * Fetches a single Experience belonging to a Release.
   */
  get(params: OptionalDefaults<GetReleaseExperienceParams>): Promise<ReleaseExperience>

  /**
   * Creates an Experience in a Release.
   */
  create(
    params: OptionalDefaults<GetManyReleaseExperienceParams>,
    rawData: CreateReleaseExperienceProps,
  ): Promise<ReleaseExperience>

  /**
   * Upserts an Experience in a Release.
   */
  upsert(
    params: OptionalDefaults<GetReleaseExperienceParams>,
    rawData: UpsertReleaseExperienceProps,
  ): Promise<ReleaseExperience>

  /**
   * Deletes an Experience from a Release.
   */
  delete(params: OptionalDefaults<GetReleaseExperienceParams>): Promise<void>
}
