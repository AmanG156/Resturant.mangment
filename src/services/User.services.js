import axios from "axios";

export const UserMenuList = {
    getCategoryList,
    getMenuListByCategory
}

function  getCategoryList() {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/category/user/list`,
      };
      return axios(config)
  }


  function  getMenuListByCategory() {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/category-item/user/list`,
      };
      return axios(config)
  }
