
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, BarChart2, CheckSquare, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-teal to-green flex items-center justify-center">
            <span className="text-white font-bold text-sm">CR</span>
          </div>
          <h1 className="font-bold text-lg md:text-xl text-navy">CraveLess</h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-teal transition-colors">Home</a>
          <a href="#tracker" className="text-gray-600 hover:text-teal transition-colors">Tracker</a>
          <a href="#check-in" className="text-gray-600 hover:text-teal transition-colors">Check-in</a>
          <a href="#resources" className="text-gray-600 hover:text-teal transition-colors">Resources</a>
        </nav>
        
        <div className="md:hidden flex items-center">
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <BarChart2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <CheckSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <BookOpen className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
