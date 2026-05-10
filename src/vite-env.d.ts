/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HI_PROTOCOL_API_URL?: string;
  readonly VITE_TELEGRAM_BOT_USERNAME?: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
