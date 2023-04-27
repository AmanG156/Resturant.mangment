import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Sidebar from "../Sidebar/Sidebar";
import Food1 from "../../asset/Food1.png";
import { itemListService } from "../../services/itemList.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ItemList.css";

export default function ItemList() {
  const [itemList, setItemList] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [modalData, setModalData] = useState({
    itemName: "",
    categoryId: "",
    price: "",
    details: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const categoryData = useSelector(
    (state) => state.categoryListReducer.categoryList
  );
  console.log(categoryData, "reduxData");
  const handleChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    itemListService
      .getItemList()
      .then((res) => {
        console.log(res.data.data);
        setItemList(res.data.data);
      })
      .catch((err) => err);
  }, [count]);

  const handleDelete = (id) => {
    itemListService
      .deleteItemList(id)
      .then((res) => {
        setCount(count + 1);
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
      })
      .catch((err) => err);
  };

  const handleSave = () => {
    console.log(modalData);
    let formData = new FormData();
    formData.append("itemName", modalData.itemName);
    formData.append("price", modalData.price);
    formData.append("details", modalData.details);
    formData.append("categoryId", modalData.categoryId);
    formData.append("image", file);
    itemListService
    .addItemList(formData)
    .then((res) => {
      setCount(count + 1);
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
    })
    .catch((err) => err);
    
  };

  return (
    <div className="Layout">
      <Sidebar />
      <ToastContainer />
      <div className="Main_div">
        <div className="ItemList_heading">
          <div className="ItemList_name">Item Categories</div>
          <div className="ItemList_filter">
            <button className="ItemList_button" onClick={handleShow}>
              Add{" "}
            </button>
          </div>
        </div>
        {itemList &&
          itemList.map((item) => {
            return (
              <div className="ItemList_Content">
                <div className="Food_div">
                  <div className="Food1_img">
                    <img src={item?.itemImage} alt="No_Img" className="main_img" width="100%" height="100%"/>
                  </div>
                  <div className="ItemList_dish_name">{item.itemName}</div>
                </div>

                <div className="ItemList_Icon">
                  <div>₹ {item.price}</div>

                  <div>
                    {" "}
                    <button
                      className="btn_icon"
                      onClick={() => {
                        handleDelete(item?._id);
                      }}
                    >
                      {<RiDeleteBinLine />}
                    </button>{" "}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email</Form.Label> */}

              {/* <Form.Control
                style={{ height: "50px" }}
                type="email"
                placeholder="Email"
                autoFocus
                name="email"
                value={modalData.email}
                onChange={handleChange}
              /> */}
              <select
                style={{ height: "50px", width: "465px" }}
                value={modalData.categoryId}
                name="categoryId"
                onChange={handleChange}
              >
                {/* <option value="">Select category</option> */}
                {console.log("categoryData",categoryData)}
                {categoryData && categoryData.map((item) => {
                  return (
                    <option value={item?._id}>{item?.name}</option>
                  )
                })}
                {/* <option value="63d9fe72d9a6a846fda9b6d6">South Indian</option>
                <option value="63d9fe72d9a6a846fda9b6d6">North Indian</option> */}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Create Password</Form.Label> */}
              <Form.Control
                type="text"
                style={{ height: "50px" }}
                placeholder="Add Product Name"
                autoFocus
                name="itemName"
                value={modalData.itemName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Create Password</Form.Label> */}
              <Form.Control
                type="file"
                style={{ height: "50px" }}
                placeholder="Select Image"
                autoFocus
                name="image"
                // value={}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Create Password</Form.Label> */}
              <Form.Control
                type="text"
                style={{ height: "50px" }}
                placeholder="Price"
                autoFocus
                name="price"
                value={modalData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Create Password</Form.Label> */}
              <Form.Control
                type="text"
                style={{ height: "50px" }}
                placeholder="Add Details"
                autoFocus
                name="details"
                value={modalData.details}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}
