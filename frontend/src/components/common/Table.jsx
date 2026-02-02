import React from "react";

function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-accent/20 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-cream text-primary">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-cream/40 transition"
              >
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
