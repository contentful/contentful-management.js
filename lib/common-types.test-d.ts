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
          fields: [
            { id: 'title', type: 'String', required: false },
            {
              id: 'category',
              type: 'Literal',
              required: true,
              value: 'article',
              valueType: { type: 'String', required: true },
            },
          ],
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
            fields: [
              {
                id: 'kind',
                type: 'Literal',
                required: true,
                value: 'article',
                valueType: { type: 'String', required: true },
              },
            ],
          },
        ],
      },
      { type: 'JSON', required: false },
      { type: 'DateTime', required: true },
      {
        type: 'ResourceLink',
        required: true,
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
      fields: [{ id: 'title', ...missingRequired }],
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
      members: [{ type: 'Record' as const, fields: [] }],
    }
    const deep = {
      type: 'Array' as const,
      required: true,
      items: {
        type: 'Record' as const,
        required: true,
        fields: [{ id: 'title', ...missingRequired }],
      },
    }

    expectTypeOf(missingRequired).not.toExtend<DataTypeDefinition>()
    expectTypeOf(array).not.toExtend<DataTypeDefinition>()
    expectTypeOf(record).not.toExtend<DataTypeDefinition>()
    expectTypeOf(literal).not.toExtend<DataTypeDefinition>()
    expectTypeOf(union).not.toExtend<DataTypeDefinition>()
    expectTypeOf(deep).not.toExtend<DataTypeDefinition>()

    // Public entity props enforce the same recursive canonical contract.
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

  it('rejects legacy type names, invalid references and keyed Record fields', () => {
    type Field = DataAssemblyProps['sys']['dataType'][number]

    expectTypeOf({
      id: 'title',
      name: 'Title',
      type: 'Symbol' as const,
      required: false,
    }).not.toExtend<Field>()
    expectTypeOf({
      id: 'body',
      name: 'Body',
      type: 'Text' as const,
      required: false,
    }).not.toExtend<Field>()
    expectTypeOf({
      id: 'image',
      name: 'Image',
      type: 'Asset' as const,
      required: false,
    }).not.toExtend<Field>()
    expectTypeOf({
      id: 'media',
      name: 'Media',
      type: 'Media' as const,
      required: false,
    }).not.toExtend<Field>()
    expectTypeOf({
      id: 'reference',
      name: 'Reference',
      type: 'TypeRef' as const,
      required: true,
      ref: 'component',
    }).not.toExtend<Field>()
    expectTypeOf({
      type: 'Record' as const,
      required: true,
      fields: { title: { type: 'String' as const, required: false } },
    }).not.toExtend<DataTypeDefinition>()
    expectTypeOf({
      type: 'Record' as const,
      required: true,
      fields: [{ type: 'String' as const, required: false }],
    }).not.toExtend<DataTypeDefinition>()
  })
})
