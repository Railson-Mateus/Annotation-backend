export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  imageUrl?: string;
  iat?: number;
  exp?: number;
}
