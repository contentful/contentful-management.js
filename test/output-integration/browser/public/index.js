/* eslint-disable no-undef */
async function run() {
  if (!contentfulManagement) {
    throw 'contentful-management.js could not be loaded. Please check the build output.'
  }

  const client = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN,
  })

  const response = await client.getSpace('segpl12szpe6')

  const loadedDiv = document.createElement('div')
  loadedDiv.id = 'contentful-management-loaded'
  document.querySelector('body').appendChild(loadedDiv)

  document.querySelector('#content').innerHTML = response.sys.id

  document.querySelector('#version').innerHTML = client.version
}

run()
