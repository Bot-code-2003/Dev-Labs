import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ArticleCard = ({ article, onClick }) => {
  const getImage = (randomIndex) => {
    switch (randomIndex) {
      case 0:
        return "/articlebg/article1.jpg";
      case 1:
        return "/articlebg/article2.png";
      case 2:
        return "/articlebg/article3.png";
      case 3:
        return "/articlebg/article4.png";
      case 4:
        return "/articlebg/article5.webp";
      case 5:
        return "/articlebg/1.png";
      case 6:
        return "/articlebg/2.png";
      case 7:
        return "/articlebg/3.png";
      case 8:
        return "/articlebg/4.png";
      case 9:
        return "/articlebg/5.png";
      case 10:
        return "/articlebg/6.png";
      case 11:
        return "/articlebg/7.png";
      case 12:
        return "/articlebg/8.png";
      default:
        return "/articlebg/1.png";
    }
  };
  return (
    <div>
      <Link
        to={`/article/${article.slug}`}
        onClick={onClick}
        className="block bg-white dark:bg-gray-700 shadow-lg mb-6 hover:shadow-xl transition duration-300"
      >
        <img
          className="w-full h-52 object-cover mb-1"
          src={getImage(article.randomIndex)}
          alt={article.title}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 truncate">
            {article.title}
          </h2>

          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mt-3">
            <div className="flex items-center space-x-1">
              <ThumbUpAltIcon style={{ fontSize: 16 }} />
              <span>{article.likes || 0} Likes</span>
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
