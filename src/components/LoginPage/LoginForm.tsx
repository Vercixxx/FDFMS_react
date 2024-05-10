import * as React from "react";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { KeyOutlined } from "@mui/icons-material";

// Component UI
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Box } from "@mui/material";

// Login function
import { SignInUser } from "../../scripts/user";

// Router
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);


  const navigate = useNavigate();

  // const Login = async (event) => {
  //   event.preventDefault();

  //   const username = event.target.username;
  //   const password = event.target.password;

  //   const navigate = useNavigate();

  //   setLoading(true);

  //   const response = await SignInUser(username, password);

  //   if (response) {
  //     navigate("/dashboard");
  //   } else {
  //     alert("Invalid credentials");
  //   }

  //   setLoading(false);
  // };

  return (
    <form >
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        {/* Icon */}
        <AccountCircle sx={{ color: "white", mr: 1, my: 0.5 }} />
        {/* Icon */}
        <TextField
          label="Username"
          required
          value={username}
          variant="standard"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        {/* Icon */}
        <KeyOutlined sx={{ color: "white", mr: 1, my: 0.5 }} />
        {/* Icon */}
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      {/* Button */}
      <LoadingButton
        size="large"
        color="success"
        onClick={
          async (event) => {
            event.preventDefault();


            setLoading(true);

            console.log(username, password);

            const response = await SignInUser(username, password);

            if (response) {
              navigate("/dashboard");
            } else {
              alert("Invalid credentials");
            }

            setLoading(false);
          }
        }
        loading={loading}
        variant="contained"
      >
        <span>Login</span>
      </LoadingButton>

      {/* Button */}
    </form>
  );
};

export default LoginForm;
