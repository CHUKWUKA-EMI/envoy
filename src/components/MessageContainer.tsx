import { Grid, Stack, TextareaAutosize, IconButton } from "@mui/material";
import { Telegram } from "@mui/icons-material";
import { FunctionComponent, useEffect } from "react";
import ChatAppBar from "./shared/ChatAppBar";
import { styled } from "@mui/styles";
import MessagesList from "./MessagesList";
import ThreadBar from "./ThreadBar";
import MessageBoxMobile from "./MessageBoxMobile";
import { useAppSelector } from "../state/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch } from "../state/hooks";
import { setMobileView } from "../state/chatsReducer";

const TextAreaWrapper = styled(TextareaAutosize)(({ theme }) => ({
  outline: "none",
  width: "95%",
  padding: "1.5em 1.5em",
  borderRadius: "30px",
  resize: "none",
  marginRight: "1em",
  lineHeight: "2em",
}));

const MessageContainer: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chats);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isMobile) {
      dispatch(setMobileView(true));
    } else {
      dispatch(setMobileView(false));
    }
  }, [isMobile, dispatch]);

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
          borderTop: "none",
          borderBottom: "none",
          display: { xs: "none", sm: "flex" },
        }}
        item
        sm={9}
        md={9}
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
      </Grid>
      {chatState.openMobileView && <MessageBoxMobile />}
    </Grid>
  );
};

export default MessageContainer;
