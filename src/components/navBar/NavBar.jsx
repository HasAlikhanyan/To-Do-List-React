import { memo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import {NavLink} from "react-router-dom";

import styles from './navBar.module.css';

const activeLinkClassName = ({isActive}) =>isActive ? styles.active : styles.normal;

function NavBar() {
    return (
        <Navbar bg="light" expand="sm" className="sticky-top bg-body-tertiary">
            <Container fluid className={styles.pagesContainer}>
                <Navbar.Brand>
                    <NavLink to="/" className={activeLinkClassName}>
                        Todo
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0">
                    <Navbar.Brand>
                        <NavLink to="/about" className={activeLinkClassName}>About</NavLink>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <NavLink to="/contact" className={activeLinkClassName}>Contact us</NavLink>
                    </Navbar.Brand>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default memo(NavBar);