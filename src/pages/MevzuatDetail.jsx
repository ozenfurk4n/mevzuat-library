import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import mevzuatData from '../data/9903-karar.json';
import ek1Data from '../data/9903-ek1.json';
import ek2Data from '../data/9903-ek2.json';
import ek3Data from '../data/9903-ek3.json';
import ek4Data from '../data/9903-ek4.json';
import ek5Data from '../data/9903-ek5.json';
import Sidebar from '../components/Sidebar';
import AtifParser from '../components/AtifParser';
import ThemeToggle from '../components/ThemeToggle';

function MevzuatDetail() {
  const { id } = useParams();
  
  // Find the main mevzuat
  let mevzuat = mevzuatData.find((m) => m.id === id);
  
  // If this is the main mevzuat (9903), add EK-1, EK-2, EK-3, EK-4 and EK-5 maddeler to it
  if (mevzuat && mevzuat.id === '9903') {
    const ek1Maddeler = ek1Data[0]?.maddeler || [];
    const ek2Maddeler = ek2Data[0]?.maddeler || [];
    const ek3Maddeler = ek3Data[0]?.maddeler || [];
    const ek4Maddeler = ek4Data[0]?.maddeler || [];
    const ek5Maddeler = ek5Data[0]?.maddeler || [];
    mevzuat = {
      ...mevzuat,
      maddeler: [...mevzuat.maddeler, ...ek1Maddeler, ...ek2Maddeler, ...ek3Maddeler, ...ek4Maddeler, ...ek5Maddeler]
    };
  }
  
  // If this is EK-1 (9903-ek1), find the main mevzuat and show it with EK-1, EK-2, EK-3, EK-4 and EK-5
  if (mevzuat && mevzuat.id === '9903-ek1') {
    const mainMevzuat = mevzuatData.find(m => m.id === '9903');
    const ek1Maddeler = ek1Data[0]?.maddeler || [];
    const ek2Maddeler = ek2Data[0]?.maddeler || [];
    const ek3Maddeler = ek3Data[0]?.maddeler || [];
    const ek4Maddeler = ek4Data[0]?.maddeler || [];
    const ek5Maddeler = ek5Data[0]?.maddeler || [];
    if (mainMevzuat) {
      mevzuat = {
        ...mainMevzuat,
        maddeler: [...mainMevzuat.maddeler, ...ek1Maddeler, ...ek2Maddeler, ...ek3Maddeler, ...ek4Maddeler, ...ek5Maddeler]
      };
    }
  }
  
  // If this is EK-2 (9903-ek2), find the main mevzuat and show it with EK-1, EK-2, EK-3, EK-4 and EK-5
  if (mevzuat && mevzuat.id === '9903-ek2') {
    const mainMevzuat = mevzuatData.find(m => m.id === '9903');
    const ek1Maddeler = ek1Data[0]?.maddeler || [];
    const ek2Maddeler = ek2Data[0]?.maddeler || [];
    const ek3Maddeler = ek3Data[0]?.maddeler || [];
    const ek4Maddeler = ek4Data[0]?.maddeler || [];
    const ek5Maddeler = ek5Data[0]?.maddeler || [];
    if (mainMevzuat) {
      mevzuat = {
        ...mainMevzuat,
        maddeler: [...mainMevzuat.maddeler, ...ek1Maddeler, ...ek2Maddeler, ...ek3Maddeler, ...ek4Maddeler, ...ek5Maddeler]
      };
    }
  }
  
  // If this is EK-3 (9903-ek3), find the main mevzuat and show it with EK-1, EK-2, EK-3, EK-4 and EK-5
  if (mevzuat && mevzuat.id === '9903-ek3') {
    const mainMevzuat = mevzuatData.find(m => m.id === '9903');
    const ek1Maddeler = ek1Data[0]?.maddeler || [];
    const ek2Maddeler = ek2Data[0]?.maddeler || [];
    const ek3Maddeler = ek3Data[0]?.maddeler || [];
    const ek4Maddeler = ek4Data[0]?.maddeler || [];
    const ek5Maddeler = ek5Data[0]?.maddeler || [];
    if (mainMevzuat) {
      mevzuat = {
        ...mainMevzuat,
        maddeler: [...mainMevzuat.maddeler, ...ek1Maddeler, ...ek2Maddeler, ...ek3Maddeler, ...ek4Maddeler, ...ek5Maddeler]
      };
    }
  }
  
  // If this is EK-4 (9903-ek4), find the main mevzuat and show it with EK-1, EK-2, EK-3, EK-4 and EK-5
  if (mevzuat && mevzuat.id === '9903-ek4') {
    const mainMevzuat = mevzuatData.find(m => m.id === '9903');
    const ek1Maddeler = ek1Data[0]?.maddeler || [];
    const ek2Maddeler = ek2Data[0]?.maddeler || [];
    const ek3Maddeler = ek3Data[0]?.maddeler || [];
    const ek4Maddeler = ek4Data[0]?.maddeler || [];
    const ek5Maddeler = ek5Data[0]?.maddeler || [];
    if (mainMevzuat) {
      mevzuat = {
        ...mainMevzuat,
        maddeler: [...mainMevzuat.maddeler, ...ek1Maddeler, ...ek2Maddeler, ...ek3Maddeler, ...ek4Maddeler, ...ek5Maddeler]
      };
    }
  }
  const [activeMadde, setActiveMadde] = useState(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const maddeElements = mainContentRef.current?.querySelectorAll('[data-madde-id]');
      if (!maddeElements) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const offset = 200; // Header yüksekliği + ekstra offset
      
      let currentMadde = null;
      let bestMatch = null;
      let bestDistance = Infinity;

      maddeElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const distance = Math.abs(elementTop - scrollTop - offset);
        
        // Element görünür alanda mı kontrol et
        if (rect.top <= windowHeight * 0.3 && rect.bottom >= windowHeight * 0.1) {
          if (distance < bestDistance) {
            bestDistance = distance;
            bestMatch = element.getAttribute('data-madde-id');
          }
        }
        
        // En yakın elementi bul
        if (distance < bestDistance) {
          bestDistance = distance;
          currentMadde = element.getAttribute('data-madde-id');
        }
      });
      
      // Görünür alandaki maddeyi tercih et
      const finalMadde = bestMatch || currentMadde;
      if (finalMadde && finalMadde !== activeMadde) {
        setActiveMadde(finalMadde);
      }
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [mevzuat, activeMadde]);

  if (!mevzuat) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <DocumentTextIcon className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Mevzuat Bulunamadı</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Aradığınız mevzuat bulunamadı.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Tüm Mevzuatlar</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {mevzuat.baslik}
                </h1>
                {activeMadde && (
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                      MADDE {activeMadde} - {mevzuat.maddeler.find(m => m.madde_no == activeMadde)?.baslik || ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto flex">
        <Sidebar 
          maddeler={mevzuat.maddeler} 
          activeMadde={activeMadde} 
        />
        
        <main ref={mainContentRef} className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 lg:p-8">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {mevzuat.baslik}
                  </h1>
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                      {mevzuat.maddeler.filter(m => typeof m.madde_no === 'number').length} Madde, 
                      {mevzuat.maddeler.filter(m => m.madde_no.toString().startsWith('Geçici')).length} Geçici Madde,
                      {new Set(mevzuat.maddeler.filter(m => m.madde_no.toString().startsWith('EK')).map(m => m.madde_no)).size} Ek
                    </span>
                  </div>
                </div>

                <div className="space-y-8">
                  {mevzuat.maddeler.map((madde) => (
                    <article 
                      key={madde.madde_no} 
                      id={`madde-${madde.madde_no}`} 
                      data-madde-id={madde.madde_no} 
                      className="scroll-mt-24 border-l-4 border-primary-200 dark:border-primary-700 pl-6"
                    >
                      <header className="mb-4">
                                                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                      <span className="text-primary-600 dark:text-primary-400">
                              {madde.madde_no === "EK-1" || madde.madde_no === "EK-2" || madde.madde_no === "EK-3" || madde.madde_no === "EK-4" || madde.madde_no === "EK-5" ? madde.madde_no : `MADDE ${madde.madde_no}`}
                            </span>
                          <span className="text-gray-400 dark:text-gray-500 mx-3">—</span>
                          <span>{madde.baslik}</span>
                        </h2>
                      </header>
                      
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <AtifParser metin={madde.paragraflar} tumMaddeler={mevzuat.maddeler} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MevzuatDetail;