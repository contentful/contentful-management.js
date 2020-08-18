import { createClient } from "../../";

const params = {
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
};

//const organization = process.env.CONTENTFUL_ORGANIZATION
// const v2Organization = process.env.CONTENTFUL_V2_ORGANIZATION
const v2AccessToken = process.env.CONTENTFUL_V2_ACCESS_TOKEN;

if (process.env.API_INTEGRATION_TESTS) {
  params.host = "127.0.0.1:5000";
  params.insecure = true;
}

export const client = () => createClient(params);

export const v2Client = () => createClient({
  accessToken: v2AccessToken
});
