import { useContext } from "react";
import { productContext } from "../../context/ProductProvider";

const Dashboard = () => {
  const { orderStats, orders } = useContext(productContext);

  // Database se aane waale stats ko format kar rahe hain
  const stats = [
    { 
      label: 'Total Sales', 
      value: `$${orderStats?.totalSales?.toLocaleString() || '0'}`, 
      color: 'bg-indigo-50 text-indigo-600' 
    },
    { 
      label: 'Active Orders', 
      value: orderStats?.activeOrders || '0', 
      color: 'bg-green-50 text-green-600' 
    },
    { 
      label: 'Total Users', 
      value: orderStats?.totalUsers || '0', 
      color: 'bg-purple-50 text-purple-600' 
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
            <p className="text-gray-500 text-sm mb-2">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color.split(' ')[1]}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-50">
        <div className="p-6 border-b">
          <h2 className="font-bold">Recent Orders</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4">Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders && orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-700">
                      #{order.orderId || order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="text-gray-600">
                      {order.userId?.username || "Guest User"}
                    </td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="font-bold text-gray-800">
                      ${order.subTotal?.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-400">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;