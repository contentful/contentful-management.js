import type { PlainClientAPI, ResourceLink } from '../../../lib/index'
import { generateRandomId } from '../../helpers'

export const TEST_PREFIX = '[ExO Integration Test]'

const testRunId = generateRandomId('exo')

export const testName = (entity: string) => `${TEST_PREFIX} ${entity} ${testRunId}`

export const testViewport = {
  id: 'desktop',
  query: '(min-width: 1024px)',
  displayName: 'Desktop',
  previewSize: '100%',
} as const

const EXO_CRN_PREFIX = 'crn:contentful:::experience:spaces/$self/environments/$self'

const entityPaths: Record<string, string> = {
  'Contentful:Template': 'templates',
  'Contentful:ExperienceTemplate': 'experienceTemplates',
  'Contentful:ComponentType': 'componentTypes',
  'Contentful:Component': 'components',
  'Contentful:Fragment': 'fragments',
  'Contentful:ExperienceFragment': 'experienceFragments',
  'Contentful:DataAssembly': 'dataAssemblies',
}

export function makeResourceLink<T extends string>(linkType: T, id: string): ResourceLink<T> {
  const path = entityPaths[linkType] ?? linkType.replace('Contentful:', '').toLowerCase() + 's'
  return {
    sys: {
      type: 'ResourceLink',
      linkType,
      urn: `${EXO_CRN_PREFIX}/${path}/${id}`,
    },
  }
}

const SWEEP_KEY = '__exoIntegrationSwept'

/**
 * Sweeps stale test entities from prior runs that may have been orphaned
 * (e.g., from CI timeouts, process kills, or flaky runs).
 * Deletes entities whose names start with TEST_PREFIX and were created more
 * than `maxAgeMs` milliseconds ago.
 *
 * Guarded to run only once per test process — safe across sequential file execution.
 */
export async function sweepStaleExoEntities(
  client: PlainClientAPI,
  maxAgeMs = 10 * 60 * 1000,
): Promise<void> {
  if ((globalThis as Record<string, unknown>)[SWEEP_KEY]) return
  ;(globalThis as Record<string, unknown>)[SWEEP_KEY] = true

  const cutoff = new Date(Date.now() - maxAgeMs)

  const sweepComponentTypes = async () => {
    try {
      const { items } = await client.componentType.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(item.sys.createdAt) < cutoff) {
          try {
            if (item.sys.publishedVersion) {
              await client.componentType.unpublish({
                componentTypeId: item.sys.id,
                version: item.sys.version,
              })
            }
            await client.componentType.delete({ componentTypeId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepTemplates = async () => {
    try {
      const { items } = await client.template.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(item.sys.createdAt) < cutoff) {
          try {
            if (item.sys.publishedVersion) {
              await client.template.unpublish({
                templateId: item.sys.id,
                version: item.sys.version,
              })
            }
            await client.template.delete({ templateId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepDataAssemblies = async () => {
    try {
      const { items } = await client.dataAssembly.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(String(item.sys.createdAt)) < cutoff) {
          try {
            if (item.sys.publishedVersion) {
              await client.dataAssembly.unpublish({
                dataAssemblyId: item.sys.id,
                version: item.sys.version,
              })
            }
            await client.dataAssembly.delete({ dataAssemblyId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepExperiences = async () => {
    try {
      const { items } = await client.experience.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(item.sys.createdAt) < cutoff) {
          try {
            if (item.sys.publishedVersion) {
              await client.experience.unpublish({
                experienceId: item.sys.id,
                version: item.sys.version,
              })
            }
            await client.experience.delete({ experienceId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepFragments = async () => {
    try {
      const { items } = await client.fragment.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(item.sys.createdAt) < cutoff) {
          try {
            if (item.sys.publishedVersion) {
              await client.fragment.unpublish({
                fragmentId: item.sys.id,
                version: item.sys.version,
              })
            }
            await client.fragment.delete({ fragmentId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepExperienceFragments = async () => {
    try {
      const { items } = await client.experienceFragment.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(item.sys.createdAt) < cutoff) {
          try {
            if (item.sys.publishedVersion) {
              await client.experienceFragment.unpublish({
                experienceFragmentId: item.sys.id,
                version: item.sys.version,
              })
            }
            await client.experienceFragment.delete({ experienceFragmentId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepExperienceTemplates = async () => {
    try {
      const { items } = await client.experienceTemplate.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(item.sys.createdAt) < cutoff) {
          try {
            if (item.sys.publishedVersion) {
              await client.experienceTemplate.unpublish({
                experienceTemplateId: item.sys.id,
                version: item.sys.version,
              })
            }
            await client.experienceTemplate.delete({ experienceTemplateId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepComponents = async () => {
    try {
      const { items } = await client.component.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(item.sys.createdAt) < cutoff) {
          try {
            if (item.sys.publishedVersion) {
              await client.component.unpublish({
                componentId: item.sys.id,
                version: item.sys.version,
              })
            }
            await client.component.delete({ componentId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepDesignTokens = async () => {
    try {
      const { items } = await client.designToken.getMany({ query: { limit: 100 } })
      for (const item of items) {
        if (item.name.startsWith(TEST_PREFIX) && new Date(item.sys.createdAt) < cutoff) {
          try {
            await client.designToken.delete({ designTokenId: item.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing fails
    }
  }

  const sweepReleases = async () => {
    try {
      const { items } = await client.release.query({ query: { limit: 100 } })
      for (const release of items) {
        if (release.title.startsWith(TEST_PREFIX) && new Date(release.sys.createdAt) < cutoff) {
          try {
            const { items: releaseExperiences } = await client.releaseExperience.getMany({
              releaseId: release.sys.id,
              query: { limit: 100 },
            })
            for (const experience of releaseExperiences) {
              try {
                await client.releaseExperience.delete({
                  releaseId: release.sys.id,
                  experienceId: experience.sys.id,
                })
              } catch {
                // best-effort cleanup
              }
            }
          } catch {
            // ignore if listing release experiences fails
          }

          try {
            await client.release.delete({ releaseId: release.sys.id })
          } catch {
            // best-effort cleanup
          }
        }
      }
    } catch {
      // ignore if listing releases fails
    }
  }

  // Sweep dependents first, then parents
  await sweepReleases()
  await Promise.all([
    sweepExperiences(),
    sweepFragments(),
    sweepExperienceFragments(),
    sweepDataAssemblies(),
    sweepDesignTokens(),
  ])
  await sweepTemplates()
  await sweepExperienceTemplates()
  await sweepComponentTypes()
  await sweepComponents()
}
