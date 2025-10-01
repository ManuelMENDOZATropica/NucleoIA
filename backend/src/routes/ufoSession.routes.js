import { Router } from 'express'
import { authorizeRoles, ensureAuthenticated } from '../middleware/auth.js'
import {
  listSessions,
  createSession,
  updateSession,
  deleteSession
} from '../controllers/ufoSession.controller.js'

const router = Router()

router.get('/', ensureAuthenticated, listSessions)
router.post('/', ensureAuthenticated, authorizeRoles('admin', 'editor'), createSession)
router.put('/:id', ensureAuthenticated, authorizeRoles('admin', 'editor'), updateSession)
router.delete('/:id', ensureAuthenticated, authorizeRoles('admin'), deleteSession)

export default router
