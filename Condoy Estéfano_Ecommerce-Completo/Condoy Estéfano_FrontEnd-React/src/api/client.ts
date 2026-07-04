import axios from "axios";
import type {
  ApiError,
  LoginPayload,
  Product,
  Receipt,
  RegisterPayload,
  UpdateUserPayload,
  User
} from "../types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

export function apiMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    if (!error.response) {
      return "No se pudo conectar con el servidor. Verifica que Spring Boot esté ejecutándose.";
    }
    return error.response.data?.message ?? "Ocurrió un error al procesar la solicitud.";
  }
  return "Ocurrió un error inesperado.";
}

export const ecommerceApi = {
  products: {
    list: async () => (await api.get<Product[]>("/api/products")).data,
    get: async (id: number) => (await api.get<Product>(`/api/products/${id}`)).data
  },
  users: {
    register: async (payload: RegisterPayload) =>
      (await api.post<User>("/api/users/register", payload)).data,
    login: async (payload: LoginPayload) =>
      (await api.post<User>("/api/users/login", payload)).data,
    get: async (id: number) => (await api.get<User>(`/api/users/${id}`)).data,
    update: async (id: number, payload: UpdateUserPayload) =>
      (await api.put<User>(`/api/users/${id}`, payload)).data
  },
  receipts: {
    create: async (userId: number, items: { productId: number; quantity: number }[]) =>
      (await api.post<Receipt>("/api/receipts", { userId, items })).data,
    byUser: async (userId: number) =>
      (await api.get<Receipt[]>(`/api/receipts/user/${userId}`)).data
  }
};
