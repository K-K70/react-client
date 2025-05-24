import { useNavigate } from 'react-router-dom';

export const navigateToFullscreen = (imageUrl: string | null) => {
  const navigate = useNavigate();
  
  if (imageUrl) {
    navigate('/fullscreen', { state: { flippedImageUrl: imageUrl } }); // 反転画像URLを遷移先に渡す
  } else {
    console.error('画像URLが無効です。');
  }
};
