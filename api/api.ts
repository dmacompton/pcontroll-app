// General api to access data
import { BASE_URL } from "./ApiConstants";
import { Store } from "redux";

interface iParams {
  method: "POST" | "GET";
  headers: any;
}

interface iCallApi {
  params: iParams;
  endpoint: "string";
  types: [(data: any) => void, (error: Error) => void];
}

export const CALL_API = Symbol("Call API");

export default (store: Store) => (next: (action: any) => any) => (
  action: any
) => {
  const callAPI: iCallApi = action[CALL_API];

  if (typeof callAPI === "undefined") {
    return next(action);
  }

  const { endpoint, types, params } = callAPI;
  const [successAction, errorAction] = types;
  const { token } = store.getState().auth;

  const config = {
    ...params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { token }),
      ...params.headers
    }
  };

  return fetch(`${BASE_URL}${endpoint}`, config)
    .then((resp: Response) => {
      const json = resp.json();

      if (resp.status >= 200 && resp.status < 300) {
        return json;
      }

      return json.then(err => {
        throw err;
      });
    })
    .then(data => next(successAction(data)))
    .catch((error: Error) => next(errorAction(error)));
};
