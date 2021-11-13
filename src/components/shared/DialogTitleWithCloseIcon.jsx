import React from "react";
import { IconButton, DialogTitle, Typography, Box } from "@mui/material";
import { withTheme } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

function DialogTitleWithCloseIcon(props) {
  const { paddingBottom, onClose, disabled, title } = props;
  return (
    <DialogTitle
      style={{
        paddingBottom: paddingBottom ? paddingBottom : "1em",
        // paddingLeft: "1.5em",
        // paddingRight: "1.5em",
        paddingTop: "1em",
        width: "100%",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">{title}</Typography>
        <IconButton
          onClick={onClose}
          style={{ marginRight: -12, marginTop: -10 }}
          disabled={disabled}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>
  );
}

export default withTheme(DialogTitleWithCloseIcon);
