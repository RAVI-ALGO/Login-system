
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Username from './components/Username';
import Password from './components/Password';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import Profile from './components/Profile';
import PrivateComponent from './middleware/Private';





function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Username />} />
        <Route exact path='/password' element={<Password />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/password/recover-password/:username' element={<Recovery />} />
        <Route exact path='/reset-password/:username' element={<Reset />} />
        <Route element={<PrivateComponent />}>
          <Route exact path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
