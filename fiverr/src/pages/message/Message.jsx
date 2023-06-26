import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { newRequest } from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        // console.log(res.data);
        return res.data;
      }),
  });

  function imageOfTheRecipient() {
    for (let i = 0; i < data.length; i++) {
      if (data[i].userId != currentUser._id) {
        let x = data[i].userId;
        return x;
      }
    }
  }

  const {
    isLoading: x1,
    error: x2,
    data: dataCon,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations/single/${id}`).then((res) => {
     
        return res.data;
      }),
  });

  let conv;
  if (currentUser._id == dataCon?.sellerId) {
    conv = dataCon?.buyerId;
  } else {
    conv = dataCon?.sellerId;
  }

  const {
    isLoading: y1,
    error: y2,
    data: dataUser,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest.get(`/users/single/${conv}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
    enabled: !!conv,
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} {`${currentUser.username}`}{" "}
          {">"}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            <div className="nothing" style={{ display: "none" }}></div>
            {/* {console.log(currentUser)} */}
            {data?.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src={
                    m.userId === currentUser?._id
                      ? currentUser?.img
                      : dataUser?.img
                  }
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
