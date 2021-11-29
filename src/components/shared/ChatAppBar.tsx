import { FunctionComponent } from "react";
import { AppBar, Toolbar, Hidden, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ForumIcon from "@mui/icons-material/Forum";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setMobileView, resetSelectedUser } from "../../state/chatsReducer";
import { IFriend } from "../../interfaces/User";

const BoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: "2em",
  alignItems: "center",
  backgroundColor: "inherit",
}));

type User = IFriend;
interface IChatAppBarProps {
  user: User;
}
const ChatAppBar: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector((state) => state.chats.selectedUser);
  const resetActiveChat = () => {
    dispatch(setMobileView(false));
    dispatch(resetSelectedUser());
  };
  const SelectedUserComponent = ({ user }: IChatAppBarProps) => (
    <BoxWrapper>
      <Avatar
        src={user.imageUrl ?? ""}
        sx={{ height: "2em", width: "2em", backgroundColor: "#1874a5" }}
      />
      <Typography
        sx={{ color: "#1c100b", fontWeight: "bold", ml: 2 }}
        variant="h6"
      >
        {`${user.firstName ?? ""} ${user.lastName ?? ""}`}
      </Typography>
    </BoxWrapper>
  );

  return (
    <AppBar sx={{ backgroundColor: "white" }} elevation={1} position="static">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          //   padding: "1em",
        }}
      >
        <div style={{ display: "flex" }}>
          <Hidden smUp>
            <IconButton onClick={resetActiveChat}>
              <ArrowBackIcon sx={{ color: "#1874a5" }} />
            </IconButton>
          </Hidden>
          {selectedUser && <SelectedUserComponent user={selectedUser} />}
        </div>
        <ForumIcon sx={{ color: "#1874a5", width: "1.5em", height: "1.5em" }} />
      </Toolbar>
    </AppBar>
  );
};

export default ChatAppBar;
