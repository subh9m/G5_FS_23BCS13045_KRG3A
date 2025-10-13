import React, { useState, useEffect } from 'react';
import { BookOpen, ClipboardCheck, Target, Clock, ArrowRight, Calendar, BarChart2 } from 'lucide-react';

// --- MOCK DATA & SERVICES --- //
// In a real app, this would come from an API call
const studentService = {
  getDashboardStats: () => new Promise(resolve => setTimeout(() => resolve({
    coursesEnrolled: 8,
    examsTaken: 5,
    avgScore: 87.5,
    completionPercentage: 65,
  }), 1000)),
  getEnrolledCourses: () => new Promise(resolve => setTimeout(() => resolve([
    { id: 1, title: "Advanced Quantum Computing", instructor: "Dr. Evelyn Reed", progress: 75, thumbnail: `https://placehold.co/600x400/000000/ff0000?text=AQC` },
    { id: 2, title: "Neural Network Architectures", instructor: "Prof. Kenji Tanaka", progress: 45, thumbnail: `https://placehold.co/600x400/000000/ff0000?text=NNA` },
    { id: 3, title: "Crytographic Systems Design", instructor: "Dr. Anya Sharma", progress: 90, thumbnail: `https://placehold.co/600x400/000000/ff0000?text=CSD` },
  ]), 1000)),
};

const examService = {
  getUpcomingExams: (studentId) => new Promise(resolve => setTimeout(() => resolve([
    { id: 'exam-101', title: "Mid-Term Assessment", course: "Advanced Quantum Computing", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), status: "Starts in 2 days" },
    { id: 'exam-102', title: "Module 3 Quiz", course: "Neural Network Architectures", date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), status: "Starts in 5 days" },
  ]), 1000)),
};

// --- PLACEHOLDER COMPONENTS (as defined in the folder structure) --- //

const StudentDashboardCards = ({ stats }) => {
  const cardData = [
    { label: "Courses Enrolled", value: stats.coursesEnrolled, icon: BookOpen },
    { label: "Exams Taken", value: stats.examsTaken, icon: ClipboardCheck },
    { label: "Average Score", value: `${stats.avgScore}%`, icon: Target },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardData.map((item, index) => (
        <div key={index} className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <h3 className="text-gray-400 font-light tracking-wider">{item.label}</h3>
            <item.icon className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-4xl lg:text-5xl font-['IBM_Plex_Mono'] text-white mt-4">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

const CourseCard = ({ course }) => (
  <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1">
    <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
    <div className="p-5">
      <h3 className="text-lg font-bold text-white mb-1 truncate">{course.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{course.instructor}</p>
      <div className="w-full bg-[#333] rounded-full h-2.5">
        <div className="bg-red-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
      </div>
      <div className="flex justify-between items-center mt-2 text-sm font-['IBM_Plex_Mono']">
        <span className="text-gray-400">Progress</span>
        <span className="text-white">{course.progress}%</span>
      </div>
    </div>
  </div>
);


// --- MAIN DASHBOARD PAGE --- //

export default function Dashboard() {
  const [studentName] = useState("Alex"); // Placeholder for auth user name
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, coursesData, examsData] = await Promise.all([
          studentService.getDashboardStats(),
          studentService.getEnrolledCourses(),
          examService.getUpcomingExams('student-123') // Placeholder ID
        ]);
        setStats(statsData);
        setCourses(coursesData);
        setExams(examsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-gray-200 min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-gray-200 min-h-screen font-['Inter']">
      <main className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome, <span className="text-red-500">{studentName}</span></h1>
          <p className="text-gray-400 mt-2 text-lg">Here's a snapshot of your learning journey today.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content: Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {stats && <StudentDashboardCards stats={stats} />}

            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-wide">Active Courses</h2>
                <button className="flex items-center gap-2 text-red-500 hover:text-white transition-colors duration-300">
                  View All Courses <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Right Column */}
          <div className="lg:col-span-1 space-y-8">
            {stats && (
              <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 text-center transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1">
                <BarChart2 className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">Keep up the momentum!</h3>
                <p className="text-gray-400 mt-1">You've completed <span className="font-['IBM_Plex_Mono'] text-red-500 font-bold">{stats.completionPercentage}%</span> of your modules.</p>
              </div>
            )}
            
            <section className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,0,0.25)]">
              <h2 className="text-xl font-bold text-white mb-5 tracking-wide">Upcoming Exams</h2>
              <div className="space-y-5">
                {exams.length > 0 ? exams.map(exam => (
                  <div key={exam.id} className="bg-[#0a0a0a] p-4 rounded-xl border border-transparent hover:border-red-500 transition-all duration-300 group">
                    <p className="font-semibold text-white">{exam.title}</p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{exam.course}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-400 font-['IBM_Plex_Mono']">
                        <Calendar className="w-4 h-4" />
                        <span>{exam.status}</span>
                      </div>
                      <button className="border border-red-500 text-red-500 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-black hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out transform hover:scale-105">
                        Start Exam
                      </button>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center py-4">No upcoming exams. Enjoy the break!</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
