
import ProductCard from '../../components/product/ProductCard';
import { useContext } from 'react';
import { productContext } from '../../context/ProductProvider';

const ProductListing = () => {
  // Context se sari states aur filtered data nikalen
  const { 
    filteredProducts, 
    products,
    selectedCategories, 
    setSelectedCategories, 
    maxPrice, 
    setMaxPrice, 
    sortBy, 
    setSortBy 
  } = useContext(productContext);

   const categories = [...new Set(products.map(p => p.category))];

  // Category selection toggle karne ka function
   const handleCategoryChange = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded text-indigo-600" 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                <span className="text-gray-600">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Price Range (Up to ${maxPrice})</h3>
          <input 
            type="range" 
            className="w-full accent-indigo-600" 
            min="0" 
            max="100000" 
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>$0</span>
            <span>$100k</span>
          </div>
        </div>
      </aside>

      {/* Product Grid Area */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500 font-medium">
            Showing {filteredProducts?.length || 0} Products
          </p>
          
          <select 
            className="bg-white border rounded-lg px-4 py-2 outline-none cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Newest">Sort by: Newest</option>
            <option value="Low to High">Price: Low to High</option>
            <option value="High to Low">Price: High to Low</option>
          </select>
        </div>

        {/* Product Cards: filteredProducts ka use karein */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400">
              No products found for the selected filters.
            </div>
          )}
        </div>
        
        {/* Pagination UI */}
        <div className="mt-12 flex justify-center space-x-2">
          {[1, 2, 3].map(n => (
            <button key={n} className={`w-10 h-10 rounded-lg font-bold ${n === 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}>
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;