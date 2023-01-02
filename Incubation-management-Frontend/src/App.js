import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import Application from "./pages/Application";
import DbContext from "./store/DbContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLoginPage from "./pages/admin/AdminLogin";
import AdminLogin from "./pages/admin/Home";
import BookSlotPage from "./pages/admin/BookSlot";
import UserManage from "./pages/admin/UserManage";

function App() {
  return (
    <DbContext>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/apply" element={<Application />} />
          <Route exact path="/admin/login" element={<AdminLoginPage />} />
          <Route exact path="/admin" element={<AdminLogin />} />
          <Route exact path="/admin/bookSlot" element={<BookSlotPage />} />
          <Route exact path="/admin/manageuser" element={<UserManage />} />
        </Routes>
      </BrowserRouter>
    </DbContext>
  );
}

export default App;


