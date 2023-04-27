import React from "react";
import "./UpdateOrder.css";
import Icon from "../../asset/Icon.png";
import Food1 from "../../asset/Food1.png";
import { useLocation } from "react-router-dom";

export default function UpdateOrder() {
  const location = useLocation();
  const orderDetail = location.state?.data;
  console.log("props", orderDetail);
  return (
    <div className="UpdateOrder_Layout">
      <div className="UpdateOrder_Whitediv">
        <div className="UpdateOrder_Icon">
          <img src={Icon} alt="No_img" style={{ width: "130px" }} />
        </div>

        <div className="UpdateOrder_heading">
          Table NO: {location.state?.tableNumber}
          <div className="UpdateOrder_Main_div">
            {orderDetail &&
              orderDetail.map((item) => {
                return (
                  <div className="UpdateOrder_div">
                    <div className="Image_name">
                      <div className="UpdateOrder_Table_icon">
                        <img src={Food1} alt="No_image" className="Table_img" />
                      </div>
                      <div className="UpdateOrder_No"> {item.itemName} </div>
                    </div>
                    <p className="UpdateOrder_menu">
                      {item.details}
                    </p>
                    <div className="UpdateOrder_price">₹ {item.price}</div>
                  </div>
                );
              })}
            {/* <div className='UpdateOrder_div'>
      <div className='Image_name'>
      <div className='UpdateOrder_Table_icon'>
       <img src={Food1} alt="No_image" className='Table_img'/>
      </div>
      <div className='UpdateOrder_No'> Pasta</div>
      </div>
      <p className='UpdateOrder_menu'>With Organic Tomato and Mozzerllra</p>
      <div className='UpdateOrder_price'>₹ 50.2</div>
      
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
