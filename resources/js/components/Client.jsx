import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Client() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e) =>{
    if(e && e.preventDefault()) e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post("/api/CreateClient",{name:name,last_name:lastName,email:email,phone:phone
    }, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then(response =>{
      if(response.data.message==undefined){
        alert("Verify data")
        window.location.reload(true)
      }
        alert(response.data.message);
        navigate("/getClients");
      }).catch(error =>{
        alert(error.response.data.message);
      })
  }

  return (
    <> 
      <Menu/>
      <Container fluid="md" style={{background:'lightgray', display:'block', height:'470px', margin:'auto', textAlign:'center', width:'400px'}}>
        <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
          CREATE CLIENTS
        </h3>
        <Form onSubmit={handleSubmit}> 
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control  style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="First name" name="email" value={name} onChange={(event)=>{setName(event.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Last name" name="lastName" value={lastName} onChange={(event)=>{setLastName(event.target.value)}}/>
            </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control  style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Email" name="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control  style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Phone number" name="phone" value={phone} onChange={(event)=>{setPhone(event.target.value)}}/>
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Client;