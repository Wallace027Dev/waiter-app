import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

// Garante o esquema: se VITE_API_URL vier sem http(s):// (ex.: "host.up.railway.app"),
// prefixa https:// — senão axios/socket resolvem relativo ao domínio do front.
export const API_URL = /^https?:\/\//.test(rawApiUrl)
  ? rawApiUrl
  : `https://${rawApiUrl}`;

export const api = axios.create({
  baseURL: API_URL,
});
