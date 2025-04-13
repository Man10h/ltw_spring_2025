import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography} from "@mui/material";
import models from '../../modelData/models'; // Giả sử bạn có model dữ liệu ở đây

function UserDetail() {
  // Lấy userId từ URL params
  const { userId } = useParams();

  // Lấy thông tin người dùng từ model (giả sử mô hình đã được định nghĩa)
  const user = models.userModel(userId); // Đây là nơi bạn lấy dữ liệu người dùng từ model

  return (
    <div>
      {user ? (
        <>
          <Typography variant="h5">User Details</Typography>
          <Typography variant="body1">User ID: {user._id}</Typography>
          <Typography variant="body1">Name: {user.first_name} {user.last_name}</Typography>
          <Typography variant="body1">Location: {user.location}</Typography>
          <Typography variant="body1">Description: {user.description}</Typography>
          <Typography variant="body1">Occupation: {user.occupation}</Typography>
          
          <Link to={`/photos/${user._id}`}>View Photos</Link>
        </>
      ) : (
        <Typography variant="body1">User not found!</Typography>
      )}
    </div>
  );
}

export default UserDetail;
