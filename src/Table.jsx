// Table.js
import React, { useState } from 'react';
import { initialData } from './data';

const TableRow = ({ row, updateValue, updatePercentage }) => {
  const [inputValue, setInputValue] = useState('');
  const [percentageValue, setPercentageValue] = useState('');

  const handleValueChange = () => {
    if (!isNaN(inputValue)) {
      updateValue(row.id, parseFloat(inputValue));
    }
  };

  const handlePercentageChange = () => {
    if (!isNaN(inputValue)) {
      console.log(row.id, parseFloat(inputValue),'rowwww')
      updatePercentage(row.id, parseFloat(inputValue));
    }
  };

  const calculateVariance = (originalValue) => {
    if (originalValue === 0) return 0;
    return ((row.value - originalValue) / originalValue) * 100;
  };

  return (
    <tr>
      <td>{row.label}</td>
      <td>{row.value}</td>
      <td>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </td>
      <td>
        <button onClick={handlePercentageChange}>Allocate %</button>
      </td>
      <td>
        <button onClick={handleValueChange}>Allocate Val</button>
      </td>
      <td>{calculateVariance(row.originalValue)}%</td>
    </tr>
  );
};

const Table = () => {
  const [data, setData] = useState(initialData);

  const updateValue = (id, newValue) => {
    const updateRow = (rows) => {
      return rows.map((row) => {
        if (row.id === id ||  row.parentId ==id) {
          row.originalValue = row.value;  // Save the original value for variance calculation
          row.value = newValue;
          if (row.children) {
            row.children = updateRow(row.children); // Recursively update children
          }
        }
        return row;
      });
    };
    console.log(data,'rowwwww')

    setData(updateRow(data));
  };

  const updatePercentage = (id, percentage) => {
    const updateRow = (rows) => {
      return rows.map((row) => {
        if (row.id === id || row.parentId ==id) {
          row.originalValue = row.value;  // Save the original value for variance calculation
          row.value += (row.value * percentage) / 100;  // Apply percentage change
          if (row.children) {
            row.children = updateRow(row.children); // Recursively update children
          }
        }
        return row;
      });
    };
    console.log(data,'rowww')
    setData(updateRow(data));
  };

  const calculateGrandTotal = (rows) => {
    return rows.reduce(
      (sum, row) =>
        sum + (row.children ? calculateGrandTotal(row.children) : row.value),
      0
    );
  };

  return (
    <div>
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocate %</th>
            <th>Allocate Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow
                row={row}
                updateValue={updateValue}
                updatePercentage={updatePercentage}
              />
              {row.children &&
                row.children.map((child) => (
                  <TableRow
                    key={child.id}
                    row={child}
                    updateValue={updateValue}
                    updatePercentage={updatePercentage}
                  />
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div>
        <strong>Grand Total: {calculateGrandTotal(data)}</strong>
      </div>
    </div>
  );
};

export default Table;
