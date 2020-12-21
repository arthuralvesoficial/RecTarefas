import React, {useState} from 'react';
import { useFirebaseApp } from 'reactfire';
import Logo from '../../assets/img/logo.jpg';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Container, Form, Button } from 'react-bootstrap'
import './index.css';

const EsqueciSenha = () => {
    const firebase = useFirebaseApp();

    const [email, setEmail] = useState('');

    const esquecisenha = (event) => {
        event.preventDefault();
        
        var auth = firebase.auth();
        var emailAddress = email;
        
        auth.sendPasswordResetEmail(emailAddress).then(function() {
          alert('Email de recuperação enviado.')
          limparCampos();
        })
        .catch(error => {
            alert('Erro');
            console.error(error);
        });
    }

    const limparCampos = () => {
        setEmail('');
    }

    return (
      <div>
        <Menu />
          <Container className='form-height'>
                <Form className='form-signin' onSubmit={event => esquecisenha(event)} >
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
                        placeholder="Insira o email de recuperação" 
                        value={email} 
                        onChange={event => setEmail(event.target.value)}  
                        required />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Enviar Email
                    </Button>
                </Form>
              </Container>
            <Rodape />
          </div> 
    )

}

export default EsqueciSenha;