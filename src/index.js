/**
 * https://github.com/ecomclub/storefront-router
 * @author E-Com Club <ti@e-com.club>
 * @license MIT
 */

import { _config } from '@ecomplus/utils'
import map from './methods/map'
import resolve from './methods/resolve'
import list from './methods/list'
import setupStore from './methods/setup-store'

/**
 * Universal JS router for E-Com Plus storefront.
 * @module @ecomplus/storefront-router
 * @see EcomRouter
 *
 * @example
 * // ES import
 * import EcomRouter from '@ecomplus/storefront-router'
 *
 * @example
 * // With CommonJS
 * const EcomRouter = require('@ecomplus/storefront-router')
 *
 * @example
 * <!-- Global `EcomRouter` from CDN on browser -->
 * <script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-router/dist/ecom-router.root.min.js"></script>
 */

export default function (
  storeId = _config.get('store_id'),
  location = typeof window === 'object' && window.location
) {
  const self = this

  /**
   * Respective Store ID number
   * @name EcomRouter#storeId
   * @type {number|undefined}
   */
  this.storeId = storeId

  this.map = function () {
    return map(self, arguments)
  }

  this.resolve = function () {
    return resolve(self, arguments)
  }

  this.list = function () {
    return list(self, arguments)
  }

  this.setupStore = function () {
    return setupStore(self, arguments)
  }
}

/**
 * Construct a new storefront router object.
 * @class EcomRouter
 * @param {number} [storeId=_config.get('store_id')] - Preset Store ID number
 * @param {object} [location=window.location] -
 * [Location interface]{@link https://developer.mozilla.org/en-US/docs/Web/API/Location}
 *
 * @example

const router = new EcomRouter()

 *
 * @example

// Defining Store ID and using custom location interface
const storeId = 2000
const router = new EcomRouter(storeId, DOM.location)
// P.S.: You may want to use custom location when using jsdom on Node.js for example

 */
