import { Router } from 'express'
import { authorizeRoles, ensureAuthenticated } from '../middleware/auth.js'
import {
  listTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial
} from '../controllers/tutorial.controller.js'

const router = Router()

router.get('/', ensureAuthenticated, listTutorials)
router.post('/', ensureAuthenticated, authorizeRoles('admin', 'editor'), createTutorial)
router.put('/:id', ensureAuthenticated, authorizeRoles('admin', 'editor'), updateTutorial)
router.delete('/:id', ensureAuthenticated, authorizeRoles('admin'), deleteTutorial)

export default router
