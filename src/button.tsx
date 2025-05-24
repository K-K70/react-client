import React, { useState } from 'react';

const ImageSwitcher: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleShowImage = () => {
    const imageUrl = "https://i.gzn.jp/img/2018/01/15/google-gorilla-ban/00.jpg"; // ここに表示したい画像のURLを入れる
    setImageSrc(imageUrl);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <button onClick={handleShowImage}>画像を表示</button>
      <div style={{ marginTop: '20px' }}>
        {imageSrc ? (
          <img src={imageSrc} alt="表示画像" style={{ width: '300px', height: 'auto' }} />
        ) : (
          <p>画像はまだ表示されていません</p>
        )}
      </div>
    </div>
  );
};

export default ImageSwitcher;
