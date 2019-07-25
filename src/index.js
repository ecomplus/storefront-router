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

export default function (
  storeId = _config.get('store_id'),
  location = typeof window === 'object' && window.location
) {
  const self = this

  /**
   * Respective Store ID number
   * @name Router#storeId
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
 * @class Router
 * @param {number} [storeId=_config.get('store_id')] - Preset Store ID number
 * @param {object} [location=window.location] -
 * [Location interface]{@link https://developer.mozilla.org/en-US/docs/Web/API/Location}
 *
 * @example

const router = new Router()

 *
 * @example

// Defining Store ID and using custom location interface
const storeId = 2000
const router = new Router(storeId, DOM.location)
// P.S.: You may want to use custom location when using jsdom on Node.js for example

 */
