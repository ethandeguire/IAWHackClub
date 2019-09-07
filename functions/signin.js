// import my functions
const helpers = require('./tools/helpers')
const callbackPackager = helpers.callbackPackager
const createDocument = helpers.createDocument

// export our lambda function as named "handler" export
exports.handler = (event, context, callback) => {

  // check if this is a preflight request, if it is, return 200
  if (event.httpMethod == 'OPTIONS') return callbackPackager(callback, 200, { success: "OPTIONS request" })

  const formData = event.queryStringParameters
  console.log(formData['firstname'], formData['lastname'])

  const dbObject = {
    firstname: formData['firstname'],
    lastname: formData['lastname'],
    date: new Date()
  }

  return createDocument('signins', {
    data: {
      firstname: formData['firstname'],
      lastname: formData['lastname'],
      datetime: new Date().toDateString()
    }
  })
    .then(result => {
      if (result['error']) throw new Error(result['error'])
      else return callbackPackager(callback, 200, { success: true, result: result })
    })
    .catch(err => {
      return callbackPackager(callback, 500, { error: err })
    })

}