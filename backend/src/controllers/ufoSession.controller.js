import { asyncHandler } from '../utils/asyncHandler.js'
import UFOSession from '../models/ufoSession.model.js'

export const listSessions = asyncHandler(async (req, res) => {
  const now = new Date()
  const upcoming = req.query.upcoming === 'true'

  const filters = {}
  if (upcoming) {
    filters.scheduledFor = { $gte: now }
  }

  const sessions = await UFOSession.find(filters).sort({ scheduledFor: 1 })
  res.json(sessions)
})

export const createSession = asyncHandler(async (req, res) => {
  const session = await UFOSession.create(req.body)
  res.status(201).json(session)
})

export const updateSession = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updated = await UFOSession.findByIdAndUpdate(id, req.body, { new: true })
  if (!updated) {
    return res.status(404).json({ message: 'Sesión no encontrada' })
  }
  res.json(updated)
})

export const deleteSession = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleted = await UFOSession.findByIdAndDelete(id)
  if (!deleted) {
    return res.status(404).json({ message: 'Sesión no encontrada' })
  }
  res.status(204).send()
})
