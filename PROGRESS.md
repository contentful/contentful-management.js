## Progress plain client

- ✅ - fully done
- ✅ ⚠️ - needs to reuse new functions in the existing code
- 🍎 - needs to be done

### Space - ✅

| Function                  | Exposed to a plain client |
| ------------------------- | ------------------------- |
| Gets space by :id         | ✅                        |
| Gets many spaces          | ✅                        |
| Creates a new space       | ✅                        |
| Updates an existing space | ✅                        |
| Deletes an existing space | ✅                        |

### Environment - ✅

| Function                                   | Exposed to a plain client |
| ------------------------------------------ | ------------------------- |
| Gets environment by :id                    | ✅                        |
| Gets many environments                     | ✅                        |
| Creates new environment                    | ✅                        |
| Creates new environment with a specific id | ✅                        |
| Updates an existing environment            | ✅                        |
| Deletes an existing environment            | ✅                        |

### Api Keys - ✅

| Function                                 | Exposed to a plain client |
| ---------------------------------------- | ------------------------- |
| Gets api_key by id                       | ✅                        |
| Gets many api_keys                       | ✅                        |
| Creates a new api_key                    | ✅                        |
| Creates a new api_key with a specific id | ✅                        |
| Updates an existing api_key              | ✅                        |
| Deletes an existing api_key              | ✅                        |

### Preview Api Keys - ✅

> Even though they are accessed through a different endpoint, Preview API keys are handled together with Delivery API keys. This means that when you create a CDA key, the corresponding CPA key will be created. A Delivery API key object will contain a link to its corresponding CPA key, which will need to be resolved calling the appropriate endpoint. Preview API keys also cannot be deleted, as they will be deleted along with their Delivery API keys.

| Function                   | Exposed to a plain client |
| -------------------------- | ------------------------- |
| Gets preview_api_key by id | ✅                        |
| Gets many preview_api_keys | ✅                        |

### Personal access tokens - ✅

| Function                                  | Exposed to a plain client |
| ----------------------------------------- | ------------------------- |
| Gets personal access token by id          | ✅                        |
| Gets many personal access tokens          | ✅                        |
| Creates a new personal access token       | ✅                        |
| Revokes an existing personal access token | ✅                        |

### Scheduled Actions - ✅

| Function                   | Exposed to a plain client |
| -------------------------- | ------------------------- |
| Gets many scheduled action | ✅                        |
| Creates a scheduled action | ✅                        |
| Deletes a scheduled action | ✅                        |

### Roles - ✅

| Function                              | Exposed to a plain client |
| ------------------------------------- | ------------------------- |
| Gets role by id                       | ✅                        |
| Gets many roles                       | ✅                        |
| Creates a new role                    | ✅                        |
| Creates a new role with a specific id | ✅                        |
| Updates an existing role              | ✅                        |
| Deletes an existing role              | ✅                        |

### Usage - ✅

| Function           | Exposed to a plain client |
| ------------------ | ------------------------- |
| Space usage        | ✅                        |
| Organization usage | ✅                        |

### Locales - ✅

| Function                   | Exposed to a plain client |
| -------------------------- | ------------------------- |
| Gets a locale by :id       | ✅                        |
| Gets many locales          | ✅                        |
| Creates new locale         | ✅                        |
| Updates an existing locale | ✅                        |
| Deletes an existing locale | ✅                        |

### Assets - ✅

| Function                             | Exposed to a plain client |
| ------------------------------------ | ------------------------- |
| Gets an asset by :id                 | ✅                        |
| Gets many assets                     | ✅                        |
| Creates a new asset                  | ✅                        |
| Creates a new asset with specific id | ✅                        |
| Creates assets from files            | ✅                        |
| Updates an existing asset            | ✅                        |
| Deletes an existing asset            | ✅                        |
| Publishes an asset                   | ✅                        |
| Unpublishes an asset                 | ✅                        |
| Archives an asset                    | ✅                        |
| Unarchives an asset                  | ✅                        |
| Process asset for a locale           | ✅                        |
| Process asset for all locales        | ✅                        |

### Users - ✅

| Function                          | Exposed to a plain client |
| --------------------------------- | ------------------------- |
| Gets user from a space by :id     | ✅                        |
| Gets user from an org by :id      | ✅                        |
| Gets currently authenticated user | ✅                        |
| Gets many users from a space      | ✅                        |
| Gets many users from an org       | ✅                        |

### Content types - ✅

| Function                                      | Exposed to a plain client |
| --------------------------------------------- | ------------------------- |
| Gets content type by :id                      | ✅                        |
| Gets many content types                       | ✅                        |
| Creates a new content type                    | ✅                        |
| Creates a new content type with a specific id | ✅                        |
| Updates an existing content type              | ✅                        |
| Deletes an existing content type              | ✅                        |

### Organizations - ✅

| Function                   | Exposed to a plain client |
| -------------------------- | ------------------------- |
| Gets an organization by id | ✅                        |
| Gets many organizations    | ✅                        |

### Entries - ✅

| Function                               | Exposed to a plain client |
| -------------------------------------- | ------------------------- |
| Gets an entry by id                    | ✅                        |
| Gets many entries                      | ✅                        |
| Creates a new entry                    | ✅                        |
| Creates a new entry with a specific id | ✅                        |
| Creates a new entry with a specific id | ✅                        |
| Updates an existing entry              | ✅                        |
| Deletes an existing entry              | ✅                        |
| Publishes an entry                     | ✅                        |
| Unpublishes an entry                   | ✅                        |
| Archives an entry                      | ✅                        |
| Unarchives an entry                    | ✅                        |

