import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingBag, Check, Truck, Shield, RotateCcw, Minus, Plus, Home, ChevronRight } from 'lucide-react';
import { PRODUCTS, REVIEWS, CATEGORIES } from '../data/products';
import { useCart, useWishlist } from '../store/StoreProvider';
import { ProductCard } from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const [selectedImg, setSelectedImg] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const [tab, setTab] = React.useState('description');

  React.useEffect(() => { window.scrollTo(0, 0); setSelectedImg(0); setQty(1); setAdded(false); }, [id]);

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 text-center">
        <p className="text-6xl mb-4">404</p>
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop" className="text-violet-600 font-semibold">Back to shop</Link>
      </div>
    );
  }

  const inWish = has(product.id);
  const category = CATEGORIES.find((c) => c.id === product.category);
  const productReviews = REVIEWS.filter((r) => r.productId === product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;

  const handleAdd = () => {
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <Link to="/" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-neutral-900 dark:hover:text-white">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-neutral-900 dark:hover:text-white">{category?.name}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-neutral-900 dark:text-white truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImg}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImg]}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </AnimatePresence>
            {discount > 0 && <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-bold">-{discount}% OFF</span>}
          </motion.div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImg(i)} className={`aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 transition-all ${selectedImg === i ? 'ring-2 ring-neutral-900 dark:ring-white ring-offset-2 dark:ring-offset-neutral-950' : 'opacity-60 hover:opacity-100'}`}>
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-violet-600 dark:text-violet-400 mb-3">{product.brand}</p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300 dark:text-neutral-700'}`} />)}
                <span className="ml-2 text-sm font-semibold text-neutral-900 dark:text-white">{product.rating}</span>
                <span className="text-sm text-neutral-500">· {product.reviews} reviews</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.stock > 10 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'}`}>
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white">${product.discountPrice || product.price}</span>
              {product.discountPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">${product.price}</span>
                  <span className="px-2 py-1 rounded-md bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-xs font-bold">Save ${product.price - product.discountPrice}</span>
                </>
              )}
            </div>

            <p className="mt-6 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">{product.description}</p>

            {/* Qty + Add */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-100 dark:bg-neutral-900">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10 rounded-full hover:bg-white dark:hover:bg-neutral-800 flex items-center justify-center transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="h-10 w-10 rounded-full hover:bg-white dark:hover:bg-neutral-800 flex items-center justify-center transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={handleAdd} className={`flex-1 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${added ? 'bg-emerald-500 text-white' : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90'}`}>
                {added ? <><Check className="h-5 w-5" /> Added to Cart</> : <><ShoppingBag className="h-5 w-5" /> Add to Cart</>}
              </button>
              <button onClick={() => toggle(product.id)} className={`h-14 w-14 rounded-full flex items-center justify-center border transition-all ${inWish ? 'bg-rose-500 border-rose-500 text-white' : 'border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-white'}`}>
                <Heart className="h-5 w-5" fill={inWish ? 'currentColor' : 'none'} />
              </button>
            </div>
            <button onClick={handleBuyNow} className="mt-3 w-full py-4 rounded-full font-semibold border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all">
              Buy Now
            </button>

            {/* Features */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-neutral-200 dark:border-white/10">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Over $200' },
                { icon: Shield, label: '2-Year Warranty', sub: 'Peace of mind' },
                { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions' },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <f.icon className="h-5 w-5 mx-auto mb-2 text-neutral-700 dark:text-neutral-300" />
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">{f.label}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{f.sub}</p>
                </div>
              ))}
            </div>

            {/* SKU & Tags */}
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-white/10 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">SKU</span><span className="font-mono text-neutral-900 dark:text-white">{product.sku}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Category</span><span className="text-neutral-900 dark:text-white">{category?.name}</span></div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((t) => <span key={t} className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 text-xs text-neutral-600 dark:text-neutral-300">#{t}</span>)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="flex gap-1 border-b border-neutral-200 dark:border-white/10 overflow-x-auto">
          {['description', 'specifications', 'reviews'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-6 py-4 text-sm font-semibold capitalize whitespace-nowrap border-b-2 transition-colors ${tab === t ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}>
              {t} {t === 'reviews' && `(${productReviews.length})`}
            </button>
          ))}
        </div>
        <div className="py-8">
          <AnimatePresence mode="wait">
            {tab === 'description' && (
              <motion.div key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p>Crafted with precision and tested by specialists, every {product.name} carries our commitment to exceptional quality. Backed by AURUM's two-year warranty and 30-day no-questions-asked return policy.</p>
              </motion.div>
            )}
            {tab === 'specifications' && (
              <motion.div key="spec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl">
                <div className="divide-y divide-neutral-200 dark:divide-white/10">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="py-4 grid grid-cols-[1fr_2fr] gap-4">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white">{k}</span>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {tab === 'reviews' && (
              <motion.div key="rev" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 max-w-3xl">
                {productReviews.length === 0 ? (
                  <p className="text-neutral-500 text-center py-12">No reviews yet. Be the first!</p>
                ) : productReviews.map((r) => (
                  <div key={r.id} className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-neutral-900 dark:text-white">{r.author}</p>
                          {r.verified && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">VERIFIED</span>}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">{new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300 dark:text-neutral-700'}`} />)}
                      </div>
                    </div>
                    <h4 className="font-bold text-neutral-900 dark:text-white mb-2">{r.title}</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{r.body}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 border-t border-neutral-200 dark:border-white/10">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-neutral-900 dark:text-white">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
