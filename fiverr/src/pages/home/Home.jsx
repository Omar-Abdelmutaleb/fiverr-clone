import "./home.scss";
import { cards } from "../../data.js";
import superHero from "../../img/superHero.webm";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Slide from "../../components/Slide/Slide";
import Featured from "../../components/featured/featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {/* {cards.map(card =>{
          <CategoryCard key={card.id} item={card} />
        })} */}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="../public/img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high quality services at every price point. No hourly rates,
              just project based pricing.
            </p>
            <div className="title">
              <img src="../public/img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high quality services at every price point. No hourly rates,
              just project based pricing.
            </p>
            <div className="title">
              <img src="../public/img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high quality services at every price point. No hourly rates,
              just project based pricing.
            </p>
          </div>
          <div className="item">
            <video className="ss" src={superHero} controls></video>
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item width">
           <h1>fiverr business</h1>
           <h1>A business solution designed for teams</h1>
           <p>Upgrade to a curated experience packed with tools and benefits, dedicated to businesses</p>
           <div className="title">
            <img src="./img/check.png" alt="" />
            Connect with freelancers with proven experience
           </div>
           <div className="title">
            <img src="./img/check.png" alt="" />
            Team collaboration tools & Business payment solutions
           </div>
           <div className="title">
            <img src="./img/check.png" alt="" />
            Dedicated account management
           </div>
           <button>Explore Fiverr Business</button>
          </div>
          <div className="item second">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png" alt="" />
          </div>
        </div>
      </div>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {/* {cards.map(card =>{
          <CategoryCard key={card.id} item={card} />
        })} */}
      </Slide>
    </div>
  );
};

export default Home;
