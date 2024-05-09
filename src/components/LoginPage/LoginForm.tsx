import * as React from "react";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { KeyOutlined } from "@mui/icons-material";

// Component UI
import { Button, TextField, Box } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div>
    
 
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          {/* Icon */}
          <AccountCircle sx={{ color: "white", mr: 1, my: 0.5 }} />
          {/* Icon */}
          <TextField 
            label="Username"
            required
            value={username}
            variant="standard"
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          console.log("Login");
        }}
        >
            Login
            </Button>
      {/* Button */}

    </div>
  );
};

export default LoginForm;
