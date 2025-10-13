import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, CheckCircle, ArrowRight, Book, Library } from 'lucide-react';

// --- MOCK DATA & SERVICES --- //
const allCoursesData = [
    { id: 1, title: "Advanced Quantum Computing", instructor: "Dr. Evelyn Reed", description: "Explore the bleeding edge of computation.", thumbnail: `https://placehold.co/600x400/000000/ff0000?text=AQC` },
    { id: 2, title: "Neural Network Architectures", instructor: "Prof. Kenji Tanaka", description: "Design and build deep learning models.", thumbnail: `https://placehold.co/600x400/000000/ff0000?text=NNA` },
    { id: 3, title: "Crytographic Systems Design", instructor: "Dr. Anya Sharma", description: "Learn to secure modern information systems.", thumbnail: `https://placehold.co/600x400/000000/ff0000?text=CSD` },
    { id: 4, title: "Applied General Relativity", instructor: "Dr. Ivan Petrov", description: "Understand gravity's role in the cosmos.", thumbnail: `https://placehold.co/600x400/000000/ff0000?text=AGR` },
    { id: 5, title: "Synthetic Biology Frontiers", instructor: "Dr. Lena Holloway", description: "Engineer biological systems from scratch.", thumbnail: `https://placehold.co/600x400/000000/ff0000?text=SBF` },
    { id: 6, title: "Human-Computer Symbiosis", instructor: "Prof. Max Chen", description: "Merging human cognition with AI.", thumbnail: `https://placehold.co/600x400/000000/ff0000?text=HCS` },
];

const enrolledCoursesData = [
    { courseId: 1, progress: 75 },
    { courseId: 3, progress: 90 },
];

const courseService = {
  getAllCourses: () => new Promise(resolve => setTimeout(() => resolve(allCoursesData), 800)),
};

const studentService = {
  getEnrolledCourses: () => new Promise(resolve => setTimeout(() => resolve(enrolledCoursesData), 800)),
  enrollCourse: (courseId) => new Promise(resolve => setTimeout(() => {
    console.log(`Enrolled in course ${courseId}`);
    enrolledCoursesData.push({ courseId, progress: 0 });
    resolve({ success: true });
  }, 500)),
};

// --- PLACEHOLDER COMPONENTS --- //

