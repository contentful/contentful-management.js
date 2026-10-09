import { describe, expectTypeOf, it } from 'vitest'
import type { EntityDesignProperties } from './component-type'
import type { ExperienceProps, InlineExperienceFragmentNode } from './experience'
import type { ExperienceFragmentProps } from './experience-fragment'
import type { FragmentProps, InlineFragmentNode } from './fragment'

describe('ExO entity props', () => {
  it('accepts flattened design property values', () => {
    expectTypeOf<ExperienceProps['designProperties']>().toEqualTypeOf<EntityDesignProperties>()
    expectTypeOf<
      ExperienceFragmentProps['designProperties']
    >().toEqualTypeOf<EntityDesignProperties>()
    expectTypeOf<FragmentProps['designProperties']>().toEqualTypeOf<EntityDesignProperties>()
    expectTypeOf<
      InlineExperienceFragmentNode['designProperties']
    >().toEqualTypeOf<EntityDesignProperties>()
    expectTypeOf<InlineFragmentNode['designProperties']>().toEqualTypeOf<EntityDesignProperties>()
  })
})
