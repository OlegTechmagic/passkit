import { schemas } from '@dto';

import { pass } from './paths';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Express server',
    version: '1.0.0',
    description: 'API documentation',
  },
  servers: [{ url: 'http://localhost:3004', description: 'Local server' }],
  components: { schemas },
  paths: { ...pass },
};
