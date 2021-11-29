import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import User from "./shared/User";
import { IUser, IUserProfile } from "../interfaces/User";
import Button from "@mui/material/Button";
import { useAppSelector } from "../state/hooks";
import { _createConversation, _getConversations } from "../services/network";
import CustomSnackbar from "./shared/Snackbar";
import { IConversation } from "../interfaces/Conversation";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  elevation: 2,
  marginLeft: "auto",
  marginRight: "auto",
  color: theme.palette.text.secondary,
}));

const ButtonWrapper = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: "#1c100b",
  color: "white",
  width: "100%",
  "&:hover": {
    backgroundColor: "#1c100b",
    color: "white",
  },
}));

const Users: FunctionComponent = () => {
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.users);
  const [user, setUser] = useState<IUserProfile>();
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    success: false,
  });

  useEffect(() => {
    const userData = localStorage.getItem("envoy_user");
    if (userData) {
      const localUser = JSON.parse(userData) as IUserProfile;
      setUser(localUser);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const response = await _getConversations();
      const conversationsData = response?.data?.items as IConversation[];
      if (user) {
        const userConversations = conversationsData.filter((con) =>
          con.members.includes(user.id)
        );
        setConversations(userConversations);
      }
    })();
  }, [user]);

  useEffect(() => {
    console.log("conersations", conversations);
  }, [conversations]);

  const createConversation = async (friendId: string) => {
    setConnecting(true);
    try {
      const response = await _createConversation(friendId);
      if (response?.status === 201) {
        setConnecting(false);
        setOpen(true);
        setSnackbar({ message: "Connected successfully", success: true });
        const conversation = response.data.item as IConversation;
        setConversations([...conversations, conversation]);
      } else {
        setConnecting(false);
        setOpen(true);
        setSnackbar({ message: "Error connecting", success: false });
      }
    } catch (err) {
      console.log(err);
      setConnecting(false);
      setSnackbar({
        message: "An error occurred. Please retry",
        success: false,
      });
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={3}
      style={{ backgroundColor: "inherit", marginTop: "5rem", width: "100%" }}
      sx={{
        mt: 4,
        height: "80vh",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {users &&
        users.length > 0 &&
        users.map((user: IUser, i) => (
          <Grid
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            key={i}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            draggable
          >
            <Item>
              <User user={user} />
              <ButtonWrapper
                onClick={() => {
                  if (
                    conversations.length > 0 &&
                    conversations.find((con) => con.members.includes(user.id))
                  ) {
                    navigate(
                      `/messages/?conversationId=${
                        conversations.find((con) =>
                          con.members.includes(user.id)
                        )?.id
                      }`,
                      {
                        replace: true,
                      }
                    );
                  } else {
                    createConversation(user.id);
                  }
                }}
              >
                {conversations.length > 0 &&
                conversations.find((con) => con.members.includes(user.id))
                  ? "Message"
                  : connecting
                  ? "Connecting..."
                  : "Connect"}
              </ButtonWrapper>
            </Item>
          </Grid>
        ))}
      <CustomSnackbar
        open={open}
        success={snackbar.success}
        message={snackbar.message}
        setOpen={setOpen}
      />
    </Grid>
  );
};

export default Users;
