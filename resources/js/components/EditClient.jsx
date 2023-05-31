import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function EditClient() {
  const navigate=useNavigate()

  const {id} = useParams()

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  //get data client
  useEffect(() => {
    getClient()     
  },[]);
  const getClient = async () => {
    const token = localStorage.getItem('token'); 
    await axios.get(`/api/ShowClient/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    ).then(response => {
      setName(response.data.data.name)
      setLastName(response.data.data.last_name)
      setEmail(response.data.data.email)
      setPhone(response.data.data.phone)
      alert(response.data.message);
    }).catch(error =>{
      console.log(error);
    });
  }

  //edit
  const editClient = async (e) => {
    e.preventDefault()    
    if(e && e.preventDefault()) e.preventDefault();
    const token = localStorage.getItem('token');
      axios.post(`/api/UpdateClient/${id}`,{name:name,last_name:lastName,email:email,phone:phone}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        alert(response.data.message); 
        navigate("/index")                  
      }).catch(error =>{
        console.log(error);
    });
  }

    return (
      <>
        <Menu/>
        <Container fluid="md" style={{background:'lightgray', display:'block', height:'470px', margin:'auto', textAlign:'center', width:'400px'}}>
        <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
          EDIT CLIENTS
        </h3>
          <Form onSubmit={editClient}>  
            <Row>
            <Form.Group className="mb-3">
              <Form.Label >NAME</Form.Label>
              <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> LAST NAME</Form.Label>
              <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label >EMAIL</Form.Label>
              <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label >PHONE</Form.Label>
              <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
            </Form.Group>
            </Row>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
}

export default EditClient;