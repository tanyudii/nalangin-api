require('dotenv');

export const jwtSecret = process.env.JWT_SECRET || 'itsverysecret';
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '8h';
