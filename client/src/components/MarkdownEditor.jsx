import React, { useState } from "react";
import MarkdownRenderer from "./MarkdownRender";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  // Handle text changes in the editor
  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <h1>Markdown Blog Editor</h1>
      <textarea
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Write your blog in Markdown"
        style={{ width: "100%", height: "300px" }}
      />
      <h2>Preview</h2>
      <MarkdownRenderer
        markdownContent={markdown}
        // thumbnail="https://via.placeholder.com/800x400"
        title="Mastering the MVP: Launching Your Startup Idea on a Budget (or Even for Free!)"
      />
    </div>
  );
};

export default MarkdownEditor;
