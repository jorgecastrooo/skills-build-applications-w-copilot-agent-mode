import { Router, type Request, type Response, type NextFunction } from 'express'
import type { Model } from 'mongoose'
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js'

const apiRouter = Router()

function resourceRouter(model: Model<any>) {
  const router = Router()

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean())
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (request, response, next) => {
    try {
      const document = await model.create(request.body)
      response.status(201).json(document)
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', async (request, response, next) => {
    try {
      const document = await model.findById(request.params.id).lean()
      if (!document) {
        response.status(404).json({ error: 'Resource not found' })
        return
      }
      response.json(document)
    } catch (error) {
      next(error)
    }
  })

  router.patch('/:id', async (request, response, next) => {
    try {
      const document = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      })
      if (!document) {
        response.status(404).json({ error: 'Resource not found' })
        return
      }
      response.json(document)
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:id', async (request, response, next) => {
    try {
      const document = await model.findByIdAndDelete(request.params.id)
      if (!document) {
        response.status(404).json({ error: 'Resource not found' })
        return
      }
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  })

  return router
}

apiRouter.get('/leaderboard/rankings', async (_request, response, next) => {
  try {
    const rankings = await LeaderboardEntry.find()
      .sort({ points: -1, updatedAt: 1 })
      .populate('user', 'username displayName')
      .lean()
    response.json(rankings)
  } catch (error) {
    next(error)
  }
})

apiRouter.use('/users', resourceRouter(User))
apiRouter.use('/teams', resourceRouter(Team))
apiRouter.use('/activities', resourceRouter(Activity))
apiRouter.use('/leaderboard', resourceRouter(LeaderboardEntry))
apiRouter.use('/workouts', resourceRouter(Workout))

export function apiErrorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  const mongoError = error as { name?: string; code?: number; message?: string }
  const status = mongoError.name === 'ValidationError' || mongoError.name === 'CastError'
    ? 400
    : mongoError.code === 11000
      ? 409
      : 500

  response.status(status).json({
    error: status === 500 ? 'Internal server error' : mongoError.message,
  })
}

export default apiRouter