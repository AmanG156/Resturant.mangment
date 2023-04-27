import axios from "axios";
var token = JSON.parse(localStorage.getItem("token") || "{}");
export const chefService = {
    addChef,
    getChef,
    editChef,
    deleteChef
}

function addChef(data) {
    var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/v1/auth/add-user`,
        data: data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function getChef() {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/auth/user-list`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function editChef(data, id) {
    var config = {
        method: "patch",
        url: `${process.env.REACT_APP_API_KEY}/v1/auth/update-user/${id}`,
        data: data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function deleteChef(id) {
    var config = {
        method: "delete",
        url: `${process.env.REACT_APP_API_KEY}/v1/auth/delete-user/${id}`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }