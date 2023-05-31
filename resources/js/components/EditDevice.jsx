import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function EditDevice() {
  const navigate = useNavigate()

  const {id} = useParams()

  const [model, setModel] = useState("")
  const [mark, setMark] = useState("")
  const [imei, setImei] = useState("")
  const [fail, setFail] = useState("")
  const [description, setDescription] = useState("")
  const [repairId, setRepairId] = useState("")

  //get data 
  useEffect(() => {
    getDevice()     
  },[]);
  const getDevice = async () => {
    const token = localStorage.getItem('token'); // obtener el token del localStorage
    await axios.get(`/api/ShowDevice/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` // agregar el token en el header
      }
    }
    ).then(response => {
      setModel(response.data.data.model)
      setMark(response.data.data.mark)
      setImei(response.data.data.imei)
      setFail(response.data.data.fail)
      setDescription(response.data.data.description)
      setRepairId(response.data.data.repair_id)
      alert(response.data.message);
    }).catch(error =>{
      console.log(error);
    });
  }

  //edit
  const editDevice = async (e) => {
    e.preventDefault()    
    if(e && e.preventDefault()) e.preventDefault();
      const token = localStorage.getItem('token'); // obtener el token del localStorage
      axios.post(`/api/UpdateDevice/${id}`,{model:model,mark:mark,imei:imei,fail:fail,description:description,repair_id:repairId}, {
        headers: {
          'Authorization': `Bearer ${token}` // agregar el token en el header
        }
      }
      ).then(response => {
        alert(response.data.message); 
        navigate("/getDevices")                  
      }).catch(error =>{
      console.log(error);
    });
  }

  return (
    <>
      <Menu/>
      <Container fluid="md" style={{background:'lightgray', display:'block', height:'630px', margin:'auto', textAlign:'center', width:'400px'}}>
        <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
          EDIT DEVICE
        </h3>
        <Form onSubmit={editDevice}>
          <Form.Group className="mb-3">
            <Form.Label >MODEL</Form.Label>
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={model} onChange={(e)=>{setModel(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label >MARK</Form.Label>
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={mark} onChange={(e)=>{setMark(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label >IMEI</Form.Label>
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={imei} onChange={(e)=>{setImei(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label >FAIL</Form.Label>
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={fail} onChange={(e)=>{setFail(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label >DESCRIPTION</Form.Label>
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={description} onChange={(e)=>{setDescription(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label >REPAIR ID</Form.Label>
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} value={repairId} onChange={(e)=>{setRepairId(e.target.value)}} disabled style={{ pointerEvents: 'none' }}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditDevice;