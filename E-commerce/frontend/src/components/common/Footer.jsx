const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-indigo-600">LUXE</h3>
        <p className="text-gray-500">Premium e-commerce experience for modern lifestyles.</p>
      </div>
      {['Shop', 'Company', 'Support'].map(title => (
        <div key={title} className="space-y-4">
          <h4 className="font-bold text-gray-900">{title}</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-indigo-600">Example Link</a></li>
            <li><a href="#" className="hover:text-indigo-600">Example Link</a></li>
          </ul>
        </div>
      ))}
    </div>
    <div className="container mx-auto px-4 pt-8 border-t text-center text-gray-400 text-sm">
      © 2024 LUXE E-Commerce. All rights reserved.
    </div>
  </footer>
);
export default Footer;