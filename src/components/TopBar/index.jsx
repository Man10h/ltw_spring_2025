import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from '../../modelData/models'; 

function TopBar() {
  const location = useLocation();
  const { userId } = useParams();
  const [userName, setUserName] = useState("");

 
  useEffect(() => {
    if (userId) {
  
      const user = models.userModel(userId);
      setUserName(user ? user.name : "Người dùng");
    } else {
      setUserName("PhotoShare");
    }
  }, [userId]);

  
  let contextText = "PhotoShare";

  if (location.pathname.startsWith("/users/") && !location.pathname.includes("/photos")) {
    contextText = `Thông tin người dùng ${userId}`;
  } else if (location.pathname.includes("/photos")) {
    contextText = `Ảnh của người dùng ${userId}`;
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
