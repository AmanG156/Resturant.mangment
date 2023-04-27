import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Sidebar from "../Sidebar/Sidebar";
import { getChefList } from '../../action'
import {useDispatch, useSelector} from "react-redux"
import { chefService } from "../../services/chef.services";
import {RiDeleteBinLine} from 'react-icons/ri'
import {BiEdit} from 'react-icons/bi'
import "./CreateChef.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CreateChef = () => {
  const [chefList, setChefList] = useState([]);
  const [count, setCount] = useState(0)
  const [modalData, setModalData] = useState({
    email: "",
    password: "",
  });
  const [modalData1, setModalData1] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show1, setShow1] = useState(false);
  const [Id, setId] = useState("");

  const handleShow1 = (data) => {
    console.log(data);
    setShow1(true);
    setId(data?._id);
    setModalData1({
      email: data.email
    })
  }
  const handleClose1 = () => setShow1(false);
  const counter = useSelector((state) => state.chefListReducer.list)
  console.log(counter,'useSelector');
  const handleChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const handleChange1 = (e) => {
    setModalData1({ ...modalData1, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    chefService
      .getChef()
      .then((res) => {
        console.log(res.data, "response");
        setChefList(res.data?.data);
        dispatch(getChefList(res.data?.data))
        return res;
      })
      .catch((err) => {
        return err;
      });
  }, [dispatch, count]);

  const handleSave = () => {
    console.log(modalData);
    chefService
      .addChef(modalData)
      .then((res) => {
        setCount(count+1)
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
     console.log(modalData1);
     chefService
     .editChef(modalData1, Id)
     .then((res) => {
      setCount(count+1)
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
      chefService
      .deleteChef(id)
      .then((res) => {
        setCount(count+1)
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
      <div className="chef_heading">
        <div className="chef_top">
          <h1>Create Chef</h1>
          <Button
            style={{ backgroundColor: "#C35F35", border: "none" }}
            className="btn-box"
            variant="secondary"
            onClick={handleShow}
          >
            Create Chef
          </Button>
        </div>
        <div className="Main_div">
          {chefList &&
            chefList.map((item, index) => {
              return (
                <div className="content_div1">
                  <div> chef {index+1} </div>
                  <div> {item.email} </div>
                  <div>
                    <h3><button className="btn_icon" onClick={() => {handleShow1(item)}}>{<BiEdit/>}</button> <button className="btn_icon" onClick={() => {handleDelete(item?._id)}}>{<RiDeleteBinLine/>}</button> </h3>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Chef</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                style={{ height: "50px" }}
                type="email"
                placeholder="Email"
                autoFocus
                name="email"
                value={modalData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                style={{ height: "50px" }}
                placeholder="Create Password"
                autoFocus
                name="password"
                value={modalData.password}
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
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Chef</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                style={{ height: "50px" }}
                type="email"
                placeholder="Email"
                autoFocus
                name="email"
                value={modalData1.email}
                onChange={handleChange1}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                style={{ height: "50px" }}
                placeholder="Create Password"
                autoFocus
                name="password"
                value={modalData1.password}
                onChange={handleChange1}
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
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
