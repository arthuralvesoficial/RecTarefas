import React from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import logo from '../../assets/img/logo.jpg';

const Menu = () => {
    const firebase = useFirebaseApp();
    const history = useHistory()

    const sair = (event) => {
        event.preventDefault();

        firebase.auth().signOut()
        .then(function() {
          alert('Logout efetuado com sucesso')
        })
        .catch(error => {
            alert('Erro ao efetuar logout');
            console.error(error);
        })

        history.push('/login')
    }

    const renderMenu = () => {
        const token = localStorage.getItem('token-nyous')

        if (token === null) {
            return (
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
                </Nav>
            );
        } else if (jwt_decode(token).Role === "2") {
            return (
                <Nav>
                    <NavDropdown title={jwt_decode(token).nameid} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={event => sair(event)} >Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><img src={logo} alt="" style={{ width: '50px' }} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"></Nav.Link>
                </Nav>
                {renderMenu()}
            </Navbar.Collapse>
        </Navbar>
    )
}


export default Menu;