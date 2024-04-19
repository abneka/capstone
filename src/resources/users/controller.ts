import { Request, Response, NextFunction } from 'express'
import { User } from './model'
import sendEmail from '../../utils/sendEmail'
import checkPasswordStrength from '../../utils/passwordStrength'
import appError from '../../utils/appError'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Get all users
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

// Sign up a user
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const passwordStrength = checkPasswordStrength(password)
    if (!email || !password) {
      res.status(400).json({
        message: 'Email and password are required',
      })
      return next(new appError(400, 'Email and password are required'))
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json({
        message: 'User with this email already exists',
      })
      return next(new appError(400, 'User with this email already exists'))
    }
    if (!passwordStrength) {
      res.status(400).json({
        message:
          'Password is weak, please use a stronger password containing uppercase, lowercase, number and special character.',
      })
      return next(
        new appError(
          400,
          'Password is weak, please use a stronger password containing uppercase, lowercase, number and special character.',
        ),
      )
    }
    const user = new User(req.body)
    const OTP = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    user.OTP = OTP
    user.dateCreated = new Date()
    user.activated = false
    user.role = 'user'
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    user.password = await bcrypt.hash(password, salt)
    await user.save().then((user) => {
      sendEmail(user.email, 'OTP for Radiovision', `Your OTP is ${OTP}`)
    })
    res.status(201).json({
      message: 'User created successfully',
    })
  } catch (error) {
    res.status(400).json({
      message: 'Server Error, Please try again later.',
    })
    next(error)
  }
}

const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({
        message: 'User not found',
      })
      return next(new appError(400, 'User not found'))
    }
    const OTP = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    user.OTP = OTP
    await user.save().then((user) => {
      sendEmail(user.email, 'OTP for Radiovision', `Your OTP is ${OTP}`)
    })
    res.status(200).json({
      message: 'OTP sent successfully',
    })
  } catch (error) {
    res.status(400).json({
      message: 'Server Error, Please try again later.',
    })
    next(error)
  }
}

// Login a user
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      res.status(400).json({
        message: 'Email and password are required',
      })
      return next(new appError(400, 'Email and password are required'))
    }
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
      return next(new appError(400, 'User not found'))
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({
        message: 'Invalid credentials',
      })
      return next(new appError(400, 'Invalid credentials'))
    }
    if (!user.activated) {
      res.status(403).json({
        message: 'User not activated, please check your email for OTP and activate your account.',
      })
      return next(new appError(400, 'User not activated'))
    }
    const payload = {
      user: {
        id: user.id,
      },
    }
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err
      res.status(200).json({
        message: 'User logged in successfully',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        },
      })
    })
  } catch (error) {
    res.status(400).json({
      message: 'Server Error, Please try again later.',
    })
    next(error)
  }
}
export default {
  getAll,
  signUp,
  sendOTP,
  login,
}
