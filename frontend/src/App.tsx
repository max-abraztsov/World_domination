import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Navigation from './components/UI/navigation/Navigation'
import Footer from './components/UI/footer/Footer'
import Login from './pages/login/Login'
import Country from './pages/country/Country'
import Home from './pages/home/Home'
import Page404 from "./pages/404page/Page404"
import Admin from "./pages/admin/Admin"

function App() {

  return (
    <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/country" element={<Country/>}/>
          {/* <Route path="/wd-admin" element={<Admin/>}/> */}
          <Route path="*" element={<Page404/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
