import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function Sidebar({ maddeler, activeMadde }) {
  const { theme } = useTheme();
  
  return (
    <aside className="w-full md:w-1/4 md:sticky top-0 h-screen overflow-y-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-6">
        <nav>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
            İçindekiler
          </h3>
          <ul className="space-y-1">
            {maddeler.map((madde) => (
              <li key={madde.madde_no}>
                <a
                  href={`#madde-${madde.madde_no}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(`madde-${madde.madde_no}`);
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                      });
                    }
                  }}
                  className={`group block p-3 rounded-lg text-sm transition-all duration-200 border ${
                    activeMadde == madde.madde_no
                      ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-semibold border-primary-200 dark:border-primary-700 shadow-sm relative'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                  }`}
                >
                  {activeMadde == madde.madde_no && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full"></div>
                  )}
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-200 ${
                      activeMadde == madde.madde_no 
                        ? 'bg-primary-500 animate-pulse' 
                        : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'
                    }`}></div>
                                         <span className="truncate">
                       <span className="font-medium">
                         {madde.madde_no === "EK-1" || madde.madde_no === "EK-2" || madde.madde_no === "EK-3" ? madde.madde_no : `${madde.madde_no} -`}
                       </span> {madde.baslik}
                     </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;