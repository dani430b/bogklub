import React from 'react';
import ReactDOM from 'react-dom/client';
import "./firebase";
import App from './App';
import Storage from "./dbfiles"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <App />
    <Storage />
    </>
);
