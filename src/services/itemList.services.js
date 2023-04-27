import axios from "axios";
var token = JSON.parse(localStorage.getItem("token") || "{}");

export const itemListService = {
    getItemList,
    deleteItemList,
    addItemList,
}

function addItemList(data) {
    var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/v1/category-item/add`,
        data: data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

function getItemList() {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/category-item/list`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function deleteItemList(id) {
    var config = {
        method: "delete",
        url: `${process.env.REACT_APP_API_KEY}/v1/category-item/${id}`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

//   function getCategoryList() {
//     var config = {
//         method: "get",
//         url: `${process.env.REACT_APP_API_KEY}/v1/category/list`,
//         headers: {
//             authorization: `${token}`,
//           },
//       };
//       return axios(config)
//   }