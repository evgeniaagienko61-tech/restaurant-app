import jwt from 'jsonwebtoken';
import { users } from './data.js';

export const JWT_SECRET = 'restaurant-super-secret-jwt-key-2026';

export function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function getUserFromToken(token) {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return users.find((u) => u.id === decoded.id) || null;
  } catch (error) {
    return null;
  }
}

export function getUserFromAuthHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7).trim();
  return getUserFromToken(token);
}