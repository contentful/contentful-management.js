import { after, before, describe, test } from 'mocha'
import { client, createTestSpace } from '../helpers'
import { expect } from 'chai'

describe('Webhook Api', () => {
  let space

  before(async () => {
    space = await createTestSpace(client(), 'Webhook')
  })

  after(async () => {
    return space.delete()
  })

  test('Gets webhooks', async () => {
    return space.getWebhooks().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })

  // does not work in our API ¯\_(ツ)_/¯
  /*
  t.test('Create webhook with id', async () => {
    const id = generateRandomId('webhook')
    return space.createWebhookWithId(id, {
      name: 'testwebhook',
      url: 'http://localhost:8080',
      topics: ['Entry.publish']
    })
      .then((webhook) => {
        t.equals(webhook.sys.id, id, 'id')
        return webhook.getCalls()
          .then((calls) => {
            t.ok(calls.items, 'gets list of calls')
            return webhook.getHealth()
              .then((health) => {
                t.ok(health.calls, 'gets webhook health')
                return webhook.delete()
              })
          })
      })
  })
  */

  test('Create webhook', async () => {
    return space
      .createWebhook({
        name: 'testname',
        url: 'http://localhost:8080',
        topics: ['Entry.publish'],
      })
      .then((webhook) => {
        expect(webhook.name).equals('testname', 'name')
        expect(webhook.url, 'url').ok
        webhook.name = 'updatedname'
        return webhook.update().then((updatedWebhook) => {
          expect(updatedWebhook.name).equals('updatedname', 'name')
          return updatedWebhook.delete()
        })
      })
  })
})
