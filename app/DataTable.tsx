import React from 'react';

interface DataTableProps {
  data: any[];
  columns: string[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} className="border p-2">
              {column}
            </th>
          ))}
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column} className="border p-2">
                {item[column]}
              </td>
            ))}
            <td className="border p-2">
              <button
                onClick={() => onEdit(item)}
                className="mr-2 p-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

