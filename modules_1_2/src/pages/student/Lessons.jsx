import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, CheckCircle, ArrowLeft, ArrowRight, BookOpen, FileText, Youtube } from 'lucide-react';

// --- MOCK DATA & SERVICES --- //
const courseStructure = {
    courseId: 1,
    courseName: "Advanced Quantum Computing",
    moduleName: "Module 1: Quantum States",
    lessons: [
        { id: 'lesson-101', title: "Introduction to Qubits", type: 'text', content: "A qubit, or quantum bit, is the basic unit of quantum information... Unlike a classical bit, which can be in a state of either 0 or 1, a qubit can be in a superposition of both states simultaneously. This property is fundamental to quantum computing and allows for immense computational power. We represent a qubit's state using a vector in a two-dimensional complex Hilbert space.", completed: true },
        { id: 'lesson-102', title: "Superposition Explained (Video)", type: 'video', content: 'https://www.youtube.com/embed/z1-jZiA-a28', completed: true },
        { id: 'lesson-103', title: "Entanglement Principles", type: 'text', content: "Quantum entanglement is a phenomenon where two or more quantum particles become linked in such a way that their fates are intertwined... Measuring a property of one particle instantaneously influences the corresponding property of the other particle(s), regardless of the distance separating them. Einstein famously called this 'spooky action at a distance.'", completed: false },
        { id: 'lesson-104', title: "Reading: Quantum Gates (PDF)", type: 'pdf', content: 'https://www.flintbox.com/public/project/2456_QuantumComputingCircuits.pdf', completed: false },
        { id: 'lesson-105', title: "The Measurement Problem", type: 'text', content: "The measurement problem in quantum mechanics is the issue of how or if the wave function collapses... When a measurement is made, the qubit is forced out of its superposition and into one of the classical states, 0 or 1. The mechanism behind this collapse is one of the most debated topics in quantum physics.", completed: false },
    ]
};

const studentService = {
  getLesson: (courseId, lessonId) => new Promise(resolve => {
    setTimeout(() => {
        const lesson = courseStructure.lessons.find(l => l.id === lessonId);
        resolve({ ...courseStructure, currentLesson: lesson });
    }, 500);
  }),
  markLessonComplete: (lessonId) => new Promise(resolve => {
      setTimeout(() => {
          const lesson = courseStructure.lessons.find(l => l.id === lessonId);
          if (lesson) lesson.completed = true;
          console.log(`Lesson ${lessonId} marked as complete.`);
          resolve({ success: true });
      }, 300)
  })
};

// --- PLACEHOLDER COMPONENTS --- //
const LessonViewer = ({ lesson }) => {
    if (!lesson) return <div className="text-gray-500">Select a lesson to begin.</div>;

    switch (lesson.type) {
        case 'text':
            return (
                <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
                    <p className="text-lg leading-relaxed font-['Inter']">{lesson.content}</p>
                </div>
            );
        case 'video':
            return (
                <div className="aspect-video">
                    <iframe 
                        className="w-full h-full rounded-2xl border border-[#333] shadow-[0_0_20px_rgba(255,0,0,0.1)]"
                        src={lesson.content}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
            );
        case 'pdf':
            return (
                <div className="h-[70vh]">
                     <iframe 
                        src={`https://docs.google.com/gview?url=${lesson.content}&embedded=true`} 
                        className="w-full h-full rounded-2xl border border-[#333]"
                        frameBorder="0">
                    </iframe>
                </div>
            );
        default:
            return <div className="text-red-500">Unsupported lesson format.</div>;
    }
};

const Breadcrumb = ({ courseName, moduleName }) => (
    <nav className="flex items-center gap-2 text-sm text-gray-400 font-['IBM_Plex_Mono']">
        <Home size={16} />
        <ChevronRight size={16} />
        <span>Courses</span>
        <ChevronRight size={16} />
        <span className="text-gray-300 w-32 truncate" title={courseName}>{courseName}</span>
        <ChevronRight size={16} />
        <span className="text-white w-32 truncate" title={moduleName}>{moduleName}</span>
    </nav>
);

