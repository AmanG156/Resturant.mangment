import React, { useEffect, useState } from 'react'
import './menupage.css'
import rectTop from "../assets/rectTop.png"
import logo from "../assets/logo.png"
import item from "../assets/item.png"
import { useNavigate } from "react-router-dom";
import { UserMenuList } from '../services/User.services'

export const MenuPage = () => {
  const [category, setCategory] = useState([])
  const [cart,setCart]= useState([])
  const [menu, setMenu] = useState([])
  const [checklist, setChecklist] = useState([])
  const [userCheck,setUserCheck]= useState([])
  const [selected, setSelected] = useState([])
  const [data, setData] = useState([])
  const [active, setActive] = useState("")
  const navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault()
    console.log(e)
    // setCart({ ...cart, [e.target.name]: e.target.value });
      // navigate('/views/myOrder')`
  }
  useEffect(()=>{
    UserMenuList.getCategoryList().then(res=>{
      setCategory(res?.data?.data)
      // setCheck(res?.data?.data[0]._id)
      // handleMenuList(res?.data?.data[0]._id, 0)
    })
    localStorage.removeItem("cart")
  },[])

  useEffect(()=>{
    UserMenuList
    .getMenuListByCategory()
    .then(res=>{
      console.log("ress", res.data.data)
      setMenu(res.data.data)
    })
    .catch((err) => err)
  }, [])

  const handleMenuList=(id, index)=>{
    console.log("response", id);
    UserMenuList.getMenuListByCategory().then(res=>{
      setActive(index)
      console.log( res.data.data, id);
      let filterMenu = res.data.data.filter(item=>{return item.categoryId===id})
      let arr = []
      filterMenu.forEach(item=>{
       arr.push(item._id)
      })
      setChecklist(arr)
      setMenu(filterMenu)
    }).catch(err=>{
      console.log("error", err);
    })
  }

  const handleCheckbox=(e,val)=>{
    // console.log( "&777777777777777777",val)
    if(e.target.checked)
    {
     
      setUserCheck(
      [...userCheck,val._id]
      )
      setData(
        [...data,val]
        )
    }
    else{
      setUserCheck(pre=>{
        return pre.filter(v=>(v!==val._id))
      })

      setData(pre=>{
        return pre.filter(v=>(v._id!==val._id))
      })
    }

    
    // let data1= checklist.filter(item=>{
    //   // if(item==id) {
    //   //   return id
    //   // }else{

    //   // }
    //  })
    // console.log("data1", data1);
    
  }
  
  console.log(data,"userCheck")
  const handleAddToCart= ()=>{
    let cart = JSON.parse(localStorage.getItem("cart"))
    if(!cart){
      cart=[]
    }
    cart = [...cart,...data]
    cart = JSON.stringify(cart)
    localStorage.setItem("cart",cart)
   setTimeout(()=>{
    navigate('/views/myOrder')
   },1000)
  }

  return (
   <>
   
    <div className='menu_img'>
    <img className='menu_logo' src={logo} alt="" />
    <h1 className='heading_title' style={{color:'white'}}>delicious food all over the world</h1>
    <img className='menu_img_top' src={rectTop}  alt=''/>

    {/* </img> */}
    </div>
    <div className='menu_t2'>
       <h1 className='inner_heading'>Main Dishes</h1>
       <div className='menu_btn'>
      {category.map((item,index)=>{
        return <button className='menu_inner_btn' style={{backgroundColor:`${index===active?"#C35F35":""}`}} key={index} onClick={()=>{handleMenuList(item._id, index)}} >{item.name}</button>
      })}  
       
       </div>
       <form onSubmit={(e)=>handle(e)}>
      <div className='menu_list'>
      {menu.map(items=>{
        return  <div className='menu-item'>
        <div className='img_div_menu-item'>
          {console.log("image",`${process.env.REACT_APP_API_IMG}${items?.itemImage}`)}
        {/* `${process.env.REACT_APP_API_KEY}/itemImage` */}
        {/* `${process.env.REACT_APP_API_IMG}/itemImage` */}
        {/* "http://localhost:8080/uploads/image_1675343382223.png" */}
        <img src={items?.itemImage} alt="" width="100%" height="100%"/>
        </div>
         <div className='img_div_menu-item2'>
             <h3>{items.itemName}</h3>
             <p>{items.details}</p>
             <p>₹ {items.price}</p>
         </div>
         <div>
          
          <input type="checkbox"  name={items.itemName} id={items._id} 
          checked={userCheck.includes(items._id)} 
          onChange={(e)=>{handleCheckbox(e,items)}} />
         </div>
     </div>
    
      })}
      </div>
      <div >
      <button type='submit' onClick={()=>handleAddToCart()} disabled={userCheck?.length === 0 ? true:false} className='Add-btn'>Add Item</button>
      </div>
      </form>
    </div>
    <div className='menu_t3'>
    <img className='menu_logo1' src={logo} alt="" />
</div>
   </>
  )
}
