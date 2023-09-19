import React from 'react';
import { Form, Navbar, Container, Button, Nav } from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from "../styles/NavBar.module.css"
import buttonstyles from "../styles/Button.module.css"
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../context/currentUserContext';


const NavBar = () => {
  const currentUser = useCurrentUser;

  const loggedInIcons = <>{currentUser?.username}</>

  const loggedOutIcons = (
    <> 
      <Nav className="ml-auto">
        <NavLink activeClassName={styles.Active} to="/signin"><i className="fa-solid fa-right-to-bracket"></i>Sign in</NavLink>
        <NavLink activeClassName={styles.Active} to="/signup"><i className="fa-solid fa-user-plus"></i>Sign up</NavLink>
      </Nav>
    </>
  )
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
        <Container fluid>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt='logo' height='60' />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto">
                <NavLink exact activeClassName={styles.Active} to="/"><i className="fa-solid fa-house"></i>Home</NavLink>
                <NavLink activeClassName={styles.Active} to="/mybooks"><i className="fa-solid fa-book"></i>My Books</NavLink>
                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button className={buttonstyles.Button}>Search</Button>
                </Form>
            </Nav>
            <Nav>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
};

export default NavBar