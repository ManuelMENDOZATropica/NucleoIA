import mongoose from 'mongoose'

const licenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['software', 'api', 'modelo', 'otro'],
    default: 'software'
  },
  owner: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    default: 1
  },
  expiresAt: {
    type: Date,
    required: true
  },
  notes: String,
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
})

licenseSchema.set('toJSON', { virtuals: true })
licenseSchema.set('toObject', { virtuals: true })

licenseSchema.virtual('isExpiringSoon').get(function () {
  if (!this.expiresAt) return false
  const now = new Date()
  const threshold = new Date(now.setDate(now.getDate() + 30))
  return this.expiresAt <= threshold
})

export default mongoose.models.License || mongoose.model('License', licenseSchema)
