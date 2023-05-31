import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function EditRepair() {
  const navigate = useNavigate()

  const {id} = useParams()

  const [date, setDate] = useState("")
  const [price, setPrice] = useState("")
  const [clientId, setClientId] = useState("")
  const [employeeId, setEmployeeId] = useState("")

  //get data 
  useEffect(() => {
    getRepair()     
  },[]);
  const getRepair = async () => {
    const token = localStorage.getItem('token'); // obtener el token del localStorage
  await axios.get(`/api/ShowRepair/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}` // agregar el token en el header
    }
  })
  .then(response => {
    setDate(response.data.data.date)
    setPrice(response.data.data.price)
    setClientId(response.data.data.client_id)
    setEmployeeId(response.data.data.employee_id)
    alert(response.data.message);
  }).catch(error =>{
    console.log(error);
  });
  }

  //edit
  const editRepair = async (e) => {
    e.preventDefault()    
        if(e && e.preventDefault()) e.preventDefault();
        const token = localStorage.getItem('token'); // obtener el token del localStorage
        axios.post(`/api/UpdateRepair/${id}`,{date:date,price:price,client_id:clientId,employee_id:employeeId}, {
          headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        })
        .then(response => {
          alert(response.data.message); 
            navigate("/getRepairs")     
            console.log(response)             
        }).catch(error =>{
            console.log(error);
        });
  }

    return (
      <>
      <Menu/>
      <Container fluid="md" style={{background:'lightgray', display:'block', height:'470px', margin:'auto', textAlign:'center', width:'400px'}}>
        <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
        EDIT REPAIR
      </h3>
      <Form onSubmit={editRepair}>   
        <Form.Group className="mb-3">
          <Form.Label >DATE</Form.Label>
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={date} onChange={(e)=>{setDate(e.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label >PRICE</Form.Label>
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={price} onChange={(e)=>{setPrice(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label >CLIENT ID</Form.Label>
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={clientId} onChange={(e)=>{setClientId(e.target.value)}} disabled style={{ pointerEvents: 'none' }}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label >EMPLOYEE ID</Form.Label>
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={employeeId} onChange={(e)=>{setEmployeeId(e.target.value)}} disabled style={{ pointerEvents: 'none' }}/>
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

export default EditRepair;