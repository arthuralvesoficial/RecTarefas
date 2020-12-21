import React, { useEffect, useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import { Container, ListGroup, Button, Form, Table } from 'react-bootstrap';
import { db } from "../../utils/firebaseConfig"
import Menu from '../../components/menu2';
import Logo from '../../assets/img/logo.jpg';
import Titulo from '../../components/titulo';
import Rodape from '../../components/rodape';
import './index.css';

const Perfil = () => {
    const firebase = useFirebaseApp();

    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const dbCollection = db.collection('perfil')

    const cp = (event) => {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(function(user) {
            console.log(user)
            firebase.auth().user.updatePassword(newPassword).then(function(){
                alert('Senha Alterada.')
                limparCampos();
            })
            .catch(error => {
                alert('Não foi possivel alterar a senha');
                console.error(error);
                limparCampos();
            });
        })
        .catch(error => {
            alert('404');
            console.error(error);
            limparCampos();
        });
    }

    const limparCampos = () => {
        setEmail('');
        setSenha('');
        setNewPassword('');
    }

    return (
        <div>
            <Menu />
            <Titulo titulo="Usuário" chamada="Verifique suas informações" />
            <Container>
                <div className="imagemcenter">
                    <img src="https://www.reabilitybauru.com.br/wp-content/uploads/2017/01/perfil-300x300.png" alt="Perfil"/>
                </div>
                <Form className='form-signin' onSubmit={event => cp(event)} >
                    <div className='text-center'>
                     <img src={Logo} alt='Logo' style={{ width : '64px'}} />
                    </div>
                    <br/>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Informe o email" 
                        value={email} 
                        onChange={event => setEmail(event.target.value)}  
                        required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha Atual</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Senha Atual" 
                        value={senha} 
                        onChange={event => setSenha(event.target.value)} 
                        required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicNewPassword">
                        <Form.Label>Nova Senha</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Nova Senha" 
                        value={newPassword} 
                        onChange={event => setNewPassword(event.target.value)} 
                        required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Alterar Senha
                    </Button>
                </Form>
            </Container>
            <Rodape />
        </div>
    )
}

export default Perfil;