const ProgressTracker = ({ progress }) => (
    <div>
        <div className="flex justify-between items-center mt-2 mb-2 text-sm font-['IBM_Plex_Mono']">
            <span className="text-gray-400">Progress</span>
            <span className="text-white">{progress}%</span>
        </div>
        <div className="w-full bg-[#333] rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);

const EnrollmentModal = ({ course, onClose, onConfirm }) => {
    if (!course) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-black border border-[#333] rounded-2xl p-8 max-w-md w-full shadow-lg shadow-red-500/10 animate-fade-in">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Confirm Enrollment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-300">
                        <X size={24} />
                    </button>
                </div>
                <p className="text-gray-300 mt-4">Are you sure you want to enroll in:</p>
                <p className="text-red-500 font-semibold text-lg mt-2">{course.title}</p>
                <div className="flex justify-end gap-4 mt-8">
                    <button onClick={onClose} className="px-5 py-2 rounded-xl text-gray-300 hover:text-white transition-colors">Cancel</button>
                    <button 
                        onClick={() => onConfirm(course.id)} 
                        className="border border-red-500 bg-red-500 text-black px-6 py-2 rounded-xl font-semibold hover:bg-transparent hover:text-red-500 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const Toast = ({ message, isVisible }) => (
    <div className={`fixed bottom-10 right-10 bg-black border border-red-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-red-500/20 flex items-center gap-3 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <CheckCircle className="text-red-500" />
        <span>{message}</span>
    </div>
);

const CourseCard = ({ course, isEnrolled, progress, onEnroll, onContinue }) => (
    <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 flex flex-col">
        <div className="relative">
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            {isEnrolled && <div className="absolute top-3 right-3 bg-red-500/80 backdrop-blur-sm text-black font-bold text-xs px-3 py-1 rounded-full font-['IBM_Plex_Mono']">ENROLLED</div>}
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-white mb-1 truncate">{course.title}</h3>
            <p className="text-sm text-gray-400 mb-4 flex-grow">{course.description}</p>
            {isEnrolled ? (
                <>
                    <ProgressTracker progress={progress} />
                    <button onClick={() => onContinue(course.id)} className="w-full mt-4 border border-red-500 text-red-500 px-5 py-2 rounded-xl font-semibold hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out flex items-center justify-center gap-2">
                        Continue <ArrowRight size={18} />
                    </button>
                </>
            ) : (
                <button onClick={() => onEnroll(course)} className="w-full mt-auto border border-[#555] text-gray-300 px-5 py-2 rounded-xl font-semibold hover:border-red-500 hover:text-red-500 transition-all duration-300 ease-in-out">
                    Enroll
                </button>
            )}
        </div>
    </div>
);


// --- MAIN COURSES PAGE --- //

export default function Courses() {
    const [allCourses, setAllCourses] = useState([]);
    const [enrolledMap, setEnrolledMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [coursesData, enrolledData] = await Promise.all([
                courseService.getAllCourses(),
                studentService.getEnrolledCourses()
            ]);
            setAllCourses(coursesData);
            const enrolledCourseMap = enrolledData.reduce((acc, item) => {
                acc[item.courseId] = item.progress;
                return acc;
            }, {});
            setEnrolledMap(enrolledCourseMap);
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(""), 3000);
    };

    const handleEnrollConfirm = async (courseId) => {
        const result = await studentService.enrollCourse(courseId);
        if (result.success) {
            setEnrolledMap(prev => ({ ...prev, [courseId]: 0 }));
            setSelectedCourse(null);
            showToast("Successfully enrolled!");
        }
    };
    
    const filteredCourses = useMemo(() => {
        return allCourses
            .filter(course => {
                if (filter === "enrolled") return !!enrolledMap[course.id];
                if (filter === "available") return !enrolledMap[course.id];
                return true;
            })
            .filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [allCourses, enrolledMap, filter, searchTerm]);

    const FilterChip = ({ value, label, icon: Icon }) => (
        <button
            onClick={() => setFilter(value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm ${filter === value ? 'bg-red-500 text-black' : 'bg-black/60 border border-[#333] text-gray-300 hover:border-red-500 hover:text-white'}`}>
            <Icon size={16} />
            {label}
        </button>
    );

    if (loading) {
        return (
            <div className="bg-black text-gray-200 min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-black text-gray-200 min-h-screen font-['Inter']">
            <main className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
                <header>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Course Catalog</h1>
                    <p className="text-gray-400 mt-2 text-lg">Explore, enroll, and continue your learning journey.</p>
                </header>

                <div className="space-y-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search for a course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border border-[#333] text-gray-100 rounded-xl pl-12 pr-4 py-3 focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] outline-none transition-all duration-300"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <FilterChip value="all" label="All Courses" icon={Library}/>
                        <FilterChip value="enrolled" label="My Courses" icon={Book}/>
                        <FilterChip value="available" label="Available" icon={CheckCircle}/>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map(course => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isEnrolled={enrolledMap[course.id] !== undefined}
                            progress={enrolledMap[course.id] || 0}
                            onEnroll={setSelectedCourse}
                            onContinue={(id) => console.log(`Continue course ${id}`)}
                        />
                    ))}
                </div>
                 {filteredCourses.length === 0 && (
                    <div className="text-center py-20 col-span-full">
                        <p className="text-gray-500 text-xl">No courses found.</p>
                        <p className="text-gray-600">Try adjusting your search or filter.</p>
                    </div>
                 )}
            </main>
            <EnrollmentModal 
                course={selectedCourse} 
                onClose={() => setSelectedCourse(null)} 
                onConfirm={handleEnrollConfirm}
            />
            <Toast message={toastMessage} isVisible={!!toastMessage} />
        </div>
    );
}
