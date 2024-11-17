import React, { useState } from "react";
import MarkdownRender from "./MarkdownRender";
import { useDispatch } from "react-redux";
import { submitArticle } from "../actions/articleAction";

const MarkdownEditor = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [slug, setSlug] = useState("");
  const [articleHeaderImage, setArticleHeaderImage] = useState("");
  const [imageCredit, setImageCredit] = useState("");

  // Handle text changes in the editor
  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handlePublish = () => {
    dispatch(
      submitArticle(
        title,
        description,
        markdown,
        articleHeaderImage,
        imageCredit,
        slug
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 ">
      {/** This div is 25% span only */}
      <div className="flex flex-col col-span-1">
        <h1>Markdown Blog Editor</h1>
        <input
          className="h-10 border mb-5"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="h-10 border mb-5"
          placeholder="Enter description"
        />
        <input
          type="text"
          onChange={(e) => setArticleHeaderImage(e.target.value)}
          value={articleHeaderImage}
          className="h-10 border mb-5"
          placeholder="Enter image URL"
        />
        <input
          type="text"
          onChange={(e) => setImageCredit(e.target.value)}
          value={imageCredit}
          className="h-10 border mb-5"
          placeholder="Enter image credit"
        />
        <input
          className="h-10 border mb-5"
          type="text"
          placeholder="Slug"
          onChange={(e) => setSlug(e.target.value)}
          value={slug}
        />
        <textarea
          className="border"
          rows={20}
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Write your blog in Markdown"
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
          description={description}
          articleHeaderImage={articleHeaderImage}
          imageCredit={imageCredit}
          title={title}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
