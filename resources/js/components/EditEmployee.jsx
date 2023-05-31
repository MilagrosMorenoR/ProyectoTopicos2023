import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function EditEmployee() {
  const navigate=useNavigate()

  const {id} = useParams()

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")

  //get data client
  useEffect(() => {
    getEmployee()     
  },[]);
  const getEmployee = async () => {
    const token = localStorage.getItem('token'); // obtener el token del localStorage
    await axios.get(`/api/ShowEmployee/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` // agregar el token en el header
    }
  }).then(response => {
    setName(response.data.data.name)
    setLastName(response.data.data.last_name)
    alert(response.data.message);
    }).catch(error =>{
      console.log(error);
    });
  }

  //edit
  const editEmployee = async (e) => {
    e.preventDefault()    
      if(e && e.preventDefault()) e.preventDefault();
      const token = localStorage.getItem('token'); // obtener el token del localStorage
      axios.post(`/api/UpdateEmployee/${id}`,{name:name,last_name:lastName}, {
        headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        })
        .then(response => {
          alert(response.data.message); 
            navigate("/getEmployees")                  
        }).catch(error =>{
            console.log(error);
        });
  }

    return (
      <>
      <Menu/>
      <Container fluid="md" style={{background:'lightgray', display:'block', height:'300px', margin:'auto', textAlign:'center', width:'400px'}}>
        <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
        EDIT EMPLOYEE
      </h3>
      <Form onSubmit={editEmployee}>   
        <Form.Group className="mb-3">
          <Form.Label >NAME</Form.Label>
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={name} onChange={(e)=>{setName(e.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label >LAST NAME</Form.Label>
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
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

export default EditEmployee;