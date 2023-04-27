import axios from "axios";

export const userService = {
    login
}


function login(data) {
    var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/v1/auth/login`,
        data: data,
      };
      return axios(config)
        .then((res) => {
          console.log(res, "response");
          localStorage.setItem("token", JSON.stringify(res.data.token));
          return res;
        })
        .catch((err) => {
          return err;
        });
  }