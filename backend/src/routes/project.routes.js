import { Router } from 'express'
import { authorizeRoles, ensureAuthenticated } from '../middleware/auth.js'
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js'

const router = Router()

router.get('/', ensureAuthenticated, listProjects)
router.post('/', ensureAuthenticated, authorizeRoles('admin', 'editor'), createProject)
router.put('/:id', ensureAuthenticated, authorizeRoles('admin', 'editor'), updateProject)
router.delete('/:id', ensureAuthenticated, authorizeRoles('admin'), deleteProject)

export default router
