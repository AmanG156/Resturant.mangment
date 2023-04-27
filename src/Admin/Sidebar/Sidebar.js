import React from 'react'
import {  NavLink } from 'react-router-dom';
import Icon from '../../asset/Icon.png'
import "./Sidebar.css"

export default function Sidebar() {
  return (
    
    <div>
              <div className="sidebar">
            <img src={Icon} alt="HeaderLogo" className='img_width' />
            <div className='Sidebar_heading'>
            <NavLink className="fs-6 fw-bold" to="/admin/dashboard"
            >Dashboard </NavLink>
            <NavLink className='fs-6 fw-bold' to="/admin/settables"
                >Set Tables</NavLink>
               <NavLink className='fs-6 fw-bold' to="/admin/transactions"
                >Transactions</NavLink>  
               <NavLink className='fs-6 fw-bold' to="/admin/itemCategories"
                >Item Categories</NavLink>  
               <NavLink to="/admin/itemList" className='fs-6 fw-bold' 
                >Item List</NavLink>
                 <NavLink className='fs-6 fw-bold' to="/admin/addchef"
                >Create Chef</NavLink>  
  </div>
        </div>
    </div>
  )
}