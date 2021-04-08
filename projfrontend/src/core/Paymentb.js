import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { getmeToken, processPayment } from './helper/paymentbhelper';
import {createOrder} from "./helper/orderHelper"
import DropIn from 'braintree-web-drop-in-react';
import { isAuthenticated } from '../auth/helper';


const Paymentb = ({products, setReload = f => f, reload = undefined}) =>{

    const[info,setInfo]  = useState({
        loading : false,
        success : false,
        clientToken : null,
        error : "",
        instance:{}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            
            if(info.error){
                setInfo({...info, error: info.error})
            }
            else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }
    const showbtdropin = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ?(
                    <div>
                        <DropIn 
                        options={{authorization: info.clientToken}}
                        onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-success btn-block" onClick={onPurchase}>Buy</button>
                    </div>
                ) :(<h3>please login or add something to cart</h3>)}
            </div>
        )
    }
    useEffect(() => {
        getToken(userId,token)
    },[])


    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce : nonce,
                amount:getAmount()
            }
            processPayment(userId,token,paymentData)
            .then(response => {
                setInfo({...info, success: info.success,loading:false})
                console.log("success")
                const orderData = {
                    products : products,
                    transaction_id : response.transaction_id,
                    amount: response.transaction.amount
                }
                createOrder(userId,token,orderData)
                cartEmpty(() =>{
                    console.log("Did we got a crash?")
                })
                
                setReload(!reload)
            })
            .catch(error => {
                setInfo({loading:false,success:false})
                console.log("failed")
            })
        })
    }
    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount
    }

    return(
        <div><h3>Your bill is {getAmount()}</h3>
        {showbtdropin()}</div>
    )
}

export default Paymentb