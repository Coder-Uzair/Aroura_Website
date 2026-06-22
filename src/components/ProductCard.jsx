import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useWishlist, useCart } from '../store/StoreProvider';

export function ProductCard({ product, index = 0 }) {
  const { toggle, has } = useWishlist();
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);
  const inWish = has(product.id);
  const discount = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-[10px] font-bold tracking-wide">-{discount}%</span>
            )}
            {product.newArrival && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold tracking-wide">NEW</span>
            )}
            {product.trending && !product.newArrival && (
              <span className="px-2.5 py-1 rounded-full bg-violet-600 text-white text-[10px] font-bold tracking-wide">TRENDING</span>
            )}
          </div>
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id); }}
            className={`absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${inWish ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-200 hover:scale-110'}`}
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" fill={inWish ? 'currentColor' : 'none'} />
          </button>
          {/* Quick add */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            onClick={handleAdd}
            className={`absolute bottom-3 left-3 right-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${added ? 'bg-emerald-500 text-white' : 'bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-white'}`}
          >
            {added ? <><Check className="h-4 w-4" /> Added to Cart</> : <><ShoppingBag className="h-4 w-4" /> Add to Cart</>}
          </motion.button>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold mb-1">{product.brand}</p>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white line-clamp-1 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{product.rating}</span>
            <span className="text-xs text-neutral-500">({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-900 dark:text-white">${product.discountPrice || product.price}</span>
            {product.discountPrice && <span className="text-xs text-neutral-400 line-through">${product.price}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Section({ eyebrow, title, subtitle, action, children, className = '' }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {(eyebrow || title || subtitle || action) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              {eyebrow && <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400 mb-3">{eyebrow}</motion.p>}
              {title && <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">{title}</motion.h2>}
              {subtitle && <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-3 text-base text-neutral-600 dark:text-neutral-400">{subtitle}</motion.p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800 ${className}`} />;
}
