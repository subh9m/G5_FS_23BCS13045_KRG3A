import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import global providers and layout with correct relative paths
import { ToastProvider } from './components/common/Toast.jsx';
import Layout from './components/common/Layout.jsx';

// Import all the instructor pages you have created
import InstructorDashboard from './pages/instructor/Dashboard.jsx';
import Courses from './pages/instructor/Courses.jsx';
import Modules from './pages/instructor/Modules.jsx';
import Questions from './pages/instructor/Questions.jsx';
import Exams from './pages/instructor/Exams.jsx';
import Students from './pages/instructor/Students.jsx';

function App() {
  return (
    // The ToastProvider makes notifications available everywhere
    <ToastProvider>
      {/* The Router enables client-side navigation */}
      <Router>
        {/* The Layout provides the consistent Navbar and Sidebar */}
        <Layout>
          {/* The Routes component renders the correct page based on the URL */}
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

