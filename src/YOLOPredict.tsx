// YOLOPredict.tsx
export const YOLOPredict = async (imageDataUrl: string) => {
  const blob = await (await fetch(imageDataUrl)).blob();
  const formData = new FormData();
  formData.append('image', blob, 'photo.png');

  const response = await fetch('https://github.com/K-K70/flask-backend/predict', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('バックエンドエラー');

  const result = await response.json();
  const imgSrc = `data:image/jpeg;base64,${result.image}`;

  const labels = Array.isArray(result.labels) ? result.labels : [];
  const labelString = labels.length > 0 ? labels.join(', ') : '？？？';

  return {
    imageSrc: imgSrc,
    label: labelString,
    matchedOrders: result.matchedOrders || [],
  };
};
