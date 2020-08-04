import { create } from 'apisauce'
const userApi = create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    // Accept: 'application/json',
    headers: {
         'content-type': 'application/json',
         'Cache-Control' : 'no-cache'
    }
});


userApi.addRequestTransform(request => {
   
        request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        request.headers['TenantId']=window.localStorage.getItem('clientId');
   
})
export default userApi;