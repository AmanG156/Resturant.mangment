import React, { useState, useEffect } from "react";
import "./ItemCategories.css";
import Sidebar from "../Sidebar/Sidebar";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { categoryService } from "../../services/category.services";
import { getCategoryLists } from "../../action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Item_Categories() {
  // const [modalData, setModalData] = useState({
  //   email: "",
  //   password: "",
  // });
  const [name, setCategoryName] = useState("");
  const [name1, setCategoryName1] = useState("");
  const [count, setCount] = useState(0);
  const [Id, setId] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show1, setShow1] = useState(false);
  const handleShow1 = (data) => {
    setShow1(true);
    setId(data?._id);
    setCategoryName1(data.name)
  }
  const handleClose1 = () => setShow1(false);
  const dispatch = useDispatch();
  const categoryData = useSelector(
    (state) => state.categoryListReducer.categoryList
  );
  console.log(categoryData, "categoryData");
  // const handleChange = (e) => {
  //   setModalData({ ...modalData, [e.target.name]: e.target.value });
  // };

  useEffect(() => {
    categoryService
      .getCategoryList()
      .then((res) => {
        console.log(res.data.data);
        dispatch(getCategoryLists(res.data?.data));
        // setItemList(res.data.data);
      })
      .catch((err) => err);
  }, [count, dispatch]);

  const handleSave = () => {
    console.log(name);
    const data = { name: name };
    categoryService
      .addCategory(data)
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

  const handleSave1 = () => {
    console.log(name1);
    const data = {name:name1}
    categoryService
    .editCategory(data, Id)
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
  }

  const handleDelete = (id) => {
    categoryService
    .deleteCategory(id)
    .then((res) => {
      setCount(count + 1);
      alert(res?.data?.message);
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
  }
  return (
    <div className="Layout">
      <Sidebar />
      <ToastContainer />
      <div className="Main_div">
        <div className="ItemCategories_heading">
          <div className="ItemCategories_name">Item Categories</div>
          <div className="ItemCategories_filter">
            <button className="ItemCategories_button" onClick={handleShow}>
              Add{" "}
            </button>
          </div>
        </div>
        {categoryData &&
          categoryData.map((item) => {
            return (
              <div className="ItemCategories_Content">
                <div className="ItemCategories_dish_name">{item.name}</div>

                <div className="ItemCategories_Icon">
                  <div>
                    <button className="btn_icon" onClick={() => {handleShow1(item)}}>{<BiEdit/>}</button>
                    </div>
                  <div>
                    <button className="btn_icon" onClick={() => {handleDelete(item?._id)}}>{<RiDeleteBinLine/>}</button>
                  </div>
                </div>
              </div>
            );
          })}
        {/* <div className='ItemCategories_Content'>
   <div className='ItemCategories_dish_name'>
 Indian Food
   </div>
  
   <div className='ItemCategories_Icon'>
   <div>{<BiEdit/>}</div>

    <div>{<RiDeleteBinLine/>}</div>
  </div>
    </div>
   <div className='ItemCategories_Content'>
   <div className='ItemCategories_dish_name'>
 South Indian
   </div>
  
   <div className='ItemCategories_Icon'>
   <div>{<BiEdit/>}</div>
   <div>{<RiDeleteBinLine/>}</div>

   </div>
   
   </div>
   <div className='ItemCategories_Content'>
   <div className='ItemCategories_dish_name'>
Chinese
   </div>
   
   <div className='ItemCategories_Icon'>
   <div>{<BiEdit/>}</div>
   <div>{<RiDeleteBinLine/>}</div>
   </div>
   </div> */}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                style={{ height: "50px" }}
                type="text"
                placeholder="Category Name"
                autoFocus
                name="name"
                value={name}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
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

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                style={{ height: "50px" }}
                type="text"
                placeholder="Category Name"
                autoFocus
                name="name"
                value={name1}
                onChange={(e) => {
                  setCategoryName1(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ backgroundColor: "#C35F35", marginRight: "200px" }}
            onClick={() => {
              handleClose1();
              handleSave1();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
