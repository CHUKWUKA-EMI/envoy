import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SignUpIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import UserGroupsIcon from "@mui/icons-material/Groups";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import { logout } from "../state/loginReducer";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "1.3em",
    borderRadius: "1em",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ButtonWrapper = styled(Button)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textTransform: "none",
  fontWeight: "bold",
  height: "3em",
  backgroundColor: "inherit",
  color: "white",
  "&:hover": {
    backgroundColor: "inherit",
    color: "white",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.authUser.user);
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      {!Boolean(state.authtoken) && (
        <MenuItem sx={{ display: { xs: "flex" } }} onClick={handleMenuClose}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SignUpIcon />
          </IconButton>
          <p>Sign up</p>
        </MenuItem>
      )}
      {!Boolean(state.authtoken) && (
        <MenuItem sx={{ display: { xs: "flex" } }} onClick={handleMenuClose}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LoginIcon />
          </IconButton>

          <p>Login</p>
        </MenuItem>
      )}
      {Boolean(state.authtoken) && (
        <MenuItem
          sx={{ display: { xs: "flex" } }}
          onClick={() => {
            handleMenuClose();
          }}
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <UserGroupsIcon />
          </IconButton>
          <p>People</p>
        </MenuItem>
      )}
      {Boolean(state.authtoken) && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
      )}
      <MenuItem>
        <Avatar
          sx={{ ml: 1, backgroundColor: "#1c100b" }}
          aria-haspopup="true"
          color="inherit"
          alt="user"
        />
        <p>Profile</p>
      </MenuItem>
      {Boolean(state.authtoken) && (
        <MenuItem
          sx={{ display: { xs: "flex" } }}
          onClick={() => {
            dispatch(logout());
            handleMenuClose();
          }}
        >
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#1c100b" }}>
        <Toolbar sx={{ paddingTop: "0.5em" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Envoy
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                alignItems: "center",
              },
            }}
          >
            <Stack spacing={1} direction="row">
              {Boolean(state.authtoken) && (
                <ButtonWrapper
                  size="small"
                  disableElevation
                  variant="contained"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                  Notifications
                </ButtonWrapper>
              )}
              {!Boolean(state.authtoken) && (
                <NavLink className={classes.link} to="/signup">
                  <ButtonWrapper
                    size="small"
                    disableElevation
                    variant="contained"
                  >
                    <SignUpIcon />
                    Sign up
                  </ButtonWrapper>
                </NavLink>
              )}
              {!Boolean(state.authtoken) && (
                <NavLink className={classes.link} to="/login">
                  <ButtonWrapper
                    size="small"
                    disableElevation
                    variant="contained"
                  >
                    <LoginIcon />
                    Login
                  </ButtonWrapper>
                </NavLink>
              )}
              {Boolean(state.authtoken) && (
                <NavLink className={classes.link} to="/people">
                  <ButtonWrapper
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => {}}
                  >
                    <UserGroupsIcon />
                    People
                  </ButtonWrapper>
                </NavLink>
              )}
              {Boolean(state.authtoken) && (
                <NavLink className={classes.link} to="/messages">
                  <ButtonWrapper
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => {}}
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                    Messages
                  </ButtonWrapper>
                </NavLink>
              )}
              {Boolean(state.authtoken) && (
                <ButtonWrapper
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <LogoutIcon />
                  Logout
                </ButtonWrapper>
              )}
            </Stack>
            <Avatar
              sx={{ ml: 1, color: "#1c100b" }}
              aria-controls={menuId}
              aria-haspopup="true"
              alt="user"
            />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
