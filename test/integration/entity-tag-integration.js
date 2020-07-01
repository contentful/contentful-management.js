export async function entityTagTests(t, space) {
  const defaultEnvId = 'master'
  const env = await space.getEnvironment(defaultEnvId)
  const tag = await env.getTag('tag-id', 'Tag Name')
  let entry = await env.getEntry('2uNOpLMJioKeoMq8W44uYc')
  let asset = await env.getAsset('1YK5kwroV6UEGS64mQs0Eo')

  t.test('Entities have tags property', async (t) => {
    t.plan(2)
    t.deepEqual(entry.metadata.tags, [], 'has metadata.tags')
    t.deepEqual(asset.metadata.tags, [], 'has metadata.tags')
  })

  async function writeEntityTagsTest(t, entity) {
    t.equal(entity.metadata.tags.length, 0, 'entity starts with no tags')
    const tagLink = {
      sys: {
        type: 'Link',
        linkType: 'Tag',
        id: tag.sys.id,
      },
    }
    entity.metadata.tags.push(tagLink)
    entity = await entity.update()
    t.deepEqual(entity.metadata.tags[0], tagLink, 'tag created on entity')
    entity.metadata.tags = []
    entity = await entity.update()
    t.deepEqual(entity.metadata.tags, [], 'tag deleted from entity')
  }

  t.test('Creates, edits, deletes tags on entity', async (t) => {
    t.plan(6)
    await writeEntityTagsTest(t, entry)
    await writeEntityTagsTest(t, asset)
  })
}
