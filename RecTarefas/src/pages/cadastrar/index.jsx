import React, {useState} from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from 'react-router-dom'
import Logo from '../../assets/img/logo.jpg';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Container, Form, Button } from 'react-bootstrap'
import './index.css';

const Cadastrar = () => {
    const firebase = useFirebaseApp();
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const cadastrar = (event) => {
        event.preventDefault();

        console.log(`${email} - ${senha}`);

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(result => {
                localStorage.setItem('token', result.user.refreshToken);
                alert('Usuário cadastrado.');
                limparCampos();
                history.push('/login')
            })
            .catch(error => {
                alert('Os dados são inválidos.');
                console.error(error);
                limparCampos();
            })
    }

    const limparCampos = () => {
        setEmail('');
        setSenha('');
    } 

    return (
        <div>
            <Menu />
            <Container className='form-height'>
                <Form className='form-signin' onSubmit={event => cadastrar(event)} >
                    <div className='text-center'>
                     <img src={Logo} alt='Logo' style={{ width : '64px'}} />
                    </div>
                    <br/>
                    <small>Informe os dados</small>
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
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={event => setSenha(event.target.value)} 
                        required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Cadastrar
                    </Button>
                    <br/><br/>
                    <a href='/login' style={{ marginTop :'30px'}}>Já tenho uma conta</a>
                </Form>
            </Container>
            <Rodape />
        </div> 
    )

}

export default Cadastrar;