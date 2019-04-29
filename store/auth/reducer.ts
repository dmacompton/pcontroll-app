import { iAction } from "../../types";
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from "./types";

export interface authState {
  token: string | null;
  errors: string[];
}

const initialState: authState = {
  token: null,
  errors: []
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
      return { ...state, token: null };
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload.token, errors: [] };
    case LOGIN_FAILED:
      return {
        ...state,
        errors: getErrors(action.payload)
      };
    default:
      return state;
  }
};

export default authReducer;
