import React from 'react';
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import appstyles from '../App.module.css'
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
        <Container fluid>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt='logo' height='55' />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="mx-auto">
                    <NavLink exact to="/" activeClassName={styles.Active} ><i className="fa-solid fa-house"></i>Home</NavLink>
                    <NavLink to="/mybooks" activeClassName={styles.Active} ><i className="fa-solid fa-book"></i>My Books</NavLink>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder='search'
                            className={`"me-2" ${appstyles.Search}`}
                            aria-label="Search"
                        />
                    </Form>
                    <Nav className='ml'>
                        <NavLink to="/signin" activeClassName={styles.Active}><i className="fa-solid fa-right-to-bracket"></i>Sign in</NavLink>
                        <NavLink to="/signup" activeClassName={styles.Active}><i className="fa-solid fa-user-plus"></i>Sign up</NavLink>
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar