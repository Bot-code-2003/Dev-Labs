import React, { useEffect } from "react";
import MarkdownRender from "../components/MarkdownRender";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ClickedArticle = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = useParams();
  const article = useSelector((state) =>
    state.articles.articles.find((article) => article.slug === slug)
  );

  console.log("Clicked article: ", article);
  // console.log(article.markdown);
  console.log("Clicked article ri", article.randomIndex);

  return (
    <div className="bg-gray-100">
      <MarkdownRender
        markdownContent={article.markdown}
        title={article.title}
        randomIndex={article.randomIndex}
      />
    </div>
  );
};

export default ClickedArticle;
