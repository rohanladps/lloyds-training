import React from 'react';
import './App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      number: '',
    },
    onSubmit: function (values) {
      navigate('/registered');
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(),
      email: Yup.string()
        .email()
        .required(),
      number: Yup.string()
        .matches(/^(07\d{8,12}|447\d{7,11})$/, 'Phone number is not valid')
        .required()
    })

  })

  return (
    <div >
      <form onSubmit={formik.handleSubmit}>
        <h1 >Register</h1>
        <div >
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name"
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.touched.name && formik.errors.name && (
            <span>{formik.errors.name}</span>
          )}
        </div>
        <div >
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.touched.email && formik.errors.email && (
            <span >{formik.errors.email}</span>
          )}
        </div>
        <div >
          <label htmlFor="number">Phone Number</label>
          <input type="text" name="number" id="number"
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.number} />
          {formik.touched.number && formik.errors.number && (
            <span >{formik.errors.number}</span>
          )}
        </div>
        <div >
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
