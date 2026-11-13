import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireCoffeeToken() {
    const token = (await cookies()).get("coffee_token")?.value;
    if (!token) redirect("/login");
    return token;
}

export async function coffeeFetch(path: string, options: RequestInit = {}) {
    const token = await requireCoffeeToken();
    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(`${process.env.COFFEE_API_URL}${path}`, {
        ...options,
        headers,
        cache: "no-store",
    }).catch(() => null);

    if (response?.status === 401) redirect("/login");
    return response;
}