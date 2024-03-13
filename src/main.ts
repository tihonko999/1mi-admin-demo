import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
// eslint-disable-next-line import/no-unresolved
import routes from "virtual:generated-pages";
import App from "./App";
import { store, key, ReferencesType } from "./store";
import { MutationDataTypes } from "./store/mutations";
import api from "./helpers/api";
import { UserType } from "./helpers/types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const app = createApp(App);
app.use(store, key);

// Авторизация
router.beforeEach((to) => {
  const loggedIn = store.state.loggedIn;
  if (loggedIn && to.name === "login") return "/matters";
  if (to.path === "/") return "/matters";
  if (to.name !== "login" && !loggedIn) return "/login";
});

async function mount() {
  // Авторизация
  const token = localStorage.getItem("token");
  if (token)
    try {
      const { data: user } = await api.get<UserType>("user", {
        headers: { authorization: token },
      });
      store.commit<MutationDataTypes["LOG_IN"]>({
        type: "LOG_IN",
        payload: user,
      });
      const { data } = await api.get<ReferencesType>("user/references");
      store.commit<MutationDataTypes["SET_REFERENCES"]>({
        type: "SET_REFERENCES",
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  app.use(router);
  app.mount("#app");
}

void mount();
