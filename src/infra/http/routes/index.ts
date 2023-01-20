import { Router } from 'express'

import { UserRoutes } from '@/modules/users/infra/http/routes/users.routes'

export const Routes = Router()

Routes.use('/users', UserRoutes)
