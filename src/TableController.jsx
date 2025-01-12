import React, { useState } from 'react';
import{ TableRow}from './Row'

const initialData = [
    {
      id: 'electronics',
      label: 'Electronics',
      value: 1500,
      children: [
        { id: 'phones', label: 'Phones', value: 800 },
        { id: 'laptops', label: 'Laptops', value: 700 },
      ],
    },
    {
      id: 'furniture',
      label: 'Furniture',
      value: 1000,
      children: [
        { id: 'tables', label: 'Tables', value: 300 },
        { id: 'chairs', label: 'Chairs', value: 700 },
      ],
    },
  ];


const TableController = () => {
  const [data, setData] = useState(initialData);

  // Update function to apply a percentage change
  const updatePercentage = (id, percentage) => {
    const updatedData = updateRowValue(data, id, percentage, 'percentage');
    setData(updatedData);
  };

  // Update function to set a value directly
  const updateValue = (id, newValue) => {
    const updatedData = updateRowValue(data, id, newValue, 'value');
    setData(updatedData);
  };

  // Recursive function to update the value of a row and its children
  const updateRowValue = (rows, id, value, type) => {
    return rows.map((row) => {
      if (row.id === id) {
        const originalValue = row.value;
        let updatedValue = row.value;

        if (type === 'percentage') {
          updatedValue = originalValue + (originalValue * value) / 100;
        } else if (type === 'value') {
          updatedValue = value;
        }

        row.value = updatedValue;
        row.variance = ((updatedValue - originalValue) / originalValue) * 100;

        // Recursively update children if any
        if (row.children) {
          row.children = updateRowValue(row.children, id, value, type);
        }
      }

      return row;
    });
  };

  return (
    <div className="app">
      <h1>Sales Table</h1>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              updatePercentage={updatePercentage}
              updateValue={updateValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableController;
