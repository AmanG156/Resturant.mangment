import axios from "axios";
var token = JSON.parse(localStorage.getItem("token") || "{}");

export const categoryService = {
    addCategory,
    getCategoryList,
    deleteCategory,
    editCategory
}

function addCategory(data) {
    var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/v1/category/add`,
        data: data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function getCategoryList() {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/category/list`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function editCategory(data, id) {
    var config = {
        method: "patch",
        url: `${process.env.REACT_APP_API_KEY}/v1/category/${id}`,
        data:data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function deleteCategory(id) {
    var config = {
        method: "delete",
        url: `${process.env.REACT_APP_API_KEY}/v1/category/${id}`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }