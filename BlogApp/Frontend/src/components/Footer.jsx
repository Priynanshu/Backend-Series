import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dark bg-background-dark py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              terminal
            </span>
            <span className="text-lg font-bold text-white">
              TechBlog
            </span>
          </div>

          <div className="flex gap-8">
            <Link
              to="/privacy"
              className="text-sm text-gray-400 hover:text-primary"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-sm text-gray-400 hover:text-primary"
            >
              Terms of Service
            </Link>

            <Link
              to="/contact"
              className="text-sm text-gray-400 hover:text-primary"
            >
              Contact
            </Link>
          </div>

          <div className="text-sm text-gray-400">
            © {year} TechBlog. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
