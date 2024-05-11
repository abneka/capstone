import { Router } from 'express'
import bookController from './controller'

const router = Router()

// define routes
router.get('/getAll', bookController.getAll)
router.get('/getBook', bookController.getBook)
router.post('/createBook', bookController.createBook)
router.put('/updateBook', bookController.updateBook)
router.delete('/deleteBook', bookController.deleteBook)

export default router
