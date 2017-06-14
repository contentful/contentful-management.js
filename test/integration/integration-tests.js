/* global test, expect, describe */
import {localeTests} from './locale-integration'
import {contentTypeReadOnlyTests, contentTypeWriteTests} from './content-type-integration'
import {entryReadOnlyTests, entryWriteTests} from './entry-integration'
import {assetReadOnlyTests, assetWriteTests} from './asset-integration'
import webhookTests from './webhook-integration'
import spaceMembershipTests from './space-membership-integration'
import roleTests from './role-integration'
import { apiKeyTests } from './api-key-integration'
import generateRandomId from './generate-random-id'
import { createClient } from '../../lib/contentful-management'

let tempSpace = null

const params = {
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}

const organization = process.env.CONTENTFUL_ORGANIZATION

if (process.env.API_INTEGRATION_TESTS) {
  params.host = '127.0.0.1:5000'
  params.insecure = true
}

const client = createClient(params)

test('Gets spaces', () => {
  return client.getSpaces()
  .then((response) => {
    expect(response.items).toBeTruthy()
    expect(response.total > 0).toBeTruthy()
  })
})

test('Gets organizations', () => {
  return client.getOrganizations()
  .then((response) => {
    expect(response.items.length >= 1).toBeTruthy()
  })
})

test('Gets space', () => {
  return client.getSpace('cfexampleapi')
  .then((response) => {
    expect(response.sys).toBeTruthy()
    expect(response.name).toBeTruthy()
  })
})

// @todo unskip test when api behaviour is fixed
// - https://github.com/contentful/contentful-management.js/issues/82
test.skip('Fails to get space', () => {
  return client.getSpace(generateRandomId('weirdrandomid'))
  .then(() => {}, (error) => {
    expect(error.name).toBe('NotFound')
    const errorData = JSON.parse(error.message)
    expect(errorData.status).toeBe(404)
  })
})

test('Creates, updates and deletes a space', () => {
  return client.createSpace({
    name: 'spacename'
  }, organization)
  .then((space) => {
    expect(space.name).toBe('spacename')
    space.name = 'updatedspacename'
    return space.update()
    .then((updatedSpace) => {
      expect(updatedSpace.name).toBe('updatedspacename')
      return updatedSpace.delete()
    })
  })
})

test('Gets space for read only tests', () => {
  return client.getSpace('cfexampleapi')
  .then((space) => {
    contentTypeReadOnlyTests(space)
    entryReadOnlyTests(space)
    assetReadOnlyTests(space)
  })
})

describe('Create space for tests which create, change and delete data', () => {
  localeTests(tempSpace)
  contentTypeWriteTests(tempSpace)
  entryWriteTests(tempSpace)
  assetWriteTests(tempSpace)
  webhookTests(tempSpace)
  spaceMembershipTests(tempSpace)
  roleTests(tempSpace)
  apiKeyTests(tempSpace)
})
