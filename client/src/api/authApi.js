import { api } from "@/api/axios";

export const authApi = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  logout: () => api.post("/auth/logout"),
  register: (email, password) =>
    api.post("/auth/register", { email, password }),
  status: () => api.get("/auth/status"),
  rotateTokens: () => api.post("/auth/rotate-tokens"),
};
