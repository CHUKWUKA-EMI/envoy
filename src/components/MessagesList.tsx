import { Grid, Box } from "@mui/material";
import { FunctionComponent } from "react";
import { styled } from "@mui/styles";

const MessagesGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  height: "72%",
  overflowY: "auto",
  paddingTop: "1em",
  paddingBottom: "1em",
  paddingLeft: "1em",
  paddingRight: "1em",
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none",
  } /* Chrome */,
}));

const MessageRight = styled(Box)(({ theme }) => ({
  height: "fit-content",
  width: "40%",
  padding: "0.5em",
  borderBottomRightRadius: "1em",
  borderBottomLeftRadius: "0.5em",
  borderTopLeftRadius: "0.5em",
  backgroundColor: "#1874a5",
  color: "white",
  fontWeight: 700,
}));

const MessageLeft = styled(Box)(({ theme }) => ({
  height: "fit-content",
  width: "40%",
  padding: "0.5em",
  borderBottomRightRadius: "0.5em",
  borderBottomLeftRadius: "1em",
  borderTopRightRadius: "0.5em",
  backgroundColor: "lightgrey",
  color: "black",
  fontWeight: 700,
}));

const MessagesList: FunctionComponent = () => {
  return (
    <MessagesGrid container spacing={2}>
      <Grid item xs={12}>
        <MessageLeft>User messaage</MessageLeft>
        <MessageRight>My message</MessageRight>
      </Grid>
    </MessagesGrid>
  );
};

export default MessagesList;
