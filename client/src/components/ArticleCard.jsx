import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { incrementViews } from "../actions/articleAction";
import { useDispatch } from "react-redux";

const ArticleCard = ({ article }) => {
  const dispatch = useDispatch();

  const articleClick = (slug) => {
    dispatch(incrementViews(slug));
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link
        to={`/article/${article.slug}`}
        onClick={() => articleClick(article.slug)}
        className="block"
      >
        <img
          className="w-full h-56 object-cover"
          src={article.articleHeaderImage}
          alt={article.title}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {article.title}
          </h2>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {article.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <ThumbUpAltIcon style={{ fontSize: 16 }} />
              <span>{article.likes.length || 0} Likes</span>
            </div>
            <div className="flex items-center space-x-1">
              <VisibilityIcon style={{ fontSize: 16 }} />
              <span>{article.views || 0} Views</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>•</span>
              <p>{moment(article.createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
