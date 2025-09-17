declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.css';

// CRA exposes env vars prefixed with REACT_APP_
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_BASE_URL?: string;
  }
}


