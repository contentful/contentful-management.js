async function createRandomTag(environment) {
  const tagId = randomTagId()
  const tagName = 'Tag ' + tagId
  console.log(`create random tag ${tagName}:${tagId}`)
  return environment.createTag(tagId, tagName)
}

function randomTagId() {
  return 'test-' + Date.now()
}

async function createTagTest(t, space) {
  t.plan(1)
  const tagId = randomTagId()
  const tagName = 'Tag ' + tagId
  const environment = await space.getEnvironment('master')
  const newTag = await environment.createTag(tagId, tagName)
  t.equals(newTag.name, tagName, 'tag name should be equal')
}

async function createReadTagTest(t, space) {
  t.plan(2)
  const tagId = randomTagId()
  const tagName = 'Tag ' + tagId
  const environment = await space.getEnvironment('master')
  await environment.createTag(tagId, tagName)
  const result = await environment.getTag(tagId)
  t.equals(result.name, tagName, 'tag name should be equal')
  t.equals(result.sys.id, tagId, 'tag id should be equal')
}

async function createReadTagsTest(t, space) {
  t.plan(1)
  const tagId = randomTagId()
  const tagName = 'Tag ' + tagId
  const environment = await space.getEnvironment('master')

  for (let index = 0; index < 10; index++) {
    await environment.createTag(`${tagId}-${index}`, `${tagName} ${index}`)
  }

  const result = await environment.getTags()
  t.equals(result.total >= 10, true, 'should return a minimum of created tags')
}

async function writeEntityTagsTest(t, entity, environment) {
  t.equal(entity.metadata.tags.length, 0, 'entity starts with no tags')
  const tag = await createRandomTag(environment)
  const tagLink = {
    sys: {
      type: 'Link',
      linkType: 'Tag',
      id: tag.sys.id,
    },
  }
  entity.metadata.tags.push(tagLink)
  console.log(`entity update`)
  const updatedEntity = await entity.update()
  t.deepEqual(updatedEntity.metadata.tags[0], tagLink, 'tag created on entity')
  updatedEntity.metadata.tags = []
  console.log(`entity update`)
  const noTagsEntity = await updatedEntity.update()
  t.deepEqual(noTagsEntity.metadata.tags, [], 'tag removed from entity')
}

async function createManipulateEntitiesTest(t, space) {
  t.plan(6)
  let entry
  const env = await space.getEnvironment('master')
  entry = await env.createEntry('layout', { fields: {} })
  await writeEntityTagsTest(t, entry, env)
  let asset = await env.getAsset('1YK5kwroV6UEGS64mQs0Eo')
  await writeEntityTagsTest(t, asset, env)
}

export function tagTests(suite, space) {
  suite.test('create tag', (t) => {
    return createTagTest(t, space)
  })

  suite.test('read tag', (t) => {
    return createReadTagTest(t, space)
  })

  suite.test('read tags', async (t) => {
    return createReadTagsTest(t, space)
  })

  suite.test('Creates, edits, deletes tags on entity', (t) => {
    return createManipulateEntitiesTest(t, space)
  })
}
