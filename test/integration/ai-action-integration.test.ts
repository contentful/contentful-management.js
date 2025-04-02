import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import {
  defaultClient,
  createTestSpace,
  generateRandomId,
  timeoutToCalmRateLimiting,
} from '../helpers'

describe('AiAction api', { sequential: true }, () => {
  let space
  let environment

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'AiAction')
    environment = await space.getEnvironment('master')
  })

  afterAll(async () => {
    if (space) {
      return space.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  test('Gets ai actions', async () => {
    return space.getAiActions().then((response) => {
      expect(response.sys, 'sys').to.be.ok
      expect(response.items, 'items').to.be.ok
    })
  })

  test('Create and get ai action', async () => {
    const name = generateRandomId('name')
    return space
      .createAiAction({
        name,
        description: 'This is a test AI Action created via space client',
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
      .then((aiAction) => {
        expect(aiAction.name).equals(name, 'name')

        return space.getAiAction(aiAction.sys.id).then((fetchedAction) => {
          expect(fetchedAction.sys.id).equals(aiAction.sys.id, 'id matches')
          return aiAction.delete()
        })
      })
  })

  test('Create and update ai action', async () => {
    const name = generateRandomId('name')
    return space
      .createAiAction({
        name,
        description: 'This is a test AI Action created via space client',
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
      .then((aiAction) => {
        expect(aiAction.name).equals(name, 'name')
        const updatedName = generateRandomId('updatedname')

        return space
          .updateAiAction(aiAction.sys.id, {
            ...aiAction,
            name: updatedName,
          })
          .then((updatedAction) => {
            expect(updatedAction.name).equals(updatedName, 'updated name')
            return updatedAction.delete()
          })
      })
  })

  test('Publish and unpublish ai action', async () => {
    const name = generateRandomId('name')
    return space
      .createAiAction({
        name,
        description: 'This is a test AI Action created via space client',
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
      .then((aiAction) => {
        return space
          .publishAiAction(aiAction.sys.id, { version: aiAction.sys.version })
          .then((publishedAction) => {
            expect(publishedAction.sys.publishedVersion).to.be.ok
            return space.unpublishAiAction(publishedAction.sys.id)
          })
          .then((unpublishedAction) => {
            expect(unpublishedAction.sys.publishedVersion).to.be.undefined
            return unpublishedAction.delete()
          })
      })
  })

  test('Invoke ai action', async () => {
    const name = generateRandomId('name')
    return space
      .createAiAction({
        name,
        description: 'This is a test AI Action created via space client',
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
      .then((aiAction) => {
        return space
          .publishAiAction(aiAction.sys.id, { version: aiAction.sys.version })
          .then((publishedAction) =>
            environment.invokeAiAction(publishedAction.sys.id, {
              outputFormat: 'PlainText',
              variables: [
                {
                  id: 'stdInput',
                  value: 'Hello world',
                },
              ],
            })
          )
          .then((invocation) => {
            expect(invocation.sys.type).equals('AiActionInvocation')
            return aiAction.delete()
          })
      })
  })
})
