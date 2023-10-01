import React from 'react';
import { Form, Navbar, Container, Button, Nav } from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from "../styles/NavBar.module.css"
import buttonstyles from "../styles/Button.module.css"
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../context/currentUserContext';
import axios from 'axios';
import Avatar from './Avatar';
import useAlert from '../hooks/useAlert';


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { setAlert } = useAlert();

  const handleSignOut = async () => {
    try {
      await axios.post("/api/dj-rest-auth/logout/");
      setCurrentUser(null);
      setAlert('Logout success', 'success')
    } catch (err) {
      setAlert('Logout failed', 'error')
      console.log(err);
    }
  };

  const addBooks = (
    <NavLink 
      activeClassName={styles.Active} 
      to="/books/create">
      <i className="far fa-plus-square"></i>Add Book
    </NavLink>
  )

  const loggedInIcons = 
    <>
      <NavLink 
        activeClassName={styles.Active} 
        to={`/profiles/${currentUser?.profile_id}`}><Avatar src={currentUser?.profile_image} 
        text={currentUser?.username}
        height={40} />
      </NavLink>
      <NavLink to="/signin" onClick={handleSignOut}><i className="fa-solid fa-right-from-bracket"></i>Sign out</NavLink>
    </>

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
          {currentUser && addBooks}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto">
                <NavLink exact activeClassName={styles.Active} to="/"><i className="fa-solid fa-house"></i>Home</NavLink>
                {currentUser ? (
                  <>
                    <NavLink activeClassName={styles.Active} to="/mybooks"><i className="fa-solid fa-book"></i>My Books</NavLink>
                  </>
                ) : null}
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