import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Splash from './components/Splash';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Home from './components/Home';
import Wallet from './components/Wallet';
import Profile from './components/Profile';

type Page = 'splash' | 'onboarding' | 'login' | 'home' | 'wallet' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');

  // Prevent back button issues in preview
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: Page) => setCurrentPage(page);

  return (
    <div className="antialiased">
      <AnimatePresence mode="wait">
        {currentPage === 'splash' && (
          <motion.div 
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Splash onComplete={() => navigateTo('onboarding')} />
          </motion.div>
        )}
        
        {currentPage === 'onboarding' && (
          <motion.div 
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Onboarding onNext={() => navigateTo('login')} />
          </motion.div>
        )}

        {currentPage === 'login' && (
          <motion.div 
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Login onLogin={() => navigateTo('home')} />
          </motion.div>
        )}

        {currentPage === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Home onNavigate={(page) => navigateTo(page as Page)} />
          </motion.div>
        )}

        {currentPage === 'wallet' && (
          <motion.div 
            key="wallet"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Wallet onBack={() => navigateTo('home')} />
          </motion.div>
        )}

        {currentPage === 'profile' && (
          <motion.div 
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Profile onBack={() => navigateTo('home')} onLogout={() => navigateTo('login')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
