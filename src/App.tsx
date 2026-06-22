import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, CartProvider, WishlistProvider, ThemeProvider, OrdersProvider } from './store/StoreProvider';
import { Layout } from './components/Layout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import { Cart, Checkout, Wishlist, Orders } from './pages/Shopping';
import { Login, Register, Profile } from './pages/Account';
import Admin from './pages/Admin';

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function NotFound() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 text-center">
      <p className="text-8xl font-black text-neutral-900 dark:text-white mb-4">404</p>
      <h1 className="text-3xl font-bold mb-4">Page not found</h1>
      <a href="/" className="text-violet-600 font-semibold hover:underline">Return home</a>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrdersProvider>
                <BrowserRouter>
                  <AppRoutes />
                  <Toaster position="bottom-right" toastOptions={{
                    style: { background: '#171717', color: 'white', borderRadius: '12px', fontSize: '14px' }
                  }} />
                </BrowserRouter>
              </OrdersProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
