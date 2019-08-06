# storefront-router

[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/storefront-router/badge)](https://www.codefactor.io/repository/github/ecomclub/storefront-router)
[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-router.svg)](https://www.npmjs.org/@ecomplus/storefront-router)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SPA/SSR router for E-Com Plus storefront

[Changelog](https://github.com/ecomclub/storefront-router/blob/master/CHANGELOG.md)

## Usage

The `@ecomplus/storefront-router` package may be used for:

- List all products, brands, categories and collections pages
(URL paths) for prerenderization/SSR;
- Based on URL path, get document body (product, brand, category, collection)
on browser or server side to render the page markup;

It's available for both Node.js and browser environments.

- [Get started](https://developers.e-com.plus/storefront-router/module-@ecomplus_storefront-router.html)
- [Class reference](https://developers.e-com.plus/storefront-router/EcomRouter.html)

### Example

```js
const router = new EcomRouter()
// Example resolving all routes
router.list()
  .then(routes => {
    routes.forEach(route => {
      console.log(route.resource)
      router.resolve(route)
        .then(context => {
          console.log(context.body)
        })
        .catch(error => { throw error })
    })
  })
  .catch(error => {
    console.error(error)
    if (error.response) {
      console.log(error.response)
    }
  })
```

### Dependencies

It requires and doesn't include
[`@ecomplus/utils`](https://github.com/ecomclub/ecomplus-utils) and
[`@ecomplus/client`](https://github.com/ecomclub/ecomplus-client).

It'll be automatically imported if you're developing on Node.js
environment or using a bundler such as Webpack,
**in other case those libraries must be included manually on
window scope**.
