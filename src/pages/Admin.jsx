import React from 'react';
import { Link, useNavigate, NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Star, Tag, LogOut, Search, Bell, TrendingUp,
  DollarSign, ShoppingCart, UserCheck, Plus, Edit, Trash2, Eye, Menu, X, Home, ChevronRight,
  ArrowUp, ArrowDown, MoreVertical,
} from 'lucide-react';
import { useAuth, useOrders } from '../store/StoreProvider';
import { PRODUCTS, CATEGORIES, REVIEWS } from '../data/products';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { OrderStatusBadge } from './Shopping';

const revenueData = [
  { month: 'Jan', revenue: 48200, orders: 124 }, { month: 'Feb', revenue: 52800, orders: 138 },
  { month: 'Mar', revenue: 61400, orders: 156 }, { month: 'Apr', revenue: 58900, orders: 149 },
  { month: 'May', revenue: 72300, orders: 187 }, { month: 'Jun', revenue: 84500, orders: 213 },
  { month: 'Jul', revenue: 91200, orders: 228 }, { month: 'Aug', revenue: 98700, orders: 241 },
];

const categoryData = CATEGORIES.map((c) => ({
  name: c.name.split(' ')[0],
  value: PRODUCTS.filter((p) => p.category === c.id).length,
}));
const PIE_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#a855f7'];

