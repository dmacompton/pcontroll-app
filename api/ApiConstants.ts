export const BASE_URL = 'http://142.93.170.139:8000/';
export const LOGIN = 'api/api-token-auth';
export const SIGNUP = 'api/signup/';
export const RESEND_CODE = 'api/resend-activation-email';

export const REFRESH_TOKEN = 'api/api-token-refresh';
export const ACTIVATION_VIEW = '/api/activate/{uidb64}/{token}'; // Activation view
export const CHILD_CREATE = '/api/child/create'; // Add or update last child location
export const CHILD_CREATE_LOCATION = '/api/child/location/create';
export const CHILD_LOCATION_HISTORICAL = '/api/child/{child_id}/location/historical';
export const CHILD_LOCATION_LATETS = '/api/child/{child_id}/location/latest';
export const CHILD_INFORMATION = '/api/child/{id}/information';
export const PARENT_LINK_CHILD_BY_QR = '/api/parent/link_child/{hashed_parent_id}'; // Get hashed link for generating QR code
export const PARENT_GENERATE_QR = '/api/parent/{id}/generate/qr';
export const PARENT_INFO = '/api/parent/{id}/information';

export const API_TYPE = {
  POST: 'POST',
  GET: 'GET'
};
