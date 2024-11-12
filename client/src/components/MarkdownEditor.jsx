import React, { useState } from "react";
import MarkdownRender from "./MarkdownRender";
import { useDispatch } from "react-redux";
import { submitArticle } from "../actions/articleAction";

const MarkdownEditor = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [randomIndex, setRandomIndex] = useState("");
  const [slug, setSlug] = useState("");
  const [articleCategory, setArticleCategory] = useState("");

  // Handle text changes in the editor
  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handlePublish = () => {
    // random number from 0 to 12
    const random = Math.floor(Math.random() * 13);
    setRandomIndex(random);
    console.log("category", articleCategory);

    dispatch(
      submitArticle(title, markdown, randomIndex, slug, articleCategory)
    );
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
        <select
          name="category"
          id=""
          onChange={(e) => (
            setArticleCategory(e.target.value), console.log(e.target.value)
          )}
          value={articleCategory}
          className="h-10 border mb-5"
        >
          <option value="techstories">Tech Stories</option>
          <option value="techinsights">Tech Insights</option>
          <option value="foryoungentrepreneurs">For young entrepreneurs</option>
        </select>
        <input
          className="h-10 border mb-5"
          type="text"
          placeholder="Slug"
          onChange={(e) => setSlug(e.target.value)}
          value={slug}
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
        <MarkdownRender
          markdownContent={markdown}
          // thumbnail="https://via.placeholder.com/800x400"
          title={title}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
