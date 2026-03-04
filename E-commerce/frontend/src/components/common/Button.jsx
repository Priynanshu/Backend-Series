export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
    secondary: 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };
  return (
    <button className={`px-6 py-2 rounded-lg font-medium transition-all active:scale-95 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};