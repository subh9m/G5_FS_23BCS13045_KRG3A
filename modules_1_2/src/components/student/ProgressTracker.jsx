import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a linear progress bar.
 */
const LinearProgressBar = ({ progress, label }) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-1">
      {label && <span className="text-sm font-sans text-gray-400 tracking-wider">{label}</span>}
      <span className="text-sm font-mono text-white ml-auto">{progress}%</span>
    </div>
    <div className="w-full bg-black border border-[#333] rounded-full h-2 overflow-hidden">
      <div
        className="bg-red-500 h-full rounded-full transition-all duration-700 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

LinearProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  label: PropTypes.string,
};

/**
 * Renders a circular progress indicator using SVG.
 */
const CircularProgressIndicator = ({ progress, label }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            strokeWidth="8"
            className="stroke-[#333] fill-none"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            strokeWidth="8"
            className="stroke-red-500 fill-none"
            transform="rotate(-90 60 60)"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 0.7s ease-in-out',
            }}
          />
        </svg>
        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-mono text-white tracking-tighter">{progress}%</span>
        </div>
      </div>
      {label && <p className="text-sm font-mono text-gray-400 tracking-wider mt-2">{label}</p>}
       <p className="text-xs font-sans text-gray-500">Complete</p>
    </div>
  );
};

CircularProgressIndicator.propTypes = {
  progress: PropTypes.number.isRequired,
  label: PropTypes.string,
};

/**
 * ProgressTracker: A reusable component to display course or module progress
 * visually, either as a linear bar or a circular indicator.
 */
const ProgressTracker = ({ progress, type, label, onClick }) => {
  const Wrapper = onClick ? 'button' : 'div';
  const progressValue = Math.max(0, Math.min(100, progress)); // Clamp progress between 0 and 100

  return (
    <Wrapper
      onClick={onClick}
      className={`
        w-full p-4 rounded-2xl
        ${onClick ? 'cursor-pointer hover:bg-black/40 hover:shadow-[0_0_15px_rgba(255,0,0,0.2)] transition-all duration-300 ease-in-out' : ''}
      `}
    >
      {type === 'linear' ? (
        <LinearProgressBar progress={progressValue} label={label} />
      ) : (
        <CircularProgressIndicator progress={progressValue} label={label} />
      )}
    </Wrapper>
  );
};

ProgressTracker.propTypes = {
  /** The progress percentage (0-100). */
  progress: PropTypes.number.isRequired,
  /** The visual style of the tracker. */
  type: PropTypes.oneOf(['linear', 'circular']),
  /** An optional label to display. */
  label: PropTypes.string,
  /** An optional click handler, e.g., to navigate to a details page. */
  onClick: PropTypes.func,
};

ProgressTracker.defaultProps = {
  type: 'linear',
  label: '',
  onClick: null,
};

export default ProgressTracker;