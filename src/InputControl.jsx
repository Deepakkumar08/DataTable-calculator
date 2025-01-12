import React, { useState } from 'react';

const InputControl = ({ rowId, updatePercentage, updateValue }) => {
  const [percentage, setPercentage] = useState('');
  const [newValue, setNewValue] = useState('');

  const handlePercentageChange = () => {
    if (percentage) {
      updatePercentage(rowId, parseFloat(percentage));
      setPercentage('');
    }
  };

  const handleValueChange = () => {
    if (newValue) {
      updateValue(rowId, parseFloat(newValue));
      setNewValue('');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
        placeholder="Percentage"
      />
      <button onClick={handlePercentageChange}>Allocate %</button>
      <br />
      <input
        type="number"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        placeholder="New Value"
      />
      <button onClick={handleValueChange}>Allocate Val</button>
    </div>
  );
};

export default InputControl;
