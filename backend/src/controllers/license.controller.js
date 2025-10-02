import { asyncHandler } from '../utils/asyncHandler.js'
import License from '../models/license.model.js'

export const listLicenses = asyncHandler(async (req, res) => {
  const filters = {}
  if (req.query.category) {
    filters.category = req.query.category
  }

  const licenses = await License.find(filters).sort({ expiresAt: 1 })
  res.json(licenses)
})

export const createLicense = asyncHandler(async (req, res) => {
  const license = await License.create(req.body)
  res.status(201).json(license)
})

export const updateLicense = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updated = await License.findByIdAndUpdate(id, req.body, { new: true })
  if (!updated) {
    return res.status(404).json({ message: 'Licencia no encontrada' })
  }
  res.json(updated)
})

export const deleteLicense = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleted = await License.findByIdAndDelete(id)
  if (!deleted) {
    return res.status(404).json({ message: 'Licencia no encontrada' })
  }
  res.status(204).send()
})
