import { describe, expectTypeOf, it } from 'vitest'
import type {
  AiActionCondition,
  AiActionConfiguration,
  AiActionInstruction,
  AiActionInvocationProps,
  AiActionInvocationType,
  AiActionMarkdownBlock,
  AiActionOutputFormatType,
  AiActionOutputTypeValue,
  AiActionQueryOptions,
  AiActionReferenceVariableConfiguration,
  AiActionScopeType,
  AiActionSuggestionBlock,
  AiActionSuggestionContentBlock,
  AiActionTestCase,
  AiActionVariable,
  AiActionVariableConfiguration,
  AiActionVariableType,
  CreateAiActionProps,
  MRActions,
} from '../index'
// Deprecated aliases retain their original entity-module export path.
// Only their AiAction-prefixed replacements are exported from the package root.
import type {
  AiActionOutputTypeType,
  Configuration,
  Instruction,
  ReferenceVariableConfiguration,
  Variable,
  VariableConfiguration,
  VariableType,
} from './ai-action'

describe('AI Action types', () => {
  it('preserves deprecated aliases in their original entity module', () => {
    expectTypeOf<VariableType>().toEqualTypeOf<AiActionVariableType>()
    expectTypeOf<ReferenceVariableConfiguration>().toEqualTypeOf<AiActionReferenceVariableConfiguration>()
    expectTypeOf<VariableConfiguration>().toEqualTypeOf<AiActionVariableConfiguration>()
    expectTypeOf<Variable>().toEqualTypeOf<AiActionVariable>()
    expectTypeOf<Instruction>().toEqualTypeOf<AiActionInstruction>()
    expectTypeOf<Configuration>().toEqualTypeOf<AiActionConfiguration>()
    expectTypeOf<AiActionOutputTypeType>().toEqualTypeOf<AiActionOutputTypeValue>()
  })

  it('exports query and test case types used by public requests', () => {
    expectTypeOf<AiActionQueryOptions>().toEqualTypeOf<
      MRActions['AiAction']['getMany']['params']['query']
    >()
    expectTypeOf<AiActionTestCase[]>().toEqualTypeOf<
      NonNullable<CreateAiActionProps['testCases']>
    >()
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

  it('accepts the condition operators supported by AI Proxy in instruction payloads', () => {
    const conditions: AiActionCondition[] = [
      { id: 'isGerman', variable: 'locale', operator: 'eq', value: 'de-DE' },
      { id: 'hasGlossary', variable: 'glossary', operator: 'neq', value: '' },
      { id: 'isSupported', variable: 'locale', operator: 'in', value: ['de-DE', 'en-US'] },
      { id: 'isExcluded', variable: 'locale', operator: 'nin', value: ['fr-FR'] },
    ]
    const instruction: CreateAiActionProps['instruction'] = {
      template: '{{#if condition.hasGlossary}}Use {{var.glossary}}{{/if}}',
      variables: [{ id: 'glossary', type: 'Text' }],
      conditions,
    }

    expectTypeOf(instruction.conditions).toEqualTypeOf<AiActionCondition[] | undefined>()
    expectTypeOf({ template: 'Translate', variables: [] }).toExtend<AiActionInstruction>()
  })

  it('rejects condition values that do not match the operator', () => {
    const condition = { id: 'isGerman', variable: 'locale' }
    expectTypeOf({
      ...condition,
      operator: 'eq' as const,
      value: ['de-DE'],
    }).not.toExtend<AiActionCondition>()
    expectTypeOf({
      ...condition,
      operator: 'neq' as const,
      value: ['de-DE'],
    }).not.toExtend<AiActionCondition>()
    expectTypeOf({
      ...condition,
      operator: 'in' as const,
      value: 'de-DE',
    }).not.toExtend<AiActionCondition>()
    expectTypeOf({
      ...condition,
      operator: 'nin' as const,
      value: 'de-DE',
    }).not.toExtend<AiActionCondition>()
    expectTypeOf({
      ...condition,
      operator: 'contains' as const,
      value: 'de-DE',
    }).not.toExtend<AiActionCondition>()
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

    // The typecheck project verifies the same branch narrowing used by consumers.
    for (const block of blocks) {
      if (block.type === 'SuggestionBlock') {
        expectTypeOf(block.suggested).toEqualTypeOf<string>()
      } else {
        expectTypeOf(block.text).toEqualTypeOf<string>()
      }
    }
  })
})
