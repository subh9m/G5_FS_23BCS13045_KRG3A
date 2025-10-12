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
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            status === 'Active' ? 'bg-black/10 text-black' : 'bg-black/5 text-black/50'
        }`}>
          {status}
        </span>
    );
    
    // Get a unique list of courses for the filter dropdown
    const courses = [...new Set(mockStudents.map(s => s.course))];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-black">Students</h1>
                <p className="mt-1 text-black/60">View progress and performance of your students.</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <select 
                    name="course"
                    value={filters.course}
                    onChange={handleFilterChange}
                    className="w-full sm:w-64 px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="All">All Courses</option>
                    {courses.map(course => <option key={course} value={course}>{course}</option>)}
                </select>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange} 
                    className="w-full sm:w-auto px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* Students Table */}
            <div className="bg-white border border-black/10 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-black/5 text-xs text-black/60 uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Student Name</th>
                                <th className="p-4">Course</th>
                                <th className="p-4">Progress</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Last Activity</th>
                                <th className="p-4 text-right">Avg. Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/10">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-black/5">
                                        <td className="p-4 font-semibold">{student.name}</td>
                                        <td className="p-4 text-black/70">{student.course}</td>
                                        <td className="p-4 text-black/70">{student.progress}%</td>
                                        <td className="p-4"><StatusBadge status={student.status} /></td>
                                        <td className="p-4 text-black/70">{student.lastActivity}</td>
                                        <td className="p-4 text-right font-semibold">
                                            {student.score !== null ? `${student.score}%` : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-8 text-black/50">
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
