import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { toast } from "react-toastify";

function Sidebar() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (!cookies.jwt) {
  //       navigate("/admin/login");
  //     } else {
  //       const { data } = await axios.get("/api/admin/", {
  //         withCredentials: true,
  //       });
  //       console.log(data);
  //       if (!data.status) {
  //         removeCookie("jwt");
  //         navigate("/admin/login");
  //       } else {
  //         toast(`Hi ${data.user} 🦄`, {
  //           theme: "dark",
  //         });
  //       }
  //     }
  //   };

  //   verifyUser();
  // }, [cookies, navigate, removeCookie]);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/admin/login", { replace: true });
  };
  return (
    <section className="sidebar">
      
      <ul>
        <li onClick={() => navigate("/admin")}>Application List</li>
        <li onClick={() => navigate("/admin/bookSlot")}>Booking Slot</li>
        <li onClick={() => navigate("/admin/manageuser")}>User Management</li>
        <li onClick={logOut}>LogOut</li>
      </ul>
    </section>
  );
}

export default Sidebar;
