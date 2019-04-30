import { iAction } from "../../types";
import {
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS
} from "./types";

export interface ErrorsSignUp {
  email?: string[];
  password?: string[];
  first_name?: string[];
  last_name?: string[];
  emailResendLink?: string[];
}

export interface authState {
  token: string | null;
  signUpSuccessText: string;
  errors: string[];
  errorsSignUp: ErrorsSignUp;
}

const initialState: authState = {
  token: null,
  errors: [],
  errorsSignUp: {},
  signUpSuccessText: ''
};

const getErrors = (errorsArray: any) =>
  Object.keys(errorsArray).reduce((acc: string[], fieldName: string) => {
    const errors: string[] = errorsArray[fieldName];

    if (errors) {
      return [...acc, ...errors];
    }
    return acc;
  }, []);

const authReducer = (
  state: authState = { ...initialState },
  action: iAction
) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        token: null
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        errors: []
      };
    case SIGNIN_FAILED:
      return {
        ...state,
        errors: getErrors(action.payload)
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccessText: action.payload,
        errorsSignUp: {}
      };
    case SIGNUP_FAILED:
    // return { ...state, errorsSignUp: action.payload };
    default:
      return state;
  }
};

export default authReducer;
