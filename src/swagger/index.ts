import { schemas } from '@dto';

import { pass } from './paths';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Passkit integration API',
    version: '1.0.0',
    description: 'API documentation',
  },
  servers: [
    { url: 'http://localhost:3004', description: 'Local server' },
    {
      url: 'https://lbos6k2w77.execute-api.us-east-1.amazonaws.com/production/app',
      description: 'Production server',
    },
  ],
  components: {
    schemas,
    securitySchemes: {
      ApiKeyAuth: { type: 'apiKey', in: 'header', name: 'x-api-key' },
    },
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: 'Member',
      description: 'Operations related to member passes',
    },
  ],
  paths: { ...pass },
};
