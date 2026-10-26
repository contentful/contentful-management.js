import { describe, expectTypeOf, it } from 'vitest'
import type { ComponentProps, DataAssemblyProps, DataTypeDefinition } from './index'

describe('DataType requiredness', () => {
  it('accepts explicit true and false on every supported kind and nested definition', () => {
    const definitions: DataTypeDefinition[] = [
      { type: 'String', required: true },
      { type: 'Number', required: false },
      { type: 'Integer', required: false },
      { type: 'Boolean', required: true },
      { type: 'RichText', required: false },
      {
        type: 'TypeRef',
        required: true,
        ref: {
          sys: {
            type: 'ResourceLink',
            linkType: 'Contentful:Component',
            urn: 'crn:contentful:::content:spaces/s/environments/master/components/c',
          },
        },
      },
      {
        type: 'Array',
        required: false,
        items: {
          type: 'Record',
          required: true,
          fields: {
            title: { type: 'String', required: false },
            category: {
              type: 'Literal',
              required: true,
              value: 'article',
              valueType: { type: 'String', required: true },
            },
          },
        },
      },
      {
        type: 'DiscriminatedUnion',
        required: true,
        discriminator: 'kind',
        members: [
          {
            type: 'Record',
            required: false,
            fields: {
              kind: {
                type: 'Literal',
                required: true,
                value: 'article',
                valueType: { type: 'String', required: true },
              },
            },
          },
        ],
      },
    ]

    expectTypeOf(definitions).toEqualTypeOf<DataTypeDefinition[]>()
    expectTypeOf<DataTypeDefinition['required']>().toEqualTypeOf<boolean>()
    expectTypeOf({ id: 'result', name: 'Result', ...definitions[6] }).toExtend<
      DataAssemblyProps['sys']['dataType'][number]
    >()
    expectTypeOf({ id: 'content', name: 'Content', ...definitions[7] }).toExtend<
      ComponentProps['contentProperties'][number]
    >()
  })

  it('rejects omitted requiredness on top-level and recursive definitions', () => {
    const missingRequired = { type: 'String' as const }
    const array = { type: 'Array' as const, required: true, items: missingRequired }
    const record = {
      type: 'Record' as const,
      required: false,
      fields: { title: missingRequired },
    }
    const literal = {
      type: 'Literal' as const,
      required: true,
      value: 'article',
      valueType: missingRequired,
    }
    const union = {
      type: 'DiscriminatedUnion' as const,
      required: true,
      discriminator: 'kind',
      members: [{ type: 'Record' as const, fields: {} }],
    }
    const deep = {
      type: 'Array' as const,
      required: true,
      items: { type: 'Record' as const, required: true, fields: { title: missingRequired } },
    }

    expectTypeOf(missingRequired).not.toExtend<DataTypeDefinition>()
    expectTypeOf(array).not.toExtend<DataTypeDefinition>()
    expectTypeOf(record).not.toExtend<DataTypeDefinition>()
    expectTypeOf(literal).not.toExtend<DataTypeDefinition>()
    expectTypeOf(union).not.toExtend<DataTypeDefinition>()
    expectTypeOf(deep).not.toExtend<DataTypeDefinition>()

    // Legacy leaf fields must not let recursive definitions bypass requiredness.
    expectTypeOf({ id: 'result', name: 'Result', ...missingRequired }).not.toExtend<
      DataAssemblyProps['sys']['dataType'][number]
    >()
    expectTypeOf({ id: 'result', name: 'Result', ...array }).not.toExtend<
      DataAssemblyProps['sys']['dataType'][number]
    >()
    expectTypeOf({ id: 'result', name: 'Result', ...record }).not.toExtend<
      DataAssemblyProps['sys']['dataType'][number]
    >()
    expectTypeOf({ id: 'result', name: 'Result', ...literal }).not.toExtend<
      DataAssemblyProps['sys']['dataType'][number]
    >()
    expectTypeOf({ id: 'result', name: 'Result', ...union }).not.toExtend<
      DataAssemblyProps['sys']['dataType'][number]
    >()
    expectTypeOf({ id: 'result', name: 'Result', ...deep }).not.toExtend<
      DataAssemblyProps['sys']['dataType'][number]
    >()
    expectTypeOf({ id: 'content', name: 'Content', ...deep }).not.toExtend<
      ComponentProps['contentProperties'][number]
    >()
  })
})
