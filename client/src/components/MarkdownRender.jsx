import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Lottie from "lottie-react";
import LoadingAnimation from "../assets/lotties/Animation - 1729259117182.json";

export default function MarkdownRender({
  markdownContent,
  title,
  description,
  articleHeaderImage,
  imageCredit,
}) {
  if (!markdownContent || !title) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Lottie
          animationData={LoadingAnimation}
          loop={true}
          className="w-24 h-24"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-md italic text-gray-500 dark:text-gray-400 ">
                {description}
              </p>
            )}
            {articleHeaderImage && (
              <div>
                <img
                  src={articleHeaderImage}
                  alt=""
                  className="w-full h-auto object-cover mt-6"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Image credit: {imageCredit}
                </p>
              </div>
            )}
          </header>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mt-8 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 leading-relaxed" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 mb-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-600 dark:text-gray-400"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-600 hover:underline dark:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => {
                const { src, alt } = props;

                return (
                  <div className="my-4">
                    <img className="w-full h-auto" {...props} alt={alt || ""} />
                    {alt && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Image credit: {alt}
                      </p>
                    )}
                  </div>
                );
              },

              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5  text-sm"
                    {...props}
                  />
                ) : (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3  overflow-x-auto text-sm my-4">
                    <code {...props} />
                  </pre>
                ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-4">
                  <table
                    className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    {...props}
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium uppercase"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="px-3 py-2 whitespace-nowrap text-sm"
                  {...props}
                />
              ),
              mark: ({ node, ...props }) => (
                <mark
                  className="bg-yellow-100 dark:bg-yellow-900 px-1 py-0.5 "
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold" {...props} />
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
