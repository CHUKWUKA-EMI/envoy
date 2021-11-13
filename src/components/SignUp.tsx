import React, { useState, Fragment, FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import FormDialog from "./shared/FormDialog";
import VisibilityPasswordTextField from "./shared/VisibilityPasswordTextField";
import { Link } from "react-router-dom";
import { _signUp } from "../services/network";

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

const SignUp: FunctionComponent = () => {
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    if (
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      setStatus({
        error: true,
        success: false,
        message: "Please fill all the fields",
      });
      return;
    }

    setIsLoading(true);
    const response = await _signUp({ firstName, lastName, email, password });

    if (response?.status === 201) {
      setStatus({
        error: false,
        success: true,
        message:
          "You have successfully signed up. Please check your email for the next steps",
      });
      setIsLoading(false);
      setTimeout(() => {
        onClose();
      }, 5000);
    } else {
      setStatus({
        error: true,
        success: false,
        message: response?.data?.message,
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
        open={location.pathname === "/signup"}
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          signUp();
        }}
        headline="Sign Up"
        content={
          <Fragment>
            {status.error && <Alert severity="error">{status.message}</Alert>}
            {status.success && (
              <Alert severity="success">{status.message}</Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              error={status.error}
              required
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              label="First Name"
              autoFocus
              autoComplete="off"
              type="text"
              FormHelperTextProps={{ error: true }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              error={status.error}
              required
              fullWidth
              label="Last Name"
              autoFocus
              autoComplete="off"
              type="tex"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              FormHelperTextProps={{ error: true }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              error={status.error}
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
              error={status.error}
              fullWidth
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
              Submit
              {isLoading && <CircularProgress />}
            </Button>
            <Typography
              align="center"
              className={
                isLoading ? classes.disabledText : classes.forgotPassword
              }
              color="primary"
            >
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default SignUp;
