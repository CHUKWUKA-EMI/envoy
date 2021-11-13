import React from "react";
import { Dialog, DialogContent, Box } from "@mui/material";
import { withStyles } from "@mui/styles";
import DialogTitleWithCloseIcon from "./DialogTitleWithCloseIcon";

const styles = (theme) => ({
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "2em",
    maxWidth: 420,
    paddingRight: "2em",
    paddingLeft: "2em",
    overflowX: "hidden",
    marginTop: "6em",
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      marginTop: "6em",
    },
  },
  actions: {
    marginTop: "2em",
  },
  dialogPaperScrollPaper: {
    maxHeight: "none",
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

/**
 * A Wrapper around the Dialog component to create centered
 * Login, Register or other Dialogs.
 */

const FormDialog = (props) => {
  const {
    classes,
    open,
    onClose,
    loading,
    headline,
    onFormSubmit,
    content,
    actions,
    hideBackdrop,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={(reason) => {
        reason === "backdropClick" && onClose();
      }}
      sx={{ marginTop: "6em" }}
      disableEscapeKeyDown={loading}
      classes={{
        paper: classes.dialogPaper,
        paperScrollPaper: classes.dialogPaperScrollPaper,
      }}
      hideBackdrop={hideBackdrop ? hideBackdrop : false}
    >
      <DialogTitleWithCloseIcon
        title={headline}
        onClose={onClose}
        disabled={loading}
      />
      <DialogContent className={classes.dialogContent}>
        <form onSubmit={onFormSubmit}>
          <div>{content}</div>
          <Box width="100%" className={classes.actions}>
            {actions}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(FormDialog);
