/**
 * All API calls go through this module. Axios instance with base config;
 * endpoints stay in one place for easier mocking and future env-based base URLs.
 */
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
if (!BASE_URL) {
  throw new Error("URL is not defined");
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
};

export async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}
