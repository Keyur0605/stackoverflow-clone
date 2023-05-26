
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
import SingleQuestion from './components/SingleQuestion';
import { BrowserRouter,NavLink,Route,Routes } from "react-router-dom";

function App() {


  
  return (
   <>
    <BrowserRouter>
    
    <Routes>
       <Route path='/' element={<Home/>}></Route>
      <Route path='/question' element={<Protectrd Cmp={Question}/>}></Route> 
      <Route path='/question/:id' element={<SingleQuestion/>}></Route> 
       {/* <Route path='/' element={<Home/>}></Route>
      <Route path='/question' element={<Question/>}></Route>  */}

      <Route path='/register' element={<Register/>}></Route>
      
      <Route path="/login" element={<Login/>}/>
      <Route path="/tag" element={<Tag/>}/>
      <Route path="/ask" element={<Ask/>}/>
      <Route path="/*" element={<> <h1>404 Page Not Found </h1> <NavLink to="/">Back To Home page</NavLink></>}/>
  
 
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App;
