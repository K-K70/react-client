// export default ImageSwitcher;


// src/component/ImageSwitcher.tsx
import React, { useState } from 'react';
import './ImageSwitcher.css';

type Props = {
  onImageSwitch: (newImageUrl: string) => void;
};

const ImageSwitcher: React.FC<Props> = ({ onImageSwitch }) => {
  const images = [
    "https://growthseed.jp/wp-content/uploads/2016/12/peach-1.jpg",
    "https://media.loom-app.com/gizmodo/dist/images/2022/06/13/fnhum-16-877249-g001.jpg?w=640"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButton, setShowButton] = useState(true); // 👈 追加

  const handleSwitchImage = () => {
    console.log("ボタンがクリックされました");
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    onImageSwitch(images[nextIndex]);
    setShowButton(false); // 👈 ボタンを非表示にする
  };

  return (
    <div className="center-container">
      {showButton && (
        <button className="switch-button" onClick={handleSwitchImage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
          <span className="switch-text">カメラ起動</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ImageSwitcher;
