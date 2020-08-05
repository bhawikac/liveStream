import React from 'react'
import CheckoutForm from "./CheckoutForm";
import {ElementsConsumer} from '@stripe/react-stripe-js';


const CheckOutWrapperForm=(props)=> {
    const {selectedPlanTag,selectedProductTag}= props
    const removeAccessCode=()=>{
        props.removeAccessCode()
    }
         return (
        <ElementsConsumer>
            {({elements, stripe }) => (
                <CheckoutForm elements={elements} stripe={stripe}
                    selectedPlanTag={selectedPlanTag}
                    selectedProductTag={selectedProductTag}
                    removeAccessCode={removeAccessCode}
                    />
            )}
        </ElementsConsumer>
    )
}

export default CheckOutWrapperForm
