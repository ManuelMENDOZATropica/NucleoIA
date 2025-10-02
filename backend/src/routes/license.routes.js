import { Router } from 'express'
import { authorizeRoles, ensureAuthenticated } from '../middleware/auth.js'
import {
  listLicenses,
  createLicense,
  updateLicense,
  deleteLicense
} from '../controllers/license.controller.js'

const router = Router()

router.get('/', ensureAuthenticated, listLicenses)
router.post('/', ensureAuthenticated, authorizeRoles('admin', 'editor'), createLicense)
router.put('/:id', ensureAuthenticated, authorizeRoles('admin', 'editor'), updateLicense)
router.delete('/:id', ensureAuthenticated, authorizeRoles('admin'), deleteLicense)

export default router
