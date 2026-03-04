import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { productContext } from '../../context/ProductProvider'; // Agar aapne cart logic isi mein rakha hai

const ProductCard = ({ product }) => {
  // Context se cart state aur functions nikaalein
  const { addToCart, removeFromCart, cart } = useContext(productContext);

  if (!product) return null;

  // 1. Pehle current product ki quantity find karein
  const cartItem = cart?.find(item => 
    (item.product === product._id || item.product?._id === product._id || item.product === product.id)
  );
  
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product._id || product.id}`}>
        <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
          />
        </div>
      </Link>

      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
      <h3 className="font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
      
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-indigo-600">${product.price}</span>
        
        {/* Quantity Controls */}
        <div className={`flex items-center rounded-lg transition-all ${quantity > 0 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
          
          {/* Minus Button */}
          {quantity > 0 && (
            <>
              <button 
                onClick={() => removeFromCart(product._id || product.id)}
                className="p-2 hover:bg-indigo-700 rounded-l-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </button>
              
              <span className="px-2 font-bold text-sm min-w-6 text-center">
                {quantity}
              </span>
            </>
          )}

          {/* Plus Button */}
          <button 
            onClick={() => addToCart(product._id || product.id)}
            className={`p-2 transition-colors ${quantity > 0 ? 'hover:bg-indigo-700 rounded-r-lg' : 'hover:bg-indigo-600 hover:text-white rounded-lg'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;