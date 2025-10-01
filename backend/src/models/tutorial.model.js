import mongoose from 'mongoose'

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  format: {
    type: String,
    enum: ['pdf', 'video', 'documento', 'presentacion', 'enlace'],
    default: 'enlace'
  },
  url: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  estimatedDuration: String,
  createdBy: String
}, {
  timestamps: true
})

export default mongoose.models.Tutorial || mongoose.model('Tutorial', tutorialSchema)
