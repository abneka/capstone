import { Request, Response, NextFunction } from 'express'
import { Book } from './model'

// Get all book
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.find()
    res.status(200).json(book)
  } catch (error) {
    next(error)
  }
}

// Get a book
const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.id)
    res.status(200).json(book)
    } catch (error) {
    next(error)
  }
}

// Create a book
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body)
    res.status(201).json(book)
  } catch (error) {
    next(error)
  }
}

// Update a book
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params)
    res.status(200).json(book)
    } catch (error) {
    next(error)
  }
}

// Delete a book
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    res.status(200).json(book)
  } catch (error) {
    next(error)
  }
}


export default {
  getAll,
  getBook,
  createBook,
  updateBook,
  deleteBook
}
