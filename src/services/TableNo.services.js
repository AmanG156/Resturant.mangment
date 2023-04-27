import axios from "axios";
const user_base_url = "http://localhost:8080/api";
var token = JSON.parse(localStorage.getItem("token") || "{}");

// export const SetTableList = {
//     getTableNoList,
   
// }
export const  getTableNoList=(url)=> {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}${url}`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }
  export const  CheckOut=()=> {
    var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/v1/order/checkout`,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
      .then((res)=>{
        console.log(res.data);          
    return res;
    })
   .catch((err) => {
    return err
   })
  }
 