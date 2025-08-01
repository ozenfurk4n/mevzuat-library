import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../components/ThemeToggle';
import mevzuatData from '../data/mevzuat.json';

function MevzuatList() {
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
          {mevzuatData.map((mevzuat) => (
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
                      <span>{mevzuat.maddeler.length} Madde</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        Karar
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