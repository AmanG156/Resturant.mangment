import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

import "./MyOrder.css"
// import icon from '../asset/icon.png'
import icon from "../asset/Icon.png"
import food from "../asset/food.png"
import {getTableNoList} from '../services/TableNo.services'
import axios from 'axios'


export default function MyOrder() {
  const [total,setTotal]=useState(0)
const [tableCount,setTableCount]=useState([])
const [tbnumber, setTbnumber] = useState(1)
const [date,setDate]= useState("")

    const handleCheckout=(v)=>{
    const payload = {
    amount:total,
    tableNumber:tbnumber,
    categoryItemId:["63da099684388ecd0315da26"],
    quantity:1
    }
    axios.post(`${process.env.REACT_APP_API_KEY}/v1/order/checkout`, payload)
    .then(res=>{
      console.log("respponse", res.data.data.url);
      if(res.data.data.url){
        window.location.href = res.data.data.url
      }

    })
    
  } 
  
  // `${process.env.REACT_APP_API_KEY}/v1/order/checkout`
    
 
    
 const [payement,setPayment]= useState(null)
  const [cart,setCart] = useState([])



  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("cart"))
    setCart(data)
    let t = 0;
    data.forEach(v=> {
      console.log("price",v.price)
      t +=Number(v.price)
      console.log(t)
    });
    setTotal(t)
  },[])
  const [tableList,SetTableList]=useState([])

  useEffect(()=>{
    console.log(JSON.stringify(SetTableList))
    getTableNoList("/v1/auth/table-count").then(res=>{
      console.log("res?.data?.data", res.data);
      
      console.log(res.data.data)
      let count = res.data.data.tableCount
      let table=[]
      for(let i=0;i<count;i++)
      {
        table.push(i+1)
      }
      setTableCount(table)
      SetTableList(res.data.data.tableCount)
    })
  },[])
  const remove=(item)=>{
  let data= [...cart]
     data= data.filter((v)=>{
      return v._id !== item._id
   })
   let t = 0;
   data.forEach((r) => {
     console.log("price", r.price);
     t += Number(r.price);
   });
   setTotal(t);
   setCart(data)
    localStorage.setItem("cart",JSON.stringify(data))
  }

  return (
   
    <div className='My_order'>
         <div className='container_size'>
    <div className='icon_img'>
      <img src={icon} alt="No_img"/>
    </div>
    <div className='table_no'>
      Table NO: <select name="" id="" className='SelectTable_no' onChange={(e)=>{setTbnumber(parseInt(e.target.value))}}>
     { tableCount.map(v=>{
       return <option value={v}>{v<10 ? `0${v}` : v}</option>
      })}
      </select>
    </div>
   {
    cart.map(val=>(
      <div className='Order_Cart'>
      <div className='checkk'>
      <div >
             <img src={val?.itemImage} className="Food_img" alt="No_img" width="80%" height="70%"/>
         </div>
         <div className='Food_name'>
             <h3 className='food_heading'>{val.itemName}</h3>
             <p className='food_discription'>{val.details}</p>
         </div>
      </div>
         <div className='food_price'>
             <h1 className='price'> ₹{val.price} </h1>
             <p className='Remove' role="button" onClick={()=>remove(val)}>Remove</p>
         </div>
        </div>
    ))
   }
       
       <div className='Food_checkPrice'>
     
      <div role="button" className='checkout' onClick={handleCheckout}>CheckOut</div>
      <div className='food_price'>
        Total : ₹{total}
      </div>
      </div>
    </div>
    <div className='footer'>
        <div>
            <img src={icon} alt="" />
        </div>
    </div>
    </div>
  )
}
