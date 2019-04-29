import * as types from "./types";
import { CALL_API } from "../../api/api";
import { LOGIN } from "../../api/ApiConstants";

export const loginSuccess = (payload: { token: string }) => ({
  type: types.LOGIN_SUCCESS,
  payload
});

export const loginFailed = (payload: { error: string }) => ({
  type: types.LOGIN_FAILED,
  payload
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const login = (email: string, password: string) => (
  dispatch: (data: any) => void
) =>
  dispatch({
    [CALL_API]: {
      endpoint: LOGIN,
      types: [loginSuccess, loginFailed],
      params: {
        method: "POST",
        body: JSON.stringify({ email, password })
      }
    }
  });
