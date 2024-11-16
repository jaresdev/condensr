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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

const Url = mongoose.model('Url', urlSchema)

export default Url
