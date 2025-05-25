import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { YOLOPredict } from './YOLOPredict';
import './Alfred.css';

const Alfred: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const imageDataUrl = location.state?.imageDataUrl;

  const [result, setResult] = useState<{
    imageSrc: string;
    label: string;
    matchedOrders: any[];
  } | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play();

    video.onended = () => {
      if (!result) {
        alert('❌ 推論結果が取得できませんでした');
        return;
      }
      navigate('/fullscreen', {
        state: {
          ...result,
        },
      });
    };
  }, [navigate, result]);

  useEffect(() => {
    if (!imageDataUrl) return;

    YOLOPredict(imageDataUrl)
      .then(setResult)
      .catch((err) => {
        console.error('予測失敗:', err);
        alert('❌ 画像の予測に失敗しました');
      });
  }, [imageDataUrl]);

  if (!imageDataUrl) {
    return (
      <div className="alfred-container">
        <div>画像が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="alfred-container">
      <div className="alfred-frame">
        <div className="alfred-message">がんばれAlfred!!</div>
        <video
          ref={videoRef}
          src="/videos/Alfred.mp4"
          autoPlay
          muted
          playsInline
          className="alfred-video"
        />
      </div>
    </div>
  );
};

export default Alfred;
