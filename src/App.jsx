import { Routes, Route } from "react-router-dom";
import Signup from './Pages/SIgnup'
import Login from './Pages/Login'
import Otp from "./Pages/otp";
import UserName from "./Pages/userName";
import Homepage from "./Pages/Homepage";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/username" element={<UserName/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path='/' element ={<Signup/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/homepage" element={<Homepage/>}/>
      </Routes>
    </div>
  )
}
