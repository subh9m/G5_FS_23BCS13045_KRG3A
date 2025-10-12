import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your global providers and layout
import { ToastProvider } from './components/common/Toast';
import Layout from './components/common/Layout';

// Final, correct import with lowercase 'b' in Dashboard
import InstructorDashboard from './pages/instructor/Dashboard'; 
import Courses from './pages/instructor/Courses';
import Modules from './pages/instructor/Modules';
import Questions from './pages/instructor/Questions';
import Exams from './pages/instructor/Exams';
import Students from './pages/instructor/Students';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<InstructorDashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/students" element={<Students />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  );
}

export default App;

