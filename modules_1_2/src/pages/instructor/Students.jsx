import React, { useState, useMemo } from 'react';

// --- Mock Data ---
// In a real application, this would be fetched from an API.
const mockStudents = [
    { id: 1, name: 'Casey Jordan', course: 'Advanced JavaScript', progress: 85, lastActivity: '2025-10-11', score: 92, status: 'Active' },
    { id: 2, name: 'Alex Smith', course: 'React for Beginners', progress: 100, lastActivity: '2025-10-12', score: 88, status: 'Active' },
    { id: 3, name: 'Jordan Lee', course: 'Data Structures 101', progress: 45, lastActivity: '2025-10-09', score: null, status: 'Inactive' },
    { id: 4, name: 'Taylor Kim', course: 'Advanced JavaScript', progress: 95, lastActivity: '2025-10-12', score: 95, status: 'Active' },
    { id: 5, name: 'Morgan Riley', course: 'React for Beginners', progress: 25, lastActivity: '2025-09-20', score: null, status: 'Active' },
];

const Students = () => {
    const [filters, setFilters] = useState({
        course: 'All',
        status: 'All',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredStudents = useMemo(() => {
        return mockStudents
            .filter(student => filters.course === 'All' || student.course === filters.course)
            .filter(student => filters.status === 'All' || student.status === filters.status);
    }, [filters]);

    const StatusBadge = ({ status }) => (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full font-mono ${
            status === 'Active' ? 'bg-red-500/10 text-red-500' : 'bg-white/5 text-gray-400'
        }`}>
          {status}
        </span>
    );
    
    // Get a unique list of courses for the filter dropdown
    const courses = [...new Set(mockStudents.map(s => s.course))];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100 font-mono tracking-wider">Students</h1>
                <p className="mt-2 text-gray-400">View progress and performance of your students.</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <select 
                    name="course"
                    value={filters.course}
                    onChange={handleFilterChange}
                    className="w-full sm:w-64 px-4 py-2 bg-transparent border border-[#333] text-gray-300 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] transition-all duration-300"
                >
                    <option value="All">All Courses</option>
                    {courses.map(course => <option key={course} value={course}>{course}</option>)}
                </select>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange} 
                    className="w-full sm:w-auto px-4 py-2 bg-transparent border border-[#333] text-gray-300 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] transition-all duration-300"
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* Students Table */}
            <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-black/40 text-xs text-gray-400 uppercase tracking-wider font-mono">
                            <tr>
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Course</th>
                                <th className="px-6 py-4">Progress</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Last Activity</th>
                                <th className="px-6 py-4 text-right">Avg. Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-white/5 transition-colors duration-300 ease-in-out">
                                        <td className="px-6 py-4 font-semibold text-gray-200">{student.name}</td>
                                        <td className="px-6 py-4 text-gray-300">{student.course}</td>
                                        <td className="px-6 py-4 text-gray-300 font-mono">{student.progress}%</td>
                                        <td className="px-6 py-4"><StatusBadge status={student.status} /></td>
                                        <td className="px-6 py-4 text-gray-300 font-mono">{student.lastActivity}</td>
                                        <td className="px-6 py-4 text-right font-semibold text-gray-200 font-mono">
                                            {student.score !== null ? `${student.score}%` : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-16 text-gray-500 font-mono tracking-wider">
                                        No students found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Students;