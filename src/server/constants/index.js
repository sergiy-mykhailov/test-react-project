
export const PORT = '8080';

export const DB = {
  name: 'test-react-project',
  host: 'localhost',
  port: 27017,
};

export const CORS = {
  enabled: true,
  allowedOrigin: '*',
  allowedMethods: [
    'GET',
    'POST',
    'PUT',
    'OPTIONS',
    'DELETE',
    'PATCH',
  ],
  allowedHeaders: [
    'Accept',
    'Authorization',
    'Content-Type',
    'Origin',
    'X-Requested-With',
  ],
};