export default function Admin() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (!user) navigate('/login');
    else if (!isAdmin) navigate('/');
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) return null;

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/categories', icon: Tag, label: 'Categories' },
    { to: '/admin/reviews', icon: Star, label: 'Reviews' },
  ];

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 h-screen w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-white/10 z-50 transition-transform flex flex-col`}>
        <div className="p-6 border-b border-neutral-200 dark:border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-amber-500 flex items-center justify-center">
              <span className="text-white font-black">A</span>
            </div>
            <div>
              <p className="text-sm font-black text-neutral-900 dark:text-white">AURUM</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Admin</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-200 dark:border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 mb-3">
            <img src={user.avatar} alt="" className="h-9 w-9 rounded-full bg-neutral-200 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold text-center border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">
              <Home className="h-3 w-3 inline mr-1" /> Store
            </Link>
            <button onClick={() => { logout(); navigate('/'); }} className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 border border-rose-200 dark:border-rose-900/30 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
              <LogOut className="h-3 w-3 inline mr-1" /> Sign out
            </button>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl border-b border-neutral-200 dark:border-white/10">
          <div className="flex items-center justify-between gap-4 px-4 md:px-8 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5">
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 text-sm w-80">
                <Search className="h-4 w-4 text-neutral-400" />
                <input placeholder="Search orders, products, customers..." className="flex-1 bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-500" />
                <kbd className="text-[10px] font-mono text-neutral-500 px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800">⌘K</kbd>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/5">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
              </button>
              <img src={user.avatar} alt="" className="h-9 w-9 rounded-full bg-neutral-200 object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="customers" element={<CustomersAdmin />} />
              <Route path="categories" element={<CategoriesAdmin />} />
              <Route path="reviews" element={<ReviewsAdmin />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function PageHeader({ title, desc, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">{title}</h1>
        {desc && <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>}
      </div>
      {action}
    </motion.div>
  );
}

function Dashboard() {
  const { orders } = useOrders();
  const stats = [
    { label: 'Total Revenue', value: '$98,742', change: '+12.5%', up: true, icon: DollarSign, color: 'from-emerald-500 to-teal-600' },
    { label: 'Orders', value: orders.length.toString(), change: '+8.2%', up: true, icon: ShoppingCart, color: 'from-violet-500 to-fuchsia-600' },
    { label: 'Customers', value: '12,482', change: '+15.3%', up: true, icon: UserCheck, color: 'from-sky-500 to-blue-600' },
    { label: 'Conversion', value: '3.42%', change: '-0.4%', up: false, icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <>
      <PageHeader title="Overview" desc="Welcome back — here's what's happening with your store today." action={
        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-full border border-neutral-200 dark:border-white/10 text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">Download Report</button>
          <button className="px-4 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold flex items-center gap-2"><Plus className="h-4 w-4" /> Add Product</button>
        </div>
      } />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xs font-bold flex items-center gap-1 ${s.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                {s.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />} {s.change}
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-2xl font-black text-neutral-900 dark:text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold">Revenue Overview</h3>
              <p className="text-xs text-neutral-500">Last 8 months</p>
            </div>
            <select className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 bg-transparent">
              <option>This Year</option><option>Last Year</option>
            </select>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'currentColor' }} className="text-neutral-500" axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} className="text-neutral-500" axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: 'rgb(23 23 23)', border: 'none', borderRadius: 12, color: 'white', fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
          <h3 className="text-base font-bold mb-1">Sales by Category</h3>
          <p className="text-xs text-neutral-500 mb-4">Current distribution</p>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgb(23 23 23)', border: 'none', borderRadius: 12, color: 'white', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {categoryData.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />{c.name}</div>
                <span className="font-bold">{c.value} items</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Orders table + Top products */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold">Recent Orders</h3>
            <Link to="/admin/orders" className="text-xs font-semibold text-violet-600 hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-neutral-500 uppercase tracking-wider border-b border-neutral-200 dark:border-white/10">
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="border-b border-neutral-100 dark:border-white/5 last:border-0">
                    <td className="py-3 font-mono text-xs font-semibold">{o.id}</td>
                    <td className="py-3">{o.userName}</td>
                    <td className="py-3 font-bold">${o.total.toFixed(2)}</td>
                    <td className="py-3"><OrderStatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
          <h3 className="text-base font-bold mb-4">Top Products</h3>
          <div className="space-y-3">
            {[...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{p.name}</p>
                  <p className="text-xs text-neutral-500">{p.reviews} sold</p>
                </div>
                <p className="text-sm font-bold">${p.discountPrice || p.price}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

function ProductsAdmin() {
  const [search, setSearch] = React.useState('');
  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHeader title="Products" desc={`${PRODUCTS.length} products in your catalog`} action={
        <button className="px-4 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold flex items-center gap-2"><Plus className="h-4 w-4" /> Add Product</button>
      } />
      <div className="p-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products by name or SKU..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-white/5 text-sm outline-none" />
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr className="text-left text-xs text-neutral-500 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const cat = CATEGORIES.find((c) => c.id === p.category);
                return (
                  <tr key={p.id} className="border-t border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="font-semibold truncate max-w-[200px]">{p.name}</p>
                          <p className="text-xs text-neutral-500">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{p.sku}</td>
                    <td className="px-4 py-3 text-xs">{cat?.name}</td>
                    <td className="px-4 py-3 font-bold">${p.discountPrice || p.price}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock > 20 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : p.stock > 0 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'}`}>
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold">{p.rating} ★</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Link to={`/product/${p.id}`} className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10"><Eye className="h-4 w-4" /></Link>
                        <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10"><Edit className="h-4 w-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function OrdersAdmin() {
  const { orders, updateStatus } = useOrders();
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <>
      <PageHeader title="Orders" desc={`${orders.length} total orders`} />
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['all', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-colors ${filter === f ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900' : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10'}`}>
            {f} {f === 'all' ? `(${orders.length})` : `(${orders.filter((o) => o.status === f).length})`}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr className="text-left text-xs text-neutral-500 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Items</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5">
                  <td className="px-4 py-3 font-mono text-xs font-semibold">{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{o.userName}</p>
                    <p className="text-xs text-neutral-500">{o.userEmail}</p>
                  </td>
                  <td className="px-4 py-3">{o.items.length}</td>
                  <td className="px-4 py-3 font-bold">${o.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-xs text-neutral-600 dark:text-neutral-400">{new Date(o.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-white/5 border-0 outline-none">
                      <option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function CustomersAdmin() {
  const customers = [
    { id: 1, name: 'Alex Morgan', email: 'alex@example.com', orders: 8, spent: 1204.42, joined: '2025-03-14', status: 'Active' },
    { id: 2, name: 'Nora Singh', email: 'nora@example.com', orders: 3, spent: 412.80, joined: '2025-06-22', status: 'Active' },
    { id: 3, name: 'Kenji Ito', email: 'kenji@example.com', orders: 12, spent: 2890.50, joined: '2024-11-08', status: 'Active' },
    { id: 4, name: 'Sofia Rivera', email: 'sofia@example.com', orders: 5, spent: 678.20, joined: '2025-09-10', status: 'Active' },
    { id: 5, name: 'Marcus Johnson', email: 'marcus@example.com', orders: 2, spent: 189.00, joined: '2026-01-03', status: 'Blocked' },
  ];

  return (
    <>
      <PageHeader title="Customers" desc={`${customers.length} registered customers`} />
      <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr className="text-left text-xs text-neutral-500 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Orders</th>
                <th className="px-4 py-3 font-semibold">Total Spent</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs text-neutral-500">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold">{c.orders}</td>
                  <td className="px-4 py-3 font-bold">${c.spent.toFixed(2)}</td>
                  <td className="px-4 py-3 text-xs text-neutral-600 dark:text-neutral-400">{new Date(c.joined).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10"><MoreVertical className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function CategoriesAdmin() {
  return (
    <>
      <PageHeader title="Categories" desc="Organize your catalog" action={
        <button className="px-4 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold flex items-center gap-2"><Plus className="h-4 w-4" /> Add Category</button>
      } />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((c) => {
          const count = PRODUCTS.filter((p) => p.category === c.id).length;
          return (
            <div key={c.id} className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${c.accent} flex items-center justify-center text-white mb-4 text-xl font-black`}>
                {c.name[0]}
              </div>
              <h3 className="text-lg font-bold">{c.name}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{c.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200 dark:border-white/10">
                <span className="text-xs text-neutral-500">{count} products</span>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10"><Edit className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ReviewsAdmin() {
  return (
    <>
      <PageHeader title="Reviews" desc={`${REVIEWS.length} customer reviews`} />
      <div className="space-y-3">
        {REVIEWS.map((r) => {
          const p = PRODUCTS.find((x) => x.id === r.productId);
          return (
            <div key={r.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3 flex-1 min-w-0">
                  {p && <img src={p.images[0]} alt="" className="h-14 w-14 rounded-xl object-cover" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold">{r.author}</p>
                      {r.verified && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">VERIFIED</span>}
                    </div>
                    <p className="text-xs text-neutral-500 mb-1">{p?.name} · {new Date(r.date).toLocaleDateString()}</p>
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3 w-3 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`} />)}
                    </div>
                    <p className="text-sm"><strong>{r.title}</strong> — {r.body}</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
