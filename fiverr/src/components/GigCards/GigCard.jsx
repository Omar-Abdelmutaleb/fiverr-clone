import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "./gigCard.scss";
import { newRequest } from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        console.log(res);
        return res.data;
      }),
  });


  const meanOfStars = Math.round(item.totalStars / item.starNumber);
  let array =[]
  for (let i = 1; i <= meanOfStars; i++) {
    array.push(i)
  }

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading..."
          ) : error ? (
            "SOMETHING WENT WRONG"
          ) : (
            <div className="user">
              <img src={data.img || "/img/no-avatar.png"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            {array.map((element)=> {
              return <img src="../img/star.png" alt="" key={element}/>
            
            })}
            <span>{!isNaN(meanOfStars) && meanOfStars}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="../img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup> .99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
