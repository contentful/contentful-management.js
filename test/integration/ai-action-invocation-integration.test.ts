import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import {
  defaultClient,
  createTestSpace,
  generateRandomId,
  timeoutToCalmRateLimiting,
} from '../helpers'

export async function pollForCompletedAiActionInvocationResult(
  environment,
  aiActionId: string,
  invocationId: string,
  pollingTimeoutSeconds = 15,
) {
  const pollIntervalMs = 1000 // 1 second between polls
  const pollingTimeoutMs = pollingTimeoutSeconds * 1000
  const maxAttempts = Math.floor(pollingTimeoutMs / pollIntervalMs)

  for (let i = 0; i < maxAttempts; i++) {
    const invocation = await environment.getAiActionInvocation({
      aiActionId,
      invocationId,
    })

    if (invocation.sys.status === 'COMPLETED' || invocation.sys.status === 'FAILED') {
      return invocation
    }

    if (i < maxAttempts - 1) {
      // Don't wait after the last attempt
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs))
    }
  }

  const totalTimeoutSeconds = pollingTimeoutMs / 1000
  throw new Error(`Invocation did not complete within ${totalTimeoutSeconds} seconds`)
}

describe('AiActionInvocation api', { sequential: true }, () => {
  let space
  let environment
  let aiAction
  let invocation

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'AiActionInvocation')
    environment = await space.getEnvironment('master')

    aiAction = await space.createAiAction({
      name: generateRandomId('name'),
      description: 'Test AI Action for invocation tests',
      configuration: {
        modelTemperature: 0.1,
        modelType: 'anthropic.claude-3-5-sonnet',
      },
      instruction: {
        template: 'Translate to German: {{var.stdInput}}',
        variables: [
          {
            id: 'stdInput',
            name: 'Standard Input',
            type: 'StandardInput',
          },
        ],
        conditions: [],
      },
      testCases: [],
    })

    await space.publishAiAction(aiAction.sys.id, { version: aiAction.sys.version })

    // First invoke the action
    invocation = await environment.invokeAiAction(aiAction.sys.id, {
      outputFormat: 'PlainText',
      variables: [
        {
          id: 'stdInput',
          value: 'Hello world',
        },
      ],
    })

    // Wait for 10 seconds to allow AI action to complete
    await new Promise((resolve) => setTimeout(resolve, 10000))
  })

  afterAll(async () => {
    if (aiAction) {
      await aiAction.delete()
    }
    if (space) {
      await space.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  test('Gets ai action invocation by ID', async () => {
    const fetchedInvocation = await pollForCompletedAiActionInvocationResult(
      environment,
      aiAction.sys.id,
      invocation.sys.id,
      15,
    )

    expect(fetchedInvocation.sys.type).equals('AiActionInvocation')
    expect(fetchedInvocation.sys.id).equals(invocation.sys.id)
    expect(fetchedInvocation.sys.aiAction.sys.id).equals(aiAction.sys.id)
    // Check status and result
    expect(fetchedInvocation.sys.status).equals('COMPLETED')
    expect(fetchedInvocation.result.type).equals('text')
    expect(fetchedInvocation.result.content).to.include('Hallo')
  })

  test('Returns validation error for non-existent invocation ID', async () => {
    try {
      await environment.getAiActionInvocation({
        aiActionId: aiAction.sys.id,
        invocationId: 'nonexistent',
      })
      throw new Error('Expected validation to fail for non-existent invocation ID')
    } catch (error) {
      expect(error.name).equals(
        'ValidationFailed',
        'API should return validation error for invalid invocation ID',
      )
    }
  })

  test('Returns error when accessing invocation with wrong AI action ID', async () => {
    // Create and publish another AI action
    const otherAiAction = await space.createAiAction({
      name: generateRandomId('other'),
      description: 'Another AI Action for testing wrong ID',
      configuration: {
        modelTemperature: 0.1,
        modelType: 'anthropic.claude-3-5-sonnet',
      },
      instruction: {
        template: 'Translate to Spanish: {{var.stdInput}}',
        variables: [{ id: 'stdInput', name: 'Input', type: 'StandardInput' }],
        conditions: [],
      },
      testCases: [],
    })

    await space.publishAiAction(otherAiAction.sys.id, { version: otherAiAction.sys.version })

    try {
      await environment.getAiActionInvocation({
        aiActionId: otherAiAction.sys.id, // Using different AI action ID
        invocationId: invocation.sys.id, // But same invocation ID
      })
      throw new Error('Expected error when using wrong AI Action ID')
    } catch (error) {
      expect(error.name).equals(
        'Error',
        'API should return error when accessing invocation with wrong AI Action ID',
      )
    } finally {
      await otherAiAction.delete()
    }
  })
})
