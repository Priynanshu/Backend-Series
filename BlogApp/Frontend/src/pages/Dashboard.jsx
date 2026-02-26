
import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';


const Dashboard = () => {
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
  const {user} = useContext(AuthContext)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  console.log("USER: ", user?.name)
  const profile = {
    name: user?.name,
    email: user?.email,
    bio: 'Senior Frontend Engineer & Technical Writer. Passionate about React, TypeScript, and the future of web architecture.',
    avatar: "user1.jpg"
  };
  

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10 max-w-7xl mx-auto w-full">
      {/* Profile Section */}
      <section className="mb-10 rounded-2xl border border-border-dark bg-card-dark shadow-lg shadow-primary/10 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent"></div>
        <div className="px-6 pb-8">
          <div className="relative -mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative group">
                <div className="h-32 w-32 rounded-2xl border-4 border-card-dark bg-surface-dark overflow-hidden shadow-lg">
                  <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                </div>
                <button 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">photo_camera</span>
                </button>
                <input 
                  type="file"  
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              {!isEditingProfile ? (
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black text-white">{profile.name}</h2>
                  <p className="text-primary font-medium">{profile.email}</p>
                  <p className="mt-2 text-gray-400 max-w-xl line-clamp-2">
                    {profile.bio}
                  </p>
                </div>
              ) : (
                <form className="flex-grow w-full md:max-w-xl space-y-4 bg-surface-dark/50 dark:bg-surface-dark p-6 rounded-xl border border-border-dark">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Username</label>
                      <input 
                        type="text" 
                        className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Short Bio</label>
                    <textarea 
                      rows={2}
                      className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-primary text-background-dark text-sm font-bold rounded-lg hover:bg-primary/90 shadow-md shadow-primary/20"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>

            {!isEditingProfile && (
              <button 
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2 rounded-xl border border-border-dark bg-surface-dark px-6 py-2.5 text-sm font-bold text-gray-300 shadow-sm transition-all hover:border-primary hover:text-primary dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">edit_square</span>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Title and Post Action */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Content Overview</h1>
          <p className="mt-1 text-gray-400">Manage your stories and analyze engagement metrics.</p>
        </div>
        <Link to="/editor" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-background-dark shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-[1.02]">
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Create New Post
        </Link>
      </div>

      {/* Stats Row */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm shadow-primary/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">Total Posts</p>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">library_books</span>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">23</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-primary">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+2 this month</span>
          </div>
        </div>
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm shadow-primary/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">Total Views</p>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">bar_chart</span>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">8.2k</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-primary">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+12% vs last week</span>
          </div>
        </div>
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm shadow-primary/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">Comments Received</p>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">chat</span>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">342</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
            <span>New engagement</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg bg-surface-dark/50 p-1 border border-border-dark w-fit">
            <button
              className="rounded-md px-4 py-1.5 text-sm font-medium transition-all bg-primary text-background-dark"
            >
              300
            </button>
        </div>
      </div>

      {/* Post List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Post.map(post => (
          <article key={post.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-border-dark bg-surface-dark transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
            <div className="relative aspect-video w-full overflow-hidden bg-background-dark">
              <img src={post.coverImage} className="h-full w-full object-cover" alt="" />
              <div className="absolute right-3 top-3 rounded-md bg-primary/90 px-2.5 py-1 text-xs font-bold text-background-dark backdrop-blur-sm capitalize">Published</div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-gray-400">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-dark pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="material-symbols-outlined text-[16px]">visibility</span> {post.views}
                  <span className="material-symbols-outlined text-[16px] ml-1">chat_bubble</span> 42
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-surface-dark/50 p-2 text-gray-400 hover:bg-primary hover:text-background-dark transition-colors border border-border-dark">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button className="rounded-lg bg-surface-dark/50 p-2 text-gray-400 hover:bg-red-600 hover:text-white transition-colors border border-border-dark">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
