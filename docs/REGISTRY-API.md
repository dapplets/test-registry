# Public Test Registry API

## Table of Contents

- [Errors](#Errors)
- [Endpoints](#Endpoints)
  - [Account Endpoints](#Account-Endpoints)
    - [`GET·/accounts`](#GETapiaccounts)
    - [`POST·/accounts/{name}`](#POSTapiaccountsname)
    - [`DELETE·/accounts/{name}`](#DELETEapiaccountsname)
  - [Storage Endpoints](#Storage-Endpoints)
    - [`GET·/{account}/storage/{id}`](#GETapistorageid)
    - [`POST·/{account}/storage`](#POSTapistorage)
    - [`DELETE·/{account}/storage/{id}`](#DELETEapistorageid)
  - [Registry Endpoints](#Registry-Endpoints)
    - [`GET·/{account}/registry/get-versions`](#GETapiregistryaccountget-versions)
    - [`GET·/{account}/registry/resolve-to-uri`](#GETapiregistryaccountresolve-to-uri)
    - [`GET·/{account}/registry/get-features`](#GETapiregistryaccountget-features)
    - [`POST·/{account}/registry/add-module`](#POSTapiregistryaccountadd-module)
    - [`POST·/{account}/registry/add-module-with-objects`](#POSTapiregistryaccountadd-module-with-objects)
    - [`POST·/{account}/registry/remove-module`](#POSTapiregistryaccountremove-module)
    - [`POST·/{account}/registry/add-site-binding`](#POSTapiregistryaccountadd-site-binding)
    - [`POST·/{account}/registry/remove-site-binding`](#POSTapiregistryaccountremove-site-binding)
    - [`POST·/{account}/registry/hash-to-uris`](#POSTapiregistryaccounthash-to-uris)
    - [`POST·/{account}/registry/add-hash-uri`](#POSTapiregistryaccountadd-hash-uri)
    - [`POST·/{account}/registry/remove-hash-uri`](#POSTapiregistryaccountremove-hash-uri)

## Errors
```json
{
  "success": false,
  "message": "Error message is here."
}
```

## Endpoints

### Account Endpoints

#### `GET·/accounts`
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

#### `POST·/accounts/{name}`
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

#### `DELETE·/accounts/{name}`
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

#### `GET·/{account}/storage/{id}`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| id | String | **Path**  | ✅         | the id of the file |

Returns binary file.

#### `POST·/{account}/storage`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| file | String | **Form**  | ✅         | the file |

```json
{
  "success": true,
  "data": "02f69cad51b9f50630823ba0b077255d1b7247f0b1b2fedd516f9f6e20b13684"
}
```

#### `DELETE·/{account}/storage/{id}`
| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| id| String | **Path**  | ✅         | the id of deleting file |

```json
{
  "success": true,
  "message": "The file was deleted."
}
```

### Registry Endpoints

#### `GET·/{account}/registry/get-versions`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query** | ❌         | the branch of the module (default "default") |

```json
{
  "success": true,
  "data": ["0.1.0", "0.1.1", "0.1.2", "0.1.3"]
}
```

#### `GET·/{account}/registry/resolve-to-uri`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query** | ❌         | the branch of the module (default "default") |
| version | String | **Query**  | ✅         | the version number of the module |

```json
{
  "success": true,
  "data": {
    "hash": "02f69cad51b9f50630823ba0b077255d1b7247f0b1b2fedd516f9f6e20b13684",
    "uris": [
      "ipfs://QmTjdrQg6ESPh3aDVt92HwfLPjSsfctoQm4z3uKNob13zP"
    ] 
  }
}
```

#### `GET·/{account}/registry/get-features`

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

#### `POST·/{account}/registry/add-module`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| key | String | **Query**  | ✅         | the secret key of the account |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query**  | ✅         | the branch of the module |
| version | String | **Query**  | ✅         | the version of the module |
| manifestHash | String | **Query**  | ✅         | the hash of the module manifest |

```json
{
  "success": true,
  "message": "The module is added to registry."
}
```

#### `POST·/{account}/registry/add-module-with-objects`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| key | String | **Query**  | ✅         | the secret key of the account |
| name | String | **Query**  | ✅         | the name of the module |
| branch | String | **Query**  | ✅         | the branch of the module |
| version | String | **Query**  | ✅         | the version of the module |
| hashUris | { hash: string, uri: string }[] | **Query**  | ✅         | the array the module objects |

```json
{
  "success": true,
  "message": "The module is added to registry."
}
```

#### `POST·/{account}/registry/remove-module`

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

#### `POST·/{account}/registry/add-site-binding`

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

#### `POST·/{account}/registry/remove-site-binding`

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

#### `GET·/{account}/registry/hash-to-uris`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| hash | String | **Query**  | ✅         | the hash of the module object |

```json
{
  "success": true,
  "data": [
    "ipfs://QmTjdrQg6ESPh3aDVt92HwfLPjSsfctoQm4z3uKNob13zP"
  ]
}
```

#### `POST·/{account}/registry/add-hash-uri`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| hash | String | **Query**  | ✅         | the hash of the module object |
| uri | String | **Query**  | ✅         | the URI of the module object |

```json
{
  "success": true,
  "message": "The URI is added to the hash."
}
```

#### `POST·/{account}/registry/remove-hash-uri`

| Name     | Value     | Kind     | Required?     | Notes     |
|------    |-------    |------    |-----------    |-------    |
| account | String | **Path**  | ✅         | the account name |
| hash | String | **Query**  | ✅         | the hash of the module object |
| uri | String | **Query**  | ✅         | the URI of the module object |

```json
{
  "success": true,
  "message": "The URI is removed from the hash."
}
```