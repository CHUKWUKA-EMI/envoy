import { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { IUser } from "../../interfaces/User";

const BoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "2em",
  alignItems: "center",
  padding: "1em",
  backgroundColor: theme.palette.background.paper,
}));
interface IProps {
  user: IUser;
}
const User: FunctionComponent<IProps> = ({ user }: IProps) => {
  return (
    <BoxWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{ height: "5em", width: "5em", backgroundColor: "#1c100b" }}
          alt={`${user.firstName} ${user.lastName}`}
          src={user.imageUrl ?? ""}
        />
        <Box
          sx={{
            marginLeft: "1em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ color: "#1c100b", fontWeight: "bold" }}
            variant="h6"
          >{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography sx={{ fontWeight: 600 }} variant="body2">
            {user.email}
          </Typography>
        </Box>
      </Box>
    </BoxWrapper>
  );
};

export default User;
