import React from 'react';
import { useContext } from "react";
import Context from '../Context';
import { useNavigate } from "react-router-dom";

function Registered() {

    const formData = useContext(Context);
    const navigate = useNavigate();

    return (
        <div >
            <p>You are successfully registered.</p>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Number: {formData.number}</p>
            <button onClick={() => navigate("/")}>Return to Form</button>
        </div>
    );
}

export default Registered;
