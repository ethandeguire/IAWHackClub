const faunadb = require('faunadb') // Import faunaDB sdk

// configure faunaDB Client with our secret
const q = faunadb.query
const client = new faunadb.Client({ secret: 'fnADXpb-QnACBfoty2igP6pY5A6ka5GcYJpML2Lu' })

const collections = ["signins"]
let errors = []

collections.forEach(collection => {
  console.log("*** Creating collection", collection)
  client.query(q.CreateCollection({ name: collection }))
    .then((result) => {
      // console.log("***RESULT:", result)
      createCollectionIndex(collection)
    })
    .catch((err) => {
      // console.log("***ERR:", err)
      if (err.message !== 'instance already exists') errors.push({ name: error.name, message: error.message })
      else createCollectionIndex(collection)
        .then((result) => {
          console.log("***RESULT:", result)
        })
        .catch((err) => {
          if (err.message !== 'instance already exists') errors.push({ name: error.name, message: error.message })
        })
    })
});

const createCollectionIndex = (collection) => {
  console.log("---Creating Index for", collection)
  return client.query(q.CreateIndex({ name: `all_${collection}`, source: q.Collection(collection) }))

}

if (errors.length != 0) {
  console.log(`Error(s) in create-collection.js: ${errors}`)
  throw new Error(`Error(s) in create-collection.js: ${errors}`)
} else {
  console.log(`collections exist:'${[collections]}'`)
}

