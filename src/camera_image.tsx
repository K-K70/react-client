// camera_image.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbnailImage from './ThumbnailImage';

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // カメラ起動
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('カメラの起動に失敗しました:', err);
      }
    };
    startCamera();
  }, []);

  // 撮影
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setImageDataUrl(dataUrl);
  };

  // 画像送信・推論・遷移
  const handleUpload = async () => {
    if (!imageDataUrl) return;
    setLoading(true);

    try {
      const blob = await (await fetch(imageDataUrl)).blob();
      const formData = new FormData();
      formData.append('image', blob, 'photo.png');

      const response = await fetch('https://server.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('バックエンドエラー');

      const result = await response.json();
      const imgSrc = `data:image/jpeg;base64,${result.image}`;

      // labels を取得（なければ空配列）
      const labels = Array.isArray(result.labels) ? result.labels : [];
      const labelString = labels.length > 0 ? labels.join(', ') : '？？？';

      // 遷移先に画像とラベルを渡して遷移
      navigate('/fullscreen', {
        state: {
          imageSrc: imgSrc,
          label: labelString,
        },
      });

    } catch (err) {
      console.error(err);
      alert('❌ 画像の送信に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <video ref={videoRef} width="640" height="480" autoPlay playsInline />
      <br />
      <button className="shutter-button" onClick={handleCapture}>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             width="30"
             height="30"
             className="camera-icon"
           >
             <path d="M12 10c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM3 6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-3l-2-2h-4l-2 2H3zm0 14V8h18v12H3z" />
           </svg>
         </button>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ marginTop: '1rem' }}>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div> {/* ローディングアニメーション */}
            <p>&lt; カメラ起動 &gt; をクリック</p>
          </div>
        ) : (
          imageDataUrl && (
            <>
              <ThumbnailImage imageSrc={imageDataUrl} onClick={handleUpload} />
              <br />
              <a href={imageDataUrl} download="photo.png">画像を保存</a>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default CameraComponent;

