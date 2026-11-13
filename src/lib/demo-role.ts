import "server-only";

import { redirect } from "next/navigation";
import { coffeeFetch } from "./coffee-api";

export async function getUserRole() {
    const response = await coffeeFetch("/auth/me");
    if (!response?.ok) return null;

    const user = await response.json().catch(() => null);
    if (typeof user?.email !== "string" || !user.email) return null;

    //Esto es lo del demo
    const managerEmail = process.env.COFFEE_DEMO_MANAGER_EMAIL?.trim().toLowerCase();
    return user.email.toLowerCase() === managerEmail ? "manager" : "viewer";

    //return user.role === "manager" ? "manager" : "viewer";
}

export async function requireDemoManager() {
    const role = await getUserRole();
    if (role !== "manager") redirect("/orders?notice=forbidden");
}