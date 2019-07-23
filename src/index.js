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
  // setup context object
  const context = {}
  this.content = context

  // map function to return resource and object ID from slug
  const map = slug => new Promise((resolve, reject) => {
    // try to get current document info from global E-Com config first
    const resource = _config.get('page_resource')
    const _id = _config.get('page_object_id')
    if (resource && _id) {
      resolve({ resource, _id })
    } else {
      // map page resource and object based on received slug or window location
      mapBySlug(slug).then(resolve).catch(reject)
    }
  })
  this.map = map

  // resolve function to handle new route
  this.resolve = slug => new Promise((resolve, reject) => {
    map(slug)
      .then(({ resource, _id }) => {
        // save resource on context
        context.resource = resource
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
}

/**
 * @constructor
 * @name Router
 * @param {string} [slug] - Slug string (URL without first bar),
 * on browser it'll use pathname from global location object by default
 */
