import React from 'react';

type LastTrains = {
  [line: string]: string; // 例: '名鉄名古屋本線': '23:50'
};

const lastTrains: LastTrains = {
  '地下鉄東山線（藤が丘方面）': '23:55',
  '名鉄名古屋本線（豊橋方面）': '23:50',
  'JR新幹線（東京方面）': '21:24',
  'JR新幹線（大阪方面）': '22:00',
};

const getTimeLeft = (trainTime: string): string => {
  const now = new Date();
  const [hours, minutes] = trainTime.split(':').map(Number);
  const lastTrainDate = new Date(now);
  lastTrainDate.setHours(hours, minutes, 0, 0);

  const diffMs = lastTrainDate.getTime() - now.getTime();

  if (diffMs <= 0) return '🚫 終電終了';

  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  return `⏳ あと ${diffMinutes} 分`;
};

const LastTrainInfo: React.FC = () => {
  return (
    <div className="last-train-info">
      <h3>🚉 名古屋駅終電情報</h3>
      <ul>
        {Object.entries(lastTrains).map(([line, time]) => (
          <li key={line}>
            <strong>{line}</strong>：{time}（{getTimeLeft(time)}）
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastTrainInfo;
