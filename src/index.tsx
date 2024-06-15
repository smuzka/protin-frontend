import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from "./Router";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <div className="w-full h-screen bg-gray-900">
          <div className="max-w-5xl px-2 py-5 mx-auto h-full format dark:format-invert">
              <Router/>
          </div>
      </div>
  </React.StrictMode>
);

reportWebVitals();
