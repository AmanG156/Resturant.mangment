import axios from "axios";
var token = JSON.parse(localStorage.getItem("token") || "{}");


export const orderService = {
    getOrderList,
    getChefOrderList,
    updateStatus  
}

function getOrderList(page) {
    const data = {limit:10, page:page}
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/order/order-list`,
        params: data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function getChefOrderList(page) {
    const data = {limit:10, page:page}
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/order/chef/order-list`,
        params: data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function updateStatus(data, id) {
    var config = {
        method: "patch",
        url: `${process.env.REACT_APP_API_KEY}/v1/order/${id}`,
        data: data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }