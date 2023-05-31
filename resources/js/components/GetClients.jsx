import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import Menu from './Menu';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function GetClients() {
    const navigate = useNavigate()
    const [clients, setClients] = useState([]);
    const [tablaClients, setTablaClients]=useState([])
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
      getClients()
    },[]);


    const getClients = async () => {
      const token = localStorage.getItem('token'); // obtener el token del localStorage
      const response = await axios.get("/api/GetClient", {
        headers: {
          'Authorization': `Bearer ${token}` // agregar el token en el header
        }
      }
    );
        setClients(response.data.data)  
        setTablaClients(response.data.data)
        alert(response.data.message);
    }

    const editClient = (id)=>{
        navigate("/EditClient/"+id)
    }

    const deleteClient = (id) => {
      var yes = confirm("Are you sure you want to remove the client???")
       if(yes === true){
        const token = localStorage.getItem('token'); // obtener el token del localStorage
         axios.post("/api/DeleteClient/" + id,{}, {
          headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        }
      ).then(response => {
          alert(response.data.message)
          navigate("/getClients")
       }).catch(error =>{
           console.log(error);
       });
         
       }
     }

   
     const handleChange=e=>{
       setBusqueda(e.target.value);
       filtrar(e.target.value);
     }
     
     const filtrar=(terminoBusqueda)=>{
       var resultadosBusqueda=tablaClients.filter((elemento)=>{
         if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
         || elemento.last_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
         ){
           return elemento;
         }
       });
       setClients(resultadosBusqueda);
     }

  return (
    <>

     <Menu/>
     <Container fluid="md">
     <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search by name or last name"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
         
    <Table striped>
      <thead>
        <tr>
          <th>Clients</th>
        </tr>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>LAST NAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
      {clients.map((client)=>{
           return(
            <tr key={client.id}>
                <th>{client.id}</th>
                <th>{client.name}</th>
                <th>{client.last_name}</th>
                <th>{client.email}</th>
                <th>{client.phone}</th>
                <th>
                  <Button onClick={()=>editClient(client.id)} className='btn btn-info'>Edit</Button>
                  <Button onClick={()=>editClient(client.id)} className='btn btn-info'>Show</Button>

                  <Button variant="danger" onClick={() => deleteClient(client.id)} >Delete</Button>
                </th>
            </tr>
           )
          })
        }
      </tbody>
    </Table>
    </Container>
    </>
  );
}

export default GetClients;