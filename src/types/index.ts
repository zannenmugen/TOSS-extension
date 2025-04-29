export type Page = "home" | "about" | "result" | "history" | "select";

export interface ScrapedLink {
  url: string;
  confidence: number;
}
