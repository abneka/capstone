import mongoose, { Schema } from 'mongoose'
import { UserInterface } from './interface'

// User schema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  activated: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }, // if admin disables a user
  role: { type: String, default: 'user' },
  profilePicture: { type: String, default: '' },
  OTP: { type: Number, default: null },
})

// Create the User model
export const User = mongoose.model<UserInterface>('User', UserSchema)
