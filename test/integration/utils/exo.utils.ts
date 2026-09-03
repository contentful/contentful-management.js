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

  // Sweep dependents first, then parents
  const sweepExperienceVariants = async () => {
    try {
      const { items: experiences } = await client.experience.getMany({ query: { limit: 100 } })
      for (const experience of experiences) {
        if (!experience.name.startsWith(TEST_PREFIX)) continue

        try {
          const { items: variants } = await client.experienceVariant.getMany({
            experienceId: experience.sys.id,
            query: {},
          })
          for (const variant of variants) {
            if (
              !variant.sys.variant ||
              !variant.name.startsWith(TEST_PREFIX) ||
              new Date(variant.sys.createdAt) >= cutoff
            ) {
              continue
            }

            try {
              let latest = await client.experienceVariant.get({
                experienceId: experience.sys.id,
                variantId: variant.sys.variant,
              })
              if (latest.sys.archivedVersion) {
                latest = await client.experienceVariant.unarchive({
                  experienceId: experience.sys.id,
                  variantId: variant.sys.variant,
                  version: latest.sys.version,
                })
              }
              if (latest.sys.publishedVersion) {
                latest = await client.experienceVariant.unpublish({
                  experienceId: experience.sys.id,
                  variantId: variant.sys.variant,
                  version: latest.sys.version,
                })
              }
              await client.experienceVariant.delete({
                experienceId: experience.sys.id,
                variantId: variant.sys.variant,
              })
            } catch {
              // best-effort cleanup
            }
          }
        } catch {
          // ignore if listing experience variants fails
        }
      }
    } catch {
      // ignore if listing experiences fails
    }
  }

  const sweepFragmentOptimizationVariants = async () => {
    try {
      const { items: fragments } = await client.fragment.getMany({ query: { limit: 100 } })
      for (const fragment of fragments) {
        if (!fragment.name.startsWith(TEST_PREFIX)) continue

        try {
          const { items: variants } = await client.fragmentOptimizationVariant.getMany({
            fragmentId: fragment.sys.id,
            query: {},
          })
          for (const variant of variants) {
            if (
              !variant.sys.variant ||
              !variant.name.startsWith(TEST_PREFIX) ||
              new Date(variant.sys.createdAt) >= cutoff
            ) {
              continue
            }

            try {
              let latest = await client.fragmentOptimizationVariant.get({
                fragmentId: fragment.sys.id,
                variantId: variant.sys.variant,
              })
              if (latest.sys.archivedVersion) {
                latest = await client.fragmentOptimizationVariant.unarchive({
                  fragmentId: fragment.sys.id,
                  variantId: variant.sys.variant,
                  version: latest.sys.version,
                })
              }
              if (latest.sys.publishedVersion) {
                latest = await client.fragmentOptimizationVariant.unpublish({
                  fragmentId: fragment.sys.id,
                  variantId: variant.sys.variant,
                  version: latest.sys.version,
                })
              }
              await client.fragmentOptimizationVariant.delete({
                fragmentId: fragment.sys.id,
                variantId: variant.sys.variant,
              })
            } catch {
              // best-effort cleanup
            }
          }
        } catch {
          // ignore if listing fragment variants fails
        }
      }
    } catch {
      // ignore if listing fragments fails
    }
  }

  // Sweep dependents first, then parents
  await sweepExperienceVariants()
  await sweepFragmentOptimizationVariants()
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
