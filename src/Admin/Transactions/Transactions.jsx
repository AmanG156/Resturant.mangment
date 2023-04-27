import React, { useEffect, useState } from "react";
import "./Transactions.css";
// import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { TransactionList } from "../../services/Transaction.service";
import Pagination from "react-js-pagination";

export default function Transactions() {
  const [transaction, setTransaction] = useState([]);
  const [transactiontotal,setTransactiontotal] = useState([])
  const [pagination, setPagination] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    TransactionList.getTransactionList(pagination - 1, fromDate, endDate).then((res) => {
      
      setTransaction(res?.data?.data);
      let t = 0;
      res?.data?.data.forEach(v => {
        console.log("price",v.amount)
        if(typeof(v.amount)=="number"){
          t += Number(v.amount)
        }
  
        
      });
      
      setTransactiontotal(t)
      setTotalCount(res.data?.totalCount);
    });

   
  }, [pagination,fromDate, endDate]);
  
  return (
    <div className="Layout">
      <Sidebar />

      <div className="Main_div">
        <div className="Transctions_heading">
          <div className="transcation_name">Transactions</div>
          <div className='Transctions_filter'>
          Start: <input type="date" className='Start_bar' placeholder='30-01-2023' onChange={(e)=>{setFromDate(e.target.value)}} />
    End: <input type="date" className='End_bar' placeholder='30-01-2023' onChange={(e)=>{setEndDate(e.target.value)}}/>
    </div>
        </div>
        
        {transaction.map((item, index) => {
          return (
            <div className="Transctions_Content">
              <div className="dish_name">{item?.orderId}</div>
              <div className="transction_date">
                {/* Date: 30-01-2023 */}
                {new Date(item.updatedAt).toLocaleString()}
              </div>
              <div className="Transction_Price">₹ {item.amount}</div>
            </div>
          );
        })}

        <div className="Transction_footer">
          <div className="Transction_total">Total : {transactiontotal}</div>
        </div>
        <Pagination
          activePage={pagination}
          itemsCountPerPage={10}
          totalItemsCount={totalCount}
          pageRangeDisplayed={Math.ceil(totalCount / 10)}
          itemClass="page-item"
          linkClass="page-link"
          onChange={(e) => {
            setPagination(e);
          }}
        />
      </div>
    </div>
  );
}
