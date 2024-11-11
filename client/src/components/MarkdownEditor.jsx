import React, { useState } from "react";
import MarkdownRenderer from "./MarkdownRender";

const MarkdownEditor = () => {
  const gradients = [
    "from-slate-900 to-slate-700",
    "from-violet-300 to-pink-300",
    "from-blue-300 to-cyan-300",
    "from-emerald-500 to-emerald-900",
    "from-teal-200 to-teal-500",
    "from-teal-400 to-yellow-300",
    "from-rose-400 to-red-500",
  ];

  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [randomIndex, setRandomIndex] = useState("");

  // Handle text changes in the editor
  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handlePublish = () => {
    // console.log("Publishing markdown:", markdown);
    console.log("Title:", title);

    // select a random number on a range 0 to 6
    const random = Math.floor(Math.random() * 6);
    setRandomIndex(random);
  };
  // console.log("Random index:", randomIndex);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 ">
      {/** This div is 25 % span only */}
      <div className="flex flex-col col-span-1">
        <h1>Markdown Blog Editor</h1>
        <input
          className="h-10 border mb-5"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
        />
        <textarea
          className=" border"
          rows={20}
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Write your blog in Markdown"
          // style={{ width: "100%", height: "300px" }}
        />
        <button
          onClick={handlePublish}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Publish
        </button>
      </div>
      <div className="col-span-2">
        <h2>Preview</h2>
        <MarkdownRenderer
          markdownContent={markdown}
          // thumbnail="https://via.placeholder.com/800x400"
          title={title}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
