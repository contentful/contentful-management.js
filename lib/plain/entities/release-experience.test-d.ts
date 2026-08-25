import { describe, expectTypeOf, it } from 'vitest'
import type {
  CreateReleaseExperienceProps,
  ReleaseExperience,
  ReleaseExperienceCollection,
  UpsertReleaseExperienceProps,
} from '../../entities/experience'
import type { ReleaseExperiencePlainClientAPI } from './release-experience'

describe('ReleaseExperiencePlainClientAPI', () => {
  it('exposes the release-scoped Experience methods with the expected types', () => {
    void ((client: ReleaseExperiencePlainClientAPI) => {
      const releaseParams = {
        spaceId: 'space-id',
        environmentId: 'environment-id',
        releaseId: 'release-id',
      }
      const experienceParams = { ...releaseParams, experienceId: 'experience-id' }
      const createPayload = {} as CreateReleaseExperienceProps
      const upsertPayload = {} as UpsertReleaseExperienceProps

      expectTypeOf(
        client.getMany({ ...releaseParams, query: { limit: 10 } }),
      ).resolves.toEqualTypeOf<ReleaseExperienceCollection>()
      expectTypeOf(client.get(experienceParams)).resolves.toEqualTypeOf<ReleaseExperience>()
      expectTypeOf(
        client.create(releaseParams, createPayload),
      ).resolves.toEqualTypeOf<ReleaseExperience>()
      expectTypeOf(
        client.upsert(experienceParams, upsertPayload),
      ).resolves.toEqualTypeOf<ReleaseExperience>()
      expectTypeOf(client.delete(experienceParams)).resolves.toEqualTypeOf<void>()
    })
  })
})
