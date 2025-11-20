import './App.css';

import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Homepage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import CourseList from './Pages/Courses/CourseList';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/about" element={<AboutUs/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/courses" element={<CourseList/>}></Route>

      <Route path="*" element={<NotFound/>}></Route>
    </Routes>

  )
}

export default App
