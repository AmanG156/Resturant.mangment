import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom"
import { TransactionList } from '../../services/Transaction.service'
import { orderService } from '../../services/order.services'
// import './Cancel.css';

const Cancel = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const [bool, setBool] = useState(false)
    
    useEffect(() => {
        console.log("response",location );
        const payload = {
            // categoryItemId:"categoryItemId",
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("price"),
            status:"Failed"
        }
        // console.log(payload)
        TransactionList.addTransaction(payload).then(res=>{
            setBool(!bool)
        }).catch(err=>{
            console.log("error", err);
        })
    }, [])
    const data = {status:"Canceled"}
    useEffect(() => {
      orderService
      .updateStatus(data, searchParams.get("orderId"))
    }, [bool])

    const handleBack = () => {
        window.history.go(-1)
    }
    return (
        <>
            <h1>Cancel</h1>
            <button className='cancel' onClick={handleBack}>Back to Checkout Page</button>
        </>
    );
}

export default Cancel;
