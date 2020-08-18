import { createClient } from '../../lib/contentful-management'

const params = {}

const env = process.env.CONTENTFUL_ACCESS_TOKEN !== undefined ? process.env : window.__env__

export const client = () =>
  createClient({
    accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    ...params,
  })

export const v2Client = () =>
  createClient({
    accessToken: env.CONTENTFUL_V2_ACCESS_TOKEN,
    ...params,
  })
