import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import ManageToDo from './Components/ManageToDo';
import Login from './Components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';  
import RequireAuth from './Components/RequireAuth';

function App() {
  return (
    <div className=''>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>

          <Route path='/manage-todo' element={
            <RequireAuth><ManageToDo></ManageToDo></RequireAuth>
          }></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
