// dependencies:
const faunadb = require('faunadb') // Import faunaDB sdk

// configure faunaDB Client with our secret
const q = faunadb.query
const client = new faunadb.Client({ secret: 'fnADXpb-QnACBfoty2igP6pY5A6ka5GcYJpML2Lu' })

// import my functions
const helpers = require('./helpers')
const deleteDocument = helpers.deleteDocument
const getAllObjectsInCollection = helpers.getAllObjectsInCollection

// getAllObjectsInCollection('signins')
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((response) => {
//     console.log(response)
//   })

// client.query(q.Create(q.Collection("signins"),
//   { data: { firstname: "Ethan", lastname: "DeGuire" } }))
//   .then((ret) => console.log(ret))

/* This code deletes every document in the specified collection */
// const collection = 'signins'
// getAllObjectsInCollection(collection)
//   .then(objects => {
//     objects.forEach(object => {
//       deleteDocument(collection, object.ref.id)
//     })
//   })

/* This code deletes every document in all of the specified collections */
// const collections = ['authentications', 'urls', 'webhookhistory']
// collections.forEach(collection => {
//   getAllObjectsInCollection(collection)
//     .then(objects => {
//       objects.forEach(object => {
//         deleteDocument(collection, object.ref.id)
//       })
//     })
// })
