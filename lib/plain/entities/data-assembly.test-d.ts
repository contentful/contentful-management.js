import { describe, expectTypeOf, it } from 'vitest'
import type {
  CreateDataAssemblyProps,
  DataAssemblyCollection,
  DataAssemblyParameterConfig,
  DataAssemblyParameterDefinitionWithId,
  DataAssemblyProps,
  UpdateDataAssemblyProps,
  PlainClientAPI,
} from '../../index'

const parameters: DataAssemblyParameterConfig = [
  {
    id: 'primary',
    type: 'ResourceLink',
    required: true,
    name: 'Primary',
    description: 'Entry or Asset',
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
  {
    id: 'title',
    type: 'String',
    required: false,
    fallbackValue: 'Title',
    locked: false,
    validation: { allowedValues: ['Title'] },
  },
  {
    id: 'limit',
    type: 'Number',
    required: false,
    fallbackValue: 0,
    locked: true,
    validation: { min: 0, max: 10 },
  },
  {
    id: 'query',
    type: 'Record',
    required: true,
    fields: [
      { id: 'term', type: 'String', required: false, fallbackValue: '' },
      { id: 'limit', type: 'Number', fallbackValue: 0 },
      {
        id: 'order',
        type: 'OrderExpression',
        target: { resourceLink: 'primary' },
        fallbackValue: [{ path: 'sys.createdAt', direction: 'desc' }],
      },
    ],
  },
  {
    id: 'order',
    type: 'OrderExpression',
    required: false,
    locked: false,
    target: { resourceLink: 'primary' },
    fallbackValue: [],
  },
]

const createPayload: CreateDataAssemblyProps = {
  sys: { type: 'DataAssembly', dataType: [] },
  metadata: { tags: [] },
  name: 'Canonical assembly',
  description: '',
  parameters,
  resolvers: {},
  return: {},
}

const updatePayload: UpdateDataAssemblyProps = {
  ...createPayload,
  sys: { id: 'assembly', type: 'DataAssembly', version: 1, dataType: [] },
}

describe('DataAssembly public array contract', () => {
  it('supports all configuration kinds using the public exports', () => {
    expectTypeOf(parameters).toEqualTypeOf<DataAssemblyParameterDefinitionWithId[]>()
    expectTypeOf<DataAssemblyProps['parameters']>().toEqualTypeOf<DataAssemblyParameterConfig>()
    expectTypeOf<
      CreateDataAssemblyProps['parameters']
    >().toEqualTypeOf<DataAssemblyParameterConfig>()
    expectTypeOf<
      UpdateDataAssemblyProps['parameters']
    >().toEqualTypeOf<DataAssemblyParameterConfig>()
  })

  it('requires a top-level identifier and explicit boolean requiredness', () => {
    // @ts-expect-error — records are no longer a supported declaration collection
    const record: DataAssemblyParameterConfig = { title: { type: 'String', required: true } }
    // @ts-expect-error — the identifier belongs on every array item
    const missingId: DataAssemblyParameterConfig = [{ type: 'String', required: true }]
    // @ts-expect-error — omitted requiredness cannot enter the canonical contract
    const missingRequired: DataAssemblyParameterConfig = [{ id: 'title', type: 'String' }]
    void [record, missingId, missingRequired]
  })

  it('uses array declarations at client read, create and update boundaries', () => {
    void ((client: PlainClientAPI) => {
      const params = { spaceId: 'space', environmentId: 'master', dataAssemblyId: 'assembly' }
      expectTypeOf(client.dataAssembly.get(params)).resolves.toEqualTypeOf<DataAssemblyProps>()
      expectTypeOf(
        client.dataAssembly.getPublished(params),
      ).resolves.toEqualTypeOf<DataAssemblyProps>()
      expectTypeOf(
        client.dataAssembly.getMany({ ...params, query: {} }),
      ).resolves.toEqualTypeOf<DataAssemblyCollection>()
      expectTypeOf(
        client.dataAssembly.getManyPublished({ ...params, query: {} }),
      ).resolves.toEqualTypeOf<DataAssemblyCollection>()
      expectTypeOf(
        client.dataAssembly.create(params, createPayload),
      ).resolves.toEqualTypeOf<DataAssemblyProps>()
      expectTypeOf(
        client.dataAssembly.update(params, updatePayload),
      ).resolves.toEqualTypeOf<DataAssemblyProps>()
      client.dataAssembly.create(params, {
        ...createPayload,
        // @ts-expect-error — client writes reject the old record shape
        parameters: { title: { type: 'String' } },
      })
      client.dataAssembly.update(params, {
        ...updatePayload,
        // @ts-expect-error — client writes reject the old record shape
        parameters: { title: { type: 'String' } },
      })
    })
  })
})
