import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center group-hover:bg-neon/20 group-hover:shadow-neon-sm transition-all duration-200">
            <Zap className="w-4 h-4 text-neon" />
          </div>
          <div className="hidden sm:block">
            <p className="font-display font-bold text-white text-sm leading-none">
              Teknofest Kulüpler Birliği
            </p>
            <p className="text-neon font-mono text-[10px] tracking-widest leading-none mt-0.5">
              TKB
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'text-neon bg-neon/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Anasayfa
          </NavLink>
          <NavLink
            to="/manifesto"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'text-neon bg-neon/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Manifesto
          </NavLink>
          <Link to="/basvuru" id="navbar-apply-btn" className="btn-primary ml-3 text-xs px-5 py-2">
            Başvuru Yap
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç/kapat"
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } border-t border-white/5 bg-navy-900/98 backdrop-blur-md`}
      >
        <nav className="container-max mx-auto px-4 py-4 flex flex-col gap-2">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'text-neon bg-neon/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Anasayfa
          </NavLink>
          <NavLink
            to="/manifesto"
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'text-neon bg-neon/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Manifesto
          </NavLink>
          <Link to="/basvuru" onClick={closeMenu} className="btn-primary justify-center mt-1">
            Başvuru Yap
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
