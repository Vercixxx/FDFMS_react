import * as React from "react";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { KeyOutlined } from "@mui/icons-material";

// Component UI
import LoadingButton from "@mui/lab/LoadingButton";

// Ant Design
import { UserOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

// Login function
import { SignInUser } from "../../scripts/user";

// Router
import { useNavigate } from "react-router-dom";

// Snackbars
import { useSnackbarContext } from "./../../components/SnackbarContext";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  // Snackbars
  const { showSnackbar } = useSnackbarContext();

  const navigate = useNavigate();

  const Login = async (event) => {
    event.preventDefault();

    setLoading(true);

    const response = await SignInUser(username, password);

    if (response) {
      navigate("/dashboard");
    } else {
      showSnackbar("Invalid credentials", "error");
    }

    setLoading(false);
  };

  return (
    <form>
      <div className="mb-4">
        <ConfigProvider
          theme={{
            components: {
              Input: {},
            },
          }}
        >
          <Input
            size="large"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            disabled={loading}
            prefix={<UserOutlined />}
          />
        </ConfigProvider>
      </div>
      <div className="mb-4">
        <Input.Password
          size="large"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={loading}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>

      {/* Button */}
      <Button
        type="text"
        loading={loading}
        onClick={Login}
        block
        className="font-black text-xl pb-8"
      >
        Sign in
      </Button>
      {/* <LoadingButton
        size="large"
        color="success"
        onClick={async (event) => {
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
        }}
        loading={loading}
        variant="contained"
      >
        <span>Login</span>
      </LoadingButton> */}

      {/* Button */}
    </form>
  );
};

export default LoginForm;
