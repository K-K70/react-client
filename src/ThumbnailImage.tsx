
// export default ThumbnailImage;

import React from 'react';
import './ThumbnailImage.css';

type Props = {
  imageSrc: string | null;
  onClick?: () => void;  // 👈 クリックイベントを受け取る
};

const ThumbnailImage: React.FC<Props> = ({ imageSrc, onClick }) => {
  if (!imageSrc) return null;

  return (
    <div className="thumbnail-container" onClick={onClick}>
      <img
        src={imageSrc}
        alt="Thumbnail"
        className="thumbnail"
        style={{ cursor: 'pointer' }}
      />
      <div className="thumbnail-text">判定🕵</div>
    </div>
  );
};

export default ThumbnailImage;
