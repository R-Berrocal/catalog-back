export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV ?? 'dev',
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USERNAME,
  port: process.env.PORT ?? 3000,
  host: process.env.HOST_API,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryName: process.env.CLOUDINARY_NAME,
});
