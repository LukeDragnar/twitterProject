import { Request, Response } from 'express'
import User from '~/models/Schemas/User.schema'
import databaseService from '~/services/database.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.request'
import usersService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'test@gmail.com' && password === '12345') {
    res.json({
      data: [
        { name: 'nghia', yob: 2003 },
        { name: 'luke', yob: 2003 },
        { name: 'duc', yob: 2003 }
      ]
    })
  }
  return res.status(400).json({
    error: 'Login Failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {

  try {
    const result = await usersService.register(req.body)
    res.json({
      message: 'register Success',
      result
    })
  } catch (error) {
    res.status(400).json({
      message: 'register failed',
      error
    })
  }
}
