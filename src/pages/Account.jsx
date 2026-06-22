import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight, LogOut, MapPin, CreditCard, Package, Heart, Shield } from 'lucide-react';
import { useAuth } from '../store/StoreProvider';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const r = await login(email, password);
    setLoading(false);
    if (r.ok) navigate(r.user.role === 'admin' ? '/admin' : redirect);
    else setError(r.error);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue shopping.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email" icon={Mail} type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
        <Field label="Password" icon={Lock} type={showPw ? 'text' : 'password'} value={password} onChange={setPassword} placeholder="••••••••" trailing={
          <button type="button" onClick={() => setShowPw(!showPw)} className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        } />
        {error && <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-900/20 p-3 rounded-xl">{error}</p>}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400"><input type="checkbox" className="accent-neutral-900 dark:accent-white" /> Remember me</label>
          <a href="#" className="text-violet-600 font-semibold hover:underline">Forgot password?</a>
        </div>
        <button type="submit" disabled={loading} className="w-full py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? 'Signing in...' : <>Sign in <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
        New to AURUM? <Link to="/register" className="text-violet-600 font-semibold hover:underline">Create account</Link>
      </p>
    </AuthLayout>
  );
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true); setError('');
    const r = await register({ name, email, password });
    setLoading(false);
    if (r.ok) navigate('/');
    else setError(r.error);
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join AURUM and enjoy premium shopping.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name" icon={UserIcon} value={name} onChange={setName} placeholder="Jane Doe" />
        <Field label="Email" icon={Mail} type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
        <Field label="Password" icon={Lock} type="password" value={password} onChange={setPassword} placeholder="At least 6 characters" />
        {error && <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-900/20 p-3 rounded-xl">{error}</p>}
        <button type="submit" disabled={loading} className="w-full py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? 'Creating...' : <>Create account <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Already have an account? <Link to="/login" className="text-violet-600 font-semibold hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState('profile');
  const [name, setName] = React.useState(user?.name || '');
  const [email, setEmail] = React.useState(user?.email || '');
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);

  if (!user) return null;

  const save = (e) => {
    e.preventDefault();
    updateUser({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-10">My Account</h1>
      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside>
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
            <div className="flex items-center gap-3 mb-6">
              <img src={user.avatar} alt="" className="h-14 w-14 rounded-full bg-neutral-200 object-cover" />
              <div className="min-w-0">
                <p className="font-bold truncate">{user.name}</p>
                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {[
                { id: 'profile', icon: UserIcon, label: 'Profile' },
                { id: 'orders', icon: Package, label: 'Orders' },
                { id: 'addresses', icon: MapPin, label: 'Addresses' },
                { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                { id: 'payment', icon: CreditCard, label: 'Payment' },
                { id: 'security', icon: Shield, label: 'Security' },
              ].map((item) => (
                <button key={item.id} onClick={() => setTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === item.id ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'}`}>
                  <item.icon className="h-4 w-4" /> {item.label}
                </button>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 mt-4">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </nav>
          </div>
        </aside>

        <div className="p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
          {tab === 'profile' && (
            <form onSubmit={save}>
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Full name" icon={UserIcon} value={name} onChange={setName} />
                <Field label="Email" icon={Mail} type="email" value={email} onChange={setEmail} />
                <Field label="Phone" icon={UserIcon} placeholder="+1 555 000 0000" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button type="submit" className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold">Save changes</button>
                {saved && <span className="text-sm text-emerald-500 font-semibold">✓ Saved</span>}
              </div>
            </form>
          )}
          {tab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">View and track all your orders.</p>
              <Link to="/orders" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold">
                View orders <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
          {tab === 'addresses' && <PlaceholderTab icon={MapPin} title="Saved Addresses" desc="Manage your shipping addresses for faster checkout." />}
          {tab === 'wishlist' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
              <Link to="/wishlist" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold">
                View wishlist <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
          {tab === 'payment' && <PlaceholderTab icon={CreditCard} title="Payment Methods" desc="Add or remove saved payment methods." />}
          {tab === 'security' && <PlaceholderTab icon={Shield} title="Security" desc="Change your password or enable two-factor authentication." />}
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ icon: Icon, title, desc }) {
  return (
    <div>
      <div className="h-12 w-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-neutral-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-neutral-600 dark:text-neutral-400">{desc}</p>
    </div>
  );
}

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="p-8 md:p-10 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 backdrop-blur-xl shadow-xl">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-amber-500 flex items-center justify-center">
                <span className="text-white font-black">A</span>
              </div>
              <span className="text-lg font-black tracking-tight">AURUM</span>
            </Link>
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, icon: Icon, value, onChange, type = 'text', placeholder, trailing }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 text-neutral-700 dark:text-neutral-300">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />}
        <input type={type} value={value || ''} onChange={(e) => onChange && onChange(e.target.value)} placeholder={placeholder} className={`w-full ${Icon ? 'pl-11' : 'pl-4'} ${trailing ? 'pr-12' : 'pr-4'} py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors`} />
        {trailing && <div className="absolute right-1 top-1/2 -translate-y-1/2">{trailing}</div>}
      </div>
    </div>
  );
}
