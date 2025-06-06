import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./styles.css";

function LoginRegister({ setTrigger }) {
  const [tab, setTab] = useState("login");
  const [login_name, setLogin_name] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  const loginHandle = async () => {
    try {
      const response = await fetch(
        `https://q9zp2l-8081.csb.app/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            login_name: login_name,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        setMessage("Failed to login.");
        return;
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.id);
        setTrigger((pre) => !pre);
        console.log(localStorage.getItem("token"));
        console.log(data.id);
        nav(`/users/${data.id}`);
      }
      setMessage(data.message);
      return;
    } catch (error) {
      setMessage("Failed to login.");
    }
  };

  const onRegisterSubmit = async () => {
    try {
      const response = await fetch(
        `https://q9zp2l-8081.csb.app/api/user/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login_name: login_name,
            first_name: first_name,
            last_name: last_name,
            password: password,
            repassword: repassword,
            location: location,
            occupation: occupation,
            description: description,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message);
        return;
      }
      const responseData = await response.json();
      setMessage(
        `Register Successfull! Login name: ${responseData.login_name}`
      );
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("user_id", responseData.id);
      setTab("login");
    } catch (error) {
      setMessage("Failed to register.");
    }
  };

  return (
    <div>
      {tab === "login" && (
        <div>
          <p>
            Login_name:
            <input
              type="text"
              onChange={(e) => setLogin_name(e.target.value)}
            />
          </p>
          <p>
            Password:
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <button onClick={() => loginHandle()}>Login</button>
          <p>{message}</p>
        </div>
      )}

      {tab === "register" && (
        <div>
          <p>
            Login_name:{" "}
            <input
              type="text"
              onChange={(e) => setLogin_name(e.target.value)}
            />
          </p>
          <p>
            Password:{" "}
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
          </p>
          <p>
            Repassword:{" "}
            <input
              type="text"
              onChange={(e) => setRepassword(e.target.value)}
            />
          </p>
          <p>
            Location:{" "}
            <input type="text" onChange={(e) => setLocation(e.target.value)} />
          </p>
          <p>
            First_name:{" "}
            <input
              type="text"
              onChange={(e) => setFirst_name(e.target.value)}
            />
          </p>
          <p>
            Last_name:{" "}
            <input type="text" onChange={(e) => setLast_name(e.target.value)} />
          </p>
          <p>
            Occupation:{" "}
            <input
              type="text"
              onChange={(e) => setOccupation(e.target.value)}
            />
          </p>
          <p>
            Description:{" "}
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>
          <button onClick={() => onRegisterSubmit()}>Register</button>
        </div>
      )}

      <div>
        <button onClick={() => setTab("login")}>Login</button>
        <button onClick={() => setTab("register")}>Register</button>
      </div>
    </div>
  );
}

export default LoginRegister;
