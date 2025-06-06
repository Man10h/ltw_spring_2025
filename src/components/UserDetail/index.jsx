import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const [message, setMessage] = useState("");

  // Fetch user details from the backend API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://q9zp2l-8081.csb.app/api/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          if (response.status === 401 || response.status === 403) {
            nav("/login");
          } else {
            const data = await response.json();
            setMessage(data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setMessage(error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="user-detail-container">
      {user ? (
        <>
          <Typography variant="h5">User Details</Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {user.last_name}
          </Typography>
          <Typography variant="body1">
            <strong>Location:</strong> {user.location}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {user.description}
          </Typography>
          <Typography variant="body1">
            <strong>Occupation:</strong> {user.occupation}
          </Typography>
          <Link to={`/photos/${user._id}`}>View Photos</Link>
        </>
      ) : (
        <Typography variant="body1">User not found!</Typography>
      )}
    </div>
  );
}

export default UserDetail;
