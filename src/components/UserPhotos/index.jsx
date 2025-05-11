import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  // Fetch photos of the user from the backend API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/photo/photosOfUser/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setPhotos(data);
        } else {
          console.error("Error fetching photos:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [userId]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Photos of User {userId}
      </Typography>
      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "20px" }}>
          <img
            src={`/images/${photo.file_name}`}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
          <Typography variant="caption">
            Created: {formatDate(photo.date_time)}
          </Typography>
          <div style={{ marginTop: "10px" }}>
            {photo.comments?.map((comment) => (
              <div key={comment._id}>
                <Typography variant="body2">
                  <strong>
                    <Link to={`/users/${comment.user?._id}`}>
                      {comment.user
                        ? `${comment.user.last_name}`
                        : "Unknown User"}
                    </Link>
                  </strong>{" "}
                  at {formatDate(comment.date_time)}:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: "10px" }}>
                  {comment.comment}
                </Typography>
              </div>
            ))}
          </div>
          <Divider style={{ marginTop: "15px" }} />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;