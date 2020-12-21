import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './utils/firebaseConfig'

import Login from './pages/login';
import Cadastrar from './pages/cadastrar';
import Tarefas from './pages/tarefas';
import Perfil from './pages/perfil';
import EsqueciSenha from './pages/esquecisenha';

const routing = (
  <Router>
    <Switch>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Route exact path="/tarefas" component={Tarefas} />
        <Route path="/login" component={Login} />
        <Route path="/cadastrar" component={Cadastrar} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/esquecisenha" component={EsqueciSenha} />

      </FirebaseAppProvider>
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
