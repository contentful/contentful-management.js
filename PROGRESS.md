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

### Assets - ⚠️

| Function                             | Exposed to a plain client |
| ------------------------------------ | ------------------------- |
| Gets an asset by :id                 | ✅                        |
| Gets many assets                     | ✅                        |
| Creates a new asset                  | ✅                        |
| Creates a new asset with existing id | ✅                        |
| Creates assets from files            | 🍎                        |
| Updates an existing asset            | ✅ ⚠️                     |
| Deletes an existing asset            | ✅ ⚠️                     |
| Publishes an asset                   | ✅ ⚠️                     |
| Unpublishes an asset                 | ✅ ⚠️                     |
| Archives an asset                    | ✅ ⚠️                     |
| Unarchives an asset                  | ✅ ⚠️                     |
| Process asset for a locale           | 🍎                        |
| Process asset for all locales        | 🍎                        |

### Users - ✅

| Function                          | Exposed to a plain client |
| --------------------------------- | ------------------------- |
| Gets user from a space by :id     | ✅                        |
| Gets user from an org by :id      | ✅                        |
| Gets currently authenticated user | ✅                        |
| Gets many users from a space      | ✅                        |
| Gets many users from an org       | ✅                        |

### Entries

TBD

### Content types

TBD

### Organizations

TBD

### Editor interfaces

TDB

### App definitions

### App installations

### Environment aliases

### Organization invitations

### Organization memberships

### Snapshots

### Space members

### Space memberships

### Tags

### Teams

### Teams memberships

### Team space memberships

### UI Extensions

### Uploads

### Webhooks
