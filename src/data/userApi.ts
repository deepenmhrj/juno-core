import axios, { AxiosResponse } from 'axios'
import { BASE_API_URL } from './api'

interface UserType {
  emailAddress: string
  historyId: string
  messagesTotal: number
  threadsTotal: number
}

interface UserPromise {
  config: any
  method: any
  data: {
    data: UserType
  }
  headers: any
  request: any
  status: number
  statusText: string
}

const userApi = () => ({
  fetchUser: async () => {
    try {
      const res: AxiosResponse<UserPromise> = await axios.get(
        `${BASE_API_URL}/api/user`
      )
      return res
    } catch (err) {
      return console.log(err)
    }
  },
})

export default userApi