import dotenv from "dotenv";
import axios from "axios";
import { IUserProfile, IUserRequest } from "../interfaces/User";
import { IChatRequest } from "../interfaces/Chat";

dotenv.config();

const getToken = () => {
  const userData = localStorage.getItem("envoy_user");

  if (userData) {
    const localUser = JSON.parse(userData) as IUserProfile;
    return localUser.authtoken;
  }

  return null;
};

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

export const _getUsers = async () => {
  const url = `${process.env.REACT_APP_API_URL}user/all`;
  const token = getToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const _getFriends = async () => {
  const url = `${process.env.REACT_APP_API_URL}user/friends`;
  const token = getToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const _createConversation = async (friendId: string) => {
  const url = `${process.env.REACT_APP_API_URL}conversation/`;
  const token = getToken();
  const data = { friendId: friendId };
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const _getConversations = async () => {
  const url = `${process.env.REACT_APP_API_URL}conversation/`;
  const token = getToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const _createChat = async (chat: IChatRequest) => {
  const url = `${process.env.REACT_APP_API_URL}chat/`;
  const token = getToken();
  const data = { ...chat };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const _getChats = async (conversationId: string) => {
  const url = `${process.env.REACT_APP_API_URL}chat/${conversationId}`;
  const token = getToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
