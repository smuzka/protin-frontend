import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from "./Router";
import LogButtons from "./components/LogButtons";
import axios from "axios";
import {getJwtToken, saveJwtToken} from "./auth/auth";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Router/>
    </React.StrictMode>
);

reportWebVitals();
