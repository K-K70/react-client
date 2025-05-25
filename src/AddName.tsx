// src/component/AddName.tsx
import React from 'react';

type AddNameProps = {
  index: number;
  value: string;
  onChange: (index: number, newValue: string) => void;
};

const AddName: React.FC<AddNameProps> = ({ index, value, onChange }) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label>
        注文者 {index + 1}:
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '4px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </label>
    </div>
  );
};

export default AddName;
