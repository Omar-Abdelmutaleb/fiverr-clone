import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import { newRequest } from "../../utils/newRequest";
import { useMutation, useQuery } from "@tanstack/react-query";

function MyGigs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

 const handleDelete = (id) => {
  mutation.mutate(id)
 }

  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "SOMETHING IS WRONG"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img
                    className="image"
                    src={gig.cover}
                    alt=""
                  />
                </td>
                <td>{gig.title}</td>
                <td>
                  {gig.price}
                </td>
                <td>{gig.sales}</td>
                <td>
                  <img className="delete" src="./img/delete.png" alt="" onClick={() => handleDelete(gig._id)}/>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
