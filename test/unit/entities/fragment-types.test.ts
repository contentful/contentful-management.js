import { describe, test, expectTypeOf } from 'vitest'
import type {
  ReleaseFragmentSys,
  ReleaseFragment,
  ReleaseFragmentCollection,
} from '../../../lib/entities/fragment'
import type { Link, ExoCursorPaginatedCollectionProp } from '../../../lib/common-types'

describe('ReleaseFragment types', () => {
  test('ReleaseFragmentSys has release link', () => {
    expectTypeOf<ReleaseFragmentSys['release']>().toEqualTypeOf<Link<'Release'>>()
  })

  test('ReleaseFragmentSys omits variant fields', () => {
    type HasVariant = 'variant' extends keyof ReleaseFragmentSys ? true : false
    expectTypeOf<HasVariant>().toEqualTypeOf<false>()

    type HasVariantType = 'variantType' extends keyof ReleaseFragmentSys ? true : false
    expectTypeOf<HasVariantType>().toEqualTypeOf<false>()

    type HasVariantDimension = 'variantDimension' extends keyof ReleaseFragmentSys ? true : false
    expectTypeOf<HasVariantDimension>().toEqualTypeOf<false>()
  })

  test('ReleaseFragmentSys retains base fields from FragmentSys', () => {
    expectTypeOf<ReleaseFragmentSys['id']>().toBeString()
    expectTypeOf<ReleaseFragmentSys['type']>().toEqualTypeOf<'Fragment'>()
  })

  test('ReleaseFragment has ReleaseFragmentSys', () => {
    expectTypeOf<ReleaseFragment['sys']>().toEqualTypeOf<ReleaseFragmentSys>()
  })

  test('ReleaseFragment has name and description from FragmentProps', () => {
    expectTypeOf<ReleaseFragment['name']>().toBeString()
    expectTypeOf<ReleaseFragment['description']>().toBeString()
  })

  test('ReleaseFragmentCollection is a paginated collection of ReleaseFragment', () => {
    expectTypeOf<ReleaseFragmentCollection>().toMatchTypeOf<
      ExoCursorPaginatedCollectionProp<ReleaseFragment>
    >()
  })
})
