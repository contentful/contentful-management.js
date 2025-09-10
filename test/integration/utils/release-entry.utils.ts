import type { PlainClientAPI, ReleaseProps, EntryProps } from '../../../lib/export-types'
import { makeLink } from '../../utils'

/**
 * Creates an empty release for testing purposes
 */
export async function createEmptyRelease(
  client: PlainClientAPI,
  defaultParams: {
    environmentId: string
    spaceId: string
    releaseSchemaVersion: 'Release.v2'
  }
): Promise<ReleaseProps> {
  return client.release.create(defaultParams, {
    title: 'Test Release',
    entities: {
      sys: { type: 'Array' },
      items: [],
    },
  })
}

/**
 * Creates a test entry for release testing
 */
export async function createTestEntry(
  client: PlainClientAPI,
  defaultParams: {
    environmentId: string
    spaceId: string
    releaseSchemaVersion: 'Release.v2'
  },
  contentTypeId: string
): Promise<EntryProps> {
  return client.entry.create(
    { ...defaultParams, contentTypeId },
    {
      fields: {
        title: {
          'en-US': 'Test Entry for Release',
        },
      },
    }
  )
}

/**
 * Updates a release with the specified entries
 */
export async function updateReleaseWithEntries(
  client: PlainClientAPI,
  release: ReleaseProps,
  entries: EntryProps[]
): Promise<ReleaseProps> {
  const { sys, ...releaseData } = release

  return client.release.update(
    {
      spaceId: sys.space.sys.id,
      environmentId: sys.environment.sys.id,
      releaseId: sys.id,
      releaseSchemaVersion: sys.schemaVersion,
      version: sys.version,
    },
    {
      ...releaseData,
      entities: {
        sys: { type: 'Array' },
        items: entries.map((entry) => ({
          entity: makeLink('Entry', entry.sys.id),
          action: 'publish' as const,
        })),
      },
    }
  )
}

/**
 * Updates a release entry with a new title
 */
export async function updateReleaseEntryTitle(
  client: PlainClientAPI,
  release: ReleaseProps,
  entry: EntryProps,
  newTitle: string = 'Updated Test Entry for Release'
): Promise<EntryProps> {
  // get the release entry
  const releaseEntryToUpdate = await client.release.entry.get({
    entryId: entry.sys.id,
    environmentId: release.sys.environment.sys.id,
    spaceId: release.sys.space.sys.id,
    releaseId: release.sys.id,
  })

  // update the release entry with new title
  return client.release.entry.update(
    {
      entryId: releaseEntryToUpdate.sys.id,
      environmentId: release.sys.environment.sys.id,
      spaceId: release.sys.space.sys.id,
      releaseId: release.sys.id,
    },
    {
      sys: releaseEntryToUpdate.sys,
      fields: {
        title: {
          'en-US': newTitle,
        },
      },
    }
  )
}
