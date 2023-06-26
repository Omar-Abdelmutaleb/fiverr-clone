import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/newRequest";
import "./success.scss";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 50003);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="success">
      <img src="/img/Paysuccess.png" width={810} height={450} alt="" draggable={false} />
      
    </div>
  );
};

export default Success;
