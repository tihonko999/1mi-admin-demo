import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import {
  PlatformType,
  RoleType,
  UserType,
  MatterTypeType,
  MatterStatusType,
} from "@/helpers/types";
import { mutations } from "./mutations";
import { defaultState } from "./defaultState";

export type AdminModuleType = "tv" | "special_projects" | "live_configs";

export interface ReferencesType {
  matter_types: { id: MatterTypeType; title: string; can_create: boolean }[];
  platforms: PlatformType[];
  roles: RoleType[];
  statuses: { id: MatterStatusType; title: string }[];
  permissions: { id: string; title: string; category_id: string }[];
  users: UserType[];
  templates: { id: string; title: string }[];
  notifications_count: number;
  available_admin_modules: AdminModuleType[];
  timezone: string;
}

export interface State extends ReferencesType {
  user: UserType;
  loggedIn: boolean;
  orderOptions: { id: string; title: string }[];
}

// https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function
export const key: InjectionKey<Store<State>> = Symbol("store");
export const store = createStore<State>({
  state: defaultState,
  mutations,
});
