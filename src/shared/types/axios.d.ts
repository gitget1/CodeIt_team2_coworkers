import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
    skipAuthFailureRedirect?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    skipAuthRefresh?: boolean;
    skipAuthFailureRedirect?: boolean;
  }
}

export {};
