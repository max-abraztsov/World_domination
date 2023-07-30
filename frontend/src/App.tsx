import { useEffect } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Navigation from './components/UI/navigation/Navigation'
import Footer from './components/UI/footer/Footer'
import Login from './pages/login/Login'
import Country from './pages/country/Country'
import Home from './pages/home/Home'
import Page404 from "./pages/404page/Page404"
import Admin from "./pages/admin/Admin"
import { useAppSelector, useAppDispatch } from "./hook"
import { toggleLogged } from "./store/loginSlice"


function App() {

  const loginState = useAppSelector(state => state.status);
  const country = useAppSelector(state => state.country);
  const form = useAppSelector(state => state.form);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(country, form);
    console.log(1);
    if (localStorage.getItem("authenticated") === "true"){
      dispatch(toggleLogged({status: true}));
    } else if (localStorage.getItem("authenticated") === null || localStorage.getItem("authenticated") === "false"){
      dispatch(toggleLogged({status: false}));
      localStorage.setItem("authenticated", "false");
    } else {
      console.log("Error");
    }
  }, []);

  return (
    <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          {loginState.is_logged_in ? (
            <Route path="/country" element={<Country/>}/>
          ): (
            <Route path="/login" element={<Login/>}/>
          )}
          {/* <Route path="/wd-admin" element={<Admin/>}/> */}
          <Route path="*" element={<Page404/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
