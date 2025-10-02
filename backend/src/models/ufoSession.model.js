import mongoose from 'mongoose'

const ufoSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  scheduledFor: {
    type: Date,
    required: true
  },
  speakers: {
    type: [String],
    default: []
  },
  recordingUrl: String,
  resourcesUrl: String,
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
})

export default mongoose.models.UFOSession || mongoose.model('UFOSession', ufoSessionSchema)
