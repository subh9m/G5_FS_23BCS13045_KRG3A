import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Custom hook for the count-up animation
const useCountUp = (end, duration = 1500) => {
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = (frame / totalFrames) ** 2; // Ease-out effect
      const currentCount = Math.round(end * progress);
      
      if (frame === totalFrames) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [end, duration, totalFrames]);

  return count;
};

// --- SVG Icons ---
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
  </svg>
);
const ClipboardCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" />
  </svg>
);
const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 12h18" /><path d="M12 3v18" />
    </svg>
);


/**
 * Individual Stat Card Component
 */
const StatCard = ({ icon, label, value, unit = '', onNavigate }) => {
  const animatedValue = useCountUp(value);

  return (
    <div
      onClick={onNavigate}
      className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 flex items-center gap-6 cursor-pointer hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out"
    >
      <div className="text-red-500">{icon}</div>
      <div className="flex-grow">
        <p className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tighter">
          {animatedValue}{unit}
        </p>
        <p className="text-sm font-sans text-gray-400 tracking-wider mt-1">{label}</p>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string,
  onNavigate: PropTypes.func,
};


/**
 * StudentDashboardCards: A grid of small metric cards summarizing student stats.
 */
const StudentDashboardCards = ({ stats }) => {
  // A mock navigation handler. In a real app, this would use a router.
  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}...`);
    // Example: router.push(path);
  };

  const cardData = [
    {
      icon: <BookIcon />,
      label: 'Courses Enrolled',
      value: stats.coursesEnrolled,
      onNavigate: () => handleNavigation('/student/courses'),
    },
    {
      icon: <ClipboardCheckIcon />,
      label: 'Exams Taken',
      value: stats.examsTaken,
      onNavigate: () => handleNavigation('/student/exams'),
    },
    {
      icon: <TargetIcon />,
      label: 'Average Score',
      value: stats.avgScore,
      unit: '%',
      onNavigate: () => handleNavigation('/student/results'),
    },
  ];
  
  // Conditionally add the 'Modules Completed' card if the stat exists
  if (stats.modulesCompleted !== undefined) {
    cardData.push({
      icon: <GridIcon />,
      label: 'Modules Completed',
      value: stats.modulesCompleted,
      onNavigate: () => handleNavigation('/student/progress'),
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <StatCard
          key={index}
          icon={card.icon}
          label={card.label}
          value={card.value}
          unit={card.unit}
          onNavigate={card.onNavigate}
        />
      ))}
    </div>
  );
};

StudentDashboardCards.propTypes = {
  stats: PropTypes.shape({
    coursesEnrolled: PropTypes.number.isRequired,
    examsTaken: PropTypes.number.isRequired,
    avgScore: PropTypes.number.isRequired,
    modulesCompleted: PropTypes.number,
  }).isRequired,
};

export default StudentDashboardCards;