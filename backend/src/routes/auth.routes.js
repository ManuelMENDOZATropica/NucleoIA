import { Router } from 'express'
import passport from 'passport'

const router = Router()

const isAuthConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

if (isAuthConfigured) {
  router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }))

  router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login?error=oauth'
  }), (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`)
  })
} else {
  router.get('/google', (req, res) => {
    res.status(503).json({ message: 'OAuth no configurado' })
  })
}

router.post('/logout', (req, res) => {
  req.logout?.(() => {
    req.session?.destroy(() => {
      res.status(200).json({ message: 'Sesión finalizada' })
    })
  })
})

router.get('/me', (req, res) => {
  if (req.user) {
    return res.json({ user: req.user })
  }
  return res.status(401).json({ message: 'No autenticado' })
})

export default router
