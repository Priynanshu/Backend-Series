import { useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import ProductCard from '../../components/product/ProductCard';
import { useContext, useEffect, useState } from 'react';
import { productContext } from '../../context/ProductProvider';

const ProductDetails = () => {
  const { id } = useParams();
  
  // Destructuring updated functions from context
  const { 
    getProductDetails, 
    selectedProduct, 
    products, 
    addToCart, 
    removeFromCart, 
    cart 
  } = useContext(productContext);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await getProductDetails(id);
      setLoading(false);
    };
    fetchInfo();
    // Scroll to top when id changes
    window.scrollTo(0, 0);
  }, [id]);

  // Loading check
  if (loading || !selectedProduct) {
    return <div className="text-center py-20 text-2xl font-medium text-gray-600">Loading Product Details...</div>;
  }

  // Cart quantity check logic (Matches the logic in Provider)
  const cartItem = cart?.find(item =>
    (item.product === selectedProduct._id || item.product?._id === selectedProduct._id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center">
          <nav className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">
            Products / {selectedProduct.category}
          </nav>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{selectedProduct.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-indigo-600">${selectedProduct.price}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${selectedProduct.stock <= 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {selectedProduct.stock <= 0 ? "Out Of Stock" : "In Stock"}
            </span>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {selectedProduct.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Cart Controller Integration */}
            <div className={`flex items-center rounded-lg transition-all duration-300 ${quantity > 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-600'}`}>
              
              {/* Minus Button */}
              {quantity > 0 && (
                <>
                  <button
                    onClick={() => removeFromCart(selectedProduct._id)}
                    className="p-3 hover:bg-indigo-700 rounded-l-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>

                  <span className="px-4 font-bold text-lg min-w-10 text-center">
                    {quantity}
                  </span>
                </>
              )}

              {/* Plus/Add Button */}
              <button
                onClick={() => addToCart(selectedProduct._id)}
                className={`px-6 py-3 font-bold transition-all duration-300 ${quantity > 0 ? 'hover:bg-indigo-700 rounded-r-lg' : 'hover:bg-indigo-600 hover:text-white rounded-lg w-full'}`}
              >
                {quantity > 0 ? "+" : "Add To Cart"}
              </button>
            </div>
            
            <Button variant="secondary" className="flex-1 py-4 font-bold shadow-sm">
              Buy It Now
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products Integration (Using Global Products state) */}
      <section className="border-t border-gray-100 pt-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products && products
            .filter(p => p._id !== id && p.category === selectedProduct.category)
            .slice(0, 4)
            .map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;