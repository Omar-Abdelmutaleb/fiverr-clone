import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { newRequest } from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckOutForm from "../../components/checkOutForm/CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51NMPzKCvXWkInWAcZFVfzSqvA1mJctZdT7DhaVFhKkmslxhRWjuG0JsyekaAVyEi3XMXyT4roNeOOQ2BPDarYawN00bMfs8LNZ"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async (req, res) => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
