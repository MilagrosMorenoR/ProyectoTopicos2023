import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Device() {
  const navigate = useNavigate()

  const [repairId, setRepairId] = useState("")
  const [model, setModel] = useState("")
  const [mark, setMark] = useState("")
  const [imei, setImei] = useState("")
  const [fail, setFail] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) =>{
    if(e && e.preventDefault()) e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post("/api/CreateDevice",{repair_id:repairId,model:model,mark:mark,imei:imei,fail:fail,description:description
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response =>{
      if(response.data.message==undefined){
        alert("Verify data")
        window.location.reload(true)
      }
        alert(response.data.message);
        navigate("/getDevices");
      }).catch(error =>{
        alert(error.response.data.message);
      })
  }

  return (
    <>
      <Menu/>
      <Container fluid="md" style={{background:'lightgray', display:'block', height:'470px', margin:'auto', textAlign:'center', width:'400px'}}>
        <h3 style={{ display: 'block', position: 'initial', textAlign:'center' }}>
          CREATE DEVICES
        </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="ID Repair" name="repairId" value={repairId} onChange={(event)=>{setRepairId(event.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Model" name="model" value={model} onChange={(event)=>{setModel(event.target.value)}} />
            </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Mark" name="mark" value={mark} onChange={(event)=>{setMark(event.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="IMEI" name="imei" value={imei} onChange={(event)=>{setImei(event.target.value)}} />
            </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="FAIL" name="fail" value={fail} onChange={(event)=>{setFail(event.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control style={{display:'block', height:'auto', margin:'auto', textAlign:'center', width:'350px'}} placeholder="Description" name="description" value={description} onChange={(event)=>{setDescription(event.target.value)}} />
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

export default Device;