// --- MAIN LESSONS PAGE --- //
export default function Lessons() {
    const [lessonData, setLessonData] = useState(null);
    const [currentLessonId, setCurrentLessonId] = useState('lesson-103'); // Default to first incomplete
    const [loading, setLoading] = useState(true);
    const [completionStatus, setCompletionStatus] = useState({});

    useEffect(() => {
        const fetchLesson = async () => {
            setLoading(true);
            const data = await studentService.getLesson(1, currentLessonId);
            setLessonData(data);
            const initialStatus = data.lessons.reduce((acc, lesson) => {
                acc[lesson.id] = lesson.completed;
                return acc;
            }, {});
            setCompletionStatus(initialStatus);
            setLoading(false);
        };
        fetchLesson();
    }, [currentLessonId]);

    const handleMarkComplete = async () => {
        await studentService.markLessonComplete(currentLessonId);
        setCompletionStatus(prev => ({ ...prev, [currentLessonId]: true }));
    };

    const currentIndex = lessonData?.lessons.findIndex(l => l.id === currentLessonId) ?? -1;
    const hasPrevious = currentIndex > 0;
    const hasNext = lessonData ? currentIndex < lessonData.lessons.length - 1 : false;

    const navigateToLesson = (offset) => {
        if (!lessonData) return;
        const newIndex = currentIndex + offset;
        if (newIndex >= 0 && newIndex < lessonData.lessons.length) {
            setCurrentLessonId(lessonData.lessons[newIndex].id);
        }
    };

    const LessonIcon = ({ type }) => {
        switch (type) {
            case 'text': return <FileText size={18} />;
            case 'video': return <Youtube size={18} />;
            case 'pdf': return <BookOpen size={18} />;
            default: return <FileText size={18} />;
        }
    };
    
    if (loading || !lessonData) {
      return (
        <div className="bg-black text-gray-200 min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
        </div>
      );
    }
    
    const { courseName, moduleName, lessons, currentLesson } = lessonData;

    return (
        <div className="bg-black text-gray-200 min-h-screen font-['Inter']">
            <main className="max-w-7xl mx-auto p-6 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1 bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 self-start">
                        <h2 className="text-xl font-bold text-white mb-2 tracking-wide">{moduleName}</h2>
                        <p className="text-sm text-red-500 font-['IBM_Plex_Mono'] mb-6">Course Progress</p>
                        <ul className="space-y-2">
                           {lessons.map(lesson => (
                                <li key={lesson.id}>
                                    <button 
                                        onClick={() => setCurrentLessonId(lesson.id)}
                                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${currentLessonId === lesson.id ? 'bg-red-500/20 text-red-500' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'}`}
                                    >
                                        {completionStatus[lesson.id] ? <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> : <LessonIcon type={lesson.type} className="flex-shrink-0" />}
                                        <span className="truncate">{lesson.title}</span>
                                    </button>
                                </li>
                           ))}
                        </ul>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Breadcrumb courseName={courseName} moduleName={moduleName} />
                        <div className="mt-6 bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{currentLesson.title}</h1>
                            <LessonViewer lesson={currentLesson} />
                        </div>
                        <footer className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                             <button 
                                onClick={() => navigateToLesson(-1)}
                                disabled={!hasPrevious}
                                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#333] text-gray-300 font-semibold transition-all duration-300 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:border-red-500 hover:enabled:text-red-500">
                                <ArrowLeft size={18} /> Previous
                            </button>
                            <button 
                                onClick={handleMarkComplete}
                                disabled={completionStatus[currentLessonId]}
                                className="w-full md:w-auto px-8 py-3 rounded-xl border border-red-500 bg-red-500 text-black font-semibold hover:bg-transparent hover:text-red-500 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out disabled:bg-transparent disabled:border-green-500 disabled:text-green-500 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {completionStatus[currentLessonId] ? <><CheckCircle size={18} /> Completed</> : "Mark as Complete"}
                            </button>
                             <button 
                                onClick={() => navigateToLesson(1)}
                                disabled={!hasNext}
                                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#333] text-gray-300 font-semibold transition-all duration-300 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:border-red-500 hover:enabled:text-red-500">
                                Next <ArrowRight size={18} />
                            </button>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}

