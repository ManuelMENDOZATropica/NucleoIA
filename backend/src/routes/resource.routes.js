import { Router } from 'express'
import { authorizeRoles, ensureAuthenticated } from '../middleware/auth.js'
import {
  listResources,
  createResource,
  updateResource,
  deleteResource
} from '../controllers/resource.controller.js'

const router = Router()

router.get('/', ensureAuthenticated, listResources)
router.post('/', ensureAuthenticated, authorizeRoles('admin', 'editor'), createResource)
router.put('/:id', ensureAuthenticated, authorizeRoles('admin', 'editor'), updateResource)
router.delete('/:id', ensureAuthenticated, authorizeRoles('admin'), deleteResource)

export default router
