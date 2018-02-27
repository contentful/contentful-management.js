import test from 'blue-tape'
import delay from 'delay'

import {localeTests} from './locale-integration'
import {contentTypeReadOnlyTests, contentTypeWriteTests} from './content-type-integration'
import {entryReadOnlyTests, entryWriteTests} from './entry-integration'
import {assetReadOnlyTests, assetWriteTests} from './asset-integration'
import webhookTests from './webhook-integration'
import spaceMembershipTests from './space-membership-integration'
import roleTests from './role-integration'
import apiKeyTests from './api-key-integration'
import uiExtensionTests from './ui-extension-integration'
import generateRandomId from './generate-random-id'
import { createClient } from '../../'

const params = {
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}

const organization = process.env.CONTENTFUL_ORGANIZATION

if (process.env.API_INTEGRATION_TESTS) {
  params.host = '127.0.0.1:5000'
  params.insecure = true
}

const client = createClient(params)

test('Gets spaces', (t) => {
  t.plan(2)
  return client.getSpaces()
    .then((response) => {
      t.ok(response.items, 'items')
      t.ok(response.total > 0, 'items have spaces')
    })
})

test('Gets organizations', (t) => {
  t.plan(1)
  return client.getOrganizations()
    .then((response) => {
      t.ok(response.items.length >= 1, 'user must belong to at least one organization')
    })
})

test('Gets personal access tokens', (t) => {
  t.plan(2)
  return client.getPersonalAccessTokens()
    .then((response) => {
      t.ok(response.items, 'items')
      t.ok(response.sys, 'sys')
    })
})

test('Create and revoke a personal access token', (t) => {
  t.plan(3)
  return client.createPersonalAccessToken({
    'name': 'My Token',
    'scopes': [
      'content_management_manage'
    ]
  })
    .then((token) => {
      t.ok(token.sys, 'sys')
      t.equals(token.name, 'My Token')
      return token.revoke()
        .then((revoked) => {
          t.ok(revoked.sys, 'sys')
        })
    })
})

test('Gets User', (t) => {
  t.plan(2)
  return client.getCurrentUser()
    .then((user) => {
      t.ok(user, 'user')
      t.ok(user.sys, 'user.sys')
    })
})

test('Gets space', (t) => {
  t.plan(2)
  return client.getSpace('cfexampleapi')
    .then((response) => {
      t.ok(response.sys, 'sys')
      t.ok(response.name, 'name')
    })
})

test('Fails to get space', (t) => {
  t.plan(2)
  return client.getSpace(generateRandomId('weirdrandomid'))
    .then(() => {}, (error) => {
      t.equals(error.name, 'NotFound', 'error name')
      const errorData = JSON.parse(error.message)
      t.equals(errorData.status, 404, 'http status code from parsed error data')
    })
})

test('Creates, updates and deletes a space', (t) => {
  t.plan(2)
  return client.createSpace({
    name: 'spacename'
  }, organization)
    .then((space) => {
      t.equals(space.name, 'spacename')
      space.name = 'updatedspacename'
      return space.update()
        .then((updatedSpace) => {
          t.equals(updatedSpace.name, 'updatedspacename')
          return updatedSpace.delete()
        })
    })
})

test('Gets space for read only tests', (t) => {
  return client.getSpace('cfexampleapi')
    .then((space) => {
      contentTypeReadOnlyTests(t, space)
      entryReadOnlyTests(t, space)
      assetReadOnlyTests(t, space)
    })
})

test('Create space for tests which create, change and delete data', (t) => {
  return client.createSpace({
    name: 'CMA JS SDK tests'
  }, organization)
  // When running these tests locally, create a specific space, uncomment and
  // use the line below to avoid running into the 10 space per hour creation limit.
  // Also comment the test.onFinish line below to avoid removing the space.
  // The below line also uses double quotes on purpose so it breaks the linter
  // in case someone forgets to comment this line again.
  // client.getSpace('a3f19zbn5ldg')
    .then((space) => {
      return space.createLocale({
        name: 'German (Germany)',
        code: 'de-DE'
      })
        .then(() => {
          return space
        })
    })
    .then((space) => {
      localeTests(t, space)
      contentTypeWriteTests(t, space)
      entryWriteTests(t, space)
      assetWriteTests(t, space)
      webhookTests(t, space)
      spaceMembershipTests(t, space)
      roleTests(t, space)
      apiKeyTests(t, space)
      uiExtensionTests(t, space)
      test.onFinish(() => space.delete())
    })
})

function waitForEnvironmentToBeReady (space, environment) {
  return space.getEnvironment(environment.sys.id)
    .then((env) => {
      if (env.sys.status.sys.id !== 'ready') {
        console.log(`Environment ${environment.sys.id} is not ready yet. Waiting 1000ms...`)
        return delay(1000)
          .then(() => waitForEnvironmentToBeReady(space, env))
      }
      return env
    })
}

test('Create space with an environment for tests which create, change and delete data', (t) => {
  return client.createSpace({
    name: 'CMA JS SDK tests'
  }, organization)
  // When running these tests locally, create a specific space, uncomment and
  // use the line below to avoid running into the 10 space per hour creation limit.
  // Also comment the test.onFinish line below to avoid removing the space.
  // The below line also uses double quotes on purpose so it breaks the linter
  // in case someone forgets to comment this line again.
  // client.getSpace('gauywn1xskhq')
    .then((space) => {
      return space.createLocale({
        name: 'German (Germany)',
        code: 'de-DE'
      })
        .then(() => {
          return space.createEnvironment({
            name: 'Testing Environment'
          })
        })
        .then((environment) => {
          return waitForEnvironmentToBeReady(space, environment)
        })
        .then((environment) => ({
          environment,
          space
        }))
        .catch((err) => {
          console.error(err)
          t.fail('Environment creation failed.')
        })
    })
    .then(({environment, space}) => {
      localeTests(t, environment)
      contentTypeWriteTests(t, environment)
      entryWriteTests(t, environment)
      assetWriteTests(t, environment)
      uiExtensionTests(t, environment)
      // test.onFinish(() => environment.delete())
      test.onFinish(() => space.delete())
    })
})
