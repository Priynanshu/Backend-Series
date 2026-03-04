import { useContext } from 'react'; // Context use karne ke liye
import { productContext } from '../../context/ProductProvider'; // Context import
import ProductCard from '../../components/product/ProductCard';
import { Button } from '../../components/common/Button';

const Home = () => {
  // Prop ki jagah direct Context se products lein
  const { products } = useContext(productContext);

  // Featured products ke liye: Hum sirf pehle 4 products dikhayenge
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-150 flex items-center bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
          alt="Hero"
        />
        <div className="container mx-auto px-4 relative text-white space-y-6">
          <h1 className="text-6xl font-extrabold max-w-2xl leading-tight">Elevate Your Lifestyle Essentials.</h1>
          <p className="text-xl text-gray-200 max-w-lg">Curated collections for the modern professional. Quality meets aesthetic design.</p>
          <Button className="text-lg px-10 py-4">Shop Collection</Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">View All</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Poore products ki jagah sirf featured dikhayein */}
          {featuredProducts.map(p => (
            <ProductCard key={p._id || p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;