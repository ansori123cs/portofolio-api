import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Portofolio App API',
      version: '1.0.0',
      description:
        '📘 Dokumentasi API untuk Portofolio, Pengalaman, dan Keahlian',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Lokasi file route
};

export const swaggerSpec = swaggerJSDoc(options);
