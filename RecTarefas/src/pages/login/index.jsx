import React, {useState} from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from 'react-router-dom'
import Logo from '../../assets/img/logo.jpg';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Container, Form, Button } from 'react-bootstrap'
import './index.css';

const Login = () => {
    const firebase = useFirebaseApp();
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = (event) => {
        event.preventDefault();

        console.log(`${email} - ${senha}`);

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(result => {
                localStorage.setItem('token', result.user.refreshToken);
                history.push('/tarefas')
                alert('Seja bem vindo');
                limparCampos();
            })
            .catch(error => {
                alert('Email ou senha inválidos');
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
                <Form className='form-signin' onSubmit={event => logar(event)} >
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
                        Enviar
                    </Button>
                    <br/><br/>
                    <a href='/cadastrar' style={{ marginTop :'30px'}}>Não tenho conta.</a>
                    <br/><br/>
                    <a href='/esquecisenha' style={{ marginTop :'30px'}}>Esqueci minha senha.</a>
                </Form>
              </Container>
            <Rodape />
          </div> 
    )

}

export default Login;