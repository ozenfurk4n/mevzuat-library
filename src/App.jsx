import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MevzuatList from './pages/MevzuatList';
import MevzuatDetail from './pages/MevzuatDetail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
          <Routes>
            <Route path="/" element={<MevzuatList />} />
            <Route path="/mevzuat/:id" element={<MevzuatDetail />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;