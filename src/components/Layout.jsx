import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Search, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useAuth } from '../store/StoreProvider';
import { useCart } from '../store/StoreProvider';
import { useWishlist } from '../store/StoreProvider';
import { useTheme } from '../store/StoreProvider';
import { CATEGORIES } from '../data/products';

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { user, isAdmin } = useAuth();
  const { count } = useCart();
  const { ids } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => { setOpen(false); setSearchOpen(false); }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    ...CATEGORIES.map((c) => ({ to: `/shop?category=${c.id}`, label: c.name })),
  ];

  return (
    <>
      {/* Top promo bar */}
      <div className="hidden md:block bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 text-white text-xs font-medium tracking-wide text-center py-2 px-4">
        <span className="inline-flex items-center gap-2"><Sparkles className="h-3 w-3" /> Free worldwide shipping on orders over $200 · Use code AURUM26 for 10% off</span>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/60 dark:border-white/10 shadow-sm' : 'bg-white/0 dark:bg-transparent border-b border-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-amber-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all">
              <span className="text-white font-black text-lg tracking-tighter">A</span>
              <motion.div className="absolute inset-0 rounded-xl border border-white/30" whileHover={{ scale: 1.1 }} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">AURUM</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 font-semibold">Commerce · 2026</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 5).map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'}`
              }>
                {l.label}
              </NavLink>
            ))}
            <div className="group relative">
              <button className="px-4 py-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all">
                Categories
              </button>
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="min-w-[240px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  {CATEGORIES.map((c) => (
                    <Link key={c.id} to={`/shop?category=${c.id}`} className="block px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(true)} className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-colors" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={toggleTheme} className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-colors" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/wishlist" className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-colors">
              <Heart className="h-5 w-5" />
              {ids.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">{ids.length}</span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">{count}</span>
              )}
            </Link>
            {user ? (
              <Link to={isAdmin ? '/admin' : '/profile'} className="hidden md:flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
                <img src={user.avatar} alt="" className="h-7 w-7 rounded-full object-cover bg-neutral-200" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-semibold hover:opacity-90 transition-opacity">
                <User className="h-4 w-4" /> Sign in
              </Link>
            )}
            <button onClick={() => setOpen(true)} className="lg:hidden p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-neutral-950 shadow-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-black text-neutral-900 dark:text-white">Menu</span>
                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10">
                  <X className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="px-4 py-3 rounded-xl text-base font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5">
                    {l.label}
                  </Link>
                ))}
                <div className="h-px bg-neutral-200 dark:bg-white/10 my-4" />
                {!user && <Link to="/login" className="px-4 py-3 rounded-xl text-base font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">Sign in</Link>}
                {user && <Link to={isAdmin ? '/admin' : '/profile'} className="px-4 py-3 rounded-xl text-base font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">My Account</Link>}
                <Link to="/orders" className="px-4 py-3 rounded-xl text-base font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5">Orders</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search modal */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchOverlay({ open, onClose }) {
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    if (!open) setQ('');
  }, [open]);

  const results = q.trim().length > 0
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()) || p.tags.some((t) => t.includes(q.toLowerCase()))).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
          <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="relative max-w-2xl mx-auto mt-24 px-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-5 border-b border-neutral-200 dark:border-white/10">
                <Search className="h-5 w-5 text-neutral-400" />
                <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands, categories..." className="flex-1 bg-transparent text-base text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none" />
                <kbd className="hidden md:inline text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-white/5 text-neutral-500 font-mono">ESC</kbd>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-3">
                {q.trim().length === 0 && (
                  <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">
                    <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Start typing to search across our catalog</p>
                  </div>
                )}
                {results.length === 0 && q.trim().length > 0 && (
                  <div className="p-8 text-center text-neutral-500 dark:text-neutral-400 text-sm">No products found for "{q}"</div>
                )}
                {results.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} onClick={onClose} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                    <img src={p.images[0]} alt="" className="h-14 w-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{p.name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{p.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">${p.discountPrice || p.price}</p>
                      {p.discountPrice && <p className="text-xs text-neutral-400 line-through">${p.price}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { PRODUCTS } from '../data/products';

export function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-white/10 mt-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-amber-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">AURUM</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Premium commerce for modern creators. Curated instruments, apparel, travel gear, and cosmic collectibles — delivered worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {['twitter', 'instagram', 'youtube', 'tiktok'].map((s) => (
                <a key={s} href="#" className="h-10 w-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-white dark:hover:text-white transition-colors">
                  <span className="text-xs uppercase font-bold">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Shop', links: ['All Products', 'New Arrivals', 'Best Sellers', 'Sale'] },
            { title: 'Company', links: ['About', 'Careers', 'Press', 'Sustainability'] },
            { title: 'Support', links: ['Help Center', 'Shipping', 'Returns', 'Contact'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-white/10 flex flex-col md:flex-row justify-between gap-4 items-center">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">© 2026 AURUM Commerce Inc. All rights reserved. Built with premium craft.</p>
          <div className="flex gap-6 text-xs text-neutral-500 dark:text-neutral-400">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Privacy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Terms</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}
