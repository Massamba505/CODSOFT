import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup.jsx'
import { Home } from './pages/Home'
import {Toaster} from "react-hot-toast";
import {useAuthContext} from "./context/AuthContext.jsx";
import { CreateProject } from './components/CreateProject.jsx'
import { ViewProject } from './components/ViewProject.jsx'
import { EditProject } from './components/EditProject.jsx'
import { CreateTask } from './components/CreateTask.jsx'
import { EditTask } from './components/EditTask.jsx'
import { ViewTask } from './components/ViewTask.jsx'
import Navbar from './components/NavBar.jsx'

function App() {
  const {authUser} = useAuthContext();
  console.log(authUser);
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path = "/" element = {authUser? <Home/> : <Navigate to = {"/login"}/>  }/>
        <Route path = "/login" element = {authUser?  <Navigate to= '/'/> : <Login /> }/>
        <Route path = "/signup" element = {authUser? <Navigate to= '/'/> : <Signup /> }/>


        <Route path = "/create-project" element = {authUser?  <CreateProject /> : <Navigate to= '/'/> }/>

        <Route path = "/projects/:id" element = {authUser?  <ViewProject /> : <Navigate to= '/'/> }/>
        <Route path = "/projects/:id/edit" element = {authUser?  <EditProject /> : <Navigate to= '/'/> }/>
        <Route path = "/projects/:id/tasks/new" element = {authUser?  <CreateTask /> : <Navigate to= '/'/> }/>
        <Route path = "/projects/:id/tasks/:taskId/edit" element = {authUser?  <EditTask /> : <Navigate to= '/'/> }/>
        <Route path = "/projects/:id/tasks/:taskId" element = {authUser?  <ViewTask /> : <Navigate to= '/'/> }/>
        
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App