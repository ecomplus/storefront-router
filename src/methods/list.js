import { store } from '@ecomplus/client'

export default self => new Promise((resolve, reject) => {
  const { storeId } = self
  // list slugs for each resource
  const promises = []
  const routes = []

  ;[
    'products',
    'categories',
    'collections',
    'brands'
  ].forEach(resource => {
    promises.push(
      store({ url: `/${resource}.json`, storeId }).then(response => {
        const { result } = response.data
        if (Array.isArray(result)) {
          result.forEach(({ _id, slug }) => {
            if (slug) {
              // check it this path is not already in use
              const path = '/' + slug
              if (!routes.find(route => route.path === path)) {
                // add new route object
                routes.push({ resource, _id, path })
              }
            }
          })
        }
      })
    )
  })

  // resolve when all promises are done
  Promise.all(promises)
    .then(() => resolve(routes))
    .catch(reject)
})

/**
 * @method
 * @name StorefrontRouter#list
 * @description List all storefront routes for product, categories, brands and collections.
 *
 * @returns {Promise<route[]|error>}
 *
 * @example

// Listing all routes, then resolving to get each document body
router.list()
  .then(routes => {
    routes.forEach(route => {
      console.log(route.path)
      console.log(route.resource)
      console.log(route._id)
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

 */
