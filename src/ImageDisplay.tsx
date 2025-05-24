import React from 'react';

type Props = {
  imageSrc: string | null;
};

const ImageDisplay: React.FC<Props> = ({ imageSrc }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {imageSrc ? (
        <img src={imageSrc} alt="表示画像" style={{ width: '300px', height: 'auto' }} />
      ) : (
        <p>画像はまだ表示されていません</p>
      )}
    </div>
  );
};

export default ImageDisplay;
