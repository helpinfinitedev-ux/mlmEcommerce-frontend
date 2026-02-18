// import { useState } from 'react';
// import { 
//   FunnelIcon, 
//   Squares2X2Icon, 
//   ListBulletIcon,
//   MagnifyingGlassIcon
// } from '@heroicons/react/24/outline';
// import ProductCard from '../components/ecommerce/ProductCard';
// import { products, categories } from '../data/products';
// import React, { useEffect,useState} from 'react';
// import axios from 'axios';

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:5001/api/product') // or /api/products, depending on your backend
//       .then(res => setProducts(res.data.products))
//       .catch(err => console.error(err));
//   }, []);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('featured');

//   const isAdmin = localStorage.getItem('isAdmin') === 'true';

//   // Filter products based on category and search
//   const filteredProducts = products.filter(product => {
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortBy) {
//       case 'price-low':
//         return a.price - b.price;
//       case 'price-high':
//         return b.price - a.price;
//       case 'rating':
//         return b.rating - a.rating;
//       case 'newest':
//         return b.isNew ? 1 : -1;
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="page-container">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-secondary-900 mb-2">Shop Products</h1>
//         <p className="text-secondary-600">Discover quality products and earn commissions with every purchase</p>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
//         <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//           {/* Search */}
//           <div className="relative flex-1 max-w-md">
//             <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>

//           {/* Category Filter */}
//           <div className="flex items-center gap-2">
//             <FunnelIcon className="h-5 w-5 text-secondary-500" />
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             >
//               <option value="all">All Categories</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.name}>
//                   {category.name} ({category.count})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sort */}
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-secondary-600">Sort by:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             >
//               <option value="featured">Featured</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//               <option value="newest">Newest</option>
//             </select>
//           </div>

//           {/* View Mode */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-secondary-400 hover:text-secondary-600'}`}
//             >
//               <Squares2X2Icon className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-secondary-400 hover:text-secondary-600'}`}
//             >
//               <ListBulletIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-6">
//         <p className="text-secondary-600">
//           Showing {sortedProducts.length} of {products.length} products
//         </p>
//       </div>

//       {/* Products Grid */}
//       {sortedProducts.length > 0 ? (
//         <div className={viewMode === 'grid' ? 'product-grid' : 'space-y-4'}>
//           {sortedProducts.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <div className="text-secondary-400 mb-4">
//             <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
//           </div>
//           <h3 className="text-lg font-medium text-secondary-900 mb-2">No products found</h3>
//           <p className="text-secondary-600">Try adjusting your search or filter criteria</p>
//         </div>
//       )}

//       {/* Load More Button */}
//       {sortedProducts.length > 0 && (
//         <div className="text-center mt-12">
//           <button className="btn btn-outline btn-lg">
//             Load More Products
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Shop;



import React, { useEffect, useState } from 'react';
import {
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import ProductCard from '../components/ecommerce/ProductCard';
import { categories } from '../data/products';
import { productAPI } from '../services/api';
import { useParams } from 'react-router-dom';

const Shop = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getProducts(userId);
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [userId]);

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew ? 1 : -1;
      default:
        return 0;
    }
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-2 text-gradient-primary">Shop Products</h1>
        <p className="text-secondary-600 text-sm lg:text-base">Discover quality products and earn commissions with every purchase</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-soft p-4 lg:p-6 mb-8 border border-secondary-100">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary-50 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 bg-secondary-50 border border-secondary-200 rounded-lg px-3 py-1">
              <FunnelIcon className="h-5 w-5 text-secondary-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent border-none focus:ring-0 py-2 text-sm font-medium w-full sm:w-auto"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 bg-secondary-50 border border-secondary-200 rounded-lg px-3 py-1">
              <span className="text-xs font-bold text-secondary-400 uppercase ml-1">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 py-2 text-sm font-medium w-full sm:w-auto"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* View Mode (Hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-2 bg-secondary-50 border border-secondary-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-secondary-400 hover:text-secondary-600'}`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-secondary-400 hover:text-secondary-600'}`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-secondary-500 text-sm font-medium">
          Showing <span className="text-secondary-900 font-bold">{sortedProducts.length}</span> of <span className="text-secondary-900 font-bold">{products.length}</span> products
        </p>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid-auto-fit' : 'space-y-4'}>
          {sortedProducts.map(product => (
            <ProductCard key={product?._id || product?.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-soft border border-secondary-100">
          <div className="text-secondary-200 mb-6">
            <MagnifyingGlassIcon className="h-20 w-20 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-secondary-900 mb-2">No products found</h3>
          <p className="text-secondary-500 max-w-xs mx-auto">Try adjusting your search or filter criteria to find what you're looking for.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="btn btn-outline btn-md mt-8"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {sortedProducts.length > 0 && products.length > sortedProducts.length && (
        <div className="text-center mt-12">
          <button className="btn btn-outline btn-lg px-8">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
