import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./slide.scss";
import Slider from "infinite-react-carousel";
import { cards, projects } from "../../data.js";
import Featured from "../featured/featured.jsx";
import x from "../../img/1.jpg"
import ProjectCard from "../projectCard/ProjectCard";
import { lazy } from "react";
const Slide = ({children, slidesToShow, arrowsScroll, project}) => {
  const obj = {
    id: 1,
    title: "AI Artists",
    desc: "Add talent to AI",
    img: x,
  };
  return (
    <div className="slide">
      <div className="container">

        <Slider  slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
      
      <CategoryCard card={obj} />
      <CategoryCard card={cards[1]} />
      <CategoryCard card={cards[2]} />
      <CategoryCard card={cards[3]} />
      <CategoryCard card={cards[4]} />
      <CategoryCard card={cards[5]} />
      <CategoryCard card={cards[6]} />
      <CategoryCard card={cards[7]} />

{/* <ProjectCard card={projects[1]} />
      <ProjectCard card={projects[2]} />
      <ProjectCard card={projects[3]} />
      <ProjectCard card={projects[4]} />
      <ProjectCard card={projects[5]} /> */}

        </Slider>
      </div>
    </div>
  );
};

export default Slide;
