import { asyncHandler } from '../utils/asyncHandler.js'
import Project from '../models/project.model.js'

export const listProjects = asyncHandler(async (req, res) => {
  const filters = {}
  if (req.query.status) {
    filters.status = req.query.status
  }
  if (req.query.tag) {
    filters.tags = req.query.tag
  }

  const projects = await Project.find(filters).sort({ updatedAt: -1 })
  res.json(projects)
})

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create({
    ...req.body,
    lastUpdatedBy: req.user?.email
  })
  res.status(201).json(project)
})

export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updated = await Project.findByIdAndUpdate(id, {
    ...req.body,
    lastUpdatedBy: req.user?.email
  }, { new: true })

  if (!updated) {
    return res.status(404).json({ message: 'Proyecto no encontrado' })
  }
  res.json(updated)
})

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleted = await Project.findByIdAndDelete(id)
  if (!deleted) {
    return res.status(404).json({ message: 'Proyecto no encontrado' })
  }
  res.status(204).send()
})
