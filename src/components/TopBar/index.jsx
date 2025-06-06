import React, { useEffect, useState, useRef } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function TopBar() {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState();
  const nav = useNavigate();

  const addPhotoHandle = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://q9zp2l-8081.csb.app/api/photo/photos/new",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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
      setFile(null);
      nav(`/photos/${user_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://q9zp2l-8081.csb.app/api/user/${user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setUser(data);
        return;
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [user_id]);

  return (
    <AppBar position="absolute" className="topbar-appbar">
      <Toolbar className="topbar-toolbar">
        {/* Trái: Username */}
        <Box className="topbar-left">
          <Typography variant="h6">
            {token ? "Hello " + user?.last_name : "PhotoShare"}
          </Typography>
        </Box>

        {/* Giữa: Add Photo */}
        {token && (
          <Box className="topbar-center">
            <div>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button onClick={addPhotoHandle}>Add Photo</button>
              <p>{message}</p>
            </div>
          </Box>
        )}

        {/* Phải: Login / Logout */}
        <Box className="topbar-right">
          <Typography variant="h6">
            {!token ? (
              <Link to="/login">Please Login</Link>
            ) : (
              <Link to="/logout">Logout</Link>
            )}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
