export interface IAuthService  {
  login(): void;
  completeAuthentication(): Promise<void> | void;
  isAuthenticated(): Promise<boolean>;
  logout(): Promise<void> | void;
  listenTokenExpired(): void;
  getRoles(): string[];
  reloadProfile(): void;
}
