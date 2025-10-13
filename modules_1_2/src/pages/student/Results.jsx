import React, { useState, useEffect } from 'react';
import { ChevronDown, Printer, X, CheckCircle, XCircle, Eye } from 'lucide-react';

// --- MOCK DATA & SERVICES --- //
const mockResults = [
    { id: 'res-01', examName: "Module 1 Assessment", course: "Introduction to AI", date: "2025-10-05", score: 88, status: "Passed" },
    { id: 'res-02', examName: "Quiz: Data Structures", course: "Data Structures & Algorithms", date: "2025-09-28", score: 95, status: "Passed" },
    { id: 'res-03', examName: "Mid-Term Exam", course: "Cybersecurity Fundamentals", date: "2025-09-15", score: 65, status: "Passed" },
    { id: 'res-04', examName: "Initial Assessment", course: "Advanced Quantum Computing", date: "2025-09-02", score: 45, status: "Failed" },
];

const mockAttemptDetails = {
    'res-01': {
        examName: "Module 1 Assessment",
        score: 88,
        questions: [
            { q: "What is the primary goal of supervised learning?", chosen: "To classify data or predict outcomes accurately.", correct: "To classify data or predict outcomes accurately.", feedback: "Correct. Supervised learning uses labeled data to train models." },
            { q: "Which algorithm is not a classification algorithm?", chosen: "K-Means", correct: "K-Means", feedback: "Correct. K-Means is a clustering (unsupervised) algorithm." },
            { q: "What does 'overfitting' mean in machine learning?", chosen: "The model performs well on training data but poorly on new data.", correct: "The model performs well on training data but poorly on new data.", feedback: "Correct. Overfitting occurs when the model learns the training data too well, including its noise." },
            { q: "What is a neural network?", chosen: "A type of tree-based model.", correct: "A series of algorithms that mimic the operations of a human brain.", feedback: "Your answer was incorrect. Neural networks are inspired by the human brain, not tree-based models like Decision Trees." },
        ]
    }
};

const examService = {
  getStudentResults: (studentId) => new Promise(resolve => {
    setTimeout(() => resolve(mockResults), 1000);
  }),
  getAttemptDetails: (attemptId) => new Promise(resolve => {
    setTimeout(() => resolve(mockAttemptDetails[attemptId]), 600);
  })
};

// --- HELPER & CHILD COMPONENTS --- //
const Loader = ({ simple = false }) => (
    <div className={`flex justify-center items-center ${simple ? 'h-full' : 'h-96'}`}>
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
    </div>
);

const StatusBadge = ({ status }) => {
    const isPassed = status === "Passed";
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full font-['IBM_Plex_Mono'] ${isPassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isPassed ? <CheckCircle size={14} /> : <XCircle size={14} />}
            {status}
        </span>
    );
};

const AttemptReviewModal = ({ attemptId, onClose }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!attemptId) return;
        const fetchDetails = async () => {
            setLoading(true);
            const data = await examService.getAttemptDetails(attemptId);
            setDetails(data);
            setLoading(false);
        };
        fetchDetails();
    }, [attemptId]);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50 transition-opacity duration-300 ease-in-out" onClick={onClose}>
            <div className="bg-black border border-[#333] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_0_40px_rgba(255,0,0,0.2)]" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-6 border-b border-[#333]">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">Exam Review</h2>
                        {details && <p className="text-sm text-red-500 font-['IBM_Plex_Mono']">{details.examName}</p>}
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </header>
                <main className="p-6 overflow-y-auto">
                    {loading ? <Loader simple /> : (
                        details ? (
                            <div className="space-y-6">
                                {details.questions.map((item, index) => {
                                    const isCorrect = item.chosen === item.correct;
                                    return (
                                    <div key={index} className="border border-[#333] rounded-xl p-4">
                                        <p className="font-semibold text-white mb-3">Q{index+1}: {item.q}</p>
                                        <div className={`p-3 rounded-lg text-sm mb-2 ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                            <p className="font-bold text-gray-400 mb-1">Your Answer:</p>
                                            <p className={`${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{item.chosen}</p>
                                        </div>
                                         {!isCorrect && (
                                            <div className="p-3 rounded-lg bg-gray-500/10 text-sm mb-2">
                                                <p className="font-bold text-gray-400 mb-1">Correct Answer:</p>
                                                <p className="text-gray-300">{item.correct}</p>
                                            </div>
                                         )}
                                        <p className="text-xs text-gray-400 italic mt-3">{item.feedback}</p>
                                    </div>
                                )})}
                            </div>
                        ) : <p className="text-gray-400 text-center">Could not load attempt details.</p>
                    )}
                </main>
                <footer className="p-6 border-t border-[#333] flex justify-end gap-4">
                    <button className="flex items-center gap-2 text-gray-300 border border-[#333] px-4 py-2 rounded-xl hover:border-red-500 hover:text-red-500 transition-all duration-300">
                        <Printer size={16} /> Print
                    </button>
                </footer>
            </div>
        </div>
    );
};

// --- MAIN RESULTS PAGE --- //
export default function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAttemptId, setSelectedAttemptId] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            const data = await examService.getStudentResults('student-123');
            setResults(data);
            setLoading(false);
        };
        fetchResults();
    }, []);

    const handleViewDetails = (attemptId) => {
        setSelectedAttemptId(attemptId);
    };
    
    return (
        <div className="bg-black text-gray-200 min-h-screen font-['Inter']">
            <main className="max-w-7xl mx-auto p-6 md:p-10">
                 <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">Exam Results</h1>
                     <div className="flex gap-4">
                         <div className="relative">
                            <select className="bg-black/60 border border-[#333] text-gray-300 text-sm rounded-xl pl-4 pr-10 py-2.5 appearance-none focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] transition-all">
                                 <option>Filter by Course</option>
                                 <option>Quantum Computing</option>
                                 <option>Cybersecurity</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                         </div>
                     </div>
                </div>
                
                {loading ? <Loader /> : (
                <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead>
                            <tr className="border-b border-[#333]">
                                <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Exam Name</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Course</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Date</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Score</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(item => (
                                <tr key={item.id} className="border-b border-[#333] last:border-b-0 hover:bg-red-500/10 transition-colors duration-300">
                                    <td className="p-4 text-white font-semibold">{item.examName}</td>
                                    <td className="p-4 text-gray-300">{item.course}</td>
                                    <td className="p-4 text-gray-400 font-['IBM_Plex_Mono']">{item.date}</td>
                                    <td className={`p-4 font-bold font-['IBM_Plex_Mono'] ${item.status === 'Passed' ? 'text-green-400' : 'text-red-400'}`}>{item.score}%</td>
                                    <td className="p-4"><StatusBadge status={item.status} /></td>
                                    <td className="p-4">
                                        <button onClick={() => handleViewDetails(item.id)} className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors text-sm">
                                            <Eye size={16} /> View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </main>

            {selectedAttemptId && <AttemptReviewModal attemptId={selectedAttemptId} onClose={() => setSelectedAttemptId(null)} />}
        </div>
    );
}
