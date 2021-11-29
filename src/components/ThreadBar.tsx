import { FunctionComponent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Box, Divider, Typography } from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch } from "../state/hooks";
import { selectUser, setMobileView, resetChats } from "../state/chatsReducer";
import { IFriend, IUserProfile } from "../interfaces/User";
import { _getFriends } from "../services/network";

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
    backgroundColor: "lightgrey",
    color: "white",
  },
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "0.7em",
    top: "3em",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    height: "10px",
    width: "8px",
    borderRadius: "50%",
  },
}));

interface UserComponentProps {
  onClick: () => void;
  user: IFriend;
  loading: boolean;
}

const ThreadBar: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");
  let [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState<IUserProfile>();
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("envoy_user");
    if (userData) {
      const localUser = JSON.parse(userData) as IUserProfile;
      setUser(localUser);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await _getFriends();
      const friendsData = response?.data?.friends as IFriend[];
      setFriends(friendsData);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (searchParams.get("conversationId") && friends.length > 0) {
      const friend = friends.find(
        (fr) => fr.conversationId === searchParams.get("conversationId")
      );
      if (friend) {
        dispatch(selectUser(friend));
        if (isMobile) {
          dispatch(setMobileView(true));
        }
      }
    }
  }, [searchParams, friends, dispatch, isMobile]);

  const handleClick = (friend: IFriend) => {
    dispatch(selectUser(friend));
    let params = { conversationId: friend.conversationId };
    setSearchParams(params);
    if (isMobile) {
      dispatch(setMobileView(true));
    }
  };

  const AuthUserComponent = (user: IUserProfile) => (
    <BoxWrapper sx={{ "&:hover": { backgroundColor: "white" } }}>
      <Avatar
        src={user?.imageUrl ?? ""}
        sx={{ height: "2em", width: "2em", backgroundColor: "#1874a5" }}
      />

      <Typography
        sx={{ color: "#1c100b", fontWeight: "bold", ml: 2 }}
        variant="body2"
      >
        {`${user?.firstName} ${user?.lastName}`}
      </Typography>
    </BoxWrapper>
  );

  const UserComponent = ({ onClick, user, loading }: UserComponentProps) => (
    <BoxWrapper
      style={{
        backgroundColor:
          user.conversationId === searchParams.get("conversationId")
            ? "lightgrey"
            : "none",
      }}
      onClick={onClick}
    >
      {loading ? (
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      ) : (
        <StyledBadge
          style={{ backgroundColor: user.isOnline ? "green" : "lightgrey" }}
          variant="dot"
        >
          <Avatar
            src={user.imageUrl ?? ""}
            sx={{ height: "2em", width: "2em", backgroundColor: "#1874a5" }}
          />
        </StyledBadge>
      )}
      {loading ? (
        <Skeleton
          animation="wave"
          height={10}
          width="80%"
          style={{ marginBottom: 6 }}
        />
      ) : (
        <Typography
          sx={{ color: "#1c100b", fontWeight: "bold", ml: 2 }}
          variant="body2"
        >
          {`${user.firstName} ${user.lastName}`}{" "}
        </Typography>
      )}
    </BoxWrapper>
  );
  return (
    <Container>
      {/* <AuthUserComponent /> */}
      {AuthUserComponent(user!)}
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
        {friends.length > 0 &&
          friends.map((friend: IFriend) => (
            <UserComponent
              key={friend.conversationId}
              user={friend}
              onClick={() => {
                dispatch(resetChats());
                handleClick(friend);
              }}
              loading={loading}
            />
          ))}
      </Box>
    </Container>
  );
};

export default ThreadBar;
