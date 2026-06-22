import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Lock, CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { useCart, useAuth, useOrders } from '../store/StoreProvider';

export function Cart() {
  const { items, updateQty, removeItem, subtotal, shipping, tax, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="inline-flex h-24 w-24 rounded-full bg-neutral-100 dark:bg-neutral-900 items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-neutral-400" />
          </div>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white mb-3">Your cart is empty</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity">
            Start shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-10">Your Cart</h1>
      <div className="grid lg:grid-cols-[1fr_420px] gap-10">
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex gap-4 md:gap-6 p-4 md:p-6 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50"
              >
                <Link to={`/product/${item.id}`} className="h-24 w-24 md:h-32 md:w-32 flex-shrink-0 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{item.brand}</p>
                    <h3 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white line-clamp-2 hover:underline">{item.name}</h3>
                  </Link>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-100 dark:bg-neutral-800">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-8 w-8 rounded-full hover:bg-white dark:hover:bg-neutral-700 flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-8 w-8 rounded-full hover:bg-white dark:hover:bg-neutral-700 flex items-center justify-center"><Plus className="h-3 w-3" /></button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-neutral-900 dark:text-white">${item.linePrice.toFixed(2)}</p>
                      {item.qty > 1 && <p className="text-xs text-neutral-500">${(item.discountPrice || item.price).toFixed(2)} each</p>}
                    </div>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="self-start p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20 text-neutral-400 hover:text-rose-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <button onClick={clearCart} className="text-sm font-semibold text-neutral-500 hover:text-rose-500 transition-colors">
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-neutral-600 dark:text-neutral-400">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600 dark:text-neutral-400">Shipping</span><span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600 dark:text-neutral-400">Tax (8%)</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex justify-between items-baseline">
                <span className="text-base font-bold text-neutral-900 dark:text-white">Total</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-white">${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => navigate('/checkout')} className="mt-6 w-full py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" /> Proceed to Checkout
            </button>
            <Link to="/shop" className="mt-3 block text-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Continue shopping
            </Link>
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-white/10 flex items-center gap-2 text-xs text-neutral-500">
              <Lock className="h-3 w-3" /> Secured by 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Checkout() {
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [placed, setPlaced] = React.useState(null);
  const [form, setForm] = React.useState({
    email: user?.email || '', firstName: user?.name?.split(' ')[0] || '', lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    address: '', city: '', state: '', zip: '', country: 'USA', phone: '',
    cardNumber: '', cardName: '', cardExpiry: '', cardCVC: '', shippingMethod: 'standard',
  });

  React.useEffect(() => { window.scrollTo(0, 0); }, [step]);

  if (items.length === 0 && !placed) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/shop" className="text-violet-600 font-semibold">Continue shopping</Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-24 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }} className="inline-flex h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </motion.div>
        <h1 className="text-4xl font-black text-neutral-900 dark:text-white mb-3">Order confirmed!</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">Thank you for shopping with AURUM.</p>
        <p className="text-sm font-mono font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 inline-block px-4 py-2 rounded-full mb-8">Order #{placed.id}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">A confirmation has been sent to <strong>{form.email}</strong>. You can track your order anytime from your account.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity">View my orders</Link>
          <Link to="/shop" className="px-6 py-3 rounded-full border border-neutral-300 dark:border-white/20 font-semibold">Continue shopping</Link>
        </div>
      </div>
    );
  }

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const shippingCost = form.shippingMethod === 'express' ? 25 : shipping;
  const finalTotal = subtotal + shippingCost + tax;

  const handlePlace = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login?redirect=checkout'); return; }
    const order = placeOrder({
      userId: user.id, userName: user.name, userEmail: user.email,
      items: items.map((i) => ({ id: i.id, name: i.name, brand: i.brand, image: i.images[0], price: i.price, discountPrice: i.discountPrice, qty: i.qty, linePrice: i.linePrice })),
      subtotal, shipping: shippingCost, tax, total: finalTotal,
      address: { name: `${form.firstName} ${form.lastName}`, line1: form.address, city: form.city, state: form.state, zip: form.zip, country: form.country },
      payment: `•••• ${form.cardNumber.slice(-4)}`,
    });
    clearCart();
    setPlaced(order);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-10">Checkout</h1>
      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {['Shipping', 'Payment', 'Review'].map((label, i) => (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? 'bg-emerald-500 text-white' : step === i + 1 ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`hidden md:inline text-sm font-semibold ${step === i + 1 ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`}>{label}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-px ${step > i + 1 ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-white/10'}`} />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handlePlace} className="grid lg:grid-cols-[1fr_420px] gap-10">
        <div className="space-y-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-white/10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Truck className="h-5 w-5" /> Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email" type="email" required value={form.email} onChange={(v) => update('email', v)} full />
                <Input label="First Name" required value={form.firstName} onChange={(v) => update('firstName', v)} />
                <Input label="Last Name" required value={form.lastName} onChange={(v) => update('lastName', v)} />
                <Input label="Address" required value={form.address} onChange={(v) => update('address', v)} full />
                <Input label="City" required value={form.city} onChange={(v) => update('city', v)} />
                <Input label="State / Region" value={form.state} onChange={(v) => update('state', v)} />
                <Input label="Postal Code" required value={form.zip} onChange={(v) => update('zip', v)} />
                <Input label="Country" required value={form.country} onChange={(v) => update('country', v)} />
                <Input label="Phone" type="tel" required value={form.phone} onChange={(v) => update('phone', v)} full />
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-bold mb-3">Shipping Method</h3>
                <div className="space-y-2">
                  {[
                    { id: 'standard', label: 'Standard Shipping', sub: '5-7 business days', price: shipping },
                    { id: 'express', label: 'Express Shipping', sub: '2 business days', price: 25 },
                  ].map((m) => (
                    <label key={m.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${form.shippingMethod === m.id ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-white/5' : 'border-neutral-200 dark:border-white/10'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="ship" checked={form.shippingMethod === m.id} onChange={() => update('shippingMethod', m.id)} className="accent-neutral-900 dark:accent-white" />
                        <div>
                          <p className="font-semibold text-sm">{m.label}</p>
                          <p className="text-xs text-neutral-500">{m.sub}</p>
                        </div>
                      </div>
                      <span className="font-bold">{m.price === 0 ? 'Free' : `$${m.price}`}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} className="mt-6 w-full py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Continue to Payment <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-white/10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Card Number" placeholder="4242 4242 4242 4242" required value={form.cardNumber} onChange={(v) => update('cardNumber', v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 '))} full />
                <Input label="Name on Card" required value={form.cardName} onChange={(v) => update('cardName', v)} full />
                <Input label="Expiry (MM/YY)" placeholder="12/28" required value={form.cardExpiry} onChange={(v) => update('cardExpiry', v.slice(0, 5))} />
                <Input label="CVC" placeholder="123" required value={form.cardCVC} onChange={(v) => update('cardCVC', v.replace(/\D/g, '').slice(0, 4))} />
              </div>
              <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <Lock className="h-4 w-4 flex-shrink-0" /> Demo mode — no real payment will be processed. Use any card number.
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-4 rounded-full border border-neutral-300 dark:border-white/20 font-semibold">Back</button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Review Order <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-white/10">
              <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2">Shipping to</p>
                  <p className="font-semibold">{form.firstName} {form.lastName}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">{form.address}, {form.city}, {form.state} {form.zip}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">{form.country} · {form.phone}</p>
                </div>
                <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
                  <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2">Payment</p>
                  <p className="font-semibold font-mono">•••• •••• •••• {form.cardNumber.slice(-4)}</p>
                </div>
                <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
                  <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-3">Items ({items.length})</p>
                  <div className="space-y-2">
                    {items.map((i) => (
                      <div key={i.id} className="flex items-center gap-3 text-sm">
                        <img src={i.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{i.name}</p>
                          <p className="text-xs text-neutral-500">Qty: {i.qty}</p>
                        </div>
                        <p className="font-bold">${i.linePrice.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="px-6 py-4 rounded-full border border-neutral-300 dark:border-white/20 font-semibold">Back</button>
                <button type="submit" className="flex-1 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Lock className="h-4 w-4" /> Place Order · ${finalTotal.toFixed(2)}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50">
            <h3 className="font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <img src={i.images[0]} alt="" className="h-full w-full object-cover" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-bold flex items-center justify-center">{i.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold line-clamp-2">{i.name}</p>
                  </div>
                  <p className="text-sm font-bold">${i.linePrice.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-neutral-200 dark:border-white/10 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-600 dark:text-neutral-400">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600 dark:text-neutral-400">Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600 dark:text-neutral-400">Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between items-baseline pt-3 border-t border-neutral-200 dark:border-white/10">
                <span className="font-bold">Total</span><span className="text-2xl font-black">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', placeholder, required, full }) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <label className="block text-xs font-semibold mb-1.5 text-neutral-700 dark:text-neutral-300">{label}{required && <span className="text-rose-500">*</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors" />
    </div>
  );
}

export function Wishlist() {
  const { items, toggle } = useWishlist();
  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 text-center">
        <div className="inline-flex h-24 w-24 rounded-full bg-neutral-100 dark:bg-neutral-900 items-center justify-center mb-6">
          <span className="text-4xl">❤️</span>
        </div>
        <h1 className="text-4xl font-black text-neutral-900 dark:text-white mb-3">Your wishlist is empty</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">Save your favorite items for later.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity">
          Explore products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-3">Your Wishlist</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-10">{items.length} saved {items.length === 1 ? 'item' : 'items'}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {items.map((p, i) => (
          <div key={p.id} className="relative">
            <button onClick={() => toggle(p.id)} className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Trash2 className="h-4 w-4" />
            </button>
            <ProductCardSimple product={p} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

import { ProductCard as ProductCardSimple2 } from '../components/ProductCard';
function ProductCardSimple({ product, index }) { return <ProductCardSimple2 product={product} index={index} />; }

export function Orders() {
  const { orders } = useOrders();
  const { user } = useAuth();
  const userOrders = user?.role === 'admin' ? orders : orders.filter((o) => o.userId === user?.id);

  if (!user) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="text-4xl font-black text-neutral-900 dark:text-white mb-3">Sign in to view orders</h1>
        <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold">Sign in</Link>
      </div>
    );
  }
  if (userOrders.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="text-4xl font-black text-neutral-900 dark:text-white mb-3">No orders yet</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">Your order history will appear here.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold">Start shopping</Link>
      </div>
    );
  }
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-10">Your Orders</h1>
      <div className="space-y-4">
        {userOrders.map((o) => (
          <div key={o.id} className="p-6 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-white/10 mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Order</p>
                <p className="font-mono font-bold text-neutral-900 dark:text-white">{o.id}</p>
              </div>
              <div className="text-sm">
                <p className="text-neutral-500">Placed {new Date(o.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="font-bold">${o.total.toFixed(2)}</p>
              </div>
              <OrderStatusBadge status={o.status} />
            </div>
            <div className="grid md:grid-cols-[1fr_auto] gap-6">
              <div className="flex gap-3 overflow-x-auto">
                {o.items.map((i) => (
                  <div key={i.id} className="flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <img src={i.image || i.images?.[0]} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                <p className="font-semibold text-neutral-900 dark:text-white">{o.address.name}</p>
                <p>{o.address.line1}, {o.address.city}</p>
                <p>{o.address.state} {o.address.zip} {o.address.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrderStatusBadge({ status }) {
  const styles = {
    'Processing': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'Shipped': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    'Delivered': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    'Cancelled': 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || styles.Processing}`}>{status}</span>;
}
