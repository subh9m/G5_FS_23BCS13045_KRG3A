import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common layout and providers
import { ToastProvider } from './components/common/Toast.jsx';
import Layout from './components/common/Layout.jsx';

// Instructor pages
import InstructorDashboard from './pages/instructor/Dashboard.jsx';
import Courses from './pages/instructor/Courses.jsx';
import Modules from './pages/instructor/Modules.jsx';
import Questions from './pages/instructor/Questions.jsx';
import Exams from './pages/instructor/Exams.jsx';
import Students from './pages/instructor/Students.jsx';

// Student pages
import StudentDashboard from './pages/student/Dashboard.jsx';
import StudentCourses from './pages/student/Courses.jsx';
import StudentLessons from './pages/student/Lessons.jsx';
import StudentExams from './pages/student/Exams.jsx';
import StudentProgress from './pages/student/Progress.jsx';
import StudentResults from './pages/student/Results.jsx';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Instructor Routes */}
            <Route path="/" element={<InstructorDashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/students" element={<Students />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/courses" element={<StudentCourses />} />
            <Route path="/student/lessons" element={<StudentLessons />} />
            <Route path="/student/exams" element={<StudentExams />} />
            <Route path="/student/progress" element={<StudentProgress />} />
            <Route path="/student/results" element={<StudentResults />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  );
}

export default App;
