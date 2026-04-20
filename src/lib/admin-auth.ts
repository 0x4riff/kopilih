import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_SESSION_COOKIE = "kopilih_admin_session";
const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY;

export async function isAdminAuthenticated() {
  const store = await cookies();
  return store.get(ADMIN_SESSION_COOKIE)?.value === "active";
}

export async function requireAdminAuth() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
}

export function hasAdminAccessKey() {
  return Boolean(ADMIN_ACCESS_KEY && ADMIN_ACCESS_KEY.trim().length > 0);
}

export function validateAdminAccessKey(input: string) {
  if (!ADMIN_ACCESS_KEY) return false;
  return input === ADMIN_ACCESS_KEY;
}
