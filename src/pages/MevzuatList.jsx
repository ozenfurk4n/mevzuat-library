import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../components/ThemeToggle';
import mevzuatData from '../data/9903-karar.json';
import mevzuat2012Data from '../data/2012-3305-karar.json';
import mevzuat2012Ek1Data from '../data/2012-3305-ek1.json';
import mevzuat2012Ek2aData from '../data/2012-3305-ek2a.json';
import mevzuat2012Ek2bData from '../data/2012-3305-ek2b.json';
import mevzuat2012Ek3Data from '../data/2012-3305-ek3.json';
import mevzuat2012Ek4Data from '../data/2012-3305-ek4.json';
import mevzuat2012Ek5Data from '../data/2012-3305-ek5.json';
import kanun5520Data from '../data/5520-kanun-32a.json';
import kanun3213Data from '../data/3213-kanun-2.json';
import kanun4706Data from '../data/4706-kanun-ek3.json';
import kanun3065Data from '../data/3065-kanun.json';
import ek1Data from '../data/9903-ek1.json';
import ek2Data from '../data/9903-ek2.json';
import ek3Data from '../data/9903-ek3.json';
import ek4Data from '../data/9903-ek4.json';
import ek5Data from '../data/9903-ek5.json';

function MevzuatList() {
  const ek1Maddeler = ek1Data[0]?.maddeler || [];
  const ek2Maddeler = ek2Data[0]?.maddeler || [];
  const ek3Maddeler = ek3Data[0]?.maddeler || [];
  const ek4Maddeler = ek4Data[0]?.maddeler || [];
  const ek5Maddeler = ek5Data[0]?.maddeler || [];
  
  const mainMevzuat = mevzuatData.find(m => m.id === '9903');
  
  const updatedMevzuat = mainMevzuat ? {
    ...mainMevzuat,
    maddeler: [...mainMevzuat.maddeler, ...ek1Maddeler, ...ek2Maddeler, ...ek3Maddeler, ...ek4Maddeler, ...ek5Maddeler]
  } : mevzuatData[0];
  
  // Update 2012/3305 mevzuat with EK-1, EK-2A, EK-2B, EK-3, EK-4 and EK-5
  const updated2012Mevzuat = mevzuat2012Data[0] ? {
    ...mevzuat2012Data[0],
    maddeler: [...mevzuat2012Data[0].maddeler, ...mevzuat2012Ek1Data[0]?.maddeler || [], ...mevzuat2012Ek2aData[0]?.maddeler || [], ...mevzuat2012Ek2bData[0]?.maddeler || [], ...mevzuat2012Ek3Data[0]?.maddeler || [], ...mevzuat2012Ek4Data[0]?.maddeler || [], ...mevzuat2012Ek5Data[0]?.maddeler || []]
  } : mevzuat2012Data[0];
  
  // Show all mevzuat, but with updated main mevzuat
  const allMevzuat = [...mevzuatData, ...mevzuat2012Data, ...kanun5520Data, ...kanun3213Data, ...kanun4706Data, ...kanun3065Data].map(m => {
    if (m.id === '9903' && mainMevzuat) {
      return updatedMevzuat;
    }
    if (m.id === '2012-3305' && updated2012Mevzuat) {
      return updated2012Mevzuat;
    }
    return m;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <DocumentTextIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mevzuat Kütüphanesi</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Türkiye Cumhuriyeti Mevzuatı</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mevzuat Listesi</h2>
          <p className="text-gray-600 dark:text-gray-400">Aşağıdaki mevzuatları inceleyebilir, içeriklerini detaylı olarak okuyabilirsiniz.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {allMevzuat.map((mevzuat) => (
            <div key={mevzuat.id} className="group">
              <Link to={`/mevzuat/${mevzuat.id}`} className="block">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-primary-300 dark:group-hover:border-primary-600 group-hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary-50 dark:bg-primary-900/50 rounded-lg">
                        <DocumentTextIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {mevzuat.baslik}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        {mevzuat.maddeler.filter(m => typeof m.madde_no === 'number').length} Madde, 
                        {mevzuat.maddeler.filter(m => m.madde_no.toString().startsWith('Geçici')).length} Geçici Madde,
                        {new Set(mevzuat.maddeler.filter(m => m.madde_no.toString().startsWith('EK')).map(m => m.madde_no)).size} Ek
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        {mevzuat.id.includes('ek') ? 'Ek' : 'Karar'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MevzuatList;