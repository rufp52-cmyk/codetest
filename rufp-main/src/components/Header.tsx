import { useState } from 'react';
import { Menu, X, Star, ShoppingBag, Globe, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { name: 'ABOUT', id: 'about' },
    { name: 'TALENT', id: 'talent' },
    { name: 'CONTENT', id: 'content' },
    { name: 'AUDITION', id: 'audition' },
    { name: 'CAREERS', id: 'careers' },
    { name: 'SUPPORT', id: 'support' },
    { name: 'STORE', id: 'store' },
  ];

  return (
    <header className="sticky top-0 bg-black/90 backdrop-blur-md z-50 border-b border-zinc-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Main Logo */}
        <div 
          onClick={() => onNavigate('hero')}
          className="cursor-pointer flex items-center justify-center gap-2 mb-4 group select-none"
        >
          <span className="text-2xl font-bold tracking-[0.25em] text-white flex items-center transition-all duration-300 group-hover:text-amber-400">
            ST
            <span className="inline-block relative">
              A
              <Star className="w-3 h-3 absolute -top-1.5 left-1/2 -translate-x-[45%] text-white fill-white group-hover:text-amber-400 group-hover:fill-amber-400 animate-pulse" />
            </span>
            RSHIP
          </span>
        </div>

        {/* Navigation Menus for Desktop */}
        <nav className="hidden md:flex items-center justify-center gap-10 text-xs font-semibold tracking-widest text-[#d8d8d8]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="hover:text-white px-2 py-1 transition-all duration-200 relative group uppercase"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          
          {/* Quick Actions */}
          <div className="ml-4 flex items-center gap-4 text-zinc-400">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="hover:text-white transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('store')} 
              className="hover:text-white transition-colors cursor-pointer"
              title="Starship Store"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center justify-between w-full">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white hover:text-zinc-300 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center gap-4 text-zinc-400">
            <button onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('store')}>
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full bg-black/95 border-b border-zinc-800 p-4"
          >
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <input
                type="text"
                placeholder="Search Starship artists, activities, or releases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-amber-400 text-sm"
              />
              <button 
                onClick={() => {
                  alert(`Searching for: ${searchQuery}`);
                  setShowSearch(false);
                }}
                className="bg-white hover:bg-zinc-200 text-black text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-zinc-900 mt-4 overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className="text-left text-sm font-semibold tracking-widest text-zinc-300 hover:text-white px-2 py-1 border-l-2 border-transparent hover:border-white"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
