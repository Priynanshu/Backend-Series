const Orders = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-8">Manage Orders</h1>
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Order ID</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Customer</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Total</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {[1, 2, 3, 4, 5].map(i => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-4 font-bold text-indigo-600">#LX-928{i}</td>
              <td className="p-4">Customer Name {i}</td>
              <td className="p-4 text-gray-500">Oct 24, 2024</td>
              <td className="p-4 font-semibold">$249.00</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Pending</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default Orders;