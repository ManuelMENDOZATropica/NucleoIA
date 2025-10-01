import mongoose from 'mongoose'

let isConnected = false

export async function connectDatabase () {
  if (isConnected) return mongoose.connection

  const uri = process.env.MONGO_URI

  if (!uri) {
    console.warn('⚠️  MONGO_URI is not defined. Database connection skipped.')
    return null
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    })
    isConnected = true
    console.log('✅ Connected to MongoDB')
    return mongoose.connection
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB', error)
    throw error
  }
}
