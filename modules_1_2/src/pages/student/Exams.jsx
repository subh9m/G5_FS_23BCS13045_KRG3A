import React, { useState, useEffect } from 'react';
import { FileText, Clock, Calendar, PlayCircle, BarChart2 } from 'lucide-react';

// --- MOCK DATA & SERVICES --- //
const now = new Date();
const mockExams = [
    { id: 'exam-01', title: "Mid-Term Quantum Mechanics Test", courseName: "Advanced Quantum Computing", timeLimit: "90 mins", status: 'Available', scheduledDate: new Date(now.getTime() - 1 * 60 * 60 * 1000) }, // Available now
    { id: 'exam-02', title: "Final Exam: Cryptography", courseName: "Cybersecurity Fundamentals", timeLimit: "120 mins", status: 'Upcoming', scheduledDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000) }, // Upcoming in 2 days
    { id: 'exam-03', title: "Module 1 Assessment", courseName: "Introduction to AI", timeLimit: "45 mins", status: 'Completed', score: '88%', scheduledDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
    { id: 'exam-04', title: "Practical Lab Exam", courseName: "Advanced Quantum Computing", timeLimit: "180 mins", status: 'Upcoming', scheduledDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000) },
    { id: 'exam-05', title: "Quiz: Data Structures", courseName: "Data Structures & Algorithms", timeLimit: "30 mins", status: 'Completed', score: '95%', scheduledDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000) },
];

const examService = {
  getStudentExams: (studentId) => new Promise(resolve => {
    setTimeout(() => {
      resolve(mockExams);
    }, 1000);
  })
};

// --- HELPER & CHILD COMPONENTS --- //
const Loader = () => (
    <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
    </div>
);

const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full font-['IBM_Plex_Mono']";
    const statusClasses = {
        'Available': 'bg-green-500/20 text-green-400',
        'Upcoming': 'bg-yellow-500/20 text-yellow-400',
        'Completed': 'bg-blue-500/20 text-blue-400',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];
    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval] && interval !== 'seconds') return;
        if (timerComponents.length > 0 || timeLeft[interval] > 0) {
             timerComponents.push(
                <span key={interval} className="text-white">{timeLeft[interval]}<span className="text-gray-500">{interval.charAt(0)}</span></span>
            );
        }
    });

    return (
        <div className="font-['IBM_Plex_Mono'] text-sm space-x-2">
            <span className="text-gray-400">Starts in:</span>
            {timerComponents.length ? timerComponents : <span className="text-gray-500">Time's up!</span>}
        </div>
    );
};

const ExamCard = ({ exam }) => (
    <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
        <div>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white tracking-wide pr-4">{exam.title}</h3>
                <StatusBadge status={exam.status} />
            </div>
            <p className="text-sm text-red-500 font-['IBM_Plex_Mono'] mb-6">{exam.courseName}</p>
            
            <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-center gap-3">
                    <Clock size={16} className="text-gray-500" />
                    <span className="font-['IBM_Plex_Mono']">{exam.timeLimit}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="font-['IBM_Plex_Mono']">{new Date(exam.scheduledDate).toLocaleDateString()}</span>
                </div>
                 {exam.status === 'Upcoming' && <Countdown targetDate={exam.scheduledDate} />}
            </div>
        </div>
        <div className="mt-8">
            {exam.status === 'Available' && (
                <button className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 px-5 py-2.5 rounded-xl hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out">
                    <PlayCircle size={18} /> Start Exam
                </button>
            )}
            {exam.status === 'Completed' && (
                 <button className="w-full flex items-center justify-center gap-2 border border-[#444] text-gray-300 px-5 py-2.5 rounded-xl hover:border-red-500 hover:text-red-500 transition-all duration-300 ease-in-out">
                    <BarChart2 size={18} /> View Results ({exam.score})
                </button>
            )}
             {exam.status === 'Upcoming' && (
                 <button disabled className="w-full flex items-center justify-center gap-2 border border-[#333] text-gray-500 px-5 py-2.5 rounded-xl cursor-not-allowed">
                    <PlayCircle size={18} /> Not Available Yet
                </button>
            )}
        </div>
    </div>
);


// --- MAIN EXAMS PAGE --- //
export default function Exams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Active');

    useEffect(() => {
        const fetchExams = async () => {
            setLoading(true);
            const data = await examService.getStudentExams('student-123');
            setExams(data);
            setLoading(false);
        };
        fetchExams();
    }, []);

    const activeExams = exams.filter(e => e.status === 'Active' || e.status === 'Upcoming' || e.status === 'Available');
    const completedExams = exams.filter(e => e.status === 'Completed');
    
    const displayedExams = activeTab === 'Active' ? activeExams : completedExams;

    return (
        <div className="bg-black text-gray-200 min-h-screen font-['Inter']">
            <main className="max-w-7xl mx-auto p-6 md:p-10">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">My Exams</h1>
                    <div className="flex items-center border border-[#333] bg-black/60 rounded-xl p-1">
                        <button 
                            onClick={() => setActiveTab('Active')}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out ${activeTab === 'Active' ? 'bg-red-500/20 text-red-400' : 'text-gray-400 hover:text-white'}`}>
                            Active Exams
                        </button>
                        <button 
                            onClick={() => setActiveTab('Completed')}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out ${activeTab === 'Completed' ? 'bg-red-500/20 text-red-400' : 'text-gray-400 hover:text-white'}`}>
                            Completed Exams
                        </button>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {displayedExams.length > 0 ? (
                           displayedExams.map(exam => <ExamCard key={exam.id} exam={exam} />)
                       ) : (
                           <div className="md:col-span-2 lg:col-span-3 text-center py-16 bg-black/60 border border-[#333] rounded-2xl">
                               <FileText size={48} className="mx-auto text-gray-600 mb-4" />
                               <h3 className="text-xl font-bold text-white">No Exams Found</h3>
                               <p className="text-gray-400 mt-2">There are no {activeTab.toLowerCase()} exams to show right now.</p>
                           </div>
                       )}
                    </div>
                )}
            </main>
        </div>
    );
}
