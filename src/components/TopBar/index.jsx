import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

function TopBar() {
  const location = useLocation();
  const { userId } = useParams();
  const [userName, setUserName] = useState("");

  // Fetch user name from the backend API
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:8081/api/user/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUserName(`${data.last_name}`);
          } else {
            console.error('Error fetching user:', await response.text());
            setUserName("Người dùng");
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setUserName("Người dùng");
        }
      };
      fetchUser();
    } else {
      setUserName("PhotoShare");
    }
  }, [userId]);

  let contextText = "PhotoShare";

  if (location.pathname.startsWith("/users/") && !location.pathname.includes("/photos")) {
    contextText = `Thông tin người dùng ${userName || userId}`;
  } else if (location.pathname.includes("/photos")) {
    contextText = `Ảnh của người dùng ${userName || userId}`;
  } else if (location.pathname === "/users") {
    contextText = "Danh sách người dùng";
  }

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{userName}</Typography>
        </Box>
        <Typography variant="h6">{contextText}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;