import { describe, expectTypeOf, it } from 'vitest'
import type { CollectionProp, CursorPaginatedCollectionProp } from '../../common-types'
import type { SpaceIncludes, SpaceProps } from '../../entities/space'
import type { SpacePlainClientAPI } from './space'

type GetMany = SpacePlainClientAPI['getMany']
type OffsetReturn = CollectionProp<SpaceProps> & { includes?: SpaceIncludes }
type CursorReturn = CursorPaginatedCollectionProp<SpaceProps> & {
  includes?: SpaceIncludes
}

describe('SpacePlainClientAPI.getMany overloads', () => {
  it('resolves to the offset overload when called with no arguments', () => {
    void ((getMany: GetMany) => {
      expectTypeOf(getMany()).resolves.toEqualTypeOf<OffsetReturn>()
    })
  })

  it('resolves to the offset overload for an empty params object', () => {
    void ((getMany: GetMany) => {
      expectTypeOf(getMany({})).resolves.toEqualTypeOf<OffsetReturn>()
    })
  })

  it('resolves to the offset overload for { query: { limit } }', () => {
    void ((getMany: GetMany) => {
      expectTypeOf(getMany({ query: { limit: 10 } })).resolves.toEqualTypeOf<OffsetReturn>()
    })
  })

  it('resolves to the offset overload when organizationId and include are passed', () => {
    void ((getMany: GetMany) => {
      expectTypeOf(
        getMany({ organizationId: 'org-id', include: 'sys.license' }),
      ).resolves.toEqualTypeOf<OffsetReturn>()
    })
  })

  it('resolves to the cursor overload when query has pageNext', () => {
    void ((getMany: GetMany) => {
      expectTypeOf(getMany({ query: { pageNext: 'tok' } })).resolves.toEqualTypeOf<CursorReturn>()
    })
  })

  it('resolves to the cursor overload when query has pagePrev', () => {
    void ((getMany: GetMany) => {
      expectTypeOf(getMany({ query: { pagePrev: 'tok' } })).resolves.toEqualTypeOf<CursorReturn>()
    })
  })

  it('resolves to the cursor overload when pageNext is string | undefined', () => {
    void ((getMany: GetMany, token: string | undefined) => {
      expectTypeOf(getMany({ query: { pageNext: token } })).resolves.toEqualTypeOf<CursorReturn>()
    })
  })

  it('resolves to the cursor overload when query has pageNext + limit', () => {
    void ((getMany: GetMany) => {
      expectTypeOf(
        getMany({ query: { pageNext: 'tok', limit: 10 } }),
      ).resolves.toEqualTypeOf<CursorReturn>()
    })
  })

  it('Parameters<>[0] is optional (undefined is assignable)', () => {
    void ((getMany: GetMany) => {
      const param: Parameters<GetMany>[0] = undefined
      expectTypeOf(getMany(param)).resolves.toEqualTypeOf<OffsetReturn>()
    })
  })

  it('rejects passing both pageNext and pagePrev in the same query', () => {
    void ((getMany: GetMany) => {
      // @ts-expect-error — cursor overload is XOR: pageNext and pagePrev are mutually exclusive
      getMany({ query: { pageNext: 'a', pagePrev: 'b' } })
    })
  })
})
