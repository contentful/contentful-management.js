import { describe, expectTypeOf, it } from 'vitest'
import type {
  AiActionConfiguration,
  AiActionInstruction,
  AiActionInvocationProps,
  AiActionInvocationType,
  AiActionMarkdownBlock,
  AiActionOutputFormatType,
  AiActionOutputTypeValue,
  AiActionReferenceVariableConfiguration,
  AiActionScopeType,
  AiActionSuggestionBlock,
  AiActionSuggestionContentBlock,
  AiActionVariable,
  AiActionVariableConfiguration,
  AiActionVariableType,
  CreateAiActionProps,
} from '../index'
import type {
  AiActionOutputTypeType,
  Configuration,
  Instruction,
  ReferenceVariableConfiguration,
  Variable,
  VariableConfiguration,
  VariableType,
} from './ai-action'

describe('AI Action public types', () => {
  it('preserves the previous entity type names as aliases', () => {
    expectTypeOf<VariableType>().toEqualTypeOf<AiActionVariableType>()
    expectTypeOf<ReferenceVariableConfiguration>().toEqualTypeOf<AiActionReferenceVariableConfiguration>()
    expectTypeOf<VariableConfiguration>().toEqualTypeOf<AiActionVariableConfiguration>()
    expectTypeOf<Variable>().toEqualTypeOf<AiActionVariable>()
    expectTypeOf<Instruction>().toEqualTypeOf<AiActionInstruction>()
    expectTypeOf<Configuration>().toEqualTypeOf<AiActionConfiguration>()
    expectTypeOf<AiActionOutputTypeType>().toEqualTypeOf<AiActionOutputTypeValue>()
  })

  it('keeps existing configuration and invocation payloads valid', () => {
    expectTypeOf({ modelType: 'model', modelTemperature: 0.1 }).toExtend<AiActionConfiguration>()
    expectTypeOf({}).toExtend<AiActionInvocationType>()
    expectTypeOf({ localeType: 'Target' as const }).toExtend<AiActionVariableConfiguration>()
    expectTypeOf<AiActionScopeType>().toEqualTypeOf<'Entry' | 'EntryField'>()
    expectTypeOf<AiActionOutputTypeValue>().toEqualTypeOf<'Transform' | 'Suggestion'>()
    expectTypeOf<AiActionOutputFormatType>().toEqualTypeOf<
      'RichText' | 'Markdown' | 'PlainText' | 'Suggestion'
    >()
    expectTypeOf<AiActionConfiguration>().toEqualTypeOf<CreateAiActionProps['configuration']>()
    expectTypeOf<AiActionInstruction>().toEqualTypeOf<CreateAiActionProps['instruction']>()
  })

  it('allows consumers to describe and narrow suggestion content blocks', () => {
    const markdown: AiActionMarkdownBlock = { type: 'MarkdownBlock', text: 'Review these changes' }
    const suggestion: AiActionSuggestionBlock = {
      type: 'SuggestionBlock',
      format: 'Text',
      fieldId: 'title',
      original: 'Old title',
      suggested: 'New title',
      confidence: 0.9,
    }
    const blocks: AiActionSuggestionContentBlock[] = [markdown, suggestion]
    expectTypeOf(blocks).toExtend<NonNullable<AiActionInvocationProps['result']>['content']>()

    for (const block of blocks) {
      if (block.type === 'SuggestionBlock') {
        expectTypeOf(block.suggested).toEqualTypeOf<string>()
      } else {
        expectTypeOf(block.text).toEqualTypeOf<string>()
      }
    }
  })
})
