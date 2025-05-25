import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import APIComponent from './component/APIComponent';
import FullScreenImage from './FullScreenImage';
import OrderPage from './OrderPage';  // 追加
import Alfred from './Alfred';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/order" element={<OrderPage />} />  {/* 追加 */}
      <Route path="/alfred" element={<Alfred />} />  {/* 追加 */}
      <Route path="/api" element={<APIComponent />} />
      <Route path="/fullscreen" element={<FullScreenImage />} />
    </Routes>
  </Router>
);
