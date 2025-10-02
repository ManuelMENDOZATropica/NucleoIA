import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'

import { configureGoogleStrategy } from './middleware/auth.js'
import { connectDatabase } from './config/database.js'
import authRoutes from './routes/auth.routes.js'
import resourceRoutes from './routes/resource.routes.js'
import licenseRoutes from './routes/license.routes.js'
import tutorialRoutes from './routes/tutorial.routes.js'
import sessionRoutes from './routes/ufoSession.routes.js'
import projectRoutes from './routes/project.routes.js'
import { notFoundHandler, errorHandler } from './middleware/error.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

await connectDatabase()

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}))
app.use(helmet())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}))

configureGoogleStrategy()
app.use(passport.initialize())
app.use(passport.session())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/licenses', licenseRoutes)
app.use('/api/tutorials', tutorialRoutes)
app.use('/api/ufo-sessions', sessionRoutes)
app.use('/api/projects', projectRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Núcleo IA API listening on port ${PORT}`)
})
