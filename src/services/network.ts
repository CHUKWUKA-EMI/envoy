import dotenv from "dotenv";
import axios from "axios";
import { IUserRequest } from "../interfaces/User";

dotenv.config();

export const _signUp = async (user: IUserRequest) => {
  const url = `${process.env.REACT_APP_API_URL}user/signup`;
  try {
    const response = await axios.post(url, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const _signIn = async (email: string, password: string) => {
  const url = `${process.env.REACT_APP_API_URL}user/login`;
  try {
    const response = await axios.post(
      url,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
