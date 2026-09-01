import type {
  ExoCursorPaginatedCollectionProp,
  GetManyReleaseFragmentParams,
  GetReleaseFragmentParams,
} from '../../common-types'
import type {
  CreateReleaseFragmentProps,
  ReleaseFragment,
  ReleaseFragmentQueryOptions,
  UpsertReleaseFragmentProps,
} from '../../entities/fragment'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ReleaseFragmentPlainClientAPI = {
  /**
   * Fetches all Fragments belonging to a Release.
   */
  getMany(
    params: OptionalDefaults<GetManyReleaseFragmentParams & { query: ReleaseFragmentQueryOptions }>,
  ): Promise<ExoCursorPaginatedCollectionProp<ReleaseFragment>>

  /**
   * Fetches a single Fragment belonging to a Release.
   */
  get(params: OptionalDefaults<GetReleaseFragmentParams>): Promise<ReleaseFragment>

  /**
   * Creates a Fragment in a Release.
   */
  create(
    params: OptionalDefaults<GetManyReleaseFragmentParams>,
    rawData: CreateReleaseFragmentProps,
  ): Promise<ReleaseFragment>

  /**
   * Upserts a Fragment in a Release.
   */
  upsert(
    params: OptionalDefaults<GetReleaseFragmentParams>,
    rawData: UpsertReleaseFragmentProps,
  ): Promise<ReleaseFragment>

  /**
   * Deletes a Fragment from a Release.
   */
  delete(params: OptionalDefaults<GetReleaseFragmentParams>): Promise<void>
}
