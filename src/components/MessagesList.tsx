import { useRef, useEffect } from "react";
import { Chip, Avatar, Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/styles";
import { useAppSelector } from "../state/hooks";
import { IFriend } from "../interfaces/User";
import { formatDate } from "../libs/dateFormatter";

const MessagesGrid = styled("div")(({ theme }) => ({
  width: "100%",
  height: "72%",
  overflowY: "auto",
  paddingTop: "1em",
  paddingBottom: "1em",
  paddingLeft: "1em",
  boxSizing: "border-box",
  paddingRight: "1em",
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none",
  } /* Chrome */,
}));

const MessageRight = styled(Box)(({ theme }) => ({
  height: "fit-content",
  padding: "0.5em",
  paddingTop: 0,
  borderBottomRightRadius: "0.5em",
  borderBottomLeftRadius: "1em",
  borderTopRightRadius: "0.5em",
  backgroundColor: "#1874a5",
  color: "white",
  fontWeight: 700,
}));

const MessageLeft = styled(Box)(({ theme }) => ({
  height: "fit-content",
  padding: "0.5em",
  paddingTop: 0,
  borderBottomRightRadius: "0.5em",
  borderBottomLeftRadius: "1em",
  borderTopRightRadius: "0.5em",
  backgroundColor: "lightgrey",
  color: "black",
  fontWeight: 700,
}));

interface MessageListProps {
  selectedUser: IFriend;
}

const MessagesList = ({ selectedUser }: MessageListProps) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const chatState = useAppSelector((state) => state.chats);
  const user = useAppSelector((state) => state.authUser.user);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatState.chats]);

  return (
    <MessagesGrid>
      {chatState.chats.length > 0 &&
        chatState.chats.map((chat) => (
          <div
            key={chat.chatId}
            style={{
              height: "fit-content",
              display: "flex",
              padding: "0.5rem",
              justifyContent:
                chat.senderId === user.id ? "flex-end" : "flex-start",
            }}

            // xs={12}
          >
            {chat.senderId === user.id ? (
              <Stack direction="column">
                <div ref={scrollRef} style={{ display: "flex" }}>
                  <Avatar sx={{ mr: 1 }} src={user.imageUrl ?? ""} />
                  <MessageRight>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "black",
                        color: "white",
                        padding: "2px",
                        borderRadius: "5px",
                      }}
                      component="span"
                      variant="subtitle1"
                    >{`${user.firstName} ${user.lastName}`}</Typography>
                    <Typography variant="body1">{chat.message}</Typography>
                  </MessageRight>
                </div>
                <Chip
                  sx={{
                    width: "fit-content",
                    height: "fit-content",
                    alignSelf: "flex-end",
                    marginTop: "5px",
                  }}
                  label={formatDate(chat.createdAt)}
                />
              </Stack>
            ) : (
              <Stack direction="column">
                <div style={{ display: "flex" }}>
                  <Avatar sx={{ mr: 1 }} src={selectedUser.imageUrl ?? ""} />
                  <MessageLeft>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "black",
                        color: "white",
                        padding: "2px",
                        borderRadius: "5px",
                      }}
                      component="span"
                      variant="subtitle1"
                    >{`${selectedUser.firstName} ${selectedUser.lastName}`}</Typography>
                    <Typography variant="body1">{chat.message}</Typography>
                  </MessageLeft>
                </div>
                <Chip
                  sx={{
                    width: "fit-content",
                    height: "fit-content",
                    alignSelf: "flex-end",
                    marginTop: "5px",
                  }}
                  label={formatDate(chat.createdAt)}
                />
              </Stack>
            )}
          </div>
        ))}
    </MessagesGrid>
  );
};

export default MessagesList;
