// src/FullScreenImage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FullScreenImage.css';
import BackendImage from './BackendImage'; // バックエンド画像表示コンポーネント

const FullScreenImage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const imageSrc = location.state?.imageSrc;
  const label = location.state?.label;

  if (!imageSrc) {
    return <div>画像が見つかりません</div>;
  }

  return (
    <div className="fullscreen-container">
      <div className="main"><h1>結果</h1></div>
        <img src={imageSrc} alt="Full screen" className="fullscreen-image" />
        <div className="label-container">
          <img src="/Alfred/normal.png" alt="Alfred" className="Alfred_normal_image" />
          <div className="label-bubble">
            {label && <p>写っているのは<br /><strong>{label}</strong><br />です</p>}
          </div>
        </div>
        
      <button className="close-button" onClick={() => navigate(-1)}>戻る</button>
    </div>
  );
};

export default FullScreenImage;
