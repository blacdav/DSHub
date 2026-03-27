export interface AuthUser {
  user_id: string;
  role: 'admin' | 'farmer';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}