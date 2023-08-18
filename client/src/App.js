
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Register from './components/Register';





function App() {
  return (
    <>
      <Routes>
      <Route exact path='/' element={<LoginPage />} />
      <Route exact path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
