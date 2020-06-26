export async function tagTests(t, space) {
  await t.test('create tag', async () => {
    const tagId = randomTagId()
    const tagName = 'Tag ' + tagId
    const environment = await space.getEnvironment('master')
    const newTag = await environment.createTag(tagId, tagName)
    t.equals(newTag.name, tagName, 'tag name should be equal')
  })

  await t.test('read tag', async () => {
    const tagId = randomTagId()
    const tagName = 'Tag ' + tagId
    const environment = await space.getEnvironment('master')
    await environment.createTag(tagId, tagName)
    const result = await environment.getTag(tagId)
    t.equals(result.name, tagName, 'tag name should be equal')
    t.equals(result.sys.id, tagId, 'tag id should be equal')
  })

  await t.test('read tags', async () => {
    const tagId = randomTagId()
    const tagName = 'Tag ' + tagId
    const environment = await space.getEnvironment('master')

    for (let index = 0; index < 10; index++) {
      await environment.createTag(`${tagId}-${index}`, `${tagName} ${index}`)
    }

    const result = await environment.getTags()
    t.equals(result.total >= 10, true, 'should return a minimum of created tags')
  })
}

function randomTagId() {
  return 'test-' + Date.now()
}
