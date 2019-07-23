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
  this.context = {}
  const context = this.context

  // resolve function to handle new route
  this.resolve = slug => new Promise((resolve, reject) => {
    // try to get current document info from global E-Com config first
    let resource = _config.get('page_resource')
    let objectId = _config.get('page_object_id')

    const getCurrentObject = () => {
      // save resource on context
      context.resource = resource
      // get current page object from Store API
      apiStore(`/${resource}/${objectId}.json`)
        .then(({ data }) => {
          // save object body on context
          context.body = data
          resolve(context)
        })
        .catch(reject)
    }

    if (resource && objectId) {
      getCurrentObject()
    } else {
      // map page resource and object based on received slug or window location
      mapBySlug(slug)
        .then(page => {
          resource = page.resource
          objectId = page._id
          getCurrentObject()
        })
        .catch(reject)
    }
  })
}

/**
 * @constructor
 * @name Router
 * @param {string} [slug] - Slug string (URL without first bar),
 * on browser it'll use pathname from global location object by default
 */
