import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo1 from '../../src/img/logo1.png';

function Login() {
  const navigate = useNavigate()

  const registro = () => {
    navigate("/register")
  }
  const login = () => {
    navigate("/")
  }

  const [formValue, setformValue] = useState({
    email: '',
    password: ''  
  });
  
  const onChange = (e) =>{
    e.persist();
    setformValue({...formValue, [e.target.name]: e.target.value});
  }


  const handleSubmit = (e) =>{
    if(e && e.preventDefault()) e.preventDefault();
    const formData = new FormData();
    formData.append("email", formValue.email)
    formData.append("password", formValue.password)
    axios.post("/api/login",
    formData,
    {headers: {'Content-type': 'multipart/form-data',
      'Accept':'apllication/json'}}).then(response =>{
        console.log('response:');
        //console.log(response.data.data);
        console.log(response.data.message);
        localStorage.setItem('token', response.data.data.token); // almacenar token en localStorage
        navigate("/index");
      }).catch(error =>{
        console.log(error);
      })
  }

  return (
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
        <Container fluid="md" style={{background:'lightgray', height:'450px' , width:'300px', textAlign:'center'}}>
        <img src={logo1} style={{height:'auto', display:'block',margin:'auto', width:'150px'}}/>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control style={{display:'block', height:'auto', margin:'auto', height:'auto', width:'auto' ,textAlign:'center'}} type="email" placeholder="Enter email" name="email" value={formValue.email} onChange={onChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'auto'}} type="password" placeholder="Password" name="password" value={formValue.password} onChange={onChange}/>
        </Form.Group>
        <Form.Group className="mb-3"  style={{position: 'initial', textAlign:'center'}}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Form.Group>
      </Form>
      </Container>
    </>
  );
}

export default Login;