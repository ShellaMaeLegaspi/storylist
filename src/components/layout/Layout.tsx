
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { 
  BookOpen, 
  Library, 
  PlusCircle, 
  BarChart2, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/books', label: 'Library', icon: Library },
    { path: '/books/new', label: 'Add Book', icon: PlusCircle },
    { path: '/stats', label: 'Statistics', icon: BarChart2 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/books') {
      return location.pathname === '/books' || 
             location.pathname.startsWith('/books/') && 
             !location.pathname.includes('/new');
    }
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-card border-r border-border transition-all duration-300",
            sidebarCollapsed ? "w-16" : "w-64"
          )}
        >
          <div className="sticky top-16 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className={cn("text-lg font-medium transition-opacity", 
                sidebarCollapsed ? "opacity-0" : "opacity-100"
              )}>
                Book Management
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? '→' : '←'}
              </Button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive(item.path) 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-accent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className={cn(
                    "transition-opacity", 
                    sidebarCollapsed ? "opacity-0 hidden" : "opacity-100"
                  )}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
