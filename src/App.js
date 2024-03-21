import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Attendance from './components/Attendance'; // Import Attendance component
import ClassroomStudent from './components/ClassroomStudent'
import FormInputData from './components/FormInputData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/student/Dashboard" element={<StudentDashboard />} />
        <Route exact path="/teacher/Dashboard" element={<TeacherDashboard />} />
        <Route exact path="/attendance" element={<Attendance />} /> {/* เพิ่มเส้นทางสำหรับ "/attendance" */}
        <Route exact path="/classroom" element={<ClassroomStudent />} />
        <Route exact path="/formInputData" element={<FormInputData />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
