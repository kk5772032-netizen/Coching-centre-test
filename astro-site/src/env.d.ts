/// <reference types="astro/client" />

declare global {
  interface Window {
    /** Report an analytics event. No-op when no provider is configured. */
    track?: (name: string, props?: Record<string, unknown>) => void;
  }
}
export {};