### Snapshots

| Function                                           | Exposed to a plain client |
| -------------------------------------------------- | ------------------------- |
| Gets a snapshot for an entry by snapshot id        | 🍎                        |
| Gets a snapshot for an content type by snapshot id | 🍎                        |
| Gets many snapshots for an entry                   | 🍎                        |
| Gets many snapshots for an content type            | 🍎                        |

### Tags - 🍎

| Function                | Exposed to a plain client |
| ----------------------- | ------------------------- |
| Gets a tag by id        | 🍎                        |
| Gets many tags          | 🍎                        |
| Creates a new tag       | 🍎                        |
| Updates an existing tag | 🍎                        |
| Deletes an exising tag  | 🍎                        |

### Editor interfaces - ✅

| Function                                          | Exposed to a plain client |
| ------------------------------------------------- | ------------------------- |
| Gets an editor interface by id                    | ✅                        |
| Gets many editor interfaces                       | ✅                        |
| Updates editor interface for a given content type | ✅                        |

### App definitions - 🍎

| Function                           | Exposed to a plain client |
| ---------------------------------- | ------------------------- |
| Gets an app definition by id       | 🍎                        |
| Gets many app definitions          | 🍎                        |
| Creates a new app definition       | 🍎                        |
| Updates an existing app definition | 🍎                        |
| Deletes an existing app definition | 🍎                        |

### App installations - 🍎

| Function                             | Exposed to a plain client |
| ------------------------------------ | ------------------------- |
| Gets an app installation by id       | 🍎                        |
| Gets many app installations          | 🍎                        |
| Creates a new app installation       | 🍎                        |
| Updates an existing app installation | 🍎                        |
| Deletes an existing app installation | 🍎                        |

### Environment aliases - 🍎

| Function                              | Exposed to a plain client |
| ------------------------------------- | ------------------------- |
| Creates an environment alias with id  | 🍎                        |
| Gets an environment alias by id       | 🍎                        |
| Gets many environment aliases         | 🍎                        |
| Updates an existing environment alias | 🍎                        |
| Deletes an existing environment alias | 🍎                        |

### Organization invitations - 🍎

| Function                      | Exposed to a plain client |
| ----------------------------- | ------------------------- |
| Gets an org invitation by id  | 🍎                        |
| Creates an new org invitation | 🍎                        |

### Organization memberships - 🍎

| Function                           | Exposed to a plain client |
| ---------------------------------- | ------------------------- |
| Gets an org membership by id       | 🍎                        |
| Gets many org memberships          | 🍎                        |
| Updates an existing org membership | 🍎                        |
| Deletes an existing org membership | 🍎                        |

### Space members

| Function                  | Exposed to a plain client |
| ------------------------- | ------------------------- |
| Gets a space member by id | 🍎                        |
| Gets many space members   | 🍎                        |

### Space memberships - 🍎

| Function                               | Exposed to a plain client |
| -------------------------------------- | ------------------------- |
| Gets a space membership by id          | 🍎                        |
| Gets many space memberships            | 🍎                        |
| Creates a new space membership         | 🍎                        |
| Creates a new space membership with id | 🍎                        |
| Updates an existing space membership   | 🍎                        |
| Deletes an exising space membership    | 🍎                        |

### Teams

| Function                 | Exposed to a plain client |
| ------------------------ | ------------------------- |
| Gets a team by id        | 🍎                        |
| Gets many teams          | 🍎                        |
| Creates a new team       | 🍎                        |
| Updates an existing team | 🍎                        |
| Deletes an exising team  | 🍎                        |

### Teams memberships

| Function                            | Exposed to a plain client |
| ----------------------------------- | ------------------------- |
| Gets a team membership by id        | 🍎                        |
| Gets many team memberships          | 🍎                        |
| Creates a new team membership       | 🍎                        |
| Updates an existing team membership | 🍎                        |
| Deletes an exising team membership  | 🍎                        |

### Team space memberships

| Function                                  | Exposed to a plain client |
| ----------------------------------------- | ------------------------- |
| Gets a team space membership by id        | 🍎                        |
| Gets many team space memberships          | 🍎                        |
| Creates a new team space membership       | 🍎                        |
| Updates an existing team space membership | 🍎                        |
| Deletes an exising team space membership  | 🍎                        |

### UI Extensions

| Function                                   | Exposed to a plain client |
| ------------------------------------------ | ------------------------- |
| Gets a extension by id                     | 🍎                        |
| Gets many extensions                       | 🍎                        |
| Creates a new extension                    | 🍎                        |
| Creates a new extension with a specific id | 🍎                        |
| Updates an existing extension              | 🍎                        |
| Deletes an exising extension               | 🍎                        |

### Uploads - ✅

| Function                | Exposed to a plain client |
| ----------------------- | ------------------------- |
| Creates an upload       | ✅                        |
| Gets an upload by id    | ✅                        |
| Deletes an upload by id | ✅                        |

### Webhooks

| Function                                       | Exposed to a plain client |
| ---------------------------------------------- | ------------------------- |
| Gets a webhook by id                           | 🍎                        |
| Gets many webhooks                             | 🍎                        |
| Creates a new webhook                          | 🍎                        |
| Creates a new webhook with a specific id       | 🍎                        |
| Updates an existing webhook                    | 🍎                        |
| Deletes an exising webhook                     | 🍎                        |
| Gets many webhook calls for a specific webhook | 🍎                        |
| Get webhook call by id for a specific webhook  | 🍎                        |
| Gets health for a specific webhook             | 🍎                        |
