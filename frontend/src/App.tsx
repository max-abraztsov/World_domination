import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Navigation from './components/UI/navigation/Navigation'
import Login from './pages/login/Login'
import Country from './pages/country/Country'
import Home from './pages/home/Home'

function App() {

  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/country" element={<Country/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
