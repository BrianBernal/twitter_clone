import { useState, useEffect } from 'react';
import { Outlet, useLocation } from '@tanstack/react-router';
import { getToken } from '../../api/client';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MobileNav from './MobileNav';
import MobileDrawer from './MobileDrawer';

function RootLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleAuthChange = () => setKey((k) => k + 1);
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  void key;

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <Outlet />
      </div>
    );
  }

  if (!getToken()) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface" key={key}>
      <div className="flex justify-center mx-auto" style={{ maxWidth: '1225px' }}>
        <div className="hidden md:block w-[275px] shrink-0">
          <div className="relative">
            <LeftSidebar />
          </div>
        </div>

        <main className="w-full md:max-w-[600px] border-x border-border min-h-screen">
          <Outlet />
        </main>

        <div className="hidden lg:block w-[350px] shrink-0">
          <RightSidebar />
        </div>
      </div>

      <MobileNav />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="md:hidden h-16" />
    </div>
  );
}

export default RootLayout;
