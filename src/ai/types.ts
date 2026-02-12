export interface SmartAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface SmartAIResponse {
  success: true | false;
  data?: string;
  message?: string;
  errorCode?: string | number;
};
