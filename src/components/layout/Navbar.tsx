import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mwefLogo from '@/assets/mwef-logo.png';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  name: string;
  path?: string;
  children?: { name: string; path: string }[];
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { 
    name: 'About MWEF', 
    children: [
      { name: 'About Us', path: '/about' },
      { name: 'Conference Structure', path: '/about/conference' },
      { name: 'Our Secretariat', path: '/about/secretariat' },
    ]
  },
  { 
    name: 'Conference Resources', 
    children: [
      { name: 'Committees', path: '/resources/committees' },
      { name: 'Countries & Institutions', path: '/resources/countries' },
      { name: 'Delegate Resources', path: '/resources' },
      { name: 'Rules & Procedures', path: '/resources/rules' },
    ]
  },
  { name: 'Get Involved', path: '/get-involved' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const isActive = (item: NavItem) => {
    if (item.path) return location.pathname === item.path;
    if (item.children) return item.children.some(child => location.pathname === child.path);
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg' : 'bg-primary'}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={mwefLogo} alt="MWEF Logo" className="h-10 md:h-12 w-auto" />
            <span className="hidden sm:block text-white font-bold text-lg">MWEF</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.children ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`nav-link px-3 py-2 text-sm font-medium flex items-center gap-1 ${isActive(item) ? 'text-white' : ''}`}
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.name}
                    <ChevronDown size={14} className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
                        onMouseEnter={() => setOpenDropdown(item.name)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-3 text-sm hover:bg-accent/10 transition-colors ${location.pathname === child.path ? 'text-accent font-medium' : 'text-foreground'}`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path!}
                  className={`nav-link px-3 py-2 text-sm font-medium relative ${location.pathname === item.path ? 'text-white' : ''}`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </Link>
              )
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 text-white/90 hover:text-white px-3 py-2 text-sm font-medium">
                <User size={18} />
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium">
                Login
              </Link>
            )}
            {!user && (
              <Link to="/register" className="bg-accent text-accent-foreground font-semibold px-5 py-2.5 rounded-md text-sm transition-all duration-200 hover:opacity-90">
                Register Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-white" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-primary border-t border-white/10">
            <div className="section-container py-4 space-y-1">
              {navItems.map((item) => (
                item.children ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-md"
                    >
                      {item.name}
                      <ChevronDown size={16} className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pl-4">
                          {item.children.map((child) => (
                            <Link key={child.path} to={child.path} className="block px-4 py-2 text-white/70 hover:text-white text-sm">
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={item.path} to={item.path!} className={`block px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-md ${location.pathname === item.path ? 'text-white bg-white/10' : ''}`}>
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-4 space-y-2">
                {user ? (
                  <Link to="/dashboard" className="block text-center border border-white/20 text-white font-semibold px-5 py-3 rounded-md">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="block text-center border border-white/20 text-white font-semibold px-5 py-3 rounded-md">
                    Login
                  </Link>
                )}
                {!user && (
                  <Link to="/register" className="block text-center bg-accent text-accent-foreground font-semibold px-5 py-3 rounded-md">
                    Register Now
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
