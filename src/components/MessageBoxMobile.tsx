import React from "react";
import {
  Grid,
  Stack,
  IconButton,
  TextareaAutosize,
  Box,
  Divider,
} from "@mui/material";
import { Telegram } from "@mui/icons-material";
import { FunctionComponent } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ChatAppBar from "./shared/ChatAppBar";
import { styled } from "@mui/styles";
import { useAppSelector } from "../state/hooks";
import MessagesList from "./MessagesList";

const TextAreaWrapper = styled(TextareaAutosize)(({ theme }) => ({
  outline: "none",
  border: "none",
  width: "95%",
  padding: "1.5em 1.5em",
  borderRadius: "30px",
  resize: "none",
  marginRight: "1em",
  lineHeight: "2em",
}));

const MessageBoxMobile: FunctionComponent = () => {
  const chatState = useAppSelector((state) => state.chats);

  return (
    <Box
      sx={{
        border: "2px solid #1c100b",
        borderRight: "none",
        borderTop: "none",
        borderBottom: "none",
        width: "100%",
      }}
    >
      <Stack
        style={{ width: "100%" }}
        sx={{ height: "100%" }}
        direction="column"
      >
        <ChatAppBar />
        <MessagesList selectedUser={chatState.selectedUser!} />
        <Divider />
        <form style={{ width: "100%", padding: "1em" }}>
          <Grid
            sx={{ width: "100%", paddingRight: { xs: "1em" } }}
            justifyContent="center"
            alignItems="center"
            container
          >
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
              <IconButton>
                <InsertEmoticonIcon
                  sx={{
                    color: "#1874a5",
                    height: { xs: "1em", sm: "1.5em" },
                    width: { xs: "1em", sm: "1.5em" },
                  }}
                />
              </IconButton>
              <TextAreaWrapper
                autoComplete="true"
                maxRows={1}
                minRows={1}
                placeholder="Type a message . . ."
              />
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
                      height: { xs: "1em", sm: "1.5em" },
                      width: { xs: "1em", sm: "1.5em" },
                    }}
                  />
                </IconButton>
              </label>
            </Grid>
            <Grid sx={{ paddingLeft: "0.5em" }} item xs={2}>
              <IconButton
                sx={{ backgroundColor: "#1c100b" }}
                type="submit"
                size="medium"
              >
                <Telegram
                  sx={{
                    height: { xs: "1.5em", sm: "2.5em" },
                    width: { xs: "1.5em", sm: "2.5em" },
                    color: "#1874a5",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Box>
  );
};

export default MessageBoxMobile;
