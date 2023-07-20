import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth, dbr } from "./firebase-config/firebase-config";
import { ref, onValue } from "firebase/database";

function NavBar() {
  const [searchParams] = useSearchParams();
  const [uname, setUname] = useState("");
  const [uid] = useState(searchParams.get("ud"));

  const navigate = useNavigate();

  useEffect(() => {
    getUsername();
  });

  function getUsername() {
    const ud = searchParams.get("ud");
    const username = ref(dbr, "users/" + ud);
    onValue(username, (snapshot) => {
      const data = snapshot.val();
      setUname(data?.username);
    });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        alert("Logout successful");
        window.location.href = "./";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Navbar bg="light" expand="sm" sticky="top" className="px-3">
      <Navbar.Brand
        style={{ color: "blueviolet", fontSize: 20 + "px", fontWeight: 400 }}
      >
        {searchParams.get("ud") !== null ? (
          <Link to={`/?ud=${uid}`} className="title">
            <h3>Job Portal</h3>
          </Link>
        ) : (
          <Link to="/" className="title">
            <h3>Job Portal</h3>
          </Link>
        )}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          {searchParams.get("ud") !== null ? (
            <>
              <Nav.Link href={`/?ud=${uid}`} className="links">
                Home
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/" className="links">
                Home
              </Nav.Link>
            </>
          )}
          {searchParams.get("ud") !== null ? (
            <>
              <Nav.Link href={`/jobs?ud=${uid}`} className="jobLink">
                Post Jobs
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/" className="jobLink">
                Post Jobs
              </Nav.Link>
            </>
          )}
          {searchParams.get("ud") !== null ? (
            <>
              <Dropdown drop="start">
                <Dropdown.Toggle>
                  <FaUserAlt className="userIcon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    Welcome <strong>{uname}</strong>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate(`/profile?ud=${uid}`)}>
                    View Profile
                  </Dropdown.Item>
                  {/* <Dropdown.Item href={`./userinfo?ud=${uid}`}>View Profile</Dropdown.Item> */}

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
