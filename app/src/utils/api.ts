import axios from 'axios';

// No Expo (SDK 49+), variáveis públicas usam o prefixo EXPO_PUBLIC_.
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
});
