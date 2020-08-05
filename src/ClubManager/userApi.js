import { create } from 'apisauce'

import environment from './config'

const userApi = create({
  baseURL: environment.BASE_URL,
  // Accept: 'application/json',
  headers: {
    'content-type': 'application/json',
    'Cache-Control': 'no-cache'
  }
})

userApi.addRequestTransform(request => {
  request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  request.headers['TenantId'] = window.localStorage.getItem('clientId')
})

export default userApi
