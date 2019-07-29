import { store } from '@ecomplus/client'

const resolve = (self, [route]) => new Promise((resolve, reject) => {
  // handle new route
  const { storeId } = self
  const { resource, _id } = route

  if (resource && _id) {
    // get current page object from Store API
    store({ url: `/${resource}/${_id}.json`, storeId })
      .then(({ data }) => {
        // save object body on context
        resolve({ resource, body: data })
      })
      .catch(reject)
  } else {
    // skip request and just reject with new error
    const err = new Error('Invalid route resource or object ID')
    err.response = {}
    reject(err)
  }
})

/**
 * @typedef {object} context
 * @property {string} resource - Context resource type from
 * [E-Com Plus Store API]{@link https://developers.e-com.plus/docs/api/#/store/}
 * @property {object} body - Context
 * [Store API]{@link https://developers.e-com.plus/docs/api/#/store/}
 * document body for respective route
 */

/**
 * @method
 * @name EcomRouter#resolve
 * @description Get [Store API]{@link https://developers.e-com.plus/docs/api/#/store/}
 * document body based on route resource and Object ID.
 * <br><br>
 * <b>Tip</b>: Although resolve can be used standalone,
 * you may want to use [map]{@link EcomRouter#map} method first.
 *
 * @param {route} route - Route object to get respective document body
 * @returns {Promise<context|error>}
 *
 * @example

// Get document body for current URL pathname
router.map()
  .then(route => {
    router.resolve(route)
      .then(context => {
        console.log(context)
        console.log(context.resource)
        console.log(context.body)
        console.log(context.body._id)
        console.log(context.body.name)
      })
      .catch(error => { throw error })
  })
  .catch(error => {
    console.error(error)
    if (error.response) {
      console.log(error.response)
    }
  })

 */

export default resolve
