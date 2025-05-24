import React, { useState } from 'react';

const ImageFlipper: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [flippedImageUrl, setFlippedImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('http://server:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('画像のアップロードに失敗しました');
      }

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setFlippedImageUrl(imageUrl);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>画像反転テスト</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>アップロードして反転</button>

      {flippedImageUrl && (
        <div>
          <h3>反転された画像:</h3>
          <img src={flippedImageUrl} alt="Flipped" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageFlipper;
