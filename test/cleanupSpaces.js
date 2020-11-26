const client = require('./helpers').client

function filterDeletableSpaces(spaces, threshold) {
  return spaces.filter((space) => {
    return (
      space.name.startsWith('CMA JS SDK') &&
      Date.parse(space.sys.updatedAt) + threshold < Date.now()
    )
  })
}

async function cleanupSpaces(threshold = 1000 * 60 * 60, dryRun = false) {
  const api = client()
  const spaces = await api
    .getSpaces()
    .then((result) => filterDeletableSpaces(result.items, threshold))

  console.log(`found ${spaces.length} spaces matching delete criteria`)

  async function deleteSpace(spaceId) {
    return api
      .getSpace(spaceId)
      .then((space) => space.delete())
      .then(() => console.log(`deleted space ${spaceId}`))
      .catch((e) => console.error(`error deleting space ${spaceId} with error "${e.name}"`))
  }

  if (dryRun) {
    console.log(spaces.map((space) => `space "${space.name}" id:${space.sys.id}`))
  } else {
    await Promise.allSettled(spaces.map((space) => deleteSpace(space.sys.id)))
  }
}

cleanupSpaces().catch(console.error)
