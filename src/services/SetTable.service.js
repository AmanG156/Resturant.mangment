import axios from "axios";
const user_base_url = "http://localhost:8080/api";
var token = JSON.parse(localStorage.getItem("token") || "{}");

export const SetTableList = {
    getSetTableList,
    updateTableList
}
function  getSetTableList() {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/auth/table-count`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }

  function  updateTableList(count) {
    var config = {
        method: "patch",
        url: `${process.env.REACT_APP_API_KEY}/v1/auth/update-table-count/63d8c53375aad70cfacb99b9`,
        data:{"count":count},
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }