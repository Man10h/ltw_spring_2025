import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography } from "@mui/material";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  // Fetch user details from the backend API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Error fetching user:', await response.text());
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, [userId]);

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