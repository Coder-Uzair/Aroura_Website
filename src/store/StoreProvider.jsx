import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';

// ========== THEME ==========
const ThemeCtx = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('aurum-theme') || 'dark';
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('aurum-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return <ThemeCtx.Provider value={{ theme, toggleTheme }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);

// ========== AUTH ==========
const AuthCtx = createContext(null);
const ADMIN_EMAIL = 'admin@aurum.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aurum-user')); } catch { return null; }
  });

  const persist = (u) => {
    setUser(u);
    if (u) localStorage.setItem('aurum-user', JSON.stringify(u));
    else localStorage.removeItem('aurum-user');
  };

  const login = async (email, password) => {
    await new Promise((r) => setTimeout(r, 600));
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const admin = { id: 'admin-1', name: 'Admin', email, role: 'admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' };
      persist(admin);
      return { ok: true, user: admin };
    }
    // Demo users
    const users = JSON.parse(localStorage.getItem('aurum-users') || '[]');
    const found = users.find((u) => u.email === email);
    if (!found) return { ok: false, error: 'No account found with that email.' };
    if (found.password !== password) return { ok: false, error: 'Incorrect password.' };
    const u = { ...found }; delete u.password;
    persist(u);
    return { ok: true, user: u };
  };

  const register = async ({ name, email, password }) => {
    await new Promise((r) => setTimeout(r, 600));
    const users = JSON.parse(localStorage.getItem('aurum-users') || '[]');
    if (users.find((u) => u.email === email) || email === ADMIN_EMAIL) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const newU = {
      id: 'u-' + Date.now(),
      name,
      email,
      password,
      role: 'customer',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      joinedAt: new Date().toISOString(),
      addresses: [],
    };
    users.push(newU);
    localStorage.setItem('aurum-users', JSON.stringify(users));
    const out = { ...newU }; delete out.password;
    persist(out);
    return { ok: true, user: out };
  };

  const logout = () => persist(null);

  const updateUser = (patch) => {
    if (!user) return;
    const updated = { ...user, ...patch };
    persist(updated);
    const users = JSON.parse(localStorage.getItem('aurum-users') || '[]');
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...patch };
      localStorage.setItem('aurum-users', JSON.stringify(users));
    }
  };

  return (
    <AuthCtx.Provider value={{ user, login, register, logout, updateUser, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthCtx.Provider>
  );
}
export const useAuth = () => useContext(AuthCtx);

// ========== CART ==========
const CartCtx = createContext(null);
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aurum-cart')) || []; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('aurum-cart', JSON.stringify(items)); }, [items]);

  const addToCart = (productId, qty = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing) return prev.map((i) => i.id === productId ? { ...i, qty: Math.min(i.qty + qty, product.stock) } : i);
      return [...prev, { id: productId, qty: Math.min(qty, product.stock) }];
    });
  };
  const updateQty = (productId, qty) => {
    setItems((prev) => prev.map((i) => i.id === productId ? { ...i, qty: Math.max(1, qty) } : i));
  };
  const removeItem = (productId) => setItems((prev) => prev.filter((i) => i.id !== productId));
  const clearCart = () => setItems([]);

  const enriched = useMemo(() => items.map((i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    return p ? { ...p, qty: i.qty, linePrice: (p.discountPrice || p.price) * i.qty } : null;
  }).filter(Boolean), [items]);

  const subtotal = enriched.reduce((s, i) => s + i.linePrice, 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 12;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartCtx.Provider value={{ items: enriched, addToCart, updateQty, removeItem, clearCart, count, subtotal, shipping, tax, total }}>
      {children}
    </CartCtx.Provider>
  );
}
export const useCart = () => useContext(CartCtx);

// ========== WISHLIST ==========
const WishCtx = createContext(null);
export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aurum-wishlist')) || []; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('aurum-wishlist', JSON.stringify(ids)); }, [ids]);
  const toggle = (id) => setIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const has = (id) => ids.includes(id);
  const items = useMemo(() => PRODUCTS.filter((p) => ids.includes(p.id)), [ids]);
  return <WishCtx.Provider value={{ ids, toggle, has, items }}>{children}</WishCtx.Provider>;
}
export const useWishlist = () => useContext(WishCtx);

// ========== ORDERS ==========
const OrdersCtx = createContext(null);
export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aurum-orders')) || []; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('aurum-orders', JSON.stringify(orders)); }, [orders]);

  // seed demo orders
  useEffect(() => {
    if (orders.length === 0) {
      const now = new Date();
      const demo = [
        {
          id: 'ORD-20260001',
          userId: 'demo-1', userName: 'Alex Morgan', userEmail: 'alex@example.com',
          date: new Date(now - 86400000 * 3).toISOString(),
          status: 'Delivered',
          items: [
            { ...PRODUCTS[0], qty: 1, linePrice: PRODUCTS[0].discountPrice },
            { ...PRODUCTS[7], qty: 2, linePrice: PRODUCTS[7].discountPrice * 2 },
          ],
          subtotal: PRODUCTS[0].discountPrice + PRODUCTS[7].discountPrice * 2,
          shipping: 0, tax: 88.4, total: 1200.4,
          address: { name: 'Alex Morgan', line1: '1250 Market St', city: 'San Francisco', state: 'CA', zip: '94103', country: 'USA' },
          payment: '•••• 4242',
        },
        {
          id: 'ORD-20260002',
          userId: 'demo-2', userName: 'Nora Singh', userEmail: 'nora@example.com',
          date: new Date(now - 86400000 * 1).toISOString(),
          status: 'Shipped',
          items: [{ ...PRODUCTS[8], qty: 1, linePrice: PRODUCTS[8].discountPrice }],
          subtotal: 149, shipping: 0, tax: 11.92, total: 160.92,
          address: { name: 'Nora Singh', line1: '78 Baker St', city: 'London', state: '', zip: 'W1U 6PZ', country: 'UK' },
          payment: '•••• 1234',
        },
        {
          id: 'ORD-20260003',
          userId: 'demo-3', userName: 'Kenji Ito', userEmail: 'kenji@example.com',
          date: new Date(now - 86400000 * 6).toISOString(),
          status: 'Processing',
          items: [
            { ...PRODUCTS[20], qty: 2, linePrice: PRODUCTS[20].discountPrice * 2 },
            { ...PRODUCTS[29], qty: 1, linePrice: PRODUCTS[29].discountPrice },
          ],
          subtotal: PRODUCTS[20].discountPrice * 2 + PRODUCTS[29].discountPrice,
          shipping: 12, tax: 22.24, total: 291.24,
          address: { name: 'Kenji Ito', line1: '2-1-1 Nihonbashi', city: 'Tokyo', state: '', zip: '103-0027', country: 'Japan' },
          payment: '•••• 9876',
        },
      ];
      setOrders(demo);
    }
    // eslint-disable-next-line
  }, []);

  const placeOrder = ({ userId, userName, userEmail, items, subtotal, shipping, tax, total, address, payment }) => {
    const id = 'ORD-' + (20260000 + orders.length + 1);
    const order = {
      id, userId, userName, userEmail,
      date: new Date().toISOString(), status: 'Processing',
      items, subtotal, shipping, tax, total, address, payment,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };
  const updateStatus = (id, status) => setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));

  return <OrdersCtx.Provider value={{ orders, placeOrder, updateStatus }}>{children}</OrdersCtx.Provider>;
}
export const useOrders = () => useContext(OrdersCtx);
