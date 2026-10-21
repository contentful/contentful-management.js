import { describe, expectTypeOf, it } from 'vitest'
import type {
  ComponentProps,
  CreateComponentProps,
  TreeNode,
  UpsertComponentProps,
} from './component'
import type { EntityDesignProperties } from './exo-common'
import type { ExperienceProps, InlineExperienceFragmentNode } from './experience'
import type { ExperienceFragmentProps } from './experience-fragment'
import type {
  CreateExperienceTemplateProps,
  ExperienceTemplateProps,
  UpsertExperienceTemplateProps,
} from './experience-template'

describe('ExO entity props', () => {
  it('accepts flattened design property values', () => {
    expectTypeOf<ExperienceProps['designProperties']>().toEqualTypeOf<EntityDesignProperties>()
    expectTypeOf<
      ExperienceFragmentProps['designProperties']
    >().toEqualTypeOf<EntityDesignProperties>()
    expectTypeOf<
      InlineExperienceFragmentNode['designProperties']
    >().toEqualTypeOf<EntityDesignProperties>()
  })

  it('requires componentTree on Component and ExperienceTemplate', () => {
    expectTypeOf<ComponentProps['componentTree']>().toEqualTypeOf<TreeNode[] | null>()
    expectTypeOf<ExperienceTemplateProps['componentTree']>().toEqualTypeOf<TreeNode[] | null>()

    expectTypeOf<CreateComponentProps>().toHaveProperty('componentTree')
    expectTypeOf<UpsertComponentProps>().toHaveProperty('componentTree')
    expectTypeOf<CreateExperienceTemplateProps>().toHaveProperty('componentTree')
    expectTypeOf<UpsertExperienceTemplateProps>().toHaveProperty('componentTree')

    // Omitting componentTree is a type error; the field is required, not optional.
    expectTypeOf<Omit<CreateComponentProps, 'componentTree'>>().not.toExtend<CreateComponentProps>()
    expectTypeOf<
      Omit<CreateExperienceTemplateProps, 'componentTree'>
    >().not.toExtend<CreateExperienceTemplateProps>()
  })
})
