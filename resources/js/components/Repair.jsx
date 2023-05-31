import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Repair() {

  const navigate = useNavigate()

  const [clientId, setClientId] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [date, setDate] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (e) =>{
    if(e && e.preventDefault()) e.preventDefault();
    const token = localStorage.getItem('token'); // obtener el token del localStorage
    axios.post("/api/CreateRepair",{date:date,price:price,client_id:clientId,employee_id:employeeId
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // agregar el token en el header
      }
    }).then(response =>{
      if(response.data.message==undefined){
        alert("Verify data")
        window.location.reload(true)
      }
        alert(response.data.message);
        navigate("/getRepairs");
      }).catch(error =>{
        console.log(error);
      })
  }
  return (
    <>
    <Menu/>
    <Container fluid="md" style={{background:'lightgray', display:'block', height:'350px', margin:'auto', textAlign:'center', width:'400px'}}>
      <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
        CREATE REPAIR
      </h3>
     <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="ID Client" name="clientId" value={clientId} onChange={(event)=>{setClientId(event.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="ID Employee" name="employeeId" value={employeeId} onChange={(event)=>{setEmployeeId(event.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Date" name="date" value={date} onChange={(event)=>{setDate(event.target.value)}} />      
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Price" name="price" value={price} onChange={(event)=>{setPrice(event.target.value)}} />
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

export default Repair;