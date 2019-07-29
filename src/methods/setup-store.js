import { _config } from '@ecomplus/utils'
import { platform } from '@ecomplus/client'

const setupStore = (self, [domain, updateConfig = true]) => {
  if (!domain) {
    // get domain from current location interface
    domain = self.location.hostname
  }
  const url = '/domains/' + domain + '.json'

  // send request to E-Com Plus Platform API
  return platform({ url }).then(({ data }) => {
    if (updateConfig) {
      // set Store IDs on config
      ;['store_id', 'store_object_id', 'channel_id'].forEach(prop => _config.set(prop, data[prop]))

      // check for default sales channel language
      const lang = data.default_lang
      if (lang) {
        // set default lang and country codes
        _config.set('lang', lang)
        _config.set('country_code', lang.replace(/^[a-z]{2}_/, '').toUpperCase())
        if (lang === 'pt_br') {
          // also change default currency
          _config.set('currency', 'BRL')
          _config.set('currency_symbol', 'R$')
        }
      }
    }

    // update instance Store ID
    self.storeId = data.store_id
    // returns channel info object on promise chain
    return data
  })
}

/**
 * @typedef {object} channel
 * @property {number} store_id - Sales channel Store ID
 * @property {string} store_object_id - Sales channel Store Object ID
 * @property {number} channel_id - Sales channel ID number
 * @property {string} [default_lang] - Sales channel default language code
 */

/**
 * @method
 * @name EcomRouter#setupStore
 * @description Get Store IDs and default lang (and set on `_config`) based on domain name.
 *
 * @param {string} [domain=location.hostname] - Sales channel domain name
 * @param {boolean} [updateConfig=true] - Update global configs from `ecomUtils._config`
 * @returns {Promise<channel|error>}
 *
 * @example

// Using current location URL
router.setupStore()
  .then(channel => {
    console.log(channel.store_id)
    console.log(channel.store_object_id)
    console.log(channel)
  })
  .catch(error => {
    console.error(error)
    if (error.response) {
      console.log(error.response)
    }
  })

 * @example

// Specifying domain name and disabling `ecomUtils._config` update
router.setupStore('shop-plus.e-com.plus', false)
  .then(channel => console.log(channel))
  .catch(error => console.error(error))

 */

export default setupStore
