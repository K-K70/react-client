// backendkaragazouwouketorihuronntodehyouziF

// App.tsx
import React, { useState } from 'react';
import './css/test.css';  // スタイルを適用
import './ShutterButton.css';  // スタイルを適用
import { useNavigate } from 'react-router-dom';
import ImageSwitcher from './ImageSwitcher';  // 画像切り替えボタン
import ThumbnailImage from './ThumbnailImage'; // サムネイル画像
import CameraComponent from './camera_image';
import LastTrainInfo from './LastTrainInfo';

const App: React.FC = () => {
  // 状態管理：表示する画像のURL
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const navigate = useNavigate(); // useNavigate フック

  // 画像を切り替える関数
  const handleImageSwitch = (newImageUrl: string) => {
    setImageSrc(newImageUrl);
  };

  // サムネイル画像の表示
  const handleShowThumbnail = () => {
    setThumbnailSrc(imageSrc);
  };

  // サムネイル画像をクリックした場合の処理
  const handleThumbnailClick = () => {
    if (thumbnailSrc) {
      navigate('/fullscreen', { state: { imageSrc: thumbnailSrc } }); // フルスクリーンへ遷移
    }
  };

  return (
    <div className="app-container">
      <div className="main"><h1>串カツ判定</h1></div>

      {/* 画像切り替えエリア (上部) */}
      <div className="image-switcher-area">
        <ImageSwitcher onImageSwitch={handleImageSwitch} />
        {/* 画像表示 */}
        {imageSrc ? (
          <div className="image-display-area">
            {/* <img src={imageSrc} alt="切り替え画像" className="displayed-image" /> */}
            <CameraComponent />
          </div>
        ) : (

          <div className="loading-container">
            <div className="loading-spinner"></div> {/* ローディングアニメーション */}
            <p>&lt; カメラ起動 &gt; をクリック</p>
          </div>
        )}
      </div>
      <div className="last_train">
        <LastTrainInfo />
      </div>
    </div>
  );
};

export default App;