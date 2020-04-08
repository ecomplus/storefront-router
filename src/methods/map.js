import { storefront } from '@ecomplus/client'

const map = (self, [path]) => {
  if (!path) {
    // get pathname from current location interface
    path = self.location.pathname
  }
  // map page resource and object based on slug
  const slug = typeof path === 'string' ? path.slice(1) : null
  // replace / with $ on slug to escape URL
  const url = '/' + self.storeId + '@' + slug.replace(/\//g, '$') + '.json'

  // send request to E-Com Plus Storefront API
  return storefront({ url }).then(response => {
    // { "GET": "[resource]@[id]" }
    const val = response.data.GET
    if (val) {
      const [resource, resourceId] = val.split('@')
      if (resourceId) {
        // returns object with resource info on promise chain
        return {
          path,
          resource,
          _id: resourceId
        }
      }
    }

    // throw error to handle promise catch
    const err = new Error('Resource not found, invalid slug or store ID')
    // simulate axios error object
    err.response = response
    throw err
  })
}

/**
 * @typedef {object} route
 * @property {string} path - Route URL pathname
 * @property {string} resource - Route resource type from
 * [E-Com Plus Store API]{@link https://developers.e-com.plus/docs/api/#/store/}
 * @property {string} _id - Route document Object ID from
 * [E-Com Plus Store API]{@link https://developers.e-com.plus/docs/api/#/store/}
 * @property {string} [name] - Route document name (not set on products)
 */

/**
 * @method
 * @name EcomRouter#map
 * @description Get page resource and object ID based on URL pathname.
 *
 * @param {string} [path=location.pathname] - URL pathname
 * @returns {Promise<route|error>}
 *
 * @example

// Mapping resource and object ID from current location pathname
router.map()
  .then(route => {
    console.log(route.path)
    console.log(route.resource)
    console.log(route._id)
  })
  .catch(error => {
    console.error(error)
    if (error.response) {
      console.log(error.response)
    }
  })

 * @example

// Specifying some URL pathname
router.map('/monitores')
  .then(route => console.log(route))
  .catch(error => console.error(error))

 */

export default map
