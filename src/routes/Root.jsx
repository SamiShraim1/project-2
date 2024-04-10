
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from "react-router-dom";
export default function root() {
  return (
    <div className='container'>
      
        <Navbar/>
        <Outlet />
        <Footer/>
    </div>
  )
}
