import React, { useState } from 'react';
import InputControl from './InputControl';

const TableRow = ({ row, updatePercentage, updateValue }) => {
  const { label, value, children, variance = 0 } = row;

  return (
    <tr>
      <td>{label}</td>
      <td>{value.toFixed(2)}</td>
      <td>
        <InputControl
          rowId={row.id}
          updatePercentage={updatePercentage}
          updateValue={updateValue}
        />
      </td>
      <td>{variance.toFixed(2)}%</td>
      {children && children.length > 0 && (
        <tr className="child-rows">
          <td colSpan="6">
            <table>
              <tbody>
                {children.map((childRow) => (
                  <row
                    key={childRow.id}
                    row={childRow}
                    updatePercentage={updatePercentage}
                    updateValue={updateValue}
                  />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </tr>
  );
};

export default TableRow;
