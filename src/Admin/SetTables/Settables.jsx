import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dinning from "../../asset/Dinning.png";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { SetTableList } from "../../services/SetTable.service";
import "./Settables.css";
export default function SetTables() {
  const [tableCount, SetTableCount] = useState([]);
  const [count, setCount] = useState(0);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    SetTableList.getSetTableList().then((res) => {
      SetTableCount(res?.data?.data?.tableCount);
      setCount(res?.data?.data?.tableCount);
      let arr = [];
      for (let i = 0; i < res?.data?.data?.tableCount; i++) {
        arr.push(i);
      }
      SetTableCount(arr);
    });
  }, [bool]);

  const updateCount = (count) => {
    setCount(count);
    SetTableList.updateTableList(count)
      .then((res) => {
        if (res.data.success === true) {
          setBool(!bool);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="Layout">
      <Sidebar />
      <div className="table_div">
        <div className="table_heading_div">
          <div className="Settable_heading">
            <span> Set Tables</span>

            <div className="table_increment">
              <span className="table_plus">
                <button
                  onClick={() => {
                    updateCount(count - 1);
                  }}
                >
                  <AiOutlineMinus />
                </button>
              </span>
              <input
                type="text"
                placeholder="0"
                value={count}
                className="incre_field"
                onChange={(e) => {
                  updateCount(e.target.value);
                }}
              />
              <span className="table_minus">
                <button
                  onClick={() => {
                    updateCount(count + 1);
                  }}
                >
                  <BsPlusLg />
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="table_grid">
          {tableCount.map((item, index) => {
            return (
              <div className="Table_box">
                <div className="number"> {index + 1} </div>
                <img src={Dinning} alt="No_img" className="dinning_img" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
    // </div>
  );
}
