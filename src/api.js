import { create } from 'apisauce'
import { debug } from 'util';

const clientID = process.env.REACT_APP_API_CLIENT_ID;
const clientSecret = process.env.REACT_APP_API_CLIENT_SECRET;

const signature = clientID + ":" + clientSecret;
const base64Signature = btoa(signature);

const Authorization = 'Basic ' + base64Signature;
const URL = process.env.REACT_APP_API_BASE_URL;
////

const api = create({
    
    baseURL: URL,
    // Accept: 'application/json',
    headers: {
        'Authorization': Authorization,
        'content-type': 'application/json',
        'TenantId': window.localStorage.getItem('clientId')
    }
});


api.addRequestTransform(request => {
    if (request.url.indexOf("oauth") == -1 && request.headers["Authorization"]==undefined) {
        request.headers["Authorization"] = Authorization;
    }
    if (request.url.indexOf("oauth") == -1) {
        request.headers["TenantId"] = window.localStorage.getItem('clientId');
        
    }
   
})
export default api;