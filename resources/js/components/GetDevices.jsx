import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Menu from './Menu';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function GetDevices() {
  const navigate = useNavigate()
    
    const [devices, setDevices] = useState([]);
    const [tablaDevices, setTablaDevices]=useState([])
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
      getDevice()
    },[]);

    const getDevice = async () => {
      const token = localStorage.getItem('token'); // obtener el token del localStorage
        const response = await axios.get("/api/GetDevice", {
          headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        })
        setDevices(response.data.data) 
        setTablaDevices(response.data.data)  
        alert(response.data.message);
      
    }

    const editDevice = (id)=>{
      navigate("/EditDevice/"+id)
    }

    const deleteDevice = (id) => {
      var yes = confirm("Are you sure you want to remove the device???")
       if(yes === true){
        const token = localStorage.getItem('token'); // obtener el token del localStorage
         axios.post("/api/DeleteDevice/" + id,{}, {
          headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        })
         .then(response => {
          alert(response.data.message);
          navigate("/getDevices");
           
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
      var resultadosBusqueda=tablaDevices.filter((elemento)=>{
        if(elemento.model.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.imei.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return elemento;
        }
      });
      setDevices(resultadosBusqueda);
    }


  return (
    <>
    <Menu/>
    <Container fluid="md">
    <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search by imei or model"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
    <Table striped>
      <thead>
        <tr>
          <th>Devices</th>
        </tr>
        <tr>
          <th>ID</th>
          <th>REPAIR ID</th>
          <th>MODEL</th>
          <th>MARK</th>
          <th>IMEI</th>
          <th>FAIL</th>
          <th>DESCRIPTION</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
      {devices.map((device)=>{
           return(
            <tr key={device.id}>
                <th>{device.id}</th>
                <th>{device.repair_id}</th>
                <th>{device.model}</th>
                <th>{device.mark}</th>
                <th>{device.imei}</th>
                <th>{device.fail}</th>
                <th>{device.description}</th>
                <th>
                <Button onClick={()=>editDevice(device.id)} className='btn btn-info'>Edit</Button>

                <Button variant="danger" onClick={() => deleteDevice(device.id)} >Delete</Button>
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

export default GetDevices;