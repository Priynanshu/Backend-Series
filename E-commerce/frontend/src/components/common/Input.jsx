export const Input = ({ label, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>}
    <input 
      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
      {...props} 
    />
  </div>
);