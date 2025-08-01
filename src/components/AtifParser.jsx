import React from 'react';
import Tippy from '@tippyjs/react';
import { useTheme } from '../contexts/ThemeContext';

function AtifParser({ metin, tumMaddeler }) {
  const { theme } = useTheme();

  const getMaddeIcerik = (maddeNo) => {
    const madde = tumMaddeler.find(m => String(m.madde_no).toLowerCase() === String(maddeNo).toLowerCase());
    
    if (!madde) {
      return (
        <div className="text-left p-3">
          <p className="text-red-500 text-sm">İlgili madde bulunamadı.</p>
        </div>
      );
    }

    return (
      <div className="text-left max-w-md">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h4 className="font-bold text-primary-600 dark:text-primary-400 text-sm">
            MADDE {madde.madde_no} - {madde.baslik}
          </h4>
        </div>
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
          {madde.paragraflar.map((p, i) => {
            // Tablo kontrolü
            if (p.includes('\t') && p.includes('Bölgeler')) {
              const lines = p.split('\n');
              const headers = lines[0].split('\t');
              const data = lines.slice(1).map(line => line.split('\t'));
              
              return (
                <div key={i} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-xs border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              {headers.map((header, idx) => (
                                <th key={idx} className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800">
                            {data.map((row, rowIdx) => (
                              <tr key={rowIdx} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                {row.map((cell, cellIdx) => (
                                  <td key={cellIdx} className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                    {cell === '-' ? (
                                      <span className="text-gray-400 dark:text-gray-500">-</span>
                                    ) : (
                                      cell
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Normal paragraf
            return (
              <div key={i} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                    {p}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMetin = (paragraf) => {
    const atifRegex = /(?:MADDE\s*(\d+))|(?:(\d+)\s*(?:'ncı|'inci|\s*ncı|\s*inci|'ncu|'üncü|\s*ncu|\s*üncü)\s*maddenin?)|(?:(geçici\s*\d+))/gi;
    
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = atifRegex.exec(paragraf)) !== null) {
      if (match.index > lastIndex) {
        parts.push(paragraf.substring(lastIndex, match.index));
      }
      
      const [fullMatch, ...groups] = match;
      const maddeNo = groups.find(g => g !== undefined);

      parts.push(
                 <Tippy
           key={match.index}
           content={getMaddeIcerik(maddeNo)}
           interactive={true}
           placement="top-start"
           theme="custom"
           allowHTML={true}
           maxWidth={500}
           delay={[200, 100]}
           duration={[300, 200]}
           arrow={true}
           className={`modern-tooltip ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
           appendTo={() => document.body}
         >
                     <span className={`relative inline-block font-semibold rounded-md cursor-pointer px-2 py-1 mx-0.5 transition-all duration-300 hover:shadow-md hover:scale-105 ${
             theme === 'dark' 
               ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-yellow-100 border border-yellow-500 hover:from-yellow-500 hover:to-yellow-400' 
               : 'bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900 border border-yellow-300 hover:from-yellow-300 hover:to-yellow-400'
           }`}>
             {fullMatch}
             <span className={`absolute inset-0 rounded-md transition-opacity duration-200 opacity-0 hover:opacity-20 ${
               theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-500'
             }`}></span>
           </span>
        </Tippy>
      );
      
      lastIndex = atifRegex.lastIndex;
    }

    if (lastIndex < paragraf.length) {
      parts.push(paragraf.substring(lastIndex));
    }

    return (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-justify">
        {parts}
      </p>
    );
  };

  return (
    <div>
      {metin.map((p, index) => (
        <div key={index}>{renderMetin(p)}</div>
      ))}
    </div>
  );
}

export default AtifParser;