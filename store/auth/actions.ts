import * as types from './types';
import { CALL_API } from '../../api/api';
import { LOGIN, SIGNUP, RESEND_CODE, API_TYPE } from '../../api/ApiConstants';

const { POST } = API_TYPE;

export const signInSuccess = (payload: { token: string }) => ({
  type: types.SIGNIN_SUCCESS,
  payload
});

export const signInFailed = (payload: { error: string }) => ({
  type: types.SIGNIN_FAILED,
  payload
});

export const signUpSuccess = (payload: string) => ({
  type: types.SIGNUP_SUCCESS,
  payload
});

export const signUpFailed = (payload: { error: string }) => ({
  type: types.SIGNUP_FAILED,
  payload
});

export const resendActivationLinkSuccess = (payload: { message: string }) => ({
  type: types.RESEND_CODE_SUCCESS,
  payload
});

export const resendActivationLinkFailed = (payload: { detail?: string[]; email?: string[] }) => ({
  type: types.RESEND_CODE_FAILED,
  payload
});

export const logout = () => ({
  type: types.LOGOUT
});

export const updateField = (payload: { key: string; keyValidation: string; value: string }) => ({
  type: types.UPDATE_FIELD,
  payload
});

export const updateActivationCodeField = (payload: { value: string }) => ({
  type: types.UPDATE_CODE_FIELD,
  payload
});

////////////////////////////////////////////////////////////////////////

export const signIn = (data: { email: string; password: string }) => (
  dispatch: (data: any) => void
) =>
  dispatch({
    [CALL_API]: {
      endpoint: LOGIN,
      types: [signInSuccess, signInFailed],
      params: {
        method: POST,
        body: JSON.stringify(data)
      }
    }
  });

export const signUp = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => (dispatch: (data: any) => void) =>
  dispatch({
    [CALL_API]: {
      endpoint: SIGNUP,
      types: [signUpSuccess, signUpFailed],
      params: {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName
        })
      }
    }
  });

export const resendActivationLink = (email: string) => (dispatch: (data: any) => void) =>
  dispatch({
    [CALL_API]: {
      endpoint: RESEND_CODE,
      types: [resendActivationLinkSuccess, resendActivationLinkFailed],
      params: {
        method: POST,
        body: JSON.stringify({ email })
      }
    }
  });
