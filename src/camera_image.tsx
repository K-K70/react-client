import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbnailImage from './ThumbnailImage';

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;  // ここで一旦コピー
  
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (video) {
          video.srcObject = stream;
        }
      } catch (err) {
        console.error('カメラの起動に失敗しました:', err);
        alert('カメラの起動に失敗しました。カメラが接続されているか、ブラウザの権限設定をご確認ください。');
      }
    };
    startCamera();
  
    return () => {
      if (video?.srcObject) {
        (video.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

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

  const handleUpload = async () => {
    if (!imageDataUrl) return;
    setLoading(true);

    try {
      navigate('/alfred', {
        state: {
          imageDataUrl,
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
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        playsInline
        style={{ borderRadius: 8, backgroundColor: '#000' }}
      />
      <br />
      <button
        className="shutter-button"
        onClick={handleCapture}
        disabled={loading}
        aria-label="写真を撮る"
      >
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
            <div className="loading-spinner" />
            <p>処理中…少々お待ちください</p>
          </div>
        ) : (
          imageDataUrl && (
            <>
              <ThumbnailImage imageSrc={imageDataUrl} onClick={handleUpload} />
              <br />
              <a href={imageDataUrl} download="photo.png">
                画像を保存
              </a>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
