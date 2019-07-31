# Public Test Registry API

## Table of Contents

- [Errors](#Errors)
- [Endpoints](#Endpoints)
  - [Account Endpoints](#Account-Endpoints)
    - [`GET·/api/accounts`](#GET·apiaccounts)
    - [`POST·/api/accounts/{name}`](#POST·apiaccountsname)
    - [`DELETE·/api/accounts/{name}`](#DELETE·apiaccountsname)
  - [Storage Endpoints](#Storage-Endpoints)
    - [`GET·/api/storage/{id}`](#GET·apistorageid)
    - [`POST·/api/storage`](#POST·apistorage)
    - [`DELETE·/api/storage/{id}`](#DELETE·apistorageid)
  - [Registry Endpoints](#Registry-Endpoints)
    - [`GET·/api/registry/{account}/get-versions`](#GET·apiregistryaccountget-versions)
    - [`GET·/api/registry/{account}/resolve-to-uri`](#GET·apiregistryaccountresolve-to-uri)
    - [`GET·/api/registry/{account}/get-features`](#GET·apiregistryaccountget-features)
    - [`POST·/api/registry/{account}/add-module`](#POST·apiregistryaccountadd-module)
    - [`POST·/api/registry/{account}/remove-module`](#POST·apiregistryaccountremove-module)
    - [`POST·/api/registry/{account}/add-site-binding`](#POST·apiregistryaccountadd-site-binding)
    - [`POST·/api/registry/{account}/remove-site-binding`](#POST·apiregistryaccountremove-site-binding)

## Errors
```json
{
  "success": false,
  "message": "Error message is here."
}
```

## Endpoints

### Account Endpoints

#### `GET·/api/accounts`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |

```json
{
  "success": true,
  "data": [
      "dapplet-base"
  ]
}
```

#### `POST·/api/accounts/{name}`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| name | String | **Path**  | ✅         | the name of new account |

```json
{
  "success": true,
  "message": "The account was created successfully.",
  "data": {
    "name": "dapplet-base",
    "key": "601789d419c927fcc86ca41ec6131b67"
  }
}
```

#### `DELETE·/api/accounts/{name}`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| name | String | **Path**  | ✅         | the name of deleting account |
| key | String | **Query**  | ✅         | the secret key of deleting account |

```json
{
  "success": true,
  "message": "The account was deleted successfully."
}
```

### Storage Endpoints

#### `GET·/api/storage/{id}`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| id | String | **Path**  | ✅         | the id of the file |

Returns binary file.

#### `POST·/api/storage`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| file | String | **Form**  | ✅         | the file |

```json
{
  "success": true,
  "data": "QmTjdrQg6ESPh3aDVt92HwfLPjSsfctoQm4z3uKNob13zP"
}
```

#### `DELETE·/api/storage/{id}`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| id| String | **Path**  | ✅         | the id of deleting file |

```json
{
  "success": true,
  "message": "The file was deleted."
}
```

### Registry Endpoints

#### `GET·/api/registry/{account}/get-versions`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query** | ❌         | the branch of the module (default "default") |

```json
{
  "success": true,
  "data": "QmTjdrQg6ESPh3aDVt92HwfLPjSsfctoQm4z3uKNob13zP"
}
```

#### `GET·/api/registry/{account}/resolve-to-uri`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query** | ❌         | the branch of the module (default "default") |
| version | String | **Query**  | ✅         | the version number of the module |

```json
{
  "success": true,
  "data": [
    "ipfs://QmTjdrQg6ESPh3aDVt92HwfLPjSsfctoQm4z3uKNob13zP"
  ]
}
```

#### `GET·/api/registry/{account}/get-features`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| hostname | String | **Query**  | ✅         | the hostname  |

```json
{
  "success": true,
  "data": {
    "test-feature-1.dapplets-base.eth": ["default"],
    "test-feature-2.dapplets-base.eth": ["example"]
  }
}
```

#### `POST·/api/registry/{account}/add-module`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| key | String | **Query**  | ✅         | the secret key of the account |
| uri | String | **Query**  | ✅         | the uri of the module manifest |

```json
{
  "success": true,
  "message": "The module is added to registry."
}
```

#### `POST·/api/registry/{account}/remove-module`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| key | String | **Query**  | ✅         | the secret key of the account |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query**  | ❌         | the branch of the module (default "default") ||
| version | String | **Query**  | ✅         | the version number of the module |

```json
{
  "success": true,
  "message": "The module is removed from registry."
}
```

#### `POST·/api/registry/{account}/add-site-binding`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| key | String | **Query**  | ✅         | the secret key of the account |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query**  | ❌         | the branch of the module (default "default") ||
| site | String | **Query**  | ✅         | the hostname |

```json
{
  "success": true,
  "message": "The module branch is binded with the site."
}
```

#### `POST·/api/registry/{account}/remove-site-binding`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| key | String | **Query**  | ✅         | the secret key of the account |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query**  | ❌         | the branch of the module (default "default") ||
| site | String | **Query**  | ✅         | the hostname |

```json
{
  "success": true,
  "message": "The module branch is unbinded from the site."
}
```