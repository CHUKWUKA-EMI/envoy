import React from "react";
import { Grid, Stack, IconButton, TextareaAutosize, Box } from "@mui/material";
import { Telegram } from "@mui/icons-material";
import { FunctionComponent } from "react";
import ChatAppBar from "./shared/ChatAppBar";
import { styled } from "@mui/styles";
import MessagesList from "./MessagesList";

const TextAreaWrapper = styled(TextareaAutosize)(({ theme }) => ({
  outline: "none",
  width: "95%",
  padding: "1.5em 1.5em",
  borderRadius: "30px",
  resize: "none",
  marginRight: "1em",
  lineHeight: "2em",
}));

const MessageBoxMobile: FunctionComponent = () => {
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
        <MessagesList />
        <form style={{ width: "100%", padding: "1em" }}>
          <Grid sx={{ width: "100%" }} justifyContent="center" container>
            <Grid item xs={9}>
              <TextAreaWrapper
                autoComplete="true"
                maxRows={1}
                minRows={1}
                placeholder="Type a message . . ."
              />
            </Grid>
            <Grid sx={{ paddingLeft: "0.5em" }} item xs={2}>
              <IconButton type="submit" size="medium">
                <Telegram
                  sx={{
                    height: "2.5em",
                    width: "2.5em",
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
