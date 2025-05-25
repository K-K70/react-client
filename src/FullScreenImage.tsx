import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FullScreenImage.css';

interface Order {
  name: string;
  quantity: number;
  comment: string;
  matched?: boolean;
  matched_label?: string;
}

interface LocationState {
  imageSrc: string;
  label: string;
  matchedOrders: Order[];
}

const FullScreenImage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | undefined;

  if (!state) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <p>表示する画像情報がありません。</p>
        <button onClick={() => navigate('/')}>トップページへ戻る</button>
      </div>
    );
  }

  const { imageSrc, label, matchedOrders } = state;
  const filteredOrders = matchedOrders.filter(order => order.matched);

  return (
    <div
      onClick={() => navigate('/')}
      className="fullscreen-container"
      aria-label="フルスクリーン画像表示"
    >
      <div className="main"><h1>結果</h1></div>

      <img
        src={imageSrc}
        alt="認識結果"
        className="fullscreen-image"
        draggable={false}
      />

      <div className="label-container">
        <img src="/Alfred/normal.png" alt="Alfred" className="Alfred_normal_image" />
        <div className="label-bubble">
          <p>写っているのは</p>
          {filteredOrders.length > 0 ? (
            <ul className="order-list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {filteredOrders.map((order, idx) => (
                <li key={idx}>
                  ・<strong>{order.name}</strong>の<strong>{order.matched_label || order.comment || 'コメントなし'}</strong>{order.quantity}個
                </li>
              ))}
            </ul>
          ) : (
            <p>？？？</p>
          )}
          <p>です</p>
        </div>
      </div>

      <button
        className="close-button"
        onClick={(e) => {
          e.stopPropagation();
          navigate('/');
        }}
      >
        戻る
      </button>
    </div>
  );
};

export default FullScreenImage;