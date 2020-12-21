import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { db } from "../../utils/firebaseConfig"
import Menu from '../../components/menu2';
import Rodape from '../../components/rodape';

const Tarefas = () => {

    const [tarefas, setTarefas] = useState([]);
    const [id, setId] = useState(0);
    const [tarefa, setTarefa] = useState('');

    const dbCollection = db.collection('tarefas')

    useEffect(() => {
        listarTarefas()
    }, [])

    const listarTarefas = () => {
        try {
            dbCollection.get()
                .then(result => {
                    const data = result.docs.map(doc => {
                        return {
                            id: doc.id,
                            tarefa: doc.data().tarefa
                        }
                    });
                    setTarefas(data)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error);
        }
    }

    const editar = (event) => {
        event.preventDefault()

        try {
            dbCollection.doc(event.target.value)
                .get()
                .then(result => {
                    setId(result.id);
                    setTarefa(result.data().tarefa)
                })
        } catch (error) {
            console.error(error)
        }
    }

    const remover = (event) => {
        event.preventDefault()

        try {
            dbCollection.doc(event.target.value).delete()
                .then(result => {
                    alert('Tarefa removida.');
                    listarTarefas()
                })
        } catch (error) {
            console.error(error)
        }
    }

    const concluir = (event) => {
        event.preventDefault()

        try {
            dbCollection.doc(event.target.value).delete()
                .then(result => {
                    alert('Tarefa concluida.');
                    listarTarefas()
                })
        } catch (error) {
            console.error(error)
        }
    }

    const salvar = (event) => {
        event.preventDefault();

        try {
            const tarefas = {
                tarefa: tarefa
            };

            if (id === 0) {
                dbCollection.add(tarefas)
                    .then(() => {
                        alert('Tarefa adicionada.');
                        listarTarefas()
                        limparCampos();
                    })
                    .catch(error => console.error(error))
            } else {
                dbCollection.doc(id)
                    .set(tarefas)
                    .then(result => {
                        alert('Tarefa alterada.');
                        listarTarefas();
                        limparCampos();
                    })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const limparCampos = () => {
        setId(0);
        setTarefa('');
    }

    return (
        <div>
            <Menu />
            <Container>
                <h1>Tarefas</h1>
                <p>Gerencie suas tarefas.</p>
                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>

                            <Form.Group controlId="formDescricao">
                                <Form.Label>Tarefa</Form.Label>
                                <Form.Control as="textarea" rows={3} value={tarefa} onChange={event => setTarefa(event.target.value)} />
                            </Form.Group>

                            <Button type="submit" >Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Tarefa</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tarefas.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.tarefa}</td>
                                                <td>
                                                    <Button type="button" variant="success" value={item.id} style={{ marginRight: '30px', marginLeft: '30px' }} onClick={event => concluir(event)}>Concluida</Button>
                                                    <Button type="button" variant="warning" value={item.id} onClick={event => editar(event)}>Editar</Button>
                                                    <Button type="button" variant="danger" value={item.id} style={{ marginLeft: '30px' }} onClick={event => remover(event)}>Remover</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
            <Rodape />
        </div>
    )

}

export default Tarefas;