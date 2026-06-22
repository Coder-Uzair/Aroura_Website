import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Truck, Award, HeadphonesIcon, Star, Sparkles, Zap, Globe2 } from 'lucide-react';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../data/products';
import { ProductCard, Section } from '../components/ProductCard';

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const trending = PRODUCTS.filter((p) => p.trending).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.newArrival).slice(0, 8);
  const topRated = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      {/* ============= HERO ============= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-violet-50 to-amber-50 dark:from-neutral-950 dark:via-violet-950/20 dark:to-neutral-950" />
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-400/30 dark:bg-violet-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-amber-400/20 dark:bg-fuchsia-600/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] rounded-full bg-rose-400/20 dark:bg-rose-600/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-32 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-neutral-200/60 dark:border-white/10 text-xs font-semibold text-neutral-700 dark:text-neutral-200 mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              New 2026 Collection · Now Shipping Worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.03em] leading-[0.95] text-neutral-900 dark:text-white"
            >
              Crafted for
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
                  the obsessed.
                </span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 left-0 w-full"
                >
                  <motion.path
                    d="M 2 9 Q 150 0 298 9"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1 }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="50%" stopColor="#d946ef" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed"
            >
              AURUM curates premium instruments, performance apparel, expedition gear, and cosmic collectibles —
              each piece selected for exceptional craft and designed to outlast trends.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/shop" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-all shadow-xl shadow-neutral-900/20">
                Shop Collection
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-neutral-300 dark:border-white/20 font-semibold text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-all backdrop-blur-md">
                <Play className="h-4 w-4" fill="currentColor" /> Watch Film
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex items-center gap-8 text-sm text-neutral-600 dark:text-neutral-400"
            >
              <div>
                <p className="text-3xl font-black text-neutral-900 dark:text-white">250k+</p>
                <p className="text-xs uppercase tracking-wider">Happy Customers</p>
              </div>
              <div className="h-10 w-px bg-neutral-300 dark:bg-white/10" />
              <div>
                <p className="text-3xl font-black text-neutral-900 dark:text-white">4.9<span className="text-amber-500">★</span></p>
                <p className="text-xs uppercase tracking-wider">Avg Rating</p>
              </div>
              <div className="h-10 w-px bg-neutral-300 dark:bg-white/10" />
              <div>
                <p className="text-3xl font-black text-neutral-900 dark:text-white">48</p>
                <p className="text-xs uppercase tracking-wider">Countries</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-violet-900/20"
            >
              <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80" alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/40 dark:border-white/10"
              >
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=200&q=80" alt="" className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">Aurum Classic Acoustic</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">4.8 · 312 reviews</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-neutral-900 dark:text-white">$699</p>
                    <p className="text-[10px] text-neutral-500 line-through">$849</p>
                  </div>
                </div>
              </motion.div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute top-6 right-6 px-3 py-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/40 dark:border-white/10 flex items-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-bold text-neutral-900 dark:text-white">Featured</span>
              </motion.div>
            </motion.div>
            {/* Decorative small cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden lg:block absolute -left-10 top-10 p-3 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-bold text-neutral-900 dark:text-white">Free Shipping</span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Orders over $200</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============= BRAND STRIP ============= */}
      <section className="border-y border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-950">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-neutral-400 dark:text-neutral-500 text-sm font-bold tracking-widest uppercase">
          <span>Featured in Forbes</span>
          <span className="hidden md:block">·</span>
          <span>TechCrunch</span>
          <span className="hidden md:block">·</span>
          <span>The Verge</span>
          <span className="hidden md:block">·</span>
          <span>HYPEBEAST</span>
          <span className="hidden md:block">·</span>
          <span>Wired</span>
        </div>
      </section>

      {/* ============= CATEGORIES ============= */}
      <Section eyebrow="Explore" title="Shop by category" subtitle="Four curated universes. Each product hand-selected by our team of specialists.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/shop?category=${c.id}`} className="group relative block aspect-[4/5] rounded-3xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-90`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/80 font-bold">Collection {String(i + 1).padStart(2, '0')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">{c.name}</h3>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">{c.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                      Shop now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============= FEATURED ============= */}
      <Section eyebrow="Editor's Picks" title="Featured this week" subtitle="Hand-picked by our editorial team — the pieces defining the moment." action={
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white hover:gap-3 transition-all">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      }>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>

      {/* ============= BANNER ============= */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-950 via-violet-950 to-neutral-950" />
        <div className="absolute inset-0 -z-10 opacity-40">
          <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300 mb-4">The Space Collection</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.05]">
            Bring the cosmos home.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
            Galaxy lamps, NASA-inspired gear, astronaut collectibles, and cosmic apparel — for those who look up.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-10 flex justify-center gap-3">
            <Link to="/shop?category=cat-space" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold hover:bg-neutral-100 transition-colors">
              Explore Space Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============= TRENDING ============= */}
      <Section eyebrow="What's hot" title="Trending now" subtitle="The products our community is loving this week." action={
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white hover:gap-3 transition-all">
          Shop trending <ArrowRight className="h-4 w-4" />
        </Link>
      }>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>

      {/* ============= NEW ARRIVALS ============= */}
      <Section eyebrow="Just Dropped" title="New arrivals" subtitle="Fresh additions to the AURUM catalog — first to see, first to own." action={
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white hover:gap-3 transition-all">
          View new arrivals <ArrowRight className="h-4 w-4" />
        </Link>
      }>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>

      {/* ============= TOP RATED ============= */}
      <Section eyebrow="Customer Favorites" title="Highest rated" subtitle="Products with the most five-star reviews from verified customers.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topRated.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/product/${p.id}`} className="group flex gap-5 p-4 rounded-3xl border border-neutral-200 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-white/5 transition-all">
                <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <img src={p.images[0]} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0 py-2">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold mb-1">{p.brand}</p>
                  <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white line-clamp-2 mb-2">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={`h-3.5 w-3.5 ${idx < Math.round(p.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`} />
                    ))}
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 ml-1">{p.rating}</span>
                    <span className="text-xs text-neutral-500">· {p.reviews} reviews</span>
                  </div>
                  <p className="text-xl font-black text-neutral-900 dark:text-white">${p.discountPrice || p.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============= TESTIMONIALS ============= */}
      <Section eyebrow="Reviews" title="Loved by creators worldwide" subtitle="Unfiltered feedback from real customers across the globe.">
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover bg-neutral-200" />
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============= FEATURES STRIP ============= */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/30 border-y border-neutral-200 dark:border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: 'Free Worldwide Shipping', desc: 'On all orders over $200' },
            { icon: Shield, title: 'Secure Payments', desc: '256-bit SSL encryption' },
            { icon: Award, title: 'Lifetime Warranty', desc: 'On select premium products' },
            { icon: HeadphonesIcon, title: 'Expert Support', desc: '24/7 from real specialists' },
          ].map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-start gap-3"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">{f.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============= NEWSLETTER ============= */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-bold mb-5">
            <Zap className="h-3 w-3" /> Stay in the loop
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">Get early access to drops.</h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Join 80,000+ members getting first looks, exclusive offers, and behind-the-scenes stories. No spam. Unsubscribe anytime.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" required placeholder="you@email.com" className="flex-1 px-5 py-4 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors" />
            <button className="px-6 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity">Subscribe</button>
          </form>
          <p className="mt-4 text-xs text-neutral-500 flex items-center justify-center gap-1.5">
            <Globe2 className="h-3 w-3" /> Available in 48 countries · 12 languages
          </p>
        </div>
      </section>
    </div>
  );
}
