import { store, AdminModuleType } from "../store";

export function can(permission: string): boolean {
  return store.state.user.role.permissions.includes(permission);
}

export function cant(permission: string): boolean {
  return !can(permission);
}

export function moduleEnabled(module: AdminModuleType): boolean {
  return store.state.available_admin_modules.includes(module);
}

export function moduleDisabled(module: AdminModuleType): boolean {
  return !moduleEnabled(module);
}
