import React from "react";
import { Link } from "react-router-dom";
import "./categoryCard.scss";

function CategoryCard({ card }) {
  return (
    <Link to="/gigs?cat=design">
      <div className="categoryCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}
export default CategoryCard;