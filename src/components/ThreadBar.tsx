import { FunctionComponent } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Box, Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch } from "../state/hooks";
import { selectUser, setMobileView } from "../state/chatsReducer";
import { IUser } from "../interfaces/User";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  flexGrow: 1,
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

const BoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "1em",
  backgroundColor: theme.palette.background.paper,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "grey",
    color: "white",
  },
}));

const dummyUser: IUser = {
  id: "1",
  firstName: "Chukwuka",
  lastName: "Emi",
  email: "emichukwuka@gmail.com",
  imageUrl: "",
  imagekit_id: "",
  role: "admin",
  createdAt: "2021-11-12",
};

interface UserComponentProps {
  onClick: () => void;
}

const ThreadBar: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClick = () => {
    dispatch(selectUser(dummyUser));
    if (isMobile) {
      dispatch(setMobileView(true));
    }
  };

  const AuthUserComponent = () => (
    <BoxWrapper>
      <Avatar
        sx={{ height: "2em", width: "2em", backgroundColor: "#1874a5" }}
      />
      <Typography
        sx={{ color: "#1c100b", fontWeight: "bold", ml: 2 }}
        variant="body2"
      >
        Chukwuka Emi
      </Typography>
    </BoxWrapper>
  );

  const UserComponent = ({ onClick }: UserComponentProps) => (
    <BoxWrapper onClick={onClick}>
      <Avatar
        sx={{ height: "2em", width: "2em", backgroundColor: "#1874a5" }}
      />
      <Typography
        sx={{ color: "#1c100b", fontWeight: "bold", ml: 2 }}
        variant="body2"
      >
        John Doe
      </Typography>
    </BoxWrapper>
  );
  return (
    <Container>
      <AuthUserComponent />
      <Divider />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Divider />
      <Box sx={{ height: "60vh", overflowY: "scroll" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <UserComponent onClick={handleClick} key={i} />
        ))}
      </Box>
    </Container>
  );
};

export default ThreadBar;
