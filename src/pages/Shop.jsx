import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Home } from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/products';
import { ProductCard, Skeleton } from '../components/ProductCard';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [sortBy, setSortBy] = React.useState('featured');
  const [showFilters, setShowFilters] = React.useState(false);
  const [search, setSearch] = React.useState(params.get('q') || '');
  const [priceRange, setPriceRange] = React.useState([0, 3000]);
  const [minRating, setMinRating] = React.useState(0);
  const [selectedBrands, setSelectedBrands] = React.useState([]);

  const categoryFilter = params.get('category');
  const activeCategory = CATEGORIES.find((c) => c.id === categoryFilter);

  React.useEffect(() => { setSearch(params.get('q') || ''); }, [params]);

  const filtered = React.useMemo(() => {
    let result = [...PRODUCTS];
    if (categoryFilter) result = result.filter((p) => p.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
    }
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    result = result.filter((p) => {
      const price = p.discountPrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1] && p.rating >= minRating;
    });

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)); break;
      case 'price-desc': result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)); break;
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [categoryFilter, search, selectedBrands, priceRange, minRating, sortBy]);

  const toggleBrand = (b) => setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  const clearFilters = () => {
    setParams({});
    setSearch('');
    setSelectedBrands([]);
    setPriceRange([0, 3000]);
    setMinRating(0);
  };

  const activeFilterCount = [categoryFilter && 1, search && 1, selectedBrands.length > 0 && 1, priceRange[0] > 0 && 1, priceRange[1] < 3000 && 1, minRating > 0 && 1].filter(Boolean).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-neutral-50 via-violet-50 to-transparent dark:from-neutral-900 dark:via-violet-950/20 dark:to-transparent border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
            <Link to="/" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-neutral-900 dark:hover:text-white">Shop</Link>
            {activeCategory && <><span>/</span><span className="text-neutral-900 dark:text-white">{activeCategory.name}</span></>}
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
                {activeCategory ? activeCategory.name : search ? `Search: "${search}"` : 'All Products'}
              </h1>
              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                {filtered.length} {filtered.length === 1 ? 'product' : 'products'} · {activeCategory?.description || 'Curated with care. Built to last.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setParams({ ...Object.fromEntries(params), q: e.target.value }); }}
                  placeholder="Search products..."
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                />
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-full border border-neutral-200 dark:border-white/10 text-sm font-semibold text-neutral-900 dark:text-white relative">
                <SlidersHorizontal className="h-4 w-4" /> Filters
                {activeFilterCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">{activeFilterCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12 grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-neutral-900 dark:text-white">Filters</h3>
                {activeFilterCount > 0 && <button onClick={clearFilters} className="text-xs font-semibold text-violet-600 hover:text-violet-700">Clear all</button>}
              </div>

              {/* Categories */}
              <FilterGroup title="Category">
                <div className="space-y-1">
                  <Link to="/shop" onClick={() => setShowFilters(false)} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${!categoryFilter ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'}`}>
                    All Categories
                  </Link>
                  {CATEGORIES.map((c) => (
                    <Link key={c.id} to={`/shop?category=${c.id}`} onClick={() => setShowFilters(false)} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${categoryFilter === c.id ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'}`}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </FilterGroup>

              {/* Brands */}
              <FilterGroup title="Brand">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {BRANDS.map((b) => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 accent-neutral-900 dark:accent-white" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">{b}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              {/* Price */}
              <FilterGroup title="Price Range">
                <div className="space-y-3">
                  <input type="range" min="0" max="3000" step="50" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} className="w-full accent-neutral-900 dark:accent-white" />
                  <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                    <span>${priceRange[0]}</span>
                    <span className="font-bold text-neutral-900 dark:text-white">${priceRange[1]}</span>
                  </div>
                </div>
              </FilterGroup>

              {/* Rating */}
              <FilterGroup title="Minimum Rating">
                <div className="space-y-1">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button key={r} onClick={() => setMinRating(r)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${minRating === r ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'}`}>
                      {r === 0 ? 'All ratings' : `${r}★ and up`}
                    </button>
                  ))}
                </div>
              </FilterGroup>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Showing <span className="font-bold text-neutral-900 dark:text-white">{filtered.length}</span> products
            </p>
            <div className="relative">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none pl-4 pr-10 py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-sm font-medium text-neutral-900 dark:text-white outline-none cursor-pointer">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">No products found</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="pb-4 border-b border-neutral-200 dark:border-white/10 last:border-0 last:pb-0">
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">{title}</h4>
      {children}
    </div>
  );
}
