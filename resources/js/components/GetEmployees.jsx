import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Menu from './Menu';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function GetEmployees() {
    const navigate = useNavigate()

    
    const [employees, setEmployees] = useState([]);
    const [tablaEmployees, setTablaEmployees]=useState([])
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
      getEmployees()
    },[]);

    const getEmployees = async () => {
      const token = localStorage.getItem('token'); // obtener el token del localStorage
        const response = await axios.get("/api/GetEmployee", {
          headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        })
        setEmployees(response.data.data) 
        setTablaEmployees(response.data.data)
        alert(response.data.message);
      
    }

    const editEmployee = (id)=>{
        navigate("/EditEmployee/"+id)
    }
    const deleteEmployee = (id) => {
      var yes = confirm("Are you sure you want to remove the employee???")
       if(yes === true){
        const token = localStorage.getItem('token'); // obtener el token del localStorage
         axios.post("/api/DeleteEmployee/" + id,{}, {
          headers: {
            'Authorization': `Bearer ${token}` // agregar el token en el header
          }
        })
         .then(response => {
          alert(response.data.message);
          navigate("/getEmployees");
           
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
      var resultadosBusqueda=tablaEmployees.filter((elemento)=>{
        if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.last_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return elemento;
        }
      });
      setEmployees(resultadosBusqueda);
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
      <thead><tr>
          <th>Employees</th>
        </tr>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>LAST NAME</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
      {employees.map((employee)=>{
           return(
            <tr key={employee.id}>
                <th>{employee.id}</th>
                <th>{employee.name}</th>
                <th>{employee.last_name}</th>
                <th>
                <Button onClick={()=>editEmployee(employee.id)} className='btn btn-info'>Edit</Button>

                <Button variant="danger" onClick={() => deleteEmployee(employee.id)} >Delete</Button>
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

export default GetEmployees;