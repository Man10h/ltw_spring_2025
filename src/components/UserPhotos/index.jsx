import React from "react";
import { Typography, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Photos of User {userId}
      </Typography>
      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "20px" }}>
          {/* Sử dụng ảnh từ thư mục public/images */}
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
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
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