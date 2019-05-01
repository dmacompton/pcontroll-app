import { iAction } from '../../types';
import {
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  UPDATE_FIELD,
  RESEND_CODE_FAILED,
  UPDATE_CODE_FIELD,
  RESEND_CODE_SUCCESS
} from './types';

export interface ErrorsSignUp {
  email?: string[];
  password?: string[];
  first_name?: string[];
  last_name?: string[];
  emailResendLink?: string[];
}

export interface authState {
  token: string | null;
  emailResendLink: string;
  signUpSuccessText: string;
  activatedCodeSuccessText: string;
  errorActivatedCode: string[];
  errors: string[];
  errorsSignUp: ErrorsSignUp;
}

const initialState: authState = {
  token: null,
  errors: [],
  errorsSignUp: {},
  errorActivatedCode: [],
  signUpSuccessText: '',
  emailResendLink: 'dmacompton@gmail.com',
  activatedCodeSuccessText: ''
};

const getErrors = (errorsArray: any) =>
  Object.keys(errorsArray).reduce((acc: string[], fieldName: string) => {
    const errors: string[] = errorsArray[fieldName];

    if (errors) {
      return [...acc, ...errors];
    }
    return acc;
  }, []);

const authReducer = (state: authState = { ...initialState }, action: iAction) => {
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
        signUpSuccessText: action.payload.message,
        errorsSignUp: {}
      };
    case UPDATE_FIELD:
      return {
        ...state,
        errorsSignUp: { ...state.errorsSignUp, [action.payload.keyValidation]: [] }
      };
    case UPDATE_CODE_FIELD:
      return {
        ...state,
        emailResendLink: action.payload.value,
        errorActivatedCode: []
      };
    case RESEND_CODE_FAILED:
      return {
        ...state,
        errorActivatedCode: Object.values(action.payload)
      };
    case RESEND_CODE_SUCCESS:
      return {
        ...state,
        errorActivatedCode: '',
        activatedCodeSuccessText: action.payload.message
      };
    case SIGNUP_FAILED:
      return { ...state, errorsSignUp: action.payload };
    default:
      return state;
  }
};

export default authReducer;
