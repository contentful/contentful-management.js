export function entryTagTests(t, space) {
  const defaultEnvId = 'master'
  t.test('Gets entry with tags', async (t) => {
    t.plan(1)
    const entry = await space.getEntry('5VWYVBc39Cia0sqqaeyiIW')
    t.deepEqual(entry.metadata.tags, [],'has metadata.tags')
  })

  t.test('Creates tags on entry', async (t) => {
    t.plan(10)
    const env = await space.getEnvironment(defaultEnvId)
    const tag = await env.createTag('tag-id', 'Tag Name')
    const entry = await env.createEntry('layout', { fields: { title: { 'en-US': 'this is the title' } } })
    console.log(tag)
    // entry.metadata.tags.push()
  })

  // t.test('Gets Entry snapshots', (t) => {
  //   t.plan(2)
  //   return space.getEntry('5ETMRzkl9KM4omyMwKAOki').then((entry) => {
  //     return entry.getSnapshots().then((response) => {
  //       t.ok(response, 'entry snapshots')
  //       t.ok(response.items, 'entry snapshots items')
  //     })
  //   })
  // })
}
