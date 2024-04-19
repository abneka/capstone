import { Router } from 'express'
import userController from './controller'

const router = Router()

// define routes
router.route('/').get(userController.getAll)
router.route('/signup').post(userController.signUp)
router.route('/login').post(userController.login)

export default router
