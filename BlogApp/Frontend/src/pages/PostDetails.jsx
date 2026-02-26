
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetails= () => {
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
 const Comment = [
  {
    id: 'c1',
    postId: '1',
    authorName: 'Michael Foster',
    authorAvatar: 'https://picsum.photos/seed/michael/100/100',
    content: 'Great article! I especially liked the part about React Server Components. It has been a game changer for our team.',
    createdAt: '2 hours ago',
    likes: 12
  },
  {
    id: 'c2',
    postId: '1',
    authorName: 'Lindsay Walton',
    authorAvatar: 'https://picsum.photos/seed/lindsay/100/100',
    content: 'I am still a bit skeptical about AI replacing junior devs completely. There is a lot of nuance in debugging.',
    createdAt: '5 hours ago',
    likes: 8
  }
];
  const post = Post.find(p => p.id === id);

  if (!post) {
    return (
      <div className="flex-grow flex items-center justify-center py-40">
        <div className="text-center">
          <h1 className="text-6xl font-black text-primary mb-4">404</h1>
          <p className="text-gray-400 mb-8">Post not found.</p>
          <Link to="/" className="text-primary hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow w-full max-w-[800px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="flex mb-6">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-lg mr-2">arrow_back</span>
          Back to Blog
        </Link>
      </nav>

      <article>
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/30">{post.category}</span>
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">#{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-between py-4 border-y border-border-dark">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="h-10 w-10 overflow-hidden rounded-full bg-gray-700 object-cover" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{post.author.name}</span>
                <span className="text-xs text-gray-400">{post.publishedAt} • {post.readTime} read</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-surface-dark">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-surface-dark">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        </header>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 shadow-lg shadow-primary/10 bg-surface-dark">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose max-w-none mb-12">
          <p className="text-xl leading-relaxed text-gray-300 mb-8">
            {post.content}
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Deep Dive into the Topic</h2>
          <p className="text-gray-400 leading-7 mb-6">
            In the rapidly evolving landscape of software engineering, technical excellence is no longer enough. Developers need to understand how components interact in a global scale...
          </p>
          <blockquote className="border-l-4 border-primary pl-4 italic my-8 text-lg text-gray-300 bg-surface-dark/50 py-4 pr-4 rounded-r-lg">
            "The most successful developers are those who learn to orchestrate tools effectively, treating every library as a partner in the process."
          </blockquote>
        </div>
      </article>

      <section className="scroll-mt-20 border-t border-border-dark pt-12" id="comments">
        <h3 className="text-2xl font-bold text-white mb-6">Comments ({Comment.length})</h3>
        
        <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-border-dark mb-10">
          <div className="flex gap-4">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">ME</div>
            <div className="flex-grow">
              <textarea 
                className="block w-full rounded-lg border-border-dark bg-background-dark px-4 py-3 text-white ring-1 ring-inset ring-border-dark placeholder:text-gray-500 focus:ring-2 focus:ring-primary sm:text-sm" 
                placeholder="Add to the discussion..." 
                rows={3}
              />
              <div className="mt-3 flex justify-end">
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background-dark hover:bg-primary/90 transition-colors">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {Comment.map(comment => (
            <div key={comment.id} className="flex gap-4">
              <img src={comment.authorAvatar} alt={comment.authorName} className="h-10 w-10 rounded-full bg-gray-700 object-cover" />
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-white">{comment.authorName}</h4>
                  <span className="text-xs text-gray-400">{comment.createdAt}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {comment.content}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <button className="text-xs font-medium text-gray-400 hover:text-primary flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">thumb_up</span> {comment.likes}
                  </button>
                  <button className="text-xs font-medium text-gray-400 hover:text-primary transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PostDetails;
