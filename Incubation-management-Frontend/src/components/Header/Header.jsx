import React, { useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { UserData } from "../../store/DbContext";

function Header() {
  const { user } = useContext(UserData);
  console.log(user);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.get("/", {
          withCredentials: true,
        });
        console.log(data);
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
        }
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Incubation</Navbar.Brand>

          <Nav>
            <NavDropdown title={user ? user.data.name : "hello"}>
              <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
