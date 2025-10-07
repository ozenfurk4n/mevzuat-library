import React from 'react';
import Tippy from '@tippyjs/react';
import { useTheme } from '../contexts/ThemeContext';
import Table from './Table';
import kanun5520Data from '../data/5520-kanun-32a.json';
import kanun3213Data from '../data/3213-kanun-2.json';
import kanun4706Data from '../data/4706-kanun-ek3.json';
import kanun3065Data from '../data/3065-kanun.json';

function AtifParser({ metin, tumMaddeler }) {
  const { theme } = useTheme();

  // Helper function to render table content
  const renderTableContent = (p, index) => {
    // Check for table format (tab-separated data)
    if (p.includes('\t') && (p.includes('Bölgeler') || p.includes('Bölge') || p.includes('NACE Rev. 2.1. Kodu') || p.includes('Yatırım Konusu') || p.includes('Kod') || p.includes('G.T.İ.P No') || p.includes('İl') || p.includes('US-97 Kodu') || p.includes('Asgari Sabit Yatırım Tutarları') || p.includes('Gümrük Tarife İstatistik Pozisyonu'))) {
      const lines = p.split('\n');
      const headers = lines[0].split('\t');
      const data = lines.slice(1).map(line => line.split('\t'));
      
      // EK-2A, EK-3 ve EK-5 için özel geniş tablo
      const isEk2a = p.includes('US-97 Kodu') || p.includes('Bölgesel Teşviklerden Yararlanacak Sektörler');
      const isEk3 = p.includes('Asgari Sabit Yatırım Tutarları') && p.includes('Yatırım Konuları');
      const isEk5 = p.includes('Gümrük Tarife İstatistik Pozisyonu') && p.includes('Ürün');
      const isWideTable = isEk2a || isEk3 || isEk5;
      
      return (
        <div key={index} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
          <div className={`flex justify-center ${isWideTable ? 'overflow-x-auto' : ''}`}>
            <table className={`text-xs border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden ${isWideTable ? 'min-w-max' : 'w-full max-w-md'}`}>
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {headers.map((header, idx) => (
                    <th key={idx} className={`px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 ${isWideTable ? 'whitespace-nowrap' : ''} ${isEk5 && idx === 0 ? 'w-1/2' : ''} ${isEk5 && idx === 1 ? 'w-1/2' : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {data.map((row, rowIdx) => {
                  // Check if first cell is a single letter (A, B, C, etc.) for category headers
                  const isCategoryHeader = row[0] && row[0].length === 1 && /^[A-Z]$/.test(row[0]);
                  
                  return (
                    <tr key={rowIdx} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className={`px-4 py-2 text-gray-700 dark:text-gray-300 ${isWideTable ? 'whitespace-nowrap' : ''} ${isEk5 && cellIdx === 0 ? 'w-1/2' : ''} ${isEk5 && cellIdx === 1 ? 'w-1/2' : ''}`}>
                          {cell === '-' ? (
                            <span className="text-gray-400 dark:text-gray-500">-</span>
                          ) : isCategoryHeader ? (
                            <span className="font-bold">{cell}</span>
                          ) : (
                            cell
                          )}
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
    return null;
  };

  const getKanun3065Icerik = () => {
    const kanun = kanun3065Data[0];
    
    return (
      <div className="text-left max-w-lg min-w-80">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h4 className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">
            {kanun.kanun_no} SAYILI {kanun.kanun_adi.toUpperCase()}
          </h4>
        </div>
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto overflow-x-auto custom-scrollbar">
          {kanun.maddeler.map((madde, maddeIndex) => (
            <div key={maddeIndex} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <h5 className="font-semibold text-cyan-500 dark:text-cyan-300 text-xs mb-2">
                MADDE {madde.madde_no} - {madde.baslik}
              </h5>
              <div className="space-y-2">
                {madde.paragraflar.map((p, i) => (
                  <div key={i} className="pb-2">
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                      {p}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getKanun4706Icerik = () => {
    const kanun = kanun4706Data[0];
    const madde = kanun.maddeler[0];
    
    return (
      <div className="text-left max-w-lg min-w-80">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
            {kanun.kanun_no} SAYILI {kanun.kanun_adi.toUpperCase()}
          </h4>
          <h5 className="font-semibold text-indigo-500 dark:text-indigo-300 text-xs mt-1">
            {madde.madde_no} - {madde.baslik}
          </h5>
        </div>
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto overflow-x-auto custom-scrollbar">
          {madde.paragraflar.map((p, i) => {
            // Check if this is a table
            const tableContent = renderTableContent(p, i);
            if (tableContent) {
              return tableContent;
            }
            
            // Normal paragraf
            return (
              <div key={i} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                  {p}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getKanun3213Icerik = () => {
    const kanun = kanun3213Data[0];
    const madde = kanun.maddeler[0];
    
    return (
      <div className="text-left max-w-lg min-w-80">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h4 className="font-bold text-orange-600 dark:text-orange-400 text-sm">
            {kanun.kanun_no} SAYILI {kanun.kanun_adi.toUpperCase()}
          </h4>
          <h5 className="font-semibold text-orange-500 dark:text-orange-300 text-xs mt-1">
            MADDE {madde.madde_no} - {madde.baslik}
          </h5>
        </div>
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto overflow-x-auto custom-scrollbar">
          {madde.paragraflar.map((p, i) => {
            // Check if this is a table
            const tableContent = renderTableContent(p, i);
            if (tableContent) {
              return tableContent;
            }
            
            // Normal paragraf
            return (
              <div key={i} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                  {p}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getKanun5520Icerik = () => {
    const kanun = kanun5520Data[0];
    const madde = kanun.maddeler[0];
    
    return (
      <div className="text-left max-w-lg min-w-80">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h4 className="font-bold text-purple-600 dark:text-purple-400 text-sm">
            {kanun.kanun_no} SAYILI {kanun.kanun_adi.toUpperCase()}
          </h4>
          <h5 className="font-semibold text-purple-500 dark:text-purple-300 text-xs mt-1">
            MADDE {madde.madde_no} - {madde.baslik}
          </h5>
        </div>
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto overflow-x-auto custom-scrollbar">
          {madde.paragraflar.map((p, i) => {
            // Check if this is a table
            const tableContent = renderTableContent(p, i);
            if (tableContent) {
              return tableContent;
            }
            
            // Normal paragraf
            return (
              <div key={i} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                  {p}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getFikraIcerik = (maddeNo, fikraNo) => {
    const mevzuat = mevzuatData.find(m => m.id === '2012-3305');
    if (!mevzuat) return null;

    const madde = mevzuat.maddeler.find(m => m.madde_no == maddeNo);
    if (!madde) return null;

    // Find the specific fıkra
    const fikraText = madde.paragraflar.find(p => p.startsWith(`(${fikraNo})`));
    if (!fikraText) return null;

    return (
      <div className="text-left p-3">
        <p className="text-blue-500 text-sm font-semibold mb-2">
          {madde.baslik} - {fikraText.split(')')[0] + ')'}
        </p>
        <div className="text-gray-700 text-sm">
          {fikraText}
        </div>
      </div>
    );
  };

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
      <div className="text-left max-w-lg min-w-80">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h4 className="font-bold text-primary-600 dark:text-primary-400 text-sm">
            MADDE {madde.madde_no} - {madde.baslik}
          </h4>
        </div>
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto overflow-x-auto custom-scrollbar">
          {madde.paragraflar.map((p, i) => {
            // Check if this is a table
            const tableContent = renderTableContent(p, i);
            if (tableContent) {
              return tableContent;
            }
            
            // Normal paragraf
            return (
              <div key={i} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                  {p}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMetin = (paragraf) => {
    // Enhanced regex to catch more reference patterns
    const atifRegex = /(?:MADDE\s*(\d+))|(?:(\d+)\s*(?:'ncı|'inci|\s*ncı|\s*inci|'ncu|'üncü|\s*ncu|\s*üncü)\s*maddenin?\s*(?:(\d+)\s*(?:'ncı|'inci|\s*ncı|\s*inci|'ncu|'üncü|\s*ncu|\s*üncü)\s*fıkrası?)?)|(?:(geçici\s*\d+))|(?:EK-(\d+[A-Z]?))|(?:(\d+)\s*(?:'ncı|'inci|\s*ncı|\s*inci|'ncu|'üncü|\s*ncu|\s*üncü)\s*fıkra)|(?:birinci\s*fıkra)|(?:ikinci\s*fıkra)|(?:üçüncü\s*fıkra)|(?:dördüncü\s*fıkra)|(?:beşinci\s*fıkra)|(?:altıncı\s*fıkra)|(?:yedinci\s*fıkra)|(?:sekizinci\s*fıkra)|(?:dokuzuncu\s*fıkra)|(?:onuncu\s*fıkra)|(?:\(([a-zçğıöşü])\)\s*bendi)|(?:\(([a-zçğıöşü])\)\s*bend)|(?:([a-zçğıöşü])\s*bendi)|(?:([a-zçğıöşü])\s*bend)|(?:5520\s*sayılı\s*Kurumlar\s*Vergisi\s*Kanunu)|(?:3065\s*sayılı\s*Katma\s*Değer\s*Vergisi\s*Kanunu)|(?:3213\s*sayılı\s*Maden\s*Kanunu)|(?:4706\s*sayılı\s*Kanun)|(?:6183\s*sayılı\s*Kanun)|(?:2009\/15199\s*sayılı\s*Bakanlar\s*Kurulu\s*Kararı)/gi;
    
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = atifRegex.exec(paragraf)) !== null) {
      if (match.index > lastIndex) {
        parts.push(paragraf.substring(lastIndex, match.index));
      }
      
      const [fullMatch, ...groups] = match;
      
      // Extract madde and fıkra numbers from groups
      const maddeNo = groups[1] || groups[0]; // First group is madde number
      const fikraNo = groups[3]; // Third group is fıkra number (if exists)
      
      // Determine reference type and content
      let referenceType = 'madde';
      let referenceContent = null;
      
      if (fullMatch.includes('EK-')) {
        referenceType = 'ek';
        referenceContent = getMaddeIcerik(fullMatch);
      } else if (fullMatch.includes('fıkra') || fullMatch.includes('bend')) {
        referenceType = 'fıkra';
        
        // If it's a specific fıkra reference (e.g., "12 nci maddenin sekizinci fıkrası")
        if (fikraNo && maddeNo) {
          referenceContent = getFikraIcerik(maddeNo, fikraNo);
        } else {
          referenceContent = (
            <div className="text-left p-3">
              <p className="text-blue-500 text-sm font-semibold">{fullMatch}</p>
              <p className="text-gray-600 text-xs mt-1">Bu fıkra/bend için detaylı içerik bulunmamaktadır.</p>
            </div>
          );
        }
      } else if (fullMatch.includes('3065 sayılı Katma Değer Vergisi Kanunu')) {
        referenceType = 'kanun3065';
        referenceContent = getKanun3065Icerik();
      } else if (fullMatch.includes('4706 sayılı Kanun')) {
        referenceType = 'kanun4706';
        referenceContent = getKanun4706Icerik();
      } else if (fullMatch.includes('3213 sayılı Maden Kanunu')) {
        referenceType = 'kanun3213';
        referenceContent = getKanun3213Icerik();
      } else if (fullMatch.includes('5520 sayılı Kurumlar Vergisi Kanunu')) {
        referenceType = 'kanun5520';
        referenceContent = getKanun5520Icerik();
      } else if (fullMatch.includes('sayılı') || fullMatch.includes('Kanunu') || fullMatch.includes('Kararı')) {
        referenceType = 'kanun';
        referenceContent = (
          <div className="text-left p-3">
            <p className="text-red-500 text-sm font-semibold">{fullMatch}</p>
            <p className="text-gray-600 text-xs mt-1">Bu kanun/karar elimizde bulunmamaktadır.</p>
            <p className="text-gray-500 text-xs mt-1">Resmi Gazete'den kontrol edebilirsiniz.</p>
          </div>
        );
      } else {
        referenceContent = getMaddeIcerik(maddeNo);
      }

      // Different styling based on reference type
      let bgClass = '';
      if (referenceType === 'ek' || referenceType === 'madde' || referenceType === 'fıkra') {
        // İç atıflar - mavi renk
        bgClass = theme === 'dark' 
          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-blue-100 border border-blue-500 hover:from-blue-500 hover:to-blue-400'
          : 'bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 border border-blue-300 hover:from-blue-300 hover:to-blue-400';
      } else {
        // Dış atıflar - yeşil renk
        bgClass = theme === 'dark' 
          ? 'bg-gradient-to-r from-green-600 to-green-500 text-green-100 border border-green-500 hover:from-green-500 hover:to-green-400'
          : 'bg-gradient-to-r from-green-200 to-green-300 text-green-900 border border-green-300 hover:from-green-300 hover:to-green-400';
      }

      parts.push(
        <Tippy
          key={match.index}
          content={referenceContent}
          interactive={true}
          placement="top-start"
          theme="custom"
          allowHTML={true}
          maxWidth={600}
          delay={[200, 100]}
          duration={[300, 200]}
          arrow={true}
          className={`modern-tooltip ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
          appendTo={() => document.body}
        >
          <span className={`relative inline-block font-semibold rounded-md cursor-pointer px-4 py-2 mx-0.5 transition-all duration-300 hover:shadow-md hover:scale-105 ${bgClass}`}>
            {fullMatch}
            <span className={`absolute inset-0 rounded-md transition-opacity duration-200 opacity-0 hover:opacity-20 ${
              theme === 'dark' ? 'bg-white' : 'bg-black'
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
      {metin.map((p, index) => {
        // Check if this is a table first
        const tableContent = renderTableContent(p, index);
        if (tableContent) {
          return tableContent;
        }
        
        // Otherwise render as normal text with cross-references
        return (
          <div key={index}>
            {renderMetin(p)}
          </div>
        );
      })}
    </div>
  );
}

export default AtifParser;