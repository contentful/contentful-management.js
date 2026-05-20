import { describe, test, expectTypeOf } from 'vitest'
import type {
  DataAssemblyLinkParameter,
  DataAssemblyResourceLinkParameter,
  DataAssemblyParameterConfig,
} from '../../../lib/entities/data-assembly'

describe('DataAssembly ParameterConfig types', () => {
  test('DataAssemblyLinkParameter has type Link', () => {
    expectTypeOf<DataAssemblyLinkParameter['type']>().toEqualTypeOf<'Link'>()
  })

  test('DataAssemblyResourceLinkParameter has type ResourceLink', () => {
    expectTypeOf<DataAssemblyResourceLinkParameter['type']>().toEqualTypeOf<'ResourceLink'>()
  })

  test('DataAssemblyResourceLinkParameter has allowedResources array', () => {
    expectTypeOf<DataAssemblyResourceLinkParameter['allowedResources']>().toEqualTypeOf<
      Array<{ type: string; source: string; allowedTypes: string[] }>
    >()
  })

  test('ParameterConfig accepts both Link and ResourceLink variants', () => {
    const config: DataAssemblyParameterConfig = {
      param1: {
        type: 'Link',
        linkType: 'Entry',
        allowedContentTypes: ['blogPost'],
      },
      param2: {
        type: 'ResourceLink',
        linkType: 'Entry',
        allowedResources: [
          { type: 'Contentful:Entry', source: 'crn:space:abc', allowedTypes: ['page'] },
        ],
      },
    }
    expectTypeOf(config).toMatchTypeOf<DataAssemblyParameterConfig>()
  })
})
