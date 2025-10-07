import React from 'react';

function Table({ data, title }) {
  if (!data || data.length === 0) return null;

  // Parse the first row as headers
  const headers = data[0].split('\t');
  const rows = data.slice(1);

  // Check if this is a wide table (more than 4 columns)
  const isWideTable = headers.length > 4;

  return (
    <div className="my-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <div className={`overflow-x-auto ${isWideTable ? 'shadow-lg' : ''}`}>
        <table className={`${isWideTable ? 'min-w-max' : 'min-w-full'} border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden`}>
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 ${
                    isWideTable ? 'whitespace-nowrap' : ''
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {rows.map((row, rowIndex) => {
              const cells = row.split('\t');
              return (
                <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  {cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-4 py-3 text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 ${
                        isWideTable ? 'whitespace-nowrap' : ''
                      }`}
                    >
                      {cell || '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
