import { State, ReferencesType } from "./index";
import { UserType } from "@/helpers/types";

type MutationDataType<T, U = undefined> = U extends undefined
  ? { type: T }
  : { type: T; payload: U };

export type MutationDataTypes = {
  LOG_IN: MutationDataType<"LOG_IN", UserType>;
  LOG_OUT: MutationDataType<"LOG_OUT">;
  LOCK_SCROLL: MutationDataType<"LOCK_SCROLL">;
  UNLOCK_SCROLL: MutationDataType<"UNLOCK_SCROLL">;
  SET_REFERENCES: MutationDataType<"SET_REFERENCES", ReferencesType>;
};

type MutationTypes = {
  [key in keyof MutationDataTypes]: (
    state: State,
    data: MutationDataTypes[key]
  ) => void;
};

export const mutations: MutationTypes = {
  LOG_IN(state, { payload }) {
    state.loggedIn = true;
    state.user = payload;
    localStorage.setItem("token", payload.authorization);
  },
  LOG_OUT() {
    localStorage.removeItem("token");
    location.reload();
  },
  LOCK_SCROLL() {
    document.documentElement.classList.add("locked");
  },
  UNLOCK_SCROLL() {
    document.documentElement.classList.remove("locked");
  },
  SET_REFERENCES(state, { payload }) {
    state.matter_types = payload.matter_types;
    state.platforms = payload.platforms;
    state.roles = payload.roles;
    state.statuses = payload.statuses;
    state.permissions = payload.permissions;
    state.users = payload.users;
    state.templates = payload.templates;
    state.notifications_count = payload.notifications_count;
    state.available_admin_modules = payload.available_admin_modules;
    state.timezone = payload.timezone;
  },
};
