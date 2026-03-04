import { Button } from '../../components/common/Button';
import { useContext, useState } from 'react';
import { productContext } from '../../context/ProductProvider';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils/utilsToast';

const Cart = () => {
  const { cart, addToCart, removeFromCart, createOrder } = useContext(productContext);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const subtotal = cart?.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + (price * item.quantity);
  }, 0) || 0;

  const handleCheckout = async () => {
    // 1. Check if cart is empty
    if (!cart || cart.length === 0) {
      return handleError("Your cart is empty!");
    }

    // 2. IMPORTANT: User check hona zaroori hai
    // Agar user logged in nahi hai toh user._id undefined jayegi aur backend error dega
    if (!user || !user._id) {
      handleError("Please login to place an order");
      return navigate('/login');
    }

    try {
      setLoading(true);

      // Data preparation
      const orderData = {
        userId: user._id, // Ab ye guaranteed hai kyunki upar check laga hai
        products: cart.map(item => ({
          productId: item.product?._id,
          quantity: item.quantity,
          priceAtPurchase: item.product?.price
        })),
        subTotal: subtotal
      };

      // Order create function call
      await createOrder(orderData);
      
      handleSuccess("Order Confirm successfully!");
      
      // Navigate to home after success
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      // Backend se aane wala validation error yahan catch hoga
      const errorMsg = err.response?.data?.message || err.message || "Checkout failed";
      handleError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-h-screen overflow-hidden">
      <h1 className="text-3xl font-bold mb-10">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Scrollable Products Area */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-4 max-h-[70vh] custom-scrollbar">
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="flex items-center space-x-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                <img 
                  src={item.product?.image} 
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded-xl bg-gray-50" 
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{item.product?.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{item.product?.category}</p>
                    </div>
                    <p className="text-indigo-600 font-bold text-lg">${item.product?.price}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button 
                        disabled={loading}
                        onClick={() => removeFromCart(item.product?._id)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 font-medium text-gray-700 bg-white">
                        {item.quantity}
                      </span>
                      <button 
                        disabled={loading}
                        onClick={() => addToCart(item.product?._id)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-50 h-fit space-y-6">
          <h2 className="text-xl font-bold border-b pb-4 text-gray-800">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cart?.length || 0} items)</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-4 text-gray-900">
              <span>Total</span>
              <span className="text-indigo-600">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            disabled={loading}
            onClick={handleCheckout}
            className="w-full py-4 text-lg font-bold shadow-lg shadow-indigo-100 transition-transform active:scale-[0.98]"
          >
            {loading ? "Processing..." : "Checkout Now"}
          </Button>
          
          <p className="text-center text-xs text-gray-400">Secure checkout powered by Luxe</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;