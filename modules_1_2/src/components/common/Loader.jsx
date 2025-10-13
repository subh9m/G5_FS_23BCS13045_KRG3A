import React from 'react';

/**
 * A reusable loading spinner component.
 *
 * @param {object} props - The component props.
 * @param {string} [props.size='w-12 h-12'] - The size of the spinner (Tailwind CSS class).
 * @param {boolean} [props.fullPage=false] - If true, centers the loader on the entire page.
 */
const Loader = ({ size = 'w-12 h-12', fullPage = false }) => {
  // Spinner styled with the monochrome theme: red accent on a subtle white track.
  const spinner = (
    <div
      className={`${size} animate-spin rounded-full border-4 border-white/20 border-t-red-500`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullPage) {
    // Full-page overlay with a semi-transparent black background and a glassy backdrop blur effect.
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;