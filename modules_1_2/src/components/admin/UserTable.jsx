import React, { useState, useMemo } from 'react';

// --- SVG Icon Components ---
const IconSearch = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconEdit = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconDelete = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const IconChevronLeft = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconChevronRight = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;


// --- Mock Data ---
const mockUsers = [
  { id: 1, name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'Administrator', status: 'Active' },
  { id: 2, name: 'Jamie Rivera', email: 'jamie.rivera@example.com', role: 'Instructor', status: 'Active' },
  { id: 3, name: 'Casey Jordan', email: 'casey.jordan@example.com', role: 'Instructor', status: 'Suspended' },
  { id: 4, name: 'Taylor Kim', email: 'taylor.kim@example.com', role: 'Instructor', status: 'Active' },
  // ...add more users to test pagination
];

const UserTable = ({ onEditUser, onDeleteUser }) => {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ role: 'All', status: 'All' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(user => filters.role === 'All' || user.role === filters.role)
      .filter(user => filters.status === 'All' || user.status === filters.status);
  }, [users, searchTerm, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'Active' ? 'bg-black/10 text-black' : 'bg-black/5 text-black/50'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="bg-white border border-black/10 rounded-lg shadow-sm">
      {/* Table Header: Search and Filters */}
      <div className="p-4 border-b border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-9 pr-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select name="role" value={filters.role} onChange={handleFilterChange} className="w-full sm:w-auto px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="All">All Roles</option>
            <option value="Administrator">Administrator</option>
            <option value="Instructor">Instructor</option>
          </select>
          <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full sm:w-auto px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-black/5 text-xs text-black/60 uppercase tracking-wider">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-black/5">
                  <td className="p-4 font-semibold">{user.name}</td>
                  <td className="p-4 text-black/70">{user.email}</td>
                  <td className="p-4 text-black/70">{user.role}</td>
                  <td className="p-4"><StatusBadge status={user.status} /></td>
                  <td className="p-4">
                    <div className="flex justify-end items-center gap-2">
                      <button onClick={() => onEditUser(user)} className="p-2 text-black/60 hover:text-black transition-colors" title="Edit User"><IconEdit className="w-4 h-4" /></button>
                      <button onClick={() => onDeleteUser(user.id)} className="p-2 text-black/60 hover:text-red-500 transition-colors" title="Delete User"><IconDelete className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-8 text-black/50">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-black/10 flex items-center justify-between text-sm">
        <span className="text-black/60">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 disabled:opacity-40"><IconChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 disabled:opacity-40"><IconChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;