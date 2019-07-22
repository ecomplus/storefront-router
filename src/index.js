import { _config } from '@ecomplus/utils'
import { mapBySlug, apiStore } from '@ecomplus/client'

export default slug => new Promise((resolve, reject) => {
  // try to get current document info from global E-Com config first
  let resource = _config.get('page_resource')
  let objectId = _config.get('page_object_id')

  const getCurrentObject = () => {
    // get current page object from Store API
    apiStore(`/${resource}/${objectId}.json`)
      .then(({ data }) => resolve(data))
      .catch(reject)
  }

  if (resource && objectId) {
    getCurrentObject()
  } else {
    // map page resource and object based on received slug or window location
    mapBySlug(slug)
      .then(page => {
        resource = page.resource
        objectId = page.object_id
        getCurrentObject()
      })
      .catch(reject)
  }
})
