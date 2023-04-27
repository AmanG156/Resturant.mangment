import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Success.css';
import { useLocation, useSearchParams } from "react-router-dom"
import { TransactionList } from '../../services/Transaction.service'
import { orderService } from '../../services/order.services'


const Success = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const [bool, setBool] = useState(false)
    //  debugger
    const handleBack = () => {
        navigate("/")
    }
    
    useEffect(() => {
        console.log("response",location );
        const payload = {
            // categoryItemId:"categoryItemId",
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("price"),
            status:"Success"
        }
        // console.log(payload)
        TransactionList.addTransaction(payload).then(res=>{
            setBool(!bool)
        }).catch(err=>{
            console.log("error", err);
        })
    }, [])
    const data = {status:"Paid"}
    useEffect(() => {
      orderService
      .updateStatus(data, searchParams.get("orderId"))
    }, [bool])
    

    return (
        <>
            <img
                src="https://png.pngtree.com/png-vector/20191104/ourmid/pngtree-checkmark-icon-green-color-png-image_1952984.jpg"
                alt="succes tick mark"
                className="product_img"
            />
            <h1>Payment done Successfully</h1>
            <button className="success" onClick={handleBack}>Back to Dashboard</button>
        </>
    );
}

export default Success;