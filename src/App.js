import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Login from './components/Login';
import Home from './components/Home';
import Question from './components/Question';
import Register from './components/Register';
import Protectrd from './components/Protectrd'
import Tag from './components/Tag';
import Ask from './components/Ask';
import ErrorPage from './components/ErrorPage';
import SingleQuestion from './components/SingleQuestion';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {
  return (
   <>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}></Route>
      <Route path='/question' element={<Protectrd Cmp={Question}/>}></Route> 
      <Route path='/question/:id' element={<SingleQuestion/>}></Route> 
      <Route path='/register' element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/tag" element={<Protectrd Cmp={Tag}/>}/>
      <Route path="/ask" element={<Protectrd Cmp={Ask}/>}/>
      <Route path="/profile" element={<Protectrd Cmp={Profile}/>}/>
      <Route path="/updateprofile" element={<Protectrd Cmp={UpdateProfile}/>}/>
      <Route path="/*" element={<ErrorPage/>}/>
    </Routes>
    </BrowserRouter>
   </>
  )
}
export default App;
