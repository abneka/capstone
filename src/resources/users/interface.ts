import { Document } from 'mongoose'

// Define the User Model Interface
export interface UserInterface extends Document {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  dateCreated: Date
  activated: boolean
  role: string
  profilePicture: string
  OTP: number
}
