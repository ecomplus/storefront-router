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

### Dependencies

It requires and _may not_ include:

- `core-js`;
- [`@ecomplus/utils`](https://github.com/ecomclub/ecomplus-utils);
- [`@ecomplus/client`](https://github.com/ecomclub/ecomplus-client);

#### Node.js

```bash
npm i --save @ecomplus/utils @ecomplus/storefront-router
```

#### Webpack

```bash
npm i --save core-js @ecomplus/utils @ecomplus/storefront-router
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-router/dist/ecom-router.var.min.js"></script>
```

`ecomUtils` and `ecomClient` libraries
**must be included separately** and available on window scope.
