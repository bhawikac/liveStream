import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utils/updateObject'
import {GetSubdomainData} from "../actions/ClientSettings"


var data1=GetSubdomainData();
const initialState = {
 data:data1
}

const reducer = (state = initialState, action) => {
    var cdata=GetSubdomainData();
    updateObject(state,{ data : cdata })
 return state;
};
export default reducer;