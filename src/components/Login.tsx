import React, { useState, Fragment } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import FormDialog from "./shared/FormDialog";
import VisibilityPasswordTextField from "./shared/VisibilityPasswordTextField";
import { _signIn } from "../services/network";
import { useAppDispatch } from "../state/hooks";
import { loginUser } from "../state/loginReducer";

const useStyles = makeStyles((theme) => ({
  forgotPassword: {
    marginTop: "3em",
    color: "inherit",
    cursor: "pointer",
    "&:enabled:hover": {
      color: "inherit",
    },
    "&:enabled:focus": {
      color: "inherit",
    },
  },
  disabledText: {
    cursor: "auto",
    color: "grey",
  },
  formControlLabel: {
    marginRight: 0,
  },
}));

interface ILoginResponse {
  refresh_token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    imageUrl: string | null;
    imagekit_id: string | null;
  };
}

function LoginDialog() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    error: false,
    success: false,
    message: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setStatus({
        error: true,
        success: false,
        message: "Please fill all fields",
      });
      return;
    }
    setIsLoading(true);
    const response = await _signIn(email, password);
    if (response?.status === 200) {
      const data = response.data as ILoginResponse;
      const payload = {
        authtoken: data.refresh_token,
        id: data.user.id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        role: data.user.role,
        createdAt: data.user.createdAt,
        imageUrl: data.user.imageUrl,
        imagekit_id: data.user.imagekit_id,
      };

      await dispatch(loginUser(payload));
      setStatus({ error: false, success: true, message: "Login successful" });
      setIsLoading(false);
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      setStatus({
        error: true,
        success: false,
        message: "Invalid credentials",
      });
      setIsLoading(false);
    }
  };

  const onClose = () => {
    navigate("/", { state: { from: location } });
  };

  return (
    <Fragment>
      <FormDialog
        open={location.pathname === "/login"}
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          login();
        }}
        headline="Login"
        content={
          <Fragment>
            {status.error && <Alert severity="error">{status.message}</Alert>}
            {status.success && (
              <Alert severity="success">{status.message}</Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              error={status.error === true}
              required
              fullWidth
              label="Email Address"
              autoFocus
              autoComplete="off"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status.error === true}
              label="Password"
              autoComplete="off"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              size="large"
            >
              Login
              {isLoading && <CircularProgress />}
            </Button>
            <Typography
              align="center"
              className={
                isLoading ? classes.disabledText : classes.forgotPassword
              }
              color="primary"
            >
              Forgot Password?
            </Typography>
            <Typography
              align="center"
              className={
                isLoading ? classes.disabledText : classes.forgotPassword
              }
              color="primary"
            >
              New user? <Link to="/signup">Sign up</Link>
            </Typography>
          </Fragment>
        }
      />
    </Fragment>
  );
}

export default LoginDialog;
