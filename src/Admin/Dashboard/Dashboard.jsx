import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Table from "../../asset/Table.png";
import "./Dashboard.css";
import { orderService } from "../../services/order.services";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    console.log(pagination);
    orderService
      .getOrderList(pagination)
      .then((res) => {
        console.log(res.data.data);
        setOrderList(res.data.data1);
        setTotalCount(res.data?.totalCount);
      })
      .catch((err) => err);
  }, [pagination]);

  const handleClick = (data) => {
    console.log(data);
    navigate("/admin/updateOrder", {
      state: data,
    });
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  console.log(orderList);
  return (
    <div className="layout">
      <Sidebar />

      <div className="Dashboard_heading">
        <div className="dash_top">
          <h3>Table NO: 01</h3>
          <Button
            style={{ backgroundColor: "#C35F35", border: "none" }}
            className="btn-box"
            variant="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div className="Main_div">
          {orderList &&
            orderList.map((item) => {
              return (
                <div
                  className="content_div"
                  role="button"
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  <div className="Table_icon">
                    <img src={Table} alt="No_image" className="Table_img" />
                  </div>
                  <div className="Table_No"> Table No {item.tableNumber} </div>
                  <div className="Table_menu">Pasta/Maggi</div>
                  <div className="menu_price">₹ {item.amount}</div>
                  <div
                    className="dilevery_confirm"
                    style={{
                      background:
                        item.status === "Delivered" ? "#1A9C1A" : item.status === "Preparing"? "#F99D14" :'#C35F35',
                    }}
                  >
                    <span className="dilvery">{item.status}</span>
                  </div>
                </div>
              );
            })}
        </div>
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
  );
}
