import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/95 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
              <span className="material-symbols-outlined text-[20px]">
                terminal
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              TechBlog
            </span>
          </Link>

          {!isAuthPage && (
            <>
              <nav className="hidden md:flex items-center gap-8">
                
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/")
                      ? "text-primary"
                      : "text-gray-300 hover:text-primary"
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "text-primary"
                      : "text-gray-300 hover:text-primary"
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/editor"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/editor")
                      ? "text-primary"
                      : "text-gray-300 hover:text-primary"
                  }`}
                >
                  Write
                </Link>

              </nav>

              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="hidden text-sm font-medium text-gray-300 hover:text-primary md:block"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-background-dark transition-transform hover:bg-primary/90 hover:scale-[1.02] active:scale-95"
                >
                  Register
                </Link>
              </div>
            </>
          )}

          {isAuthPage && (
            <Link
              to="/"
              className="text-sm font-medium text-primary hover:underline"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
