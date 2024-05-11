import { Router } from 'express'

const router: Router = Router()

// import routes
import bookRouter from '../resources/Books/routes'

// Higher level routes definition
router.use('/book', bookRouter)

export default router
