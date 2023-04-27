import axios from "axios";
var token = JSON.parse(localStorage.getItem("token") || "{}");

export const TransactionList = {
    getTransactionList,
    addTransaction
   
}
function  getTransactionList(page, fd, ed) {
    const data = {limit:10, page:page, fromDate:fd, toDate:ed}
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_KEY}/v1/order/transaction-list`,   
        params: data,
        headers: {
            authorization: `${token}`,
          },
      };
      return axios(config)
  }
  function addTransaction(data){
    var config = {
         method: 'post',
         url: `${process.env.REACT_APP_API_KEY}/v1/order/addTransaction`,
         data: data,
        //  headers: {
        //      authorization: `${token}`
        //  }
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