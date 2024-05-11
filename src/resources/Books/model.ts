import mongoose, { Schema } from 'mongoose'
import { BookInterface } from './interface'

// Book schema
const BookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a book title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add the price']
  },
  published_year: {
    type: Number,
    required: [true, 'Please add the published year']
  }
})

// Create the Book model
export const Book = mongoose.model<BookInterface>('Book', BookSchema)
