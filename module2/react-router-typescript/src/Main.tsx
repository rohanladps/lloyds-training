import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registered from './components/Registered';

const Main = () => {
return (         
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/registered' element={<Registered/>} />
  </Routes>
  </BrowserRouter>
);
}
export default Main;