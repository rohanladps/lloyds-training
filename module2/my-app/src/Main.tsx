import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Registered from './Registered';

const Main = () => {
  return (
    <Routes>
      <Route path='/registered' element={<Registered/>}></Route>
    </Routes>
  );
}

export default Main;