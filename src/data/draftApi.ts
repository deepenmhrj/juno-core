import axios, { AxiosResponse } from 'axios'
import { BASE_API_URL } from './api'

const draftApi = () => ({
  createDrafts: async (data: any) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/api/create-draft`, data)
      return res
    } catch (err) {
      return console.log(err)
    }
  },

  updateDrafts: async (data: any) => {
    const { draftId } = data
    try {
      const res: AxiosResponse<any> = await axios.put(
        `${BASE_API_URL}/api/update-draft/${draftId}`,
        data
      )
      return res
    } catch (err) {
      return console.log(err)
    }
  },

  getDrafts: async () => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/drafts/`
      )
      return res.data
    } catch (err) {
      return console.log(err)
    }
  },

  getDraftDetail: async (draftId: string) => {
    console.log(draftId)
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/draft/${draftId}`
      )
      return res
    } catch (err) {
      return console.log(err)
    }
  },

  sendDraft: async (data: any) => {
    console.log('data', data)
    try {
      const res: AxiosResponse<any> = await axios.post(
        `${BASE_API_URL}/api/send-draft`,
        data
      )
      return res
    } catch (err) {
      return console.log(err)
    }
  },
})

export default draftApi