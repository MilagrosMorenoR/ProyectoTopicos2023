/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
/**

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import './components/Example';

import  ReactDOM  from 'react-dom/client';
import Example from './components/Example';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';


    ReactDOM.createRoot(document.getElementById('example')).render(
        <BrowserRouter>
            <Example />
        </BrowserRouter>
    )   
