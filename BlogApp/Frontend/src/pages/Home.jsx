
import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const  Post = [
  {
    id: '1',
    title: 'Understanding React Hooks Depth',
    slug: 'understanding-react-hooks',
    excerpt: 'A comprehensive deep dive into useEffect and useState to manage lifecycle events and complex state logic in functional components.',
    content: 'React hooks have revolutionized the way we build functional components. In this article, we explore how hooks work under the hood...',
    category: 'React',
    tags: ['React', 'Frontend', 'Hooks'],
    coverImage: 'https://picsum.photos/seed/react/800/600',
    author: {
      id: 'a1',
      name: 'Alex Morgan',
      avatar: 'https://picsum.photos/seed/alex/100/100'
    },
    publishedAt: 'Oct 24, 2023',
    likes: 42,
    readTime: '5 min',
    status: 'published',
    views: 1200
  },
  {
    id: '2',
    title: 'Node.js Performance Optimization',
    slug: 'nodejs-performance',
    excerpt: 'Learn how to optimize your Node.js applications for better speed, lower latency, and reduced resource consumption using clustering and caching.',
    content: 'Optimizing Node.js requires a deep understanding of the event loop and asynchronous programming...',
    category: 'Node.js',
    tags: ['Backend', 'Node.js', 'Performance'],
    coverImage: 'https://picsum.photos/seed/node/800/600',
    author: {
      id: 'a2',
      name: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/seed/sarah/100/100'
    },
    publishedAt: 'Oct 22, 2023',
    likes: 128,
    readTime: '8 min',
    status: 'published',
    views: 2400
  },
  {
    id: '3',
    title: 'Minimalism in UI Design',
    slug: 'minimalism-ui-design',
    excerpt: 'Why less is often more when it comes to user interfaces. We explore the principles of whitespace, typography, and color theory.',
    content: 'Design is not just what it looks like and feels like. Design is how it works...',
    category: 'Design',
    tags: ['UI', 'UX', 'Design'],
    coverImage: 'https://picsum.photos/seed/design/800/600',
    author: {
      id: 'a3',
      name: 'David Chen',
      avatar: 'https://picsum.photos/seed/david/100/100'
    },
    publishedAt: 'Oct 20, 2023',
    likes: 85,
    readTime: '4 min',
    status: 'published',
    views: 1800
  },
  {
    id: '4',
    title: 'Mastering Tailwind CSS Grid',
    slug: 'mastering-tailwind-grid',
    excerpt: 'A practical guide to building responsive layouts using Tailwind’s grid system. Forget float and flexbox for complex 2D layouts.',
    content: 'Tailwind CSS makes grid layouts incredibly intuitive with its utility classes...',
    category: 'CSS',
    tags: ['CSS', 'Tailwind', 'Grid'],
    coverImage: 'https://picsum.photos/seed/css/800/600',
    author: {
      id: 'a1',
      name: 'Alex Morgan',
      avatar: 'https://picsum.photos/seed/alex/100/100'
    },
    publishedAt: 'Oct 18, 2023',
    likes: 56,
    readTime: '6 min',
    status: 'published',
    views: 1100
  }
 ]
  const [search, setSearch] = useState('');

  const filteredPosts = Post.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/40 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-[960px] px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            Insights for the <span className="text-primary">Modern Developer</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 mb-10">
            Explore deep dives into web architecture, coding best practices, and the latest trends in software engineering. Join a community of passionate builders.
          </p>
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-xl border border-border-dark bg-card-dark p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <span className="material-symbols-outlined ml-2 text-gray-500">search</span>
            <input 
              type="text" 
              className="w-full border-none bg-transparent px-2 py-1 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-0" 
              placeholder="Search for articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="mx-auto max-w-[1280px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between border-b border-border-dark pb-4">
          <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
          <div className="flex gap-2">
            <button className="p-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">list</span>
            </button>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-gray-600 mb-4">search_off</span>
              <p className="text-gray-400">No articles found matching your search.</p>
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="flex min-w-[140px] items-center justify-center rounded-lg h-12 px-6 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-background-dark transition-all text-sm font-bold tracking-wide">
            Load More Posts
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
