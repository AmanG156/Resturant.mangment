import './App.css';
import { MenuPage } from './views/MenuPage';
import MyOrder from './views/MyOrder';
import Login from './Admin/Login/Login';
import Dashboard from './Admin/Dashboard/Dashboard'
import SetTables from './Admin/SetTables/Settables'
import Transactions from './Admin/Transactions/Transactions'
import { CreateChef } from './Admin/CreateChef/CreateChef';
import {
  Routes,
  Route,
} from "react-router-dom";
import ItemCategories from './Admin/ItemCategories/ItemCategories';
import ItemList from './Admin/ItemList/ItemList';
import UpdateOrder from './Admin/UpdateOrder/UpdateOrder';
import ChefDashboard from './Chef/ChefDashboard';
import Success from './views/Success/Success';
import ChefOrder from './Chef/ChefOrder';
import Cancle from './views/Cancle/Cancle';
function App() {
  console.log(process.env.REACT_APP_API_KEY, "process.env.REACT_APP_API");

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path='/views/myOrder' element={<MyOrder/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      <Route path='/admin/settables' element={<SetTables/>}/> 
      <Route path='/admin/transactions' element={<Transactions/>}/>
      <Route path='/admin/addchef' element={<CreateChef/>}/>
      <Route path="/admin/itemCategories" element={<ItemCategories/>}/>
      <Route path='/admin/itemList' element={<ItemList/>}/>
      <Route path='/chef/dashboard' element={< ChefDashboard/>}/>
      <Route path='/success' element = {<Success/>}/>
      <Route path='/cancel' element={<Cancle/>}/>
    <Route path='/admin/updateOrder' element={<UpdateOrder/>}/>
    <Route path='/chef/updateOrder' element={<ChefOrder/>}/>

    </Routes>
    </div>
  );
}

export default App;
