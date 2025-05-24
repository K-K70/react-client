// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// index.tsx
// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//メインの親コンポーネント
import App from './App';
import APIComponent from './component/APIComponent';
import FullScreenImage from './FullScreenImage';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/api" element={<APIComponent />} />
      <Route path="/fullscreen" element={<FullScreenImage />} />
    </Routes>
  </Router>
);
