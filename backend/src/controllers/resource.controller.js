import { asyncHandler } from '../utils/asyncHandler.js'
import Resource from '../models/resource.model.js'

export const listResources = asyncHandler(async (req, res) => {
  const filters = {}
  if (req.query.tag) {
    filters.tags = req.query.tag
  }

  const resources = await Resource.find(filters).sort({ updatedAt: -1 })
  res.json(resources)
})

export const createResource = asyncHandler(async (req, res) => {
  const resource = await Resource.create({
    ...req.body,
    createdBy: req.user?.email
  })

  res.status(201).json(resource)
})

export const updateResource = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updated = await Resource.findByIdAndUpdate(id, req.body, { new: true })
  if (!updated) {
    return res.status(404).json({ message: 'Recurso no encontrado' })
  }
  res.json(updated)
})

export const deleteResource = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleted = await Resource.findByIdAndDelete(id)
  if (!deleted) {
    return res.status(404).json({ message: 'Recurso no encontrado' })
  }
  res.status(204).send()
})
