import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Register(){
  const navigate = useNavigate()

  const registro = () => {
    navigate("/register")
  }
  const login = () => {
    navigate("/")
  }

  const [formValue, setformValue] = useState({
    name:'',
    email: '',
    password: '',
    c_password:''
  });
  
  const onChange = (e) =>{
    e.persist();
    setformValue({...formValue, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) =>{
    if(e && e.preventDefault()) e.preventDefault();
    const formData = new FormData();
    formData.append("name", formValue.name)
    formData.append("email", formValue.email)
    formData.append("password", formValue.password)
    formData.append("c_password", formValue.c_password)
    axios.post("/api/register",
    formData,
    {headers: {
      'Content-type': 'multipart/form-data',
      'Accept':'apllication/json'}}).then(response =>{
        alert(response.data.message);
        navigate("/");
      }).catch(error =>{
        alert("Correo ducplicado");
      })
  }

    return(
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Nav className="me-auto">
                <Nav.Link  onClick={() => login()}>Iniciar Sesion</Nav.Link>
                <Nav.Link onClick={() => registro()}>Crear Cuenta</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <br />
          <Container fluid="md" style={{background:'lightgray'}}>
          <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
        CREATE ACCOUNT
      </h3>
          <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                    Nombre
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="Name" placeholder="Nick Name" name="name" value={formValue.name} onChange={onChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Correo
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" placeholder="correo@gmail.com"  name="email" value={formValue.email} onChange={onChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Contraseña
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" placeholder="Password"  name="password" value={formValue.password} onChange={onChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalCPassword">
                    <Form.Label column sm={2}>
                    Confirmar Contraseña
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" placeholder="Confirmar Password" name="c_password" value={formValue.c_password} onChange={onChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Crear Cuenta</Button>
                    </Col>
                </Form.Group>
               
            </Form>
            </Container>
        </>
    );
}