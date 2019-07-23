/**
 * https://github.com/ecomclub/storefront-router
 * @author E-Com Club <ti@e-com.club>
 * @license MIT
 */

import { _config } from '@ecomplus/utils'
import { mapBySlug, apiStore } from '@ecomplus/client'
// import router from './lib/router'

/**
 * Universal JS router for E-Com Plus storefront.
 * @module @ecomplus/storefront-router
 * @see Router
 *
 * @example
 * // ES import
 * import Router from '@ecomplus/storefront-router'
 *
 * @example
 * // With CommonJS
 * const Router = require('@ecomplus/storefront-router')
 */

export default function () {
  // map function to return resource and object ID from slug
  const map = path => new Promise((resolve, reject) => {
    // try to get current document info from global E-Com config first
    const resource = _config.get('page_resource')
    const _id = _config.get('page_object_id')
    if (resource && _id) {
      resolve({ resource, _id })
    } else {
      // map page resource and object based on received slug or window location
      const slug = typeof path === 'string' ? path.slice(1) : null
      mapBySlug(slug).then(resolve).catch(reject)
    }
  })
  this.map = map

  // resolve function to handle new route
  this.resolve = path => new Promise((resolve, reject) => {
    map(path)
      .then(context => {
        const { resource, _id } = context
        // get current page object from Store API
        apiStore(`/${resource}/${_id}.json`)
          .then(({ data }) => {
            // save object body on context
            context.body = data
            resolve(context)
          })
          .catch(reject)
      })
      .catch(reject)
  })

  // get list of all routes
  this.list = () => Promise.resolve([])
}

/**
 * @constructor
 * @name Router
 * @param {string} [slug] - Slug string (URL without first bar),
 * on browser it'll use pathname from global location object by default
 */
