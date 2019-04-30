import { authState } from '../store/auth/reducer';

export interface iAction {
  type: string;
  payload?: any;
}

export interface StoreProps {
  auth: authState;
}
