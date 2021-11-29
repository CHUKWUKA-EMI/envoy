import {
  Grid,
  Stack,
  TextareaAutosize,
  IconButton,
  Divider,
  Dialog,
} from "@mui/material";
import { Telegram } from "@mui/icons-material";
import { FunctionComponent, useState, useEffect, useRef } from "react";
import ChatAppBar from "./shared/ChatAppBar";
import { styled } from "@mui/styles";
import MessagesList from "./MessagesList";
import ThreadBar from "./ThreadBar";
import MessageBoxMobile from "./MessageBoxMobile";
import { useAppSelector } from "../state/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Picker, EmojiData } from "emoji-mart";
import Tooltip from "@mui/material/Tooltip";
import { useAppDispatch } from "../state/hooks";
import { setMobileView } from "../state/chatsReducer";
import { Socket } from "socket.io-client";
import { IChat, IChatRequest, IChatUser } from "../interfaces/Chat";
import { _createChat, _getChats } from "../services/network";
import { setChats, addChat } from "../state/chatsReducer";
import { v4 as uuid } from "uuid";

const TextAreaWrapper = styled(TextareaAutosize)(({ theme }) => ({
  outline: "none",
  border: "none",
  width: "95%",
  padding: "1em 1em",
  resize: "none",
  marginRight: "1em",
  lineHeight: "2em",
}));

interface IMessageContainerProps {
  socket: Socket;
}

type ChatUsers = IChatUser[];

const MessageContainer: FunctionComponent<IMessageContainerProps> = ({
  socket,
}: IMessageContainerProps) => {
  const socketRef = useRef<Socket>();
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chats);
  const user = useAppSelector((state) => state.authUser.user);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState<IChat>();

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    socketRef.current = socket;
    socketRef.current.on("getMessage", (data) => {
      setIncomingMessage(data);
    });
  }, [socket]);

  useEffect(() => {
    if (
      incomingMessage &&
      chatState.selectedUser?.id === incomingMessage.senderId
    ) {
      dispatch(addChat(incomingMessage));
    }
  }, [incomingMessage, dispatch, chatState.selectedUser]);

  useEffect(() => {
    (async () => {
      if (chatState.selectedUser) {
        const response = await _getChats(chatState.selectedUser.conversationId);
        const chats = response?.data.chats as IChat[];
        dispatch(setChats(chats));
      }
    })();
  }, [chatState.selectedUser, dispatch]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setMobileView(true));
    } else {
      dispatch(setMobileView(false));
    }
  }, [isMobile, dispatch]);

  useEffect(() => {
    socketRef.current?.on("getUsers", (data: ChatUsers) => {
      console.log("chat users", data);
    });
  }, []);

  const onEmojiClick = (emoji: EmojiData) => {
    console.log("emoji", emoji);
    if ("native" in emoji) {
      setMessage((message) =>
        message ? message + emoji.native : emoji.native
      );
    }
    closeEmoji();
  };

  const closeEmoji = () => {
    setEmojiPicker(false);
  };

  const sendMessage = async () => {
    const data: IChatRequest = {
      chatId: uuid(),
      conversationId: chatState.selectedUser?.conversationId!,
      receiverId: chatState.selectedUser?.id!,
      message: message,
      imageUrl: "",
      imagekit_id: "",
      viewed: false,
    };
    socketRef.current?.emit("sendMessage", {
      ...data,
      senderId: user.id!,
      createdAt: new Date().toISOString(),
    });
    dispatch(
      addChat({
        ...data,
        senderId: user.id!,
        chatId: uuid(),
        createdAt: new Date().toISOString(),
      })
    );
    await _createChat(data);

    // socketRef.current?.emit("sendMessage", response?.data.item);
    // console.log("chat", response);
    // dispatch(addChat(response?.data.item));
    // socket.on("getMessage", (data) => {
    //   dispatch(addChat(data));
    // });
    setMessage("");
  };

  return (
    <Grid
      style={{ marginTop: "7em" }}
      justifyContent="center"
      sx={{
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        height: "90%",
        backgroundColor: "white",
      }}
      container
    >
      {!chatState.openMobileView && (
        <Grid item xs={12} sm={3} md={3}>
          <ThreadBar />
        </Grid>
      )}

      <Grid
        sx={{
          border: "2px solid #1c100b",
          borderRight: "none",
          height: "100%",
          borderTop: "none",
          borderBottom: "none",
          display: { xs: "none", sm: "flex" },
        }}
        item
        sm={9}
        md={9}
      >
        <Stack
          style={{ width: "100%", height: "100%" }}
          sx={{ height: "100%" }}
          direction="column"
        >
          <ChatAppBar />

          <MessagesList selectedUser={chatState.selectedUser!} />

          <Divider />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            style={{ width: "100%", padding: "1em" }}
          >
            <Grid sx={{ width: "100%" }} justifyContent="center" container>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid #1c100b",
                  borderRadius: "2rem",
                }}
                item
                xs={9}
              >
                <Dialog
                  sx={{ position: "absolute" }}
                  onClose={closeEmoji}
                  open={emojiPicker}
                >
                  <Picker
                    title="Pick your emoji…"
                    emoji="point_up"
                    theme="dark"
                    sheetSize={16}
                    native={true}
                    set="twitter"
                    emojiTooltip={true}
                    onSelect={onEmojiClick}
                  />
                </Dialog>
                <Tooltip title="Insert emoticon" arrow>
                  <IconButton onClick={() => setEmojiPicker(!emojiPicker)}>
                    <InsertEmoticonIcon
                      sx={{ color: "#1874a5", height: "1.5em", width: "1.5em" }}
                    />
                  </IconButton>
                </Tooltip>
                <TextAreaWrapper
                  value={message}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  maxRows={1}
                  minRows={1}
                  placeholder="Type a message . . ."
                />
                <Tooltip title="Attach file" arrow>
                  <label htmlFor="icon-button-file">
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      name="imageUrl"
                      multiple
                      id="icon-button-file"
                      type="file"
                    />
                    <IconButton aria-label="upload picture" component="span">
                      <AttachFileIcon
                        sx={{
                          color: "#1874a5",
                          height: "1.5em",
                          width: "1.5em",
                        }}
                      />
                    </IconButton>
                  </label>
                </Tooltip>
              </Grid>
              <Grid sx={{ paddingLeft: "0.5em" }} item xs={2}>
                <Tooltip title="Send Message" arrow>
                  <IconButton
                    sx={{ backgroundColor: "#1c100b" }}
                    type="submit"
                    size="medium"
                  >
                    <Telegram
                      sx={{
                        height: "2.5em",
                        width: "2.5em",
                        color: "#1874a5",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Grid>
      {chatState.openMobileView && <MessageBoxMobile />}
    </Grid>
  );
};

export default MessageContainer;
