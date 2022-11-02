import React from 'react';
import './App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Main from './Main';
import { Link } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Registered from './Registered';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Registered />} />
      </Routes>
  );
}

export default App;
