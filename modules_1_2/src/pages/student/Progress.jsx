import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import { CheckCircle, Download, BookOpen } from 'lucide-react';

// --- MOCK DATA & SERVICES --- //
const progressData = {
    overallCompletion: 78,
    courseProgress: [
        { name: 'Quantum Computing', progress: 90 },
        { name: 'Cybersecurity', progress: 75 },
        { name: 'Intro to AI', progress: 60 },
        { name: 'Data Structures', progress: 85 },
    ],
    recentLessons: [
        { id: 1, lesson: "Entanglement Principles", course: "Quantum Computing", date: "2025-10-12" },
        { id: 2, lesson: "SQL Injection Attacks", course: "Cybersecurity", date: "2025-10-11" },
        { id: 3, lesson: "Neural Network Basics", course: "Intro to AI", date: "2025-10-10" },
        { id: 4, lesson: "Big O Notation", course: "Data Structures", date: "2025-10-09" },
    ],
    activity: [
        { date: 'Oct 07', minutes: 30 },
        { date: 'Oct 08', minutes: 45 },
        { date: 'Oct 09', minutes: 90 },
        { date: 'Oct 10', minutes: 60 },
        { date: 'Oct 11', minutes: 75 },
        { date: 'Oct 12', minutes: 120 },
        { date: 'Oct 13', minutes: 40 },
    ]
};

const studentService = {
  getProgressData: (studentId) => new Promise(resolve => {
    setTimeout(() => {
      resolve(progressData);
    }, 1200);
  })
};


// --- HELPER & CHILD COMPONENTS --- //
const Loader = () => (
    <div className="flex justify-center items-center h-96">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
    </div>
);

const ChartContainer = ({ title, children }) => (
    <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-500 ease-in-out">
        <h3 className="text-xl font-bold text-white tracking-wide mb-6">{title}</h3>
        <div className="h-72 w-full">
            {children}
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-sm border border-[#333] p-3 rounded-lg text-sm">
        <p className="label font-bold text-white">{`${label}`}</p>
        <p className="intro text-red-400 font-['IBM_Plex_Mono']">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-sm border border-[#333] p-3 rounded-lg text-sm">
        <p className="label font-bold text-white">{`${label}`}</p>
        <p className="intro text-red-400 font-['IBM_Plex_Mono']">{`Time: ${payload[0].value} mins`}</p>
      </div>
    );
  }
  return null;
};


// --- MAIN PROGRESS PAGE --- //
export default function Progress() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await studentService.getProgressData('student-123');
            setData(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading || !data) {
        return (
             <div className="bg-black text-gray-200 min-h-screen font-['Inter']">
                <main className="max-w-7xl mx-auto p-6 md:p-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider mb-8">Your Learning Progress</h1>
                    <Loader />
                </main>
            </div>
        )
    }

    const pieData = [
        { name: 'Completed', value: data.overallCompletion },
        { name: 'Remaining', value: 100 - data.overallCompletion }
    ];
    const COLORS = ['#ff0000', '#222222'];

    return (
        <div className="bg-black text-gray-200 min-h-screen font-['Inter']">
            <main className="max-w-7xl mx-auto p-6 md:p-10">
                 <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">Your Learning Progress</h1>
                    <button className="flex items-center justify-center gap-2 border border-[#333] text-gray-300 px-5 py-2 rounded-xl hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300 ease-in-out">
                       <Download size={16} /> Export Report
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Overall Progress */}
                    <div className="lg:col-span-1 bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-500 ease-in-out">
                         <h3 className="text-xl font-bold text-white tracking-wide mb-4">Overall Completion</h3>
                         <div className="w-48 h-48 relative">
                             <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" stroke="none">
                                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-bold font-['IBM_Plex_Mono'] text-white">{`${data.overallCompletion}%`}</span>
                            </div>
                         </div>
                    </div>
                    {/* Activity Chart */}
                    <div className="lg:col-span-2">
                        <ChartContainer title="Weekly Learning Activity">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.activity} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                     <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                                    <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomLineTooltip />} cursor={{ fill: 'rgba(255,0,0,0.1)' }}/>
                                    <Line type="monotone" dataKey="minutes" stroke="#ff0000" strokeWidth={2} dot={{ r: 4, fill: '#ff0000' }} activeDot={{ r: 8, stroke: 'rgba(255,0,0,0.3)', strokeWidth: 10, fill: '#ff0000' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Course Progress Breakdown */}
                    <ChartContainer title="Progress by Course">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.courseProgress} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid stroke="#333" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,0,0,0.1)'}}/>
                                <Bar dataKey="progress" fill="rgba(255, 0, 0, 0.6)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                     {/* Recent Lessons Table */}
                    <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 overflow-x-auto">
                        <h3 className="text-xl font-bold text-white tracking-wide mb-6">Recently Completed Lessons</h3>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#333]">
                                    <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Lesson</th>
                                    <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Course</th>
                                    <th className="p-4 text-sm font-semibold text-gray-400 font-['IBM_Plex_Mono']">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentLessons.map((item, index) => (
                                    <tr key={item.id} className="border-b border-[#333] last:border-b-0 hover:bg-red-500/10 transition-colors duration-300">
                                        <td className="p-4 text-white flex items-center gap-3"><CheckCircle size={16} className="text-green-500"/>{item.lesson}</td>
                                        <td className="p-4 text-gray-300">{item.course}</td>
                                        <td className="p-4 text-gray-400 font-['IBM_Plex_Mono']">{new Date(item.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
