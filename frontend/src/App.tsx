import './App.css'
import SignupPage from './pages/signup/SignupPage'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SigninPage from "./pages/signin/SigninPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/sign-in/*" element={<SigninPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
