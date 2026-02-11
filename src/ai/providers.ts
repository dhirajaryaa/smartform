export type ProviderName =
  | "openai"
  | "groqai"
  | "gemini"
  | "anthropic"

export interface ProviderConfig {
  baseURL: string;
  modal: string;
  headers: (apiKey?: string) => Record<string, string>;
};

export const aiModal: Record<ProviderName, string> = {
  openai: "gpt-4o-mini",
  groqai: "llama-3.3-70b-versatile",
  gemini: "gemini-2.5-flash",
  anthropic: "claude-3-haiku"
};


export const PROVIDERS: Record<ProviderName, ProviderConfig> = {
  openai: {
    baseURL: "https://api.openai.com/v1",
    modal: aiModal.openai,
    headers: (key) => ({
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    }),
  },

  groqai: {
    baseURL: "https://api.groq.com/openai/v1",
    modal: aiModal.groqai,
    headers: (key) => ({
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    }),
  },

  gemini: {
    baseURL: "https://generativelanguage.googleapis.com/v1beta",
    modal: aiModal.gemini,
    headers: (key) => ({
      "x-goog-api-key": key || "",
      "Content-Type": "application/json",
    }),
  },

  anthropic: {
    baseURL: "https://api.anthropic.com/v1",
    modal: aiModal.anthropic,
    headers: (key) => ({
      "x-api-key": key || "",
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    }),
  }
};
