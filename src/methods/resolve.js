import { store } from '@ecomplus/client'

const resolve = (self, [route]) => new Promise((resolve, reject) => {
  // handle new route
  const { storeId } = self
  const { resource, _id } = route
  // get current page object from Store API
  store({ url: `/${resource}/${_id}.json`, storeId })
    .then(({ data }) => {
      // save object body on context
      resolve({ route, body: data })
    })
    .catch(reject)
})

/**
 * @typedef {object} context
 * @property {route} route - Context route object
 * @property {object} body - Context
 * [Store API]{@link https://developers.e-com.plus/docs/api/#/store/}
 * document body for respective route
 */

/**
 * @method
 * @name Router#resolve
 * @description Get [Store API]{@link https://developers.e-com.plus/docs/api/#/store/}
 * document body based on route resource and Object ID.
 * <br><br>
 * <b>Tip</b>: Although resolve can be used standalone,
 * you may want to use [map]{@link Router#map} method first.
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
        console.log(context.route)
        console.log(context.route.resource)
        console.log(context.body)
        console.log(context.body._id)
        console.log(context.body.name)
      })
      .catch(error => throw error)
  })
  .catch(error => {
    console.error(error)
    if (error.response) {
      console.log(error.response)
    }
  })

 */

export default resolve
