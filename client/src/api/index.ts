import fetch from "isomorphic-fetch";
import { API_BASE, SERVER_URL } from "../constants";

async function postRequest(path: string, data: Object) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function getAuthUser() {
  const res = await fetch(API_BASE + "/user/get-auth-user", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await res.json();
}

export async function getUserBySlug(slug: string) {
  return await postRequest("/user/get-user-by-slug", { slug });
}

export async function updateProfile(profile: Object) {
  return await postRequest("/user/update-profile", profile);
}
