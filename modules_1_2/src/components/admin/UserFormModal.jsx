import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal'; // Assuming Modal is in common/
import { useToast } from '../common/Toast'; // Assuming Toast is in common/

const UserFormModal = ({ isOpen, onClose, userToEdit }) => {
  const isEditing = !!userToEdit;
  const showToast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Instructor',
    status: 'Active',
    password: '',
  });

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
        status: userToEdit.status,
        password: '', // Password is not pre-filled for security
      });
    } else {
      // Reset form when opening for a new user
      setFormData({ name: '', email: '', role: 'Instructor', status: 'Active', password: '' });
    }
  }, [userToEdit, isEditing, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- Mock API call ---
    console.log('Submitting user data:', formData);
    showToast(isEditing ? 'User updated successfully!' : 'User created successfully!', 'success');
    onClose(); // Close modal on successful submission
  };

  const modalTitle = isEditing ? 'Edit User' : 'Add New User';
  
  const renderFooter = () => (
    <>
      <button 
        type="button" 
        onClick={onClose} 
        className="px-4 py-2 bg-white border border-black/20 rounded-md text-sm font-semibold hover:bg-black/5 transition-colors">
        Cancel
      </button>
      <button 
        type="submit" 
        form="user-form"
        className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        {isEditing ? 'Update User' : 'Save User'}
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle} footer={renderFooter()}>
      <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-black/80 mb-1">Full Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black/80 mb-1">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-black/80 mb-1">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required={!isEditing} placeholder={isEditing ? 'Leave blank to keep current password' : ''} className="w-full px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-black/80 mb-1">Role</label>
              <select name="role" id="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Instructor</option>
                <option>Administrator</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-black/80 mb-1">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;