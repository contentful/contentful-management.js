const TEST_IMAGE_SOURCE_URL =
  "https://raw.githubusercontent.com/contentful/contentful-management.js/master/test/integration/fixtures/shiba-stuck-bush.jpg";

import { expect } from "chai";
import { after, before, describe, test } from "mocha";
import { getDefaultSpace, createTestSpace, client } from "../helpers";

describe("Asset api", function() {

  describe("Read", () => {
    let space;
    let environment;

    before(async () => {
      space = await getDefaultSpace();
      environment = await space.getEnvironment("master");
    });

    test("Gets assets with only images", async () => {
      return environment
        .getAssets({
          mimetype_group: "image"
        })
        .then((response) => {
          expect(response.items[0].fields.file["en-US"].contentType).match(/image/);
        });
    });

    test("Gets asset", async () => {
      return environment.getAsset("1x0xpXu4pSGS4OukSyWGUK").then((response) => {
        expect(response.sys, "sys").to.be.ok;
        expect(response.fields, "fields").to.be.ok;
      });
    });

    test("Gets assets", async () => {
      return environment.getAssets().then((response) => {
        expect(response.items, "items").to.be.ok;
      });
    });
  });

  // Write test seems currently broken
  describe("Write", function() {
    let space;
    let environment;

    before(async () => {
      space = await createTestSpace(client(), "Assets");
      environment = await space.getEnvironment("master");
      await environment.createLocale({
        name: "German (Germany)",
        code: "de-DE"
      });
    });

    after(async () => {
      if (space) {
        return space.delete();
      }
    });

    test("Create, process, update, publish, unpublish, archive, unarchive and delete asset", async function() {
      const asset = await environment.createAsset({
        fields: {
          title: { "en-US": "this is the title" },
          file: {
            "en-US": {
              contentType: "image/jpeg",
              fileName: "shiba-stuck.jpg",
              upload: TEST_IMAGE_SOURCE_URL
            }
          }
        }
      });
      expect(asset.fields.title["en-US"]).equals("this is the title", "original title");

      const processedAsset = await asset.processForLocale("en-US", { processingCheckWait: 10000 });
      expect(asset.isDraft(), "asset is in draft").to.be.true;
      expect(processedAsset.fields.file["en-US"].url, "file was uploaded").to.be.ok;

      const publishedAsset = await processedAsset.publish();
      expect(publishedAsset.isPublished(), "asset is published").to.be.true;

      publishedAsset.fields.title["en-US"] = "title has changed";
      const updatedAsset = await publishedAsset.update();
      expect(updatedAsset.isUpdated(), "asset is updated").to.be.true;
      expect(updatedAsset.fields.title["en-US"]).equals("title has changed");

      const unpublishedAsset = await updatedAsset.unpublish();
      expect(unpublishedAsset.isDraft(), "asset is back in draft").to.be.true;

      const archivedAsset = await unpublishedAsset.archive();
      expect(archivedAsset.isArchived(), "asset is archived").to.be.true;

      const unarchivedAsset = await archivedAsset.unarchive();
      expect(unarchivedAsset.isArchived(), "asset is not archived anymore").to.be.false;
      expect(unarchivedAsset.isDraft(), "asset is back in draft").to.be.true;

      await unarchivedAsset.delete();
    });

    test("Create and process asset with multiple locales", async () => {
      const asset = await environment
        .createAsset({
            fields: {
              title: { "en-US": "this is the title" },
              file: {
                "en-US": {
                  contentType: "image/jpeg",
                  fileName: "shiba-stuck.jpg",
                  upload: TEST_IMAGE_SOURCE_URL
                },
                "de-DE": {
                  contentType: "image/jpeg",
                  fileName: "shiba-stuck.jpg",
                  upload: TEST_IMAGE_SOURCE_URL
                }
              }
            }
          }
        );

      const processedAsset = await asset.processForAllLocales({ processingCheckWait: 5000 });
      expect(processedAsset.fields.file["en-US"].url, "file en-US was uploaded").to.be.ok;
      expect(processedAsset.fields.file["de-DE"].url, "file de-DE was uploaded").to.be.ok;
    });

    test("Upload and process asset with multiple locales", async () => {
      const asset = await environment
        .createAssetFromFiles({
          fields: {
            title: { "en-US": "SVG upload test" },
            file: {
              "en-US": {
                contentType: "image/svg+xml",
                fileName: "blue-square.svg",
                file:
                  "<svg xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"blue\" d=\"M50 50h150v50H50z\"/></svg>"
              },
              "de-DE": {
                contentType: "image/svg+xml",
                fileName: "red-square.svg",
                file:
                  "<svg xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"red\" d=\"M50 50h150v50H50z\"/></svg>"
              }
            }
          }
        });

      const processedAsset = await asset.processForAllLocales({ processingCheckWait: 5000 });
      expect(processedAsset.fields.file["en-US"].url, "file en-US was uploaded").to.be.ok;
      expect(processedAsset.fields.file["de-DE"].url, "file de-DE was uploaded").to.be.ok;
    });
  });
});
