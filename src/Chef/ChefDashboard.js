import React, { useState, useEffect } from "react";
import "./ChefDashboard.css";
import Icon from "../asset/Icon.png";
import Table from "../asset/Table.png";
import { orderService } from "../services/order.services";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Count from "./Count";
import Button from "react-bootstrap/Button";

export default function ChefDashboard() {
  const [orderList, setOrderList] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [bool, setBool] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    orderService
      .getChefOrderList(pagination-1)
      .then((res) => {
        
        setOrderList(res.data.data);
        setTotalCount(res.data?.totalCount)
      })
      .catch((err) => err);
  }, [pagination, bool]);

  const handleClick = (data) => {
    navigate(
      "/chef/updateOrder",
      {
        state: data
      }
    )
  }

  // setInterval(() => {
  //   setBool(!bool);
  // }, 240000);
  

  const active=(index)=>{
    
    let olist = [...orderList]
    olist[index].bgcolor = "red";
    setOrderList(olist)
    
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  
  return (
    <div className="ChefDashboard_Layout"  >
      <div className="ChefDashboard_whitediv">
        <div className="ChefDashboard_Icon">
          <img src={Icon} alt="No_img" style={{ width: "130px" }} />
          <div className="chefdash_top">
          <Button
            style={{ backgroundColor: "#C35F35", border: "none" }}
            className="btn-box"
            variant="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        </div>
       
        <div className="ChefDashboard_Main_div">
          {orderList &&
            orderList.map((item,index) => {
              return (
                <div className="ChefDashboard_content_div" role="button" style={{backgroundColor:item?.bgcolor}} onClick={() => {handleClick(item)}}>
                  <div className="ChefDashboard_Table_icon">
                    <img src={Table} alt="No_image" className="Table_img" />
                  </div>
                  <div className="ChefDashboard_Table_No"> Table No {item.tableNumber} </div>
                  <div className="ChefDashboard_menu">Pasta/</div>
                  <div className="ChefDashboard_menu_price"> ₹ {item.amount}</div>
                  <div style={{}}><Count time={item.updatedAt} status={item.status} active={()=>{active(index)}}/></div>
                  <div className="ChefDashboard_dilevery_cancle" style={{background:item.status === "Delivered" ? "#1A9C1A" : item.status === "Preparing"? "#F99D14" :'#C35F35'}}>
                    <span className="ChefDashboard_dilvery"> {item.status} </span>
                  </div>
                </div>
              );
            })}
        <div className="pagination-background">
          <Pagination
            activePage={pagination}
            itemsCountPerPage={10}
            totalItemsCount={totalCount}
            pageRangeDisplayed={Math.ceil(totalCount/10)}
            itemClass="page-item"
            linkClass="page-link"
            onChange={(e) => {
              setPagination(e);
            }}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
