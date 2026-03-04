import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useContext, useState } from 'react';
import { productContext } from '../../context/ProductProvider';
import { handleSuccess, handleError } from '../../utils/utilsToast'; // handleError add kiya

const AddProduct = () => {
  const navigate = useNavigate();
  const { createProducts } = useContext(productContext);
  const [loading, setLoading] = useState(false);
  
  const [productData, setProductData] = useState({
    name: "",
    category: "Electronics", // Default value set ki taaki empty na rahe
    price: "",
    description: "",
    stock: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createProducts(productData);
      handleSuccess(res.message || "Product added successfully!");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      handleError(errorMessage);
      console.log("Error From Creating Products: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <Link to="/admin/products"
          className="flex items-center text-gray-500 hover:text-indigo-600 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>

      {/* Form tag yaha wrap kiya hai logic ke liye */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <Input 
            label="Product Name"
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            placeholder="e.g. Wireless Headphone" 
            required
          />
        </div>
        
        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
          <select
            value={productData.category}
            onChange={(e) => setProductData({ ...productData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          >
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>

        <div className="col-span-1">
          <Input 
            label="Price ($)" 
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            type="number"
            placeholder="0.00" 
            required
          />
        </div>

        {/* Stock field add kiya kyunki state mein tha */}
        <div className="col-span-2">
          <Input 
            label="Stock Quantity" 
            value={productData.stock}
            onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
            type="number"
            placeholder="e.g. 50" 
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
          <textarea 
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 min-h-32 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
            placeholder="Describe the product features..."
            required
          ></textarea>
        </div>

        <div className="col-span-2">
          <Input
            value={productData.image}
            onChange={(e) => setProductData({ ...productData, image: e.target.value })}
            label="Image URL" 
            placeholder="https://images.unsplash.com/photo-..." 
            required
          />
        </div>

        <div className="col-span-2 flex space-x-4 pt-4">
          <Button 
            type="submit" 
            disabled={loading} 
            className="flex-1 py-4"
          >
            {loading ? "Wait for seconds.." : "Publish Product"}
          </Button>
          <Button 
            type="button"
            variant="secondary" 
            className="flex-1 py-4" 
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;