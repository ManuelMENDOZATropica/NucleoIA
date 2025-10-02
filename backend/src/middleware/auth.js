import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

const allowedDomain = 'tropica.me'
const defaultSuperUsers = ['manuel@tropica.me']


export function configureGoogleStrategy () {
  const clientID = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const callbackURL = process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'

  if (!clientID || !clientSecret) {
    console.warn('⚠️  Google OAuth credentials are not configured. Auth routes will be disabled.')
    return
  }

  const superUsers = (process.env.SUPER_USERS || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)
  const mergedSuperUsers = new Set([...defaultSuperUsers, ...superUsers])

  passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL
  }, (accessToken, refreshToken, profile, done) => {
    const domain = profile._json?.hd
    if (domain !== allowedDomain) {
      return done(null, false, { message: 'Correo no autorizado' })
    }
    const email = profile.emails?.[0]?.value
    const isSuperUser = email && mergedSuperUsers.has(email.toLowerCase())

    const user = {
      id: profile.id,
      email,
      name: profile.displayName,
      avatar: profile.photos?.[0]?.value,
      role: isSuperUser ? 'admin' : 'viewer'

    }

    return done(null, user)
  }))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })
}

export function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ message: 'No autenticado' })
}

export function authorizeRoles (...allowedRoles) {
  return function (req, res, next) {
    const role = req.user?.role
    if (!role) {
      return res.status(403).json({ message: 'Acceso denegado' })
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Rol sin privilegios suficientes' })
    }

    return next()
  }
}
