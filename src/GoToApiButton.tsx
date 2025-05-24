// GoToApiButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoToApiButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/api');
  };

  return (
    <button onClick={handleClick}>
      API画面に移動
    </button>
  );
};

export default GoToApiButton;
