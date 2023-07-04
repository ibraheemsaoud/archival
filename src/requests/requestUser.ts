import { toast } from "react-hot-toast";
import api from "./apis";
import { UserPreferences } from "typescript";

export const requestUser = async () => {
  try {
    const data = await api.getAccount();
    return {
      data,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: "failed to get user",
    };
  }
};

export const requestLogin = async (email: string, password: string) => {
  try {
    await api.createEmailSession(email, password);
    return {
      data: true,
      error: undefined,
    };
  } catch (e) {
    toast.error(
      "failed to login, please check your credentials or try again later",
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
    return {
      data: undefined,
      error:
        "failed to login, please check your credentials or try again later",
    };
  }
};

export const requestLoginWithGoogle = async () => {
  try {
    await api.createGoogleSession();
    return {
      data: true,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: "failed to login, server might be down",
    };
  }
};

export const requestLogout = async () => {
  try {
    await api.deleteCurrentSession();
    return {
      data: true,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: "failed to logout, server might be down",
    };
  }
};

export const updateUserPrefs = async (prefs: UserPreferences) => {
  try {
    const data = await api.updateAccountPrefs(prefs);
    return {
      data,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: "failed to update user",
    };
  }
};

export const verifyEmail = async () => {
  try {
    await api.verifyEmail();
    return {
      data: true,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: "failed to verify email, server might be down",
    };
  }
};
