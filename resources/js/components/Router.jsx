import React from "react";
import {Routes, Route} from "react-router-dom";

import Menu from "./Menu";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import Client from "./Client";
import Device from "./Device";
import Employee from "./Employee";
import Repair from "./Repair";
import Index from "./Index";
import EditClient from "./EditClient";
import GetEmployees from "./GetEmployees";
import GetClients from "./GetClients";
import GetRepairs from "./GetRepairs";
import GetDevices from "./GetDevices";
import EditEmployee from "./EditEmployee";
import EditRepair from "./EditRepair";
import EditDevice from "./EditDevice";



function Router(props) {
    return (
        <Routes>
                <Route path="menu" element={<Menu/>} />
                <Route path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/createClient" element={<Client/>} />
                <Route path="/createDevice" element={<Device />} />
                <Route path="/createEmployee" element={<Employee />} />
                <Route path="/createrepair" element={<Repair />} />
                
                <Route path="/getEmployees" element={<GetEmployees />} />
                <Route path="/getClients" element={<GetClients />} />
                <Route path="/getRepairs" element={<GetRepairs />} />
                <Route path="/getDevices" element={<GetDevices />} />

                <Route path="/index" element={<Index />} />
                <Route exact path="/EditClient/:id" element={ <EditClient /> } />
                <Route exact path="/EditEmployee/:id" element={ <EditEmployee /> } />
                <Route exact path="/EditRepair/:id" element={ <EditRepair /> } />
                <Route exact path="/EditDevice/:id" element={ <EditDevice /> } />
        </Routes>
    );
  }
  
  export default Router;