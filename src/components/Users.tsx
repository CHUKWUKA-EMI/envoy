import { FunctionComponent } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import User from "./shared/User";
import { IUser } from "../interfaces/User";
import Button from "@mui/material/Button";

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
  const dummyUser: IUser = {
    id: "1",
    firstName: "Chukwuka",
    lastName: "Emi",
    email: "emichukwuka@gmail.com",
    imageUrl: "",
    imagekit_id: "",
    role: "admin",
    createdAt: "2021-11-12",
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
      {[1, 2, 3, 4].map((i) => (
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
            <User user={dummyUser} />
            <ButtonWrapper>Connect</ButtonWrapper>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default Users;
