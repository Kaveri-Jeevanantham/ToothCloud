import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import performanceConfig from './utils/performanceMonitor';

// Performance optimization: Enable concurrent features
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring to ensure 2-second load time compliance
reportWebVitals((metric) => {
  // Use our custom performance monitor for US16 compliance
  performanceConfig.monitorPerformance(metric);
});

// Display compliance status in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    performanceConfig.checkCompliance();
  }, 3000);
}
