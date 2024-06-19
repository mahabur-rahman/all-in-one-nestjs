export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'your_default_secret_here',
  expiresIn: process.env.JWT_EXPIRES || '3d',
};
