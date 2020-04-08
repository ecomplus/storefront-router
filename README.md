# E-Com Plus Storefront Router

[![Publish](https://github.com/ecomplus/storefront-router/workflows/Publish/badge.svg)](https://github.com/ecomplus/storefront-router/actions?workflow=Publish) [![CodeFactor](https://www.codefactor.io/repository/github/ecomplus/storefront-router/badge)](https://www.codefactor.io/repository/github/ecomplus/storefront-router)
[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-router.svg)](https://www.npmjs.org/@ecomplus/storefront-router)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SPA/SSR router for E-Com Plus storefront

[CHANGELOG](https://github.com/ecomplus/storefront-router/blob/master/CHANGELOG.md)

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
// Simple example resolving all routes
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

### Installation

It _may_ require and doesn't include `core-js` (optional) and [`@ecomplus/utils`](https://developers.e-com.plus/utils/) (peer dependency).

#### Webpack

```bash
npm i --save core-js @ecomplus/utils @ecomplus/storefront-router
```

#### Node.js

```bash
npm i --save @ecomplus/utils @ecomplus/storefront-router
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-router/dist/ecom-router.var.min.js"></script>
```

When importing from CDN, `ecomUtils` and `ecomClient` libraries **must be included separately** and available on window scope.
