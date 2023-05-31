import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Menu from './Menu';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function GetRepairs() {
    
    const navigate = useNavigate()
    
    const [repairs, setRepairs] = useState([]);
    const [tablaRepairs, setTablaRepairs]=useState([])
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
      getRepair()
    },[]);

    const getRepair = async () => {
      const token = localStorage.getItem('token'); // obtener el token del localStorage
        const response = await axios.get("/api/GetRepair", {
          headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        })
        setRepairs(response.data.data)  
        setTablaRepairs(response.data.data) 
        alert(response.data.message);
      
    }

    const editRepair = (id)=>{
      navigate("/EditRepair/"+id)
    }

    const deleteRepair = (id) => {
      var yes = confirm("Are you sure you want to remove the repair???")
       if(yes === true){
        const token = localStorage.getItem('token'); // obtener el token del localStorage
         axios.post("/api/DeleteRepair/" + id,{}, {
          headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        })
         .then(response => {
          alert(response.data.message);
          navigate("/getRepairs");
           
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
      var resultadosBusqueda=tablaRepairs.filter((elemento)=>{
        if(elemento.id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        
        || elemento.client_id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return elemento;
        }
      });
      setRepairs(resultadosBusqueda);
    }

 return (
   <>

    <Menu/>
    <Container fluid="md">
    <Form className="d-flex">
           <Form.Control
             type="search"
             placeholder="Search by id or client_id"
             className="me-2"
             aria-label="Search"
             onChange={handleChange}
           />
           <Button variant="outline-success">Search</Button>
         </Form>
    <Table striped>
      <thead><tr>
          <th>REPAIR</th>
        </tr>
        <tr>
        <th>ID</th>
          <th>CLIENT ID</th>
          <th>EMPLOYEE ID</th>
          <th>DATE</th>
          <th>PRICE</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
      {repairs.map((repair)=>{
           return(
            <tr key={repair.id}>
                <th>{repair.id}</th>
                <th>{repair.client_id}</th>
                <th>{repair.employee_id}</th>
                <th>{repair.date}</th>
                <th>{repair.price}</th>
                <th>
                <Button onClick={()=>editRepair(repair.id)} className='btn btn-info'>Edit</Button>

                <Button variant="danger" onClick={() => deleteRepair(repair.id)} >Delete</Button>
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

export default GetRepairs;