// export const flipImage = async (imageUrl: string): Promise<string | null> => {
//     try {
//       // バックエンドに画像URLを送信して反転画像を取得
//       const response = await fetch('http://localhost:5000/flip-image', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ imageUrl })  // 画像URLを送信
//       });
  
//       if (response.ok) {
//         const flippedBlob = await response.blob();
//         const flippedImageUrl = URL.createObjectURL(flippedBlob); // Blobから反転画像URLを作成
//         return flippedImageUrl; // 反転画像URLを返す
//       } else {
//         console.error('反転画像の取得に失敗しました');
//         return null;
//       }
//     } catch (error) {
//       console.error('バックエンドへの送信に失敗しました:', error);
//       return null;
//     }
//   };
  

// 画像をフロントエンドから送る例 (imageService.tsx)
// imageService.tsx
const flipImage = async (image: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append('image', image);
  
    try {
      // サーバーへのPOSTリクエストを送信
      const response = await fetch('http://server:5000/predict', {
        method: 'POST',
        body: formData,
      });
  
      // レスポンスがOKなら画像を取得してURLを生成
      if (response.ok) {
        const flippedImageBlob = await response.blob();
        return URL.createObjectURL(flippedImageBlob);
      } else {
        console.error('画像の反転に失敗しました');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };
  
  export default flipImage;
  