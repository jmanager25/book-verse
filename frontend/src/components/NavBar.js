import React from 'react';
import { Container, Form, Nav, NavLink, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png'
import styles from "../styles/NavBar.module.css"

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
        <Container fluid>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt='logo' height='55' />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="mx-auto">
                    <NavLink ><i className="fa-solid fa-house"></i>Home</NavLink>
                    <NavLink ><i className="fa-solid fa-book"></i>My Books</NavLink>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder='search'
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <Nav className='ml'>
                        <NavLink ><i className="fa-solid fa-right-to-bracket"></i>Sign in</NavLink>
                        <NavLink ><i className="fa-solid fa-user-plus"></i>Sign up</NavLink>
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar