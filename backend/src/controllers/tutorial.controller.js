import { asyncHandler } from '../utils/asyncHandler.js'
import Tutorial from '../models/tutorial.model.js'

export const listTutorials = asyncHandler(async (req, res) => {
  const filters = {}
  if (req.query.tag) {
    filters.tags = req.query.tag
  }

  const tutorials = await Tutorial.find(filters).sort({ createdAt: -1 })
  res.json(tutorials)
})

export const createTutorial = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.create({
    ...req.body,
    createdBy: req.user?.email
  })
  res.status(201).json(tutorial)
})

export const updateTutorial = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updated = await Tutorial.findByIdAndUpdate(id, req.body, { new: true })
  if (!updated) {
    return res.status(404).json({ message: 'Tutorial no encontrado' })
  }
  res.json(updated)
})

export const deleteTutorial = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleted = await Tutorial.findByIdAndDelete(id)
  if (!deleted) {
    return res.status(404).json({ message: 'Tutorial no encontrado' })
  }
  res.status(204).send()
})
