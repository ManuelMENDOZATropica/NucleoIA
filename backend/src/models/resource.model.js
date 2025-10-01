import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['licencia', 'tutorial', 'documento', 'video', 'proyecto', 'otro'],
    default: 'otro'
  },
  link: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  },
  createdBy: {
    type: String,
    required: false
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
})

export default mongoose.models.Resource || mongoose.model('Resource', resourceSchema)
