import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { initPlainClient, getTestOrganization } from '../helpers'

describe('AppDetails api', function () {
  let appDefinition
  let client
  let organization
  const imageOne = {
    value:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAABQGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGDiSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8rAySDOwMNgxGCWmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis8vZX+xR6Zt8p3FlULrY1pg1TPQrgSkktTgbSf4A4IbmgqISBgTEGyFYuLykAsRuAbJEioKOA7CkgdjqEvQLEToKw94DVhAQ5A9kXgGyB5IzEFCD7AZCtk4Qkno7EhtoLAmxGxmaWvgQcSiooSa0oAdHO+QWVRZnpGSUKjsDQSVXwzEvW01EwMjAyZGAAhTVE9ecb4DBkFONAiKVuZmAwMQAKCiDEMhIZGHaxAp3fjRDTOMTAIHiKgeHgpILEokS4Axi/sRSnGRtB2NzbGRhYp/3//zmcgYFdk4Hh7/X//39v////7zIGBuZbDAwHvgEAzXVeL53pNs4AAABWZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAOShgAHAAAAEgAAAESgAgAEAAAAAQAAAAOgAwAEAAAAAQAAAAMAAAAAQVNDSUkAAABTY3JlZW5zaG90hLeVwgAAAdJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlVzZXJDb21tZW50PlNjcmVlbnNob3Q8L2V4aWY6VXNlckNvbW1lbnQ+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4zPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Ck6r6sgAAAAWSURBVAgdY7x69cx/BihggjFANAoHAH6QA3u0fLYDAAAAAElFTkSuQmCC',
    type: 'base64',
  }
  const imageTwo = {
    value:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAABQGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGDiSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8rAySDOwMNgxGCWmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis8vZX+xR6Zt8p3FlULrY1pg1TPQrgSkktTgbSf4A4IbmgqISBgTEGyFYuLykAsRuAbJEioKOA7CkgdjqEvQLEToKw94DVhAQ5A9kXgGyB5IzEFCD7AZCtk4Qkno7EhtoLAmxGxmaWvgQcSiooSa0oAdHO+QWVRZnpGSUKjsDQSVXwzEvW01EwMjAyZGAAhTVE9ecb4DBkFONAiKVuZmAwMQAKCiDEMhIZGHaxAp3fjRDTOMTAIHiKgeHgpILEokS4Axi/sRSnGRtB2NzbGRhYp/3//zmcgYFdk4Hh7/X//39v////7zIGBuZbDAwHvgEAzXVeL53pNs4AAABWZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAOShgAHAAAAEgAAAESgAgAEAAAAAQAAAAKgAwAEAAAAAQAAAAIAAAAAQVNDSUkAAABTY3JlZW5zaG900Fpo3gAAAdJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlVzZXJDb21tZW50PlNjcmVlbnNob3Q8L2V4aWY6VXNlckNvbW1lbnQ+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cl89Cn4AAAASSURBVAgdY/wPBAxAwAQiQAAAPfgEAIAu9DkAAAAASUVORK5CYII=',
    type: 'base64',
  }

  before(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppDetails',
    })

    client = initPlainClient()
  })

  after(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppDetails', async () => {
    const details = await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    expect(details.icon).equals(imageOne)

    await client.appDetails.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('getAppDetails', async () => {
    await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )
    const details = await client.appDetails.get({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    expect(details.icon).equals(imageOne)
    await client.appDetails.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('updateAppDetails', async () => {
    const details = await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    expect(details.icon).equals(imageOne)

    const updatedDetails = await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageTwo }
    )

    expect(updatedDetails.icon).equals(imageTwo)

    await client.appDetails.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('deleteAppDetails', async () => {
    await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    await client.appDetails.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    await expect(
      client.appDetails.get({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })
    ).to.be.rejectedWith('The resource could not be found')
  })
})
