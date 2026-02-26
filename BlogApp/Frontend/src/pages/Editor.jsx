import React from "react";

const Editor = () => {
  return (
    <main className="flex-1 flex justify-center w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-[800px] flex flex-col gap-8 pb-20">

        {/* Cover Upload */}
        <div className="group relative w-full h-48 sm:h-64 rounded-xl border-2 border-dashed border-border-dark bg-surface-dark/50 flex flex-col items-center justify-center gap-3 overflow-hidden transition-all hover:border-primary/50">
          
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          <div className="p-3 rounded-full bg-primary/20 text-primary group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">
              add_photo_alternate
            </span>
          </div>

          <div className="text-center px-4">
            <p className="text-gray-300 font-medium">
              Add a cover image
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Drag and drop or click to upload
            </p>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full bg-transparent text-4xl sm:text-5xl font-bold text-white placeholder:text-border-dark border-none focus:ring-0 px-0 resize-none leading-tight"
            placeholder="Blog Title"
          />

          <div className="sticky top-[73px] z-40 py-2 -mx-2 px-2 bg-background-dark/95 backdrop-blur-sm mb-4 border-b border-border-dark flex items-center justify-between">
            
            <div className="flex items-center gap-1 p-1 rounded-lg border border-border-dark bg-surface-dark w-fit shadow-sm">
              
              <button type="button" className="p-2 rounded hover:bg-border-dark text-gray-400 transition-colors group">
                <span className="material-symbols-outlined text-[20px] group-hover:text-primary">
                  format_bold
                </span>
              </button>

              <button type="button" className="p-2 rounded hover:bg-border-dark text-gray-400 transition-colors group">
                <span className="material-symbols-outlined text-[20px] group-hover:text-primary">
                  format_italic
                </span>
              </button>

              <div className="w-px h-5 bg-border-dark mx-1"></div>

              <button type="button" className="p-2 rounded hover:bg-border-dark text-gray-400 transition-colors group">
                <span className="material-symbols-outlined text-[20px] group-hover:text-primary">
                  format_h1
                </span>
              </button>

              <button type="button" className="p-2 rounded hover:bg-border-dark text-gray-400 transition-colors group">
                <span className="material-symbols-outlined text-[20px] group-hover:text-primary">
                  link
                </span>
              </button>

              <button type="button" className="p-2 rounded hover:bg-border-dark text-gray-400 transition-colors group">
                <span className="material-symbols-outlined text-[20px] group-hover:text-primary">
                  image
                </span>
              </button>

            </div>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-background-dark transition-all text-xs font-bold disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">
                auto_awesome
              </span>
              AI Assist
            </button>

          </div>

          <textarea
            className="w-full min-h-[40vh] bg-transparent text-lg text-gray-300 placeholder:text-gray-500 border-none focus:ring-0 px-0 resize-none leading-relaxed"
            placeholder="Tell your story..."
          />
        </div>

        {/* AI Summary */}
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
            <span className="material-symbols-outlined text-[18px]">
              description
            </span>
            AI Suggested Summary
          </div>
          <p className="text-sm text-gray-400 italic">AiSummary</p>
        </div>

        {/* Tags Section */}
        <div className="border-t border-border-dark pt-8 mt-4">
          <div className="flex flex-col gap-4 max-w-md">

            <label className="block">
              <span className="text-sm font-semibold text-gray-300 mb-2 block">
                Tags
              </span>

              <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-surface-dark border border-border-dark focus-within:border-primary transition-all">
                
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary/20 text-primary text-sm font-medium">
                  tag
                  <button type="button" className="hover:text-primary/70">
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                </span>

                <input
                  type="text"
                  className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-gray-500 min-w-[120px] flex-1 p-0"
                  placeholder="Add a tag and press Enter..."
                />
              </div>
            </label>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-400">
                Word count:{" "}
                <span className="text-white font-medium">
                  45
                </span>
              </span>

              <span className="text-border-dark">•</span>

              <button
                type="button"
                className="px-6 py-2 bg-primary text-background-dark font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] hover:bg-primary/90 transition-all"
              >
                Publish Post
              </button>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
};

export default Editor;
