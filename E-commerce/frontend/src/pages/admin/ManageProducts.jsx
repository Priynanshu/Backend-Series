import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { useContext } from 'react';
import { productContext } from '../../context/ProductProvider';
import { handleSuccess, handleError } from '../../utils/utilsToast';

const ManageProducts = () => {
  // Hume list dikhani hai aur delete function chahiye
  const { products, delteProducts } = useContext(productContext);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await delteProducts(id);
        handleSuccess(res.message || "Product deleted");
      } catch (err) {
        handleError("Failed to delete product");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Product Catalog</h1>
        <Link to="/admin/add-product">
          <Button>+ Add New Product</Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Product</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p._id || p.id} className="hover:bg-indigo-50/30 transition-colors">
                <td className="p-4 flex items-center space-x-3">
                  <img src={p.image} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" />
                  <span className="font-medium text-gray-900">{p.name}</span>
                </td>
                <td className="p-4 text-gray-600 text-sm">{p.category}</td>
                <td className="p-4 font-bold text-indigo-600">${p.price}</td>
                <td className="p-4">
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{p.stock} in stock</span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center space-x-3">
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-bold">Edit</button>
                    {/* Yahan ID pass karna zaroori hai */}
                    <button 
                      onClick={() => handleDelete(p._id || p.id)} 
                      className="text-red-500 hover:text-red-700 text-sm font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProducts;