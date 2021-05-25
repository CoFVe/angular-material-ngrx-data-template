export interface IAuthService  {
  login(): void;
  completeAuthentication(): Promise<void> | void;
  isAuthenticated(): boolean;
  logout(): Promise<void> | void;
  listenTokenExpired(): void;
  getRoles(): string[];
  reloadProfile(): void;
}
