import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRender({
  markdownContent,
  title,
  randomIndex,
}) {
  console.log(randomIndex);

  return (
    <div className="markdown-container text-gray-800 min-h-screen dark:bg-gradient-to-b dark:from-gray-800 dark:to-black dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <header className="mb-12">
            <div>
              <img
                className="w-full h-64 object-cover mb-5"
                src={
                  randomIndex === 0
                    ? "/articlebg/article1.jpg"
                    : randomIndex === 1
                    ? "/articlebg/article2.png"
                    : randomIndex === 2
                    ? "/articlebg/article3.png"
                    : randomIndex === 3
                    ? "/articlebg/article4.png"
                    : randomIndex === 4
                    ? "/articlebg/article5.webp"
                    : randomIndex === 5
                    ? "/articlebg/1.png"
                    : randomIndex === 6
                    ? "/articlebg/2.png"
                    : randomIndex === 7
                    ? "/articlebg/3.png"
                    : randomIndex === 8
                    ? "/articlebg/4.png"
                    : randomIndex === 9
                    ? "/articlebg/5.png"
                    : randomIndex === 10
                    ? "/articlebg/6.png"
                    : randomIndex === 11
                    ? "/articlebg/7.png"
                    : "/articlebg/8.png"
                }
                alt=""
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4  flex items-center justify-center">
              {title}
            </h1>
            {/* <div className="w-24 h-1 bg-blue-500 mx-auto dark:bg-blue-400"></div> */}
          </header>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl font-bold mt-8 mb-4 dark:text-gray-200  "
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-semibold mt-6 mb-3 dark:text-gray-200 "
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-medium mt-4 mb-2 dark:text-gray-300"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="mb-4 leading-relaxed dark:text-gray-300"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc pl-6 mb-4 dark:text-gray-300"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal pl-6 mb-4 dark:text-gray-300"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-2 dark:text-gray-300" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-500 pl-4 italic my-4 dark:border-blue-400 dark:text-gray-300"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  target="_blank"
                  className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <img
                  className="max-w-full h-auto rounded-lg shadow-md my-4"
                  {...props}
                />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    className="bg-gray-100 rounded px-1 py-0.5 dark:bg-gray-700 dark:text-gray-200"
                    {...props}
                  />
                ) : (
                  <pre className="bg-gray-100 rounded p-4 overflow-x-auto dark:bg-gray-700 dark:text-gray-200">
                    <code {...props} />
                  </pre>
                ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-4">
                  <table
                    className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
                    {...props}
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:bg-gray-700 dark:text-gray-300"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                  {...props}
                />
              ),

              mark: ({ node, ...props }) => (
                <mark
                  className="bg-yellow-100 text-yellow-800 rounded px-1 py-0.5 dark:bg-yellow-700 dark:text-yellow-200"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong
                  className="font-semibold dark:text-gray-300"
                  {...props}
                />
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
