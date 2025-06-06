import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [trigger, setTrigger] = useState(false);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const nav = useNavigate();

  //Fetch photos of the user
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoResponse = await fetch(
          `https://q9zp2l-8081.csb.app/api/photo/photosOfUser/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!photoResponse.ok) {
          if (photoResponse.status === 401 || photoResponse.status === 403) {
            nav("/login");
          } else {
            const data = await photoResponse.json();
            setMessage(data.message);
            return;
          }
        }
        const data = await photoResponse.json();
        setPhotos(data.photos);
      } catch (error) {
        setMessage(error);
      }
    };

    const fetchUser = async () => {
      try {
        const userResponse = await fetch(
          `https://q9zp2l-8081.csb.app/api/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!userResponse.ok) {
          if (userResponse.status === 401 || userResponse.status === 403) {
            nav("/login");
          } else {
            const data = await userResponse.json();
            setMessage(data.message);
            return;
          }
        }
        const user = await userResponse.json();
        setUser(user);
      } catch (error) {
        setMessage(error);
      }
    };

    fetchUser();
    fetchPhotos();
  }, [userId, trigger]);

  const commentHandle = async (id) => {
    try {
      const res = await fetch(
        `https://q9zp2l-8081.csb.app/api/photo/commentsOfPhoto/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment: content,
            user_id: user_id,
          }),
        }
      );
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          nav("/login");
        } else {
          const data = await res.json();
          setMessage(data.message);
          return;
        }
      }
      const data = await res.json();
      setMessage(data.message);
      setTrigger((pre) => !pre);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Photos of User {user.last_name}</h2>
      {photos.map((photo, photo_index) => (
        <div key={photo_index}>
          <img
            src={`https://q9zp2l-8081.csb.app/images/${photo.file_name}`}
            alt=""
          />
          <h6>Created: {photo.date_time}</h6>
          <div>
            {photo.comments?.map((comment, comment_index) => {
              return (
                <div key={comment_index}>
                  <p>
                    <b>{comment.user && comment.user.last_name}:</b>
                    {comment.comment}
                  </p>
                  <h6>{comment.date_time}</h6>
                </div>
              );
            })}
            <div>
              <p>
                Comment:
                <input
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                />
              </p>
              <button onClick={() => commentHandle(photo.id)}>
                Add Comment
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
