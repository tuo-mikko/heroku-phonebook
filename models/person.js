const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (str) {
        return (
          str.split('-').length - 1 == 1 &&
          (str.charAt(2) == '-' || str.charAt(3) == '-')
        )
      },
      message:
        'Invalid phone number, enter 2 or 3 numbers separated from the rest by a hyphen',
    },
  },
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', noteSchema)
