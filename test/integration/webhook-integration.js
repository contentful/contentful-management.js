/* global expect, test */
import generateRandomId from './generate-random-id'

export default function webhookTests (space) {
  test('Gets webhooks', () => {
    return space.getWebhooks()
    .then((webhooks) => {
      expect(webhooks.sys).toBeTruthy()
      expect(webhooks.items).toBeTruthy()
    })
  })

  test('Create webhook with id', () => {
    const id = generateRandomId('webhook')
    return space.createWebhookWithId(id, {
      name: 'testwebhook',
      url: 'http://localhost:8080',
      topics: ['Entry.publish']
    })
    .then((webhook) => {
      expect(webhook.sys.id).toBe(id)
      return webhook.getCalls()
      .then((calls) => {
        expect(calls.items).toBeTruthy()
        return webhook.getHealth()
        .then((health) => {
          expect(health.calls).toBeTruthy()
          return webhook.delete()
        })
      })
    })
  })

  test('Create webhook', () => {
    return space.createWebhook({
      name: 'testname',
      url: 'http://localhost:8080',
      topics: ['Entry.publish']
    })
    .then((webhook) => {
      expect(webhook.name).toBe('testname')
      expect(webhook.url).toBeTruthy()
      webhook.name = 'updatedname'
      webhook.update()
      .then((updatedWebhook) => {
        expect(updatedWebhook.name).toBe('updatedname')
        return updatedWebhook.delete()
      })
    })
  })
}
