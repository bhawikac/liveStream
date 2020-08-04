import * as actionTypes from './actionTypes'
import api from '../../api'
import * as APIConstants from '../APIConstants';
import userApi from '../../userAPI';

export const sendContactUsMail=(name,email,message)=>{

    var obj={
        email:email,
        name:name,
        message:message,
        clientId:"ConsumerWeb"
    }
    return dispatch=>{
        api.post(APIConstants.sendContactUsMail,obj)
        .then((response)=>{
            if(response.status===200){
             
            }
            else{
              
            }

        })
    }
}