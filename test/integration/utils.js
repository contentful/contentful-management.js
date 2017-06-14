import { createClient } from '../../lib/contentful-management'

let tempSpace = null

const params = {
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}
const organization = process.env.CONTENTFUL_ORGANIZATION
const client = createClient(params)

export function getSpace () {
  if (tempSpace) {
    return Promise.resolve(tempSpace)
  }
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
          tempSpace = space
          return space
        })
    })
}
