// export default BackendImage;

import React, { useState, useEffect } from 'react';

const BackendImage: React.FC = () => {
  const [backendImageSrc, setBackendImageSrc] = useState<string | null>(null);

  // バックエンドから画像を取得する関数
  const fetchBackendImage = async () => {
    try {
      const response = await fetch('http://server:5000/predict'); // バックエンドのエンドポイント
      if (response.ok) {
        // Blob形式で画像を取得
        const blob = await response.blob();
        
        // BlobをURLに変換
        const imageUrl = URL.createObjectURL(blob);
        setBackendImageSrc(imageUrl); // 画像URLをstateにセット
      } else {
        console.error('画像を取得できませんでした');
      }
    } catch (error) {
      console.error('画像の取得に失敗しました:', error);
    }
  };

  // 初回レンダリング時に画像をバックエンドから取得
  useEffect(() => {
    fetchBackendImage(); // 画像を取得
  }, []); // 初回レンダリング時に実行

  return (
    <div className="backend-image-area">
      {backendImageSrc ? (
        <img src={backendImageSrc} alt="バックエンド画像" className="backend-image" />
      ) : (
        <div className="loading-container">
            <div className="loading-spinner"></div> {/* ローディングアニメーション */}
            <p>判定中</p>
        </div>
      )}
    </div>
  );
};

export default BackendImage;
