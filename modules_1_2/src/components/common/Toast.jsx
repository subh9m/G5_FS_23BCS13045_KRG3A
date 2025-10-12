import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// --- Icon Components for Toast Types ---
const IconCheckCircle = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const IconAlertTriangle = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const toastTypes = {
  success: {
    icon: <IconCheckCircle className="w-6 h-6 text-black" />,
    style: 'bg-white text-black',
    progress: 'bg-black',
  },
  error: {
    icon: <IconAlertTriangle className="w-6 h-6 text-red-500" />,
    style: 'bg-white text-black',
    progress: 'bg-red-500',
  },
};

const ToastContext = createContext(null);

/**
 * Custom hook to access the toast context.
 * @returns {Function} showToast - A function to trigger a toast notification.
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * Provides the toast context to its children.
 * Place this in your main App.jsx.
 */
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  // Clear toast with a timeout
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({ message, type, duration });
  }, []);

  const toastConfig = toast ? toastTypes[toast.type] : null;

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && toastConfig && (
        <div
          className={`fixed bottom-5 right-5 z-50 w-full max-w-sm rounded-lg shadow-lg ${toastConfig.style} animate-slide-in`}
          role="alert"
        >
          <div className="relative flex items-center p-4">
            <div className="shrink-0">{toastConfig.icon}</div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold">{toast.message}</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-black/10 w-full">
            <div
              className={`h-full ${toastConfig.progress}`}
              style={{ animation: `progress ${toast.duration}ms linear forwards` }}
            ></div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
