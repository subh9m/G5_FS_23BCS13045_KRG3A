// src/App.jsx or a layout component

import React from 'react';
import Navbar from './components/common/Navbar';

function App() {
  // You can fetch user data and pass it as a prop
  const loggedInUser = {
    name: 'Jamie Rivera',
    role: 'Instructor',
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar user={loggedInUser} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* The rest of your page content goes here */}
        <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
      </main>
    </div>
  );
}

export default App;