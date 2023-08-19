
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Username from './components/Username';
import Password from './components/Password';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import Profile from './components/Profile';





function App() {
  
  return (
    <>
      <Routes>
      <Route exact path='/' element={<Username />} />
      <Route exact path='/password' element={<Password />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/password/recover-password' element={<Recovery />} />
      <Route exact path='/reset-password' element={<Reset />} />
      <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
