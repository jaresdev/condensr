import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      require: true,
    },
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    clicked: {
      type: Number,
      require: true,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

urlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Url', urlSchema)
