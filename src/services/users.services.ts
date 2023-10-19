import { signToken } from './../utils/jwt';
import { TokenType } from './../constants/enums';
import User from '~/models/Schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/User.request'
import { hashPassword } from '~/utils/crypto'
import { config } from 'dotenv';
config()
class UsersService {
  private  signAccessToken(user_Id: string) {
    return  signToken({
        payload: { user_Id, token_type: TokenType.AccessToken },
        options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
}
private  signRefreshToken(user_Id: string) {
    return  signToken({
        payload: { user_Id, token_type: TokenType.RefreshToken },
        options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
}
  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth:new Date(payload.date_of_birth),
        password: hashPassword(payload.password),
      })
    )
    //lấy user_id từ account vừa tạo
    const user_Id = result.insertedId.toString()
    //từ user id tạo ra 1 access token và 1 refresh token
    const [access_token, refresh_token] = await Promise.all([this.signAccessToken(user_Id), this.signRefreshToken(user_Id)])
    return {access_token, refresh_token}
  }
  async checkEmailExist(email: string) {
    //vào DB và tìm user có email này
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}
const usersService = new UsersService()
export default usersService
