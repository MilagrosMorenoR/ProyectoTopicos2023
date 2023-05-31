import React, { useEffect, useState } from "react";
import GetClients from './GetClients';
import GetEmployees from "./GetEmployees";
import Container from 'react-bootstrap/Container';

function Index() {
  return (
    <>
    <Container fluid="md">
      <GetClients />
      </Container>
    </>
  );
}

export default Index;