import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Employee() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleSubmit = (e) =>{
    if(e && e.preventDefault()) e.preventDefault();
    const token = localStorage.getItem('token'); 
    axios.post("/api/CreateEmployee",{name:name,last_name:lastName
    }, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then(response =>{
      if(response.data.message==undefined){
        alert("Verify data")
        window.location.reload(true)
      }
      if(response.data.message==undefined){
        alert("Verify data")
        window.location.reload(true)
      }
        alert(response.data.message);
        navigate("/getEmployees");
      }).catch(error =>{
        console.log(error);
      })
  }
  return (
    <>
    <Menu/>
    <Container fluid="md" style={{background:'lightgray', display:'block', height:'250px', margin:'auto', textAlign:'center', width:'400px'}}>
      <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
        CREATE EMPLOYEE
      </h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control  style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="First name" name="name" value={name} onChange={(event)=>{setName(event.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control  style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Last name"name="lastName" value={lastName} onChange={(event)=>{setLastName(event.target.value)}} />
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

export default Employee;