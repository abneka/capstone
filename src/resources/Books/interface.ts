import { Document } from 'mongoose'

// Define the Book Model Interface
export interface BookInterface extends Document {
  id: string
  title: string
  description: string
  price: number
  published_year: number
}
