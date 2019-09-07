// import my functions
const helpers = require('./tools/helpers')
const callbackPackager = helpers.callbackPackager
const getAllObjectsInCollection = helpers.getAllObjectsInCollection

// export our lambda function as named "handler" export
exports.handler = (event, context, callback) => {

  // check if this is a preflight request, if it is, return 200
  if (event.httpMethod == 'OPTIONS') return callbackPackager(callback, 200, { success: "OPTIONS request" })

  const formData = event.queryStringParameters
  const searchDate = new Date(formData['date'])

  return getAllObjectsInCollection('signins')
    .then(urlObjects => {
      let objectsOnDate = []

      urlObjects.forEach(urlObject => {
        const date = new Date(new Date(urlObject.ts / 1000).toUTCString())
        if (sameDay(date, searchDate)) { objectsOnDate.push(urlObject) }
      });

      return callbackPackager(callback, 200, objectsOnDate)
    })
    .catch(err => {
      return callbackPackager(callback, 500, { error: err })
    })

}

function sameDay(d1, d2) {
  return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate();
}