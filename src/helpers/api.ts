import axios from "axios";
import { store } from "../store";

let domain = location.host;
if (import.meta.env.VITE_DOMAIN) {
  domain = `${import.meta.env.VITE_DOMAIN}`;
}

const api = axios.create({
  baseURL: `https://${domain}/api/admin/`,
});

api.interceptors.request.use((config) => {
  if (store.state.loggedIn) {
    config.headers.authorization = store.state.user.authorization;
  }
  return config;
});

export default api;
