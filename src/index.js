/**
 * Universal JS router for E-Com Plus storefront.
 * {@link https://github.com/ecomclub/storefront-router GitHub}
 *
 * @module @ecomplus/storefront-router
 * @author E-Com Club <ti@e-com.club>
 * @return {@link EcomRouter}
 * @see EcomRouter
 *
 * @example
 * // ES import default
 * import EcomRouter from '@ecomplus/storefront-router'
 *
 * @example
 * // With CommonJS
 * const EcomRouter = require('@ecomplus/storefront-router')
 *
 * @example
 * <!-- Global `EcomRouter` from CDN on browser -->
 * <script src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-router/dist/ecom-router.var.min.js"></script>
 *
 * @example
 * <!-- Bundle from CDN with `ecomUtils` and `ecomClient` -->
 * <script
 *   src="https://cdn.jsdelivr.net/npm/@ecomplus/storefront-router/dist/ecom-router.bundle.min.js"
 * ></script>
 */

import { $ecomConfig } from '@ecomplus/utils'
import map from './methods/map'
import resolve from './methods/resolve'
import list from './methods/list'
import setupStore from './methods/setup-store'

export default function (storeId, location = typeof window === 'object' && window.location) {
  const self = this

  /**
   * Respective Store ID number
   * @name EcomRouter#storeId
   * @type {number}
   */
  this.storeId = storeId || $ecomConfig.get('store_id')

  /**
   * [Location interface]{@link https://developer.mozilla.org/en-US/docs/Web/API/Location}
   * @name EcomRouter#location
   * @type {object}
   */
  this.location = location

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
