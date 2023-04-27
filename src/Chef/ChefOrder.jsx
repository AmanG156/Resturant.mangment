import React, {useState, useEffect} from "react";
// import "./UpdateOrder.css";
import Icon from "../asset/Icon.png";
import Food1 from "../asset/Food1.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import { orderService } from "../services/order.services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChefOrder() {
  const location = useLocation();
  const orderDetail = location.state?.categoryItemId;
  const orderId = location.state?._id;
  const orderStatus = location.state;

  console.log("props", orderStatus);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleChange = () => {

  }
  const handleStatus = (status) => {
    const data = {status:status}
    orderService
    .updateStatus(data, orderId)
    .then((res) => {
      // alert(res?.data?.message);
      toast.success(res?.data?.message, 
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
        );  
        handleClose();
    })
    .catch((err) => err);
  }
  return (
    <div className="UpdateOrder_Layout">
      <ToastContainer />
      <div className="UpdateOrder_Whitediv">
        <div className="UpdateOrder_Icon">
          <img src={Icon} alt="No_img" style={{ width: "130px" }} />
        </div>

        <div className="UpdateOrder_heading">
          <div className="chef_top1">
          <h3>Table NO: 01</h3>
          <Button
            style={{ backgroundColor: "#C35F35", border: "none" }}
            className="btn-box"
            variant="secondary"
            onClick={handleShow}
            disabled={orderStatus.status === "Canceled"   ? true : orderStatus.status === "Unpaid"   ? true : false}
          >
            UPDATE
          </Button>
        </div>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           <div className="btn_div1">
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email</Form.Label> */}
              <Button
            style={{ backgroundColor: "#C35F35", border: "none" }}
            className="btn-box"
            variant="secondary"
            onClick={() => {handleStatus("Paid")}}
          >
            Paid
          </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Create Password</Form.Label> */}
              <Button
            style={{ backgroundColor: "#F99D14", border: "none" }}
            className="btn-box"
            // variant="warning"
            onClick={() => {handleStatus("Preparing")}}
          >
            Prepare
          </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Create Password</Form.Label> */}
              <Button
            style={{ backgroundColor: "#2BA02B", border: "none" }}
            className="btn-box"
            variant="success"
            onClick={() => {handleStatus("Delivered")}}
            
          >
            Delivered
          </Button>
            </Form.Group>
           </div>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            variant="secondary"
            style={{ backgroundColor: "#C35F35", marginRight: "200px" }}
            onClick={() => {
              handleClose();
              handleSave();
            }}
          >
            Submit
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}
