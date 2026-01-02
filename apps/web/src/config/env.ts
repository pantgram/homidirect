export const env = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  socketUrl: import.meta.env.VITE_SOCKET_URL || "ws://localhost:3000",
  geoapifyApiKey: import.meta.env.VITE_GEOAPIFY_API_KEY || "",
  isDev: import.meta.env.DEV,
} as const;

if (!env.apiUrl) throw new Error("VITE_API_URL required");

console.log("🚀 Environment:", env.apiUrl);
console.log("🚀 Socket URL:", env.socketUrl);
