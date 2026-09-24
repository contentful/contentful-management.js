import { describe, expectTypeOf, it } from 'vitest'
import type {
  CreateDataAssemblyProps,
  DataAssemblyParameterConfig,
  DataAssemblyProps,
  LegacyDataAssemblyParameterConfig,
  OrderedDataAssemblyParameterConfig,
  UpdateDataAssemblyProps,
} from './data-assembly'

const legacyParameters = {
  entry: {
    type: 'ResourceLink',
    linkType: 'Contentful:Entry',
    allowedResources: [
      {
        type: 'Contentful:Entry',
        source: 'crn:contentful:::content:spaces/$self/environments/$self',
        allowedTypes: ['article'],
      },
      {
        type: 'Contentful:Asset',
        source: 'crn:contentful:::content:spaces/$self/environments/$self',
      },
    ],
  },
  title: {
    type: 'String',
    required: false,
    fallbackValue: 'Untitled',
    validation: { allowedValues: ['Untitled', 'Featured'] },
  },
  limit: {
    type: 'Number',
    required: true,
    fallbackValue: 10,
    validation: { min: 1, max: 20 },
  },
  collection: {
    type: 'Record',
    fields: [
      { id: 'query', type: 'String', required: false },
      { id: 'pageSize', type: 'Number', fallbackValue: 10 },
      {
        id: 'order',
        type: 'OrderExpression',
        target: { resourceLink: 'entry' },
        fallbackValue: [{ path: 'sys.createdAt', direction: 'desc' }],
      },
    ],
  },
  sort: {
    type: 'OrderExpression',
    target: { resourceLink: 'entry' },
  },
} satisfies LegacyDataAssemblyParameterConfig

const orderedParameters = [
  {
    id: 'title',
    type: 'String',
    required: false,
    fallbackValue: 'Untitled',
  },
  {
    id: 'entry',
    type: 'ResourceLink',
    required: true,
    allowedResources: [
      {
        type: 'Contentful:Asset',
        source: 'crn:contentful:::content:spaces/$self/environments/$self',
      },
    ],
  },
  {
    id: 'collection',
    type: 'Record',
    required: true,
    fields: [{ id: 'limit', type: 'Number', validation: { min: 1 } }],
  },
  {
    id: 'sort',
    type: 'OrderExpression',
    required: false,
    target: { resourceLink: 'entry' },
  },
] satisfies OrderedDataAssemblyParameterConfig

const missingOrderedRequiredness: OrderedDataAssemblyParameterConfig = [
  // @ts-expect-error Ordered parameter definitions require top-level requiredness.
  { id: 'missing-required', type: 'String' },
]
void missingOrderedRequiredness

describe('Data Assembly parameter contracts', () => {
  it('accepts every definition variant in legacy records and ordered arrays', () => {
    expectTypeOf(legacyParameters).toMatchTypeOf<DataAssemblyParameterConfig>()
    expectTypeOf(orderedParameters).toMatchTypeOf<DataAssemblyParameterConfig>()
  })

  it('uses the shared collection contract for public read and write types', () => {
    expectTypeOf<DataAssemblyProps['parameters']>().toEqualTypeOf<DataAssemblyParameterConfig>()
    expectTypeOf<
      CreateDataAssemblyProps['parameters']
    >().toEqualTypeOf<DataAssemblyParameterConfig>()
    expectTypeOf<
      UpdateDataAssemblyProps['parameters']
    >().toEqualTypeOf<DataAssemblyParameterConfig>()
  })
})
