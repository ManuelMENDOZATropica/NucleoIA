import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  summary: String,
  owner: String,
  repositoryUrl: String,
  status: {
    type: String,
    enum: ['idea', 'en-progreso', 'pilot', 'produccion'],
    default: 'idea'
  },
  tags: {
    type: [String],
    default: []
  },
  lastUpdatedBy: String
}, {
  timestamps: true
})

export default mongoose.models.Project || mongoose.model('Project', projectSchema)
